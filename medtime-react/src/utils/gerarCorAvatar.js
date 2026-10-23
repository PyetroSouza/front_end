const cores = [
    { fundo: '#009951', texto: '#FFFFFF' },
    { fundo: '#1D6FA4', texto: '#FFFFFF' },
    { fundo: '#E07B54', texto: '#FFFFFF' },
    { fundo: '#6D3EA1', texto: '#FFFFFF' }
]

export function gerarCorAvatar(nome) {
    if (!nome) return cores[0]

    let numero = 0

    for (const letra of nome.toLowerCase()) {
        numero += letra.charCodeAt(0)
    }

    const indice = numero % cores.length

    return cores[indice]
}