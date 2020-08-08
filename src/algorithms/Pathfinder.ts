export class Pathfinder {
    timers: Array<Timer>;

    constructor() {
        this.timers = [];
    }

    addTimer(callback: () => void, delay: number) {
        let timer = new Timer(callback, delay);
        this.timers.push(timer);
    }

    pauseTimers() {
        this.timers.forEach((timer) => {
            timer.pause();
        });
    }

    resumeTimers() {
        this.timers.forEach((timer) => {
            timer.resume();
        });
    }

    deleteTimers() {
        if (this.timers.length) {
            this.timers.forEach((timer) => {
                timer.destroy();
            });
        }
    }
}

class Timer {
    id: ReturnType<typeof setTimeout>;
    callback: () => void;
    delay: number;
    remain: number;
    start: number;

    constructor(callback: () => void, delay: number) {
        this.id = setTimeout(callback, delay);
        this.callback = callback;
        this.delay = delay;
        this.remain = delay;
        this.start = Date.now();
    }

    pause() {
        clearTimeout(this.id);
        this.remain -= Date.now() - this.start;
    }

    resume() {
        this.start = Date.now();
        clearTimeout(this.id);

        if (this.remain > 0) {
            this.id = setTimeout(this.callback, this.remain);
        }
    }

    destroy() {
        clearTimeout(this.id);
    }
}
