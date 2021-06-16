import type { AxeResults, NodeResult, Result } from "axe-core";
import type { AxeConfig } from "./models";
import { defaultRunIf } from "./models";

/**
 * Finds and remove the instance of `abr-index` in the document
 */
export const clean = () =>
  document.querySelectorAll("abr-index")?.forEach((e) => e.remove());

export const getViolationList = (
  { violations, incomplete }: AxeResults,
  allowlist: readonly string[]
) =>
  [...violations, ...incomplete].filter(
    ({ id }) => !allowlist.find((item) => item === id)
  );

const replaceTag = (tag: string) => {
  const tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };

  return (tagsToReplace as any)[tag] || tag;
};

export const encodeHTMLTags = (str: string) =>
  str.replace(/[&<>]/g, replaceTag);

const generateNodeHTML = (node: NodeResult) =>
  `<p>${encodeHTMLTags(node.failureSummary)}</p><code>${encodeHTMLTags(
    node.html
  )}</code>`;

export const generateViolationHTML = (
  violation: Result
) => `<abr-status-dot status="${
  violation.impact
}" slot="start"></abr-status-dot><span slot="heading">${encodeHTMLTags(
  violation.help
)} (<code>${violation.id}</code>)</span><blockquote>${encodeHTMLTags(
  violation.description
)}</blockquote>
          ${violation.nodes?.map(generateNodeHTML).join(" ")}
          <a href="${violation.helpUrl}" target="_blank">Read more...</a>`;

export const computeRunIfCondition = (config?: AxeConfig) => {
  if (config) {
    if (config.runIf) {
      return config.runIf;
    }
  }

  return defaultRunIf;
};

export const highlightViolation = (node: NodeResult) => {
  const elements = document.querySelectorAll(node.target?.[0]);

  elements.forEach((element: HTMLElement) => {
    element.style.outline = "2px dashed orange";
    element.style.outlineOffset = "2px";
  });
};

export const unHighlightViolation = (node: NodeResult) => {
  const elements = document.querySelectorAll(node.target?.[0]);

  elements.forEach((element: HTMLElement) => {
    element.style.outline = "";
    element.style.outlineOffset = "";
  });
};
