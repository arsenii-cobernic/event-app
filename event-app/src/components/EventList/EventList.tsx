import styles from "./EventList.module.css";
import { Event } from "../../App";
import { ReactComponent as Star } from "../../assets/star.svg";
import SortEvents from "../SortEvents/SortEvents";
import { useMemo, useState } from "react";

interface Props {
  events: Event[];
  userEvents: Event[];
  toggleEvent: (event: Event) => void;
}

export default function EventList({ events, userEvents, toggleEvent }: Props) {
  const [filter, setFilter] = useState<string[]>([]);

  const filterData = (category: string) => {
    if (filter.includes(category)) {
      setFilter(filter.filter((filterItem: string) => filterItem !== category));
    } else {
      setFilter([...filter, category]);
    }
  };

  const categories = useMemo(() => {
    return [...new Set(events.map((event: Event) => event.categories).flat(1))];
  }, [events]);

  const renderedEvents = useMemo(() => {
    const eventsCopy = [...events];

    return eventsCopy
      .filter((event: Event) =>
        filter.length
          ? event.categories.some((category: string) =>
              filter.includes(category)
            )
          : event
      )
      .map((event: Event) => {
        return (
          <div className={styles.event} key={event.id}>
            <img src={event.image} className={styles.image} alt="event-img" />
            <b>{event.title}</b>
            <Star
              fill={
                userEvents.find((userEvent: Event) => userEvent.id === event.id)
                  ? "#480c93"
                  : "#fff"
              }
              onClick={() => toggleEvent(event)}
              className={styles.star}
            />
          </div>
        );
      });
  }, [events, filter, userEvents, toggleEvent]);

  return (
    <>
      <SortEvents
        categories={categories}
        filter={filter}
        filterData={filterData}
      />
      <div className={styles.container}>{renderedEvents}</div>
    </>
  );
}
