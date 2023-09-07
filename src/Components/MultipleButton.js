import React from "react";
import { MenuItem, Select, InputLabel } from "@material-ui/core";

export default function SelectibleButton() {
    return (
        <div>
            <InputLabel >Age</InputLabel>
            <Select defaultValue={"a"}>
                <MenuItem value="a">a</MenuItem>
                <MenuItem value="b">b</MenuItem>
                <MenuItem value="ab">ab</MenuItem>
                <MenuItem value="abc">abc</MenuItem>
                <MenuItem value="adsgawdf">adsgawdf</MenuItem>
            </Select>
        </div>
    );
}