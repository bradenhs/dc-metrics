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

export function showToast(toast: IToastProps) {
  toaster.show({ ...toast, className: dimmed });
}
