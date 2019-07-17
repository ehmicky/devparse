import { parse as typescriptEstreeParse } from '@typescript-eslint/typescript-estree'

const parse = function(code, { loose, locations, comments, jsx, tokens }) {
  try {
    return typescriptEstreeParse(code, {
      errorOnUnknownASTType: loose,
      loc: locations,
      range: locations,
      comment: comments,
      jsx,
      useJSXTextNode: jsx,
      tokens,
    })
  } catch (error) {
    throw normalizeError(error)
  }
}

export const typescriptEstree = {
  id: 'typescriptEstree',
  title: 'TypeScript-ESTree',
  syntaxes: ['typescript', 'jsx'],
  parse,
}

// typescript-estree errors are not error instances
const normalizeError = function({ message, lineNumber, column }) {
  return new Error(`${message} (${lineNumber}:${column})`)
}
