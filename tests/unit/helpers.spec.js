import {
  replaceText,
  replaceTextAt,
  getTemplateFromLocalStorage,
  getDataFromLocalStorage,
  isValidString,
  isTextValid,
  saveDataToLocalStorage,
} from '../../src/utils/helpers';

describe('Helper functions', () => {
  it.each`
    text | matcher | replacementtext | expected
    ${'Testing <code>'} | ${'<code>'} | ${'123'} | ${'Testing 123'}
    ${'Testing <code><code>'} | ${'<code>'} | ${'123'} | ${'Testing 123<code>'}
    ${''} | ${''} | ${''} | ${null}
    ${'Test'} | ${''} | ${'123'} | ${null}
    ${'Testing <code>'} | ${'<code>'} | ${''} | ${'Testing <code>'}
    ${''} | ${'<code>'} | ${'123'} | ${null}
    `('Replace $text where placeholder = $matcher with $replacementtext',
  ({
    text, matcher, replacementtext, expected,
  }) => {
    const result = replaceText(text, matcher, replacementtext);
    expect(result).toBe(expected);
  });

  it.each`
    text | matcher | position | replacementtext | expected
    ${'Testing <code>'} | ${'<code>'} | ${0} | ${'123'} | ${'Testing 123'}
    ${'ABC <code> <code>'} | ${'<code>'} | ${3} | ${'123'} | ${'ABC 123 <code>'}
    ${'ABC <code> <code>'} | ${'<code>'} | ${9} | ${'123'} | ${'ABC <code> 123'}
    ${'ABC <code> <code>'} | ${'<code>'} | ${-1} | ${'123'} | ${null}
    ${'ABC <code> <code>'} | ${'<code>'} | ${20} | ${'123'} | ${null}
    ${'ABC <code> <code>'} | ${'<code>'} | ${'3'} | ${'123'} | ${null}
    `('Replace $text where placeholder = $matcher at $position with $replacementtext',
  ({
    text, matcher, position, replacementtext, expected,
  }) => {
    const result = replaceTextAt(text, matcher, replacementtext, position);
    expect(result).toBe(expected);
  });

  test('When template does not exist return null', () => {
    const result = getTemplateFromLocalStorage();
    expect(result).toBe(null);
  });

  it.each`
  input | expected
  ${undefined}  | ${null}
  ${null}       | ${null}
  ${''}         | ${null}
  ${true}       | ${null}
  `('When getDataFromLocalStorage is called with $input should return $expected',
  ({
    input, expected,
  }) => {
    const result = getDataFromLocalStorage(input);
    expect(result).toBe(expected);
  });

  test('When local storage item contains invalid JSON', () => {
    localStorage.clear();
    localStorage.setItem('item', null);
    const result = getDataFromLocalStorage('item');
    expect(result).toBe(null);
  });

  it.each`
  key | value | expected
  ${''} | ${'key with empty string'} | ${false}
  ${'object'} | ${{ a: 'b' }} | ${true}
  ${'array_with_mixed_types'} | ${['1', 2, true]} | ${true}
  ${'test key'} | ${'test value'} | ${true}
  ${'empty string'} | ${''} | ${true}
  `('Local Storage - Save $value with $key should return $expected',
  ({
    key, value, expected,
  }) => {
    const result = saveDataToLocalStorage(key, value);
    expect(result).toBe(expected);
  });

  it.each`
  input | minLength | maxLength | expected
  ${true}   | ${1} | ${255} | ${false}
  ${undefined}   | ${1} | ${255} | ${false}
  ${null}   | ${1} | ${255} | ${false}
  ${1} | ${1} | ${255} | ${false}
  ${'Test valid string'} | ${1} | ${255} | ${true}
  ${'Test valid string'} | ${1} | ${2} | ${false}
  `('isValidString tests',
  ({
    input, minLength, maxLength, expected,
  }) => {
    const result = isValidString(input, minLength, maxLength);
    expect(result).toBe(expected);
  });

  it.each`
  input | maxLength | expected
  ${true}  | ${255} | ${false}
  ${'Test valid string'} | ${255} | ${true}
  ${'Test valid string'} | ${2} | ${false}
  ${'String with spaces at the end   '} | ${255} | ${true}
  ${'   '} | ${255} | ${false}
  `('isTextValid tests',
  ({
    input, maxLength, expected,
  }) => {
    const result = isTextValid(input, maxLength);
    expect(result).toBe(expected);
  });

  test('isTextValid called with minimum arguments', () => {
    const input = 'Testing123';
    const result = isTextValid(input);
    expect(result).toBe(true);
  });
});
