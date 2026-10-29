import './DashboardPaciente.css'
import { useEffect, useState } from 'react'
import { buscarAgendaMedicamentos } from '../services/api.js'
import { gerarIniciais } from '../utils/gerarIniciais.js'
import { gerarCorAvatar } from '../utils/gerarCorAvatar.js'
import { Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'


function DashboardPaciente({ pacienteSelecionado, voltarParaInicio, aoClicarCadastrarRemedio, medicamentos, excluirMedicamento, aoEditarMedicamento }) {
    const corAvatar = gerarCorAvatar(pacienteSelecionado?.nome)

    function confirmarExclusao(medicamento) {
        toast.warning(`Excluir ${medicamento.nome}?`, {
            description: 'Essa ação removerá o medicamento da lista.',
            duration: 10000,
            action: {
                label: 'Excluir',
                onClick: () => {
                    excluirMedicamento(medicamento.id_medicamento)
                    toast.success('Medicamento excluído com sucesso!')
                }
            },
            cancel: {
                label: 'Cancelar',
                onClick: () => toast.dismiss()
            }
        })
    }
    const [agenda, setAgenda] = useState([])
    const medicamentosDaAgenda = agenda.map((item) => ({
        id_medicamento: item.id_medicamento,
        id_programacao_medicamento: item.id_programacao_medicamento,
        id_receita_medica: item.id_receita_medica,
        nome: item.nome_medicamento,
        quantidade_dose: Number(item.dosagem),
        proximo_horario: item.horario_programado.slice(11, 16),
        confirmado: item.confirmado
    }))
    const [carregandoAgenda, setCarregandoAgenda] = useState(true)

    useEffect(() => {
        async function carregarAgenda() {
            try {
                const idUsuarioTeste = 2
                const hoje = new Date()

                const data = [
                    hoje.getFullYear(),
                    String(hoje.getMonth() + 1).padStart(2, '0'),
                    String(hoje.getDate()).padStart(2, '0')
                ].join('-')

                const medicamentosAPI = await buscarAgendaMedicamentos(
                    idUsuarioTeste,
                    data
                )

                setAgenda(medicamentosAPI)
                console.log('📅 Agenda recebida da API:', medicamentosAPI)
            } catch (erro) {
                console.error('Erro ao carregar agenda:', erro)
                toast.error('Não foi possível carregar os medicamentos')
            } finally {
                setCarregandoAgenda(false)
            }
        }

        carregarAgenda()
    }, [])
    return (
        <div className="dashboard-conteudo">
            <section className="card-boas-vindas-paciente">
                <button
                    type='button'
                    className='botao-voltar'
                    onClick={voltarParaInicio}
                >
                    &lt; Voltar
                </button>

                <div className="card-conteudo-principal">
                    <div className="info-perfil">
                        <div
                            className="foto-perfil"
                            style={{
                                backgroundColor: corAvatar.fundo,
                                color: corAvatar.texto
                            }}
                        >
                            <h2>{gerarIniciais(pacienteSelecionado?.nome)}</h2>
                        </div>
                        <div className='dados-texto'>
                            <h3 className="nome">{pacienteSelecionado?.nome || "Ana Maria De Jesus"}</h3>
                            <p className="idade">{pacienteSelecionado?.idade || 78} anos</p>

                            <ul className="tags">
                                {pacienteSelecionado?.condicoes?.map((condicao) => (
                                    <li key={condicao}>{condicao}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <button type='button' className='botao-medicamento' onClick={aoClicarCadastrarRemedio}>
                        <img src="/assets/cadastrar.svg" alt="adicionar medicamento" />
                        Adicionar Medicamento
                    </button>
                </div>
            </section>

            <div className="dashboard-inferior-grid">

                <div className="contato-de-emergencia">
                    <div className="titulo">
                        <img src="/assets/telefone.svg" alt="telefone" />
                        <h1>Contato de emergência</h1>
                    </div>
                    <div className="nome-telefone">
                        <span>Charles Haenke (Filho)</span>
                        <p>(11) 97699-2487</p>
                    </div>
                    <div className="botoes">
                        <div className="localizacao">
                            <img src="/assets/localizacao.svg" alt="ícone de localização" />
                            <h1>Localização</h1>
                        </div>
                        <div className="historico">
                            <img src="/assets/historico.svg" alt="ícone de histórico" />
                            <h1>Histórico</h1>
                        </div>
                    </div>
                </div>


                <div className="conteudo-principal-direita">

                    <div className="dados-pulseira">
                        <div className="temperatura">
                            <span>37°C</span>
                            <p>Temperatura Corporal</p>
                        </div>
                        <div className="frequencia-cardiaca">
                            <span>70 BPM</span>
                            <p>Frequência Cardíaca</p>
                        </div>
                        <div className="pressao-sanguinea">
                            <span>120/80</span>
                            <p>Pressão Sanguínea</p>
                        </div>
                    </div>

                    <div className="proximos-medicamentos-placeholder">
                        <div className="header-proximos-medicamentos">
                            <div className="proximos-remedios">
                                <img src="/assets/prancheta.svg" alt="prancheta de remédios" />
                                <span>Próximos Medicamentos</span>
                            </div>
                            <div className="menu-medicamentos">
                                <img src="/assets/menu.svg" alt="menu" />
                                <p>Ver todos medicamentos (em breve)</p>
                            </div>
                        </div>
                        <div className="container-remedios">
                            {carregandoAgenda ? (
                                <p>Carregando medicamentos...</p>
                            ) : medicamentosDaAgenda.length === 0 ? (
                                <div className="sem-medicamentos">
                                    <img
                                        src="/assets/remedio.svg"
                                        alt=""
                                        aria-hidden="true"
                                    />

                                    <p>Nenhum medicamento cadastrado</p>

                                    <span>
                                        Adicione um medicamento para começar
                                        a acompanhar os horários deste paciente.
                                    </span>

                                    <button
                                        type="button"
                                        onClick={aoClicarCadastrarRemedio}
                                    >
                                        Adicionar medicamento
                                    </button>
                                </div>
                            ) : (
                                medicamentosDaAgenda.map((medicamento) => (
                                    <div
                                        className="remedio"
                                        key={medicamento.id_programacao_medicamento}
                                    >
                                        <div className="info-esquerda">
                                            <img
                                                src="/assets/remedio.svg"
                                                alt="Símbolo de medicamento"
                                            />

                                            <div className="nome-quantidade">
                                                <span>
                                                    {medicamento.nome}
                                                </span>

                                                <p>
                                                    Dose: {medicamento.quantidade_dose}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="tempo-remedio">
                                            <h1>{medicamento.proximo_horario}</h1>
                                            <p>Horário previsto</p>
                                        </div>
                                        <div className="acoes-medicamento">
                                            <button
                                                type="button"
                                                className="botao-editar"
                                                aria-label={`Editar ${medicamento.nome}`}
                                                title="Editar medicamento"
                                                onClick={() => aoEditarMedicamento(medicamento)}
                                            >
                                                <Pencil size={18} strokeWidth={2}> </Pencil>
                                            </button>

                                            <button
                                                type="button"
                                                className="botao-excluir"
                                                aria-label={`Excluir ${medicamento.nome}`}
                                                title="Excluir medicamento"
                                                onClick={() => confirmarExclusao(medicamento)}
                                            >
                                                <Trash2 size={18} strokeWidth={2}> </Trash2>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DashboardPaciente
