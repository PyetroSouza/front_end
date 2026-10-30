
import { Pencil, Trash2 } from 'lucide-react'

function CardMedicamento({
    medicamento,
    aoEditar,
    aoExcluir
}) {
    return (
        <div className="remedio">
            <div className="info-esquerda">
                <img
                    src="/assets/remedio.svg"
                    alt="Símbolo de medicamento"
                />

                <div className="nome-quantidade">
                    <span>{medicamento.nome}</span>

                    <p>Dose: {medicamento.quantidade_dose}</p>
                </div>
            </div>

            <div className="tempo-remedio">
                <h1>{medicamento.proximo_horario}</h1>
                <p>Horário previsto</p>
            </div>

            <div className="acoes-medicamento">
                <button
                    type="button"
                    className="botao-editar"
                    aria-label={`Editar ${medicamento.nome}`}
                    title="Editar medicamento"
                    onClick={() => aoEditar(medicamento)}
                >
                    <Pencil size={18} strokeWidth={2} />
                </button>

                <button
                    type="button"
                    className="botao-excluir"
                    aria-label={`Excluir ${medicamento.nome}`}
                    title="Excluir medicamento"
                    onClick={() => aoExcluir(medicamento)}
                >
                    <Trash2 size={18} strokeWidth={2} />
                </button>
            </div>
        </div>
    )
}

export default CardMedicamento
