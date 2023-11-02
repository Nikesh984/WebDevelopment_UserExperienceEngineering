$(document).ready(function() {
    let interval;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;


    $('#datePicker').on('keydown', (e) => {
        e.preventDefault();
    });
    
    const currentDate = new Date().toISOString().substring(0, 10);

    $('#datePicker').val(currentDate);

    const updateTime = () => {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }

        $('#timer').text(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    };

    const startInterval = () => {
        return new Promise((resolve) => {
            if (!interval) {
                interval = setInterval(updateTime, 1000);
            }
            resolve();
        });
    };

    const stopInterval = () => {
        return new Promise((resolve) => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
            resolve();
        });
    };

    $('#startBtn').click(async () => {
        await startInterval();
    });

    $('#stopBtn').click(async () => {
        await stopInterval();
    });

    $('#resetBtn').click(async () => {
        await stopInterval();
        seconds = 0;
        minutes = 0;
        hours = 0;
        $('#timer').text("00:00:00");
    });
});
