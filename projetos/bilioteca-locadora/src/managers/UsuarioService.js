const readline = require("readline-sync");
const Usuario = require("../classes/Usuario");

class UsuarioService {
  constructor() {
    this.usuarios = [];
  }

  adicionarUsuario(nome) {
    if (!nome || nome.trim() === "") {
      console.log("Nome inválido. Usuário não adicionado.");
      return;
    }
    const usuario = new Usuario(nome);
    this.usuarios.push(usuario);
    console.log(`Usuário "${nome}" cadastrado com sucesso!`);
  }

  listarUsuarios() {
    if (this.usuarios.length === 0) {
      console.log("Nenhum usuário cadastrado.");
      return;
    }
    console.log("\n=== Usuários Cadastrados ===");
    this.usuarios.forEach((u, i) => {
      console.log(`${i + 1} - ${u.nome} (${u.itensEmprestados.length} itens)`);
    });
  }

  selecionarUsuario() {
    if (this.usuarios.length === 0) {
      console.log("Nenhum usuário cadastrado.");
      return null;
    }

    this.listarUsuarios();
    const escolha = readline.questionInt("Digite o número do usuário: ") - 1;

    if (escolha < 0 || escolha >= this.usuarios.length) {
      console.log("Usuário inválido. Voltando ao menu...");
      return null;
    }

    return this.usuarios[escolha];
  }
}

module.exports = UsuarioService;
