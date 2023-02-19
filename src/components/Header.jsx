import {useTheme} from '../context/ThemeContext'
import { Text, Stack, Switch } from '@chakra-ui/react'


function Header() {
    const {theme, setTheme} = useTheme();

  return (
    <div>
        <Text  textAlign={'right'}>{theme} mode</Text>
        <Stack mb={2}
        direction='column'
        align={'flex-end'}        
        >
          <Switch
          aria-label='dark'
          defaultChecked={theme === 'light' ? true : false}
          colorScheme='teal' 
          size='lg' 
          onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
        </Stack>
    </div>
  )
}

export default Header