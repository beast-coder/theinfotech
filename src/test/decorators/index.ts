//class decorator
function Greeter(msg: string) {
  return function (value, context) {
    if (context.kind === "class") {
      return class extends value {
        constructor(...args) {
          super(args);
        }
        greet(): void {
          console.log(msg);
        }
      };
    }
  };
}

//class decorator
function Log<Input extends new (...args: any) => any>(
  value: Input,
  context: ClassDecoratorContext
) {
  if (context.kind === "class") {
    return class extends value {
      constructor(...args) {
        super(args);
      }
      log(msg: string): void {
        console.log(msg);
      }
    };
  }
}

//property decorator
function logged(value, context) {
  const { kind, name } = context;
  if (kind === "field") {
    return function (initialValue) {
      console.log(`initializing ${name} with value ${initialValue}`);
      return initialValue;
    };
  }
}

//method decorator
function MyCache(key) {
  const cacheObj = new Map();
  return function actualDecorator(value, context) {
    if (context.kind == "method") {
      return function (...args) {
        if (cacheObj.has(key)) return "from cache : " + cacheObj.get(key);

        const result = value.apply(this, args);
        cacheObj.set(result);
        return result;
      };
    }
  };
}

//method decorator
function logMethod(value, context) {
  const { kind, name } = context;
  const methodName = String(name);

  if (kind === "method" || kind === "getter" || kind === "setter") {
    return function (...args: any[]) {
      console.log(`Before invoking method: ${methodName}`);
      let result = value.apply(this, args);
      console.log(`After invoking method: ${methodName}`);
      return result;
    };
  }
}

//method decorator
function bound(value, context) {
  const { kind, name, addInitializer } = context;
  if (kind === "method") {
    addInitializer(function () {
      this[name] = this[name].bind(this);
    });
  }
}

@Log
@Greeter("Hello ES Decorator!")
class User {
  @logged
  public name: string = "theinfotech";
  public _age: number = 10;
  @MyCache("greet-key")
  @logMethod
  greet(msg: string): string {
    return `Hello ${this.name} - ${msg}!`;
  }

  @logMethod
  set age(age: number) {
    if (age < 0 || age > 120) {
      throw new Error("The value of age is invalid"!);
    }
    this._age = age;
  }

  @logMethod
  get age() {
    return this._age;
  }
}

let user = new User();
(user as any).greet();
(user as any).log("Hello theinfotech!");
console.log(user.name);
console.log(user.greet("theinfotech"));
user.age = -2;
console.log("age - ", user.age);
