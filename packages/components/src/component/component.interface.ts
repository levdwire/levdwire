import { ComponentOptions } from './component.types'

/**
 * @name         ComponentInterface - Levdwire
 * @description  <b>ComponentInterface</b> - Next generation user and application interface kit for developers.
 * @version      v1.0.0
 * @author       Selçuk Çukur <hk@selcukcukur.com.tr>
 * @license      The MIT License (https://levdwire.com/docs/license)
 * @copyright    (C) 2010 - 2024 All rights reserved by Srylius.
 *
 * @template O, E
 **/
export declare interface ComponentInterface<O = ComponentOptions, E = HTMLElement> {
	/**
	 * The component id.
	 *
	 * @type {string}
	 */
	_id: string

	/**
	 * The component element.
	 *
	 * @template E
	 * @type {E}
	 */
	_element: E

    /**
     * The component events.
     *
     * @type {Map<string, Map<string, CallableFunction>>}
     */
    _events: Map<string, Map<string, CallableFunction>>

	/**
	 * The component options.
	 *
	 * @template O
	 * @type {O}
	 */
	_options: O

	/**
	 * The component status.
	 *
	 * @type {boolean}
	 */
	_initialized: boolean

	/**
	 * Initialize component instance.
	 *
	 * @return {any}
	 */
	initialize(): any

	/**
	 * Remove the component instance from the container.
	 *
	 * @return {boolean|void}
	 */
	remove(): boolean | void

	/**
	 * Destroy the component instance from the container.
	 *
	 * @return {boolean|void}
	 */
	destroy(): boolean | void

	/**
	 * Remove and destroy the component instance from the container.
	 *
	 * @return {boolean|void}
	 */
	destroyAndRemove(): boolean | void
}
