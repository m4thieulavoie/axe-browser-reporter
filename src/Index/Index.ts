import {
  FASTElement,
  customElement,
  html,
  attr,
  repeat,
  when,
} from "@microsoft/fast-element";
import type { NodeResult, Result } from "axe-core";
import { run } from "axe-core";
import { triggerAxeCore } from "../Utils/setup";
import {
  generateViolationHTML,
  getViolationList,
  encodeHTMLTags,
  highlightViolation,
  unHighlightViolation,
} from "../Utils/utils";
import styles from "./Index.scss";

const generateNodeHTML = (node: NodeResult) =>
  html`<section
    @mouseenter=${() => {
      highlightViolation(node);
    }}
    @mouseleave=${() => {
      unHighlightViolation(node);
    }}
  >
    <p>${encodeHTMLTags(node.failureSummary)}</p>
    <code>${encodeHTMLTags(node.html)}</code>
  </section>`;

const template = html<IndexComponent>`${when(
  (x) => !!x.violationCount,
  html`<div class="wrapper">
      <div class="heading">
        <p>
          <strong>${(x) => x.violationCount}</strong> accessibility issues found
          in this web page
        </p>
        <div class="buttons">
          <button class="refresh" @click=${() => triggerAxeCore()}>
            Refresh
          </button>
          <button @click=${(x) => x.collapse()}>
            ${(x) => (x.collapsed ? "Expand" : "Collapse")}
          </button>
          <button class="close" @click=${(x) => x.remove()}>Close</button>
        </div>
      </div>
      <hr />
      <abr-accordion>
        ${repeat(
          (x) => x.violations,
          html<Result>`<abr-accordion-item
            ><abr-status-dot
              status="${(x) => x.impact}"
              slot="start"
            ></abr-status-dot
            ><span slot="heading"
              >${(x) => html`${encodeHTMLTags(x.help)}`}
              (<code>${(x) => x.id}</code>)</span
            >
            <blockquote>${(x) => encodeHTMLTags(x.description)}</blockquote>
            ${repeat((x) => x.nodes, html`${(y) => generateNodeHTML(y)}`)}
            <a href="${(x) => x.helpUrl}" target="_blank"
              >Read more...</a
            ></abr-accordion-item
          >`
        )}
      </abr-accordion>
    </div>
  </div>`
)}`;

@customElement({
  name: "abr-index",
  template,
  styles,
})
export default class IndexComponent extends FASTElement {
  @attr violationCount = 0;
  @attr({ mode: "boolean" }) collapsed: boolean = JSON.parse(
    sessionStorage.getItem("collapsed")
  );
  @attr violations: Result[] = [];
  @attr allowlist: string[] = [];

  connectedCallback() {
    super.connectedCallback();

    run()
      .then((results) => {
        const allErrors = getViolationList(results, this.allowlist);
        if (allErrors?.length) {
          this.violationCount = allErrors.length;
          allErrors.forEach((violation: Result) => {
            console.warn("axe-browser-reporter - a11y violation found ", {
              violation,
            });

            this.violations.push(violation);
            const child = document.createElement("abr-accordion-item");
            child.innerHTML = generateViolationHTML(violation);
          });
        } else {
          console.log("axe-browser-reporter - No accessibility issue found (:");
        }
      })
      .catch((err) => {
        console.error("axe-browser-reporter - Something bad happened:", err);
      });
  }

  collapse() {
    this.collapsed = !this.collapsed;
    sessionStorage.setItem("collapsed", JSON.stringify(this.collapsed));
  }
}
