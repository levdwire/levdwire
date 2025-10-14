import { describe, it, expect, beforeEach, vi } from "vitest"
import { ComponentInterface } from "@levdwire/components"
import { Container } from "@levdwire/container"

const createMockInstance = (id = "mock"): ComponentInterface => ({
    _id: id,
    _element: document.createElement("div"),
    _events: new Map(),
    _options: {},
    _initialized: true,
    initialize: vi.fn(),
    remove: vi.fn(),
    destroy: vi.fn(),
    destroyAndRemove: vi.fn(),
});

describe("Container", () => {
    let container: Container;

    beforeEach(() => {
        container = new Container();
        container.register("Toast");
    });

    it("should register a new component", () => {
        const result = container.register("Slider");
        expect(result).toBe(true);
        expect(container.getMany("Slider")).toEqual({});
    });

    it("should not register an already registered component", () => {
        const result = container.register("Toast");
        expect(result).toBe(false);
    });

    it("should add a new instance", () => {
        const instance = createMockInstance("toast1");
        const result = container.add("Toast", instance, "toast1");
        expect(result).toBe(true);
        expect(container.has("Toast", "toast1")).toBe(true);
    });

    it("should not add duplicate instance without override", () => {
        const instance = createMockInstance("toast1");
        container.add("Toast", instance, "toast1");
        const result = container.add("Toast", instance, "toast1");
        expect(result).toBe(false);
    });

    it("should override existing instance", () => {
        const instance1 = createMockInstance("toast1");
        const instance2 = createMockInstance("toast1");
        container.add("Toast", instance1, "toast1");
        const result = container.add("Toast", instance2, "toast1", true);
        expect(result).toBe(true);
        expect(container.get("Toast", "toast1")).toBe(instance2);
    });

    it("should get an existing instance", () => {
        const instance = createMockInstance("toast1");
        container.add("Toast", instance, "toast1");
        const result = container.get("Toast", "toast1");
        expect(result).toBe(instance);
    });

    it("should return false when getting non-existent instance", () => {
        const result = container.get("Toast", "missing");
        expect(result).toBe(false);
    });

    it("should return all instances for a component", () => {
        const instance = createMockInstance("toast1");
        container.add("Toast", instance, "toast1");
        const many = container.getMany("Toast");
        expect(many["toast1"]).toBe(instance);
    });

    it("should return false for getMany on unregistered component", () => {
        const result = container.getMany("Unknown");
        expect(result).toBe(false);
    });

    it("should set an existing instance", () => {
        const instance1 = createMockInstance("toast1");
        const instance2 = createMockInstance("toast1");
        container.add("Toast", instance1, "toast1");
        const result = container.set("Toast", instance2, "toast1");
        expect(result).toBe(true);
        expect(container.get("Toast", "toast1")).toBe(instance2);
    });

    it("should return false when setting non-existent instance", () => {
        const instance = createMockInstance("toast1");
        const result = container.set("Toast", instance, "toast1");
        expect(result).toBe(false);
    });

    it("should confirm existence with has()", () => {
        const instance = createMockInstance("toast1");
        container.add("Toast", instance, "toast1");
        expect(container.has("Toast", "toast1")).toBe(true);
        expect(container.has("Toast", "missing")).toBe(false);
    });

    it("should remove an instance", () => {
        const instance = createMockInstance("toast1");
        container.add("Toast", instance, "toast1");
        const result = container.remove("Toast", "toast1");
        expect(result).toBe(true);
        expect(container.has("Toast", "toast1")).toBe(false);
    });

    it("should return false when removing non-existent instance", () => {
        const result = container.remove("Toast", "missing");
        expect(result).toBe(false);
    });

    it("should destroy an instance", () => {
        const instance = createMockInstance("toast1");
        container.add("Toast", instance, "toast1");
        const result = container.destroy("Toast", "toast1");
        expect(result).toBe(true);
        expect(instance.destroy).toHaveBeenCalled();
    });

    it("should return false when destroying non-existent instance", () => {
        const result = container.destroy("Toast", "missing");
        expect(result).toBe(false);
    });

    it("should destroy and remove an instance", () => {
        const instance = createMockInstance("toast1");
        container.add("Toast", instance, "toast1");
        const result = container.destroyAndRemove("Toast", "toast1");
        expect(result).toBe(true);
        expect(instance.destroy).toHaveBeenCalled();
        expect(container.has("Toast", "toast1")).toBe(false);
    });

    it("should return all instances with all()", () => {
        const instance = createMockInstance("toast1");
        container.add("Toast", instance, "toast1");
        const all = container.all();
        expect(all.Toast["toast1"]).toBe(instance);
    });

    it("should debug without throwing", () => {
        const instance = createMockInstance("toast1");
        container.add("Toast", instance, "toast1");
        expect(() => container.debug()).not.toThrow();
        expect(() => container.debug("Toast")).not.toThrow();
    });
});
