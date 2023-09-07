import React, { useState } from 'react';
import { List, ListItem, ListItemText, Checkbox, ListItemButton } from '@mui/material';

function SelectableList(props) {
    const [selectedItems, setSelectedItems] = useState([]); // State to store selected items

    // Toggle selection of an item
    const toggleItemSelection = (obj) => {
        if (selectedItems.includes(obj)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== obj));
        } else {
            setSelectedItems([...selectedItems, obj]);
        }
    };

    // Sample list of items (you can replace this with your own data)

    return (
        <div>
            {console.log(selectedItems)}
            <List>
                {props.info.map((obj) => (
                    <ListItem >
                        <ListItemButton role={undefined} key={obj.Value} onClick={() => toggleItemSelection(obj)} dense>
                            <Checkbox
                                edge="start"
                                checked={selectedItems.includes(obj)}
                                tabIndex={-1}
                                disableRipple
                            />
                            <ListItemText primary={obj.Name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
export default SelectableList