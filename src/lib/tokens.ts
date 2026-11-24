import crypto from "crypto";

/**
 * Genera un token criptográficamente seguro con al menos 128 bits de aleatoriedad (16 bytes = 32 caracteres hexadecimales).
 */
export function generateSecureToken(): string {
  return crypto.randomBytes(16).toString("hex");
}
