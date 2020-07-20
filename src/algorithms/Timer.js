class Timer {
    constructor({ callback, delay }) {
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

export class Pathfinder {
    constructor() {
        this.timers = [];
    }

    addTimer({ callback, delay }) {
        let timer = new Timer({ callback, delay });
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
        this.timers.forEach((timer) => {
            timer.destroy();
        });
    }
}