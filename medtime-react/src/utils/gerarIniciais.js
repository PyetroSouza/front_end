
export function gerarIniciais(nome) {
    if (!nome?.trim()) return ''

    const partes = nome.trim().split(/\s+/)

    const primeiraLetra = partes[0][0]
    const segundaLetra = partes[1]?.[0] || ''

    return (primeiraLetra + segundaLetra).toUpperCase()
}
