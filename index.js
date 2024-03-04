const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

// Frases de exemplo para treinamento
const trainingData = [
    { input: 'Quero marcar um horário para amanhã.', output: 'agendar' },
    { input: 'Gostaria de mudar meu horário marcado.', output: 'mudar' },
    { input: 'Quais são meus horários disponíveis?', output: 'consultar' }
    // Adicione mais exemplos conforme necessário
];

// Treine o classificador
const classifier = new natural.BayesClassifier();
trainingData.forEach(item => {
    const tokens = tokenizer.tokenize(item.input);
    classifier.addDocument(tokens, item.output);
});
classifier.train();

// Função para identificar a intenção da frase
function identificarIntencao(frase) {
    const tokens = tokenizer.tokenize(frase);
    return classifier.classify(tokens);
}

// Exemplo de uso
const frase = 'Quero marcar um horário.';
const intencao = identificarIntencao(frase);
console.log('1 - Intenção:', intencao); // Isso deve imprimir 'agendar'

const frase2 = 'Gostaria de mudar meu horário';
const intencao2 = identificarIntencao(frase2);
console.log('2 - Intenção:', intencao2); // Isso deve imprimir 'mudar'

const frase3 = 'horários disponíveis?';
const intencao3 = identificarIntencao(frase3);
console.log('3 - Intenção:', intencao3); // Isso deve imprimir 'consultar'


