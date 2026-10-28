
const API_URL = 'http://localhost:8080/v1/healthSystem/medtime'

export async function buscarUnidadesMedida() {
  const resposta = await fetch(`${API_URL}/unidade_medida`)

  if (!resposta.ok) {
    throw new Error('Erro ao buscar unidades de medida')
  }

  const dados = await resposta.json()
  return dados.response.unidade_medida
}

export async function buscarTiposDosagem() {
  const resposta = await fetch(`${API_URL}/tipo_dosagem`)

  if (!resposta.ok) {
    throw new Error('Erro ao buscar tipos de dosagem')
  }

  const dados = await resposta.json()
  return dados.response.tipo_dosagem
}

export async function cadastrarMedicamentoAPI(dadosMedicamento) {
  const resposta = await fetch(`http://localhost:8080/v1/healthSystem/medtime/medicamento`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dadosMedicamento)
  })

  const resultado = await resposta.json()

  if (!resposta.ok) {
    throw new Error(
      dados.field?.join(', ') ||
      dados.message ||
      'Erro ao cadastrar medicamento'
    )
  }

  return resultado
}
