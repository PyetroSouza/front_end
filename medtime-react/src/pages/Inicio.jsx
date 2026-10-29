
import BoasVindas from '../components/BoasVindas.jsx'
import Buscar from '../components/Buscar.jsx'
import CardPaciente from '../components/CardPaciente.jsx'
import { gerarIniciais } from '../utils/gerarIniciais.js'
import { gerarCorAvatar } from '../utils/gerarCorAvatar.js'
import './Inicio.css'

function Inicio({
  aoCadastrar,
  busca,
  setBusca,
  abrirDashboard,
  medicamentos,
  pacientes
}) {

  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nome.toLowerCase().includes(busca.trim().toLowerCase())
  )

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

          {pacientesFiltrados.map((paciente) => (
            <CardPaciente
              key={paciente.id}
              paciente={paciente}
              aoClicar={() => abrirDashboard(paciente)}
            />
          ))}

        </div>
      </div>
    </>
  )
}


export default Inicio