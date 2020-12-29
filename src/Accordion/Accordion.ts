import { AccordionTemplate as template } from "@microsoft/fast-foundation";
import { FASTAccordion, AccordionStyles } from "@microsoft/fast-components";
import { customElement, css } from "@microsoft/fast-element";
import styles from "./Accordion.styles.scss";

@customElement({
  name: "abr-accordion",
  template,
  styles: css`
    ${AccordionStyles}${styles}
  `,
})
export default class AccordionComponent extends FASTAccordion {}
