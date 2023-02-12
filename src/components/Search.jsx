import cities from '../data/cities.json'

const Search = () => {



    return (
        <>
        <label htmlFor='cities'>Bir şehir seçiniz  </label>
        <select id='cities'>
            {
                cities.map((e) =>{
                    return (
                    <option key={e.id}>
                        {e.name}
                    </option>
                    );
                })
            }
        </select>

            
        </>

    );
}

export default Search;