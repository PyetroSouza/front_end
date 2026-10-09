
import { useState } from 'react'
import Inicio from './pages/Inicio.jsx'
import CadastroIdoso from './pages/CadastroIdoso'
import Pacientes from './pages/Pacientes.jsx'
import Cabecalho from './components/Cabecalho.jsx'
import './App.css'



function App() {
  const [telaAtual, setTelaAtual] = useState('inicio')
  const [busca, setBusca] = useState('')

  return (
    <div className="aplicacao">
      <Cabecalho />


      <main className="conteudo">
        {telaAtual === 'inicio' && (
          <Inicio
            aoCadastrar={() => setTelaAtual('cadastro')}
            busca={busca}
            setBusca={setBusca}
          />
        )}

        {telaAtual === 'cadastro' && <CadastroIdoso />}

        {telaAtual === 'pacientes' && <Pacientes />}
      </main>
    </div>
  )
}

export default App