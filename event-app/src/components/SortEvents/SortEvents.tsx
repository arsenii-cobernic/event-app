import styles from "./SortEvents.module.css";

interface Props {
  categories: string[];
  filter: string[];
  filterData: (category: string) => void;
}

export default function SortEvents({ categories, filter, filterData }: Props) {
  return (
    <>
      <h3>Discover upcoming events:</h3>
      <div className={styles.container}>
        <div className={styles.sort_text}>Sort by:</div>
        {categories &&
          categories.map((category: string) => (
            <button
              key={category}
              className={`${filter.includes(category) ? styles.active : ""} ${
                styles.button
              }`}
              onClick={() => filterData(category)}
            >
              {category}
            </button>
          ))}
      </div>
    </>
  );
}
