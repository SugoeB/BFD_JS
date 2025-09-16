const Biblioteca = require("./managers/Biblioteca");
const Locadora = require("./managers/Locadora");
const UsuarioService = require("./managers/UsuarioService");
const Menu = require("./menu/Menu");

const biblioteca = new Biblioteca();
const locadora = new Locadora();
const usuarioService = new UsuarioService();

// pré-cadastrados
biblioteca.adicionarLivro({ titulo: "Dom Casmurro", autor: "Machado de Assis" });
biblioteca.adicionarLivro({ titulo: "O Hobbit", autor: "J.R.R. Tolkien" });

locadora.adicionarFilme({ titulo: "Matrix", diretor: "Wachowski" });
locadora.adicionarFilme({ titulo: "Interestelar", diretor: "Christopher Nolan" });

const menu = new Menu(biblioteca, locadora, usuarioService);
menu.iniciar();
