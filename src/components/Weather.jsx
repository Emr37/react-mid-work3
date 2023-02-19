import { useTheme } from "../context/ThemeContext"
import { useWeather } from "../context/WeatherContext"
import { ButtonGroup } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Text, Divider, Heading, Image, Flex } from '@chakra-ui/react'

function Weather() {

  const { theme } = useTheme();
  const { newObj } = useWeather();


  return (

    <div className="weather">
      <Flex 
        align={'center'}
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column", md: "row" }}
       
      m={10} 
      >

        {
          newObj.map((e, index) => {
            return (
              <Card
                key={index}
                m={2}
                align={'center'}

                backgroundColor={theme === 'light' ? 'cyan.500' : 'cyan.100'}
                color={theme === 'light' ? 'white' : 'black'}
                width={{base:'sm', md:'md'}}

              >
                <CardHeader size='md'backgroundColor={index === 0 && 'blackAlpha.300'}>
                  <Heading size='md'>
                    {e.day}
                  </Heading>
                </CardHeader>
                <CardBody>
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