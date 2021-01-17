import { AxeResults, NodeResult, Result } from "axe-core";
import { AxeConfig, defaultRunIf } from "./models";

/**
 * Finds and remove the instance of `abr-index` in the document
 */
export const clean = () =>
  document.querySelectorAll("abr-index")?.forEach((e) => e.remove());

export const getViolationList = (
  { violations, incomplete }: AxeResults,
  whiteList: string[]
) =>
  [...violations, ...incomplete].filter(
    ({ id }) => !whiteList.find((item) => item === id)
  );

const replaceTag = (tag: string) => {
  const tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };

  return (tagsToReplace as any)[tag] || tag;
};

const encodeHTMLTags = (str: string) => str.replace(/[&<>]/g, replaceTag);

const generateNodeHTML = (node: NodeResult) =>
  `<p>${encodeHTMLTags(node.failureSummary)}</p><code>${encodeHTMLTags(
    node.html
  )}</code>`;

export const generateViolationHTML = (
  violation: Result
) => `<abr-status-dot status="${violation.impact
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

export function addEventListenerToCodeTag(child: HTMLElement) {
  let allPage = document.getElementsByTagName('*');
  let codeTags = child.querySelectorAll('p + code');
  codeTags.forEach(code => {
    code.addEventListener('mouseover', function () {
      Array.from(allPage).forEach((e: HTMLElement) => {
        if (e.outerHTML == code.textContent) {
          highlight(e);
        }
      })
    })
  })
}

function highlight(e: HTMLElement) {
  e.style.backgroundColor = '#000000'
}
