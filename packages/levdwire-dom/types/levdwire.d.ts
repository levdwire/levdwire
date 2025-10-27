export {}

declare global {
    /**
     * Represents valid DOM targets for event attachment.
     *
     * Used as the scope for teardown-safe listeners.
     */
    type TeardownTarget = Element | Document | Window

    /**
     * Represents the resolved target element in a delegated event listener.
     *
     * Used when delegation is enabled via a CSS selector, and the actual event target
     * is matched using `closest()` within the listening scope.
     *
     * Always an `Element`, never `Document` or `Window`.
     */
    type TeardownDelegateTarget = Element

    /**
     * A sugar-style event handler that receives both the resolved target and the event.
     *
     * @typeParam T - The DOM scope where the listener is attached.
     * @typeParam E - The specific event type being handled.
     *
     * @param target - The resolved target element (may be delegated).
     * @param event - The native DOM event object.
     */
    type TeardownHandler<T extends TeardownScope, E extends TeardownEvent> = (target: T, event: E) => void

    /**
     * A teardown-safe function that removes a previously attached listener or resource.
     *
     * Typically returned by `attach()` or `attachDelegate()`.
     */
    type TeardownCallback = () => void

    /**
     * A teardown-safe remover function returned by `attach()` or `attachDelegate()`.
     *
     * When invoked, it detaches the associated event listener.
     */
    type TeardownRemover = () => void

    /**
     * A stack-aware teardown function that can remove a specific alias or all listeners.
     *
     * @param alias - Optional semantic key to selectively teardown a specific callback.
     *
     * @returns `true` if any teardown was performed, `false` otherwise.
     */
    type TeardownStackCallback = (alias?: string) => boolean

    /**
     * Native DOM listener options passed to `addEventListener()`.
     *
     * These control listener behavior such as capture phase and passive mode.
     * Note: `AbortSignal` is intentionally unsupported — teardown is managed via `useTeardown()` orchestration.
     */
    type TeardownOptions = {
        capture?: boolean
        passive?: boolean
        once?: boolean
    }

    /**
     * Extended listener options for sugar-style delegation and filtering.
     *
     * Includes native listener options plus:
     * - `delegate`: CSS selector for event delegation.
     * - `name`: Optional filter for animation/transition events.
     */
    type TeardownDelegateOptions = TeardownOptions & {
        delegate?: string
        name?: string
    }

    /**
     * Union of all supported native DOM event types.
     *
     * Used to ensure type safety and autocomplete for sugar-style event handlers.
     */
    type TeardownEvent =
        | Event
        | TransitionEvent
        | AnimationEvent
        | ClipboardEvent
        | KeyboardEvent
        | MouseEvent
        | PointerEvent
        | TouchEvent
        | WheelEvent
        | FocusEvent
        | InputEvent
        | ChangeEvent
        | SubmitEvent
        | DragEvent
        | CompositionEvent
        | UIEvent
        | ProgressEvent
        | ErrorEvent
        | HashChangeEvent
        | PopStateEvent
        | StorageEvent
        | DeviceOrientationEvent
        | DeviceMotionEvent
        | FullscreenEvent
        | GamepadEvent
        | MessageEvent
        | PageTransitionEvent
        | BeforeUnloadEvent
        | CustomEvent

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
    interface Teardown {
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
        attach<T extends TeardownTarget, E extends TeardownEvent>(
            scope: T,
            type: string,
            handler: (this: T, event: E) => void,
            options?: TeardownOptions
        ): TeardownRemover

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
        attachDelegate<T extends TeardownDelegateTarget, E extends TeardownEvent>(
            scope: T,
            type: string,
            handler: TeardownHandler<T, E>,
            options: TeardownDelegateOptions = {}
        ): TeardownRemover

        /**
         * Registers a teardown-safe callback under a semantic alias.
         * If a previous callback exists for the same alias, it is invoked before replacement.
         *
         * @param alias - Unique key to identify the teardown callback.
         * @param callback - A teardown-safe function to be invoked later via `teardown(alias)` or `teardown()`.
         *
         * @returns {void}
         */
        push(alias: string, callback: TeardownRemover): void

        /**
         * Safely invokes and removes teardown callbacks from the internal registry.
         *
         * @param alias - Optional alias to selectively teardown a specific callback.
         *
         * @returns {boolean} `true` if any teardown was performed, `false` otherwise.
         */
        teardown(alias?: string): boolean
    }
}
