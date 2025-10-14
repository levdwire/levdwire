/**
 * @name         Concerns - Levdwire
 * @description  <b>Concerns</b> - Next generation user and application interface kit for developers.
 * @version      v1.0.0
 * @author       Selçuk Çukur <hk@selcukcukur.com.tr>
 * @license      The MIT License (https://levdwire.com/docs/license)
 * @copyright    (C) 2010 - 2024 Srylius (Srylius Teknoloji Limited Şirketi)
 **/
export class Concerns {
    /**
     * Check if the target value is a string.
     *
     * @param {any} value
     *
     * @returns {boolean}
     */
    public static isString(value: any): boolean {
        return typeof value === "string" || value instanceof String;
    }

    /**
     * Check if the target value is a number.
     *
     * @param {any} value
     *
     * @returns {boolean}
     */
    public static isNumber(value: any): boolean {
        return typeof value === "number" || value instanceof Number;
    }

    /**
     * Check if the target value is a integer.
     *
     * @param {any} value
     *
     * @returns {boolean}
     */
    public static isInteger(value: any): boolean {
        return typeof value === "bigint" || value instanceof Number;
    }

    /**
     * Check if the target value is a boolean.
     *
     * @param {any} value
     *
     * @returns {boolean}
     */
    public static isBoolean(value: any): boolean {
        return typeof value === "boolean" || value instanceof Boolean;
    }

    /**
     * Check if the target value is a object.
     *
     * @param {any} value
     *
     * @returns {boolean}
     */
    public static isObject(value: any): boolean {
        return typeof value === "object" || value instanceof Object;
    }

    /**
     * Check if the target value is a null.
     *
     * @param {any} value
     *
     * @returns {boolean}
     */
    public static isNull(value: any): boolean {
        return typeof value === "undefined" || value === null;
    }
}
