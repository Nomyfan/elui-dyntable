<template>
  <div id="app">
    <el-switch
      inactive-text="不显示出生列"
      active-text="显示出生列"
      v-model="switchModel"
      @change="handleSwitchChange"
    ></el-switch>
    <EluiDynTable
      :desc="tableDesc"
      :data="tableData"
      @selection-change="handleSelectChange"
      ref="table"
    >
      <ElTableColumn type="selection" width="50" prop="selection" />
      <ElTableColumn prop="operation">
        <span slot="header">
          自定义
        </span>
        <div slot-scope="{ row, $index }">
          <el-button type="danger" size="mini" @click="handleClick(row, $index)"
            >删除</el-button
          >
        </div>
      </ElTableColumn>
    </EluiDynTable>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      switchModel: true,
      tableDesc: [
        { prop: "selection" },
        { prop: "name", label: "名字" },
        { prop: "city", label: "城市" },
        { prop: "born", label: "出生时间", formatter: "ts" },
        { prop: "operation", label: "操作", fixed: "right" },
      ],
      tableData: [
        {
          name: "Alice",
          city: "Shanghai",
          born: 946656000000,
        },
        {
          name: "Bob",
          city: "Hongkong",
          born: 946699994000,
        },
      ],
    };
  },
  methods: {
    handleClick(row, index) {
      /* eslint-disable no-console */
      console.log(`deleting ${row.name} at ${index}`);
    },
    handleSwitchChange() {
      this.$refs.table.toggle("born");
    },
    handleSelectChange(val) {
      /* eslint-disable no-console */
      console.log(val);
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
