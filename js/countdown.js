class CountDown {
    // * create a Countdown instance/object
    constructor(expiredDate, onRender, onComplete) {
        this.onRender = onRender;
        this.onComplete = onComplete; 
    }

    // * calculate time remaining, and run function to start/finish 
    setExpiredDate(expiredDate) { 
        const currentTime = new Date.getTime();
        this.timeRemaining = expiredDate.getTime() - currentTime;

        this.timeRemaining > 0 ?
            this.start() :
            this.complete();
    }

    // * run any necessary actions upon completion
    complete() {
        if (typeof this.onComplete === 'function') {
            onComplete();
        }
    }

    // * convert time into d/h/m/s
    getTime() {
        return {
            days: Math.floor(this.timeRemaining / 1000 / 60 / 60 / 24),
            hours: Math.floor(this.timeRemaining / 1000 / 60 / 60) % 24,
            minutes: Math.floor(this.timeRemaining / 1000 / 60) % 60,
            seconds: Math.floor(this.timeRemaining / 1000) % 60
        };
    }

    // * (re)Render the clock UI
    update() {
        if (typeof this.onRender === 'function') {
            this.onRender(this.getTime());
        }
    }

    start() {
        // update the countdown
        // * initial render of clock UI 
        this.update();
    
        
        // * setup a timed function to countdown the seconds (named intervalId)
        //  setup a timer
        const intervalId = setInterval(() => {
            // update the timer  
            // * reduce timeRemaining by 1s
            this.timeRemaining -= 1000; 
            
            // * check the timeRemaining
            if (this.timeRemaining < 0) {
                // * if no more time, call complete() to ding/reset the clock 
                // call the callback
                complete();
                
                // clear the interval if expired
                // * and stop this function
                clearInterval(intervalId);
            } else {
                // * otherwise just call update() to RErender the UI 
                this.update();
            }
            
        // * run this function every 1s
        }, 1000);
    }
    
}