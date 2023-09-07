import React, { useState } from 'react';
import axios from 'axios';
import { FormControl, MenuItem, Button, TextField, InputLabel, Select, List, ListItem, ListItemText, Checkbox, ListItemButton, Box, Tabs, Tab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PopupErrorExample from './Error';

var filteredTasks = []
var serverResponse = []

export default function GetFinal(props) {
    const [fetching, setFetching] = useState(false);
    const [Typ, SetTyp] = useState('All');
    const [fetched, setFetched] = useState(false);
    const indexes = props.json.map(obj => obj.Index);  // Define your array of indexes here
    const [finalData, setFinalData] = useState([])
    const [ipToRead, setIpToRead] = useState(props.info[0]?.DeviceIPorAddress)
    const [message, setMessage] = useState('')

    const handleType = (event) => {
        SetTyp(event.target.value);
        filterTasks(props.json.find(obj => obj.Tag === event.target.value) ?
            props.json.find(obj => obj.Tag === event.target.value).Index : event.target.value);
    };
    const fetchTasks = (Ind, ip, Device) => {
        if (ipToRead === '') {
            setMessage('Please select a device to read.')
            setIsPopUpShown(true)
        }
        else {
            setFetching(true);
            axios.post('http://' + ip + ':8080/readRegisters', [{ "Device_Address": ipToRead, "addresses": Ind }])  // Send the array as a JSON object
                .then(response => {
                    serverResponse = response.data;  // Save the server response
                    console.log(serverResponse)
                    //setTasks(response.data.tasks);
                    setFetching(false);
                    setFetched(true);
                    filterTasks(props.json.find(obj => obj.Tag === Typ) ?
                        props.json.find(obj => obj.Tag === Typ).Index : Typ)
                })
                .catch(error => {
                    console.error('Error reading registers:', error);
                    setFetching(false);
                    alert('Error reading registers: ' + error) //erroru süslü parantez içine almayı dene
                });
        }
    };

    const filterTasks = (category) => {
        if (category === 'All') {
            filteredTasks = serverResponse;  // Show all tasks
        }
        else if (category === 'Slot Types and Firmware Versions') {
            const filteredDefault = props.json.filter(obj => obj.Tag.startsWith("Slot-")).map(obj => obj.Index)
            const filtered = serverResponse.filter(obj => filteredDefault.includes(obj.Address))
            filteredTasks = filtered
        }
        else {
            const filtered = serverResponse.find(obj => obj.Address === category);
            filteredTasks = [filtered];

        }
        setFinalData(filteredTasks.map(task => ({
            Tag:
                props.json.find(obj => obj.Index === task.Address).Tag,
            Value:
                props.json.find(obj => obj.Index === task.Address).Type === 'version' ?
                    versionDetector(task.Value) :
                    props.json.find(obj => obj.Index === task.Address)['First Slot Index'] ?
                        props.json.find(obj => obj.Index === props.json.find(obj => obj.Index === task.Address)['First Slot Index']).PossibleValues.find(obj => obj.Enum === task.Value).Tag :
                        props.json.find(obj => obj.Index === task.Address).PossibleValues ?
                            props.json.find(obj => obj.Index === task.Address).PossibleValues.find(obj => obj.Enum === task.Value).Tag : task.Value
        })

        ))

    };

    const versionDetector = (versionNumber) => {
        const binaryString = (versionNumber >>> 0).toString(2); // Use bitwise operator and toString(2) to convert to binary
        var minorPart = binaryString.slice(binaryString.length - 8, binaryString.length)
        var majorPart = binaryString.slice(0, binaryString.length - 8)
        if (minorPart === '') {
            minorPart = 0
        }
        if (majorPart === '') {
            majorPart = 0
        }
        return (
            parseInt(majorPart, 2) + '.' + parseInt(minorPart, 2)
        );
    }

    const handleChange = (event, newValue) => {
        setIpToRead(newValue)
        setFetched(false)
        serverResponse = []
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#00ADEF',
            },
            maviTon1: {
                main: '#559dee'
            },
            yesilTon1: {
                main: '#76e762'
            },
            kirmiziTon1: {
                main: '#df9999'
            },
            griTon: {
                main: '#949494'
            }
        },
    });

    // Above part is for getting
    const [typP, setTypP] = useState('');
    const writeReader = (setIndex, setValue) => {
        if (fetched === true) {
            if (selectedItems.map(obj => obj?.DeviceIPorAddress).includes(ipToRead)) {
                serverResponse.find(obj => obj.Address === setIndex).Value = setValue
                filterTasks(props.json.find(obj => obj.Tag === Typ) ?
                    props.json.find(obj => obj.Tag === Typ).Index : Typ)
            }
        }
    }
    //Below part is for posting

    const [inputV, setInputV] = useState('');
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');
    const [number, setNumber] = useState('');
    const [kind, setKind] = useState('')
    const [selectedItems, setSelectedItems] = useState([]);

    const handleTypeP = (event) => {
        setTypP(event.target.value)
        setInputV('');
        setInput1('');
        setInput2('');
        setInput3('');
        setInput4('');
        setInput5('');
        setInput6('');
        setNumber(props.json.find(obj => obj.Tag === event.target.value).Index)
        setKind(props.json.find(obj => obj.Tag === event.target.value).Type)
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
    const toggleItemSelection = (obj) => {
        if (selectedItems.includes(obj)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== obj));
        } else {
            setSelectedItems([...selectedItems, obj]);
        }
    };

    const [sending, SetSending] = useState(false);
    const [isPopUpShown, setIsPopUpShown] = useState(false);
    const sendRequestToServer = (inp, number, ip) => {
        if (typP !== '') {
            SetSending(true)
            axios.post('http://' + ip + ':8080/writeRegisters', selectedItems.map((obj) => ({
                Device_Address: obj?.DeviceIPorAddress,
                Address: number,
                Value: inp
            })))
                .then(response => {
                    console.log('Task added successfully.', response.data);
                    SetSending(false);
                    writeReader(number, inp)
                })
                .catch(error => {
                    console.error('An error occured.', error);
                    SetSending(false);
                    alert("Error writing registers: " + error)
                });
        }
    };

    const ErrorChecker = () => {
        if (selectedItems.length === 0) {
            setMessage('Please select devices to write.')
            setIsPopUpShown(true)
        }
        else {
            if (kind === 'uint16_t') {
                const inputVInt = parseInt(inputV)
                if (!/^\d+$/.test(inputV) || inputVInt < props.json.find(obj => obj.Tag === typP)['Minimum Value'] || inputVInt > props.json.find(obj => obj.Tag === typP)['Maximum Value']) {
                    setMessage('Please only enter numbers between ' + props.json.find(obj => obj.Tag === typP)['Minimum Value'] + ' and ' + props.json.find(obj => obj.Tag === typP)['Maximum Value'] + '.')
                    setIsPopUpShown(true)
                }
                else {
                    sendRequestToServer(inputVInt, number, props.ip)
                }
            }
            else if (kind === 'ip') {
                const ip1 = parseInt(input1)
                const ip2 = parseInt(input2)
                const ip3 = parseInt(input3)
                const ip4 = parseInt(input4)
                if ((255 < ip1) || (255 < ip2) || (255 < ip3) || (255 < ip4) || (!/^\d+$/.test(input1)) || (!/^\d+$/.test(input2)) || (!/^\d+$/.test(input3)) || (!/^\d+$/.test(input4))) {
                    setMessage('Please only enter integers between 0 and 255.')
                    setIsPopUpShown(true)
                }
                else {
                    sendRequestToServer(input1 + '.' + input2 + '.' + input3 + '.' + input4, number, props.ip)
                }
            }
            else if (kind === 'MAC') {
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
            else if (kind === 'string') {
                const limit = (props.json.find(obj => obj.Tag === typP)['Device Register Length'] * 2) - 1
                if (inputV.length > limit) {
                    setMessage('Maximum input lenght is ' + parseInt(limit) + '.')
                    setIsPopUpShown(true)
                }
                else {
                    sendRequestToServer(inputV + '\0', number, props.ip)
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
    }

    return (
        <div>
            <div style={{ float: 'right', width: '45%' }}>
                <Box sx={{ width: '100%', mx: '1ch' }}>
                    <Tabs value={ipToRead} onChange={handleChange} >
                        {props.info.map((obj) => (
                            <Tab label={obj?.DeviceIPorAddress}
                                value={obj?.DeviceIPorAddress}>
                            </Tab>
                        ))}
                    </Tabs>
                </Box>
                <FormControl fullwidth sx={{ my: '1ch' }}>
                    <ThemeProvider theme={theme}>
                        < Button onClick={() => fetchTasks(indexes, props.ip, ipToRead)} disabled={fetching} variant='contained' color="kirmiziTon1" sx={{ color: '#11dd11', my: '1ch' }} >
                            {fetching ? 'Fetching...' : 'Fetch Tasks'}
                        </Button>
                    </ThemeProvider>
                </FormControl>
                {fetched === true && (
                    <FormControl fullWidth sx={{ my: '1ch', width: '%80' }}>
                        <InputLabel id="demo-simple-select-label">Choose the data you want to see.</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={Typ}
                            onChange={handleType}
                            sx={{ my: '1ch', width: '65ch' }}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            <MenuItem value={'Slot Types and Firmware Versions'}> Slot Types and Firmware Versions</MenuItem>

                            {props.json.filter(obj => obj.Tag.includes('Slot') === false).map(obj => <MenuItem
                                key={obj.Tag}
                                value={obj.Tag}
                            >
                                {obj.Tag}
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                )}

                {fetched && (
                    <div style={{ float: 'left' }}>
                        <ul>
                            <p>Server Response</p>
                            <div style={{ height: '65ch', float: 'left' }}>
                                <DataGrid
                                    rows={finalData}  // Use the filteredTasks array as the data source
                                    getRowId={(row) => row.Tag}
                                    columns={[
                                        {
                                            field: 'Tag',
                                            headerName: 'Tag',
                                            width: 250,
                                        },
                                        {
                                            field: 'Value',
                                            headerName: 'Value',
                                            width: 300,
                                        },
                                    ]}
                                    pageSize={5}

                                />
                            </div>

                        </ul>

                    </div>
                )}
            </div>
            <div style={{ float: 'left', width: '45%' }}>
                <List>
                    {props.info.map((obj) => (
                        <ListItem key={obj?.DeviceIPorAddress} sx={{ py: '0.02ch', pl: '0ch' }} style={{ fontSize: '0.02ch' }}>
                            <ListItemButton role={undefined} onClick={() => toggleItemSelection(obj)} dense>
                                <Checkbox
                                    edge="start"
                                    checked={selectedItems.includes(obj)}
                                    tabIndex={-1}
                                    disableRipple
                                />
                                <ListItemText primary={obj?.DeviceIPorAddress} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <FormControl fullWidth sx={{ my: '1ch' }}>
                    <InputLabel id="demo-simple-select-label">Choose parameter to write.</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={typP}
                        onChange={handleTypeP}
                        sx={{ m: 1, width: '60ch' }}
                    >
                        {props.json.filter(obj => obj.Access === 'R/W').map(obj => <MenuItem
                            key={obj.Tag}
                            value={obj.Tag}
                        >
                            {obj.Tag}
                        </MenuItem>)}
                    </Select>
                </FormControl>
                {kind === "uint16_t" && (
                    <FormControl fullWidth>
                        <TextField
                            label='Enter an integer'
                            defaultValue=''
                            value={inputV}
                            onChange={handleInput}
                            variant='outlined'
                            margin='normal'
                            sx={{ width: '25ch', m: 1 }} />

                    </FormControl>
                )
                }
                {kind === 'ip' && (
                    <div>
                        <TextField
                            label="ip part 1"
                            defaultValue=''
                            value={input1}
                            onChange={handleInput1}
                            variant="outlined"
                            margin="normal"
                            sx={{ m: 1, width: '10ch' }}
                        />
                        <TextField
                            label="ip part 2"
                            defaultValue=''
                            value={input2}
                            onChange={handleInput2}
                            variant="outlined"
                            margin="normal"
                            sx={{ m: 1, width: '10ch' }}
                        />
                        <TextField
                            label="ip part 3"
                            defaultValue=''
                            value={input3}
                            onChange={handleInput3}
                            variant="outlined"
                            margin="normal"
                            sx={{ m: 1, width: '10ch' }}
                        />
                        <TextField
                            label="ip part 4"
                            defaultValue=''
                            value={input4}
                            onChange={handleInput4}
                            variant="outlined"
                            margin="normal"
                            sx={{ m: 1, width: '10ch' }}
                        />
                    </div>
                )}
                {kind === 'string' && (
                    <FormControl fullWidth>
                        <TextField
                            label="Enter a string"
                            defaultValue=''
                            value={inputV}
                            onChange={handleInput}
                            variant="outlined"
                            margin="normal"
                            sx={{ width: '25ch', m: 1 }}
                        />
                    </FormControl>
                )}
                {kind === 'MAC' && (
                    <div>
                        <TextField
                            label="MAC 1"
                            value={input1}
                            onChange={handleInput1}
                            variant="outlined"
                            margin="normal"
                            sx={{ m: 1, width: '10ch' }}
                        />
                        <TextField
                            label="MAC 2"
                            value={input2}
                            onChange={handleInput2}
                            variant="outlined"
                            margin="normal"
                            sx={{ m: 1, width: '10ch' }}
                        />
                        <TextField
                            label="MAC 3"
                            value={input3}
                            onChange={handleInput3}
                            variant="outlined"
                            margin="normal"
                            sx={{ m: 1, width: '10ch' }}
                        />
                        <TextField
                            label="MAC 4"
                            value={input4}
                            onChange={handleInput4}
                            variant="outlined"
                            margin="normal"
                            sx={{ m: 1, width: '10ch' }}
                        />
                        <TextField
                            label="MAC 5"
                            value={input5}
                            onChange={handleInput5}
                            variant="outlined"
                            margin="normal"
                            sx={{ m: 1, width: '10ch' }}
                        />
                        <TextField
                            label="MAC 6"
                            value={input6}
                            onChange={handleInput6}
                            variant="outlined"
                            margin="normal"
                            sx={{ m: 1, width: '10ch' }}
                        />
                    </div>
                )}
                {kind === 'Enum' && (
                    <FormControl fullWidth>
                        <Select
                            labelId='select-label'
                            id='select'
                            defaultValue={''}
                            onChange={handleInput}
                            sx={{ m: 1, width: '25ch' }}>
                            {props.json.find(obj => obj.Tag === typP).PossibleValues.map(obj => <MenuItem
                                key={obj.Enum}
                                value={obj.Enum}>
                                {obj.Tag}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                )}
                <Button variant="contained" onClick={ErrorChecker} disabled={sending} sx={{ ml: "1ch" }}>
                    {sending ? 'Sending' : 'Send Request'}
                </Button>
                <PopupErrorExample message={message} setIsPopUpShown={setIsPopUpShown} isPopUpShown={isPopUpShown} ></PopupErrorExample>
            </div>
        </div>
    );
}