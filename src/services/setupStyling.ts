import { normalize } from "csstips";
import { Colors } from "@blueprintjs/core";
import { style } from "typestyle";

export function setupStyling() {
  // Initial CSS setup
  normalize();
  document.body.classList.add(
    style({
      background: Colors.DARK_GRAY3,
      $nest: {
        "*": {
          outline: "none !important",
          userSelect: "none"
        }
      }
    })
  );

  document.body.classList.add("pt-dark");
}
