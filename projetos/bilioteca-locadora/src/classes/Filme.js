class Filme {
  constructor(titulo, diretor) {
    this.titulo = titulo;
    this.diretor = diretor;
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

module.exports = Filme;
