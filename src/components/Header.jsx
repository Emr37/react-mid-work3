import {useTheme} from '../context/ThemeContext'

function Header() {

    const {theme, setTheme} = useTheme();

  return (
    <div>
        This is Header ({theme})
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Change Theme</button>
    </div>
  )
}

export default Header