/**
 * @description change # to %23
 * @param str game or clan tag
 * @returns
 */
export function changeToURLencoding(str: string) {
  console.log("str: ", str);
  return str.replace(/#/g, "%23");
}

/**
 * @description change %23 to #
 * @param str game or clan tag
 * @returns
 */
export function decodeURLencoding(str: string) {
  return str.replace(/%23/g, "#");
}
