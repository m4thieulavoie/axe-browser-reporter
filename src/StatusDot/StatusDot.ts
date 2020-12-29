import { FASTElement, customElement, html } from "@microsoft/fast-element";
import styles from "./StatusDot.scss";

const template = html`<slot></slot>`;

@customElement({
  name: "abr-status-dot",
  template,
  styles,
})
export default class StatusDotComponent extends FASTElement {}
