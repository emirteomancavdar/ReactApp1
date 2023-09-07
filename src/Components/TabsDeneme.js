import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";

export default function CenteredTabs() {
    const [ipToRead, setIpToRead] = useState()
    const itemArray = [{ Name: 'item1', Value: '1' }, { Name: 'item2', Value: '2' }]
    const handleChange = (event, newValue) => {
        setIpToRead(newValue)
    }

    return (
        <div>
            {console.log(ipToRead)}
        <Box sx={{ width: '100%'}}>
            <Tabs value={ipToRead} onChange={handleChange} >
                {itemArray.map((obj)=>(
                    <Tab label={obj.Name} 
                    value={obj.Value}>

                    </Tab>
                ))}
            </Tabs>
        </Box>
        </div>
    )
}