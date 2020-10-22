import React from 'react';

import styles from './about.module.css';

const About = () => (
  <div className={styles.baseContainer}>
    <div className={styles.container}>
      <h1 className={styles.alignCenter}>About us</h1>
      <div className={styles.alignCenter}>
        <div>
          <p>Mythos traces its roots back on Sunstrider. 
             The guild was formed in 2012 as Old by 3 good friends which are all a part of the guild today.
             It started out as just close friends but over the years we have built up to become an international team of like minded individuals.
             We've ensured that the guild is based around a strong core of people who know each other and have raided together for a long time.
          </p>
          <p>
             We have always pushed ourselves to our limits in order to achieve the highest possible standard whilst still having a good time all whilst on a 2 day raiding schedule.
             We aim to push Mythic content to achieve Cutting Edge in Shadowlands all whilst still retaining our 2 day raiding schedule.</p>
        </div>
      </div>
    </div>
  </div>
);

export default About;