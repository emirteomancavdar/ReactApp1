import React from 'react';
import GetFinal from './Components/GetFinal';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DefaultRio from './Components/registers_rio.json';
import DefaultRmt from './Components/registers_rmt.json';

const ipAddress = '192.168.17.82'
var deviceData = []
var DefaultVariables = []

export default function App() {

  const [pingSuccess, setPingSuccess] = useState(false)
  const [send, setSend] = useState(false)


  const theme = createTheme({
    palette: {
      griton: {
        main: '#bbbbbb'
      }
    }
  })

  async function pingSender() {
    setSend(true)
    try {
      const response = await axios.get('http://' + ipAddress + ':8080/getInfo');
      deviceData = response.data
      console.log(deviceData)
      setSend(false)
      if (response.status === 200) {
        console.log('Backend server is reachable.');
        setPingSuccess(true)
        jsonTypeDetector();
      } else {
        console.error('Failed to ping the backend server.');
        setPingSuccess(false)
      }
    } catch (error) {
      setSend(false)
      setPingSuccess(false)
      console.error('An error occurred while sending the ping:' + error);
    }
  }

  useEffect(() => {
    // Send a ping using Axios
    pingSender();
  }, []);

  const jsonTypeDetector = () => {
    if (deviceData.find(obj=>obj.Device === 'rio')) {
      DefaultVariables = DefaultRio
    }
    else if(deviceData.find(obj=>obj.Device === 'rmt')){
      DefaultVariables = DefaultRmt
    }
  }

  return (

    <div className="App">
      <ThemeProvider theme={theme}>
        <FormControl fullWidth >
          {pingSuccess === false && (
            <Button onClick={pingSender} disabled={send} sx={{ margin: 'auto', my: '10ch', width: '25ch', height: '6ch', color: '#ff3333', fontSize: '2ch' }} color='griton' variant='contained' >
              {send ?
                'Sending' : 'Send ping again'
              }
            </Button>
          )
          }
        </FormControl>
      </ThemeProvider>

      {pingSuccess && (
        <GetFinal ip={ipAddress} info={deviceData} json={DefaultVariables}></GetFinal>)
      }
    </div>
  );
}
