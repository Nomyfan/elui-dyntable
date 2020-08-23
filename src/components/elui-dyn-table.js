import { Table } from "element-ui";
import EluiDynColumn from "./elui-dyn-column";
import { group } from "../utils/list";

const EluiDynTable = {
  name: "EluiDynTable",

  props: {
    data: {
      type: Array,
      default: () => [],
    },
    desc: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    toggle(prop, hidden) {
      const d = this.desc.find((e) => e.prop === prop);
      if (d) {
        if (hidden !== undefined) {
          d.hidden = !!hidden;
        } else {
          d.hidden = !d.hidden;
        }
        this.$forceUpdate();
      }
    },
  },
  render: function (h) {
    const isDynColumn = (c) =>
      c.componentOptions.Ctor.extendOptions.name === "EluiDynColumn";
    const dynColumns = (this.$slots.default || []).filter(isDynColumn);
    const keyOf = (c) => c.componentOptions.propsData.prop;
    const columnGroups = group(dynColumns, keyOf);

    const children = [];
    for (let d of this.desc) {
      if (d.hidden) {
        continue;
      }
      let child = columnGroups[d.prop];
      if (child) {
        const propKeys = Object.keys(child.componentOptions.Ctor.options.props);
        for (let k in d) {
          if (propKeys.indexOf(k) >= 0) {
            child.componentOptions.propsData[k] = d[k];
          } else {
            child.data.attrs[k] = d[k];
          }
        }
      } else {
        const propKeys = Object.keys(EluiDynColumn.props);
        const props = {};
        const attrs = {};
        for (let k in d) {
          if (propKeys.indexOf(k) >= 0) {
            props[k] = d[k];
          } else {
            attrs[k] = d[k];
          }
        }
        child = h(EluiDynColumn, {
          props,
          attrs,
        });
      }
      children.push(child);
    }
    return h(Table, { props: this.$props, attrs: this.$attrs }, children);
  },
};

export { EluiDynTable };
