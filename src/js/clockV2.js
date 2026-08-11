/*

Clock Widget V2 By 404City. Visit https://404city.neocities.org/ For More!
Copyright 404City All Rights Reserved

*/
(function() {
    const scriptTag = document.currentScript;
    scriptTag.insertAdjacentHTML('beforebegin', "<!--Clock Widget V2 By 404City. Visit https://404city.neocities.org/ for more!--><!--Copyright 404City All Rights Reserved-->");
    scriptTag.insertAdjacentHTML('afterend', `
        <div id="clock">
            <div id="clockDisplay">
                <div id="clockHours" class="clockDigit">##</div>
                <span class="clockColon">:</span>
                <div id="clockMinutes" class="clockDigit">##</div>
                <span class="clockColon">:</span>
                <div id="clockSeconds" class="clockDigit">##</div>
                <div id="clockAMPM" class="clockDigit">##</div>
            </div>
            <div id="dateDisplay">Loading...</div>
        </div>
        <style>
            :where(#clock, #clockDisplay) {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            :where(#clock) {
                height: 100px;
                width: 300px;
                flex-direction: column;
                border: 1px solid black;
                user-select: none;
                font-family: Arial, Helvetica, sans-serif;
                *, & {box-sizing: border-box;}
            }
            :where(#clockDisplay) {font-size: 3rem;}
            :where(#clockAMPM) {margin-left: 0.5rem}
            :where(#clock:not([data-seconds="true"]) #clockSeconds,
            #clock:not([data-seconds="true"]) .clockColon:last-of-type,
            #clock:not([data-format="12-hour"]) #clockAMPM) {display: none !important;}
        </style>
        <!--End Of The Clock Widget-->
    `);
    var clock = document.getElementById("clock");
    var dateDisplay = document.getElementById("dateDisplay");
    var clockHours = document.getElementById("clockHours");
    var clockMinutes = document.getElementById("clockMinutes");
    var clockSeconds = document.getElementById("clockSeconds");
    var clockAMPM = document.getElementById("clockAMPM");
    var dayFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var monthFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    function addZero(i) {if (i < 10) {i = "0" + i;} return i;}
    clock.dataset.seconds = scriptTag.dataset.seconds;
    clock.dataset.format = scriptTag.dataset.format;
    renderClock();
    setInterval(renderClock, 1000);
    function renderClock() {
        var today = new Date();
        var hour = today.getHours();
        if(scriptTag.dataset.format === "12-hour") {
            clockAMPM.innerText = (hour < 12) ? "AM" : "PM";
            if(hour == 0) {hour = 12;}
            if(hour > 12) {hour -= 12;}
        }
        clockHours.innerText = addZero(hour);
        clockMinutes.innerText = addZero(today.getMinutes());
        clockSeconds.innerText = addZero(today.getSeconds());
        var date = today.getDate();
        var month = today.getMonth();
        var year = today.getFullYear();
        var day = today.getDay();
        dateDisplay.innerText = (scriptTag.dataset.date ?? "DD MONTH_FULL YYYY DAY_FULL")
            // @ts-ignore
            .replaceAll("DAY_FULL", dayFull[day])
            .replaceAll("DAY", dayShort[day])
            .replaceAll("MONTH_FULL", monthFull[month])
            .replaceAll("MONTH", monthShort[month])
            .replaceAll("YYYY", year)
            .replaceAll("DD", addZero(date))
            .replaceAll("D", date)
            .replaceAll("MM", addZero(month + 1))
            .replaceAll("M", month + 1);
    }
})();