export type ViolationImpact = "moderate" | "serious";

export interface AxeViolationNode {
  failureSummary: string;
  html: string;
  impact: ViolationImpact;
  target: string[];
}

export interface AxeViolation {
  description: string;
  help: string;
  helpUrl: string;
  id: string;
  impact: ViolationImpact;
  tags: string[];
  nodes: AxeViolationNode[];
}

export interface AxeResult {
  incomplete: AxeViolation[];
  passes: AxeViolation[];
  violations: AxeViolation[];
}

const replaceTag = (tag: string) => {
  const tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };

  return (tagsToReplace as any)[tag] || tag;
};

const encodeHTMLTags = (str: string) => str.replace(/[&<>]/g, replaceTag);

const clean = () =>
  document.querySelectorAll("abr-index")?.forEach((e) => e.remove());

const generateNodeHTML = (node: AxeViolationNode) =>
  `<p>${node.failureSummary}</p><code>${encodeHTMLTags(node.html)}</code>`;

const generateViolationHTML = (
  violation: AxeViolation
) => `<abr-status-dot status="${
  violation.impact
}" slot="start"></abr-status-dot><span slot="heading">${
  violation.help
}</span><p>${violation.description}</p>
        ${violation.nodes?.map(generateNodeHTML).join(" ")}
        <p><a href="${violation.helpUrl}" target="_blank">Read more...</a></p>`;

export const triggerAxeCore = () => {
  clean();
  const axe = require("axe-core");
  axe
    .run()
    .then((results: AxeResult) => {
      const allErrors = [...results.violations, ...results.incomplete];
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

export const setupAxeCore = () => {
  if (process.env.NODE_ENV !== "production") {
    triggerAxeCore();

    window.addEventListener("popstate", () => {
      triggerAxeCore();
    });
  }
};
