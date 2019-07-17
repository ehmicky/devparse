export const getRemovedAttrs = function({ locations, comments, parens }) {
  return [
    ...(locations ? [] : LOCATION_ATTRS),
    ...(comments ? [] : COMMENT_ATTRS),
    ...(parens ? [] : PARENS_ATTRS),
  ]
}

export const LOCATION_ATTRS = ['start', 'end', 'range', 'loc']
const COMMENT_ATTRS = [
  'comments',
  'innerComments',
  'leadingComments',
  'trailingComments',
]
const PARENS_ATTRS = ['parenStart', 'parenthesized']

export const removeAttrs = function(node, removedAttrs) {
  if (removedAttrs.length === 0) {
    return node
  }

  return Object.fromEntries(
    Object.entries(node).filter(([attr]) => !removedAttrs.includes(attr)),
  )
}
