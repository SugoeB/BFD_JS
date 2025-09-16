class Livro {
  constructor(titulo, autor) {
    this.titulo = titulo;
    this.autor = autor;
    this.emprestado = false;
  }

  emprestar() {
    if (this.emprestado) return false;
    this.emprestado = true;
    return true;
  }

  devolver() {
    if (!this.emprestado) return false;
    this.emprestado = false;
    return true;
  }
}

module.exports = Livro;
