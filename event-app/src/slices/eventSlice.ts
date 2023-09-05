import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Event } from "../App";

interface InitialState {
  events: Event[];
  userEvents: Event[];
  status: string;
}

const initialState: InitialState = {
  events: [],
  userEvents: [],
  status: "",
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await fetch("../mock/EVENTS.json");
  const data = await response.json();
  return data;
});

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    addUserEvent: (state, action: PayloadAction<Event>) => {
      state.userEvents.push(action.payload);
    },
    removeUserEvent: (state, action: PayloadAction<string>) => {
      state.userEvents = state.userEvents.filter(
        (event: Event) => event.id !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setEvents, addUserEvent, removeUserEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
