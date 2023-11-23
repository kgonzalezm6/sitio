<script setup>
    import Mapa from '../components/Mapa.vue'
</script>

<template>
    <div class="h-screen bg-lime-muni grid grid-cols-2">
        <Mapa class="stroke-lime-500 absolute z-0 h-[95%]" />
        <div class="self-center w-1/2 mx-auto z-20">
            <div class="space-y-12">
                <logo class="w-auto h-44 mx-auto z-20" />
                <div class="grid gap-4 z-20">
                    <div class="input z-20 flex items-center bg-white h-14" >
                        <icon icon="fas fa-address-card" class="text-green-500 text-3xl" />
                        <input autocomplete="off" type="text" class="focus:outline-none pl-3 h-auto w-full placeholder:text-blue-muni text-blue-muni placeholder:text-2xl text-2xl font-semibold placeholder:font-semibold" placeholder="Usuario">
                    </div>
                    <div class="input z-20 flex items-center bg-white h-14" >
                        <icon icon="fas fa-lock" class="text-green-500 text-3xl" />
                        <input autocomplete="off" type="password" class="focus:outline-none pl-3 h-auto w-full placeholder:text-blue-muni text-blue-muni placeholder:text-2xl text-2xl font-semibold placeholder:font-semibold" placeholder="Contraseña">
                    </div>
                </div>
                <div class="flex justify-center">
                    <button class="btn z-20 bg-blue-muni text-white text-xl">
                        <icon icon="fas fa-right-to-bracket" class="mr-3"/>
                        <span>Acceder</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="bg-image1 bg-cover bg-center bg-no-repeat z-20 rounded-bl-[10rem]"></div>
    </div>
</template>

<style scoped>
    .bg-image1{
        background-image: url('../assets/img/muni.jpg');
        z-index: 1;
    }
</style>