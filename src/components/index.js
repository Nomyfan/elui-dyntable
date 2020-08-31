import { EluiDynTable } from "./elui-dyn-table";
import EluiDynColumn from "./elui-dyn-column";
import { setFormatter } from "../utils/format";

const components = [EluiDynColumn, EluiDynTable];

function install(Vue) {
  if (install.installed) {
    return;
  }
  components.forEach((c) => {
    Vue.component(c.name, c);
  });
  install.installed = true;
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { EluiDynColumn, EluiDynTable, setFormatter };

export default {
  install,
  ...components,
};
