<template>
    <div>
        <div>
            <simple-tabs :tabs="tabs">
                <template #tab-0>
                    
                        <Etnia />
                    <!-- </div> -->
                </template>
                <template #tab-1>
                    <div class="bg-white w-full h-96 rounded-xl"></div>
                </template>
                <template #tab-2>
                    
                        <Etnia />
                    <!-- </div> -->
                </template>
                <template #tab-3>
                    
                        <Etnia />
                    <!-- </div> -->
                </template>
                <template #tab-4>
                    
                        <Lugarnac />
                    <!-- </div> -->
                </template>
            </simple-tabs>
        </div>
        <Nuevo />
    </div>
</template>

<script setup>
    import Etnia from '../components/modals/Etnia.vue';
    import Lugarnac from '../components/modals/Lugarnac.vue';
    const tabs = [
        'Etnia','Nacionalidad','Cabello','Astrologia','Lugar Nacimiento'
    ];


</script>

<style lang="css" scoped>

</style>