const toRe = path => {
	const keys = []
	const reStr = path
		.split('/')
		.map(part => {
			if (part.charAt(0) == ':')
				// Match params, like:
				// * ':someParam'
				// * ':someParam?'
				part = part.replace(/:[^/?]*/g, function(key, i, s) {
					keys.push(key.replace(/^:/, ''))
					if (s.charAt(s.length - 1) == '?') return '(?:/([^/]*)/?)'
					else return '(?:/([^/]*))'
				})
			else if (part != '')
				if (part.charAt(part.length - 1) == '?')
					part = `(?:/${part.substr(0, part.length - 1)}|/)?`
				else part = `/${part}`
			return part
		})
		.join('')
	const re = new RegExp(`^${reStr || '/'}$`)
	re.keys = keys
	return re
}

const matcher = path => {
	const re = toRe(path)
	return url => {
		re.lastIndex = 0
		const match = re.exec(url)
		if (!match) return null
		const res = {}
		re.keys.forEach((key, i) => (res[key] = match[i + 1]))
		return res
	}
}

module.exports = matcher
module.exports.toRe = toRe
