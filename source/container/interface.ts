import { AccordionInterface } from "../components/accordion/interface";
import { CarouselInterface } from "../components/carousel/interface";
import { CollapseInterface } from "../components/collapse/interface";
import { DismissInterface } from "../components/dismiss/interface";
import { DrawerInterface } from "../components/drawer/interface";
import { DropdownInterface } from "../components/dropdown/interface";
import { InputImageInterface } from "../components/input/image/interface";
import { InputNumberInterface } from "../components/input/number/interface";
import { InputMeterInterface } from "../components/input/meter/interface";
import { MenuInterface } from "../components/menu/interface";
import { ModalInterface } from "../components/modal/interface";
import { PopoverInterface } from "../components/popover/interface";
import { ScrollInterface } from "../components/scroll/interface";
import { StepperInterface } from "../components/stepper/interface";
import { TableInterface } from "../components/table/interface";
import { TabsInterface } from "../components/tabs/interface";
import { ToastInterface } from "../components/toast/interface";
import { TooltipInterface } from "../components/tooltip/interface";

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
     * @private
     */
    _instances: {
        Accordion: { [id: string]: AccordionInterface };
        Carousel: { [id: string]: CarouselInterface };
        Collapse: { [id: string]: CollapseInterface };
        Dismiss: { [id: string]: DismissInterface };
        Drawer: { [id: string]: DrawerInterface };
        Dropdown: { [id: string]: DropdownInterface };
        InputImage: { [id: string]: InputImageInterface };
        InputMeter: { [id: string]: InputMeterInterface };
        InputNumber: { [id: string]: InputNumberInterface };
        Menu: { [id: string]: MenuInterface };
        Modal: { [id: string]: ModalInterface };
        Popover: { [id: string]: PopoverInterface };
        Scroll: { [id: string]: ScrollInterface };
        Stepper: { [id: string]: StepperInterface };
        Table: { [id: string]: TableInterface };
        Tabs: { [id: string]: TabsInterface };
        Toast: { [id: string]: ToastInterface };
        Tooltip: { [id: string]: TooltipInterface };
    };

    /**
     * Add a new component instance into the container.
     *
     * @param {ContainerInterface['_instances']} component
     * @param {any} instance
     * @param {string} id
     * @param {boolean} override
     *
     * @return {any}
     */
    add(component: keyof ContainerInterface['_instances'], instance: any, id?: string, override?: boolean): any;

    /**
     * Get an existing component instance from container.
     *
     * @param {ContainerInterface['_instances']} component
     * @param {string} id
     *
     * @return {any}
     */
    get(component: keyof ContainerInterface['_instances'], id: string): any;

    /**
     * Set an existing component instance from container.
     *
     * @param {ContainerInterface['_instances']} component
     * @param {any} instance
     * @param {string} id
     *
     * @return {boolean|void}
     */
    set(component: keyof ContainerInterface['_instances'], instance: any, id: string): boolean | void;

    /**
     * Check if the container has the given component instance.
     *
     * @param {ContainerInterface['_instances']} component
     * @param {string} id
     *
     * @return {boolean|void}
     */
    has(component: keyof ContainerInterface['_instances'], id: string): boolean | void;

    /**
     * Remove the given component instance from the container.
     *
     * @param {ContainerInterface['_instances']} component
     * @param {string} id
     *
     * @return {boolean|void}
     */
    remove(component: keyof ContainerInterface['_instances'], id: string): boolean | void;

    /**
     * Destroy the given component instance from the container.
     *
     * @param {ContainerInterface['_instances']} component
     * @param {string} id
     *
     * @return {boolean|void}
     */
    destroy(component: keyof ContainerInterface['_instances'], id: string): boolean | void;

    /**
     * Remove and destroy the given component instance from the container.
     *
     * @param {ContainerInterface['_instances']} component
     * @param {string} id
     *
     * @return {boolean|void}
     */
    destroyAndRemove(component: keyof ContainerInterface['_instances'], id: string): boolean | void;

    /**
     * Retrieve all components and instances contained in the container.
     *
     * @return {any}
     */
    all(): any;
}