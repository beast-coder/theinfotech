import http from "http";
import { LoginController } from "./login-controller";

const registerControllers = [LoginController];

function resolveRoutes(url) {
  //console.log(url);

  for (const className of registerControllers) {
    const routes = Reflect.getMetadata("route", className.prototype);
    //console.log(routes);

    const segments = url.split("/").filter((segment) => segment !== "");
    //console.log(segments);

    if (segments[0] == routes) {
      const loginObj = new className();

      const methods = Object.getOwnPropertyNames(className.prototype).filter(
        (prop) => typeof loginObj[prop] === "function" && prop != "constructor"
      );

      const method = methods.filter((m) => {
        const routes = Reflect.getMetadata("route", className.prototype, m);
        return routes == segments[1];
      });
      //console.log(method[0]);

      const classMethod = method[0];
      const target = className;
      return { loginObj, classMethod, target };
    }
  }

  return {};
}

const server = http.createServer(async (req, res) => {
  const { loginObj, classMethod, target } = resolveRoutes(req.url);

  //set the request route
  if (classMethod) {
    let paramsArr: any[] = [];
    const params = Reflect.getMetadata("params", target.prototype, classMethod);
    if (params) {
      for (const key in params) {
        paramsArr[params[key]["parameterIndex"]] = params[key]["callback"]();
      }
    }

    //console.log("---before calling method--");
    const data = await loginObj[classMethod](...paramsArr);
    //response headers
    res.writeHead(200, { "Content-Type": "application/json" });
    //set the response
    res.write(data);
    //end the response
    res.end();
  }

  // If no route present
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(3000, () => {
  console.log(`server started on port: ${3000}`);
});
