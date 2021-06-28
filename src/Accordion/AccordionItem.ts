import {
  accordionItemStyles,
  fastAccordionItem,
} from "@microsoft/fast-components";
import { css } from "@microsoft/fast-element";
import styles from "./AccordionItem.styles.scss";

export const AccordionItemComponent = fastAccordionItem({
  styles: css`
    ${accordionItemStyles as any}${styles}
  `,
});
