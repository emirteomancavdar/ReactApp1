import React from 'react';
import GetFinal from './Components/GetFinal';
import axios from 'axios';
import { useState } from 'react';
import { Button, FormControl, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DefaultRio from './Components/registers_rio.json';
import DefaultRmt from './Components/registers_rmt.json';

var deviceData = [] // Device data hold the information of the device ip or address and the type(rmt or rio).
var DefaultVariables = [] //According to the type of device, DefaultVariables will hold the matching json file(rmt or rio).

export default function App() {

  const [pingSuccess, setPingSuccess] = useState(null) //For major button management. If it is not true user can enter Ip address to 
  //ping and try again. If it is true user can no longer enter Ip address or send ping but can decide to write or read.
  const [send, setSend] = useState(null)//For minor button management. The writing on the button changes as the state of 'send' changes
  const [serverIp, setServerIp] = useState('') //Stores the Ip address entered by user.


  const theme = createTheme({ //To make button gray
    palette: {
      griton: {
        main: '#bbbbbb'
      }
    }
  })

  async function pingSender() {
    setSend(true) //All setSend functions under pingSender function exist to determine the writing onthe button. Not important.
    try {
      const response = await axios.get('http://' + serverIp + ':8080/getInfo'); //Tries to read getInfo part of the entered Ip
//and stores its response
      deviceData = response.data  // The code is interested in the data part of the response. So it stores it in deviceData
      //this data includes ip addresses of the devices and the types of devices like rmt or rio.
      setSend(false)
      console.log(deviceData)
      if (response.status === 200) { //200 is the code for successful operation. It means we can reach and read the server.
        console.log('Backend server is reachable.');
        setPingSuccess(true)
        jsonTypeDetector(); //When the operation is successful and the data is taken from the server, this function detects the 
        //type of the necessary json file (rmt or rio).

      } else { //If operation was not successful, by setting pingSuccess to false the code allows users to enter a different Ip or
       // try again.
        console.error('Failed to ping the backend server.');
        setPingSuccess(false)
      }
    } catch (error) { //Writes the error responses to the console. I do not if I can do this part in the else{} part above.
      setSend(false)
      setPingSuccess(false)
      console.error('An error occurred while sending the ping:' + error);
    }
  }

  const handleInput = (event) => { //When user enters an Ip address to the TextField, this part starts working and stores it in
    //serverIp simultaneously.
    setServerIp(event.target.value)
  }

  const jsonTypeDetector = () => { //As mentioned above (in pingSender section) device.data includes addresses and the types of 
    //the devices. Type of device is defined at the 'Device' tag of the response. Code checks 'Device' tag and sets DefaultVariables
    //according to the readed value. Since server sends devices of the same type, this part only checks for the first element. 
    if (deviceData[1].Device === 'rio') {
      DefaultVariables = DefaultRio
    }
    else if (deviceData[1].Device === 'rmt') {
      DefaultVariables = DefaultRmt
    }
  }

  return (

    <div className="App">
      {pingSuccess !== true && ( //If server was not reached successfully, this textfield appears to take an Ip address from the user
        <FormControl fullWidth> {/*Whenever an input is made to this textfield, it activates handleInput and saves the written thing*/}
          <TextField
            label="Server IP"
            defaultValue=''
            value={serverIp}
            onChange={handleInput}
            variant="outlined"
            margin="normal"
            disabled ={send}
            sx={{ mx: 'auto', width: '25ch' }} />
        </FormControl>
      )}
      {pingSuccess !== true && ( //Same as above, This button sends the Ip address, which was written in the textfield above, to the
        <ThemeProvider theme={theme}>{/*pingSender function to see if server is reachable by that Ip address*/}
          <FormControl fullWidth>
            <Button onClick={pingSender} disabled={send} color='griton' variant='contained' sx={{ mx: 'auto', my: '3ch', width: '30ch', height: '6ch', color: '#ff3333', fontSize: '2ch' }}>
              {send === null?
              'Send ping':send===false?
                'Failed. Send ping again' : 'Sending'
              }</Button>
          </FormControl>
        </ThemeProvider>
      )}

      {pingSuccess && ( //After reaching the server successfully, this part activates the part where we can do writing and reading
      //We are sending the Ip we used to obtain getInfo to use while writing and reading. Also we are sending the appropriate json
      //file and the deviceData. deviceData will be used to select the device(s) we want to operate on.
        <GetFinal ip={serverIp} info={deviceData} json={DefaultVariables}></GetFinal>)
      }
    </div>
  );
}
