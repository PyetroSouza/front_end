import './DashboardPaciente.css'
import { gerarIniciais } from '../utils/gerarIniciais.js'
import { gerarCorAvatar } from '../utils/gerarCorAvatar.js'


function DashboardPaciente({ pacienteSelecionado, voltarParaInicio, aoClicarCadastrarRemedio, medicamentos }) {
    const corAvatar = gerarCorAvatar(pacienteSelecionado?.nome)
    const medicamentosDoPaciente = medicamentos.filter(
        (medicamento) => medicamento.id_paciente === pacienteSelecionado?.id
    )

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
                                <li>Alzheimer</li>
                                <li>Hipertensão</li>
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
                                <p>Ver todos medicamentos</p>
                            </div>
                        </div>
                        <div className="container-remedios">
                            {medicamentosDoPaciente.length === 0 ? (
                                <p className="sem-medicamentos">
                                    Nenhum medicamento cadastrado para este paciente.
                                </p>
                            ) : (
                                medicamentosDoPaciente.map((medicamento) => (
                                    <div
                                        className="remedio"
                                        key={medicamento.id_medicamento}
                                    >
                                        <div className="info-esquerda">
                                            <img
                                                src="/assets/remedio.svg"
                                                alt="Símbolo de medicamento"
                                            />

                                            <div className="nome-quantidade">
                                                <span>
                                                    {medicamento.nome} {medicamento.concentracao}{medicamento.sigla}
                                                </span>

                                                <p>
                                                    {medicamento.quantidade_dose} {medicamento.tipo_dosagem}
                                                    {medicamento.quantidade_dose > 1 ? 's' : ''}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="tempo-remedio">
                                            <h1>{medicamento.proximo_horario}</h1>
                                            <p>Horário previsto</p>
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
