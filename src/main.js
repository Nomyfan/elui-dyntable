import Vue from "vue";
import App from "./App.vue";
import { Table, TableColumn, Switch, Button } from "element-ui";
import style from "element-ui/lib/theme-chalk/index.css";
import EluiDynTable from "./components/index";

Vue.config.productionTip = false;

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(Button);
Vue.use(style);
Vue.use(EluiDynTable);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
