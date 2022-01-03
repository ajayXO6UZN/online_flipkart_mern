import React from 'react'
import { css, cx } from '@emotion/css'

const Slide = ({ content, width }) => {
  return (
    <div
      className={css`
        height: 100%;
        width: 100%;
        background-image: url('${content}');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      `}
    />
  )
}

export default Slide
