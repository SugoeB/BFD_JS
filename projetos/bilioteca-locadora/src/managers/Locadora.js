const Filme = require("../classes/Filme");

class Locadora {
  constructor() {
    this.filmes = [];
  }

  adicionarFilme({ titulo, diretor }) {
    if (!titulo || !diretor) {
      console.log("Dados inválidos. Filme não adicionado.");
      return;
    }
    const filme = new Filme(titulo, diretor);
    this.filmes.push(filme);
  }

  listarFilmes() {
    console.log("\n=== Filmes da Locadora ===");
    if (this.filmes.length === 0) {
      console.log("Nenhum filme cadastrado.");
      return;
    }
    this.filmes.forEach((f, i) => {
      console.log(`${i + 1} - ${f.titulo} (${f.diretor}) - ${f.emprestado ? "Emprestado" : "Disponível"}`);
    });
  }

  buscarFilme() {
    if (this.filmes.length === 0) {
      console.log("Nenhum filme disponível.");
      return null;
    }
    this.listarFilmes();
    const readline = require("readline-sync");
    const escolha = readline.questionInt("Escolha o número do filme: ") - 1;

    if (escolha < 0 || escolha >= this.filmes.length) {
      console.log("Filme inválido.");
      return null;
    }
    return this.filmes[escolha];
  }
}

module.exports = Locadora;
