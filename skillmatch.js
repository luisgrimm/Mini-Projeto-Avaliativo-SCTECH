class Candidato {
  constructor() {
    this.candidato = {
      nome: "Ana",
      area: "Front-End",
      habilidades: ["JavaScript", "GitHub", "Lógica de Programação", "Kanban"],
      experienciaMeses: 3,
    };
  }
}
class Vagas {
  constructor() {
    this.vagas = [
      {
        id: 1,
        empresa: "TechStart",
        cargo: "Desenvolvedor Front-End Júnior",
        requisitos: ["JavaScript", "GitHub", "Lógica de Programação"],
        salario: 2800,
        modalidade: "Remoto",
      },
      {
        id: 2,
        empresa: "CodeLab",
        cargo: "Estágio Front-End",
        requisitos: ["JavaScript", "Kanban", "GitHub"],
        salario: 1800,
        modalidade: "Híbrido",
      },
      {
        id: 3,
        empresa: "WebSolutions",
        cargo: "Programador JavaScript Júnior",
        requisitos: ["JavaScript", "Arrays", "Objetos", "Funções"],
        salario: 3000,
        modalidade: "Presencial",
      },
    ];
  }
}
class AutomatizadorDeVagas extends Vagas {
  constructor() {
    super();
    this.candidatoAhSerVerificado = new Candidato();
  }
  calcularCompatibilidade(numero) {
    let indice = numero - 1;
    let vagaAhSerVerificada = this.vagas[indice];
    let requisitosAtendidos = vagaAhSerVerificada.requisitos.filter((item) => {
      return this.candidatoAhSerVerificado.candidato.habilidades.includes(item);
    });
    let calcularPorcentagem =
      (requisitosAtendidos.length / vagaAhSerVerificada.requisitos.length) *
      100;
    return calcularPorcentagem;
  }
}

/* let nivelCompatibilidade = ""; 
if(calcularPorcentagem >= 80) { 
nivelCompatibilidade += "Alta compatibilidade" 
} else if(calcularPorcentagem >= 50){ 
 nivelCompatibilidade += "Média compatibilidade" 
 } else { 
    nivelCompatibilidade += "Baixa compatibilidade" 
} 
    alert(`Empresa: ${vagaAhSerVerificada.empresa} 
    Cargo: ${vagaAhSerVerificada.cargo} 
    Compatibilidade: ${calcularPorcentagem}% 
    Habilidades encontradas `) */
