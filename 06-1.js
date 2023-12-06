const input = `Time:        44     89     96     91
Distance:   277   1136   1890   1768`;

function main() {
    const [times, dists] = input.split('\n').map((l) => l.slice(9).trim().split(/ +/).map(Number));
    const races = times.map((t, i) => [t, dists[i] + 1]);
    return races.map(([t, d]) => {
        const error = Math.sqrt(t * t / 4 - d);
        const lower = Math.ceil(t / 2 - error);
        const upper = Math.floor(t / 2 + error);
        return upper - lower + 1;
    }).reduce((p, c) => p * c, 1);
}

if (process.argv.includes('--bench')) {
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        const start = performance.now();
        main();
        sum += performance.now() - start;
    }
    console.log(`${(sum / 10).toFixed(3)}ms`);
} else {
    console.log(main());
}