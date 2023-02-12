import { createContext, useContext } from "react";
import cities from '../data/cities.json';



const WeatherContext = createContext();

export const WeatherProvider = ({children}) => {
    const values = {
        cities
    }

    return (
        <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>

    );
}



export const useWeather = () => useContext(WeatherContext);