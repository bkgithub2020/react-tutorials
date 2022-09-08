
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment';

export default function EventDetail({ data }) {
    const { title, start } = data;
    return (
        <List dense sx={{ width: '100%', minWidth: 250, maxWidth: 500, bgcolor: 'background.paper' }}>
            <ListItem>
                <ListItemText primary={`Title: ${title}`} />
            </ListItem>
            <ListItem>
                <ListItemText primary={`Date: ${moment(start).format('MM/DD/YYYY')}`} />
            </ListItem>
        </List>
    );
}
