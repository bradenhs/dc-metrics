import { Toaster, Position, IToastProps } from "@blueprintjs/core";
import { style } from "typestyle";

const toaster = Toaster.create({
  position: Position.BOTTOM_RIGHT
});

// This resolves bug with the display of the first toast message
toaster.show({ message: "", className: style({ display: "none" }) });

const dimmed = style({
  opacity: 0.9
});

let lastToast: string;
let lastToastKey: string;

export function showToast(toast: IToastProps) {
  if (JSON.stringify(toast) !== lastToast) {
    toaster.dismiss(lastToastKey);
  }
  lastToastKey = toaster.show({ ...toast, className: dimmed });
}
