import { useState } from "react"
import { enviarImagem } from '../services/cloudinary'
import { toast } from 'sonner'
import AnexarImagem from "../components/AnexarImagem"


import "./CadastroRemedio.css"

function CadastroRemedio({ voltarParaDashboard }) {
  const [imagemMedicamento, setImagemMedicamento] = useState(null)

  async function adicionarMedicamento() {
    if (!imagemMedicamento) {
      toast.warning('Selecione uma imagem primeiro.')
      return
    }

    try {
      const urlImagem = await enviarImagem(imagemMedicamento)

      console.log('URL da imagem:', urlImagem)
      toast.success('Imagem enviada com sucesso!')
    } catch (erro) {
      console.error(erro)
      toast.error('Erro ao enviar a imagem.', {
        description: 'Não foi possível concluir o upload. Tente novamente.'
      })
    }
  }

  return (
    <div className="conteudo">
      <button type="button" className="botao-voltar" onClick={voltarParaDashboard}>
        &lt; Voltar
      </button>

      <div className="formulario-cadastro-remedio">
        <div className="header-formulario">
          <h1>Cadastro de Medicamento</h1>
          <p>Preencha as informações do medicamento para adicioná-lo ao tratamento</p>
        </div>

        <div className="cadastrar">

          <AnexarImagem aoSelecionarImagem={setImagemMedicamento} />


          <div className="formulario-esquerdo">

            <div className="campo-formulario">
              <label htmlFor="nome-medicamento">Nome do medicamento</label>
              <input
                type="text"
                id="nome-medicamento"
                placeholder="Ex: Dipirona"
              />
            </div>

            <div className="linha-campos">
              <div className="campo-formulario">
                <label htmlFor="dose">Dose</label>
                <input type="number" id="dose" min="0" step="any" placeholder="Ex: 10" />
              </div>

              <div className="campo-formulario">
                <label htmlFor="tipo-dosagem">Tipo da dosagem</label>
                <select id="tipo-dosagem" defaultValue="">
                  <option value="" disabled>Selecione</option>
                  <option value="mg">mg</option>
                  <option value="ml">mL</option>
                  <option value="g">g</option>
                  <option value="gotas">Gotas</option>
                </select>
              </div>
            </div>

            <div className="linha-campos">
              <div className="campo-formulario">
                <label htmlFor="concentracao">Concentração</label>
                <input type="text" id="concentracao" placeholder="Ex: 50 mg/mL" />
              </div>

              <div className="campo-formulario">
                <label htmlFor="tipo-medicamento">Tipo de medicamento</label>
                <select id="tipo-medicamento" defaultValue="comprimido">
                  <option value="comprimido">Comprimido (CP)</option>
                  <option value="capsula">Cápsula</option>
                  <option value="liquido">Líquido</option>
                  <option value="gotas">Gotas</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>

            <div className="linha-campos">
              <div className="campo-formulario">
                <label htmlFor="intervalo">Intervalo de dosagem</label>
                <select id="intervalo" defaultValue="dia">
                  <option value="hora">Hora</option>
                  <option value="dia">Dia</option>
                  <option value="semana">Semana</option>
                </select>
              </div>

              <div className="campo-formulario">
                <label htmlFor="horario">Horário de tomada inicial</label>
                <input type="time" id="horario" defaultValue="08:00" />
              </div>
            </div>

          </div>
        </div>
        <div className="campos-inferiores">

          <div className="campo-formulario">
            <label htmlFor="quantidade">
              Quantidade total do tratamento
            </label>
            <input
              type="text"
              id="quantidade"
              placeholder="Ex: 350 mL"
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="descricao">Descrição (opcional)</label>
            <textarea
              id="descricao"
              rows="4"
              placeholder="Ex: Tomar após o almoço"
            />
          </div>

          <div className="acoes-formulario">
            <button type="button" className="botao-adicionar-medicamento" onClick={adicionarMedicamento}>
              Adicionar medicamento
            </button>
          </div>

        </div>
      </div>
    </div>

  )
}

export default CadastroRemedio