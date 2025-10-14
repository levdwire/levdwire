import { ComponentInterface } from "@levdwire/components"
import { Instances } from "."

/**
 * @name         ContainerInterface - Levdwire
 * @description  <b>ContainerInterface</b> - Next generation user and application interface kit for developers.
 * @version      v1.0.0
 * @author       Selçuk Çukur <hk@selcukcukur.com.tr>
 * @license      The MIT License (https://levdwire.com/docs/license)
 * @copyright    (C) 2010 - 2024 Srylius (Srylius Teknoloji Limited Şirketi)
 **/
export declare interface ContainerInterface {
	/**
	 * Instances of components available in the container.
	 *
	 * @type {Instances}
	 */
	_instances: Instances

	/**
	 * Add a new component instance into the container.
	 *
	 * @param {Instances} component
	 * @param {any} instance
	 * @param {string} id
	 * @param {boolean} override
	 *
	 * @return {boolean}
	 */
	add(component: keyof Instances, instance: ComponentInterface, id?: string, override?: boolean): boolean

	/**
	 * Get an existing component instance from container.
	 *
	 * @param {Instances} component
	 * @param {string} id
	 *
	 * @return {any}
	 */
	get(component: keyof Instances, id: string): any

	/**
	 * Get an existing component instances from container.
	 *
	 * @param {Instances} component
	 *
	 * @return {any}
	 */
	getMany(component: keyof Instances): any

	/**
	 * Set an existing component instance from container.
	 *
	 * @param {Instances} component
	 * @param {any} instance
	 * @param {string} id
	 *
	 * @return {boolean}
	 */
	set(component: keyof Instances, instance: ComponentInterface, id: string): boolean

	/**
	 * Check if the container has the given component instance.
	 *
	 * @param {Instances} component
	 * @param {string} id
	 *
	 * @return {boolean}
	 */
	has(component: keyof Instances, id: string): boolean

	/**
	 * Remove the given component instance from the container.
	 *
	 * @param {Instances} component
	 * @param {string} id
	 *
	 * @return {boolean}
	 */
	remove(component: keyof Instances, id: string): boolean

    /**
     * Register a new component type into the container.
     *
     * @param {string} component - The name of the component (e.g. "Slider", "Toast").
     *
     * @return {boolean}
     */
    register(component: string): boolean

    /**
     * Log all registered component instances in the container.
     *
     * @param {keyof Instances} [component] - Optional component name to filter the debug output.
     *
     * @return {void}
     */
    debug(component?: keyof Instances): void

	/**
	 * Destroy the given component instance from the container.
	 *
	 * @param {Instances} component
	 * @param {string} id
	 *
	 * @return {boolean}
	 */
	destroy(component: keyof Instances, id: string): boolean

	/**
	 * Remove and destroy the given component instance from the container.
	 *
	 * @param {Instances} component
	 * @param {string} id
	 *
	 * @return {boolean}
	 */
	destroyAndRemove(component: keyof Instances, id: string): boolean

	/**
	 * Retrieve all components and instances contained in the container.
	 *
	 * @return {any}
	 */
	all(): any
}
