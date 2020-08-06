import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    // { username: "jalish", text: "hi" },
    // { username: "shuvo", text: "whats up?" },
  ]);
  const [username, setUsername] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      text: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // setMessages([...messages, { username: username, text: input }]);
    // no longer need to set State for our messages
    setInput("");
  };

  // listener of Database
  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("please enter your name"));
  }, []);

  console.log(">>>", input);
  console.log("MMM", messages);

  return (
    <div className="app">
      <img
        className="app__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Facebook_Messenger_logo.svg/761px-Facebook_Messenger_logo.svg.png?w=100&h=100"
        alt=""
      />
      <h1> Welcome {username} </h1>
      <form className="app__form">
        <FormControl className="app__formcontrol">
          <InputLabel>Type Message </InputLabel>
          <Input
            className="app__input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          {/* <Button>Send Message</Button> */}
          <IconButton
            className="app__button"
            disabled={!input}
            onClick={sendMessage}
            type="submit"
            variant="contained"
            color="primary"
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {/* messages */}
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
