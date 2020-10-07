import React from 'react';

function RecruitementItem (props) {
  const {images} = props;
  const {data} = props;

  return  (
    <div>
      {data.map(cl => 
        <p>{cl.Name}</p>
      )}
      {images.map(imgUrl => <img key={imgUrl} src={imgUrl} alt="" style={{height: 25, width: 25}} /> )}
    </div>
  )
};

export default RecruitementItem;