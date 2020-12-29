import { AccordionItemTemplate as template } from "@microsoft/fast-foundation";
import {
  FASTAccordionItem,
  AccordionItemStyles,
} from "@microsoft/fast-components";
import { customElement, css } from "@microsoft/fast-element";
import styles from "./AccordionItem.styles.scss";

@customElement({
  name: "abr-accordion-item",
  template,
  styles: css`
    ${AccordionItemStyles}${styles}
  `,
})
export default class AccordionComponent extends FASTAccordionItem {}
