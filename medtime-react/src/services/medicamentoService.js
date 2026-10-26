import { enviarImagem } from './cloudinary'
import { montarMedicamento } from '../utils/montarMedicamento'

export async function prepararMedicamento({
    dados,
    pacienteId,
    imagemMedicamento,
    medicamentoEmEdicao
}) {
    let urlImagem = medicamentoEmEdicao?.imagem ?? null

    if (imagemMedicamento) {
        urlImagem = await enviarImagem(imagemMedicamento)
    }

    const medicamentoMontado = montarMedicamento(
        dados,
        pacienteId,
        urlImagem
    )

    return {
        ...medicamentoEmEdicao,
        ...medicamentoMontado,

        id_medicamento:
            medicamentoEmEdicao?.id_medicamento ??
            medicamentoMontado.id_medicamento,

        intervalo: dados.intervalo,
        quantidade: dados.quantidade,
        descricao: dados.descricao,
        tipoMedicamento: dados.tipoMedicamento
    }
}