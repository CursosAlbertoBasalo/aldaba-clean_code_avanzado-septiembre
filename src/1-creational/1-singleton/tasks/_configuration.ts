import * as fs from "fs";
import * as path from "path";

export type Configuration = {
  port: number;
  host: string;
  repository: {
    server: string;
    database: string;
    user: string;
    password: string;
  };
  security: {
    secret: string;
    expiresIn: string;
  };
};

export class ConfigurationService {
  public readonly configuration: Configuration;

  constructor() {
    this.configuration = this.load();
  }

  private load() {
    const filePath = path.resolve(__dirname, "./configuration.json");
    console.log("📖 Loading from: " + filePath);
    const fileContent = fs.readFileSync(filePath).toString();
    const configuration = JSON.parse(fileContent);
    return configuration;
  }
}
const configuration = new ConfigurationService().configuration; // 🤢 global variable
export class App {
  private configurationService = new ConfigurationService(); // 🤢 possible duplication

  public static main(): void {
    console.log("🏠 App main static...");
    console.log(configuration);
  }

  public run() {
    console.log("👟  App running...");
    console.log(this.configurationService.configuration);
    const repository = new Repository(this.configurationService.configuration);
    repository.fetch();
  }
}

export class Repository {
  // 🤢 dependency hell
  constructor(private configuration: Configuration) {}
  public fetch() {
    console.log("📦 Fetching data from repository");
    console.log(this.configuration.repository);
  }
}

new App().run();
App.main();
new App().run();
