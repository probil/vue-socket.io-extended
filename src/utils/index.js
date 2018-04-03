/* eslint-disable import/prefer-default-export */
import camelcase from 'camelcase';

export const eventToAction = event => `socket_${camelcase(event.replace('SOCKET', ''))}`;

export const isFunction = obj => typeof obj === 'function';

export const isSocketIo = obj => obj && isFunction(obj.on) && isFunction(obj.emit);
