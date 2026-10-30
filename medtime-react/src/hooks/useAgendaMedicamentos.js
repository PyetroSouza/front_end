
import { useEffect, useState, useCallback } from 'react'
import { buscarAgendaMedicamentos } from '../services/api.js'

export function useAgendaMedicamentos(idUsuario, dataConsulta) {
    const [agenda, setAgenda] = useState([])
    const [carregandoAgenda, setCarregandoAgenda] = useState(true)
    const [erroAgenda, setErroAgenda] = useState(null)

    const carregarAgenda = useCallback(async () => {
        if (!idUsuario) {
            setAgenda([])
            setCarregandoAgenda(false)
            return
        }

        setCarregandoAgenda(true)
        setErroAgenda(null)

        try {
            const hoje = new Date()

            const data = [
                hoje.getFullYear(),
                String(hoje.getMonth() + 1).padStart(2, '0'),
                String(hoje.getDate()).padStart(2, '0')
            ].join('-')

            const dataAgenda = dataConsulta || data

            const medicamentosAPI = await buscarAgendaMedicamentos(
                idUsuario,
                dataAgenda
            )

            setAgenda(medicamentosAPI)
        } catch (erro) {
            console.error('Erro ao carregar agenda:', erro)
            setErroAgenda(erro.message)
        } finally {
            setCarregandoAgenda(false)
        }
    }, [idUsuario, dataConsulta])

    useEffect(() => {
        carregarAgenda()
    }, [carregarAgenda])

    return {
        agenda,
        carregandoAgenda,
        erroAgenda,
        recarregarAgenda: carregarAgenda
    }
}
