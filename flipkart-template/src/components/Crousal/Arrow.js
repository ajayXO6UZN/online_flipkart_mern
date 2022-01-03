import React from 'react'
import { css, cx } from '@emotion/css'
import leftArrow from '../img/left-arrow.svg'
import rightArrow from '../img/right-arrow.svg'

const Arrow = ({ direction, handleClick,right,left  }) => {
  return (
    <div
      onClick={handleClick}
      className={css`
        display: flex;
        position: absolute;
        top: 33%;
        ${direction === 'right' ? `right: ${right}px` : `left:  ${left}px`};
        height: 104px;
    width: 47px;
        justify-content: center;
        border-radius: 5%;
        cursor: pointer;
        align-items: center;
        transition: transform ease-in 0.1s;
  
        &:hover {
          transform: scale(1.1);
        }
        box-shadow: 1px 2px 10px -1px rgb(0 0 0 / 30%);
    background-color: hsla(0,0%,100%,.98);
        img {
          transform: translateX(${direction === 'left' ? '-2' : '2'}px);
  
          &:focus {
            outline: 0;
          }
        }
      `}
    >
      {direction === 'right' ? <img src={rightArrow} /> : <img src={leftArrow} />}
    </div>
  )
}

export default Arrow
