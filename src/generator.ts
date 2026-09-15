import { Clipboard, getPreferenceValues, showHUD, showToast, Toast } from "@raycast/api";
import { randomBytes } from "node:crypto";

type Delivery = "copy-and-close" | "copy" | "paste";
type SecretKind = "password" | "simple password" | "webhook secret";

interface Preferences {
  delivery: Delivery;
  easyToRead: boolean;
}

const PASSWORD_CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%^&*-_";
const EASY_TO_READ_PASSWORD_CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
const URL_SAFE_CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789-_";

/** Generates an unbiased random string using the operating system's cryptographically secure RNG. */
export function randomString(length: number, characters: string): string {
  const maximumUnbiasedByte = 256 - (256 % characters.length);
  let result = "";

  while (result.length < length) {
    const bytes = randomBytes(Math.ceil((length - result.length) * 1.2) + 4);

    for (const byte of bytes) {
      if (byte < maximumUnbiasedByte) {
        result += characters[byte % characters.length];
        if (result.length === length) break;
      }
    }
  }

  return result;
}

export async function generateAndDeliver(length: number, kind: SecretKind): Promise<void> {
  const preferences = getPreferenceValues<Preferences>();
  const characters =
    kind === "webhook secret"
      ? URL_SAFE_CHARACTERS
      : kind === "simple password"
        ? EASY_TO_READ_PASSWORD_CHARACTERS
        : preferences.easyToRead
          ? EASY_TO_READ_PASSWORD_CHARACTERS
          : PASSWORD_CHARACTERS;
  const secret = randomString(length, characters);

  if (preferences.delivery === "paste") {
    await Clipboard.paste(secret);
    await showHUD(`${length}-character ${kind} pasted`);
    return;
  }

  await Clipboard.copy(secret);

  if (preferences.delivery === "copy-and-close") {
    await showHUD(`${length}-character ${kind} copied`);
    return;
  }

  await showToast({ style: Toast.Style.Success, title: `${length}-character ${kind} copied` });
}
