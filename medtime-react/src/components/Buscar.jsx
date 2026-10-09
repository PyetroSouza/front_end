import './Buscar.css'

function Buscar({ busca, setBusca }) {
  return (
    <div className="search">
      <img src="/assets/pesquisar.svg" alt="Ícone de pesquisa" />

      <div className="buscar">
        <input
          type="text"
          placeholder="Buscar acompanhado..."
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
        />
      </div>
    </div>
  )
}

export default Buscar