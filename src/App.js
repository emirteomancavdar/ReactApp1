import React from 'react';
import GetFinal from './Components/GetFinal';
import axios from 'axios';
import { useState } from 'react';
import { Button, FormControl, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DefaultRio from './Components/registers_rio.json';
import DefaultRmt from './Components/registers_rmt.json';

var deviceData = []
var DefaultVariables = []

export default function App() {

  const [pingSuccess, setPingSuccess] = useState(null)
  const [send, setSend] = useState(null)
  const [serverIp, setServerIp] = useState('')


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
      const response = await axios.get('http://' + serverIp + ':8080/getInfo');
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

  const handleInput = (event) => {
    setServerIp(event.target.value)
  }

  const jsonTypeDetector = () => {
    if (deviceData.find(obj => obj.Device === 'rio')) {
      DefaultVariables = DefaultRio
    }
    else if (deviceData.find(obj => obj.Device === 'rmt')) {
      DefaultVariables = DefaultRmt
    }
  }

  return (

    <div className="App">
      {pingSuccess !== true && (
        <FormControl fullWidth>
          <TextField
            label="Server IP"
            defaultValue=''
            value={serverIp}
            onChange={handleInput}
            variant="outlined"
            margin="normal"
            sx={{ mx: 'auto', width: '25ch' }} />
        </FormControl>
      )}
      {pingSuccess !== true && (
        <ThemeProvider theme={theme}>
          <FormControl fullWidth>
            <Button onClick={pingSender} disabled={send} color='griton' variant='contained' sx={{ mx: 'auto', my: '3ch', width: '30ch', height: '6ch', color: '#ff3333', fontSize: '2ch' }}>
              {send === null?
              'Send ping':send===false?
                'Failed. Send ping again' : 'Sending'
              }</Button>
          </FormControl>
        </ThemeProvider>
      )}


     
        {/* {pingSuccess === false && (
           <ThemeProvider theme={theme}>
          <FormControl fullWidth >
            <Button onClick={pingSender} disabled={send} sx={{ mx: 'auto',my:'3ch', width: '30ch', height: '6ch', color: '#ff3333', fontSize: '2ch' }} color='griton' variant='contained' >
              {send ?
                'Sending' : 'Failed. Send ping again'
              }
            </Button>
          </FormControl>
          </ThemeProvider>
        )
        } */}
     

      {pingSuccess && (
        <GetFinal ip={serverIp} info={deviceData} json={DefaultVariables}></GetFinal>)
      }
    </div>
  );
}
