<script setup>

   import axios from 'axios'
   import { computed,ref,onMounted } from 'vue'
   import UserPhoto from '../components/UserPhoto.vue'
   import Calendar from '../components/Calendar.vue'

   const search = ref('')
   const users = ref([])
   const userResult = ref([])
   const loading = ref(false)
   const open = ref(false)
   const openAlert = ref(false)
   const usr = ref([])

   const headers = [
      {title:'nit',key:'nit', sort: true },
      {title:'empleado',key:'fullname'},
      {title:'usuario',key:'usuario'},
      {title:'puesto',key:'puesto'},
      {title:'status',key:'status', sort: true, align: 'center' },
      {title:'area',key:'area.descripcion', sort: true },
      {title:'',key:'actions'},
   ];
 
   const options = ref(
      {
         chart: {
            height: 380,
            type: "bar"
         },
         xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
         },
         
      }
   )

   const series = ref([
      {
         data: [30, 40, 45, 50, 49, 60, 70, 81]
      }
   ])

   function user (user) {
      open.value = true
      usr.value = user
   }

   async function fetchUsers () {
      const response = await axios.get('users')
      users.value = response.data
   }

   const result = computed(() => {
      return users.value.filter(user => {
         if(search.value){
            return user.fullname.toLowerCase().match(search.value.toLowerCase())
         }
      })
   })

   const listJefes = computed(()=>{
      const dataArray = new Set(users.value.map(user => user.depende))
      return [...dataArray]
   })

   function resultado(){
      if(result.value.length === 1){
         const res = result.value
         userResult.value = res[0]
      }else{
         userResult.value = []
      }
   }

   function resetData(){
      usr.value = []
      open.value = false
      openAlert.value = false
   }

   function updateChart() {
      setInterval(() => {
         const max = 90;
         const min = 20;
         const newData = series.value[0].data.map(() => {
            return Math.floor(Math.random() * (max - min + 1)) + min
         })
   
         series.value = [{
            data: newData
         }]
      }, 3000);
   }

   onMounted(() => {
      fetchUsers()
      updateChart()
   })


   function loadingBtn () {
      loading.value = true
      setTimeout(() => loading.value = false,3000)
   }

   const eventos = [
      {title : 'Evento 1', description : 'Esta es la descripcion del evento que dice que carajos hacer 01', time : { start : '2023-09-07 06:30'}},
      {title : 'Evento 2', description : 'Esta es la descripcion del evento que dice que carajos hacer 02', time : { start : '2023-09-07 06:30'}},
      {title : 'Evento 3', description : 'Esta es la descripcion del evento que dice que carajos hacer 03', time : { start : '2023-09-07 06:30'}},
      {title : 'Evento 4', description : 'Esta es la descripcion del evento que dice que carajos hacer 04', time : { start : '2023-09-07 06:30'}},
      {title : 'Evento 5', description : 'Esta es la descripcion del evento que dice que carajos hacer 05', time : { start : '2023-09-07 06:30'}},
      {title : 'Evento 6', description : 'Esta es la descripcion del evento que dice que carajos hacer 06', time : { start : '2023-09-07 06:30'}},
      {title : 'Evento',   description : 'Esta es la descripcion del evento que dice que carajos hacer 07', time : { start : '2023-09-08 06:30'}},
      {title : 'Evento 3', description : 'Esta es la descripcion del evento que dice que carajos hacer 08', time : { start : '2023-09-09 06:30'}},
      {title : 'Evento 3', description : 'Esta es la descripcion del evento que dice que carajos hacer 09', time : { start : '2023-09-09 06:30'}},
      {title : 'Evento 3', description : 'Esta es la descripcion del evento que dice que carajos hacer 10', time : { start : '2023-09-10 06:30'}},
      {title : 'Evento 3', description : 'Esta es la descripcion del evento que dice que carajos hacer 11', time : { start : '2023-09-07 06:30'}},
      {title : 'Dia de la independencia', description : 'Esta es la descripcion del evento que dice que carajos hacer 12', time : { start : '2023-09-15 06:30'}},
   ]

   

</script>


<template>
   <card>
      <Calendar :events="eventos" />
   </card>
   <br>
   <br>
   <btn @click="loadingBtn" text="Guardar" class="btn-danger shadow-red-800" :loading="loading" />
   <br>
   <br>

   <card>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
         <apexchart  type="bar" :options="options" :series="series"></apexchart>
         <apexchart  type="bar" :options="options" :series="series"></apexchart>
         <apexchart  type="bar" :options="options" :series="series"></apexchart>
      </div>
   </card>

   <br>

   <div class="flex justify-center">
      <text-field option="label" title="Buscar por nombre:" v-model="search" list="data" @change="resultado" type="search" class="w-96"/>
      <datalist id="data">
         <option v-for="user in result" :key="user.nit" :value="user.fullname"></option>
      </datalist> 
   </div>

   <card v-if="userResult?.roles">
      <template #header>
         <h1 class="text-center text-2xl text-gray-500 font-bold">
            {{ userResult.fullname}}
         </h1>
         <hr class="my-4">
      </template>
      <div class="flex gap-4">
         <div class="flex justify-center items-center">
            <UserPhoto :user="userResult" class="h-96 w-96" />
         </div>
         
         <card class="flex-1">
            <template #header>
               <h1 class="text-gray-500 font-bold text-center text-xl">Informacion personal</h1>
               <hr class="my-4">
            </template>
            <div class="grid grid-cols-2 gap-4">
               <text-field class="w-full" option="label" title="Nombre:" v-model="userResult.nombre" />
               <text-field class="w-full" option="label" title="Apellido:" v-model="userResult.apellido"/>
               <text-field class="w-full" option="label" title="nit:" v-model="userResult.nit"/>
               <text-field class="w-full" option="label" title="correo:" v-model="userResult.emailmuni"/>
               <text-field class="w-full" option="label" title="Area:" v-model="userResult.area.descripcion"/>
            </div>
            <template #footer>
               <div class="text-center">
                  <btn text="Actualizar" class="btn-dark shadow-gray-900" />
               </div>
            </template>
         </card>
      </div>
   </card>

   <br>

   <card>
      <datatable :headers="headers" :data="users" color="bg-lime-500 text-lime-100" >
         <template #fullname="{item}">
            <div class="flex items-center gap-3">
               <UserPhoto :user="item" class="h-12 w-12 hover:scale-150 cursor-pointer" />
               <div class="grid">
                  <span>{{ item.fullname }}</span>
                  <small class="text-xs font-normal">{{ item.emailmuni }}</small>
               </div>
            </div>
         </template>
         <template #puesto="{item}">
            <span class="text-sm font-normal">{{ listJefes.includes(item.nit) ? 'Jefe' : 'Sub-alterno' }}</span>
         </template>
         <template #status="{item}">
            <icon v-if="item.status==='A'" icon="fa-solid fa-user-check" class="text-green-500 text-xl" />
            <icon v-else icon="fa-solid fa-user-xmark" class="text-red-500 text-xl" />
         </template>
         <template #actions="{item}">
            <div class="flex space-x-2">
               <tooltip message="Alguna acción">
                  <icon @click="user(item)" icon="fa-solid fa-user-check" class="text-green-500 text-2xl hover:scale-150 cursor-pointer" />
               </tooltip>
               <tooltip message="Otra acción">
                  <icon @click="openAlert = true" icon="fa-solid fa-user-xmark" class="text-red-500 text-2xl hover:scale-150 cursor-pointer" />
               </tooltip>
            </div>
         </template>
      </datatable> 
   </card>
   <br>
   

   <modal :open="open" >
      <template #header>Ejemplo de modal</template>
      <div v-if="usr?.nombre" class="grid grid-cols-2 gap-4" >
         <text-field option="label" title="Nombre:" v-model="usr.nombre" />
         <text-field option="label" title="Apellido:" v-model="usr.apellido"/>
         <text-field option="label" title="nit:" v-model="usr.nit"/>
         <text-field option="label" title="correo:" v-model="usr.emailmuni"/>
         <text-field option="label" title="Area:" v-model="usr.area.descripcion"/>
      </div>
      <template #footer>
         <div>
            <btn @click="resetData()" text="Cancelar" class="btn-danger shadow-red-800" />
         </div>
      </template>
   </modal>

   <modal :open="openAlert">
      <template #header>
          A T E N C I Ó N
      </template>
      <div class="flex justify-center items-center space-x-4">
         <icon icon="fa-solid fa-triangle-exclamation" class="text-7xl text-orange-500"  />
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, provident quam? Quasi deleniti maxime accusamus nam facilis, minus corrupti quam necessitatibus. Voluptatibus aliquam temporibus unde doloribus hic culpa quos fugit.</p>
      </div>
      <template #footer>
         <btn text="Cerrar" @click="resetData" class="btn-danger shadow-red-800" />
      </template>
   </modal>
</template>
