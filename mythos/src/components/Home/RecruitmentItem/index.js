import React from 'react';
import SpecIcon from '../RecruitmentIcons/SpecIcon';
import ClassIcon from '../RecruitmentIcons/ClassIcon';

import styles from '../home.css';

function RecruitementItem (props) {
  const {images} = props;
  const {data} = props;

  return  (
    <div>
      {data.map((cl, idx) => 
        <div key={cl.Id}>
          <div className={styles.Row}>
          {images.filter(image => image.name.includes('Main')).map(filteredImage => (
                    <div>
                      <ClassIcon image={filteredImage.image}></ClassIcon>
                    </div>
                  ))}
            {cl.Recruitments.map(rec => 
              <div>
                {images.filter(image => image.name.includes(rec.Specialization.Name)).map(filteredImage => (
                  <div>
                    <SpecIcon image={filteredImage.image} recruiting={rec.Recruiting}></SpecIcon>
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