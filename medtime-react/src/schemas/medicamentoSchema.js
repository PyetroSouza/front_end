
import { z } from 'zod'

export const medicamentoSchema = z.object({
    nome: z.string()
        .trim()
        .min(2, 'Informe pelo menos 2 caracteres')
        .max(45, 'Máximo de 45 caracteres')
        .regex(/\p{L}/u, 'O nome deve conter uma letra'),

    dose: z.string()
        .trim()
        .min(1, 'Informe a dose')
        .refine(
            valor => Number(valor) > 0 && Number(valor) <= 999.99,
            'A dose deve estar entre 0,01 e 999,99'
        ),

    tipoDosagem: z.string()
        .regex(/^[1-9]\d*$/, 'Selecione um tipo de dosagem válido'),

    concentracao: z.string()
        .trim()
        .min(1, 'Informe a concentração')
        .regex(
            /^\d+(?:[.,]\d{1,2})?$/,
            'Informe somente o número, ex: 50'
        )
        .refine(
            valor => Number(valor.replace(',', '.')) <= 999.99,
            'A concentração deve ser no máximo 999,99'
        ),

    unidadeConcentracao: z.string()
        .regex(/^[1-9]\d*$/, 'Selecione uma unidade válida'),

    unidadeDose: z.string()
        .regex(/^[1-9]\d*$/, 'Selecione a unidade da dose'),

    frequencia: z.number({
        error: 'Informe a frequência'
    })
        .int('Informe um número inteiro')
        .min(1, 'A frequência deve ser maior que zero'),

    intervalo: z.string()
        .regex(/^[1-9]\d*$/, 'Selecione um intervalo válido'),

    horario: z.string()
        .regex(
            /^([01]\d|2[0-3]):[0-5]\d$/,
            'Informe um horário válido'
        ),

    quantidade: z.string()
        .trim()
        .min(1, 'Informe a quantidade em estoque')
        .refine(
            valor => Number(valor) >= 0 &&
                Number.isFinite(Number(valor)) &&
                valor !== '',
            'Informe uma quantidade numérica válida'
        ),

    descricao: z.string().optional()
})
