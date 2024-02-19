import bitwise from "bitwise"
import { UInt4, UInt8 } from "bitwise/types";


export const getHighNibbleForByte = (byteValue: UInt8): UInt4 => {
  const b = bitwise.byte.read(byteValue);
  const n = b.slice(0, 4);
  const v = (n[0] * 8) + (n[1] * 4) + (n[2] * 2) + (n[3] * 1);
  return v as UInt4;
}

export const getLowNibbleForByte = (byteValue: UInt8): UInt4 => {
  const b = bitwise.byte.read(byteValue);
  const n = b.slice(4, 8);
  const v = (n[0] * 8) + (n[1] * 4) + (n[2] * 2) + (n[3] * 1);
  return v as UInt4;
}