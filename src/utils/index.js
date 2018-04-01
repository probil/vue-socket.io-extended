/* eslint-disable import/prefer-default-export */

export const eventToAction = event => `socket_${
  event
    .replace('SOCKET_', '')
    .toLowerCase()
    .replace(/[\W\s_]+(\w)/g, (match, p1) => p1.toUpperCase())
}`;
