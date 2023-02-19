import { useWeather } from '../context/WeatherContext';
import { Select } from '@chakra-ui/react'

const Search = () => {

    const {cities, setCity} = useWeather();
    
    return (
        <>
        <label htmlFor='cities'>Please select a city</label>
        <Select 
        id='cities'
        defaultValue={'İstanbul'}
        onChange={({target}) => setCity(target.value)}
        >
            {
                cities.map((e) =>{
                    return (
                        <option key={e.id}>{e.name}</option>
                    );
                })
            }
        </Select>
        </>
    );
}

export default Search;