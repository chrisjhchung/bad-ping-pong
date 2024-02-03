import styles from "./index.module.css";

const Brick = ({ reference }) => {
  return <div ref={reference} className={styles.brick} />;
};

export default Brick;
