import React, { useState, useEffect } from "react";
import "../assets/css/Chat.css";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";
import Message from "./Message";
import { useSelector } from "react-redux";
import {
  selectActiveRoomId,
  selectActiveRoomName,
} from "../redux/slices/chatSlice";
import firebase from "../firebase";
import { selectUser } from "../redux/slices/userSlice";
import FlipMove from "react-flip-move";

function Chat() {
  const activeRoomId = useSelector(selectActiveRoomId);
  const activeRoomName = useSelector(selectActiveRoomName);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector(selectUser);
  const db = firebase.firestore();

  useEffect(() => {
    if (activeRoomId) {
      db.collection("rooms")
        .doc(activeRoomId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snap) => setMessages(snap.docs.map((s) => s.data())));
    }
  }, [db, activeRoomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message || !activeRoomId) {
      return;
    }
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    db.collection("rooms")
      .doc(activeRoomId)
      .update({
        lastMessage: {
          timestamp,
          text: message,
        },
      })
      .catch((err) => console.log(err));

    db.collection("rooms")
      .doc(activeRoomId)
      .collection("messages")
      .doc()
      .set({
        text: message,
        senderId: user.id,
        senderPic: user.picture,
        timestamp,
      })
      .then(() => setMessage(""))
      .catch((err) => console.log(err));
  };
  return (
    <div className="chat">
      {/* header */}

      <div className="chat__header">
        <Avatar src="https://cdn.pixabay.com/photo/2018/03/30/21/39/fractalius-3276624_960_720.jpg" />
        <h3>{activeRoomName}</h3>
        <div className="chat__header--icons">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {/* messages */}
      <div className="chat__messages">
        <FlipMove>
          {messages?.map((message) => (
            <Message key={message.timestamp} message={message} />
          ))}
        </FlipMove>
      </div>
      {/* form */}
      <div className="chat__footer">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="New Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="chat__footer--icons">
            <IconButton type="submit">
              <SendIcon />
            </IconButton>
            <IconButton>
              <MicIcon />
            </IconButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
