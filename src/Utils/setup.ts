import { Result, run } from "axe-core";
import { AxeConfig } from "./models";
import {
  clean,
  generateViolationHTML,
  getViolationList,
  computeRunIfCondition,
  addEventListenerToCodeTag
} from "./utils";

let whiteList: string[] = [];

export const triggerAxeCore = () => {
  clean();
  run()
    .then((results) => {
      const allErrors = getViolationList(results, whiteList);
      if (allErrors?.length) {
        const mainElement = document.createElement("abr-index");
        document.querySelector("body").append(mainElement);
        const axeTable = document.createElement("abr-accordion");
        mainElement.setAttribute("violationCount", `${allErrors.length}`);
        mainElement.append(axeTable);

        allErrors.forEach((violation: Result) => {
          console.warn("axe-browser-reporter - a11y violation found ", {
            violation,
          });
          const child = document.createElement("abr-accordion-item");
          child.innerHTML = generateViolationHTML(violation);
          addEventListenerToCodeTag(child);
          axeTable.append(child);
        });
      } else {
        console.log("axe-browser-reporter - No accessibility issue found (:");
      }
    })
    .catch((err) => {
      console.error("axe-browser-reporter - Something bad happened:", err);
    });
};

export const setupAxeCore = (config?: AxeConfig) => {
  if (computeRunIfCondition(config)) {
    if (config) {
      whiteList = config?.whitelist ?? [];
    }
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        triggerAxeCore();

        window.addEventListener("popstate", () => {
          triggerAxeCore();
        });
      }, 1);
    });
  }
};
