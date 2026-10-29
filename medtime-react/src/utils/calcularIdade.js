
export function calcularIdade(dataNascimento) {
    if (!dataNascimento) return null

    const nascimento = new Date(dataNascimento)
    if (Number.isNaN(nascimento.getTime())) return null

    const hoje = new Date()

    let idade = hoje.getFullYear() - nascimento.getUTCFullYear()

    const aindaNaoFezAniversario =
        hoje.getMonth() < nascimento.getUTCMonth() ||
        (
            hoje.getMonth() === nascimento.getUTCMonth() &&
            hoje.getDate() < nascimento.getUTCDate()
        )

    if (aindaNaoFezAniversario) idade--

    return idade
}
