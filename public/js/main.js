const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp = document.getElementById('temp_span')
const temp_status = document.getElementById('temp_status')
const data_hide = document.querySelector('.middle_layer')
const day = document.getElementById('day')
const today_data = document.getElementById('today_data')
const getCurrentDay = () => {
    let currentTime = new Date()
    let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let day = (weekday[currentTime.getDay()])
    return day
}

day.innerHTML = getCurrentDay() 

const getCurrentTime = () => {
    let currentTime = new Date()
    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let day = currentTime.getDate()
    let month = mS[currentTime.getMonth()]
    return `${day} ${month}`
}

today_data.innerHTML = getCurrentTime()

const API = "b21c4b237a9ce5e59e747cfbe70c2e26";

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;
  if (cityVal === "") {
    city_name.innerText = `Plz write the name before search`;
    data_hide.classList.add('data_hide')
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=${API}`;
      const response = await fetch(url);
      const data =await response.json()
      const arrData = [data]
        city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`
        temp.innerText = arrData[0].main.temp
        // data_hide.style.visibility = ""
        const tempMood = arrData[0].weather[0].main
        switch (tempMood) {
            case 'Clear':
                temp_status.innerHTML = `<i class="fas fa-sun" style="color:#eccc68;"></i>`
                break;
                case 'Clouds':
                    temp_status.innerHTML = `<i class="fas fa-cloud" style="color:#f1f2f6;"></i>`
                    break;
                    case 'Rain':
                        temp_status.innerHTML = `<i class="fas fa-cloud-rain" style="color:#a4b0be;"></i>`
                        break;
                        
            default:
                temp_status.innerHTML = `<i class="fas fa-sun" style="color:#eccc68;"></i>`
                break;
        }
        data_hide.classList.remove('data_hide')


    } catch (error) {
        city_name.innerText = `Plz enter valid city `;
        data_hide.classList.add('data_hide')
    }
  }
};

submitBtn.addEventListener("click", getInfo);
