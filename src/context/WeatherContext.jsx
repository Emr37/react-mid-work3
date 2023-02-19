import { createContext, useContext, useState, useEffect } from "react";
import cities from '../data/cities.json';
import axios from "axios";

const WeatherContext = createContext();

const initialState = [
    { day: 'Monday', icon: '01d', desc: 'az yağmurlu', tempMax: 30, tempMin: 10 },
    { day: 'Monday', icon: '01d', desc: 'az yağmurlu', tempMax: 30, tempMin: 10 },
    { day: 'Monday', icon: '01d', desc: 'az yağmurlu', tempMax: 30, tempMin: 10 },
    { day: 'Monday', icon: '01d', desc: 'az yağmurlu', tempMax: 30, tempMin: 10 },
    { day: 'Monday', icon: '01d', desc: 'az yağmurlu', tempMax: 30, tempMin: 10 }
];

export const WeatherProvider = ({ children }) => {

    const [city, setCity] = useState('İstanbul');
    const [weather, setWeather] = useState([]);
    const [dayArr, setDayArr] = useState([])
    const [dayObj, setDayObj] = useState([])
    const [newObj, setNewObj] = useState(initialState)

    useEffect(() => {
        async function getData() {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=tr&units=metric&APPID=4920da9967817e775947df726511bc41`)

            const timeList = response.data.list;

            const items = await Promise.all(timeList.map(async (i) => {

                let item = {
                    time: i.dt - 10800,
                    timeTxt: i.dt_txt,
                    icon: i.weather[0].icon,
                    desc: i.weather[0].main,
                    temp_min: i.main.temp_min,
                    temp_max: i.main.temp_max
                }
                return item;

            }));

            setWeather(items)
        }
        getData();

    }, [city])

    useEffect(() => {

        // obje dönüşümü yapıldı

        const days = weather.map((e, index) => {
            const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            return {
                id: index,
                day: weekDays[new Date(e.time * 1000).getDay()],
                icon: e.icon,
                desc: e.desc,
                temp_min: e.temp_min,
                temp_max: e.temp_max
            }
        })
        setDayObj(days)

        // objeden günler ayrılarak haftanın günleri array'ine useState ile setlendi.

        let newDays = []
        for (let i = 0; i < days.length - 1; i++) {
            days[i].day !== days[i + 1].day && newDays.push(days[i].day)
        }

        setDayArr(newDays)
        console.log(newDays)


    }, [weather])

    // haftanın günleri array'i map ile dayObj  karşılaştırıldı ve dayObjesinden ilgili günün verileri çekildi  
    // günlük 8 veri geldiği göz önüne alınarak en uygun olan değer ilgili günün verisi olarak kullanıldı
    useEffect(() => {

        const data = dayArr.map((e, index) => {

            let newTemp = [];
            let tempMax = '';
            let tempMin = '';
            for (let i = 0; i < dayObj.length; i++) {
                dayObj[i].day === e && newTemp.push(dayObj[i].temp_min) && newTemp.push(dayObj[i].temp_max);
            }

            // sıralama fonksiyonu 

            function compareNumbers(a, b) {
                return a - b;
            }
            newTemp.sort(compareNumbers);
            console.log(newTemp)

            // en yüksek ve en düşük sıcaklık ataması yapıldı

            tempMax = newTemp.pop();
            tempMin = newTemp.shift();


            let icons = [];
            let icon = '';

            let descs = [];
            let desc = '';

            for (let i = 0; i < dayObj.length - 1; i++) {
                dayObj[i].day === e && icons.push(dayObj[i].icon) && descs.push(dayObj[i].desc);
            }
            if (icons.length >= 5) {
                icon = icons[4];
                desc = descs[4];
            } else {
                icon = icons[0];
                desc = descs[0];

            }

            return {
                id: index,
                day: e,
                icon: icon,
                desc: desc,
                tempMin: Math.round(tempMin),
                tempMax: Math.round(tempMax)
            }

        })
        setNewObj(data)
        console.log(data)
    }, [dayArr])


    const values = {
        cities,
        city,
        setCity,
        newObj
    }

    return (
        <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
    );
}



export const useWeather = () => useContext(WeatherContext);