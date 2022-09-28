/* eslint-disable max-lines */
export interface Command {
  execute(payload: string): void;
  undo?(payload: string): void;
}

// each action is a class with a method for execute the logic
// and (optionally) an method to undo the logic (if possible)
export class CommandAlfa implements Command {
  constructor(private receiver: Receiver) {}

  public execute(payload: string): void {
    this.receiver.doSomethingAlfa(payload);
  }
  public undo(payload: string): void {
    this.receiver.undoSomethingAlfa(payload);
  }
}
export class CommandBravo implements Command {
  constructor(private receiver: Receiver) {}
  public execute(payload: string): void {
    this.receiver.doSomethingBravo(payload);
  }
  public undo(payload: string): void {
    this.receiver.undoSomethingBravo(payload);
  }
}

// A state management class that orchestrate and tracks all business actions
export class Invoker {
  // all available actions
  private catalog: { action: string; command: Command }[] = [];
  // all executed actions
  private history: { timestamp: number; action: string; payload: string }[] = [];

  public register(action: string, command: Command) {
    this.catalog.push({ action, command });
  }
  // aka execute
  public dispatch(action: string, payload: string): void {
    const actionCommand = this.catalog.find(c => c.action === action);
    if (!actionCommand) {
      throw new Error(`Action ${action} not found`);
    }
    console.log(`▶️ Dispatching action ${action}`);
    actionCommand.command.execute(payload);
    this.history.push({ timestamp: new Date().getTime(), action, payload });
  }

  public undo() {
    const lastAction = this.history.at(-1);
    if (!lastAction) {
      throw new Error("No action to undo");
    }
    const actionCommand = this.catalog.find(c => c.action === lastAction.action);
    if (!actionCommand) {
      throw new Error(`Action ${lastAction.action} not found`);
    }
    if (actionCommand.command.undo) {
      console.log(`⏮️ Undoing action ${lastAction.action}`);
      actionCommand.command.undo(lastAction.payload);
      this.history.pop();
    }
  }

  public redo() {
    const lastAction = this.history.at(-1);
    if (!lastAction) {
      throw new Error("No action to redo");
    }
    console.log(`🔁 Redoing action ${lastAction.action}`);
    this.dispatch(lastAction.action, lastAction.payload);
  }

  public printHistory() {
    console.log("📜 Command History:");
    this.history.forEach(h => console.log(h));
  }
}

// receivers are (optional) business objects that really implements the logic
export class Receiver {
  public doSomethingAlfa(payload: string) {
    console.log(`🅰️ CommandAlfa: ${payload}`);
  }
  public undoSomethingAlfa(payload: string) {
    console.log(`🗑️ 🅰️ CommandAlfa: ${payload}`);
  }
  public doSomethingBravo(payload: string) {
    console.log(`🅱️ CommandBravo: ${payload}`);
  }
  public undoSomethingBravo(payload: string) {
    console.log(`🗑️ 🅱️ CommandBravo: ${payload}`);
  }
}

export class Client {
  public invoker = new Invoker();
  private receiver = new Receiver();

  constructor() {
    this.invoker.register("alfa", new CommandAlfa(this.receiver));
    this.invoker.register("bravo", new CommandBravo(this.receiver));
  }

  public run() {
    this.invoker.dispatch("alfa", "Hello World");
    this.invoker.dispatch("bravo", "Hello World");
    this.invoker.redo();
    this.invoker.undo();
    this.invoker.dispatch("alfa", "Bye bye world");
    this.invoker.dispatch("bravo", "Bye bye world");
    this.invoker.printHistory();
  }
}

const client = new Client();
client.run();
