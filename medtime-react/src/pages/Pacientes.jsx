
const pacientes = [
    {
        id: 1,
        nome: 'Maria Oliveira',
        idade: 72,
        responsavel: 'Ana Oliveira'
    },
    {
        id: 2,
        nome: 'José Santos',
        idade: 68,
        responsavel: 'Carlos Santos'
    },
    {
        id: 3,
        nome: 'Antônio Costa',
        idade: 81,
        responsavel: 'Paula Costa'
    }
]

function Pacientes() {
    return (
        <section className="pagina-pacientes">
            <h2>Pacientes</h2>
            <p>Confira os idosos cadastrados no sistema.</p>

            <div className="lista-pacientes">
                {pacientes.map((paciente) => (
                    <article className="card-paciente" key={paciente.id}>
                        <h3>{paciente.nome}</h3>
                        <p>Idade: {paciente.idade} anos</p>
                        <p>Responsável: {paciente.responsavel}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Pacientes