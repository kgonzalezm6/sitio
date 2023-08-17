<script setup>
import UserPhoto from './UserPhoto.vue';
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import Modal from './Modal.vue';
import axios from 'axios';

    const props = defineProps(['user'])
    const openModalHelp = ref(false);
    const open = ref(false);
    const target = ref(null)

    onClickOutside(target, (event) => open.value = false)

    function logout(){
        axios.post(import.meta.env.VITE_MY_URL_BASE + 'logout');
    }

    
</script>

 <template>
    
    <Modal :open="openModalHelp" class="w-1/3">
        <template #header>
            Ayuda ?
        </template>
        <iframe src="../prescripciones/docs/help.pdf" class="w-full h-[42rem]"></iframe>
        <template #footer>
            <btn class="btn-danger" text="Cerrar" @click="openModalHelp = false" />
        </template>
    </Modal>

    <div @click="open = !open " ref="target">
        <div class="flex items-center space-x-3 cursor-pointer">

            <UserPhoto :name="props.user" />
            
            <div class="font-bold text-gray-200 text-sm text-center">
                <p>{{ props.user.smallname }}</p>
                <p>{{ props.user.roles ? props.user.roles.map(role => role.nombre)[0] : '' }}</p>
            </div>
        </div>

        <div
            v-show="open"
            class="absolute w-72 px-5 py-3 text-gray-600 bg-white rounded-lg shadow-lg border-2 mt-5 right-4">

            <h1 class="text-gray-800 font-bold">Perfil de usuario</h1>
            <div class="flex items-center space-x-2 py-2">
                <UserPhoto :name="props.user" />
                <div class="font-bold text-sm">
                    <p>{{ props.user.smallname }}</p>
                <small>{{ props.user.emailmuni }}</small>
                </div>
            </div>
            <hr class="py-2">
            <ul class="space-y-3">
                <li class="font-medium">
                    <a href="#" class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-blue-700">
                        <div class="mr-3">
                            <i class="fas fa-address-card"></i>
                        </div>
                        Perfil
                    </a>
                </li>
                <li class="font-medium">
                    <a href="#" @click="openModalHelp = true" class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-blue-700">
                        <div class="mr-3">
                            <i class="fas fa-gears"></i>
                        </div>
                        Help ?
                    </a>
                </li>
                <hr>
                <li class="font-medium">
                    <div class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600" >
                        <div class="mr-3 text-red-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        </div>
                        <a href="../../login.php" @click="logout" type="submit">
                            Cerrar sesión
                        </a>
                    </div>
                </li>
            </ul>
        </div>

    </div>
 </template>