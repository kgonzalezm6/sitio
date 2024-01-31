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
export const useGeneralStore = defineStore('general', {
  state: () => ({
    id: null,
    isEdit: false,
    isDelete: false,
    isNew: false,
    contador: [],
    VerificaContador: false,
    items: [{
        name: 'Chicas',
        route: 'chica',
        color: 'bg-red-400',
        total: ''
      },
      {
        name: 'Peliculas',
        route: 'pelicula',
        color: 'bg-blue-400'
      },
      {
        name: 'Empresas',
        route: 'empresa',
        color: 'bg-sky-400'
      },
      {
        name: 'Actrices',
        route: 'actriz',
        color: 'bg-rose-400'
      },
      {
        name: 'Series',
        route: 'serie',
        color: 'bg-teal-400'
      },
      {
        name: 'Mantenimientos',
        route: 'mantenimiento',
        color: 'bg-orange-400'
      },
    ],
  }),

  actions: {
    async getContador() {
      const response = await axios.get(
          import.meta.env.VITE_MY_BASE + 'contador')
        .then(response => {
          if (response.data.mensaje == "Exito") {
            this.contador = response.data;
            this.VerificaContador = true;
            this.items.forEach(item => {
              switch (item.name) {
                case 'Chicas':
                  item.total = response.data.chica
                  break;
                case 'Peliculas':
                  item.total = response.data.pelicula
                  break;
                case 'Empresas':
                  item.total = response.data.empresa
                  break;
                case 'Actrices':
                  item.total = response.data.actriz
                  break;
                case 'Series':
                  item.total = response.data.serie
                  break;
                default:
                  break;
              }
            });
          } else {
            console.log('Ha ocurrido un error al cargar la información');
          }
        })
        .catch(err => {
          console.error(err)
          console.log('Ha ocurrido un error al tratar de comunicarse con el servidor' + err);
        })
    }
  }
})