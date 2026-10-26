
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
  const [medicamentoEmEdicao, setMedicamentoEmEdicao] = useState(null)

  function voltarParaInicio() {
    setTelaAtual('inicio')
    setPacienteSelecionado(null)
  }

  function voltarParaDashboard() {
    setTelaAtual('dashboard')
  }

  function irParaCadastroRemedio() {
    setMedicamentoEmEdicao(null)
    setTelaAtual('cadastro-remedio')
  }

  function cadastrarMedicamento(novoMedicamento) {
    setListaMedicamentos((listaAnterior) => [
      ...listaAnterior,
      novoMedicamento
    ])
  }

  function excluirMedicamento(idMedicamento) {
    console.log('ID recebido para excluir:', idMedicamento)

    setListaMedicamentos((listaAnterior) => {
      console.log('Lista antes:', listaAnterior)

      const novaLista = listaAnterior.filter(
        (medicamento) => medicamento.id_medicamento !== idMedicamento
      )

      console.log('Lista depois:', novaLista)

      return novaLista
    })
  }

  function iniciarEdicaoMedicamento(medicamento) {
    setMedicamentoEmEdicao(medicamento)
    setTelaAtual('cadastro-remedio')
  }

  function atualizarMedicamento(medicamentoAtualizado) {
    setListaMedicamentos((listaAnterior) =>
      listaAnterior.map((medicamento) =>
        medicamento.id_medicamento === medicamentoAtualizado.id_medicamento
          ? medicamentoAtualizado
          : medicamento
      )
    )
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
          excluirMedicamento={excluirMedicamento}
          aoClicarCadastrarRemedio={irParaCadastroRemedio}
          aoEditarMedicamento={iniciarEdicaoMedicamento}
          medicamentos={listaMedicamentos}
        />)}
        {telaAtual === 'cadastro-remedio' && (
          <CadastroRemedio
            voltarParaDashboard={voltarParaDashboard}
            cadastrarMedicamento={cadastrarMedicamento}
            medicamentoEmEdicao={medicamentoEmEdicao}
            atualizarMedicamento={atualizarMedicamento}
            pacienteSelecionado={pacienteSelecionado} />
        )}
      </main>
    </div>
  )
}

export default App