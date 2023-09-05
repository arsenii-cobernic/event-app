import { useEffect } from "react";
import "./App.css";
import EventList from "./components/EventList/EventList";
import { Carousel } from "./components/Carousel/Carousel";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  addUserEvent,
  removeUserEvent,
  fetchEvents,
} from "./slices/eventSlice";

import { ReactComponent as Spin } from "./assets/spin.svg";

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  image: string;
  categories: string[];
}

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const events = useAppSelector((state) => state.events.events);
  const userEvents = useAppSelector((state) => state.events.userEvents);
  const status = useAppSelector((state) => state.events.status);

  const toggleEvent = (event: Event) => {
    const existingEvent = userEvents.find(
      (userEvent: Event) => userEvent.id === event.id
    );

    if (existingEvent) {
      dispatch(removeUserEvent(event.id));
    } else {
      dispatch(addUserEvent(event));
    }
  };

  return (
    <>
      <h1>Welcome</h1>

      {status === "loading" ? (
        <Spin />
      ) : (
        <>
          {userEvents.length ? (
            <>
              <h3>Your next event:</h3>
              <Carousel data={userEvents} />
            </>
          ) : null}
          <EventList
            events={events}
            userEvents={userEvents}
            toggleEvent={toggleEvent}
          />
        </>
      )}
    </>
  );
}

export default App;
