class Candidato {
  constructor() {
    this.candidato = {
      nome: "Luis",
      area: "Front-End",
      habilidades: ["JavaScript", "GitHub", "Lógica de Programação", "Funções"],
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
      {
        id: 4,
        empresa: "DevWave",
        cargo: "Desenvolvedor Front-End Trainee",
        requisitos: ["Funções", "JavaScript"],
        salario: 2200,
        modalidade: "Remoto",
      },
      {
        id: 5,
        empresa: "ByteTech",
        cargo: "Desenvolvedor JavaScript Júnior",
        requisitos: ["JavaScript", "Funções", "Objetos", "GitHub"],
        salario: 3200,
        modalidade: "Híbrido",
      }
    ];
  }

  async listarVagas(callback) {
    let listagem = "";
    for (let item of this.vagas) {
      listagem += item.id + " - " + "Empresa: " + item.empresa +
        "\n" +
        "Cargo: " + item.cargo +
        "\n" +
        "Habilidades exigidas: " + item.requisitos.join(", ") +
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

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        let sucesso = true;
        if (sucesso) {
          resolve(listagem);
        } else {
          reject("Ocorreu um erro na operação");
        }
      }, 1000);
    });

    alert("Listando vagas...");
    for (let item in this.vagas) {
    alert(contar() + " Vagas encontradas");
    }

    try {
      let resultado = await promise;
      let opcao = Number(prompt("Selecione a vaga que você quer analisar: " + "\n\n" + resultado));
      callback(opcao);
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
        "Nome: " + this.candidatoAhSerVerificado.candidato.nome +
        "\n" +
        "Area: " + this.candidatoAhSerVerificado.candidato.area +
        "\n" +
        "Habilidades: " + this.candidatoAhSerVerificado.candidato.habilidades.join(", ") +
        "\n" +
        "Experiencia em meses: " + this.candidatoAhSerVerificado.candidato.experienciaMeses
    );
  }

  vagaAnalisada(numero) {
    let indice = numero - 1;
    let vagaAnalisada = this.vagas[indice];
    let porcentagem = this.calcularCompatibilidade(indice);

    let requisitosAtendidos = vagaAnalisada.requisitos.filter((item) => {
      return this.candidatoAhSerVerificado.candidato.habilidades.includes(item);
    });

    let requisitosNaoAtendidos = vagaAnalisada.requisitos.filter((item) => {
      return !this.candidatoAhSerVerificado.candidato.habilidades.includes(
        item,
      );
    });

    let habilidadesCompativeis = "";
    let habilidadesNaoCompativeis = "";

    if (requisitosAtendidos.length === 0) {
      habilidadesCompativeis = "Nenhuma habilidade compativel";
    } else {
      habilidadesCompativeis = requisitosAtendidos.join(", ");
    }

    if (requisitosNaoAtendidos.length === 0) {
      habilidadesNaoCompativeis = "Nenhuma habilidade faltante";
    } else {
      habilidadesNaoCompativeis = requisitosNaoAtendidos.join(", ");
    }

    let classificacao = "";
    if (porcentagem >= 80) {
      classificacao = "Alta compatibilidade";
    } else if (porcentagem >= 50) {
      classificacao = "Média compatibilidade";
    } else {
      classificacao = "Baixa compatibilidade";
    }

    let opcao = Number(prompt("Empresa: " + vagaAnalisada.empresa +
        "\n" +
        "Cargo: " + vagaAnalisada.cargo +
        "\n" +
        "Compatibilidade: " + porcentagem + "%" +
        "\n" +
        "Habilidades encontradas: " + habilidadesCompativeis +
        "\n" +
        "Habilidades faltantes: " + habilidadesNaoCompativeis +
        "\n" +
        "Classificação: " + classificacao + 
        "\n\n" + 
        "1 - Se deseja gerar uma recomendação de estudo \n2 - Se deseja listar as habilidades faltantes"
    ));

    switch(opcao){
      case 1:
        if(requisitosNaoAtendidos.length === 0) {
          alert("Parabens!! \nNão há o que estudar, todas suas habilidades são compativeis com a vaga")
        } else {
          alert(`Recomendação de estudo: \nPriorize estudar ${habilidadesNaoCompativeis}, pois esses conteúdos aparecem na vaga analisada.`)
        }
        break
      case 2:
        if(requisitosNaoAtendidos.length === 0) {
          alert("Parabens!! \nTodas suas habilidades são compativeis com a vaga")
        } else {
          alert(`Para a vaga da ${vagaAnalisada.empresa}, faltam:\n- ${requisitosNaoAtendidos.join("\n-")}`)
        }
        break
    }
  }

  calcularCompatibilidade(indice) {
    let vagaAhSerVerificada = this.vagas[indice];
    let requisitosAtendidos = vagaAhSerVerificada.requisitos.filter((item) => {
      return this.candidatoAhSerVerificado.candidato.habilidades.includes(item);
    });
    let calcularPorcentagem = (requisitosAtendidos.length / vagaAhSerVerificada.requisitos.length) * 100;
    return Number(calcularPorcentagem.toFixed(1));
  }

  vagaComMaiorCompatibilidade() {
    let porcentagens = [];
    for (let indice in this.vagas) {
      porcentagens.push(this.calcularCompatibilidade(indice));
    }
    let maior = porcentagens.reduce((acc, numero) => {
      return numero > acc ? numero : acc;
    });

    let indices = porcentagens.map((numero, indice) => (numero === maior ? indice : -1)).filter((indice) => indice !== -1);

    let aparecer = "";
    for (let item of indices) {
      aparecer +="Vaga mais compatível: " + 
      "\n" + 
      this.vagas[item].empresa + " - " + this.vagas[item].cargo + 
      "\n" + 
      "Compatibilidade: " + this.calcularCompatibilidade(item) + "%" + "\n\n";
    }
    alert(aparecer);
  }

  async iniciarPrograma() {
    let opcao = 0;
    do {
      opcao = Number(
        prompt(
          "-----Bem Vindo----- \n -----Escolha----- \n 1 - Analisar Vagas \n 2 - Ver seu curriculo \n 3 - Vagas com maior compatibilidade \n 0 - Sair",
        ),
      );
      switch (opcao) {
        case 1:
          await this.listarVagas((opcao) => {
            this.vagaAnalisada(opcao);
          });
          break;
        case 2:
          this.verCurriculo();
          break;
        case 3:
          this.vagaComMaiorCompatibilidade();
          break
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
