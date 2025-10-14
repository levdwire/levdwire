import {ComponentInterface} from "@levdwire/components"

/**
 * @name         Instances - Levdwire
 * @description  <b>Instances</b> - Next generation user and application interface kit for developers.
 * @version      v1.0.0
 * @author       Selçuk Çukur <hk@selcukcukur.com.tr>
 * @license      The MIT License (https://levdwire.com/docs/license)
 * @copyright    (C) 2010 - 2024 Srylius (Srylius Teknoloji Limited Şirketi)
 **/
export declare type Instances = StaticInstances & Record<string, Record<string, ComponentInterface>>

/**
 * @name         StaticInstances - Levdwire
 * @description  <b>StaticInstances</b> - Next generation user and application interface kit for developers.
 * @version      v1.0.0
 * @author       Selçuk Çukur <hk@selcukcukur.com.tr>
 * @license      The MIT License (https://levdwire.com/docs/license)
 * @copyright    (C) 2010 - 2024 Srylius (Srylius Teknoloji Limited Şirketi)
 **/
export declare type StaticInstances = {

}

/**
 * @name         InstanceOptions - Levdwire
 * @description  <b>InstanceOptions</b> - Next generation user and application interface kit for developers.
 * @version      v1.0.0
 * @author       Selçuk Çukur <hk@selcukcukur.com.tr>
 * @license      The MIT License (https://levdwire.com/docs/license)
 * @copyright    (C) 2010 - 2024 Srylius (Srylius Teknoloji Limited Şirketi)
 **/
export declare type InstanceOptions = {
  /**
   * The instance identifier.
   *
   * @type {string}
   */
  id?: string

  /**
   * The override status.
   *
   * @type {boolean}
   */
  override?: boolean
}
