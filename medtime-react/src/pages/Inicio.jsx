
import BoasVindas from '../components/BoasVindas.jsx'
import Buscar from '../components/Buscar.jsx'
import './Inicio.css'

function Inicio({ aoCadastrar, busca, setBusca, abrirDashboard }) {
  return (
    <>
      <BoasVindas aoCadastrar={aoCadastrar} />

      <Buscar busca={busca} setBusca={setBusca} />

      <div className="container">
        <section className="resumo">
          <div className="card_resumo card_ativos">
            <p className="resumo_numero">3</p>
            <p className="resumo_texto">Pacientes Ativos</p>
          </div>

          <div className="card_resumo card_alertas">
            <p className="resumo_numero">0</p>
            <p className="resumo_texto">Alertas Pendentes</p>
          </div>
        </section>

        <section className="lista_pacientes">
          <article className="card_paciente">
            <div className="avatar avatar_verde">AM</div>

            <div className="info">
              <h3 className="nome">Ana Maria De Jesus</h3>
              <p className="idade">78 anos</p>

              <ul className="tags">
                <li>Alzheimer</li>
                <li>Hipertensão</li>
              </ul>
            </div>

            <p className="proximo_remedio">
              <img src="/assets/relogio.svg" alt="" />
              Próx. Med.: Omeprazol 100mg - 16:40
            </p>
          </article>

          <article className="card_paciente">
            <div className="avatar avatar_verde">AM</div>

            <div className="info">
              <h3 className="nome">Ana Maria De Jesus</h3>
              <p className="idade">78 anos</p>

              <ul className="tags">
                <li>Alzheimer</li>
                <li>Hipertensão</li>
              </ul>
            </div>

            <p className="proximo_remedio">
              <img src="/assets/relogio.svg" alt="" />
              Próx. Med.: Omeprazol 100mg - 16:40
            </p>
          </article>

          <article className="card_paciente" onClick={() => abrirDashboard({
            nome: 'Ana Maria De Jesus',
            idade: 78
          })}>
            <div className="avatar avatar_verde">AM</div>

            <div className="info">
              <h3 className="nome">Ana Maria De Jesus</h3>
              <p className="idade">78 anos</p>

              <ul className="tags">
                <li>Alzheimer</li>
                <li>Hipertensão</li>
              </ul>
            </div>

            <p className="proximo_remedio">
              <img src="/assets/relogio.svg" alt="" />
              Próx. Med.: Omeprazol 100mg - 16:40
            </p>
          </article>
        </section>
      </div>
    </>
  )
}

export default Inicio