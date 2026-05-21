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

  listarVagas() {
    let listagem = "";
    let numero = 1;
    for (let item of this.vagas) {
      listagem +=
        numero++ +
        " " +
        "Empresa: " +
        item.empresa +
        "\n" +
        "Cargo: " +
        item.cargo +
        "\n" +
        "Habilidades exigidas: " +
        item.requisitos.join(", ") +
        "\n\n";
    }
    alert(listagem);
  }
}

class AutomatizadorDeVagas extends Vagas {
  constructor() {
    super();
    this.candidatoAhSerVerificado = new Candidato();
  }

  verCurriculo(){
    alert("Seu curriculo:" + "\n" + "Nome: " + this.candidatoAhSerVerificado.candidato.nome + "\n" +
    "Area: " + this.candidatoAhSerVerificado.candidato.area + "\n" +
    "Habilidades: " + this.candidatoAhSerVerificado.candidato.habilidades.join(", ") + "\n" +
    "Experiencia em meses: " + this.candidatoAhSerVerificado.candidato.experienciaMeses)
  }

  calcularCompatibilidade(indice) {
    let vagaAhSerVerificada = this.vagas[indice];
    let requisitosAtendidos = vagaAhSerVerificada.requisitos.filter((item) => {
      return this.candidatoAhSerVerificado.candidato.habilidades.includes(item);
    });
    let calcularPorcentagem =
      (requisitosAtendidos.length / vagaAhSerVerificada.requisitos.length) *
      100;
    return calcularPorcentagem;
  }

  vagaComMaiorCompatibilidade() {
    let porcentagens = [];
    for (let indice in this.vagas) {
      porcentagens.push(this.calcularCompatibilidade(indice));
    }
    let maior = porcentagens.reduce((acc, numero) => {
      return numero > acc ? numero : acc;
    });

    let indices = porcentagens
      .map((numero, indice) => (numero === maior ? indice : -1))
      .filter((indice) => indice !== -1);

    let aparecer = "";
    for (let item in indices) {
      aparecer +=
        "Vaga mais compatível: " +
        "\n" +
        this.vagas[item].empresa +
        " - " +
        this.vagas[item].cargo +
        "\n" +
        "Compatibilidade: " +
        this.calcularCompatibilidade(item) +
        "%" +
        "\n\n";
    }
    alert(aparecer);
  }
}

let skillmatch = new AutomatizadorDeVagas();

let opcao = 0;
do {
  opcao = Number(prompt("-----Bem Vindo----- \n -----Escolha----- \n 1 - Analisar Vagas \n 2 - Ver seu curriculo \n 0 - Sair"));
  switch (opcao) {
    case 1:
      skillmatch.listarVagas();
      break;
    case 2:
      skillmatch.verCurriculo();
      break;
    case 0:
      alert("Saindo...")
      break
    default:
      alert("Opção invalida")
  }
} while (opcao != 0);
