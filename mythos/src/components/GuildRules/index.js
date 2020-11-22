import React from 'react';

import styles from './rules.module.css'

const Rules = () => (
  <div className={styles.baseContainer}>
    <div className={styles.rules}>
      <div className= {styles.container}>
        <div className={styles.ruleContainer}>
          <div>
            <h3>General</h3>
            <div>
              <ul>
                <li>
                  <p>Don't be an asshole. Everyone can make mistakes.</p>
                </li>
                <li>
                  <p>If you are in Mythos (of any rank) this means you are wearing the name of the guild, and thus you are projecting the external image of the guild. This means all your actions should reflect on this.</p>
                </li>
                <li>
                  <p>Racism, sexual harassment or other uncouth behavioural attributes with the intent to harm will not be tolerated.</p>
                </li>
                <li>
                  <p>We should all try to behave friendly and respectful to all other players in the game; even if they insult you try to stay fairraid rules</p>
                </li>
                <li>
                  <p>If you have any issues with the guild, members of the guild, or an external influence, be sure to contact your Officers as they are there to help and ensure that these issues do not escalate into something major.</p>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3>Raiding</h3>
            <div>
              <ul>
                <li>
                  <p>You must be up to date on encounters for your role, check videos, read guides and look at the guild discord for our discussion on it.</p>
                </li>
                <li>
                  <p>You must bring enough pots/flask/tomes/augment runes/food buffs and all other reagents to perform as best as possible in the raid. (You are expected to be self sufficient)</p>
                </li>
                <li>
                  <p>You never go AFK during a raid; there is a break in all raids in order to go to the toilet or whatever is needed. If a very special situation demands that you go AFK you inform the Officers/Raid Leader - You do not type "brb sec" in raid chat, as this is just plain disrespectful to the other raiders and you can get benched for this.</p>
                </li>
                <li>
                  <p>We expect all our raiders to have very high attendance, it is on your own to ensure you can attend almost every raid, schedule your irl responsibilities so you can have close to 100% attendance.</p>
                </li>
                <li>
                  <p>Changing main spec. or main character is not allowed without talking to an Officer.</p>
                </li>
                <li>
                  <p>You will have all of the required addons, as outlined by the Officer team.</p>
                </li>
                <li>
                  <p>Raid invites go out 15 minutes before the raid starts, we aim to start pulling bosses as soon as possible.</p>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3>Communication during raid</h3>
            <div>
              <ul>
                <li>
                  <p>On trash we can chat/banter a bit on Teamspeak unless the Raid leader says otherwise (i.e. is recapping or providing an explanation for next pull)</p>
                </li>
                <li>
                  <p>On bosses stay silent, unless you have something important to say.</p>
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