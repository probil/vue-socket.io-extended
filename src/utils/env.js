/* eslint-disable import/prefer-default-export */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

export const hasProxy = (
  typeof Proxy !== 'undefined' && isNative(Proxy)
);
