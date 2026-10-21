
import { useState } from 'react'
import Inicio from './pages/Inicio.jsx'
import CadastroIdoso from './pages/CadastroIdoso'
import Pacientes from './pages/Pacientes.jsx'
import Cabecalho from './components/Cabecalho.jsx'
import DashboardPaciente from './pages/DashboardPaciente.jsx'
import CadastroRemedio from './pages/CadastroRemedio.jsx'
import { Toaster } from 'sonner'
import './App.css'


function App() {
  const [telaAtual, setTelaAtual] = useState('inicio')
  const [busca, setBusca] = useState('')
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null)

  function voltarParaInicio() {
    setTelaAtual('inicio')
    setPacienteSelecionado(null)
  }

  function voltarParaDashboard() {
    setTelaAtual('dashboard')
  }

  function irParaCadastroRemedio() {
    setTelaAtual("cadastro-remedio")
  }


  return (
    <div className="aplicacao">
      <Cabecalho />

      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={4000}
      />
      
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

        {telaAtual === 'dashboard' && (<DashboardPaciente
          pacienteSelecionado={pacienteSelecionado}
          setPacienteSelecionado={setPacienteSelecionado}
          voltarParaInicio={voltarParaInicio}
          aoClicarCadastrarRemedio={irParaCadastroRemedio}
        />)}
        {telaAtual === 'cadastro-remedio' && (
          <CadastroRemedio voltarParaDashboard={voltarParaDashboard} />
        )}
      </main>
    </div>
  )
}

export default App