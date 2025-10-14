/**
 * @name         ElementConcerns - Levdwire
 * @description  <b>ElementConcerns</b> - Next generation user and application interface kit for developers.
 * @version      v1.0.0
 * @author       Selçuk Çukur <hk@selcukcukur.com.tr>
 * @license      The MIT License (https://levdwire.com/docs/license)
 * @copyright    (C) 2010 - 2024 Srylius (Srylius Teknoloji Limited Şirketi)
 **/
export class ElementConcerns {
    /**
     * Check if the target element is a div.
     *
     * @param {Element} element
     *
     * @returns {boolean}
     */
    static isDiv(element: Element): boolean {
        return element.tagName === 'DIV';
    }

    /**
     * Check if the target element is a link.
     *
     * @param {Element} element
     *
     * @returns {boolean}
     */
    public static isLink(element: Element): boolean {
        return element.tagName === 'A';
    }

    /**
     * Check if the target element is a input.
     *
     * @param {Element} element
     *
     * @returns {boolean}
     */
    public static isInput(element: Element): boolean {
        return element.tagName === 'INPUT';
    }

    /**
     * Check if the target element is a paragraph.
     *
     * @param {Element} element
     *
     * @returns {boolean}
     */
    public static isParagraph(element: Element): boolean {
        return element.tagName === 'P';
    }

    /**
     * Check if the target element is a image.
     *
     * @param {Element} element
     *
     * @returns {boolean}
     */
    public static isImage(element: Element): boolean {
        return element.tagName === 'IMG';
    }

    /**
     * Check if the target element is a svg.
     *
     * @param {Element} element
     *
     * @returns {boolean}
     */
    public static isSvg(element: Element): boolean {
        return element.tagName === 'SVG';
    }

    /**
     * Check if the target element is a button.
     *
     * @param {Element} element
     *
     * @returns {boolean}
     */
    public static isButton(element: Element): boolean {
        return element.tagName === 'BUTTON';
    }

    /**
     * Check if the target element is a form.
     *
     * @param {Element} element
     *
     * @returns {boolean}
     */
    public static isForm(element: Element): boolean {
        return element.tagName === 'FORM';
    }

    /**
     * Check if the selected item is a table.
     *
     * @param {Element} element
     *
     * @returns {boolean}
     */
    public static isTable(element: Element): boolean {
        return element.tagName === 'TABLE';
    }

    /**
     * Check if the selected item is a table head.
     *
     * @param {Element} element
     *
     * @returns {boolean}
     */
    public static isTableHead(element: Element): boolean {
        return element.tagName === 'THEAD';
    }

    /**
     * Check if the selected item is a table body.
     *
     * @param {Element} element
     *
     * @returns {boolean}
     */
    public static isTableBody(element: Element): boolean {
        return element.tagName === 'TBODY';
    }

    /**
     * Check if the selected item is a table footer.
     *
     * @param {Element} element
     *
     * @returns {boolean}
     */
    public static isTableFooter(element: Element): boolean {
        return element.tagName === 'TFOOT';
    }

    /**
     * Check if the selected item is a table row.
     *
     * @param {Element} element
     *
     * @returns {boolean}
     */
    public static isTableRow(element: Element): boolean {
        return element.tagName === 'TR';
    }
}
