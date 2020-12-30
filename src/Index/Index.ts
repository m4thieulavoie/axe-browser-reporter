import {
  FASTElement,
  customElement,
  html,
  attr,
} from "@microsoft/fast-element";
import { triggerAxeCore } from "../Utils/setup";
import styles from "./Index.scss";

const template = html<IndexComponent>`<div class="heading">
    <p>
      <strong>${(x) => x.violationCount}</strong> accessibility issues found in
      this web page
    </p>
    <div class="buttons">
      <button class="refresh" @click=${() => triggerAxeCore()}>Refresh</button
      ><button class="close" @click=${(x) => x.remove()}>Close</button>
    </div>
  </div>
  <hr />
  <slot></slot>`;

@customElement({
  name: "abr-index",
  template,
  styles,
})
export default class IndexComponent extends FASTElement {
  @attr violationCount = 0;
}
