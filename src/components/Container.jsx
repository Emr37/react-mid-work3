import {useTheme} from '../context/ThemeContext'
import Footer from './Footer'
import Header from './Header'
import Search from './Search'
import Weather from './Weather'

function Container() {
    const {theme} = useTheme();

  return (
    <div className={`container ${theme}`}>

        <Header/>
          <hr/>
        <Search/> 

        <Weather/>
          <hr/>
        <Footer/>

    </div>
  )
}

export default Container;