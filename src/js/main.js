import { Task } from './task.js';

class Tomato {
    constructor(timeRemaining = 25, timePause = 5, timeBigPause = 15, tasks = []) {
        if (Tomato._instance) {
            return Tomato._instance;
        }
        this.timeRemaining = timeRemaining;
        this.timePause = timePause;
        this.timeBigPause = timeBigPause;
        this.tasks = tasks;
        this.activeTask = null;
        Tomato._instance = this;
    }



    addTask(task) {
        this.tasks.push(task);
    }

    activateTask(taskId) {
        this.tasks.forEach(task => {
            if (task.getId() === taskId) {
                this.activeTask = task;
                this.runTimer();
            }
        });
    }

    runTimer() {
        if (this.activeTask !== null) {
            const timerId = setInterval(() => {
                if (this.timeRemaining > this.activeTask.getCounter()) {
                    this.activeTask.incrementCount();
                    console.log(this.activeTask.getCounter());
                } else {
                    clearInterval(timerId);

                    let pause = 0;
                    if (this.activeTask.getCounter() % 3 === 0) {
                        pause = this.timeBigPause + this.timeRemaining;
                    } else {
                        pause = this.timePause + this.timeRemaining;
                    }

                    const timerPauseId = setInterval(() => {
                        if (pause > this.activeTask.getCounter()) {
                            this.activeTask.incrementCount();
                            console.log(this.activeTask.getCounter());
                        } else {
                            clearInterval(timerPauseId);
                        }
                    }, 1000);
                }
            }, 1000);
        }
    }
}

const task1 = new Task('первая задача', 4);
const task2 = new Task(' задача 2', 3);
const task3 = new Task(' задача 3', 2);
const task4 = new Task(' задача 4', 1);
const task5 = new Task(' задача 5');

let tomato = new Tomato(10, 5, 15, [task1, task2, task3, task4]);
tomato = new Tomato(2, 5, 15, [task1, task2, task3, task4]);
tomato.addTask(task5);
tomato.activateTask(task5.getId());

console.log(tomato.tasks);
