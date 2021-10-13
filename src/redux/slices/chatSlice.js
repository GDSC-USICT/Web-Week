import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeRoomId: null,
  activeRoomName: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    activateRoom: (state, action) => {
      state.activeRoomId = action.payload.roomId;
      state.activeRoomName = action.payload.roomName;
    },
  },
});

export const { activateRoom } = chatSlice.actions;
export const selectActiveRoomId = (state) => state.chat.activeRoomId;
export const selectActiveRoomName = (state) => state.chat.activeRoomName;
export default chatSlice.reducer;
