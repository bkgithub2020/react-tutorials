import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


function RoomDropdown({ roomsData, handleRoomFilterFunc, selectedRoom = "" }) {
    return (
        <Box sx={{ minWidth: 120, mb: 3 }}>
            <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="room-dropdown-lbl">Room</InputLabel>
                <Select
                    labelId="room-dropdown-lbl"
                    id="room-dropdown"
                    name="room-dropdown"
                    value={selectedRoom}
                    label="Room"
                    onChange={handleRoomFilterFunc}
                >
                    <MenuItem value="">Select Room</MenuItem>
                    {
                        roomsData.map((room) => {
                            return <MenuItem value={room} key={room}>{room}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    )
}

export default RoomDropdown;