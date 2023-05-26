//light starts here
// This is the only call required to initialise TouchFree tooling, getting a default cursor
TouchFree.Init();
fetch('http://192.168.1.1/modulation?mod=200.00&duty=0', {
    method: 'GET'
}).then(() => {})
    .catch(() => console.log('GET fehlgeschlagen... :('));


const lightBulbIp = '192.168.178.222';
const ultraHapticIp = '192.168.1.1';

function changeImage() {
    var image = document.getElementById('myImage');
    var lightStatus = document.getElementById('light-status');
    console.log(image.src, "source");
    if (image.src.includes("filled")) {
        image.src = "../../NUI-SMARTHOME/assets/icons/ic_fluent_lightbulb_24_regular.png";
        lightStatus.textContent = "Off";
        fetch(`http://${lightBulbIp}/color/0?turn=off`, {
            method: 'GET'
        }).then(() => {
            fetch(`http://${ultraHapticIp}/modulation?mod=200.00&duty=0`, {
                method: 'GET'
            }).then(() => {}).catch(() => console.log('GET fehlgeschlagen... :('));
        }).catch(() => console.log('GET fehlgeschlagen... :('));
    } else {
        image.src = "../../NUI-SMARTHOME/assets/icons/ic_fluent_lightbulb_24_filled.png";
        lightStatus.textContent = "On";
        fetch(`http://${lightBulbIp}/color/0?turn=on`, {
            method: 'GET'
        }).then(() => {
            fetch(`http://${ultraHapticIp}/modulation?mod=200.00&duty=50`, {
                method: 'GET'
            }).then(() => {}).catch(() => console.log('GET fehlgeschlagen... :('));
        }).catch(() => console.log('GET fehlgeschlagen... :('));
    }
}




document.addEventListener("DOMContentLoaded", function() {

   //Clock starts here
    function updateClocks() {
        var clocks = document.getElementsByClassName('clock');
        var now = new Date();

        for (var i = 0; i < clocks.length; i++) {
            var clock = clocks[i];
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();

            // Format the time
            var time = hours.toString().padStart(2, '0') + ':' +
                minutes.toString().padStart(2, '0')
                /*seconds.toString().padStart(2, '0');*/

            clock.textContent = time;
        }
    }
    updateClocks();
    setInterval(updateClocks, 1000);





    //Date starts here
    function updateDate() {
        var dateElement = document.getElementById('date');
        var now = new Date();


        var options = {
            month: 'long',     // Full month name (e.g., May)
            day: 'numeric',    // Day of the month with no leading zeros (e.g., 21)
            weekday: 'long'    // Full weekday name (e.g., Sunday)
        };

        // Format the date
        var formattedDate = now.toLocaleDateString('en-US', options);

        // Update the date element
        dateElement.textContent = formattedDate;
    }
    updateDate();




    //Weather starts here
    function updateWeather() {
        var weatherDegreeElement = document.getElementById('weather-degree');
        var weatherIconElement = document.getElementById('weather-icon');

        const apiKey = 'add77805ba0940e5bba151536232105';
        const location = 'Ingolstadt';

        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
            .then(response => response.json())
            .then(data => {

                // Extract the weather degree and weather condition values from the fetched data
                var weatherDegree = data.current.temp_c;
                var weatherCondition = data.current.condition.text;

                weatherDegreeElement.textContent = weatherDegree + '°C';

                var weatherIconClass;
                if (weatherCondition.includes('rain')) {
                    weatherIconClass = 'rain-icon';
                } else if (weatherCondition.includes('Sunny')) {
                    weatherIconClass = 'sun-icon';
                } else if (weatherCondition.includes('cloudy') || weatherCondition.includes('Cloudy')) {
                    weatherIconClass = 'clouds-icon';
                }else if (weatherCondition.includes('Clear')) {
                    weatherIconClass = 'night-icon';
                }

                weatherIconElement.className = 'weather-icon ' + weatherIconClass;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }
    updateWeather();

    //slider starts here
    $(function() {
        $("#slider-vertical").slider({
            orientation: "vertical",
            range: "min",
            min: 0,
            max: 100,
            value: 50,
            slide: function(event, ui) {
                var percentage = ui.value + "%";
                $("#percentage").text(percentage);
            }
        });
    });

});
