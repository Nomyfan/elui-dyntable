function group(list, keyOf) {
  const groups = {};
  for (let it of list) {
    const key = keyOf(it);
    if (key) {
      groups[key] = it;
    }
  }
  return groups;
}

export { group };
