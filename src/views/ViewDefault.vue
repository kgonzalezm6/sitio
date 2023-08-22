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
      {title:'area',key:'area.descripcion', sort: true },
      {title:'status',key:'status', sort: true, align: 'center' },
      {title:'area',key:'area.descripcion'},
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
   <input type="search" @change="resultado" v-model="search" placeholder="Buscar por nombre ...." class="input" list="data" autofocus>
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
               <text-field option="label" title="Nombre:" v-model="userResult.nombre" />
               <text-field option="label" title="Apellido:" v-model="userResult.apellido"/>
               <text-field option="label" title="nit:" v-model="userResult.nit"/>
               <text-field option="label" title="correo:" v-model="userResult.emailmuni"/>
               <text-field option="label" title="Area:" v-model="userResult.area.descripcion"/>
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
      <datatable :headers="headers" :data="users" color="bg-gray-800" >
         <template #fullname="{item}">
            <div class="flex items-center gap-3">
               <UserPhoto :user="item" class="h-12 w-12 hover:scale-150 cursor-pointer" />
               <div class="grid">
                  <span>{{ item.fullname }}</span>
                  <small class="text-xs">{{ item.emailmuni }}</small>
               </div>
            </div>
         </template>
         <template #status="{item}">
            <icon v-if="item.status==='A'" icon="fa-solid fa-user-check" class="text-green-500 text-xl" />
            <icon v-else icon="fa-solid fa-user-xmark" class="text-red-500 text-xl" />
         </template>
         <template #actions="{item}">
            <div class=" space-x-2">
               <icon @click="user(item)" icon="fa-solid fa-user-check" class="text-green-500 text-2xl hover:scale-150 cursor-pointer" />
               <icon @click="openAlert = true" icon="fa-solid fa-user-xmark" class="text-red-500 text-2xl hover:scale-150 cursor-pointer" />
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
