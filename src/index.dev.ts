// import "@webcomponents/webcomponentsjs";
import { triggerAxeCore } from "./Utils/setup";

require("./Index/Index");
require("./Accordion");
require("./StatusDot/StatusDot");

console.log("test");
// setupAxeCore({
//   runIf: () => true,
// });

triggerAxeCore();

console.log("test2");
