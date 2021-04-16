const app = document.getElementById('root');
var search = document.querySelector('.search')
var button = document.querySelector('#submit')
var body = document.querySelector('body');

var d = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
if (d.getHours > 19) {
    body.style.backgroundImage = 'linear-gradient(to right, #bdc3c7, #2c3e50)'
}

button.addEventListener("click", function(){
    // console.log('hi');
    
     if (search.value!="") {
        var request = new XMLHttpRequest;
        request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + search.value + '&appid=a0d210a51321ec28478ec57821fdafd0', true);
        request.onload = function () {
            var data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {

                // console.log(data);
                // console.log(search.value)
                // document.getElementById('display').innerHTML = `${data['main']['temp']-273.15}`+' C';
                /*if(data['weather'][0]['main']=='Haze'){
                    const haze = document.createElement('img');
                    haze.src = 'images/Haze1.jpg';
                    app.appendChild(haze);    
                }
                else if(data['weather'][0]['main']=='Clear'){
                    const clear = document.createElement('img');
                    clear.src = 'images/clear.jpg';
                    app.appendChild(clear);
                }
                else if(data['weather'][0]['main']=='Clouds'){
                    if(data['weather'][0]['description']=='broken clouds'){
                        const broken = document.createElement('img');
                        broken.src = 'images/brokenClouds.png';
                        app.appendChild(broken);
                    }else{
                        const cloud = document.createElement('img');
                        cloud.src = 'images/cloudSun1.jpg';
                        app.appendChild(cloud);
                    }  
                }
                else if(data['weather'][0]['main']=='Smoke'){
                    const smoke = document.createElement('img');
                    smoke.src = 'images/smoke.png';
                    app.appendChild(smoke);
                }*/
                // const cloud = document.createElement('img');
                // cloud.src = 'images/cloudSun1.jpg';
                // app.appendChild(cloud);
                // const display = document.createElement('div');
                const temp = document.querySelector('.temp');
                // display.setAttribute('class','display');
                temp.innerHTML = `${(data['main']['temp'] - 273.15).toPrecision(2)} &#8451`;
                // app.appendChild(display);
                console.log(temp.innerHTML);

                // const text = document.createElement('div');
                // text.setAttribute('class','txt');
                const text = document.querySelector('.weather');
                text.innerHTML = data['weather'][0]['description'];
                // app.appendChild(text);
                const city = document.querySelector('.city');
                city.innerHTML = data['name'];

                const date = document.querySelector('.date');
                date.innerHTML = d.getDate() + " " + months[d.getMonth()] + ", " + d.getFullYear();

            } else {
                const errorMessage = document.createElement('marquee');
                // document.querySelector('.class').innerHTML = "Invalid input!!"
                // errorMessage.textContent = "Not working!!";
                // app.appendChild(errorMessage);
                alert("Invalid Input!!");
            }
        }


    }
    request.send();
})


// function find() {

// }
// find();
