import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, reactive } from 'vue'
import { useStores } from '@/stores'
import { useRouter } from 'vue-router'
export const useChicaStore = defineStore('chica', () => {
    const { global, astrologia, cabello, etnia, nacionalidad, lugarnac } = useStores()
    const router = useRouter()
    let errors = ref([])
    let registros = ref([])
    let registro = ref([])
    let loading_registros = ref(false)
    let loading_registro = ref(false)
    let loading_nuevo = ref(false)
    let loading_update = ref(false)
    let loading_delete = ref(false)
    let loading_opcion = ref(false)
    let opcion_unir = ref(false)
    let btn_unir = ref(false)
    let btn_nuevo = ref(false)
    let btn_editar = ref(false)
    const headers = [
        {
            title: 'ID',
            align: 'start',
            sort: true,
            key: 'id_chica'
        },
        {
            title: 'NOMBRE CHICA',
            align: 'end',
            sort: true,
            key: 'nombre'
        },
        {
            title: 'FECHA DE NACIMIENTO',
            align: 'middle',
            key: 'fechanac'
        },
        {
            title: 'LUGAR DE NACIMIENTO',
            align: 'middle',
            key: 'lugarnac'
        },
        {
            title: 'ETNIA',
            align: 'end',
            key: 'etnia'
        },
        {
            title: 'CABELLO',
            align: 'end',
            key: 'cabello'
        },
        {
            title: 'FOTO',
            align: 'middle',
            key: 'foto'
        },
        {
            title: 'ESTADO',
            align: 'middle',
            key: 'estado'
        },
        {
            title: 'ACCIONES',
            align: 'end',
            key: 'actions'
        }
    ]
    let nuevo = reactive({
        nombre: null,
        etnia: null,
        nacionalidad: null,
        cabello: null,
        alto: null,
        peso: null,
        medidas: null,
        tatuajes: null,
        piercing: null,
        alias: null,
        fechanac: null,
        astrologia: null,
        lugarnac: null,
        comienzo: null,
        final: null,
        instagram: null,
        twitter: null,
        imagen: null
    })
    const tabs = ['Registros', 'Estadisticas']
    let isEdit = ref(false)
    let isDelete = ref(false)
    let id = ref(null)
    const unir = reactive({
        chica: null,
        peliculas: [{ id_pelicula: null }]
    })
    async function getChica () {
        const response = await axios
            .get('persona/chica')
            .then(response => {
                if (!response.data.error) {
                    registros.value = response.data.datos
                    loading_registros.value = true
                } else {
                    global.setAlert('Ha ocurrido un error al cargar la información')
                }
            })
            .catch(err => {
                console.error(err)
                console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err)
            })
            .finally(() => {})
    }
    async function getOne () {
        const response = await axios
            .get('persona/chica_pelicula/' + id.value)
            .then(response => {
                if (!response.data.error) {
                    registro.value = response.data.datos[0]
                    loading_registro.value = true
                } else {
                    global.setAlert('Ha ocurrido un error al cargar la información')
                }
            })
            .catch(err => {
                console.error(err)
                console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err)
            })
            .finally(() => {})
    }
    async function UpdatedChica () {
        loading_update.value = true
        const global = useGlobalStore()
        const response = await axios
            .put(
                import.meta.env.VITE_MY_BASE + 'persona/chica/' + this.onechica.id_chica,
                this.onechica
            )
            .then(response => {
                console.log(response.data)
                if (!response.data.error) {
                    global.setAlert('Guardado', 'success')
                    setTimeout(() => {
                        isEdit.value = false
                        this.getChica()
                    }, 1000)
                } else {
                    global.setAlert('Ha ocurrido un error al cargar la información', 'danger')
                }
            })
            .catch(err => {
                global.setAlert(
                    'Ha ocurrido un error al tratar de comunicarse con el servidor' + err,
                    'danger'
                )
            })
            .finally(() => {
                loading_update.value = false
            })
    }
    async function DeleteChica () {
        loading_delete.value = true
        const global = useGlobalStore()
        const response = await axios
            .delete(
                import.meta.env.VITE_MY_BASE + 'persona/chica/' + this.onechica.id_chica,
                this.onechica
            )
            .then(response => {
                console.log(response.data)
                if (!response.data.error) {
                    global.setAlert('Guardado', 'success')
                    setTimeout(() => {
                        isDelete.value = false
                        this.getChica()
                    }, 1000)
                } else {
                    global.setAlert('Ha ocurrido un error al cargar la información', 'danger')
                }
            })
            .catch(err => {
                global.setAlert(
                    'Ha ocurrido un error al tratar de comunicarse con el servidor' + err,
                    'danger'
                )
            })
            .finally(() => {
                loading_delete.value = false
            })
    }
    async function join () {
        btn_unir.value = true
        try {
            const response = await axios.post('persona/chica_pelicula', unir)
            if (response.data.error) {
                global.setAlert(response.data.mensaje, response.data.color)
            } else {
                if (response.data.codigo == 1) {
                    global.setAlert(response.data.mensaje, response.data.color)
                    // this.index();
                    opcion_unir.value = false
                    // this.reset();
                } else {
                    global.setAlert(response.data.mensaje, response.data.color)
                }
            }
        } catch (error) {
            console.error('Error en la solicitud:', error)
            errors.value = error.response?.data?.errors || 'Error desconocido'
            global.setAlert(error.response?.data?.mensaje || 'Error en la solicitud', 'danger')
        } finally {
            btn_unir.value = false
        }
    }
    async function store () {
        btn_nuevo.value = true
        const formData = new FormData()
        Object.keys(nuevo).forEach(key => {
            if (nuevo[key] !== null) {
                // Si es la imagen, asegúrate de que sea un archivo
                if (key === 'imagen' && nuevo[key] instanceof File) {
                    formData.append(key, nuevo[key])
                } else {
                    formData.append(key, nuevo[key])
                }
            }
        })
        try {
            const response = await axios.post('persona/chica', formData)
            if (!response.data.error) {
                if (response.data.codigo == 1) {
                    global.setAlert(response.data.mensaje, response.data.color)
                    router.push({ name: 'Chicas' })
                } else {
                    global.setAlert(response.data.mensaje, response.data.color)
                }
            } else {
                global.setAlert(response.data.mensaje, response.data.color)
            }
        } catch (error) {
            errors.value = error.response?.data?.errors || 'Error desconocido'
            global.setAlert(error.response?.data?.mensaje || 'Error en la solicitud', 'danger')
        } finally {
            btn_nuevo.value = false
        }
    }
    async function show () {
        try {
            const response = await axios.get('persona/chica/'+id.value)
            if(!response.data.error){
                if(response.data.codigo == 1){
                    registro.value = response.data.datos[0];
                    loading_registro.value = true;
                    global.setAlert(response.data.mensaje,response.data.color);
                }else{
                    global.setAlert(response.data.mensaje,response.data.color);
                }
            }else{

            }
        } catch (error) {
            
        }
    }
    async function update() {
        btn_editar.value = true
        const formData = new FormData()
        Object.keys(registro.value).forEach(key => {
            if (registro.value[key] !== null) {
                // Si es la imagen, asegúrate de que sea un archivo
                if (key === 'imagen' && registro.value[key] instanceof File) {
                    formData.append(key, registro.value[key])
                } else {
                    formData.append(key, registro.value[key])
                }
            }
        })
        try {
            const response = axios.post('persona/chica_editar', formData)
            if (!response.data.error) {
                if (response.data.codigo == 1) {
                    global.setAlert(response.data.mensaje, response.data.color)
                    router.push({ name: 'Chicas' })
                } else {
                    global.setAlert(response.data.mensaje, response.data.color)
                }
            } else {
                global.setAlert(response.data.mensaje, response.data.color)
            }
        } catch (error) {
            errors.value = error.response?.data?.errors || 'Error desconocido'
            global.setAlert(error.response?.data?.mensaje || 'Error en la solicitud', 'danger')
        } finally{
            btn_editar.value = false;
        }
        
    }
    function opciones (type, item = null) {
        loading_opcion.value = true
        registro.value = item
        switch (type) {
            case 1:
                break
            case 2:
                break
            case 3:
                break
            case 4:
                opcion_unir.value = true
                break
            default:
                loading_opcion.value = false
                break
        }
    }
    function add () {
        unir.peliculas.push({ id_pelicula: null })
    }
    function remove (index) {
        if (index >= 0 && index < unir.peliculas.length) {
            unir.peliculas.splice(index, 1)
        } else {
            console.error('Índice fuera de los límites del array')
        }
    }
    return {
        registros,
        headers,
        errors,
        loading_registros,
        loading_registro,
        isEdit,
        isDelete,
        registro,
        id,
        loading_nuevo,
        loading_update,
        loading_delete,
        loading_opcion,
        opcion_unir,
        tabs,
        unir,
        btn_unir,
        btn_nuevo,
        btn_editar,
        nuevo,

        DeleteChica,
        getChica,
        store,
        show,
        join,
        update,
        opciones,
        add,
        remove
    }
})
