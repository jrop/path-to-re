# path-to-re

> A lightweight alternative to `path-to-regexp`

# Installation

```sh
$ npm install --save path-to-re
```

# Usage

```js
import createMatcher, {toRe} from 'path-to-re'

const regExp = toRe('/some/path/:param/:optional?')
regExp.keys // => ['param', 'optional']

const matcher = createMatcher('/some/path/:param/:optional?')
matcher('/nope') // => null
matcher('/some/path/value1') // => {param: 'value1'}
matcher('/some/path/value1/value2') // => {param: 'value1', optional: 'value2'}
```

# License (ISC)

ISC License (ISC)
Copyright 2017 <jrapodaca@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
