/**
 * Checks if the given input is a string type and has a length between minLength and maxLength
 * @param {Any} str
 * @param {Number} minLength
 * @param {Number} maxLength
 * @returns {boolean} true if valid or false otherwise
 */
export const isValidString = (str, minLength = 1, maxLength = Infinity) => {
  // Check if itemName is null or undefined
  if (str == null || str === undefined) return false;
  // Check if itemName is a string
  if (typeof str !== 'string') return false;
  // Check if itemName string length is between 1 and 255
  return (str && (str.length >= minLength) && (str.length <= maxLength));
};

/**
 *
 * @param {String} text
 * @param {RegExp} matcher
 * @param {String} replacementText
 * @returns {String | null}
 */
export const replaceText = (text, matcher, replacementText) => {
  if (!matcher) return null;
  if (!replacementText) return text;
  if (!text) return null;
  return text.replace(matcher, replacementText);
};

/**
 *
 * @param {String} text
 * @param {RegExp} matcher
 * @param {String} replacementText
 * @param {Number} startPosition
 * @returns {String | null}
 */
export const replaceTextAt = (
  text,
  matcher,
  replacementText,
  startPosition = 0,
) => {
  if (startPosition < 0) return null;
  if (startPosition > text.length) return null;
  if (typeof startPosition !== 'number') return null;
  if (startPosition === 0) return text.replace(matcher, replacementText);
  const firstPart = text.substring(0, startPosition);
  let secondPart = text.substring(startPosition, text.length);
  secondPart = replaceText(secondPart, matcher, replacementText);
  return firstPart + secondPart;
};

/**
 *
 * @param {String} text
 * @param {Number} maxLength
 * @returns {Boolean}
 */
export const isTextValid = (text, maxLength = 50) => {
  if (!(isValidString(text, 1, maxLength))) return false;
  const trimmedValue = text.trim();
  const textLength = trimmedValue.length;
  if (textLength < 1) return false;
  return (textLength <= maxLength);
};

/**
 *
 * @returns {String | null}
 */
export const getBrowserVersion = () => {
  const browser = navigator.userAgent;
  if (browser.includes('Edg')) return 'Edge';
  if (browser.includes('Firefox')) return 'Firefox';
  if (browser.includes('Trident')) return 'IE';
  if (browser.includes('Chrome')) return 'Chrome';
  return null;
};

/**
 *
 * @returns {boolean}
 */
export const isBrowserMicrosoftEdge = () => {
  const browser = getBrowserVersion();
  if (!browser) return null;
  return browser.includes('Edg');
};

/**
 *
 * @param {String} itemName
 * @returns {Array | null}
 */
export const getDataFromLocalStorage = (itemName) => {
  // Check if itemName is null or undefined and a string
  if (isValidString(itemName) === false) return null;

  if (localStorage[itemName]) {
    // Catch SyntaxError: JSON.parse or other exceptions
    try {
      return JSON.parse(localStorage.getItem(itemName));
    } catch {
      return null;
    }
  }
  return null;
};

/**
 *
 * @param {String} itemName
 * @param {String | Object} itemValue
 * @returns { boolean }
 */
export const saveDataToLocalStorage = (itemName, itemValue) => {
  // Check if itemName is null or undefined and a string
  if (isValidString(itemName) === false) return null;
  // Check if itemName string length is between 1 and 255
  if ((itemName.length < 1) || (itemName.length > 255)) {
    return false;
  }

  // Check if itemValue is null or undefined
  if (itemValue == null || itemValue === undefined) return false;
  localStorage.setItem(itemName, JSON.stringify(itemValue));

  const valueReturned = getDataFromLocalStorage(itemName);
  return valueReturned !== null;
};

/**
 *
 * @returns {String | null}
 */
export const getTemplateFromLocalStorage = () => {
  const template = getDataFromLocalStorage('template');
  if (template) return template;
  return null;
};
