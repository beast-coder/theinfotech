import "reflect-metadata";
import {
  Controller,
  Get,
  MyCache,
  ToUpperCase,
  TransformToUpperCase,
} from "./decorators";

@Controller("loginregister")
export class LoginController {
  @ToUpperCase
  name: any = "amit";
  constructor() {}

  @MyCache("loginmethod")
  @Get("login")
  async login() {
    return "login method " + this.name;
  }

  @Get("register")
  async register(
    @TransformToUpperCase("test") message: string,
    @TransformToUpperCase("demo") message1: string
  ) {
    //this.name = 234234;
    return `register method (param - ${message}) - ${message1}`;
  }
}
