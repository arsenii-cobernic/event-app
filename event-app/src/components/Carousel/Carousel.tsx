import { useMemo, useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../../assets/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../assets/arrow-right.svg";

import styles from "./Carousel.module.css";
import UserEvent from "../UserEvent/UserEvent";
import { Event } from "../../App";

interface Props {
  data: Event[];
}

export const Carousel = ({ data }: Props) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  const showControls = data && data.length > 1;

  const events = useMemo(() => {
    const dataCopy = [...data];

    return dataCopy
      .sort((a: Event, b: Event) => {
        const date1 = new Date(a.startDate);
        const date2 = new Date(b.startDate);
        return date1.getTime() - date2.getTime();
      })
      .map((item: Event, idx) => (
        <div className={slide === idx ? "" : styles.hidden} key={item.id}>
          <UserEvent event={item} />
        </div>
      ));
  }, [data, slide]);

  useEffect(() => {
    if (slide >= data.length) {
      setSlide(0);
    }
  }, [slide, data.length]);

  return (
    <div className={styles.carousel}>
      <ArrowLeft
        onClick={prevSlide}
        className={
          showControls ? `${styles.arrow} ${styles.arrow_left}` : styles.hidden
        }
      />
      {events}

      <ArrowRight
        onClick={nextSlide}
        className={
          showControls ? `${styles.arrow} ${styles.arrow_right}` : styles.hidden
        }
      />
      <span className={showControls ? styles.indicators : styles.hidden}>
        {data.map((_, idx: number) => {
          return (
            <div
              key={idx}
              className={
                slide === idx
                  ? styles.indicator
                  : `${styles.indicator} ${styles.indicator_inactive}`
              }
              onClick={() => setSlide(idx)}
            ></div>
          );
        })}
      </span>
    </div>
  );
};
