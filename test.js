// re Timer from "./src/algorithms/Timer";

const Pathfinder = require("./src/algorithms/Timer");
// const Timer = require("./src/algorithms/Timer");

let pathfinder = new Pathfinder();

const func = (i) => {
    console.log(`inside func ${i}`);
};

// let isPaused = false;

for (let i = 0; i < 10; i++) {
    pathfinder.addTimer({
        callback: () => {
            func(i);
        },
        delay: 1000 * i,
    });
}

// for (let i = 0; i < 10; i++) {
//     const timer = new Timer({
//         callback: () => {
//             console.log(i);
//         },
//         delay: 5000 * i,
//     });
//     timers.push(timer);
// }

// const timer = new Timer({
//     callback: () => {
//         func(1);
//     },
//     delay: 5000 * 1,
// });

setTimeout(() => {
    pathfinder.pauseTimers();
}, 5000);
setTimeout(() => {
    pathfinder.resumeTimers();
}, 7000);
// setTimeout(() => {timer.resume()}, 100);
