var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function log(target, 
//@ts-ignore
context) {
    var methodName = String(context.name);
    function replacementMethod() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("LOG: Entering method '".concat(methodName, "'."));
        var result = target.call.apply(target, __spreadArray([this], args, false));
        console.log("LOG: Exiting method '".concat(methodName, "'."));
        return result;
    }
    return replacementMethod;
}
var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    //@ts-ignore
    Calculator.prototype.add = function (a, b) {
        return a + b;
    };
    __decorate([
        log
    ], Calculator.prototype, "add");
    return Calculator;
}());
var calculator = new Calculator();
console.log(calculator.add(2, 3));
