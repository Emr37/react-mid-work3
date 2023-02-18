import { useState, useEffect } from 'react'
import { useWeather } from "../context/WeatherContext"
import { ButtonGroup } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Text, Divider, Heading, Image, Flex } from '@chakra-ui/react'



function Weather() {
  const initialState = [
    { day: 'Monday', icon: '01d', desc: 'az yağmurlu', temp_min: 20, temp_max: 30 },
    { day: 'Monday', icon: '01d', desc: 'az yağmurlu', temp_min: 20, temp_max: 30 },
    { day: 'Monday', icon: '01d', desc: 'az yağmurlu', temp_min: 20, temp_max: 30 },
    { day: 'Monday', icon: '01d', desc: 'az yağmurlu', temp_min: 20, temp_max: 30 },
    { day: 'Monday', icon: '01d', desc: 'az yağmurlu', temp_min: 20, temp_max: 30 }

  ];
  console.log('Weather is rendering')

  const { weather } = useWeather();

  const [dayArr, setDayArr] = useState([])

  const [dayObj, setDayObj] = useState([])

  const [abc, setAbc] = useState([])

  const [newObj, setNewObj] = useState([])


  console.log(dayObj)
  console.log(dayArr)

  console.log(newObj)



  const [icon, setIcon] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [desc, setDesc] = useState('')

  console.log(tempMax)
  console.log(tempMin)
  console.log(icon)
  console.log(desc)

  // useEffect kullanım alanı
  //---------------------------------------------------------------------------------

  useEffect(() => {
    const days = weather.map((e, index) => {
      const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      return {
        id: index,
        day: weekDays[new Date(e.time * 1000).getDay()],
        icon: e.icon,
        desc: e.desc,
        temp_min: e.temp_min,
        temp_max: e.temp_max
      }
    })
    setDayObj(days)


    let newDays = []
    for (let i = 0; i < days.length - 1; i++) {
      days[i].day !== days[i + 1].day && newDays.push(days[i].day)
    }

    setDayArr(newDays)
    console.log(newDays)




    //--------------------------------------------------

    const ea = dayArr.map((e, index) => {

      let newTemp = [];
      for (let i = 0; i < dayObj.length - 1; i++) {
        dayObj[i].day === e && newTemp.push(dayObj[i].temp_min) && newTemp.push(dayObj[i].temp_max);
      }
      newTemp.sort();
      setTempMax(newTemp.pop());
      setTempMin(newTemp.shift());


      let icons = [];
      let descs = [];
      for (let i = 0; i < dayObj.length - 1; i++) {
        dayObj[i].day === e && icons.push(dayObj[i].icon) && descs.push(dayObj[i].desc);
      }
      icons.length >= 5 ? setIcon(icons[4]) : setIcon(icons[0]);
      descs.length >= 5 ? setDesc(descs[4]) : setDesc(descs[0]);

      //setAbc([...abc, { day: e, icon: icon, decs: desc, tempMin: tempMin, tempMax: tempMax }]);

      return {
        id: index,
        day: e,
        icon: icon,
        desc: desc,
        tempMin: tempMin,
        tempMax: tempMax
      }

    })

    setAbc(ea);


    console.log(abc)

  }, [weather])



      
    


  //---------------------------------------------------------------------------------

  return (

    <div className="weather">
      <Flex direction={'row'} justifyContent={'space-evenly'} m={10} >

        {
          newObj.map((e, index) => {
            return (
              <Card key={index} maxW='sm' m={2} >
                <CardHeader size='md'>
                  <Heading size='md'>
                    {e.day}
                  </Heading>
                </CardHeader>
                <CardBody >
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
                      {e.temp_max}
                    </Text>
                    <Text>
                      {e.temp_min}
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