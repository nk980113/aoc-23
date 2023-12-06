const input = `Time:        44     89     96     91
Distance:   277   1136   1890   1768`;

function main() {
    const [times, dists] = input.split('\n').map((l) => l.slice(9).trim().split(/ +/).map(Number));
    const races = times.map((t, i) => [t, dists[i] + 1]);
    return races.map(([t, d]) => {
        // Math explanation below
        const error = Math.sqrt(t * t / 4 - d);
        const lower = Math.ceil(t / 2 - error);
        const upper = Math.floor(t / 2 + error);
        return upper - lower + 1;
    }).reduce((p, c) => p * c, 1);
}

/**
 * Let time be the race time, dist be the best distance in the race.
 * If a certain button time h meets the requirement,
 * then h * (time - h) > dist.
 * We know that h and time are both natural numbers,
 * so we can be sure that h * (time - h) >= dist + 1.
 * Also, h * (time - h) = [time/2 - (time/2 - h)] * [time/2 + (time/2 - h)]
 *                      = (time/2) ^ 2 - (time/2 - h) ^ 2,
 * so that (time/2) ^ 2 - (time/2 - h) ^ 2 >= dist + 1.
 * Rearrange, then we got (time/2 - h) ^ 2 <= (time/2) ^ 2 - dist - 1.
 * Let error be the square root of [(time/2) ^ 2 - dist - 1],
 * then (time/2 - h) ^ 2 <= error ^ 2,
 * so -error <= time/2 - h <= error,
 * and we can get the lower bound and the upper bound of h.
 * After that, it's a simple counting problem.
 */

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