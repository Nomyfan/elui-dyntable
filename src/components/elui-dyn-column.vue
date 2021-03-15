<template>
  <el-table-column v-bind="$attrs">
    <template slot-scope="scope">
      <span>{{ formatRow(scope.row[prop], scope) }}</span>
    </template>
  </el-table-column>
</template>

<script>
import { format } from "../utils/format";

export default {
  name: "EluiDynColumn",
  props: ["prop", "formatter", "extra", "tester"],
  methods: {
    formatRow(prop, scope) {
      return format({
        formatter: this.formatter,
        prop,
        scope,
        tester: this.tester,
        extra: this.extra,
      });
    },
  },
};
</script>
