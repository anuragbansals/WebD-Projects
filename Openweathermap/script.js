const app = document.getElementById('root');
var search = document.getElementById('search')
var button = document.querySelector('.submit')


button.addEventListener("click", function () {
    // console.log('hi');
    var request = new XMLHttpRequest;
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + search.value + '&appid=a0d210a51321ec28478ec57821fdafd0', true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            console.log(data);
            // console.log(search.value);
            document.getElementById('display').innerHTML = data['main']['temp'];
        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = "Not working!!";
            app.appendChild(errorMessage);
        }
    }
    request.send();
})

// function find() {

// }
// find();
