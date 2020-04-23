export function decodeEntities(encodedString) {
  const translate_re = /&(nbsp|ntilde|aacute|oacute|eacute|ocirc|amp|quot|lt|gt);/g
  const translate = {
    nbsp: ' ',
    eacute: 'é',
    Eacute: 'È',
    ocirc: 'ô',
    ntilde: 'ñ',
    oacute: 'ó',
    aacute: 'á',
    amp: '&',
    quot: '"',
    lt: '<',
    gt: '>',
  }
  return encodedString
    .replace(translate_re, (_, entity) => translate[entity])
    .replace(/&#(\d+);/gi, (_, numStr) => {
      const num = parseInt(numStr)
      return String.fromCharCode(num)
    })
}
