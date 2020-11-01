import React from 'react';
import SpecIcon from '../RecruitmentIcons/SpecIcon';
import ClassIcon from '../RecruitmentIcons/ClassIcon';

import style from '../home.module.css';

function RecruitementItem (props) {
  const {images} = props;
  const {data} = props;
  const {adminMode} = props;

  return  (
    <div>
      {data.map((cl) => 
        <div key={cl.Id}>
          <div className={style.row}>
          {images.filter(image => image.name.includes('Main')).map(filteredImage => (
                    <div key={filteredImage.image} className={style.class}>
                      <ClassIcon image={filteredImage.image}></ClassIcon>
                    </div>
                  ))}
            {cl.Recruitments.map(rec => 
              <div key={rec.Specialization.Name} className={style.spec}>
                {images.filter(image => image.name.includes(rec.Specialization.Name)).map(filteredImage => (
                  <div key={filteredImage.name}>
                    <SpecIcon adminMode={adminMode} image={filteredImage.image} recruiting={rec.Recruiting} id={rec.Id}></SpecIcon>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
};

export default RecruitementItem;