import { DesignSystem } from "@microsoft/fast-foundation";
import { AccordionComponent } from "./Accordion/Accordion";
import { AccordionItemComponent } from "./Accordion/AccordionItem";
import { setupAxeCore } from "./Utils/setup";

DesignSystem.getOrCreate()
  .withPrefix("abr")
  .register(AccordionComponent, AccordionItemComponent);

require("./Index/Index");
require("./StatusDot/StatusDot");

setupAxeCore();
