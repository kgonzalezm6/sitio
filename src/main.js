import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import VueApexCharts from "vue3-apexcharts";
import 'vue-select/dist/vue-select.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import vSelect from 'vue-select'

// COMPONENTES INSTANCIADOS DE FORMA GLOBAL
import btn from './components/Button.vue'
import modal from './components/Modal.vue'
import tooltip from './components/Tooltip.vue'
import toast from './components/Toast.vue'
import datatable from './components/DataTable.vue'
import Input from './components/Input.vue'
import Card from './components/Card.vue'
import ValidateErrors from './components/ValidateErrors.vue'
import Logo from './components/Logo.vue'
import simpleTabs from './components/SimpleTabs.vue'
import GalleryItem from './components/GalleryItem.vue';
import GalleryModal from './components/GalleryModal.vue';
import axios from 'axios'

library.add(fas)
library.add(fab)
library.add(far)

axios.defaults.baseURL = import.meta.env.VITE_MY_BASE

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueApexCharts)

app.component('icon', FontAwesomeIcon)
.component('modal', modal)
.component('tooltip', tooltip)
.component('toast', toast)
.component('datatable', datatable)
.component('btn', btn)
.component('text-field', Input)
.component('card', Card)
.component('validate-errors', ValidateErrors)
.component('datepicker', VueDatePicker)
.component('logo', Logo)
.component('simpleTabs', simpleTabs)
.component('v-select', vSelect)
.component('GalleryItem', GalleryItem)
.component('GalleryModal', GalleryModal)
app.mount('#app')



