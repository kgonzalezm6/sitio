// stores/index.js
import { defineStore } from 'pinia'
import { useGlobalStore } from './global'
import { useAstrologiaStore } from './astrologia'
import { useCabelloStore } from './cabello'
import { useEtniaStore } from './etnia'
import { useNacionalidadStore } from './nacionalidad'
import { useLugarnacStore } from './lugarnac'
import { useChicaStore } from './chica';

export function useStores () {
    const global = useGlobalStore()
    const astrologia = useAstrologiaStore()
    const cabello = useCabelloStore()
    const etnia = useEtniaStore()
    const nacionalidad = useNacionalidadStore()
    const lugarnac = useLugarnacStore()
    return { global, astrologia, cabello, etnia, nacionalidad, lugarnac }
}