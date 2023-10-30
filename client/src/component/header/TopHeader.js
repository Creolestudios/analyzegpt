import React from 'react';
import './header.scss';
import logo from './creole_blue_logo.png';

function TopHeader() {
  return (
    <>
      {/* <div>
        <span className='logoClass'>Transcript GPT</span>
      </div> */}
      <img src={logo} alt='' width={160} height={40} className='logoClass' />
    </>
  );
}

export default TopHeader;
