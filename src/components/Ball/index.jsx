import styles from "./index.module.css";

const Ball = ({ reference }) => {
  return <div ref={reference} className={styles.ball} />;
};

export default Ball;
