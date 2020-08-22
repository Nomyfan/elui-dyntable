const inlist = (v, list) => list.indexOf(v) >= 0;

function formatNumber(prop) {
  return prop ? prop : 0;
}

function formatArray(array, extra) {
  if (Array.isArray(array)) {
    const seperator = (extra && extra.seperator) || ",";
    const slice = (extra && extra.slice) || array.length;
    return array
      .slice(0, slice)
      .join(seperator)
      .concat((extra && extra.suffix) || "");
  }
  /* eslint-disable no-console */
  console.error(`${array}不是数组`);
  return "";
}

/**
 *
 * @param {number} ts
 */
function formatTimestamp(ts) {
  const date = new Date(ts);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  const zp = (n) => `${n < 10 ? 0 : ""}${n}`;

  return `${year}-${month}-${day} ${zp(hour)}:${zp(min)}:${zp(sec)}`;
}

/**
 *
 * @param {number} second
 */
function formatSecond(second) {
  return formatTimestamp(second * 1000);
}

function formatterByType(prop) {
  const type = typeof prop;
  if (type === "number") {
    return formatNumber;
  }
  if (inlist(type, ["string", "boolean", "bigint", "undefined"])) {
    return (_) => _;
  }
  if (type === "object" && Array.isArray(prop)) {
    return formatArray;
  }
  return () => {
    const errMsg = `找不到适合[${type}]类型的格式化器，可以尝试自己定义格式化器`;
    /* eslint-disable no-console */
    console.error(errMsg);
    return "";
  };
}

export function format({ formatter, prop, scope, extra }) {
  if (formatter === "number") {
    return formatNumber(prop);
  }
  if (formatter === "array") {
    return formatArray(prop, extra);
  }
  if (formatter === "ts") {
    return formatTimestamp(prop);
  }
  if (formatter === "second") {
    return formatSecond(prop);
  }
  if (
    formatter === "custom" &&
    extra &&
    extra.formatter &&
    typeof extra.formatter === "function"
  ) {
    return extra.formatter(prop, scope);
  }
  return formatterByType(prop)(prop, extra);
}
