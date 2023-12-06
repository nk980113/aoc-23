const input = `Time:        44     89     96     91
Distance:   277   1136   1890   1768`;

function main() {
    const [time, dist] = input.split('\n').map((l) => Number(l.slice(9).trim().replaceAll(' ', '')));
    const error = Math.sqrt(time * time / 4 - dist - 1);
    const lower = Math.ceil(time / 2 - error);
    const upper = Math.floor(time / 2 + error);
    return upper - lower + 1;
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