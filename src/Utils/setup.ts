import type IndexComponent from "../Index/Index";
import type { AxeConfig } from "./models";
import { clean, computeRunIfCondition } from "./utils";

let whiteList: readonly string[] = [];

export const triggerAxeCore = () => {
  clean();
  const mainElement = document.createElement("abr-index") as IndexComponent;
  mainElement.whiteList = [...whiteList];
  document.querySelector("body").append(mainElement);
};

export const setupAxeCore = (config?: AxeConfig) => {
  const triggerHandler = () => {
    triggerAxeCore();
  };

  if (computeRunIfCondition(config)) {
    if (config) {
      whiteList = config?.whitelist ?? [];
    }
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        triggerHandler();

        window.addEventListener("popstate", triggerHandler);
        window.addEventListener(
          "beforeunload",
          () => {
            window.removeEventListener("popstate", triggerHandler);
          },
          false
        );
      }, 1);
    });
  }
};
