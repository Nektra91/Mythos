import React, { Component } from 'react';
import RecruitmentItem from '../RecruitmentItem';
import service from '../../../service/database';
import Spinner from '../../Spinner';

import warriorLogos from '../../../images/Warrior/warrior';
import warlockLogos from '../../../images/Warlock/warlock';
import shamanLogos from '../../../images/Shaman/shaman';
import rogueLogos from '../../../images/Rogue/rogue';
import priestLogos from '../../../images/Priest/priest';
import paladinLogos from '../../../images/Paladin/paladin';
import monkLogos from '../../../images/Monk/monk';
import mageLogos from '../../../images/Mage/mage';
import hunterLogos from '../../../images/Hunter/hunter';
import druidLogos from '../../../images/Druid/druid';
import demonhunterLogos from '../../../images/Demon Hunter/demonhunter';
import deathknightLogos from '../../../images/Death Knight/deathknight';

class Recruitement extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      loading: true,
      classes: [],
    };
  }

  async fetchData() {
    await service.fetchClassesAndSpec()
     .then(res => {
        this.setState({ classes: res});
     });
  }

  componentDidMount() {  
    this.fetchData();
  }

  render() {
    const isLoading = this.state.isLoading;
    const classes = this.state.classes;
    let listToReturn;

    if(isLoading || !classes) {
      listToReturn = <Spinner />
    } else {
      listToReturn = <div>
        <RecruitmentItem name={"Warrior"} images={warriorLogos} data={classes.filter(cl => cl.Name.includes("Warrior"))}></RecruitmentItem>
        <RecruitmentItem name={"Warlock"} images={warlockLogos} data={classes.filter(cl => cl.Name.includes("Warlock"))}></RecruitmentItem>
        <RecruitmentItem name={"Shaman"} images={shamanLogos} data={classes.filter(cl => cl.Name.includes("Shaman"))}></RecruitmentItem>
        <RecruitmentItem name={"Rogue"} images={rogueLogos} data={classes.filter(cl => cl.Name.includes("Rogue"))}></RecruitmentItem>
        <RecruitmentItem name={"Priest"} images={priestLogos} data={classes.filter(cl => cl.Name.includes("Priest"))}></RecruitmentItem>
        <RecruitmentItem name={"Paladin"} images={paladinLogos} data={classes.filter(cl => cl.Name.includes("Paladin"))}></RecruitmentItem> 
        <RecruitmentItem name={"Monk"} images={monkLogos} data={classes.filter(cl => cl.Name.includes("Monk"))}></RecruitmentItem>
        <RecruitmentItem name={"Mage"} images={mageLogos} data={classes.filter(cl => cl.Name.includes("Mage"))}></RecruitmentItem>
        <RecruitmentItem name={"Hunter"} images={hunterLogos} data={classes.filter(cl => cl.Name.match("Hunter"))}></RecruitmentItem>
        <RecruitmentItem name={"Druid"} images={druidLogos} data={classes.filter(cl => cl.Name.includes("Druid"))}></RecruitmentItem>
        <RecruitmentItem name={"DemonHunter"} images={demonhunterLogos} data={classes.filter(cl => cl.Name.includes("Demon"))}></RecruitmentItem>
        <RecruitmentItem name={"DeathKnight"} images={deathknightLogos} data={classes.filter(cl => cl.Name.includes("Death"))}></RecruitmentItem>
        </div>      
    }
    return (
      <div>
        {listToReturn}
      </div>
    )
  }
};

export default Recruitement;

