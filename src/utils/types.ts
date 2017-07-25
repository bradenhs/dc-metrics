import { isInteger } from "~/utils";

export function asNumber(value) {
  if (typeof value != "number") {
    throw new Error("Value was not a number");
  }
  return value;
}

export function asInteger(value) {
  if (typeof value != "number" || !isInteger(value)) {
    throw new Error("Value was not an integer");
  }
  return value;
}

export function asString(value) {
  if (typeof value != "string") {
    throw new Error("Value was not a string");
  }
  return value;
}
