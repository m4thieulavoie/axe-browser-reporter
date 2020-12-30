import { AxeViolation, AxeViolationNode } from "./AxeModels";

const replaceTag = (tag: string) => {
  const tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };

  return (tagsToReplace as any)[tag] || tag;
};

const encodeHTMLTags = (str: string) => str.replace(/[&<>]/g, replaceTag);

const generateNodeHTML = (node: AxeViolationNode) =>
  `<p>${encodeHTMLTags(node.failureSummary)}</p><code>${encodeHTMLTags(
    node.html
  )}</code>`;

const generateViolationHTML = (
  violation: AxeViolation
) => `<abr-status-dot status="${
  violation.impact
}" slot="start"></abr-status-dot><span slot="heading">${encodeHTMLTags(
  violation.help
)} (<code>${violation.id}</code>)</span><p>${encodeHTMLTags(
  violation.description
)}</p>
          ${violation.nodes?.map(generateNodeHTML).join(" ")}
          <p><a href="${
            violation.helpUrl
          }" target="_blank">Read more...</a></p>`;

export default generateViolationHTML;
