import Vue from 'vue'
import App from './App.vue'
import router from './router' //引入路由
import store from './store' //引入vuex的store
import {
  RadioGroup,
  RadioButton,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Input,
  Button,
  Table,
  TableColumn,
  Row,
  Col,
  Pagination,
  Form,
  FormItem,
  Select,
  Option,
  DatePicker,
  TimePicker,
  Upload ,
  Dialog, 
  Breadcrumb,
  BreadcrumbItem,
  Cascader,
  Popover,
  Tree,
  message,
  Loading,
  MessageBox
} from 'element-ui'; //局部引用element
Vue.component('el-radio-group', RadioGroup);
Vue.component('el-radio-button', RadioButton);
Vue.component('el-menu', Menu);
Vue.component('el-submenu', Submenu);
Vue.component('el-menu-item-group', MenuItemGroup);
Vue.component('el-menu-item', MenuItem);
Vue.component('el-input', Input);
Vue.component('el-button', Button);
Vue.component('el-table', Table);
Vue.component('el-table-column', TableColumn);
Vue.component('el-row', Row);
Vue.component('el-col', Col);
Vue.component('el-pagination', Pagination);
Vue.component('el-form', Form);
Vue.component('el-form-item', FormItem);
Vue.component('el-select', Select);
Vue.component('el-option', Option);
Vue.component('el-date-picker', DatePicker);
Vue.component('el-time-picker', TimePicker);
Vue.component('el-upload', Upload);
Vue.component('el-dialog', Dialog);
Vue.component('el-breadcrumb', Breadcrumb);
Vue.component('el-breadcrumb-item', BreadcrumbItem);
Vue.component('el-cascader', Cascader);
Vue.component('el-popover', Popover);
Vue.component('el-tree', Tree);
Vue.use(Loading.directive); //使用loding
import './assets/css/common.css' //引入common.css
import './assets/css/elementGlobal.css' //引入common.css
import 'font-awesome/css/font-awesome.min.css' //引入font-awesom
import api from './api/index' //引入axios封装文件
Vue.config.productionTip = false //阻止生产环境提示
Vue.prototype.$message = message //安装$message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$prompt = MessageBox.prompt
new Vue({
  render: h => h(App), //动态创建<App></App> 标签
  router, //挂载路由
  store, //挂载vuex的store
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
    Vue.prototype.$api = api //安装$api
     }
}).$mount('#app') //挂载app
