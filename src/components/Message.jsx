import React, { forwardRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import "../assets/css/Message.css";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";

const Message = forwardRef(({ message }, ref) => {
  const user = useSelector(selectUser);
  return (
    <div className="message" ref={ref}>
      {message.senderId !== user.id && (
        <Avatar src={message.senderPic} referrerPolicy="no-referrer" />
      )}
      <div
        className={`message__content ${
          message.senderId === user.id && "sender"
        }`}
      >
        <p> {message.text} </p>
        <p>
          <small>
            {new Date(message.timestamp?.toDate()).toLocaleString()}
          </small>
        </p>
      </div>
    </div>
  );
});

export default Message;
