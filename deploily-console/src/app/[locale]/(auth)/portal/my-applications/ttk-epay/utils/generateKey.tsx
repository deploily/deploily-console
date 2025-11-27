import crypto from "crypto";

export function generateKey() {
  return crypto.randomBytes(20).toString("hex"); // 20 bytes = 40 hex characters
}
