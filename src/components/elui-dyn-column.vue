<template>
  <el-table-column v-bind="$attrs">
    <template slot="header" slot-scope="h">
      <slot name="header" v-bind="h">{{ h.column.label }}</slot>
    </template>
    <template slot-scope="scope">
      <slot v-bind="scope">
        <span>{{ formatRow(scope.row[prop], scope) }}</span>
      </slot>
    </template>
  </el-table-column>
</template>

<script>
import { format } from "../utils/format";

export default {
  name: "EluiDynColumn",
  props: ["prop", "formatter", "extra"],
  methods: {
    formatRow(prop, scope) {
      return format({
        formatter: this.formatter,
        prop,
        scope,
        extra: this.extra,
      });
    },
  },
};
</script>
