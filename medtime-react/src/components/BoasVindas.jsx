
import './BoasVindas.css'

function BoasVindas({ aoCadastrar }) {
  return (
    <section className="card-boas-vindas">
      <div className="texto-boas-vindas">
        <h1>Olá, Rafael!</h1>
        <h2>Veja como estão as pessoas que você acompanha</h2>
      </div>

      <div className="botoes-idoso">
        <button
          type="button"
          className="botao-adicionar"
          onClick={aoCadastrar}
        >
          <img src="/assets/adicionar.svg" alt="" />
          <span>Adicionar um idoso</span>
        </button>

        <button
          type="button"
          className="botao-cadastrar"
          onClick={aoCadastrar}
        >
          <img src="/assets/cadastrar.svg" alt="" />
          <span>Cadastrar um idoso</span>
        </button>
      </div>
    </section>
  )
}

export default BoasVindas