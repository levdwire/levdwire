/**
 * @name         Utility - Levdwire
 * @description  <b>Utility</b> - Next generation user and application interface kit for developers.
 * @version      v1.0.0
 * @author       Selçuk Çukur <hk@selcukcukur.com.tr>
 * @license      The MIT License (https://levdwire.com/docs/license)
 * @copyright    (C) 2010 - 2024 Srylius (Srylius Teknoloji Limited Şirketi)
 **/
export class Utility {
  /**
   * Clamp the given value between the maximum and minimum values.
   *
   * @param {number} value
   * @param {number} min
   * @param {number} max
   *
   * @return {any}
   */
  public static clamp(value: number, min: number, max: number): any {
    if (value < min)
      return min

    if (value > max)
      return max

    return value
  }

  /**
   * Parse the given value from string to data type.
   *
   * @param {any} value
   *
   * @return {any}
   */
  public static parse(value: any): any {
    // If the value is a string that says "true", convert it to a boolean object.
    if (value === 'true')
      return true

    // If the value is a string that says "false", convert it to a boolean object.
    if (value === 'false')
      return false

    // If the value is a string containing a number, convert it to a number.
    if (value === Number(value).toString())
      return Number(value)

    // If value is a string containing "null" or empty, convert it to a null object.
    if (value === '' || value === 'null' || value === 'empty')
      return null

    // If the value has come this far and is not a string, return the value directly.
    if (typeof value !== 'string')
      return value

    try {
      // If the value is still evaluated as a string then parse it as a json object.
      return this.parseJson(value) as object
    } catch {
      // If it cannot be parsed as a json object, then return the value as it is.
      return value
    }
  }

  /**
   * Parse the given value as json object.
   *
   * @param {any} value
   *
   * @return {any}
   */
  public static parseJson(value: string): JSON | null {
    // Check if the value exists and its length.
    if (value && value.length < 0)
      return null

    // Parse the given string into json object.
    return JSON.parse(decodeURIComponent(value))
  }

  /**
   * Writes a warning message to the console.
   *
   * @param {string} message
   *
   * @return {void}
   */
  public static warning(message: string): void {
    // Notify the user of the transaction result.
    console.warn(
      `%cLevdwire - %c ${message}`,
      'color: #fbbf24; font-weight:700; font-family: Karla, sans-serif; font-size:13px;',
      'color: #7E8299; font-weight:500; font-family: Karla, sans-serif; font-size:13px;'
    )
  }

  /**
   * Writes an info message to the console.
   *
   * @param {string} message
   *
   * @return {void}
   */
  public static info(message: string): void {
    // Notify the user of the transaction result.
    console.info(
      `%cLevdwire - %c ${message}`,
      'color: #a78bfa; font-weight:700; font-family: Karla, sans-serif; font-size:13px;',
      'color: #7E8299; font-weight:500; font-family: Karla, sans-serif; font-size:13px;'
    )
  }

  /**
   * Writes an info message to the console.
   *
   * @param {string} message
   *
   * @return {void}
   */
  public static error(message: string): void {
    // Notify the user of the transaction result.
    console.error(
      `%cLevdwire : %c ${message}`,
      'color: #f87171; font-weight:700; font-family: Karla, sans-serif; font-size:13px;',
      'color: #7E8299; font-weight:500; font-family: Karla, sans-serif; font-size:13px;'
    )
  }

  /**
   * Create anything that might be needed.
   *
   * @param {string} type
   *
   * @return {any}
   */
  public static generate(type: string): any {
    // Check if you want to create a unique random ID.
    if (type === 'id') {
      // Generate a unique random identifier.
      return Math.random().toString(36).substring(2, 9)
    }
  }

  /**
   * Type something about levdwire on the console screen.
   *
   * @return {void}
   */
  static {
    // Notify the user of the transaction result.
    console.info(
      `%c🔥 Levdwire - %c A next-generation products for full-stack developers.`,
      'color: #7c3aed; font-weight:700; font-family: Karla, sans-serif; font-size:13px;',
      'color: #7E8299; font-weight:500; font-family: Karla, sans-serif; font-size:13px;'
    )
  }
}
