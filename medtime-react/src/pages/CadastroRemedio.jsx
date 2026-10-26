import { useState } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { medicamentoSchema } from "../schemas/medicamentoSchema"
import { prepararMedicamento } from '../services/medicamentoService'
import { toast } from 'sonner'
import AnexarImagem from "../components/AnexarImagem"


import "./CadastroRemedio.css"

function CadastroRemedio({ voltarParaDashboard, cadastrarMedicamento, pacienteSelecionado, medicamentoEmEdicao, atualizarMedicamento }) {
  const [imagemMedicamento, setImagemMedicamento] = useState(null)
  const modoEdicao = Boolean(medicamentoEmEdicao)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(medicamentoSchema),
    mode: 'onTouched',

    defaultValues: {
      nome: medicamentoEmEdicao?.nome ?? '',

      dose: medicamentoEmEdicao?.quantidade_dose != null
        ? String(medicamentoEmEdicao.quantidade_dose)
        : '',

      tipoDosagem: medicamentoEmEdicao?.tipo_dosagem
        ?.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') ?? '',

      concentracao: medicamentoEmEdicao
        ? `${medicamentoEmEdicao.concentracao} ${medicamentoEmEdicao.sigla}`
        : '',

      tipoMedicamento: medicamentoEmEdicao?.tipoMedicamento ?? 'comprimido',
      intervalo: medicamentoEmEdicao?.intervalo ?? 'dia',
      horario: medicamentoEmEdicao?.proximo_horario ?? '08:00',
      quantidade: medicamentoEmEdicao?.quantidade ?? '',
      descricao: medicamentoEmEdicao?.descricao ?? ''
    }

  })

  async function adicionarMedicamento(dados) {
    if (!pacienteSelecionado) {
      toast.error('Nenhum paciente selecionado.')
      return
    }

    if (!modoEdicao && !imagemMedicamento) {
      toast.warning('Selecione uma imagem primeiro.')
      return
    }

    try {
      const medicamentoPreparado = await prepararMedicamento({
        dados,
        pacienteId: pacienteSelecionado.id,
        imagemMedicamento,
        medicamentoEmEdicao
      })

      if (modoEdicao) {
        atualizarMedicamento(medicamentoPreparado)
        toast.success('Medicamento atualizado com sucesso!')
      } else {
        cadastrarMedicamento(medicamentoPreparado)
        toast.success('Medicamento cadastrado com sucesso!')
      }

      voltarParaDashboard()

    } catch (erro) {
      console.error(erro)

      toast.error('Não foi possível salvar o medicamento.', {
        description: erro.message
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
          <h1>{modoEdicao ? 'Editar Medicamento' : 'Cadastro de Medicamento'}</h1>
          <p>Preencha as informações do medicamento para adicioná-lo ao tratamento</p>
        </div>

        <div className="cadastrar">

          <AnexarImagem
            aoSelecionarImagem={setImagemMedicamento}
            imagemInicial={medicamentoEmEdicao?.imagem}
          />


          <div className="formulario-esquerdo">

            <div className="campo-formulario">
              <label htmlFor="nome-medicamento">Nome do medicamento</label>
              <input
                type="text"
                id="nome-medicamento"
                maxLength={45}
                placeholder="Ex: Dipirona"
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? 'erro-nome' : undefined}
                className={errors.nome ? 'campo-invalido' : ''}
                {...register('nome')}
              />
              {errors.nome && (

                <p
                  id="erro-nome"
                  className="mensagem-erro">
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
                  aria-invalid={!!errors.dose}
                  aria-describedby={errors.dose ? 'erro-dose' : undefined}
                  className={errors.dose ? 'campo-invalido' : ''}
                  {...register('dose')}
                />
                {errors.dose && (
                  <p id="erro-dose"
                    className="mensagem-erro">
                    {errors.dose.message}
                  </p>
                )}

              </div>

              <div className="campo-formulario">
                <label htmlFor="tipo-dosagem">Tipo da dosagem</label>
                <select
                  id="tipo-dosagem"
                  aria-invalid={!!errors.tipoDosagem}
                  aria-describedby={errors.tipoDosagem ? 'erro-tipoDosagem' : undefined}
                  className={errors.tipoDosagem ? 'campo-invalido' : ''}
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
                  <p
                    id="erro-tipoDosagem"
                    className="mensagem-erro">
                    {errors.tipoDosagem.message}
                  </p>
                )}
              </div>
            </div>

            <div className="linha-campos">
              <div className="campo-formulario">
                <label htmlFor="concentracao">Concentração</label>
                <input
                  type="text"
                  id="concentracao"
                  aria-invalid={!!errors.concentracao}
                  aria-describedby={errors.concentracao ? 'concentracao' : undefined}
                  className={errors.concentracao ? 'campo-invalido' : ''}
                  {...register('concentracao')}
                  placeholder="Ex: 50 mg/mL"
                />
                {errors.concentracao && (
                  <p
                    id="erro-concentracao"
                    className="mensagem-erro">
                    {errors.concentracao.message}
                  </p>
                )}
              </div>

              <div className="campo-formulario">
                <label htmlFor="tipo-medicamento">Tipo de medicamento</label>
                <select
                  id="tipo-medicamento"
                  aria-invalid={!!errors.tipoMedicamento}
                  aria-describedby={errors.tipoMedicamento ? 'erro-tipoMedicamento' : undefined}
                  className={errors.tipoMedicamento ? 'campo-invalido' : ''}
                  {...register('tipoMedicamento')}
                >
                  <option value="comprimido">Comprimido (CP)</option>
                  <option value="capsula">Cápsula</option>
                  <option value="liquido">Líquido</option>
                  <option value="gotas">Gotas</option>
                  <option value="outro">Outro</option>
                </select>
                {errors.tipoMedicamento && (
                  <p
                    id="erro-tipoMedicamento"
                    className="mensagem-erro">
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
                  aria-invalid={!!errors.intervalo}
                  aria-describedby={errors.intervalo ? 'erro-intervalo' : undefined}
                  className={errors.intervalo ? 'campo-invalido' : ''}
                  {...register('intervalo')}
                >
                  <option value="hora">Hora</option>
                  <option value="dia">Dia</option>
                  <option value="semana">Semana</option>
                </select>
                {errors.intervalo && (
                  <p
                    id="erro-intervalo"
                    className="mensagem-erro">
                    {errors.intervalo.message}
                  </p>
                )}
              </div>

              <div className="campo-formulario">
                <label htmlFor="horario">Horário de tomada inicial</label>
                <input
                  type="time"
                  id="horario"
                  aria-invalid={!!errors.horario}
                  aria-describedby={errors.horario ? 'erro-horario' : undefined}
                  className={errors.horario ? 'campo-invalido' : ''}
                  {...register('horario')}
                />
                {errors.horario && (
                  <p
                    id="erro-horario"
                    className="mensagem-erro">
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
              aria-invalid={!!errors.quantidade}
              aria-describedby={errors.quantidade ? 'erro-quantidade' : undefined}
              className={errors.quantidade ? 'campo-invalido' : ''}
              {...register('quantidade')}
              placeholder="Ex: 350 mL"
            />
            {errors.quantidade && (
              <p
                id="erro-quantidade"
                className="mensagem-erro">
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
              {isSubmitting
                ? 'Salvando...'
                : modoEdicao
                  ? 'Salvar alterações'
                  : 'Adicionar medicamento'
              }
            </button>
          </div>

        </div>
      </div>
    </div>

  )
}

export default CadastroRemedio