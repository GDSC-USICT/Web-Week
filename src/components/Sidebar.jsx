import React, { useState, useEffect } from "react";
import "../assets/css/Sidebar.css";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { useDispatch, useSelector } from "react-redux";
import { activateRoom, selectActiveRoomId } from "../redux/slices/chatSlice";
import { selectUser } from "../redux/slices/userSlice";
// import { rooms } from "../data";
import firebase from "../firebase";

const db = firebase.firestore();

function Sidebar() {
  const user = useSelector(selectUser);
  const activeRoomId = useSelector(selectActiveRoomId);
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);

  const signOut = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    db.collection("rooms").onSnapshot((snap) => {
      let newrooms = []; // {roomId and roomName}
      snap.docs.forEach((doc) => {
        const obj = {
          roomName: doc.data().name,
          roomId: doc.id,
          lastMessage: doc.data().lastMessage,
        };
        newrooms.push(obj);
      });
      newrooms.sort((room1, room2) => {
        if (!room1.lastMessage || !room2.lastMessage) return -1;
        return room2?.lastMessage?.timestamp - room1?.lastMessage?.timestamp;
      });
      setRooms(newrooms);
    });
  }, []);

  const createRoom = () => {
    const newRoomName = prompt("New Room Name: ");
    if (!newRoomName) {
      alert("Please enter a valid name!");
      return;
    }
    const db = firebase.firestore();
    db.collection("rooms")
      .doc()
      .set({
        name: newRoomName,
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          src={
            user?.picture ||
            "https://cdn.pixabay.com/photo/2018/03/30/21/39/fractalius-3276624_960_720.jpg"
          }
        />
        <h3>{user.name}</h3>
        <div className="sidebar__header--icons">
          <IconButton onClick={createRoom}>
            <NoteAddIcon />
          </IconButton>
          <IconButton onClick={signOut}>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__chats">
        {rooms?.map((room) => (
          <div
            onClick={() =>
              dispatch(
                activateRoom({ roomId: room.roomId, roomName: room.roomName })
              )
            }
            key={room.roomId}
            className={`sidebar__chat ${
              activeRoomId && activeRoomId === room.roomId && "active"
            }`}
          >
            <Avatar src="https://cdn.pixabay.com/photo/2018/03/30/21/39/fractalius-3276624_960_720.jpg" />

            <span>
              <h3>{room.roomName}</h3>
              <p>{room.lastMessage?.text}</p>
            </span>

            <div className="sidebar__chat--lastMessage">
              <p>
                <small>
                  {room?.lastMessage &&
                    new Date(
                      room?.lastMessage?.timestamp?.toDate()
                    ).toLocaleString()}
                </small>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
