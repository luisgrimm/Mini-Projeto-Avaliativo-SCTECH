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

  async listarVagas(callback) {
    let listagem = "";
    for (let item of this.vagas) {
      listagem +=
        item.id + " - " +
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

    function contadorDeVagas() {
      let total = 0;

      return function () {
        total++;
        return total;
      };
    }

    let contar = contadorDeVagas();

    alert("Listando vagas...");
    for(let item in this.vagas){
       alert(contar() + " Vagas encontradas"); 
    }

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        let sucesso = true;
        if (sucesso) {
          resolve(listagem);
        } else {
          reject("Ocorreu um erro na operação");
        }
      }, 2000);
    });

    try {
      let resultado = await promise;
      let opcao = Number(prompt("Selecione a vaga que você quer analisar: " + "\n\n" + resultado));
      callback(opcao)
    } catch (erro) {
      alert(erro);
    }
  }
}

class AutomatizadorDeVagas extends Vagas {
  constructor() {
    super();
    this.candidatoAhSerVerificado = new Candidato();
  }

  verCurriculo() {
    alert(
      "Seu curriculo:" +
        "\n" +
        "Nome: " +
        this.candidatoAhSerVerificado.candidato.nome +
        "\n" +
        "Area: " +
        this.candidatoAhSerVerificado.candidato.area +
        "\n" +
        "Habilidades: " +
        this.candidatoAhSerVerificado.candidato.habilidades.join(", ") +
        "\n" +
        "Experiencia em meses: " +
        this.candidatoAhSerVerificado.candidato.experienciaMeses,
    );
  }

  vagaAnalisada(numero){
    let indice = numero - 1;
    let vagaAnalisada = this.vagas[indice];
    let porcentagem = this.calcularCompatibilidade(indice);

    let requisitosAtendidos = vagaAnalisada.requisitos.filter((item) => {
      return this.candidatoAhSerVerificado.candidato.habilidades.includes(item);
    });


    let classificacao = "";
    if(porcentagem >= 80){
      classificacao = "Alta compatibilidade"
    } else if(porcentagem >= 50){
      classificacao = "Média compatibilidade"
    } else {
      classificacao = "Baixa compatibilidade"
    }


    alert("Empresa: " + vagaAnalisada.empresa + "\n" + "Cargo: " + vagaAnalisada.cargo + "\n" + "Compatibilidade: " + porcentagem + "%" + "\n" + "Classificação: " + classificacao)

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

  async iniciarPrograma() {
    let opcao = 0;
    do {
      opcao = Number(
        prompt(
          "-----Bem Vindo----- \n -----Escolha----- \n 1 - Analisar Vagas \n 2 - Ver seu curriculo \n 0 - Sair",
        ),
      );
      switch (opcao) {
        case 1:
          await skillmatch.listarVagas((opcao) => {
            skillmatch.vagaAnalisada(opcao)
          });
          break;
        case 2:
          skillmatch.verCurriculo();
          break;
        case 0:
          alert("Saindo...");
          break;
        default:
          alert("Opção invalida");
      }
    } while (opcao != 0);
  }
}

let skillmatch = new AutomatizadorDeVagas();

skillmatch.iniciarPrograma();
