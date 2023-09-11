import React, { useState } from 'react';
import axios from 'axios';
import { FormControl, MenuItem, Button, TextField, InputLabel, Select, List, ListItem, ListItemText, Checkbox, ListItemButton, Box, Tabs, Tab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PopupErrorExample from './Error';

var filteredTasks = [] //while reading a device, code reads all info about device. User may filter to see specific info. 
//filteredTasks will be used for the first step of the filtering.
var serverResponse = [] //Raw data that comes from the server for reading is stored in serverResponse

export default function GetFinal(props) {
    const [fetching, setFetching] = useState(false); //To control writing on the reading button.

    const [TypR, SetTypR] = useState('All'); // TypR is used to select what to be filtered. Its default value is 'All' which shows all
    //the info about selected device. After fetching the data a dropdown button appears to select what to filter. TypR is set to the 
    //name of the selected button.  

    const [fetched, setFetched] = useState(false); //Fetched controls the datagrid which displays the fetched info about device.

    const indexes = props.json.map(obj => obj.Index);  //indexes is sent to the server for reading. It stores all of the indexes 
    //in selected json file. json file selection is made in the App.js file.

    const [finalData, setFinalData] = useState([]) // finalData stores the result of the second and last step of filtering. 

    const [ipToRead, setIpToRead] = useState(props.info[0]?.DeviceIPorAddress) //ipToRead selects stores the address of the device
    //that will be readed.

    const [message, setMessage] = useState('') //message is sent to the PopUpErrorExample component to print necessary error message.
    /**
     * 
     * @param {string} event 
     */
    const handleTypeR = (event) => { //This function is called when users selects something form the dropdown list.
        SetTypR(event.target.value); //Value that is sent by the dropdown button is set as TypeR
        filterTasks(props.json.find(obj => obj.Tag === event.target.value) ?
            props.json.find(obj => obj.Tag === event.target.value).Index : event.target.value);
        //Value that is sent by the dropdown button may exist as an object tag in the json file.
        //This part checks if it exists. If it is then index of that object is given to the filterTasks. Otherwise Value from
        //dropdown vutton is given to the filterTasks.
    };
    /**
     * @param {integer,string} Ind 
     * @param {string} ip -props.ip
     */
    const fetchTasks = (Ind, ip) => { //This function is called when the 'Fetch' button is pressed
        if (ipToRead === '') {      //Firstly it controls if a device address is selected. If not it prints an error message via
            setMessage('Please select a device to read.') //PopUpErrorExample.
            setIsPopUpShown(true)
        }
        else {
            setFetching(true);
            axios.post('http://' + ip + ':8080/readRegisters', [{ "Device_Address": ipToRead, "addresses": Ind }])
                //This function sends an object array. Objects have 2 properties. One of them is the address of the device that will
                //be readed and the other one is the indexes of the device that are wanted to be read.This code allow only one 
                //device to be readed at once. 
                //Note: It can be arranged to read multiple devices at once easily but there may be problems when displaying.
                .then(response => {
                    serverResponse = response.data;  //Necessary part of the response is stored in the serverRespone
                    setFetching(false);
                    setFetched(true);
                    filterTasks(props.json.find(obj => obj.Tag === TypR) ? 
                        props.json.find(obj => obj.Tag === TypR).Index : TypR)
                    //After the first fetching and filtering, user can fetch again. filterTasks above ensures that the displayed
                    //data is updated if fetching is used after the first fetching and filtering.
                })
                .catch(error => {
                    console.error('Error reading registers:', error);
                    setFetching(false);
                    alert('Error reading registers: ' + error) //Prints error in the screen if fetching is unsuccessful
                });
        }
    };
    /**
     * 
     * @param {integer,string} category ,integer if filtering only one object, string if filtering multiple objects
     */
    const filterTasks = (category) => {
        if (category === 'All') { //If category is All there will be no filtering.
            filteredTasks = serverResponse;
        }
        else if (category === 'Slot Types and Firmware Versions') { //This part for filtering Slot-x firmware version and Slot-x
            //Type. But this works properly when the other Tags do not contain slot-. Other tags should use a space insted of dash. 
            const filteredDefault = props.json.filter(obj => obj.Tag.startsWith("Slot-")).map(obj => obj.Index)
            //filteredDefault stores the indexes of the objects from json file that conatin slot- in their tags
            const filtered = serverResponse.filter(obj => filteredDefault.includes(obj.Address))
            //'filtered' selects and stores objects from serverResponse whose indexes are the same as in the filteredDefault 
            filteredTasks = filtered
        }
        else {
            const filtered = serverResponse.find(obj => obj.Address === category);
            //If the selected items value equals to an object Tag(in the handleTypeR section) then Index of the object is sent here.
            //Thus code simply finds the object in the serverResponse whose index is equal to the index that was sent here.
            filteredTasks = [filtered];

        }
        setFinalData(filteredTasks.map(task => ({ //To display data in datagrid code needs an array.
            //In this function we create an object array where each object has 2 properties as Tag and Value.
            Tag:
                props.json.find(obj => obj.Index === task.Address).Tag,
            //filteredTasks is an object array. The code looks at all items and try to match their indexes to the 
            //indexes at the json file. If they are matched Tag is assigned as the tag of the object in json file.
            Value:
                //Special handling is reuqired for the Types version, Enum, and for the objects that contain First Slot Index.
                //These part checks if an object needs special handling.
                props.json.find(obj => obj.Index === task.Address).Type === 'version' ?
                    versionDetector(task.Value) :
                    props.json.find(obj => obj.Index === task.Address)['First Slot Index'] ?
                        props.json.find(obj => obj.Index === props.json.find(obj => obj.Index === task.Address)['First Slot Index']).PossibleValues.find(obj => obj.Enum === task.Value).Tag :
                        props.json.find(obj => obj.Index === task.Address).PossibleValues ?
                            props.json.find(obj => obj.Index === task.Address).PossibleValues.find(obj => obj.Enum === task.Value).Tag : task.Value
        })
        ))
    };
    /**
     * 
     * @param {integer} versionNumber 
     * @returns integer
     */
    const versionDetector = (versionNumber) => { //This function converts the input to binary, then splits it up to two part. 
        //Each part has 8bit length. Then converts that pieces to integer again.
        const binaryString = (versionNumber >>> 0).toString(2); 
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
    /**
     * 
     * @param {I do not know how event works but when I delete it, tabs for selecting device to read does not work properly} event 
     * @param {string} newValue 
     */
    const handleChange = (event, newValue) => { //When something is selected by the tabs, it will be processed here.
        //Also when changing the device Ip, it will erase the serverResponse to prevent displaying data of another device.
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
                main: '#0079e1'
            },
            yesilTon1: {
                main: '#76e762'
            },
            kirmiziTon1: {
                main: '#ea88f8'
            },
            griTon: {
                main: '#949494'
            }
        },
    });

    // Above part is for reading
    const [typW, setTypW] = useState(''); //Holds the Tag in the selected button from dropdown button (for writing).
    /**
     * 
     * @param {integer} setIndex 
     * @param {string,integer} setValue 
     */
    const writeReader = (setIndex, setValue) => { //This function is called if writing operation is successful. It updates
        //the serverResponse if it has fetched at least once. So without fetching again we obtain the new data.
        //Function checks if the device we are displaying currently is one of the devices we write on. If so
        //data is updated. 
        if (fetched === true) {
            if (selectedDevices.map(obj => obj?.DeviceIPorAddress).includes(ipToRead)) {
                serverResponse.find(obj => obj.Address === setIndex).Value = setValue
                filterTasks(props.json.find(obj => obj.Tag === TypR) ?
                    props.json.find(obj => obj.Tag === TypR).Index : TypR)
            }
        }
    }
    //Below part is for writing

    const [inputV, setInputV] = useState('');
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');
    const [number, setNumber] = useState(''); //Will hold the index of registers
    const [kind, setKind] = useState('')      //Will hold the Type of registers
    const [selectedDevices, setSelectedDevices] = useState([]); //Holds the addresses of the devices to write on
    /**
     * 
     * @param {string} event 
     */
    const handleTypeW = (event) => { //When a button is selected from the dropdown button, this function is activated.
        //The text on the button is hold in the TypW. After changing the button previous inputs are deleted.
        //Number holds the index of the register that will be written and Kind holds the Type of that register.
        setTypW(event.target.value)
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
    /**
     * 
     * @param {string} event for all handleInputs
     */
    //After selecting a button, some areas appear to let user enter an input. Type of the area depends on the Type of object.
    //Depending on the Type one of the following functions will be called. In general single inputs like Enum, String etc will
    //call handleInput, and multiple inputs like Ip or MAC will call handleInput1,2,3...
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
    /**
     * 
     * @param {object} obj 
     */
    const toggleItemSelection = (obj) => { //There is a list in which the devices to write on can be selected. 
        //If item exists in the list, it is removed else it is added.
        if (selectedDevices.includes(obj)) {
            setSelectedDevices(selectedDevices.filter((selectedDevice) => selectedDevice !== obj));
        } else {
            setSelectedDevices([...selectedDevices, obj]);
        }
    };

    const [sending, SetSending] = useState(false);
    const [isPopUpShown, setIsPopUpShown] = useState(false);
    /**
     * 
     * @param {integer,string} inp 
     * @param {integer} number 
     * @param {string} ip 
     */
    const sendRequestToServer = (inp, number, ip) => { //This function is called in the ErrorChecker. It sends an object array
        //to the server. Array is created by mapping selectedDevices. Address and Value are the same for all devices in an array.  
        if (typW !== '') {
            SetSending(true)
            console.log(selectedDevices.map((obj) => ({
                Device_Address: obj?.DeviceIPorAddress,
                Address: number,
                Value: inp,
            })))
            axios.post('http://' + ip + ':8080/writeRegisters', selectedDevices.map((obj) => ({
                Device_Address: obj?.DeviceIPorAddress,
                Address: number,
                Value: inp,
            })))
                .then(response => {
                    console.log('Task added successfully.', response.data);
                    SetSending(false);
                    if (typeof inp === 'string'){
                        inp = inp.slice(0,-1)
                    }
                    writeReader(number, inp)
                })
                .catch(error => {
                    console.error('An error occured.', error);
                    SetSending(false);
                    alert("Error writing registers: " + error)
                });
        }
    };

    const ErrorChecker = () => {//This function is called when the user presses the 'send request' button.
        //This function cheks the kind (kind stores 'Type' of register) of the register and according to that kind evaluates the
        //input of the user. If there is an inappropriate input, function gives an error message. Else it calls the function
        //sendRequestToServer.
        if (selectedDevices.length === 0) { //Gives an error if no device is selected.
            setMessage('Please select devices to write.')
            setIsPopUpShown(true)
        }
        else {
            if (kind === 'uint16_t') { //For uint input it checks from the json file if the entered input is in the allowed range and it also
                //checks if there is a non integer character in the netered input.
                const inputVInt = parseInt(inputV)
                if (!/^\d+$/.test(inputV) || inputVInt < props.json.find(obj => obj.Tag === typW)['Minimum Value'] || inputVInt > props.json.find(obj => obj.Tag === typW)['Maximum Value']) {
                    setMessage('Please only enter numbers between ' + props.json.find(obj => obj.Tag === typW)['Minimum Value'] + ' and ' + props.json.find(obj => obj.Tag === typW)['Maximum Value'] + '.')
                    setIsPopUpShown(true)
                }
                else {
                    sendRequestToServer(inputVInt, number, props.ip)
                }
            }
            else if (kind === 'ip') {
                //For ip there are 4 input boxes. For each box it controls if the input is in range 0-255 and if it contains any non integer
                //character.
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
            else if (kind === 'MAC') {//Same as IP input but 6 boxes.
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
            else if (kind === 'string') {//Looks at the json file to see how many registers are there for selected parameter.
                //Each register contains 2 bytes and 1 byte is reserved for null character. So user input should be equal
                //or less than corresponding number.
                const limit = (props.json.find(obj => obj.Tag === typW)['Device Register Length'] * 2) - 1
                if (inputV.length > limit) {
                    setMessage('Maximum input lenght is ' + parseInt(limit) + '.')
                    setIsPopUpShown(true)
                }
                else {
                    sendRequestToServer(inputV + '\0', number, props.ip)
                }
            }
            else if (inputV === '') {//When Type Enum is selected, there will be another dorpdown button to select a value. If user 
                //does not select a value from that button, an error will be given.
                setMessage('Please select something.')
                setIsPopUpShown(true)
            }
            else {//This is for enum inputs. Enum values are limited by the code so user cannot enter an invalid input.
                sendRequestToServer(inputV, number, props.ip)
            }
        }
    }

    return (
        <div>
            <div style={{ float: 'right', width: '45%' }}> {/*Right side of the screen is for reading*/}
                <Box sx={{ width: '100%', mx: '1ch' }}>
                    <Tabs value={ipToRead} onChange={handleChange}>{/*Tabs are disabled when fetching is in progress to prevent
                    confusion.(Pressing fetch button on the first tab and then changing to second tab immediately causes
                    displayin data about tab1 under the tab2)*/}
                        {props.info.map((obj) => (
                            <Tab label={obj?.DeviceIPorAddress}
                                value={obj?.DeviceIPorAddress}
                                disabled={fetching}>
                            </Tab>
                        ))}
                    </Tabs>
                </Box>
                <FormControl fullwidth sx={{}}>{/*Fetching button*/}
                    <ThemeProvider theme={theme}>
                        < Button onClick={() => fetchTasks(indexes, props.ip, ipToRead)} disabled={fetching} variant='contained' color="kirmiziTon1" sx={{ color: '#ededed', my: '1ch' }} >
                            {fetching ? 'Fetching...' : 'Fetch Tasks'}
                        </Button>
                    </ThemeProvider>
                </FormControl>
                {fetched === true && (
                    <div>
                    <FormControl fullWidth sx={{ my: '1ch', width: '%80' }}>{/*After fetching dropdown button for filtering and
                    datagrid to display appears.*/}
                        <InputLabel id="demo-simple-select-label">Choose the data you want to see.</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={TypR}
                            onChange={handleTypeR}
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
                    </div>
                )}
            </div>
            <div style={{ float: 'left', width: '45%' }}>{/*Left side of the screen is for writing*/}
                <List>{/*Selectible list of the devices*/}
                    {props.info.map((obj) => ( 
                        <ListItem key={obj?.DeviceIPorAddress} sx={{ py: '0.1ch' }} style={{ fontSize: '0.02ch' }}>
                            <ListItemButton disabled={sending} role={undefined} onClick={() => toggleItemSelection(obj)} dense>
                                <Checkbox
                                    edge="start"
                                    checked={selectedDevices.includes(obj)}
                                    tabIndex={-1}
                                    disableRipple
                                />
                                <ListItemText primary={obj?.DeviceIPorAddress} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <FormControl fullWidth sx={{ my: '1ch' }}> {/*Device register list. To create items it maps over the json file
                and selects the items that have R/W Access property.*/}
                    <InputLabel id="demo-simple-select-label">Choose parameter to write.</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={typW}
                        onChange={handleTypeW}
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

                {/*Below part is to determine how to take input. For uint16_t and string 1 text box appears.
                For IP 4 boxes appear and for MAC 6 boxes appear.*/}
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

                {/*For Enum code maps over the PossibleValues and projects Tags of the items in PossibleValues.
                But stores corresponding Enum values */}
                {kind === 'Enum' && (
                    <FormControl fullWidth>
                        <Select
                            labelId='select-label'
                            id='select'
                            defaultValue={''}
                            onChange={handleInput}
                            sx={{ m: 1, width: '25ch' }}>
                            {props.json.find(obj => obj.Tag === typW).PossibleValues.map(obj => <MenuItem
                                key={obj.Enum}
                                value={obj.Enum}>
                                {obj.Tag}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                )}

                {/*Button to write*/}
                <Button variant="contained" onClick={ErrorChecker} disabled={sending} sx={{ ml: "1ch" }}>
                    {sending ? 'Sending' : 'Send Request'}
                </Button>
                <PopupErrorExample message={message} setIsPopUpShown={setIsPopUpShown} isPopUpShown={isPopUpShown} ></PopupErrorExample>
            </div>
        </div>
    );
}