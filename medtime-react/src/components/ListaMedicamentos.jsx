
import CardMedicamento from './CardMedicamento.jsx'

function ListaMedicamentos({
    medicamentos,
    carregando,
    erro,
    aoAdicionar,
    aoEditar,
    aoExcluir
}) {
    return (
        <div className="container-remedios">
            {carregando ? (
                <p>Carregando medicamentos...</p>
            ) : erro ? (
                <p>Não foi possível carregar os medicamentos.</p>
            ) : medicamentos.length === 0 ? (
                <div className="sem-medicamentos">
                    <img
                        src="/assets/remedio.svg"
                        alt=""
                        aria-hidden="true"
                    />

                    <p>Nenhuma dose programada para hoje</p>

                    <span>
                        Você pode adicionar medicamentos ou consultar
                        a programação de outra data.
                    </span>

                    <button
                        type="button"
                        onClick={aoAdicionar}
                    >
                        Adicionar medicamento
                    </button>
                </div>
            ) : (
                medicamentos.map((medicamento) => (
                    <CardMedicamento
                        key={`${medicamento.id_programacao_medicamento}-${medicamento.proximo_horario}`}
                        medicamento={medicamento}
                        aoEditar={aoEditar}
                        aoExcluir={aoExcluir}
                    />
                ))
            )}
        </div>
    )
}

export default ListaMedicamentos
