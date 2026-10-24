import { useState } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { medicamentoSchema } from "../schemas/medicamentoSchema"
import { enviarImagem } from '../services/cloudinary'
import { montarMedicamento } from "../utils/montarMedicamento"
import { toast } from 'sonner'
import AnexarImagem from "../components/AnexarImagem"


import "./CadastroRemedio.css"

function CadastroRemedio({ voltarParaDashboard, cadastrarMedicamento, pacienteSelecionado }) {
  const [imagemMedicamento, setImagemMedicamento] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(medicamentoSchema),
    mode: 'onTouched',

    defaultValues: {
      nome: '',
      dose: '',
      tipoDosagem: '',
      concentracao: '',
      tipoMedicamento: 'comprimido',
      intervalo: 'dia',
      horario: '08:00',
      quantidade: '',
      descricao: ''
    }
  })

  async function adicionarMedicamento(dados) {
    console.log('Dados validados:', dados)
    console.log('Paciente selecionado:', pacienteSelecionado)
    if (!imagemMedicamento) {
      toast.warning('Selecione uma imagem primeiro.')
      return
    }

    if (!pacienteSelecionado) {
      toast.error('Nenhum paciente selecionado.')
      return
    }

    try {
      const urlImagem = await enviarImagem(imagemMedicamento)

      console.log('URL da imagem:', urlImagem)
      const novoMedicamento = montarMedicamento(
        dados,
        pacienteSelecionado.id,
        urlImagem
      )

      cadastrarMedicamento(novoMedicamento)

      toast.success('Medicamento cadastrado com sucesso!')
      voltarParaDashboard()
    } catch (erro) {
      console.error(erro)
      toast.error('Erro ao enviar a imagem.', {
        description: 'Não foi possível concluir o upload. Tente novamente.'
      })
    }
  }

  function formularioInvalido(erros) {
    const primeiroErro = Object.values(erros)[0]

    if (primeiroErro) {
      toast.error('Verifique os dados do formulário', {
        description: primeiroErro.message
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
                maxLength={45}
                placeholder="Ex: Dipirona"
                {...register('nome')}
              />
              {errors.nome && (
                <p className="mensagem-erro">
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div className="linha-campos">
              <div className="campo-formulario">
                <label htmlFor="dose">Dose</label>
                <input
                  type="number"
                  id="dose"
                  min="0"
                  step="any"
                  placeholder="Ex: 10"
                  {...register('dose')}
                />
                {errors.dose && (
                  <p className="mensagem-erro">
                    {errors.dose.message}
                  </p>
                )}

              </div>

              <div className="campo-formulario">
                <label htmlFor="tipo-dosagem">Tipo da dosagem</label>
                <select
                  id="tipo-dosagem"
                  {...register('tipoDosagem')}
                >
                  <option value="" disabled>Selecione</option>
                  <option value="comprimido">Comprimido(s)</option>
                  <option value="capsula">Cápsula(s)</option>
                  <option value="ml">mL</option>
                  <option value="gotas">Gota(s)</option>
                  <option value="g">g</option>
                  <option value="outro">Outro</option>
                </select>
                {errors.tipoDosagem && (
                  <p className="mensagem-erro">
                    {errors.tipoDosagem.message}
                  </p>
                )}
              </div>
            </div>

            <div className="linha-campos">
              <div className="campo-formulario">
                <label htmlFor="concentracao">Concentração</label>
                <input type="text"
                  id="concentracao"
                  {...register('concentracao')}
                  placeholder="Ex: 50 mg/mL"
                />
                {errors.concentracao && (
                  <p className="mensagem-erro">
                    {errors.concentracao.message}
                  </p>
                )}
              </div>

              <div className="campo-formulario">
                <label htmlFor="tipo-medicamento">Tipo de medicamento</label>
                <select
                  id="tipo-medicamento"
                  {...register('tipoMedicamento')}
                >
                  <option value="comprimido">Comprimido (CP)</option>
                  <option value="capsula">Cápsula</option>
                  <option value="liquido">Líquido</option>
                  <option value="gotas">Gotas</option>
                  <option value="outro">Outro</option>
                </select>
                {errors.tipoMedicamento && (
                  <p className="mensagem-erro">
                    {errors.tipoMedicamento.message}
                  </p>
                )}
              </div>
            </div>

            <div className="linha-campos">
              <div className="campo-formulario">
                <label htmlFor="intervalo">Intervalo de dosagem</label>
                <select
                  id="intervalo"
                  {...register('intervalo')}
                >
                  <option value="hora">Hora</option>
                  <option value="dia">Dia</option>
                  <option value="semana">Semana</option>
                </select>
                {errors.intervalo && (
                  <p className="mensagem-erro">
                    {errors.intervalo.message}
                  </p>
                )}
              </div>

              <div className="campo-formulario">
                <label htmlFor="horario">Horário de tomada inicial</label>
                <input
                  type="time"
                  id="horario"
                  {...register('horario')}
                />
                {errors.horario && (
                  <p className="mensagem-erro">
                    {errors.horario.message}
                  </p>
                )}
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
              {...register('quantidade')}
              placeholder="Ex: 350 mL"
            />
            {errors.quantidade && (
              <p className="mensagem-erro">
                {errors.quantidade.message}
              </p>
            )}
          </div>

          <div className="campo-formulario">
            <label htmlFor="descricao">Descrição (opcional)</label>
            <textarea
              id="descricao"
              {...register('descricao')}
              rows="4"
              placeholder="Ex: Tomar após o almoço"
            />
          </div>

          <div className="acoes-formulario">
            <button
              type="button"
              className="botao-adicionar-medicamento"
              onClick={handleSubmit(adicionarMedicamento, formularioInvalido)}
              disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Adicionar medicamento'}
            </button>
          </div>

        </div>
      </div>
    </div>

  )
}

export default CadastroRemedio