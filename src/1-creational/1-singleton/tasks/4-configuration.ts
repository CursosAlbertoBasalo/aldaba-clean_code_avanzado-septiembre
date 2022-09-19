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
  private static instance: ConfigurationService;
  public readonly configuration!: Configuration;

  constructor() {
    if (!ConfigurationService.instance) {
      this.configuration = this.load();
      ConfigurationService.instance = this;
    }
    return ConfigurationService.instance;
  }

  public static getInstance(): ConfigurationService {
    if (!ConfigurationService.instance) {
      ConfigurationService.instance = new ConfigurationService();
    }
    return ConfigurationService.instance;
  }

  public static getConfiguration(): Configuration {
    return ConfigurationService.getInstance().configuration;
  }

  private load() {
    const filePath = path.resolve(__dirname, "./configuration.json");
    console.log("📖 Loading from: " + filePath);
    const fileContent = fs.readFileSync(filePath).toString();
    const configuration = JSON.parse(fileContent);
    return configuration;
  }
}
// ! no more global vars

export class App {
  private configurationService = new ConfigurationService();

  public static main(): void {
    // ! different approaches for get the value
    const configuration = ConfigurationService.getInstance().configuration;
    console.log("🏠 App main static...");
    console.log(configuration);
  }

  public run() {
    console.log("👟  App running...");
    console.log(this.configurationService.configuration);
    // ! No more unneeded dependency params
    const repository = new Repository();
    repository.fetch();
  }
}

export class Repository {
  public fetch() {
    // ! safe repetitive constructors calls
    const configurationService = new ConfigurationService();
    console.log("📦 Fetching data from repository");
    console.log(configurationService.configuration?.repository);
  }
}

new App().run();
App.main();
new App().run();
