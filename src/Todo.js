import React, { useState } from 'react';
import './Todo.css';
import { List, ListItem, ListItemText, ListItemAvatar, Button, Modal } from '@material-ui/core';
import db from './firebase';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
/*rfce + enter : creates a basic template of a JS component*/
/*REACT FUNCTIONAL COMPONENT with an EXPORT*/
function Todo(props) {
    //Adding styles for the modal window
    const classes = useStyles();
        /*// Props stands for properties
        // Props can be anything you want
        // We need to pass it the "todo"
        // This way of breaking up the code into several components allows us to get it cleaner*/

    const [open, setOpen] = useState(false);

    const [input, setInput] = useState();


    const handleOpen = () => {
        setOpen(true);
    };

    const updateTodo = () => {
        // Update todo with the new input text

        db.collection('todos').doc(props.text.id).set({
            text: input
        }, {merge: true});
        // We want the modal to close
        setOpen(false);
    }

    return (
        //Adding a modal window to edit the todo
        <>
        <Modal
            open={open}
            onClose={e => setOpen(false)}
        >
            {/* adding Material UI styles for modals */}
            <div className={classes.paper}>
                <h1>Modify your todo ...</h1>
                {/* Need an input text field to be able to write and update the todo text*/}
                {/* In Placeholder we want to get the current todo text as a reminder of what was already saved */}
                <input placeholder={props.text.text} value={input} onChange={event => setInput(event.target.value)}/>
                <Button onClick={updateTodo}>Update Todo</Button>
            </div>
        </Modal>
        
        <List>  
            <ListItem>
                <ListItemAvatar>
                    
                </ListItemAvatar>
                <ListItemText primary={props.text.text} secondary="You didn't set a deadline for this one." />
            </ListItem>
            <EditIcon onClick={e => setOpen(true)} className='clickable'/>
            {/*we need to add a button for when the todo is done, we can delete it
            we will loop through the array 'todos' and get the todo ID to be deleted*/}
            <HighlightOffIcon onClick={event => db.collection('todos').doc(props.text.id).delete()} className='clickable'/>
        </List>
        </>
    )
}

export default Todo;
