//PV Imports
import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import PrimeVue from "primevue/config";
//import x from "primevue/x"
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
//Datatable imports
import DataTable from "primevue/datatable"
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';                     //optional for row

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
//app.use()
app.use(router)
app.use(PrimeVue, { ripple: true })
// app.component(,)
app.component('DataTable', DataTable)
    .component('Column', Column)
    .component('ColumnGroup', ColumnGroup)
    .component('Row', Row)
    .component('Button', Button)
    .component('Dialog', Dialog)
    .component('InputText', InputText)


app.mount('#app')
