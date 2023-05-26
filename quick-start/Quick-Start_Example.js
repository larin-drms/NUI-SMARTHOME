
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
        if (image.src.match("bulbon")) {
            image.src = "../assets/pic_bulboff.gif";
            fetch(`http://${lightBulbIp}/color/0?turn=off`, {
                method: 'GET'
            }).then(() => {
                fetch(`http://${ultraHapticIp}/modulation?mod=200.00&duty=0`, {
                    method: 'GET'
                }).then(() => {}).catch(() => console.log('GET fehlgeschlagen... :('));
            }).catch(() => console.log('GET fehlgeschlagen... :('));
        } else {
            image.src = "../assets/pic_bulbon.gif";
            fetch(`http://${lightBulbIp}/color/0?turn=on`, {
                method: 'GET'
            }).then(() => {
                fetch(`http://${ultraHapticIp}/modulation?mod=200.00&duty=50`, {
                    method: 'GET'
                }).then(() => {}).catch(() => console.log('GET fehlgeschlagen... :('));
            }).catch(() => console.log('GET fehlgeschlagen... :('));
        }
    }