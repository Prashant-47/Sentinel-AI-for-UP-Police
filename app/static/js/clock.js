function updateClock() {

    const clock = document.getElementById("liveClock");

    if (!clock) return;

    const now = new Date();

    clock.innerHTML = now.toLocaleTimeString();

}

updateClock();

setInterval(updateClock,1000);