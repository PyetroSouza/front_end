
import { useState } from 'react'
import Inicio from './pages/Inicio.jsx'
import CadastroIdoso from './pages/CadastroIdoso'
import Pacientes from './pages/Pacientes.jsx'
import Cabecalho from './components/Cabecalho.jsx'
import DashboardPaciente from './pages/DashboardPaciente.jsx'
import './App.css'



function App() {
  const [telaAtual, setTelaAtual] = useState('inicio')
  const [busca, setBusca] = useState('')
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null)

  return (
    <div className="aplicacao">
      <Cabecalho />


      <main className="conteudo">
        {telaAtual === 'inicio' && (
          <Inicio
            aoCadastrar={() => setTelaAtual('cadastro')}
            busca={busca}
            setBusca={setBusca}

            abrirDashboard={(paciente) => {
              setPacienteSelecionado(paciente)
              setTelaAtual("dashboard")
            }}
          />
        )}

        {telaAtual === 'cadastro' && <CadastroIdoso />}

        {telaAtual === 'pacientes' && <Pacientes />}

        {telaAtual === 'dashboard' && <DashboardPaciente pacienteSelecionado={pacienteSelecionado} setPacienteSelecionado={setPacienteSelecionado} />}
      </main>
    </div>
  )
}

export default App