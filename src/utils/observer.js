import camelcase from 'camelcase';

export const eventToMutationTransformer = event => (
  event.toUpperCase()
);

export const eventToActionTransformer = camelcase;
