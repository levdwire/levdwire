import {Utility} from "@levdwire/utility"
import {ContainerInterface, Instances} from "@levdwire/container"
import {ComponentInterface} from "@levdwire/components"

/**
 * @name         Container - Levdwire
 * @description  <b>Container</b> - Next generation user and application interface kit for developers.
 * @version      v1.0.0
 * @author       Selçuk Çukur <hk@selcukcukur.com.tr>
 * @license      The MIT License (https://levdwire.com/docs/license)
 * @copyright    (C) 2010 - 2025 Srylius (Srylius Teknoloji Limited Şirketi)
 **/
class Container implements ContainerInterface {
  /** @inheritdoc */
  _instances: Instances

  /**
   * Create a new container instance.
   *
   * @constructor
   */
  constructor() {
    // Set all component instances to empty.
    this._instances = {}
  }

  /** @inheritdoc */
  add(component: keyof Instances, instance: ComponentInterface, id?: string, override = false): boolean {
    const identifier = id ? id : Utility.generate('id');

    // Check if the component is available.
    if (!this._instances[component]) {
      // Notify the user of the transaction result.
      Utility.warning(`Component ${component} does not exist.`)

      // If the component is not found, return false.
      return false
    }

    // Check if any components have been registered with such a unique ID before.
    if (this._instances[component][identifier] && !override) {
      // Notify the user of the transaction result.
      Utility.warning(`Instance with ID ${identifier} already exists.`)

      // Return false if overwriting is disabled and the component is not found.
      return false
    }

    // Check if it has been declared to be overridden.
    if (override && this._instances[component][identifier]) {
      // Delete the instance as invalidation is desired.
      this._instances[component][identifier].destroyAndRemove()
    }

    // If a unique ID is not provided, create and add a new unique ID.
    this._instances[component][identifier] = instance

    return true
  }

  /** @inheritdoc */
  get(component: keyof Instances, id: string): any {
    // Check if there are components in the container.
    if (!this._checkComponent(component)) {
      return false
    }

    // Check if there is a component instance in the container.
    if (!this._checkInstance(component, id)) {
      return false
    }

    // If there is an existing instance with the given unique identifier, get it.
    return this._instances[component][id] as any
  }

  /** @inheritdoc */
  getMany(component: keyof Instances): any {
    // Check if there are components in the container.
    if (!this._checkComponent(component)) {
      return false
    }

    // All available instances for the component.
    return this._instances[component]
  }

  /** @inheritdoc */
  set(component: keyof Instances, instance: ComponentInterface, id: string): boolean {
    // Check if there are components in the container.
    if (!this._checkComponent(component)) {
      return false
    }

    // Check if there is a component instance in the container.
    if (!this._checkInstance(component, id)) {
      return false
    }

    // If there is an existing instance with the given unique identifier, get it.
    this._instances[component][id] = instance

    return true
  }

  /** @inheritdoc */
  has(component: keyof Instances, id: string): boolean {
    // Check if the ingredients are present in the instance.
    if (!this._instances[component]) {
      return false
    }

    // Check if a component exists with the specified identifier.
    if (!this._instances[component][id]) {
      return false
    }

    // If it passes both checks, it is present.
    return true
  }

  /** @inheritdoc */
  remove(component: keyof Instances, id: string): boolean {
    // Check if there are components in the container.
    if (!this._checkComponent(component)) {
      return false
    }

    // Check if there is a component instance in the container.
    if (!this._checkInstance(component, id)) {
      return false
    }

    // Remove the given component instance from the container.
    delete this._instances[component][id]

    return true
  }

  /** @inheritdoc */
  register(component: string): boolean {
    // Check if the component is available.
    if (this._instances[component]) {
      // Notify the user of the transaction result.
      Utility.warning(`Component ${component} is already registered.`)

      // If the component is not found, return false.
      return false
    }

    // Register the new component type
    this._instances[component] = {};

    return true
  }

  /** @inheritdoc */
  debug(component?: keyof Instances): void {
    // Determine which components to inspect: all or filtered by name
    const targets = component
      ? {[component]: this._instances[component]}
      : this._instances;

    // Start a grouped console log for better readability
    console.group("🧠 LevdwireContainer Debug");

    // Iterate over each component and its registered instances
    Object.entries(targets).forEach(([componentName, instances]) => {
      if (!instances) return; // koruma

      const ids = Object.keys(instances);

      // Log the component name and how many instances it contains
      console.group(`📦 ${componentName} (${ids.length} instance${ids.length !== 1 ? "s" : ""})`);

      // Iterate over each instance ID within the component
      ids.forEach(id => {
        const instance = instances[id];

        // Check if the instance supports lifecycle methods
        const hasDestroy = typeof instance?.destroy === "function";
        const hasRemove = typeof instance?.destroyAndRemove === "function";

        // Log instance metadata including lifecycle support and full object
        console.log(`🔹 ID: ${id}`, {
          type: typeof instance,
          hasDestroy,
          hasRemove,
          instance,
        });
      });

      // End the component group
      console.groupEnd();
    });

    // End the main debug group
    console.groupEnd();
  }

  /** @inheritdoc */
  destroy(component: keyof Instances, id: string): boolean {
    // Check if there are components in the container.
    if (!this._checkComponent(component)) {
      return false
    }

    // Check if there is a component instance in the container.
    if (!this._checkInstance(component, id)) {
      return false
    }

    // Destroy the given component instance from the container.
    this._instances[component][id].destroy()

    return true
  }

  /** @inheritdoc */
  destroyAndRemove(component: keyof Instances, id: string): boolean {
    // Destroy the given component instance from the container.
    this.destroy(component, id)

    // Remove the given component instance from the container.
    this.remove(component, id)

    return true
  }

  /** @inheritDoc */
  all(): any {
    // Return all existing component instances.
    return this._instances
  }

  /**
   * Check if there are components in the container.
   *
   * @param {Instances} component
   *
   * @return {boolean}
   */
  protected _checkComponent(component: keyof Instances): boolean {
    // Check if the ingredients are present in the instance.
    if (!this._instances[component]) {
      // Notify the user of the transaction result.
      Utility.warning(`Component ${component} does not exist.`)

      // Return false because the component does not exist.
      return false
    }

    // Return true if the component and instance exist.
    return true
  }

  /**
   * Check if there is a component instance in the container.
   *
   * @param {Instances} component
   * @param {string} id
   *
   * @return {boolean}
   */
  protected _checkInstance(component: keyof Instances, id: string): boolean {
    // Check if a component exists with the specified identifier.
    if (! this._instances[component][id]) {
      // Notify the user of the transaction result.
      Utility.error(`Instance with ID ${id} does not exist.`)

      // Return false because the instance does not exist.
      return false
    }

    // Return true if the component and instance exist.
    return true
  }
}

// Export
export default Container
