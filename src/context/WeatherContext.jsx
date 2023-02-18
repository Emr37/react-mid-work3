import { createContext, useContext, useState, useEffect } from "react";
import cities from '../data/cities.json';
import axios from "axios";


const WeatherContext = createContext();



export const WeatherProvider = ({ children }) => {

    const [city, setCity] = useState('İstanbul');
    const [weather, setWeather] = useState([])

    console.log(weather)
    

    useEffect(() => {
        async function getData() {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=tr&units=metric&APPID=4920da9967817e775947df726511bc41`)

            const timeList = response.data.list;
            
            const items = await Promise.all(timeList.map(async(i) => {

                let item = {
                        time: i.dt - 10800,
                        timeTxt: i.dt_txt,
                        icon: i.weather[0].icon,
                        desc: i.weather[0].main,
                        temp_min : i.main.temp_min,
                        temp_max : i.main.temp_max
                } 
                    return item;
            
                
            }));

            setWeather(items)
           }
        getData();

    }, [city])


    console.log(weather)


    const values = {
        cities,
        city,
        setCity,
        weather      
    }

    return (
        <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
    );
}



export const useWeather = () => useContext(WeatherContext);