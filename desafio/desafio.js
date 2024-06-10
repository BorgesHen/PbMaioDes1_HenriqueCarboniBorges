const fs = require('fs');

const balls = [
    { color: 'verde', weight: 1 },
    { color: 'azul', weight: 2 },
    { color: 'amarelo', weight: 3 },
    { color: 'vermelho', weight: 5 }
];

function chooseBall() {
    const totalWeight = balls.reduce((sum, ball) => sum + ball.weight, 0);
    const rand = Math.random() * totalWeight;
    let sum = 0;

    for (const ball of balls) {
        sum += ball.weight;
        if (rand < sum) {
            return ball.color;
        }
    }
}

const sequences = [];
for (let i = 0; i < 1000; i++) {
    const sequence = [];
    for (let j = 0; j < 4; j++) {
        sequence.push(chooseBall());
    }
    sequences.push(sequence.join(','));
}

fs.writeFileSync('resultado.txt', sequences.join('\n'), 'utf8');
console.log('Arquivo "resultado.txt" criado com sucesso!');

fs.readFile('resultado.txt', 'utf8', (err, data) => {
    if (err) throw err;

    const lines = data.split('\n');
    const count = {
        verde: 0,
        azul: 0,
        amarelo: 0,
        vermelho: 0
    };

    for (const line of lines) {
        const balls = line.split(',');
        for (const ball of balls) {
            count[ball]++;
        }
    }

    console.log(`verde: ${count.verde}`);
    console.log(`azul: ${count.azul}`);
    console.log(`amarelo: ${count.amarelo}`);
    console.log(`vermelho: ${count.vermelho}`);
});
