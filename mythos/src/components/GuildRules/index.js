import React from 'react';

import styles from './rules.module.css'

const Rules = () => (
  <div className={styles.baseContainer}>
    <div>
      <div className= {styles.container}>
        <h1 className={styles.alignCenter}>Guild rules</h1>
        <div className={styles.ruleContainer}>
          <div>
            <h3>General</h3>
            <div>
              <ul>
                <li>
                  <p>Don't be an asshole. Everyone can make mistakes.</p>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3>Raiding</h3>
            <div>
              <ul>
                <li>
                  <p>Show up on time. Showing up late will lsoe you the spot for the raid.</p>
                </li>
                <li>
                  <p>Be prepared. Have flasks, potions and food ready.</p>
                </li>
                <li>
                  <p>Be vocal! Your idea could be the idea that gets the kill.</p>
                </li>
                <li>
                  <p>Raid leader has the final say.</p>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3>Loot</h3>
            <div>
              <ul>
                <li>
                  <p>Loot-Council is used for all non personal loot</p>
                </li>
                <li>
                  <p>Personal loot is in effect so your loot is your loot.</p>
                </li>
                <li>
                  <p>If you do not need an item and it is tradeable please let an officer know so it can be distributed.</p>
                </li>
                <li>
                  <p>BoE items will be sold at the auctions house for the first few weeks to support the guild back.</p>
                </li>
                <li>
                  <p>Raiders have higher priority for non personal loot than Trials.</p>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3>Extra</h3>
            <div>
              <ul>
                <li>
                  <p>Cauldrons and feasts will be provided if the guild bank can cover it.</p>
                </li>
                <li>
                  <p>After the AH price for BoE drop they can be sold by it's owner.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Rules;