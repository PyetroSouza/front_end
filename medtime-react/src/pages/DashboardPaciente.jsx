import './DashboardPaciente.css'
import ListaMedicamentos from '../components/ListaMedicamentos.jsx'
import { useAgendaMedicamentos } from '../hooks/useAgendaMedicamentos.js'
import { gerarIniciais } from '../utils/gerarIniciais.js'
import { gerarCorAvatar } from '../utils/gerarCorAvatar.js'
import { excluirMedicamentoCompleto } from '../services/api.js'
import { toast } from 'sonner'


function DashboardPaciente({ pacienteSelecionado, voltarParaInicio, aoClicarCadastrarRemedio, medicamentos, excluirMedicamento, aoEditarMedicamento, aoVerTodosMedicamentos }) {
    const corAvatar = gerarCorAvatar(pacienteSelecionado?.nome)


    function confirmarExclusao(medicamento) {
        toast.warning(`Excluir ${medicamento.nome}?`, {
            description:
                'O medicamento e suas programações serão removidos. O histórico de tomadas será preservado.',
            duration: 10000,
            action: {
                label: 'Excluir',
                onClick: async () => {
                    try {
                        await excluirMedicamentoCompleto(
                            medicamento.id_receita_medica,
                            pacienteSelecionado.id
                        )

                        toast.success('Medicamento excluído com sucesso!')
                        await recarregarAgenda()
                    } catch (erro) {
                        toast.error('Não foi possível excluir o medicamento.', {
                            description: erro.message
                        })
                    }
                }
            },
            cancel: {
                label: 'Cancelar',
                onClick: () => toast.dismiss()
            }
        })
    }


    const {
        agenda,
        carregandoAgenda,
        erroAgenda,
        recarregarAgenda
    } = useAgendaMedicamentos(pacienteSelecionado?.id)

    console.log('📋 Agenda do Dashboard:', agenda)


    const medicamentosDaAgenda = agenda.map((item) => ({
        id_medicamento: item.id_medicamento,
        id_programacao_medicamento: item.id_programacao_medicamento,
        id_receita_medica: item.id_receita_medica,
        nome: item.nome_medicamento,
        quantidade_dose: Number(item.dosagem),


        horario_programado: item.horario_programado,


        proximo_horario: item.horario_programado.slice(11, 16),


        confirmado: item.confirmado
    }))


    const calcularIdade = (dataNascimento) => {
        if (!dataNascimento) return null

        const nascimento = new Date(dataNascimento)
        const hoje = new Date()

        let idade = hoje.getFullYear() - nascimento.getUTCFullYear()

        const aindaNaoFezAniversario =
            hoje.getMonth() < nascimento.getUTCMonth() ||
            (
                hoje.getMonth() === nascimento.getUTCMonth() &&
                hoje.getDate() < nascimento.getUTCDate()
            )

        if (aindaNaoFezAniversario) idade--

        return idade
    }
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
                            <p className="idade">
                                {pacienteSelecionado?.data_nascimento
                                    ? `${calcularIdade(pacienteSelecionado.data_nascimento)} anos`
                                    : 'Idade não informada'}
                            </p>

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
                            <button
                                type="button"
                                className="menu-medicamentos botao-ver-todos"
                                onClick={aoVerTodosMedicamentos}
                            >
                                <img src="/assets/menu.svg" alt="" aria-hidden="true" />
                                Ver todos medicamentos
                            </button>
                        </div>

                        <ListaMedicamentos
                            medicamentos={medicamentosDaAgenda}
                            carregando={carregandoAgenda}
                            erro={erroAgenda}
                            aoAdicionar={aoClicarCadastrarRemedio}
                            aoEditar={aoEditarMedicamento}
                            aoExcluir={confirmarExclusao}
                            idUsuario={pacienteSelecionado.id}
                            aoConfirmarTomada={recarregarAgenda}
                        />


                    </div>

                </div>
            </div>
        </div>
    )
}

export default DashboardPaciente
