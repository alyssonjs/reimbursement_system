import { randomFillSync } from 'crypto';

if (!globalThis.crypto) {
  globalThis.crypto = {
    getRandomValues: (array: Uint8Array) => randomFillSync(array)
  } as Crypto;
}
