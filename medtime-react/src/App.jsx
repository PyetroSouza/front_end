
import { useState } from 'react'
import Inicio from './pages/Inicio.jsx'
import CadastroIdoso from './pages/CadastroIdoso'
import Pacientes from './pages/Pacientes.jsx'
import Cabecalho from './components/Cabecalho.jsx'
import DashboardPaciente from './pages/DashboardPaciente.jsx'
import CadastroRemedio from './pages/CadastroRemedio.jsx'
import { Toaster } from 'sonner'
import { medicamentos as medicamentosIniciais } from './data/medicamentos'
import './App.css'


function App() {
  const [telaAtual, setTelaAtual] = useState('inicio')
  const [busca, setBusca] = useState('')
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null)
  const [listaMedicamentos, setListaMedicamentos] = useState(
    () => [...medicamentosIniciais]
  )

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

  function cadastrarMedicamento(novoMedicamento) {
    setListaMedicamentos((listaAnterior) => [
      ...listaAnterior,
      novoMedicamento
    ])
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
            medicamentos={listaMedicamentos}
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
          medicamentos={listaMedicamentos}
        />)}
        {telaAtual === 'cadastro-remedio' && (
          <CadastroRemedio
            voltarParaDashboard={voltarParaDashboard}
            cadastrarMedicamento={cadastrarMedicamento}
            pacienteSelecionado={pacienteSelecionado} />
        )}
      </main>
    </div>
  )
}

export default App