const { test, expect } = require('@jest/globals');
const { normalizeURL } = require('./crawl.js');

test('normalize protocols', () => {
    const input = 'HTtpS://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalize special characters in URLs', () => {
    let input = 'http://example.com/search?q=foo bar';
    let actual = normalizeURL(input);
    let expected = 'example.com/search?q=foo%20bar';
    expect(actual).toEqual(expected);
});

test('normalize slash', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
})