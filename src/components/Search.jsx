import { useWeather } from '../context/WeatherContext';
import { Select } from '@chakra-ui/react'

const Search = () => {

    console.log('Search is rendering')

    const {cities, setCity} = useWeather();
    



    return (
        <>
        <label htmlFor='cities'>Bir şehir seçiniz</label>
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