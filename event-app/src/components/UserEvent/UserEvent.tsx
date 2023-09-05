import styles from "./UserEvent.module.css";
import { Event } from "../../App";

interface Props {
  event: Event;
}

export default function UserEvent({ event }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.event_container}>
        <img src={event.image} className={styles.image} alt="event-img" />
        <div className={styles.description}>
          <h2>{event.title}</h2>
          <h5>{event.description}</h5>
        </div>
      </div>

      <div className={styles.date_container}>
        <div className={styles.date}>
          {new Date(event.startDate).toLocaleDateString()} |{" "}
          {new Date(event.startDate).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
