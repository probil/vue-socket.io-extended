/* eslint-disable import/prefer-default-export */
import camelcase from 'camelcase';

export const eventToAction = event => `socket_${camelcase(event.replace('SOCKET', ''))}`;
