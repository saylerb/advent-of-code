import { part1 } from "./day15.js";
import { performance } from "perf_hooks";

const ROUNDS = 30_000_000;
const t0 = performance.now();
// const result = part1("12,1,16,3,11,0", 30_000_000);
const result = part1("0,3,6", ROUNDS);
const t1 = performance.now();

const time = (t1 - t0) / 1000 + " seconds";

console.log({ rounds: ROUNDS, result, time });
// The input took about 10 min to run
// { result: 37385, time: '571.9235154533386 seconds' }
