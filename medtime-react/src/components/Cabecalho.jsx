import './Cabecalho.css'

function Cabecalho() {
    return (
      <header className="cabecalho-original">
        <div className="logo-app">
          <img src="/assets/logo.png" alt="Logo MedTime" />
  
          <h1>
            <span>Med</span>Time
          </h1>
        </div>
  
        <div className="data-hora">
          <h2>06 de Outubro, Terça-feira</h2>
          <h2>14:00</h2>
        </div>
  
        <div className="perfil">
          <div className="foto-perfil">
            <h2>RB</h2>
          </div>
  
          <div className="dados-perfil">
            <p className="nome-perfil">Rafael Braga</p>
            <p className="email-perfil">rafaelbraga@gmail.com</p>
          </div>
        </div>
      </header>
    )
  }
  
  export default Cabecalho