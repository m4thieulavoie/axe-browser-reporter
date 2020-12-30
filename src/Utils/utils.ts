import { NodeResult, Result } from "axe-core";

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

const generateViolationHTML = (violation: Result) => `<abr-status-dot status="${
  violation.impact
}" slot="start"></abr-status-dot><span slot="heading">${encodeHTMLTags(
  violation.help
)} (<code>${violation.id}</code>)</span><blockquote>${encodeHTMLTags(
  violation.description
)}</blockquote>
          ${violation.nodes?.map(generateNodeHTML).join(" ")}
          <a href="${violation.helpUrl}" target="_blank">Read more...</a>`;

export default generateViolationHTML;
