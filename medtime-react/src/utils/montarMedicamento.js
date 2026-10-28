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
    concentracao: Number(dados.concentracao),
    id_unidade_medida_embalagem: Number(dados.unidadeConcentracao),
    tipo_dosagem: dados.tipoDosagem,
    quantidade_dose: Number(dados.dose),
    frequencia: Number(dados.frequencia),
    intervalo: dados.intervalo,
    proximo_horario: dados.horario,
    quantidade: dados.quantidade,
    descricao: dados.descricao,
    imagem: urlImagem
  }
}