import * as React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import countries from './Countries';
import Typography from '@mui/material/Typography';

function AutoCompletedText() {
    const [suggestions, setSuggestions] = useState([]);

    const onChangeText = (e) => {
        const value = e.target.value;
        let currentSuggestions = [];

        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            currentSuggestions = countries.sort().filter(v => regex.test(v))
        }

        setSuggestions(currentSuggestions)
    }

    const renderSuggestions = () => {
        if (suggestions.length === 0) {
            return null;
        }

        return (
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {suggestions.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                        <ListItem
                            key={value}
                            disablePadding
                        >
                            <ListItemText id={labelId} primary={`${value}`} />
                        </ListItem>
                    );
                })}
            </List>
        );
    }
    return (
        <>
            <Box>
                <Grid container spacing={2} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Enter Text For Search" onChange={onChangeText} variant="outlined" />
                        <Typography variant="subtitle2" gutterBottom>
                            Suggestions: {suggestions.length}
                        </Typography>
                        {renderSuggestions()}
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default AutoCompletedText