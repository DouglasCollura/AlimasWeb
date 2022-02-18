import { createApp } from 'vue'
import App from './App.vue'
import Base from './views/Layouts/Base.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import router from './router'
/* Theme variables */
import './theme/grid.css';
import './theme/custom.css';
import './theme/template.css';
import './icons/icons.css';
import './theme/vmodel.css';


 createApp(App).
 use(router).
 use(VueSweetalert2).
 component('base-layout', Base).
 mount('#app');

//app.component('base-layout', Base);