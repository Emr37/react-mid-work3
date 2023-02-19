import { useTheme } from '../context/ThemeContext'
import Footer from './Footer'
import Header from './Header'
import Search from './Search'
import Weather from './Weather'
import { Container, Spacer, Divider } from '@chakra-ui/react'

function AppContainer() {
  console.log('AppContainer is rendering')

  const { theme } = useTheme();

  return (
    <div className={`container ${theme}`}>
      <Container>
        <Header />
        <Divider />
        <Spacer />
        <Search />
      </Container>

      <Weather />
      <Divider />
      <Footer />
    </div>
  )
}

export default AppContainer;