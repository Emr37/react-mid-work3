import {useTheme} from '../context/ThemeContext'
import { Button, Spacer, Stack, Switch } from '@chakra-ui/react'


function Header() {
  console.log('Header is rendering')


    const {theme, setTheme} = useTheme();

  return (
    <div>
        This is Header ({theme})
        <Spacer/>
        <Stack 
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