const inputa = ``;
const input = ``;

function main() {

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