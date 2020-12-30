import { AxeResult, AxeViolation } from "./AxeModels";
import generateViolationHTML from "./utils";

interface AxeConfig {
  whitelist?: string[];
}

let whiteList: string[] = [];

const clean = () =>
  document.querySelectorAll("abr-index")?.forEach((e) => e.remove());

export const triggerAxeCore = () => {
  clean();
  const axe = require("axe-core");
  axe
    .run()
    .then((results: AxeResult) => {
      const allErrors = [...results.violations, ...results.incomplete].filter(
        (v) => !whiteList.find((item) => item === v.id)
      );
      if (allErrors?.length) {
        const mainElement = document.createElement("abr-index");
        const axeTable = document.createElement("abr-accordion");
        mainElement.append(axeTable);

        allErrors.forEach((violation: AxeViolation) => {
          console.warn("axe-browser-reporter - a11y violation found ", {
            violation,
          });
          const child = document.createElement("abr-accordion-item");
          child.innerHTML = generateViolationHTML(violation);
          axeTable.append(child);
        });
        document.querySelector("body").append(mainElement);
      } else {
        console.log("axe-browser-reporter - No accessibility issue found (:");
      }
    })
    .catch((err: any) => {
      console.error("Something bad happened:", err.message);
    });
};

export const setupAxeCore = (config?: AxeConfig) => {
  if (config) {
    whiteList = config?.whitelist ?? [];
  }

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      if (process.env.NODE_ENV !== "production") {
        triggerAxeCore();

        window.addEventListener("popstate", () => {
          triggerAxeCore();
        });
      }
    }, 1);
  });
};
