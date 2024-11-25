import React , {useState,useEffect} from 'react'
export default function Weather ()
{    //setting current date
    const currDate = new Date();
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const month = months[currDate.getMonth()];
      const day = currDate.getDay();
      const year = currDate.getFullYear();
      const formattedDate = `${month} ${day}, ${year}`;
      const [city,setCity] = useState("Mahendranagar");
      const[ weatherData,setWeatherData] = useState(null);

      //fetching weather data
     const API_KEY = "bcda10ba323e88e96cb486015a104d1d";
     const fetchWeatherData = async () => {
        try {
          const response = await fetch(
           `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`
          );
          const data = await response.json();
          console.log(data)
          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
      useEffect(()=>{fetchWeatherData();},[])
      //for input
      const handleInputChange = (event)=>
      {
       console.log(event.target.value);
       setCity(event.target.value);
      }
      //for submit
      const handleSubmit = (event)=>{
        event.preventDefault();
        fetchWeatherData();
      }
      //for icon
      const getWeatherIconUrl = ()=>{
        switch (main) {
            case "Clear":
              return "/sunny.png"; // Path to your sunny weather icon
            case "Rain":
              return "/rainy.png"; // Path to your rainy weather icon
            case "Thunder":
              return "/thunder.png"; // Path to your snowy weather icon
            case "Mist":
              return "/wind.png"; // Path to your haze weather icon
            default:
              return null;
          }
      }
    return(
        <div className='App'>
            <div className='container'>
                {weatherData && (
                    <>
                    <h3 className='container_date'>{formattedDate}</h3>
                <div className='weather_data'>
                 <h1 className='container_city'>{weatherData.name}</h1>

                 <img  className='container_img' 
                 src={getWeatherIconUrl(weatherData.weather[0].main)} 
                 width= "180px" alt='thunder'/>

                 <h2 className='container_degree'> {weatherData.main.temp}</h2>
                 <h2 className='country_per'>{weatherData.weather[0].main}</h2>
                 <form onSubmit={handleSubmit}> 
                    <input type='text' className='input' placeholder='Enter city name' onChange={handleInputChange}/>
                    <button type='submit' >Get</button>
                 </form>
                </div>
                </>
                )}
            </div>
        </div>
    )
}