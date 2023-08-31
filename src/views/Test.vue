<script setup>

   import axios from 'axios'
   import { computed,ref,onMounted } from 'vue'
   import UserPhoto from '../components/UserPhoto.vue'

   const search = ref('')
   const users = ref([])
   const userResult = ref([])
   const headers = [
      {title:'nit',key:'nit', sort: true },
      {title:'empleado',key:'fullname'},
      {title:'usuario',key:'usuario'},
      {title:'puesto',key:'puesto'},
      {title:'status',key:'status', sort: true, align: 'center' },
      {title:'area',key:'area.descripcion', sort: true },
      {title:'',key:'actions'},
   ];

   const usr = ref([])

   function user (user) {
      open.value = true
      usr.value = user
   }

   const open = ref(false)
   const openAlert = ref(false)

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

   onMounted(() => {
      fetchUsers()
   })

</script>


<template>

   <div class="flex justify-center">
      <text-field option="label" title="Buscar por nombre:" v-model="search" list="data" @change="resultado" autofocus type="search" class="w-96"/>
   </div>
   <datalist id="data">
      <option v-for="user in result" :key="user.nit" :value="user.fullname"></option>
   </datalist> 
   <br>
   <br>
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
   <card class="flex justify-center">
      <datatable :headers="headers" :data="users" color="bg-lime-600 text-lime-300" >
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
