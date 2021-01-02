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
      <button class="refresh" @click=${() => triggerAxeCore()}>Refresh</button>
      <button @click=${(x) => x.collapse()}>${(x) => x.collapsed ? 'Expand' : 'Collapse'}</button>
      <button class="close" @click=${(x) => x.remove()}>Close</button>
    </div>
  </div>
  <hr />
  <slot class="${x => x.collapsed}"></slot>`;

@customElement({
  name: "abr-index",
  template,
  styles,
})
export default class IndexComponent extends FASTElement {
  @attr violationCount = 0;
  @attr({mode: 'boolean'}) collapsed: boolean = JSON.parse(sessionStorage.getItem('collapsed'));
  
  collapse() {
    this.collapsed = !this.collapsed;
    sessionStorage.setItem('collapsed', JSON.stringify(this.collapsed)); 
  }
}
