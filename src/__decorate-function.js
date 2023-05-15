//Till typescript version 4.9.5

var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    console.log(typeof Reflect === "object");
    console.log("----------arguments-----------");
    console.log("---desc---", desc);
    console.log("---key---", key);
    console.log("---length---", arguments.length);
    console.log(arguments);

    var argumentLength = arguments.length;
    var propertyDescriptor =
      argumentLength < 3
        ? target
        : desc === null
        ? (desc = Object.getOwnPropertyDescriptor(target, key))
        : desc;
    var decorator;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
      propertyDescriptor = Reflect.decorate(decorators, target, key, desc);
    } else {
      for (var i = decorators.length - 1; i >= 0; i--) {
        if ((decorator = decorators[i])) {
          propertyDescriptor =
            (argumentLength < 3
              ? decorator(propertyDescriptor)
              : argumentLength > 3
              ? decorator(target, key, propertyDescriptor)
              : decorator(target, key)) || propertyDescriptor;
        }
      }
    }
    if (argumentLength > 3 && propertyDescriptor && Object.defineProperty) {
      Object.defineProperty(target, key, propertyDescriptor);
    }
    return propertyDescriptor;
  };

var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };

var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };

//above code dynamically pushed by typescript compiler
////////////////////Transpile code//////////////////

function log() {
  return function (target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
      console.log(`Calling method ${propertyKey} with arguments: ${args}`);
      const result = originalMethod.apply(this, args);
      console.log(`Method ${propertyKey} returned: ${result}`);
      return result;
    };
    return descriptor;
  };
}
function logParameter(target, methodName, parameterIndex) {
  console.log(
    `LogParameter - Target: ${target}, Method Name: ${methodName}, Parameter Index: ${parameterIndex}`
  );
}
function uppercase(target, propertyKey) {
  let value = target[propertyKey];
  const getter = function () {
    return value;
  };
  const setter = function (newVal) {
    value = newVal.toUpperCase();
  };
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

function addPrefix(prefix) {
  return function (target) {
    return class extends target {
      constructor(...args) {
        super(...args);
        console.log(`Prefix: ${prefix}`);
      }
    };
  };
}

class MyClass {
  constructor() {
    this.message = "Hello, World!";
  }
  greet(name, parm2 = []) {
    return `Hello, ${name}!`;
  }
}

__decorate(
  [uppercase, __metadata("design:type", String)],
  MyClass.prototype,
  "message",
  void 0
);
__decorate(
  [
    log(),
    __param(0, logParameter),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", void 0),
  ],
  MyClass.prototype,
  "greet",
  null
);
MyClass = __decorate([addPrefix("LOG")], MyClass);

const instance = new MyClass();
instance.greet("John");

/**typescript code 



function log(){
return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    console.log(`Calling method ${propertyKey} with arguments: ${args}`);
    const result = originalMethod.apply(this, args);
    console.log(`Method ${propertyKey} returned: ${result}`);
    return result;
  }
  
  return descriptor;
}
}

function logParameter(target: any, methodName: string, parameterIndex: number) {
  console.log(`LogParameter - Target: ${target}, Method Name: ${methodName}, Parameter Index: ${parameterIndex}`);
}

function uppercase(target: any, propertyKey: string) {
  let value: string = target[propertyKey];
  
  const getter = function() {
    return value;
  };

  const setter = function(newVal: string) {
    value = newVal.toUpperCase();
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

function addPrefix(prefix: string) {
  return function<T extends { new (...args: any[]): {} }>(target: T): T {
    return class extends target {
      constructor(...args: any[]) {
        super(...args);
        console.log(`Prefix: ${prefix}`);
      }
    };
  };
}

@addPrefix('LOG')
class MyClass {

  @uppercase
  message: string = "Hello, World!";

  @log()  
  greet(@logParameter name: string, parm2:number[]=[]) {
    return `Hello, ${name}!`;
  }
}

const instance = new MyClass();
instance.greet('John');

**/
