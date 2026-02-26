document.addEventListener("DOMContentLoaded", () => {
    const elements = {
        menuItems: document.querySelectorAll('.osd-menu li'),
        screens: document.querySelectorAll('.screen'),
        timer: document.getElementById('osd-timer'),
        volt: document.getElementById('osd-volt'),
        thr: document.getElementById('osd-thr'),
        rssi: document.getElementById('osd-rssi'),
        gpsLat: document.getElementById('gps-lat'),
        gpsLon: document.getElementById('gps-lon'),
        gpsAlt: document.getElementById('gps-alt')
    };
    elements.menuItems.forEach(item => {
        item.addEventListener('click', () => {
            elements.menuItems.forEach(i => i.classList.remove('active'));
            elements.screens.forEach(s => s.classList.remove('active'));
            item.classList.add('active');
            document.getElementById(item.dataset.target).classList.add('active');
        });
    });
    let seconds = 0;
    let currentAlt = 1085;

    setInterval(() => {
        seconds++;
        elements.timer.innerText = `${Math.floor(seconds/60).toString().padStart(2,'0')}:${(seconds%60).toString().padStart(2,'0')}`;
        elements.rssi.innerText = Math.floor(Math.random() * 40) - 99;
    }, 1000);
    const battLevelEl = document.querySelector('.battery-level');

    setInterval(() => {
        let v = parseFloat(elements.volt.innerText);
        if(Math.random() > 0.5) v -= 0.1;
        if(Math.random() > 0.95) v += 0.1;
        if(v < 21.0) v = 21.5; 
        
        elements.volt.innerText = v.toFixed(1);
        let percent = ((v - 21.0) / 4.2) * 100;
        if(percent > 100) percent = 100;
        if(percent < 0) percent = 0;
        if(battLevelEl) battLevelEl.style.width = `${percent}%`;
        if(v < 22.5) {
            elements.volt.style.color = "red";
            elements.volt.parentElement.classList.add('blink');
        } else {
            elements.volt.style.color = "white";
            elements.volt.parentElement.classList.remove('blink');
        }
    }, 1000);
    setInterval(() => {
        elements.gpsLat.innerText = (23.45 + (Math.random()*0.1-0.05)).toFixed(2);
        elements.gpsLon.innerText = (12.89 + (Math.random()*0.1-0.05)).toFixed(2);
   
        currentAlt -= (Math.floor(Math.random()*4) + 2);
        if(currentAlt < 0) currentAlt = 1085;
        elements.gpsAlt.innerText = currentAlt;
    }, 500);
    document.addEventListener('mousemove', (e) => {
        const pct = 1 - (e.clientY / window.innerHeight);
        elements.thr.innerText = Math.round(pct * 100);
    });
});