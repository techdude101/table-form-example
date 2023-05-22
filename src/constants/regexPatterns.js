const ALL_CHARACTERS = '.+';
const ALPHA_NUMERIC_WHITESPACE = '[\\s\\w\\d:\\xC0-\\xff]+';
const ALPHA_WHITESPACE = '[\\s\\w\\xC0-\\xff]+';
const DIGITS_AND_COMMA = '[\\d,]+';
const PRINTABLE_CHARACTERS = '[\\s\\w\\d:"!£$%^&*()_+-=#~\\xC0\\-\\xff]+';

export default {
  ALL_CHARACTERS,
  ALPHA_NUMERIC_WHITESPACE,
  DIGITS_AND_COMMA,
  ALPHA_WHITESPACE,
  PRINTABLE_CHARACTERS,
};
