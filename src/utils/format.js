const inlist = (v, list) => list.indexOf(v) >= 0;

const externalFormatter = {};

/**
 * Specified a new formatter globally. Any formatter specified
 * using this function has higher priority than those who are internal.
 * Specified twice will override the one previously specified.
 * @param {string} type
 * @param {(prop: any, scope: any) => string | undefined} formatter
 */
export function setFormatter(type, formatter) {
  if (typeof formatter === "function") {
    externalFormatter[type] = formatter;
  } else if (formatter === undefined) {
    const f = externalFormatter[type];
    delete externalFormatter[type];
    return f;
  }
}

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
  console.error(`${array} is not an array`);
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
    const errMsg = `cannot find a suitable formatter for [${type}], you can try to define you own formatter by calling setFormatter`;
    /* eslint-disable no-console */
    console.error(errMsg);
    return "";
  };
}

export function format({ formatter, tester, prop, scope, extra }) {
  if (tester && typeof tester === "function") {
    if (!tester(prop, scope)) {
      return "";
    }
  }

  if (typeof formatter === "function") {
    return formatter(prop, scope);
  }

  if (typeof formatter === "string" && externalFormatter[formatter]) {
    return externalFormatter[formatter](prop, scope);
  }

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
  return formatterByType(prop)(prop, extra);
}
