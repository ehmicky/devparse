import { parse as babelParse } from '@babel/parser'

import { normalizeTokens } from '../tokens.js'

import { getPlugins } from './plugins.js'

const parse = function(
  plugins,
  code,
  {
    typescript,
    flow,
    jsx,
    next,
    sourceType,
    lenient,
    strict,
    locations,
    tokens,
    source,
  },
) {
  const parseOpts = getParseOpts(plugins, {
    typescript,
    flow,
    jsx,
    next,
    sourceType,
    lenient,
    strict,
    locations,
    tokens,
    source,
  })

  const result = babelParse(code, parseOpts)

  return { ...result, ...normalizeTokens('tokens', result.tokens) }
}

export const babel = {
  id: 'babel',
  name: 'Babel',
  syntaxes: ['typescript', 'flow', 'jsx'],
  parse: parse.bind(null, []),
}

export const babelEstree = {
  id: 'babelEstree',
  name: 'Babel-ESTree',
  syntaxes: ['typescript', 'flow', 'jsx'],
  parse: parse.bind(null, ['estree']),
}

const getParseOpts = function(
  plugins,
  {
    typescript,
    flow,
    jsx,
    next,
    sourceType,
    lenient,
    strict,
    locations,
    tokens,
    source,
  },
) {
  const pluginsA = getPlugins({ plugins, typescript, flow, jsx, next })

  return {
    sourceType,
    // eslint-disable-next-line id-length
    allowReturnOutsideFunction: lenient,
    // eslint-disable-next-line id-length
    allowAwaitOutsideFunction: lenient,
    // eslint-disable-next-line id-length
    allowSuperOutsideFunction: lenient,
    // eslint-disable-next-line id-length
    allowImportExportEverywhere: lenient,
    strictMode: strict,
    plugins: pluginsA,
    ranges: locations,
    tokens,
    sourceFilename: source,
  }
}
