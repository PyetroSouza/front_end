import './DashboardPaciente.css'

function DashboardPaciente({ pacienteSelecionado, setPacienteSelecionado }) {
    return (
        <>
            <section className="card-boas-vindas-paciente">
                <button
                    type='button'
                    className='botao-voltar'
                    onClick={() => setPacienteSelecionado(null)}
                >
                    &lt; Voltar
                </button>

                <div className="card-conteudo-principal">
                    <div className="info-perfil">
                        <div className="foto-perfil">
                            <h2>RB</h2>
                        </div>
                        <div className='dados-texto'>
                            <h3 className="nome">{pacienteSelecionado?.nome}</h3>
                            <p className="idade">{pacienteSelecionado?.idade} anos</p>

                            <ul className="tags">
                                <li>Alzheimer</li>
                                <li>Hipertensão</li>
                            </ul>
                        </div>
                    </div>

                    <button
                        type='button'
                        className='botao-medicamento'
                    >
                        <img src="/assets/cadastrar.svg" alt="adicionar medicamento" />
                        <span>Adicionar Medicamento</span>
                    </button>
                </div>
            </section>
        </>
    )
}

export default DashboardPaciente