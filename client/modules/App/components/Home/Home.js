import React from 'react';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Home.css';

// Import Images
import bg from '../../header-bk.png';

export function Home() {
  return (
    <div className={styles.home}>
      <h2>Hello  ! </h2>
    </div>
  );
}

export default Home;
