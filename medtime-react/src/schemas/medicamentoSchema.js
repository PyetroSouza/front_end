import { z } from "zod"

export const medicamentoSchema = z.object({
    nome: z.string()
        .trim()
        .min(1, 'Informe o nome do medicamento')
        .min(2, 'O nome deve ter pelo menos 2 caracteres')
        .max(45, 'O nome deve ter no máximo 45 caracteres')
        .regex(
            /\p{L}/u,
            'O nome deve conter pelo menos uma letra'
        )
        .regex(
            /^[\p{L}\p{N}\s+\-\/().,%]+$/u,
            'O nome contém caracteres não permitidos'
        ),

    dose: z.string()
        .trim()
        .min(0.01, 'Informe a dose')
        .refine(
            (valor) => valor === '' || Number.isFinite(Number(valor)),
            'Informe uma dose numérica válida'
        )
        .refine(
            (valor) => valor === '' || !Number.isFinite(Number(valor)) || Number(valor) > 0,
            'A dose deve ser maior que zero'
        ),

    tipoDosagem: z.enum(
        ['comprimido', 'capsula', 'ml', 'gotas', 'g', 'outro'],
        { error: 'Selecione uma unidade de dosagem válida' }
    ),

    horario: z.string()
        .min(1, 'Informe o horário inicial')
        .regex(
            /^([01]\d|2[0-3]):[0-5]\d$/,
            'Informe um horário válido no formato HH:mm'
        ),

    concentracao: z.number()
        .min(1, 'Informe a concentração')
        .max(50, 'A concentração deve ter no máximo 50 caracteres'),

    unidadeConcentracao: z.string()
        .trim()
        .min(1)
        .max(24)
        .regex(
            /[a-zA-Zµμ]/,
            'Informe a unidade da concentração'
        ),
    frequencia: z.number()
        .min(1),

    intervalo: z.enum(
        ['hora', 'dia', 'semana'],
        { error: 'Selecione um intervalo válido' }
    ),

    quantidade: z.string()
        .trim()
        .min(1, 'Informe a quantidade total do tratamento'),

    descricao: z.string()
        .optional()
})