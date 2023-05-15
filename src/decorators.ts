export function Controller(route: any): ClassDecorator {
  return function (target: any) {
    console.log("--class decorator called--", route);
    Reflect.defineMetadata("route", route, target.prototype);

    return target;
  };
}

export function Get(route: any): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any) {
    console.log("--method decorator called Get--", route);
    Reflect.defineMetadata("route", route, target, propertyKey);
    return descriptor;
  };
}

let cacheMap = new Map();
export function MyCache(key: string): MethodDecorator {
  return function (target: any, propertyKey: any, descriptor: any) {
    console.log("--method decorator called MyCache--", key);
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cache = cacheMap.get(key);
      if (cache) return "from cache : " + cache;

      const result = await originalMethod.apply(this, args);
      cacheMap.set(key, result);
      return result;
    };

    return descriptor;
  };
}

export function ToUpperCase(target: any, propertyKey: string) {
  let value = target[propertyKey];

  const getter = function () {
    return value.toUpperCase();
  };

  const setter = function (newValue: any) {
    if (typeof newValue != "string") throw new Error("Only string allowed");
    value = newValue;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

export function TransformToUpperCase(str) {
  return function (target: any, methodName: string, parameterIndex: number) {
    console.log("---parameter decorator called----");
    Reflect.defineMetadata(
      "params",
      [
        ...(Reflect.getMetadata("params", target, methodName) || []),
        {
          parameterIndex,
          callback: function () {
            return str.toUpperCase();
          },
        },
      ],
      target,
      methodName
    );

    //cannot return anythind the the param decorators
  };
}
