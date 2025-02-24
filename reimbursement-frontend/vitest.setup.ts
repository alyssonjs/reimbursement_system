import { randomFillSync } from 'crypto';

if (typeof globalThis.crypto === 'undefined' || typeof globalThis.crypto.getRandomValues !== 'function') {
  globalThis.crypto = {
    getRandomValues: (array: Uint8Array) => randomFillSync(array)
  } as Crypto;
}