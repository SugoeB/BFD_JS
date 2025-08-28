const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const iniciar = () => {
  rl.question('Quantas notas deseja inserir? ', (resposta) => {
    const qtdNotas = parseInt(resposta);
    if (isNaN(qtdNotas) || qtdNotas <= 0) {
      console.log('Por favor, insira um número válido maior que zero.\n');
      return iniciar();
    }

    let notas = [];
    const lerNota = (indice) => {
      if (indice < qtdNotas) {
        rl.question(`Digite a nota ${indice + 1}: `, (nota) => {
          const notaConvertida = parseFloat(nota.replace(',', '.'));
          if (isNaN(notaConvertida)) {
            console.log('Nota inválida. Tente novamente.\n');
            return lerNota(indice);
          }
          notas.push(notaConvertida);
          lerNota(indice + 1);
        });
      } else {
        const soma = notas.reduce((acc, val) => acc + val, 0);
        const media = soma / qtdNotas;
        const mediaFormatada = media.toFixed(2);

        console.log(`\nMédia do aluno: ${mediaFormatada}`);
        if (media >= 7) {
          console.log('Aluno aprovado!');
        } else {
          console.log('Aluno reprovado.');
        }

        const perguntarNovamente = () => {
          rl.question('\nDeseja calcular outra média?\n[1] Sim\n[2] Não\nEscolha: ', (opcao) => {
            const escolha = opcao.trim();
            if (escolha === '1') {
              console.log('\n Reiniciando...\n');
              iniciar();
            } else if (escolha === '2') {
              console.log('\nEncerrando. Até a próxima!');
              rl.close();
            } else {
              console.log('\n Opção inválida. Digite 1 para continuar ou 2 para encerrar.');
              perguntarNovamente(); 
            }
          });
        };

        perguntarNovamente();
      }
    };

    lerNota(0);
  });
};

iniciar();