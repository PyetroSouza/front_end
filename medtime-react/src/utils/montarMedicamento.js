export function montarMedicamento(dados, pacienteId, urlImagem) {
  const partesConcentracao = dados.concentracao.trim().match(
    /^(\d+(?:[.,]\d+)?)\s*(.+)$/
  )

  if (!partesConcentracao) {
    throw new Error('Informe uma concentração válida.')
  }

  const valorConcentracao = partesConcentracao[1].replace(',', '.')
  const unidadeConcentracao = partesConcentracao[2].trim()

  return {
    id_medicamento: crypto.randomUUID(),
    id_paciente: pacienteId,
    nome: dados.nome,
    concentracao: valorConcentracao,
    sigla: unidadeConcentracao,
    tipo_dosagem: dados.tipoDosagem,
    quantidade_dose: Number(dados.dose),
    proximo_horario: dados.horario,
    imagem: urlImagem
  }
}