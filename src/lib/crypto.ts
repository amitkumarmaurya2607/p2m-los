const ALGORITHM = "AES-GCM" as const;
const IV_LENGTH = 12;
const TAG_LENGTH = 128;

function getEncryptionKey(): string {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error("ENCRYPTION_KEY environment variable is not set");
  }
  return key;
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function getCryptoKey(): Promise<CryptoKey> {
  const rawKey = getEncryptionKey();
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(rawKey));
  return crypto.subtle.importKey("raw", new Uint8Array(hash), { name: ALGORITHM }, false, [
    "encrypt",
    "decrypt",
  ]);
}

export async function encrypt(plaintext: string): Promise<string> {
  const cryptoKey = await getCryptoKey();
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));

  const encrypted = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv, tagLength: TAG_LENGTH },
    cryptoKey,
    new TextEncoder().encode(plaintext),
  );

  const encryptedBytes = new Uint8Array(encrypted);
  const authTag = encryptedBytes.slice(-16);
  const ciphertext = encryptedBytes.slice(0, -16);

  const combined = new Uint8Array(IV_LENGTH + 16 + ciphertext.length);
  combined.set(iv, 0);
  combined.set(authTag, IV_LENGTH);
  combined.set(ciphertext, IV_LENGTH + 16);

  return bytesToBase64(combined);
}

export async function decrypt(encryptedBase64: string): Promise<string> {
  const cryptoKey = await getCryptoKey();
  const combined = base64ToBytes(encryptedBase64);

  const iv = combined.slice(0, IV_LENGTH);
  const authTag = combined.slice(IV_LENGTH, IV_LENGTH + 16);
  const ciphertext = combined.slice(IV_LENGTH + 16);

  const cipherWithTag = new Uint8Array(ciphertext.length + authTag.length);
  cipherWithTag.set(ciphertext, 0);
  cipherWithTag.set(authTag, ciphertext.length);

  const decrypted = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv, tagLength: TAG_LENGTH },
    cryptoKey,
    cipherWithTag,
  );

  return new TextDecoder().decode(decrypted);
}
