import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import PopupErrorExample from './Error';
import DefaultVariables from './registers.json'

function DropdownButton(props) {
    const [typ, setTyp] = useState('');
    const [inputV, setInputV] = useState('');
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');
    const [number, setNumber] = useState('');
    const[message,setMessage]= useState('')


    const handleType = (event) => {
        setTyp(event.target.value)
        setNumber(DefaultVariables.find(obj => obj.Tag === event.target.value).Index)
    };

    const handleInput = (event) => {
        setInputV(event.target.value);
    };
    const handleInput1 = (event) => {
        setInput1(event.target.value);
    };
    const handleInput2 = (event) => {
        setInput2(event.target.value);
    };
    const handleInput3 = (event) => {
        setInput3(event.target.value);
    };
    const handleInput4 = (event) => {
        setInput4(event.target.value);
    };
    const handleInput5 = (event) => {
        setInput5(event.target.value);
    };
    const handleInput6 = (event) => {
        setInput6(event.target.value);
    };

    const [sending, SetSending] = useState(false);

    const [isPopUpShown, setIsPopUpShown] = useState(false);

    const sendRequestToServer = (inp, number,ip) => {
        if (typ !== '') {
            // Replace 'your_backend_url' with your actual backend URL
            SetSending(true)
            axios.post('http://'+ip+':8080/writeRegisters', [{ "Address": number, "Value": inp }])
                .then(response => {
                    // Process the response data
                    console.log('Task added successfully.', response.data);
                    SetSending(false);
                })
                .catch(error => {
                    // Handle errors
                    console.error('An error occured.', Error);
                    SetSending(false);
                });
        }
    };



    const ErrorChecker = () => {

        if (typ === 'Modbus RTU Device Address') {
            const inputVInt = parseInt(inputV)
            if (!/^\d+$/.test(inputV) || inputVInt > 65535) {
                setIsPopUpShown(true)
            }
            else {
                sendRequestToServer(inputVInt, number, props.ip)
            }
        }
        else if (typ === 'Save Mac Address') {
            const inputVInt = parseInt(inputV)
            if (!/^\d+$/.test(inputV) || inputVInt > 65535) {
                setIsPopUpShown(true)
            }
            else {
                sendRequestToServer(inputVInt, number, props.ip)
            }
        }
        else if (typ === 'IP Address') {
            const ip1 = parseInt(input1)
            const ip2 = parseInt(input2)
            const ip3 = parseInt(input3)
            const ip4 = parseInt(input4)
            if ((255 < ip1) || (255 < ip2) || (255 < ip3) || (255 < ip4) || (!/^\d+$/.test(input1)) || (!/^\d+$/.test(input2)) || (!/^\d+$/.test(input3)) || (!/^\d+$/.test(input4))) {
                setMessage('Please ony enter integers between 0 and 255.')
                setIsPopUpShown(true)
            }
            else {
                sendRequestToServer(input1 + '.' + input2 + '.' + input3 + '.' + input4, number, props.ip)
            }
        }
        else if (typ === 'Subnet Mask') {
            const ip1 = parseInt(input1)
            const ip2 = parseInt(input2)
            const ip3 = parseInt(input3)
            const ip4 = parseInt(input4)
            if ((255 < ip1) || (255 < ip2) || (255 < ip3) || (255 < ip4) || (!/^\d+$/.test(input1)) || (!/^\d+$/.test(input2)) || (!/^\d+$/.test(input3)) || (!/^\d+$/.test(input4))) {
                setMessage('Please ony enter integers between 0 and 255.')
                setIsPopUpShown(true)
            }
            else {
                sendRequestToServer(input1 + '.' + input2 + '.' + input3 + '.' + input4, number, props.ip)
            }
        }
        else if (typ === 'Default Gateway') {
            const ip1 = parseInt(input1)
            const ip2 = parseInt(input2)
            const ip3 = parseInt(input3)
            const ip4 = parseInt(input4)
            if ((255 < ip1) || (255 < ip2) || (255 < ip3) || (255 < ip4) || (!/^\d+$/.test(input1)) || (!/^\d+$/.test(input2)) || (!/^\d+$/.test(input3)) || (!/^\d+$/.test(input4))) {
                setMessage('Please ony enter integers between 0 and 255.')
                setIsPopUpShown(true)
            }
            else {
                sendRequestToServer(input1 + '.' + input2 + '.' + input3 + '.' + input4, number, props.ip)
            }
        }
        else if (typ === 'Wireless IP Address') {
            const ip1 = parseInt(input1)
            const ip2 = parseInt(input2)
            const ip3 = parseInt(input3)
            const ip4 = parseInt(input4)
            if ((255 < ip1) || (255 < ip2) || (255 < ip3) || (255 < ip4) || (!/^\d+$/.test(input1)) || (!/^\d+$/.test(input2)) || (!/^\d+$/.test(input3)) || (!/^\d+$/.test(input4))) {
                setMessage('Please ony enter integers between 0 and 255.')
                setIsPopUpShown(true)
            }
            else {
                sendRequestToServer(input1 + '.' + input2 + '.' + input3 + '.' + input4, number, props.ip)
            }
        }
        else if (typ === 'Wireless Subnet Mask') {
            const ip1 = parseInt(input1)
            const ip2 = parseInt(input2)
            const ip3 = parseInt(input3)
            const ip4 = parseInt(input4)
            if ((255 < ip1) || (255 < ip2) || (255 < ip3) || (255 < ip4) || (!/^\d+$/.test(input1)) || (!/^\d+$/.test(input2)) || (!/^\d+$/.test(input3)) || (!/^\d+$/.test(input4))) {
                setMessage('Please ony enter integers between 0 and 255.')
                setIsPopUpShown(true)
            }
            else {
                sendRequestToServer(input1 + '.' + input2 + '.' + input3 + '.' + input4,number ,props.ip)
            }
        }
        else if (typ === 'Wireless Default Gateway') {
            const ip1 = parseInt(input1)
            const ip2 = parseInt(input2)
            const ip3 = parseInt(input3)
            const ip4 = parseInt(input4)
            if ((255 < ip1) || (255 < ip2) || (255 < ip3) || (255 < ip4) || (!/^\d+$/.test(input1)) || (!/^\d+$/.test(input2)) || (!/^\d+$/.test(input3)) || (!/^\d+$/.test(input4))) {
                setMessage('Please ony enter integers between 0 and 255.')
                setIsPopUpShown(true)
            }
            else {
                sendRequestToServer(input1 + '.' + input2 + '.' + input3 + '.' + input4, number, props.ip)
            }
        }
        else if (typ === 'BLE Complete Local Name') {
            if (inputV.length > 18) {
                setMessage('Maximum input lenght is 18.')
                setIsPopUpShown(true)
            }
            else {
                sendRequestToServer(inputV, number, props.ip)
            }
        }
        else if (typ === 'BLE Security Key') {
            if (inputV.length > 8) {
                setMessage('Maximum input lenght is 8.')
                setIsPopUpShown(true)
            }
            else {
                sendRequestToServer(inputV, number, props.ip)
            }
        }
        else if (typ === 'Wifi Ssid') {
            if (inputV.length > 32) {
                setMessage('Maximum input lenght is 32.')
                setIsPopUpShown(true)
            }
            else {
                sendRequestToServer(inputV, number, props.ip)
            }
        }
        else if (typ === 'Wifi Password') {
            if (inputV.length > 64) {
                setMessage('Maximum input lenght is 64.')
                setIsPopUpShown(true)
            }
            else {
                sendRequestToServer(inputV, number, props.ip)
            }
        }
        else if (typ === 'MAC Address') {
            const ip1 = parseInt(input1)
            const ip2 = parseInt(input2)
            const ip3 = parseInt(input3)
            const ip4 = parseInt(input4)
            const ip5 = parseInt(input5)
            const ip6 = parseInt(input6)
            if ((255 < ip1) || (255 < ip2) || (255 < ip3) || (255 < ip4) || (255 < ip5) || (255 < ip6) || (!/^\d+$/.test(input1)) || (!/^\d+$/.test(input2)) || (!/^\d+$/.test(input3)) || (!/^\d+$/.test(input4)) || (!/^\d+$/.test(input5)) || (!/^\d+$/.test(input6))) {
                setMessage('Please ony enter integers between 0 and 255.')
                setIsPopUpShown(true)
            }
            else {
                sendRequestToServer(input1 + '-' + input2 + '-' + input3 + '-' + input4 + '-' + input5 + '-' + input6, number, props.ip)
            }
        }
        else if (inputV === '') {
            setMessage('Please select something.')
            setIsPopUpShown(true)
        }
        else {
            sendRequestToServer(inputV, number, props.ip)
        }


    }

    return (
        <div style={{float: 'left' ,width:'45%'}}>
            <FormControl fullWidth sx={{my:'1ch'}}>
                <InputLabel id="demo-simple-select-label">Choose parameter to write.</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={typ}
                    onChange={handleType}
                    sx={{ m: 1 }}

                >
                    <MenuItem value={'Modbus RTU Device Address'}>Modbus RTU Device Address</MenuItem>
                    <MenuItem value={'Modbus RTU Baudrate'}>Modbus RTU Baudrate</MenuItem>
                    <MenuItem value={'Modbus RTU Parity'}>Modbus RTU Parity</MenuItem>
                    <MenuItem value={'Modbus RTU Stop Bits'}>Modbus RTU Stop Bits</MenuItem>
                    <MenuItem value={'IP Address'}>IP Address</MenuItem>
                    <MenuItem value={'Subnet Mask'}>Subnet Mask</MenuItem>
                    <MenuItem value={'Default Gateway'}>Default Gateway</MenuItem>
                    <MenuItem value={'Wireless Communication Type'}>Wireless Communication Type</MenuItem>
                    <MenuItem value={'BLE Complete Local Name'}> BLE Complete Local Name</MenuItem>
                    <MenuItem value={'BLE Security Key'}> BLE Security Key</MenuItem>
                    <MenuItem value={'Wifi Mode'}> Wifi Mode</MenuItem>
                    <MenuItem value={'Wifi Ssid'}> Wifi Ssid</MenuItem>
                    <MenuItem value={'Wifi Password'}> Wifi Password</MenuItem>
                    <MenuItem value={'Wireless IP Configuration'}> Wireless IP Configuration</MenuItem>
                    <MenuItem value={'Wireless IP Address'}> Wireless IP Address</MenuItem>
                    <MenuItem value={'Wireless Subnet Mask'}> Wireless Subnet Mask</MenuItem>
                    <MenuItem value={'Wireless Default Gateway'}> Wireless Default Gateway</MenuItem>
                    <MenuItem value={'Save Settings'}> Save Settings</MenuItem>
                    <MenuItem value={'Return to Factory Settings'}> Return to Factory Settings</MenuItem>
                    <MenuItem value={'Disable All Outputs'}> Disable All Outputs</MenuItem>
                    <MenuItem value={'Re-Enumerate Cards'}> Re-Enumerate Cards</MenuItem>
                    <MenuItem value={'Power On Flag'}> Power On Flag</MenuItem>
                    <MenuItem value={'MAC Address'}> MAC Address</MenuItem>
                    <MenuItem value={'Save Mac Address'}>  {DefaultVariables.find(obj =>obj.Index===170).Tag}</MenuItem>
                </Select>
            </FormControl>
            {typ === 'Modbus RTU Device Address' && (
                <FormControl fullWidth>
                    <TextField
                        label="uint16_t Input"
                        defaultValue=''
                        onChange={handleInput}
                        variant="outlined"
                        margin="normal"
                        sx={{ width: '25ch', m: 1 }}
                    />
                </FormControl>
            )}
            {typ === 'Save Mac Address' && (
                <FormControl fullWidth>
                <TextField
                    label="uint16_t Input"
                    defaultValue=''
                    onChange={handleInput}
                    variant="outlined"
                    margin="normal"
                    sx={{ width: '25ch', m: 1 }}
                />
            </FormControl>
            )}

            {typ === 'IP Address' && (
                <div>
                    <TextField
                        label="ip Input 1"
                        defaultValue=''
                        onChange={handleInput1}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 2"
                        defaultValue=''
                        onChange={handleInput2}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 3"
                        defaultValue=''
                        onChange={handleInput3}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 4"
                        defaultValue=''
                        onChange={handleInput4}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                </div>
            )}
            {typ === 'Subnet Mask' && (
                <div>
                    <TextField
                        label="ip Input 1"
                        defaultValue=''
                        onChange={handleInput1}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 2"
                        defaultValue=''
                        onChange={handleInput2}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 3"
                        defaultValue=''
                        onChange={handleInput3}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 4"
                        defaultValue=''
                        onChange={handleInput4}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                </div>
            )}
            {typ === 'Default Gateway' && (
                <div>
                    <TextField
                        label="ip Input 1"
                        defaultValue=''
                        onChange={handleInput1}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 2"
                        defaultValue=''
                        onChange={handleInput2}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 3"
                        defaultValue=''
                        onChange={handleInput3}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 4"
                        defaultValue=''
                        onChange={handleInput4}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                </div>
            )}
            {typ === 'Wireless IP Address' && (
                <div>
                    <TextField
                        label="ip Input 1"
                        defaultValue=''
                        onChange={handleInput1}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 2"
                        defaultValue=''
                        onChange={handleInput2}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 3"
                        defaultValue=''
                        onChange={handleInput3}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 4"
                        defaultValue=''
                        onChange={handleInput4}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                </div>
            )}
            {typ === 'Wireless Subnet Mask' && (
                <div>
                    <TextField
                        label="ip Input 1"
                        defaultValue=''
                        onChange={handleInput1}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 2"
                        defaultValue=''
                        onChange={handleInput2}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 3"
                        defaultValue=''
                        onChange={handleInput3}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 4"
                        defaultValue=''
                        onChange={handleInput4}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                </div>
            )}
            {typ === 'Wireless Default Gateway' && (
                <div>
                    <TextField
                        label="ip Input 1"
                        defaultValue=''
                        onChange={handleInput1}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 2"
                        defaultValue=''
                        onChange={handleInput2}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 3"
                        defaultValue=''
                        onChange={handleInput3}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="ip Input 4"
                        defaultValue=''
                        onChange={handleInput4}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                </div>
            )}

            {typ === 'BLE Complete Local Name' && (
                <FormControl fullWidth>
                    <TextField
                        label="string Input"
                        defaultValue=''
                        onChange={handleInput}
                        variant="outlined"
                        margin="normal"
                        sx={{ width: '25ch', m: 1 }}
                    />
                </FormControl>
            )}
            {typ === 'BLE Security Key' && (
                <FormControl fullWidth>
                    <TextField
                        label="string Input"
                        defaultValue=''
                        onChange={handleInput}
                        variant="outlined"
                        margin="normal"
                        sx={{ width: '25ch', m: 1 }}
                    />
                </FormControl>
            )}
            {typ === 'Wifi Ssid' && (
                <FormControl fullWidth>
                    <TextField
                        label="string Input"
                        defaultValue=''
                        onChange={handleInput}
                        variant="outlined"
                        margin="normal"
                        sx={{ width: '25ch', m: 1 }}
                    />
                </FormControl>
            )}
            {typ === 'Wifi Password' && (
                <FormControl fullWidth>
                    <TextField
                        label="string Input"
                        defaultValue=''
                        onChange={handleInput}
                        variant="outlined"
                        margin="normal"
                        sx={{ width: '25ch', m: 1 }}
                    />
                </FormControl>
            )}



            {typ === 'MAC Address' && (
                <div>
                    <TextField
                        label="MAC Input 1"
                        defaultValue=''
                        onChange={handleInput1}
                        variant="outlined"
                        margin="normal"
                        //   multiline
                        //   rows={4}
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="MAC Input 2"
                        defaultValue=''
                        onChange={handleInput2}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="MAC Input 3"
                        defaultValue=''
                        onChange={handleInput3}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="MAC Input 4"
                        defaultValue=''
                        onChange={handleInput4}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="MAC Input 5"
                        defaultValue=''
                        onChange={handleInput5}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                    <TextField
                        label="MAC Input 6"
                        defaultValue=''
                        onChange={handleInput6}
                        variant="outlined"
                        margin="normal"
                        sx={{ m: 1, width: '10ch' }}
                    />
                </div>
            )}
            {typ === 'Modbus RTU Baudrate' && (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose parameter to write.</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue=''
                        //   value={inputV}
                        onChange={handleInput}
                        sx={{ m: 1, width: '25ch' }}
                    >
                        <MenuItem value={0}>1200</MenuItem>
                        <MenuItem value={1}>2400</MenuItem>
                        <MenuItem value={2}>4800</MenuItem>
                        <MenuItem value={3}>19600</MenuItem>
                        <MenuItem value={4}>14400</MenuItem>
                        <MenuItem value={5}>19200</MenuItem>
                        <MenuItem value={6}>38400</MenuItem>
                        <MenuItem value={7}>57600</MenuItem>
                        <MenuItem value={8}>115200</MenuItem>
                    </Select>
                </FormControl>
            )}
            {typ === 'Modbus RTU Parity' && (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose parameter to write.</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue=''
                        onChange={handleInput}
                        sx={{ m: 1, width: '25ch' }}
                    >
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>Odd</MenuItem>
                        <MenuItem value={2}>Even</MenuItem>
                    </Select>
                </FormControl>
            )}
            {typ === 'Modbus RTU Stop Bits' && (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose parameter to write.</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue=''
                        onChange={handleInput}
                        sx={{ m: 1, width: '25ch' }}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>

                    </Select>
                </FormControl>
            )}
            {typ === 'Wireless Communication Type' && (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose parameter to write.</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue=''
                        onChange={handleInput}
                        sx={{ m: 1, width: '25ch' }}
                    >
                        <MenuItem value={0}>Off</MenuItem>
                        <MenuItem value={1}>Bluetooth</MenuItem>
                        <MenuItem value={2}>Wifi</MenuItem>

                    </Select>
                </FormControl>
            )}
            {typ === 'Wifi Mode' && (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose parameter to write.</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue=''
                        onChange={handleInput}
                        sx={{ m: 1, width: '25ch' }}
                    >
                        <MenuItem value={0}>Access Point Mode</MenuItem>
                        <MenuItem value={1}>Stationary Mode</MenuItem>

                    </Select>
                </FormControl>
            )}
            {typ === 'Wireless IP Configuration' && (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose parameter to write.</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue=''
                        onChange={handleInput}
                        sx={{ m: 1, width: '25ch' }}
                    >
                        <MenuItem value={0}>Manual</MenuItem>
                        <MenuItem value={1}>Dhcp</MenuItem>

                    </Select>
                </FormControl>
            )}
            {typ === 'Save Settings' && (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose parameter to write.</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue=''
                        onChange={handleInput}
                        sx={{ m: 1, width: '25ch' }}
                    >
                        <MenuItem value={0}>Do not Save</MenuItem>
                        <MenuItem value={1}>Save</MenuItem>

                    </Select>
                </FormControl>
            )}
            {typ === 'Return to Factory Settings' && (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose parameter to write.</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue=''
                        onChange={handleInput}
                        sx={{ m: 1, width: '25ch' }}
                    >
                        <MenuItem value={0}>Do not Reset</MenuItem>
                        <MenuItem value={1}>Reset</MenuItem>

                    </Select>
                </FormControl>
            )}
            {typ === 'Disable All Outputs' && (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose parameter to write.</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue=''
                        onChange={handleInput}
                        sx={{ m: 1, width: '25ch' }}
                    >
                        <MenuItem value={0}>Disabled</MenuItem>
                        <MenuItem value={1}>Enabled</MenuItem>

                    </Select>
                </FormControl>
            )}
            {typ === 'Re-Enumerate Cards' && (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose parameter to write.</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue=''
                        onChange={handleInput}
                        sx={{ m: 1, width: '25ch' }}
                    >
                        <MenuItem value={0}>Do not Re-Enumerate</MenuItem>
                        <MenuItem value={1}>Re-enumerate</MenuItem>

                    </Select>
                </FormControl>
            )}
            {typ === 'Power On Flag' && (
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose parameter to write.</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue=''
                        onChange={handleInput}
                        sx={{ m: 1, width: '25ch' }}
                    >
                        <MenuItem value={0}>Cleared</MenuItem>
                        <MenuItem value={1}>Experienced Power On</MenuItem>

                    </Select>
                </FormControl>
            )}

            <Button variant="contained" onClick={ErrorChecker} disabled={sending} sx={{ mx: 1 }}>
                {sending ? 'Sending' : 'Send Request'}

            </Button>
            <PopupErrorExample message={message} setIsPopUpShown={setIsPopUpShown} isPopUpShown={isPopUpShown} ></PopupErrorExample>
        </div>
    );
}

export default DropdownButton;
