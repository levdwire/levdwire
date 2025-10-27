/**
 * Creates a teardown-safe orchestration context for DOM listeners and cleanup callbacks.
 *
 * Provides sugar-style helpers to attach native and delegated event listeners,
 * register teardown callbacks under semantic aliases, and perform scoped or full cleanup.
 *
 * Each `useTeardown()` call creates an isolated registry. There is no global state or namespace.
 * You can safely export `teardown()` to trigger cleanup from other modules.
 *
 * @returns An orchestration object with the following sugar-style methods:
 *
 * - `attach(scope, type, handler, options?)`: Adds a native DOM listener with teardown safety.
 * - `attachDelegate(scope, type, handler, options?)`: Adds a delegated listener with optional filtering.
 * - `push(alias, callback)`: Registers a teardown-safe callback under a semantic alias.
 * - `teardown(alias?)`: Invokes and removes callbacks, either selectively or fully.
 *
 * @example
 * const { push, teardown } = useTeardown()
 *
 * push('observer', () => observer.disconnect())
 *
 * teardown('observer') // selectively cleanup
 * teardown() // full cleanup
 */
export function useTeardown(): Teardown {
    // Internal registry to track teardown callbacks by alias
    const registry = new Map<string, TeardownCallback>()

    /**
     * Attaches a native DOM event listener with teardown safety.
     *
     * @typeParam T - The DOM target (`Element`, `Document`, or `Window`) the listener is attached to.
     * @typeParam E - The specific event type (e.g. `MouseEvent`, `TransitionEvent`).
     *
     * @param scope - The DOM node to attach the listener to.
     * @param type - The event type to listen for (e.g. `'click'`, `'transitionend'`).
     * @param handler - A function that receives `(this: scope, event)` when the event fires.
     * @param options - Optional native listener options (`capture`, `passive`, `once`, `signal`).
     *
     * @returns A teardown-safe remover function.
     */
    function attach<T extends TeardownTarget, E extends TeardownEvent>(
        scope: T,
        type: string,
        handler: (this: T, event: E) => void,
        options?: TeardownOptions
    ): TeardownRemover {
        // Warn if the event type is an empty string (valid but likely unintended)
        if (__DEV__ && !type.trim()) {
            console.warn(`[Levdwire] Empty event type passed to attach(). Listener may not fire.`)
        }

        // Wrap the listener to inject `scope` as `this` and cast event to expected type
        const wrapped: EventListener = (event) => {
            try {
                // Cast event to expected type `E` and invoke handler with semantic (scope, event)
                handler.call(scope, event as E)
            } catch (error) {
                if (__DEV__) {
                    const tag = (scope as Element)?.tagName ?? 'unknown'
                    console.warn(
                        `[Levdwire] Handler threw during native event "${type}" on "${tag}".`,
                        error
                    )
                }
            }
        }

        // Attach the wrapped listener to the DOM node
        scope.addEventListener(type, wrapped, options)

        // Return a teardown-safe remover that detaches the listener
        return () => scope.removeEventListener(type, wrapped, options)
    }

    /**
     * Attaches a delegated DOM event listener with optional filtering.
     *
     * @typeParam T - The DOM element used as the listening scope.
     * @typeParam E - The specific event type (e.g. `AnimationEvent`, `TransitionEvent`).
     *
     * @param scope - The DOM element to attach the listener to.
     * @param type - The event type to listen for.
     * @param handler - A function that receives `(resolvedTarget, event)` when delegation matches.
     * @param options - Delegation options including `delegate`, `name`, and native listener flags.
     *
     * @returns A teardown-safe remover function.
     */
    function attachDelegate<T extends TeardownDelegateTarget, E extends TeardownEvent>(
        scope: T,
        type: string,
        handler: TeardownHandler<T, E>,
        options: TeardownDelegateOptions = {}
    ): TeardownRemover {
        const { delegate, name, ...nativeOptions } = options

        // Wrap the listener to inject `scope` alongside the event
        const listener: EventListener = (event) => {
            // Attempt to resolve the actual target element based on delegation selector
            const target = event.target as Element | null
            const resolved = delegate ? target?.closest(delegate) : target

            // If no matching element was found via delegation, skip handler
            if (!resolved) {
                if (__DEV__) {
                    console.warn(
                        delegate
                            ? `[Levdwire] Delegated target not found for "${type}". Event target did not match selector "${delegate}".`
                            : `[Levdwire] Event target is null or unresolved for "${type}".`
                    )
                }
                return
            }

            // Ensure the resolved element is within the listening scope
            if (!scope.contains(resolved)) {
                if (__DEV__) {
                    console.warn(
                        `[Levdwire] Delegated target "${resolved.tagName}" is outside the listening scope. Ensure delegation boundaries are correct.`
                    )
                }
                return
            }

            // If a specific animation/transition name is expected, verify it matches
            if (name) {
                // Skip if animation name doesn't match
                if (
                    type.startsWith('animation') &&
                    event instanceof AnimationEvent &&
                    event.animationName !== name
                ) {
                    if (__DEV__) {
                        console.warn(
                            `[Levdwire] Animation name "${event.animationName}" did not match expected "${name}". Handler skipped.`
                        )
                    }
                    return
                }

                // Skip if transition property doesn't match
                if (
                    type.startsWith('transition') &&
                    event instanceof TransitionEvent &&
                    event.propertyName !== name
                ) {
                    if (__DEV__) {
                        console.warn(
                            `[Levdwire] Transition property "${event.propertyName}" did not match expected "${name}". Handler skipped.`
                        )
                    }
                    return
                }
            }

            // Safely invoke the user-defined handler with resolved target and typed event
            try {
                handler(resolved as T, event as E)
            } catch (error) {
                if (__DEV__) {
                    console.warn(
                        `[Levdwire] Handler threw during delegated event "${type}" on "${resolved.tagName}".`,
                        error
                    )
                }
            }
        }

        // Attach the wrapped listener to the DOM node
        scope.addEventListener(type, listener, nativeOptions)

        // Return a teardown-safe remover that detaches the listener
        return () => scope.removeEventListener(type, listener, nativeOptions)
    }

    /**
     * Registers a teardown-safe callback under a semantic alias.
     * If a previous callback exists for the same alias, it is invoked before replacement.
     *
     * @param alias - Unique key to identify the teardown callback.
     * @param callback - A teardown-safe function to be invoked later via `teardown(alias)` or `teardown()`.
     *
     * @returns {void}
     */
    function push(
        alias: string,
        callback: TeardownRemover
    ): void {
        // Retrieve any previously registered teardown callback for this key
        const previousCallback = registry.get(alias)

        // If a previous callback exists, invoke it before replacing
        if (typeof previousCallback === "function") {
            try {
                previousCallback()
            } catch (error) {
                // Log any errors during teardown in development mode
                if (__DEV__) {
                    console.warn(
                        `[Levdwire] Failed to teardown alias "${alias}". The callback threw during cleanup. Ensure teardown-safe listeners and side-effect isolation.`,
                        error
                    )
                }
            }
        }

        // Register the new teardown callback under the computed key
        registry.set(alias, callback)
    }

    /**
     * Safely invokes and removes teardown callbacks from the internal registry.
     *
     * @param alias - Optional alias to selectively teardown a specific callback.
     *
     * @returns {boolean} `true` if any teardown was performed, `false` otherwise.
     */
    function teardown(
        alias?: string
    ): boolean {
        // Track whether any teardown callback was executed
        let ran = false

        // Iterate over all registered teardown callbacks
        for (const [key, callback] of registry) {
            // Determine if this key should be torn down:
            if (alias && key !== alias) continue

            // If the callback is a valid function, invoke it safely
            try {
                callback()
            } catch (error) {
                // Log teardown failure in development mode
                if (__DEV__) {
                    console.warn(`[Levdwire] Teardown failed for alias "${key}".`, error)
                }
            }

            // Remove the callback from the registry after execution
            registry.delete(key)

            // Mark that at least one teardown was executed
            ran = true
        }

        // Return whether any teardown was performed
        return ran
    }

    return { attach, attachDelegate, push, teardown }
}
