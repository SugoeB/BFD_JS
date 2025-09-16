const Livro = require("../classes/Livro");

class Biblioteca {
  constructor() {
    this.livros = [];
  }

  adicionarLivro({ titulo, autor }) {
    if (!titulo || !autor) {
      console.log("Dados inválidos. Livro não adicionado.");
      return;
    }
    const livro = new Livro(titulo, autor);
    this.livros.push(livro);
  }

  listarLivros() {
    console.log("\n=== Livros da Biblioteca ===");
    if (this.livros.length === 0) {
      console.log("Nenhum livro cadastrado.");
      return;
    }
    this.livros.forEach((l, i) => {
      console.log(`${i + 1} - ${l.titulo} (${l.autor}) - ${l.emprestado ? "Emprestado" : "Disponível"}`);
    });
  }

  buscarLivro() {
    if (this.livros.length === 0) {
      console.log("Nenhum livro disponível.");
      return null;
    }
    this.listarLivros();
    const readline = require("readline-sync");
    const escolha = readline.questionInt("Escolha o número do livro: ") - 1;

    if (escolha < 0 || escolha >= this.livros.length) {
      console.log("Livro inválido.");
      return null;
    }
    return this.livros[escolha];
  }
}

module.exports = Biblioteca;
