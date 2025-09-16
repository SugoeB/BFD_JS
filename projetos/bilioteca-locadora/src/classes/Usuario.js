class Usuario {
  constructor(nome) {
    this.nome = nome;
    this.itensEmprestados = [];
  }

  pegarItem(item) {
    if (this.itensEmprestados.length >= 3) return false;
    if (!item.emprestar()) return false;

    this.itensEmprestados.push(item);
    return true;
  }

  devolverItem(item) {
    const idx = this.itensEmprestados.indexOf(item);
    if (idx === -1) return false;

    if (!item.devolver()) return false;

    this.itensEmprestados.splice(idx, 1);
    return true;
  }

  listarItens() {
    console.log(`\nItens emprestados por ${this.nome}:`);
    if (this.itensEmprestados.length === 0) {
      console.log("Nenhum item emprestado.");
      return;
    }
    this.itensEmprestados.forEach((i, idx) => {
      console.log(`${idx + 1} - ${i.titulo}`);
    });
  }
}

module.exports = Usuario;
