
import BoasVindas from '../components/BoasVindas.jsx'
import Buscar from '../components/Buscar.jsx'
import { gerarIniciais } from '../utils/gerarIniciais.js'
import { gerarCorAvatar } from '../utils/gerarCorAvatar.js'
import { pacientes } from '../data/paciente.js'
import { medicamentos } from '../data/medicamentos.js'
import './Inicio.css'

function Inicio({ aoCadastrar, busca, setBusca, abrirDashboard }) {
    const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nome.toLowerCase().includes(busca.trim().toLowerCase())
  )

  function buscarProximoMedicamento(idPaciente) {
    const medicamentosDoPaciente = medicamentos.filter(
      (medicamento) => medicamento.id_paciente === idPaciente
    )

    const medicamentosOrdenados = [...medicamentosDoPaciente].sort(
      (a, b) => a.proximo_horario.localeCompare(b.proximo_horario)
    )

    return medicamentosOrdenados[0] || null
  }

return (
  <>
    <BoasVindas aoCadastrar={aoCadastrar} />

    <Buscar busca={busca} setBusca={setBusca} />

    <div className="container">
      <section className="resumo">
        <div className="card_resumo card_ativos">
          <p className="resumo_numero">{pacientes.length}</p>
          <p className="resumo_texto">Pacientes Ativos</p>
        </div>

        <div className="card_resumo card_alertas">
          <p className="resumo_numero">0</p>
          <p className="resumo_texto">Alertas Pendentes</p>
        </div>
      </section>
      <div className="lista_pacientes">
        {pacientesFiltrados.map((paciente) => {
          const corAvatar = gerarCorAvatar(paciente.nome)
            const proximoMedicamento = buscarProximoMedicamento(paciente.id)

          return (
            <article
              key={paciente.id}
              className="card_paciente"
              onClick={() => abrirDashboard(paciente)}
            >
              <div
                className="avatar"
                style={{
                  backgroundColor: corAvatar.fundo,
                  color: corAvatar.texto
                }}
              >
                {gerarIniciais(paciente.nome)}
              </div>

              <div className="info">
                <h3 className="nome">{paciente.nome}</h3>
                <p className="idade">{paciente.idade} anos</p>

                <ul className="tags">
                  {paciente.condicoes.map((condicao) => (
                    <li key={condicao}>{condicao}</li>
                  ))}
                </ul>
              </div>

              <p className="proximo_remedio">
                <img src="/assets/relogio.svg" alt="" />
                Próx. Med.: {proximoMedicamento
                  ? `${proximoMedicamento.nome} ${proximoMedicamento.concentracao}${proximoMedicamento.sigla} - ${proximoMedicamento.proximo_horario}`
                  : 'Nenhum medicamento cadastrado'
                }
              </p>
            </article>
          )
        })}
      </div>
    </div>
  </>
)
}


export default Inicio