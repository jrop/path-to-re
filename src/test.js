const test = require('tape')
const matcher = require('./index')

const match = (pattern, url) => matcher(pattern)(url)

test('/', t => {
	t.plan(2)
	t.deepLooseEqual(match('/', '/'), {})
	t.equal(match('/', ''), null)
})

test('/path', t => {
	t.plan(2)
	t.deepLooseEqual(match('/path', '/path'), {})
	t.equal(match('/path', '/'), null)
})

test('/path?/other', t => {
	t.plan(2)
	t.deepLooseEqual(match('/path?/other', '/path/other'), {})
	t.deepLooseEqual(match('/path?/other', '/other'), {})
})

test('/path/:param', t => {
	t.plan(3)
	t.deepLooseEqual(match('/path/:param', '/path/value'), {param: 'value'})
	t.equal(match('/path/:param', '/path'), null)
	t.deepLooseEqual(match('/path/:param', '/path/'), {param: ''})
})

test('/path/:param?', t => {
	t.plan(3)
	t.deepLooseEqual(match('/path/:param?', '/path/value'), {param: 'value'})
	t.deepLooseEqual(match('/path/:param?', '/path'), {param: undefined})
	t.deepLooseEqual(match('/path/:param?', '/path/'), {param: ''})
})

test('/path/:param/:opt?', t => {
	t.plan(3)
	t.deepLooseEqual(match('/path/:param/:opt?', '/path/value1/value2'), {
		param: 'value1',
		opt: 'value2',
	})
	t.deepLooseEqual(match('/path/:param/:opt?', '/path'), null)
	t.deepLooseEqual(match('/path/:param/:opt?', '/path/'), {
		param: '',
		opt: undefined,
	})
})

test('/path/:param?/:opt?', t => {
	t.plan(4)
	t.deepLooseEqual(match('/path/:param?/:opt?', '/path/value1/value2'), {
		param: 'value1',
		opt: 'value2',
	})
	t.deepLooseEqual(match('/path/:param?/:opt?', '/path/value1'), {
		param: 'value1',
		opt: undefined,
	})
	t.deepLooseEqual(match('/path/:param?/:opt?', '/path'), {
		param: undefined,
		opt: undefined,
	})
	t.deepLooseEqual(match('/path/:param?/:opt?', '/path/'), {
		param: '',
		opt: undefined,
	})
})
