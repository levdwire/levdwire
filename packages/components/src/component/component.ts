import { ComponentInterface } from "./component.interface"
import { ComponentOptions } from "./component.types"
import { InstanceOptions, Instances } from "@levdwire/container"

/**
 * Default options for the component.
 *
 * @type {ComponentOptions}
 */
const Default: ComponentOptions = {
	// ...
}

/**
 * Default instance options for the component.
 *
 * @type {InstanceOptions}
 */
const DefaultInstance: InstanceOptions = {
	/** @inheritDoc */
	id: "",
	/** @inheritDoc */
	override: false,
}

/**
 * @name         Component - Levdwire
 * @description  <b>Component</b> - Next generation user and application interface kit for developers.
 * @version      v1.0.0
 * @author       Selçuk Çukur <hk@selcukcukur.com.tr>
 * @license      The MIT License (https://levdwire.com/docs/license)
 * @copyright    (C) 2010 - 2024 Srylius (Srylius Teknoloji Limited Şirketi)
 *
 * @template O, E
 **/
export default abstract class Component<O = ComponentOptions, E = HTMLElement>
	implements ComponentInterface<O, E>
{
	/** @inheritDoc */
	_id: string

	/** @inheritDoc */
	_element: E

    /** @inheritDoc */
    _events: Map<string, Map<string, CallableFunction>>

	/** @inheritDoc */
	_options: O

	/** @inheritDoc */
	_initialized: boolean

	/**
	 * Create a new component instance.
	 *
	 * @param {Instances} component Component name.
	 * @param {E} element Component element.
	 * @param {O} options Component options.
	 * @param {InstanceOptions} instanceOptions Component instance options.
	 *
	 * @constructor
	 */
	constructor(
		component: keyof Instances,
		element: E,
		options: O,
		instanceOptions: InstanceOptions = DefaultInstance
	) {
		this._id = instanceOptions.id
			? instanceOptions.id
			: // @ts-ignore
			  element.id

		// Set the html element of the component.
		this._element = element

        // Set events for the component.
        this._events = new Map();

		// Set the options of the component.
		this._options = { ...Default, ...options }

		// Set the initialization state of the component.
		this._initialized = false

		// Add the component's instance to the container.
		// @ts-ignore
        LevdwireContainer.add(component, this, this._id, instanceOptions.override)
	}

	/** @inheritdoc */
	abstract initialize(): any

	/** @inheritdoc */
	abstract remove(): boolean

	/** @inheritdoc */
	abstract destroy(): boolean

	/** @inheritdoc */
	destroyAndRemove(): void {
		// Destroy existing instance from container.
		this.destroy()

		// Remove existing instance from container.
		this.remove()

	}
}
