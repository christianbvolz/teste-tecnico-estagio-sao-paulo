const fs = require('fs');

const questao1 = () => {
  const indice = 13;
  let soma = 0;
  let k = 0;

  while(k < indice) {
    k += 1;
    soma += k;
  }

  return soma;
};

console.log(`Resposta questão 1:\nSOMA = ${ questao1() }.\n`);

const questao2 = (num) => {
  if (num === 0 || num === 1) return 'pertence';

  // primeiros números da sequência de Fibonacci
  let f1 = 0;
  let f2 = 1;

  let result = 'não pertence';

  // enquanto num for maior que f2, continua gerando o próximo número da sequência de Fibonacci
  // Se f2 for maior que num quer dizer que num não pertence a sequência de Fibonacci
  while(num > f2) {
    
    // atualizando o valor dos 2 últimos números da sequência de Fibonacci
    const previous = f2;
    f2 += f1;
    f1 = previous;
    
    // f2 sempre será o proximo número da sequência então num é um numero da sequência se for igual a f2
    if (num === f2) {
      result = 'pertence';
      break;
    };
  }

  return result;
};

const numQuestao2 = 34;

console.log(`Resposta questão 2:\nO número ${ numQuestao2 } ${ questao2(numQuestao2) } a sequência de Fibonacci.\n`);

const questao3 = () => {
  const dadosJson = fs.readFileSync('dados.json', 'utf8');

  const dados = JSON.parse(dadosJson);

  // filtra os dias sem faturamento 
  const dadosFiltrados = dados.filter(({ valor }) => valor !== 0);

  const faturamentoMensal = dadosFiltrados.reduce((acc, { valor }) => acc + valor, 0);

  const diasDeFaturamento = dadosFiltrados.length;

  const mediaMensal = faturamentoMensal / diasDeFaturamento;
  
  let maiorFaturamento = dadosFiltrados[0].valor;
  let menorFaturamento = dadosFiltrados[0].valor;
  let diasFaturamentoSuperiorAoMensal = 0;

  
  dadosFiltrados.forEach(({ valor: faturamentoDoDia }) => {
    // verifica Número de dias no mês em que o valor de faturamento diário foi superior à média mensal
    if (faturamentoDoDia > mediaMensal) diasFaturamentoSuperiorAoMensal += 1;

    // verifica o menor e maior valor de faturamento ocorrido em um dia do mês
    maiorFaturamento = (maiorFaturamento < faturamentoDoDia) ? faturamentoDoDia : maiorFaturamento;
    menorFaturamento = (menorFaturamento > faturamentoDoDia) ? faturamentoDoDia : menorFaturamento;
  });
  
  return { maiorFaturamento, menorFaturamento, diasFaturamentoSuperiorAoMensal };
};

const q3 = questao3();

console.log(`Resposta questão 3:
O menor valor de faturamento ocorrido em um dia do mês foi R$${ q3.menorFaturamento.toFixed(2) }.
O maior valor de faturamento ocorrido em um dia do mês foi R$${ q3.maiorFaturamento.toFixed(2) }.
Número de dias no mês em que o valor de faturamento diário foi superior à média mensal foi ${ q3.diasFaturamentoSuperiorAoMensal }.\n`);


const faturamentoMensalPorEstado = {
  sp: 67836.43,
  rj: 36678.66,
  mg: 29229.88,
  es: 27165.48,
  outros: 19849.53,
}

const questao4 = (obj) => {
  let faturamentoTotal = 0;

  // soma o faturamento de total de todos os estados
  for (const estado in obj) {
    faturamentoTotal += obj[estado];
  };

  let result = '';

  for (const estado in obj) {
    const faturamentoDoEstado = obj[estado];

    const percentual = ((faturamentoDoEstado / faturamentoTotal) * 100).toFixed(2);

    result += `${estado}: ${percentual}%\n`;
  };

  return result;
};

console.log(`Resposta questão 4:
Percentual de representação que cada estado teve dentro do valor total mensal da distribuidora:
${ questao4(faturamentoMensalPorEstado) }`);


const questao5 = (string) => {
  let result = '';

  // laço de repetição que inicia do último index da string e vai até o index 0
  // assim a cada iteração concatena do último ao primeiro caractere da string
  for(let index = string.length - 1; index >= 0; index -= 1) {
    result += string[index];
  }

  return result;
};

const stringQuestao5 = 'Banana';

console.log(`Resposta questão 5:
O inverso da string ${ stringQuestao5 } é ${ questao5(stringQuestao5) }\n`);

