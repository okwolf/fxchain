const isArray = Array.isArray;
const isFn = value => typeof value === "function";
const isObj = value => typeof value === "object" && !isArray(value);
const isFx = value => isObj(value) && isFn(value.run);

module.exports = {
  isArray,
  isFn,
  isObj,
  isFx
};
