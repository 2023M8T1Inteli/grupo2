interface IEventHandler {
  (data: any): void;
}

export class CompilerBridge {
  // TODO: pass "data" event handlers as arguments to constructor
  constructor(dataHandler, errorHandler: any, closeHandler: any) {
    this.dataHandler = dataHandler;
    this.errorHandler = errorHandler;
    this.closeHandler = closeHandler;
  }

  public compile(code: string) {
    const python = require("child_process").spawn("python", ["./app.py"]);
    // python.stdin.write(code);
    python.stdout.on("data", (data: any) => {
      this.dataHandler(data.toString());
    });

    python.stderr.on("data", (data: any) => {
      this.errorHandler(data.toString());
    });

    python.on("close", (code: any) => {
      this.closeHandler(code);
    });
  }
}

export const sendToCompiler = (code: string) => {
  const python = require("child_process").spawn("python", ["./app.py"]);
  // python.stdin.write(code);
  python.stdout.on("data", (data: any) => {
    console.log(data.toString());
  });

  python.stderr.on("data", (data: any) => {
    console.log(data.toString());
  });

  python.on("close", (code: any) => {
    console.log(`child process exited with code ${code}`);
  });
};
