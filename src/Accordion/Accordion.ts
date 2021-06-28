import { accordionStyles, fastAccordion } from "@microsoft/fast-components";
import { css } from "@microsoft/fast-element";
import styles from "./Accordion.styles.scss";

export const AccordionComponent = fastAccordion({
  styles: css`
    ${accordionStyles as any}${styles}
  `,
});
