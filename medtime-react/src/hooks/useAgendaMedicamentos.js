
import { useEffect, useState } from 'react'
import { buscarAgendaMedicamentos } from '../services/api.js'

export function useAgendaMedicamentos(idUsuario, dataConsulta) {
    const [agenda, setAgenda] = useState([])
    const [carregandoAgenda, setCarregandoAgenda] = useState(true)
    const [erroAgenda, setErroAgenda] = useState(null)

    useEffect(() => {
        let ativo = true

        async function carregarAgenda() {
            if (!idUsuario, dataConsulta) {
                setAgenda([])
                setCarregandoAgenda(false)
                return
            }

            setCarregandoAgenda(true)
            setAgenda([])
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

                if (ativo) {
                    setAgenda(medicamentosAPI)
                }
            } catch (erro) {
                if (ativo) {
                    console.error('Erro ao carregar agenda:', erro)
                    setErroAgenda(erro.message)
                }
            } finally {
                if (ativo) {
                    setCarregandoAgenda(false)
                }
            }
        }

        carregarAgenda()

        return () => {
            ativo = false
        }
    }, [idUsuario])


    return { agenda, carregandoAgenda, erroAgenda }
}
