import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import userGen from "username-generator"
import { Button, TextField } from '@material-ui/core';
import Dashboard from '../../layouts/DashboardLayout/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import { connectToDatabase } from '../../util/mongodb';


const useStyles = makeStyles({
  textField: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',            
      paddingBottom: 0,
      marginTop: 0,
      fontWeight: 800,
      border: '1px solid grey',
      borderRadius: '25px'
  },
  input: {
      color: 'black',
      marginLeft: '1rem',
      "&&&:before": {
        borderBottom: "none"
      },
      "&&:after": {
        borderBottom: "none"
      }
  }
});

const socket = io();

function Chat({usersRes}) {

  const classes = useStyles();

  const [user, setUser] = useState({
    usersList: null
  });

  const [msg, setMsg] = useState("");
  const [recMsg, setRecMsg] = useState({
    listMsg: []
  });

  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {

    fetch('/api/sockets').finally(() => {
        // subscribe a new user
        socket.emit("login", userGen.generateUsername());
        // list of connected users
        socket.on("users", data => {
            setUser({ usersList: JSON.parse(data) })
        });
        // we get the messages
        socket.on("getMsg", data => {
            let listMessages = recMsg.listMsg;
            listMessages.push(JSON.parse(data));
            setRecMsg({ listMsg: listMessages });
        });

          // get the logged user
        socket.on("connecteduser", data => {
            setLoggedUser(JSON.parse(data));
            console.log(data);
        });
    })
  }, []);

  // to send a message
  const sendMessage = () => {
    if(msg != "") {
      socket.emit("sendMsg", JSON.stringify({ id: loggedUser.id, msg: msg }));
    }
  }

  const keyPress = (e) => {
    if(e.keyCode == 13){
       //console.log('value', e.target.value);
       sendMessage(e.target.value);
    }
 }

  return (
    <div>
      <h1>Group Message</h1>
      <hr/>
      <h3> Connected users : {user.usersList?.length} </h3>
      <table>
        <thead>
          <tr>
            <th> User List  </th>
            <th> Connection Date </th>
          </tr>
        </thead>
        <tbody>
          {user.usersList?.map(user => {
            return (<tr key={user.id}>
              <td> {user.userName} </td>
              <td> {user.connectionTime} </td>
            </tr>)
          })}
        </tbody>
      </table>
      <hr/>
      <h3> Name : {loggedUser?.userName} </h3>
      <div style={{ borderStyle: "inset", minHeight: "2rem", marginBottom: "1rem" }}>
        <h2> Chat Window </h2>
        {recMsg.listMsg?.map((msgInfo, index) => { return (<div key={index}> <b>{msgInfo.userName} </b> :  {msgInfo.msg} <small style={{ marginLeft: "18px", color: "blue", marginTop: "5px" }}> {msgInfo.time} </small> </div>) })}
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <TextField 
          id="inputmsg" 
          className={classes.textField}
          onChange={(event) => setMsg(event.target.value)} 
          onKeyDown={(event) => keyPress(event) }
          InputProps={{className: classes.input}}
          margin="normal"
          placeholder={'message'}
        />
        <Button 
          variant="contained" 
          color="primary" 
          id="btnmsg" 
          onClick={() => { sendMessage() }}
        > Send </Button>
      </div>
    </div >
  );
}

Chat.layout = Dashboard;

export default Chat;

export async function getServerSideProps(req, res) {
  const { db } = await connectToDatabase();

    const usersRes = await db
      .collection("users")
      .find()
      .toArray();
    
    return{
      props:{
        usersRes
      }
    }
}