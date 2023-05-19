"use strict";
var __runInitializers =
  (this && this.__runInitializers) ||
  function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value = useValue
        ? initializers[i].call(thisArg, value)
        : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
  };
var __esDecorate =
  (this && this.__esDecorate) ||
  function (
    ctor,
    descriptorIn,
    decorators,
    contextIn,
    initializers,
    extraInitializers
  ) {
    console.log("__esDecorate called.");
    console.log("ctor --", ctor);
    console.log("descriptorIn --", descriptorIn);
    console.log("decorators --", decorators);
    console.log("contextIn --", contextIn);
    console.log("initializers --", initializers);
    console.log("extraInitializers --", extraInitializers);

    function accept(f) {
      if (f !== void 0 && typeof f !== "function")
        throw new TypeError("Function expected");
      return f;
    }
    var kind = contextIn.kind,
      key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target =
      !descriptorIn && ctor
        ? contextIn["static"]
          ? ctor
          : ctor.prototype
        : null;

    //target is a ctor.prototype
    console.log("---target---", target);

    var descriptor =
      descriptorIn ||
      (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});

    console.log("--descriptor--", descriptor);
    var _,
      done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {

      /**below code is doing because not to do object cloning */
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      /**below code is doing because not to do object cloning */

      context.addInitializer = function (f) {
        if (done)
          throw new TypeError(
            "Cannot add initializers after decoration has completed"
          );
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i])(
        kind === "accessor"
          ? { get: descriptor.get, set: descriptor.set }
          : descriptor[key],
        context
      );
      if (kind === "accessor") {
        if (result === void 0) continue;
        if (result === null || typeof result !== "object")
          throw new TypeError("Object expected");
        if ((_ = accept(result.get))) descriptor.get = _;
        if ((_ = accept(result.set))) descriptor.set = _;
        if ((_ = accept(result.init))) initializers.push(_);
      } else if ((_ = accept(result))) {
        if (kind === "field") initializers.push(_);
        else descriptor[key] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  };
function loggedMethod(originalMethod, _context) {
  function replacementMethod(...args) {
    console.log("LOG: Entering method.");
    const result = originalMethod.call(this, ...args);
    console.log("LOG: Exiting method.");
    return result;
  }
  return replacementMethod;
}
let Person = (() => {
  let _instanceExtraInitializers = [];
  let _greet_decorators;
  return class Person {
    static {
      _greet_decorators = [loggedMethod];
      __esDecorate(
        this,
        null,
        _greet_decorators,
        {
          kind: "method",
          name: "greet",
          static: false,
          private: false,
          access: { has: (obj) => "greet" in obj, get: (obj) => obj.greet },
        },
        null,
        _instanceExtraInitializers
      );
    }
    constructor(name) {
      this.name = (__runInitializers(this, _instanceExtraInitializers), void 0);
      this.name = name;
    }
    greet() {
      console.log(`Hello, my name is ${this.name}.`);
    }
  };
})();
const p = new Person("Ray");
p.greet();

/**
 * function loggedMethod(originalMethod: any, _context: any) {
    function replacementMethod(this: any, ...args: any[]) {
        console.log("LOG: Entering method.")
        const result = originalMethod.call(this, ...args);
        console.log("LOG: Exiting method.")
        return result;
    }
    return replacementMethod;
}

class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    @loggedMethod
    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}
const p = new Person("Ray");
p.greet();
 */
