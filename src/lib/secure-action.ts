import { encrypt, decrypt } from "@/lib/crypto";

const CLIENT_ENABLED =
  typeof process !== "undefined" &&
  typeof process.env.NEXT_PUBLIC_ENCRYPTION_ENABLED === "string" &&
  process.env.NEXT_PUBLIC_ENCRYPTION_ENABLED === "true";

const SERVER_ENABLED =
  typeof process !== "undefined" &&
  typeof process.env.ENCRYPTION_ENABLED === "string" &&
  process.env.ENCRYPTION_ENABLED === "true";

type EncryptedPayload = {
  __encrypted: true;
  data: string;
  __formData?: true;
};

export async function callSecure<T>(
  action: (...args: any[]) => Promise<T>,
  payload: unknown,
): Promise<T> {
  if (!CLIENT_ENABLED) return action(payload);

  const encrypted = await encrypt(JSON.stringify(payload));
  return action({ __encrypted: true, data: encrypted } satisfies EncryptedPayload);
}

export async function callSecureFormData<T>(
  action: (...args: any[]) => Promise<T>,
  formData: FormData,
): Promise<T> {
  if (!CLIENT_ENABLED) return action(formData);

  const fields: Record<string, string> = {};
  const files: { name: string; filename: string; type: string; data: string }[] = [];

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      const buffer = await value.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      files.push({
        name: key,
        filename: value.name,
        type: value.type,
        data: btoa(binary),
      });
    } else {
      fields[key] = value;
    }
  }

  const encrypted = await encrypt(JSON.stringify({ fields, files }));
  return action({ __encrypted: true, __formData: true, data: encrypted } satisfies EncryptedPayload);
}

export function withDecryption<T, R>(
  handler: (data: T) => Promise<R>,
): (input: T | EncryptedPayload) => Promise<R> {
  return async (input: T | EncryptedPayload): Promise<R> => {
    if (!SERVER_ENABLED) return handler(input as T);

    if (
      typeof input === "object" &&
      input !== null &&
      "__encrypted" in input &&
      (input as EncryptedPayload).__encrypted
    ) {
      const enc = input as EncryptedPayload;
      const decrypted = await decrypt(enc.data);

      if (enc.__formData) {
        const { fields, files } = JSON.parse(decrypted) as {
          fields: Record<string, string>;
          files: { name: string; filename: string; type: string; data: string }[];
        };
        const formData = new FormData();
        for (const [key, value] of Object.entries(fields)) {
          formData.append(key, value);
        }
        for (const file of files) {
          const binary = atob(file.data);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([bytes], { type: file.type });
          formData.append(file.name, blob, file.filename);
        }
        return handler(formData as unknown as T);
      }

      return handler(JSON.parse(decrypted) as T);
    }

    return handler(input as T);
  };
}
