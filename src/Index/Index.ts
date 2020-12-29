import { FASTElement, customElement, html } from "@microsoft/fast-element";
import { triggerAxeCore } from "../Utils/setup";
import styles from "./Index.scss";

const template = html`<div class="heading">
    <button class="refresh">🔄</button><button class="close">✖️</button>
  </div>
  <slot></slot>`;

@customElement({
  name: "abr-index",
  template,
  styles,
})
export default class IndexComponent extends FASTElement {
  connectedCallback() {
    super.connectedCallback();

    const button = this.shadowRoot.querySelector<HTMLButtonElement>(".refresh");
    button.onclick = () => triggerAxeCore();
    const closeButton = this.shadowRoot.querySelector<HTMLButtonElement>(
      ".close"
    );
    closeButton.onclick = () => this.remove();
  }
}
