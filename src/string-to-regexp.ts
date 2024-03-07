export function stringToRegExp (str:string):RegExp {
    str = str
        .concat('/?')
        .replace(/\/\(/g, '(?:/')
        .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?|\*/g, tweak)
        .replace(/([/.])/g, '\\$1')
        .replace(/\*/g, '(.*)')

    return new RegExp('^' + str + '$', 'i')

    function tweak (match, slash, format, key, capture, optional) {
        if (match === '*') {
            return match
        }

        slash = slash || ''

        return '' +
      (optional ? '' : slash) +
      '(?:' +
      (optional ? slash : '') +
      (format || '') +
      (capture ? capture.replace(/\*/g, '{0,}').replace(/\./g, '[\\s\\S]') : '([^/]+?)') +
      ')' +
      (optional || '')
    }
}
