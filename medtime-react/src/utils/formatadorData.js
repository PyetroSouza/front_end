export function formatarDataHora(objetoData) {
    if (!(objetoData instanceof Date)) return { data: '', hora: '' };
  
    // Formata a data: "28 de outubro"
    const dataParte = objetoData.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
    });
  
    // Formata o dia da semana: "quarta-feira"
    const diaSemana = objetoData.toLocaleDateString('pt-BR', { 
      weekday: 'long' 
    });
  
    // Deixa a primeira letra do dia da semana maiúscula (ex: "Quarta-feira")
    const diaSemanaFormatado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
  
    // Formata a hora: "13:17"
    const horaFormatada = objetoData.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  
    return {
      data: `${dataParte}, ${diaSemanaFormatado}`,
      hora: horaFormatada,
    };
  }
  