import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header';
import styles from './morse.module.css';

import {
  selectCarrierText,
  selectMorsifiedCarrier,
  selectHiddenMessage,
  selectMorsifiedHiddenMessage,
  setCarrierText,
} from './morseSlice.js';

export default function MessageFinder() {
  const carrierText = useSelector(selectCarrierText);
  const morsifiedCarrier = useSelector(selectMorsifiedCarrier);
  const hiddenMessage = useSelector(selectHiddenMessage);
  const morsifiedHiddenMessage = useSelector(selectMorsifiedHiddenMessage);

  const dispatch = useDispatch();
  const onChange = (event) => {
    console.log('Carrier text changed:', event.target.value);
    dispatch(setCarrierText({
      text: event.target.value,
    }));
  };

  return (
    <>
      <Header />
      <label className={styles.label}>
        <strong>Carrier Text:</strong>
        <input type={'text'} className={styles.wide} value={carrierText} onChange={onChange} />
      </label>
      <label className={styles.label}>
        <strong>Pause-Free Morsification of Letters:</strong>
        <output className={`${styles.wide} ${styles.morse}`}>{morsifiedCarrier}</output>
      </label>
      <label className={styles.label}>
        <strong>Guessed Hidden Message:</strong>
        <output className={styles.wide}>{hiddenMessage}</output>
      </label>
      <label className={styles.label}>
        <strong>Morsification of Hidden Message:</strong>
        <output className={`${styles.wide} ${styles.morse}`}>{morsifiedHiddenMessage}</output>
      </label>
    </>
  );
}
