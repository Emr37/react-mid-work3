import { useTheme } from "../context/ThemeContext"
import { useWeather } from "../context/WeatherContext"
import { ButtonGroup } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Text, Divider, Heading, Image, Flex } from '@chakra-ui/react'

function Weather() {

  const { theme } = useTheme();
  const { newObj } = useWeather();


  return (

    <div className="weather">
      <Flex direction={'row'} justifyContent={'space-evenly'} m={10} >

        {
          newObj.map((e, index) => {
            return (
              <Card
                key={index}
                maxW='sm'
                m={2}
                backgroundColor={theme === 'light' ? 'cyan.500' : 'cyan.100'}
                color={theme === 'light' ? 'white' : 'black'}
                width={'max-content'}

              >
                <CardHeader size='md'>
                  <Heading size='md'>
                    {e.day}
                  </Heading>
                </CardHeader>
                <CardBody backgroundColor={index === 0 && 'blackAlpha.300'} >
                  <Image
                    src={`http://openweathermap.org/img/wn/${e.icon}@2x.png`}
                    alt='weather-forecast-image'
                    borderRadius='lg'
                    boxSize={100}
                  />
                </CardBody>
                <Text>{e.desc}</Text>
                <Divider />
                <CardFooter justifyContent={'center'} p={1}>
                  <ButtonGroup spacing='5' justifyContent={'space-between'}>
                    <Text>
                      {e.tempMax}
                    </Text>
                    <Text>
                      {e.tempMin}
                    </Text>
                  </ButtonGroup>
                </CardFooter>
              </Card>

            );
          })
        }
      </Flex>
    </div>
  )
}

export default Weather