// Utilities
import {
  defineStore
} from 'pinia'
import axios from 'axios'
import {
  useGlobalStore
} from './global'
import {
  useAstrologiaStore
} from './astrologia';
import {
  useCabelloStore
} from './cabello';
import {
  useEtniaStore
} from './etnia';
import {
  useNacionalidadStore
} from './nacionalidad';
import {
  useLugarnacStore
} from './lugarnac';
import {
  useBustoStore
} from './busto';
import {
  useGluteoStore
} from './gluteo';
export const useChicaStore = defineStore('chica', {
  state: () => ({
    id: null,
    isEdit: false,
    isDelete: false,
    isNew: false,
    date: [],
    chicas: [],
    total: null,
    tabla: false,
    chica: {
      NOMBRE_CHICA: '',
      ID_ETNIA: '',
      ID_NACIONALIDAD: '',
      ID_CABELLO: '',
      ALTURA_CHICA: '',
      PESO_CHICA: '',
      MEDIDAS_CHICA: '',
      ALIAS_CHICA: '',
      TATUAJES_CHICA: '',
      PIERCING_CHICA: '',
      FECHANAC_CHICA: '',
      ID_ASTROLOGIA: '',
      COMIENZO_CHICA: '',
      FIN_CHICA: '',
      ID_LUGARNAC: '',
      INSTAGRAM_CHICA: '',
      TWITTER_CHICA: '',
      FOTO_CHICA: ''
    },
    onechica: [],
    unachica: [],
    tabs: ['Peliculas', 'Graficas'],
    peliculas: [],
    temporadasepisodios: {},
    datosListos: false,
    headers: [{
        title: 'ID',
        align: 'start',
        sort: true,
        key: 'ID_CHICA'
      },
      {
        title: 'NOMBRE CHICA',
        align: 'end',
        sort: true,
        key: 'NOMBRE_CHICA'
      },
      {
        title: 'FECHA DE NACIMIENTO',
        align: 'end',
        key: 'FECHANAC'
      },
      {
        title: 'LUGAR DE NACIMIENTO',
        align: 'middle',
        key: 'lugarnac.NOMBRE_LUGARNAC'
      },
      {
        title: 'ETNIA',
        align: 'end',
        key: 'etnia.NOMBRE_ETNIA'
      },
      {
        title: 'CABELLO',
        align: 'end',
        key: 'cabello.NOMBRE_CABELLO'
      },
      {
        title: 'FOTO',
        align: 'middle',
        key: 'FOTO_CHICA'
      },
      {
        title: 'ESTADO',
        align: 'end',
        key: 'ESTADO_CHICA'
      },
      {
        title: 'ACCIONES',
        align: 'end',
        key: 'actions'
      }
    ],
    headerspeliculas: [{
        title: 'ID',
        align: 'left',
        key: 'ID_PELICULA',
        sort: true
      },
      {
        title: 'NOMBRE pelicula',
        align: 'left',
        key: 'NOMBRE_PELICULA',
        sort: true
      },
      {
        title: 'tipo',
        align: 'end',
        key: 'tipo.NOMBRE_TIPO_PELICULA',
        sort: true
      },
      {
        title: 'FECHA',
        align: 'middle',
        key: 'FECHA_PELICULA',
        sort: true
      },
      {
        title: 'DISTRIBUIDORA',
        align: 'middle',
        key: 'empresa.NOMBRE_EMPRESA',
        sort: true
      },
      {
        title: 'ESTADO',
        align: 'middle',
        key: 'ESTADO_PELICULA',
        sort: false
      },
      {
        title: 'ACCIONES',
        align: 'middle',
        key: 'actions',
        sort: true
      }
    ],
    optionsTipo: {
      chart: {
        id: 'vuechart-example',
      },
      xaxis: {
        categories: []
      }
    },
    seriesTipo: [{
      name: 'Cantidad',
      data: []
    }],
    optionsEmpresa: {
      chart: {
        id: 'vuechart-example',
      },
      title: {
        text: 'Empresas',
        align: 'center',
        margin: 10,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: undefined,
          color: '#263238'
        },
      },
      theme: {
        mode: 'light',
        palette: 'palette7',
        monochrome: {
          enabled: false,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65
        },
      },
      xaxis: {
        categories: []
      }
    },
    seriesEmpresa: [{
      name: 'Cantidad',
      data: []
    }],
    optionsFecha: {
      chart: {
        id: 'vuechart-example',
      },
      title: {
        text: 'Empresas',
        align: 'center',
        margin: 10,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: undefined,
          color: '#263238'
        },
      },
      theme: {
        mode: 'light',
        palette: 'palette7',
        monochrome: {
          enabled: false,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65
        },
      },
      xaxis: {
        categories: []
      }
    },
    seriesFecha: [{
      name: 'Cantidad',
      data: []
    }],
  }),

  actions: {
    async getChica() {
      const response = await axios.get(
          import.meta.env.VITE_MY_BASE + 'chica')
        .then(response => {
          if (response.data.mensaje == "Exito") {
            this.chicas = response.data.data;
          } else {
            console.log('Ha ocurrido un error al cargar la información');
          }
        })
        .catch(err => {
          console.error(err)
          console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
    },
    open(item, type) {
      this.onechica = item;
      const astrologiaStore = useAstrologiaStore();
      const cabelloStore = useCabelloStore();
      const etniaStore = useEtniaStore();
      const nacionalidadStore = useNacionalidadStore();
      const lugarnacStore = useLugarnacStore();
      const bustoStore = useBustoStore();
      const gluteoStore = useGluteoStore();
      if (type == 1) {
        //edit
        this.isEdit = true;
        astrologiaStore.getAstrologia();
        cabelloStore.getCabello();
        etniaStore.getEtnia();
        nacionalidadStore.getNacionalidad();
        lugarnacStore.getLugarnac();
        bustoStore.getBusto();
        gluteoStore.getGluteos();
      } else {
        //delete
        this.isDelete = true;
      }
    },
    async UpdatedChica() {
      const globalStore = useGlobalStore();
      const response = await axios.put(
          import.meta.env.VITE_MY_BASE + 'chica/' + this.onechica.ID_CHICA, this.onechica)
        .then(response => {

          if (response.status == 200) {
            globalStore.setAlert("Guardado", "success");
            setTimeout(() => {
              this.isEdit = false;
              this.getChica();
            }, 1000);
          } else {
            alert('Ha ocurrido un error al cargar la información');
          }
        })
        .catch(err => {
          alert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
    },
    async CreateChica() {
      this.chica.TATUAJES_CHICA == '' ? this.chica.TATUAJES_CHICA = 'Sin datos' : this.chica.TATUAJES_CHICA;
      this.chica.PIERCING_CHICA == '' ? this.chica.PIERCING_CHICA = 'Sin datos' : this.chica.PIERCING_CHICA;
      this.chica.MEDIDAS_CHICA == '' ? this.chica.MEDIDAS_CHICA = '00-00-00' : this.chica.MEDIDAS_CHICA;
      this.chica.ALIAS_CHICA == '' ? this.chica.ALIAS_CHICA = 'Desconocido' : this.chica.ALIAS_CHICA;
      this.chica.INSTAGRAM_CHICA == '' ? this.chica.INSTAGRAM_CHICA = 'https://www.instagram.com/' : this.chica.INSTAGRAM_CHICA;
      this.chica.TWITTER_CHICA == '' ? this.chica.TWITTER_CHICA = 'https://www.twitter.com/' : this.chica.TWITTER_CHICA;

      const globalStore = useGlobalStore();
      const response = await axios.post(
          import.meta.env.VITE_MY_BASE + 'chica', this.chica)
        .then(response => {
          if (response.status == 200) {
            globalStore.setAlert("Guardado", "success");
            setTimeout(() => {
              this.getChica();
              this.isNew = false;
            }, 1000);
          } else {
            alert('Ha ocurrido un error al cargar la información');
          }
        })
        .catch(err => {
          alert('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
    },
    async getOneChica() {
      this.peliculas = [];
      const response = await axios.get(
          import.meta.env.VITE_MY_BASE + 'chicapelicula/' + this.id)
        .then(response => {
          if (response.data.mensaje == "Exito") {

            response.data.data.forEach(element => {
              this.peliculas.push(element.peliculas[0]);
              this.unachica = element.chicas[0];
            });

            let tiposDePelicula = [];
            let cantidadPorTipo = [];
            let tiposDeEmpresa = [];
            let cantidadPorEmpresa = [];
            let Fechas = [];
            let cantidadFecha = [];
            this.peliculas.forEach(e => {
              console.log(e.FECHA_PELICULA);
              const tipoPelicula = e.tipo.NOMBRE_TIPO_PELICULA;
              const Empresa = e.empresa.NOMBRE_EMPRESA;
              const Fecha = new Date(e.FECHA_PELICULA);
              const ano = Fecha.getFullYear();

              const index = tiposDePelicula.indexOf(tipoPelicula);
              const indexEmpresa = tiposDeEmpresa.indexOf(Empresa);
              const indexFecha = Fechas.indexOf(ano);

              // Incrementar el contador para el año correspondiente o inicializarlo si no existe
              if (indexFecha !== -1) {
                cantidadFecha[indexFecha] += 1;
              } else {
                Fechas.push(ano);
                cantidadFecha.push(1);
              }
              if (index !== -1) {
                cantidadPorTipo[index]++;
              } else {
                tiposDePelicula.push(tipoPelicula);
                cantidadPorTipo.push(1);
              }
              if (indexEmpresa !== -1) {
                cantidadPorEmpresa[indexEmpresa]++;
              } else {
                tiposDeEmpresa.push(Empresa);
                cantidadPorEmpresa.push(1);
              }
            });

            this.optionsTipo.xaxis.categories = tiposDePelicula;
            this.seriesTipo[0].data = cantidadPorTipo;
            this.optionsEmpresa.xaxis.categories = tiposDeEmpresa;
            this.seriesEmpresa[0].data = cantidadPorEmpresa;
            this.optionsFecha.xaxis.categories = Fechas;
            this.seriesFecha[0].data = cantidadFecha;
            this.datosListos = true;
          } else {
            console.log('Ha ocurrido un error al cargar la información');
          }


        })
        .catch(err => {
          console.error(err)
          console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
    },
  }
})