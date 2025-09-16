const readline = require("readline-sync");

class Menu {
  constructor(biblioteca, locadora, usuarioService) {
    this.biblioteca = biblioteca;
    this.locadora = locadora;
    this.usuarioService = usuarioService;
  }

  mostrarMenu() {
    console.clear();
    console.log("===== MENU =====");
    console.log("1 - Adicionar Livro");
    console.log("2 - Adicionar Filme");
    console.log("3 - Adicionar Usuário");
    console.log("4 - Listar Livros");
    console.log("5 - Listar Filmes");
    console.log("6 - Usuário pegar item");
    console.log("7 - Usuário devolver item");
    console.log("8 - Listar itens do usuário");
    console.log("0 - Sair");
  }

  iniciar() {
    let opcao;
    do {
      this.mostrarMenu();
      opcao = readline.question("Escolha: ");

      switch (opcao) {
        case "1": this.adicionarLivro(); break;
        case "2": this.adicionarFilme(); break;
        case "3": this.adicionarUsuario(); break;
        case "4": console.clear(); this.biblioteca.listarLivros(); readline.question("\nEnter para continuar..."); break;
        case "5": console.clear(); this.locadora.listarFilmes(); readline.question("\nEnter para continuar..."); break;
        case "6": this.pegarItem(); break;
        case "7": this.devolverItem(); break;
        case "8": this.listarItensUsuario(); break;
        case "0": console.log("Saindo..."); break;
        default: console.log("Opção inválida, tente novamente!");
      }
    } while (opcao !== "0");
  }

  adicionarLivro() {
    console.clear();
    const titulo = readline.question("Título do livro: ");
    const autor = readline.question("Autor: ");
    this.biblioteca.adicionarLivro({ titulo, autor });
    readline.question("\nEnter para voltar ao menu...");
  }

  adicionarFilme() {
    console.clear();
    const titulo = readline.question("Título do filme: ");
    const diretor = readline.question("Diretor: ");
    this.locadora.adicionarFilme({ titulo, diretor });
    readline.question("\nEnter para voltar ao menu...");
  }

  adicionarUsuario() {
    console.clear();
    const nome = readline.question("Nome do usuário: ");
    this.usuarioService.adicionarUsuario(nome);
    readline.question("\nEnter para voltar ao menu...");
  }

  pegarItem() {
    console.clear();
    const usuario = this.usuarioService.selecionarUsuario();
    if (!usuario) { readline.question("\nEnter para voltar..."); return; }

    if (usuario.itensEmprestados.length >= 3) {
      console.log("Limite de 3 itens atingido! Devolva algo antes.");
      readline.question("\nEnter para voltar...");
      return;
    }

    console.log("\n1 - Livro");
    console.log("2 - Filme");
    const tipo = readline.question("Escolha: ");

    if (tipo === "1") {
      const livro = this.biblioteca.buscarLivro();
      if (livro && usuario.pegarItem(livro)) {
        console.log(`"${livro.titulo}" emprestado para ${usuario.nome}`);
      } else {
        console.log("Não foi possível emprestar este livro.");
      }
    } else if (tipo === "2") {
      const filme = this.locadora.buscarFilme();
      if (filme && usuario.pegarItem(filme)) {
        console.log(`🎬 "${filme.titulo}" emprestado para ${usuario.nome}`);
      } else {
        console.log("Não foi possível emprestar este filme.");
      }
    } else {
      console.log("Tipo inválido, voltando ao menu...");
    }

    readline.question("\nEnter para voltar...");
  }

  devolverItem() {
    console.clear();
    const usuario = this.usuarioService.selecionarUsuario();
    if (!usuario) { readline.question("\nEnter para voltar..."); return; }

    if (usuario.itensEmprestados.length === 0) {
      console.log("Esse usuário não tem itens emprestados.");
      readline.question("\nEnter para voltar...");
      return;
    }

    usuario.listarItens();
    const idx = readline.questionInt("Digite o número do item para devolver: ") - 1;

    if (idx >= 0 && idx < usuario.itensEmprestados.length) {
      const item = usuario.itensEmprestados[idx];
      usuario.devolverItem(item);
      console.log(`${item.titulo} devolvido com sucesso!`);
    } else {
      console.log("Escolha inválida.");
    }

    readline.question("\nEnter para voltar...");
  }

  listarItensUsuario() {
    console.clear();
    const usuario = this.usuarioService.selecionarUsuario();
    if (usuario) usuario.listarItens();
    readline.question("\nEnter para voltar...");
  }
}

module.exports = Menu;
