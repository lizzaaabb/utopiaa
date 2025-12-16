import React, { useState } from 'react'
import './Styles/Phone.css'
import phoneIcon from './Pictures/phone.png'

function Phone() {
  return (
    <div className={`phone-body`}>
      <div className='phone-container'>
        <div className='phone-text'>
          <p className='phone-title'>Contact Us</p>
          <p className='phone-number'>+995 500 888 171</p>
          <p className='phone-number'>+995 514 511 166</p>
          <p className='phone-number'>+995 599 520 113</p>
        </div>
        <div className='close-button'>
          <div className='line1'></div>
          <div className='line2'></div>
        </div>
      </div>
    </div>
  )
}

export default Phone