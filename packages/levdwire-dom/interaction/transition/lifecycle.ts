import { useTeardown } from "@levdwire-dom"

/**
 * Attaches delegated CSS transition lifecycle handlers with teardown-safe orchestration.
 *
 * Registers any combination of `transitionstart`, `transitionrun`, `transitionend`, and `transitioncancel`
 * listeners on the given scope using sugar-style delegation and semantic filtering.
 *
 * Each handler is stored under a semantic alias (`start`, `run`, `end`, `cancel`) and can be
 * selectively or globally removed via the returned `teardown()` function.
 *
 * @param handlers - A map of transition lifecycle handlers to attach.
 * @param scope - The DOM element used as the delegation scope. Must be an `Element`.
 * @param options - Delegation and filtering options (`delegate`, `name`, `capture`, etc).
 *
 * @returns A teardown-safe callback that removes all registered transition handlers.
 *
 * @example
 * // ✅ Without delegation (direct listener on the element)
 * const teardown = onTransition({
 *   start: (target, event) => target.classList.add('animating'),
 *   end: (target, event) => target.classList.remove('animating')
 * }, element)
 *
 * // ✅ With delegation (e.g. for dynamic children inside a container)
 * const teardown = onTransition({
 *   start: (target, event) => target.classList.add('animating'),
 *   end: (target, event) => target.classList.remove('animating')
 * }, container, { delegate: '.srylius', name: 'opacity' })
 *
 * teardown('end') // removes `transitionend` listener
 * teardown() // removes all transition listeners
 */
function onTransition(
    handlers: TransitionHandlers,
    scope: TransitionScope,
    options: TransitionOptions = {}
): TeardownStackCallback {
    const { push, teardown } = useTeardown()

    if (handlers.start) push('start', onTransitionStart(handlers.start, scope, options))
    if (handlers.end) push('end', onTransitionEnd(handlers.end, scope, options))
    if (handlers.run) push('run', onTransitionRun(handlers.run, scope, options))
    if (handlers.cancel) push('cancel', onTransitionCancel(handlers.cancel, scope, options))

    return teardown
}

/**
 * Attaches a teardown-safe listener for the `transitionstart` event on a given DOM scope.
 *
 * This sugar-style helper wraps `attachDelegate()` to listen for when a CSS transition completes.
 * It supports both direct and delegated targets, and ensures the listener is safely removable.
 *
 * @param callback - A function that receives `(target, event)` when the transition starts.
 * @param scope - The DOM element to listen on. Delegation is supported via `options.delegate`.
 * @param options - Optional delegation and native listener flags:
 *   - `delegate`: CSS selector to match delegated targets.
 *   - `name`: Transition property name to filter by.
 *   - Native listener options (`capture`, `passive`, `once`, etc.)
 *
 * @returns A teardown-safe remover function to unregister the listener.
 *
 * @example
 * // ✅ Without delegation (direct listener on the element)
 * const teardown = onTransitionStart((target, event) => {
 *   target.classList.add('animating')
 * }, element)
 *
 * // ✅ With delegation (e.g. for dynamic children inside a container)
 * const teardown = onTransitionStart((target, event) => {
 *   target.classList.add('animating')
 * }, container, {
 *   delegate: '.srylius',
 *   name: 'opacity'
 * })
 *
 * teardown() // removes the listener
 */
function onTransitionStart(
    callback: TransitionHandler,
    scope: TransitionScope,
    options: TransitionOptions = {}
): TeardownCallback {
    const { attachDelegate } = useTeardown()

    return attachDelegate<TransitionScope, TransitionEvent>(
        scope,
        "transitionstart",
        callback,
        options
    )
}

/**
 * Attaches a teardown-safe listener for the `transitionend` event on a given DOM scope.
 *
 * This sugar-style helper wraps `attachDelegate()` to listen for when a CSS transition completes.
 * It supports both direct and delegated targets, and ensures the listener is safely removable.
 *
 * @param callback - A function that receives `(target, event)` when the transition ends.
 * @param scope - The DOM element to listen on. Delegation is supported via `options.delegate`.
 * @param options - Optional delegation and native listener flags:
 *   - `delegate`: CSS selector to match delegated targets.
 *   - `name`: Transition property name to filter by.
 *   - Native listener options (`capture`, `passive`, `once`, etc.)
 *
 * @returns A teardown-safe remover function to unregister the listener.
 *
 * @example
 * // ✅ Without delegation (direct listener on the element)
 * const teardown = onTransitionEnd((target, event) => {
 *   target.classList.remove('animating')
 * }, element)
 *
 * // ✅ With delegation (e.g. for dynamic children inside a container)
 * const teardown = onTransitionEnd((target, event) => {
 *   target.classList.remove('animating')
 * }, container, {
 *   delegate: '.srylius',
 *   name: 'opacity'
 * })
 *
 * teardown() // removes the listener
 */
function onTransitionEnd(
    callback: TransitionHandler,
    scope: TransitionScope,
    options: TransitionOptions = {}
): TeardownCallback {
    const { attachDelegate } = useTeardown()

    return attachDelegate<TransitionScope, TransitionEvent>(
        scope,
        "transitionend",
        callback,
        options
    )
}

/**
 * Attaches a teardown-safe listener for the `transitionrun` event on a given DOM scope.
 *
 * This sugar-style helper wraps `attachDelegate()` to listen for when a CSS transition begins running.
 * It supports both direct and delegated targets, and ensures the listener is safely removable.
 *
 * @param callback - A function that receives `(target, event)` when the transition starts running.
 * @param scope - The DOM element to listen on. Delegation is supported via `options.delegate`.
 * @param options - Optional delegation and native listener flags:
 *   - `delegate`: CSS selector to match delegated targets.
 *   - `name`: Transition property name to filter by.
 *   - Native listener options (`capture`, `passive`, `once`, etc.)
 *
 * @returns A teardown-safe remover function to unregister the listener.
 *
 * @example
 * // ✅ Without delegation (direct listener on the element)
 * const teardown = onTransitionRun((target, event) => {
 *   console.log('Transition started running on:', target)
 * }, element)
 *
 * // ✅ With delegation (e.g. for dynamic children inside a container)
 * const teardown = onTransitionRun((target, event) => {
 *   console.log('Transition running on delegated target:', target)
 * }, container, {
 *   delegate: '.srylius',
 *   name: 'opacity'
 * })
 *
 * teardown() // removes the listener
 */
function onTransitionRun(
    callback: TransitionHandler,
    scope: TransitionScope,
    options: TransitionOptions = {}
): TeardownCallback {
    const { attachDelegate } = useTeardown()

    return attachDelegate<TransitionScope, TransitionEvent>(
        scope,
        "transitionrun",
        callback,
        options
    )
}

/**
 * Attaches a teardown-safe listener for the `transitioncancel` event on a given DOM scope.
 *
 * This sugar-style helper wraps `attachDelegate()` to listen for when a CSS transition is canceled
 * before completion. It supports both direct and delegated targets, and ensures the listener is safely removable.
 *
 * @param callback - A function that receives `(target, event)` when the transition is canceled.
 * @param scope - The DOM element to listen on. Delegation is supported via `options.delegate`.
 * @param options - Optional delegation and native listener flags:
 *   - `delegate`: CSS selector to match delegated targets.
 *   - `name`: Transition property name to filter by.
 *   - Native listener options (`capture`, `passive`, `once`, etc.)
 *
 * @returns A teardown-safe remover function to unregister the listener.
 *
 * @example
 * // ✅ Without delegation (direct listener on the element)
 * const teardown = onTransitionCancel((target, event) => {
 *   target.classList.remove('animating')
 * }, element)
 *
 * // ✅ With delegation (e.g. for dynamic children inside a container)
 * const teardown = onTransitionCancel((target, event) => {
 *   target.classList.remove('animating')
 * }, container, {
 *   delegate: '.srylius',
 *   name: 'opacity'
 * })
 *
 * teardown() // removes the listener
 */
function onTransitionCancel(
    callback: TransitionHandler,
    scope: TransitionScope,
    options: TransitionOptions = {}
): TeardownCallback {
    const { attachDelegate } = useTeardown()

    return attachDelegate<TransitionScope, TransitionEvent>(
        scope,
        "transitioncancel",
        callback,
        options
    )
}

export {
    onTransition,
    onTransitionStart,
    onTransitionEnd,
    onTransitionRun,
    onTransitionCancel
}
