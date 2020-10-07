import React from 'react';
import RecruitmentItem from '../RecruitmentItem';

import warriorLogos from '../../../images/Warrior/warrior';
import paladinLogos from '../../../images/Paladin/paladin';
import priestLogos from '../../../images/Priest/priest';
import monkLogos from '../../../images/Monk/monk';
import warlockLogos from '../../../images/Warlock/warlock';
import demonhunterLogos from '../../../images/Demon Hunter/demonhunter';
import deathknightLogos from '../../../images/Death Knight/deathknight';
import druidLogos from '../../../images/Druid/druid';
import hunterLogos from '../../../images/Hunter/hunter';
import mageLogos from '../../../images/Mage/mage';
import rogueLogos from '../../../images/Rogue/rogue';
import shamanLogos from '../../../images/Shaman/shaman';

function Recruitement(props) {
  const {classes} = props;
  return (
    <div>
      <h1>Recruitement      
      </h1>
      <RecruitmentItem name={"Warrior"} images={warriorLogos} data={classes.filter(cl => cl.Name.includes("Warrior"))}></RecruitmentItem>
      <RecruitmentItem name={"Paladin"} images={paladinLogos} data={classes.filter(cl => cl.Name.includes("Paladin"))}></RecruitmentItem>   
      <RecruitmentItem name={"Priest"} images={priestLogos} data={classes.filter(cl => cl.Name.includes("Priest"))}></RecruitmentItem>
      <RecruitmentItem name={"Monk"} images={monkLogos} data={classes.filter(cl => cl.Name.includes("Monk"))}></RecruitmentItem>
      <RecruitmentItem name={"Warlock"} images={warlockLogos} data={classes.filter(cl => cl.Name.includes("Warlock"))}></RecruitmentItem>
      <RecruitmentItem name={"DemonHunter"} images={demonhunterLogos} data={classes.filter(cl => cl.Name.includes("Demon"))}></RecruitmentItem>
      <RecruitmentItem name={"DeathKnight"} images={deathknightLogos} data={classes.filter(cl => cl.Name.includes("Death"))}></RecruitmentItem>
      <RecruitmentItem name={"Druid"} images={druidLogos} data={classes.filter(cl => cl.Name.includes("Druid"))}></RecruitmentItem>
      <RecruitmentItem name={"Hunter"} images={hunterLogos} data={classes.filter(cl => cl.Name.match("Hunter"))}></RecruitmentItem>
      <RecruitmentItem name={"Mage"} images={mageLogos} data={classes.filter(cl => cl.Name.includes("Mage"))}></RecruitmentItem>
      <RecruitmentItem name={"Rogue"} images={rogueLogos} data={classes.filter(cl => cl.Name.includes("Rogue"))}></RecruitmentItem>
      <RecruitmentItem name={"Shaman"} images={shamanLogos} data={classes.filter(cl => cl.Name.includes("Shaman"))}></RecruitmentItem>
    </div>
  )
  
};

export default Recruitement;

