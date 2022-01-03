import React, { useState, useEffect, useRef } from 'react';
import SliderContent from './SliderContent';
import { css, cx } from '@emotion/css'
import Slide from './Slide';
import Arrow from './Arrow';
import Dots from './Dots';

const getWidth = () => window.innerWidth

const Slider = (props) => {

  const [state, setState] = useState({
    activeSlide: 0,
    translate: 0,
    transition: 0.45
  })

  const { translate, transition, activeSlide } = state

  const autoPlayRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide
  })

  useEffect(() => {
    const play = () => {
      autoPlayRef.current()
    }

    if (props.autoPlay !== null) {
      const interval = setInterval(play, props.autoPlay * 1000)
      return () => clearInterval(interval)
    }
  }, [props.autoPlay])

  const nextSlide = () => {
    if (activeSlide === props.slides.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeSlide: 0,
        transition: 0.10
      })
    }

    setState({
      ...state,
      activeSlide: activeSlide + 1,
      translate: (activeSlide + 1) * getWidth(),
      transition: 0.45
    })
  }

  const prevSlide = () => {
    if (activeSlide === 0) {
      return setState({
        ...state,
        translate: (props.slides.length - 1) * getWidth(),
        activeSlide: props.slides.length - 1,
        transition: 0.10
      })
    }

    setState({
      ...state,
      activeSlide: activeSlide - 1,
      translate: (activeSlide - 1) * getWidth(),
      transition: 0.45
    })
  }

  return (
    <div className={SliderCSS}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * props.slides.length}

      >
        {props.slides.map((slide) => (
          <Slide key={slide} content={slide} />
        ))}
      </SliderContent>


      <Arrow direction="left" handleClick={prevSlide} left={0} />
      <Arrow direction="right" handleClick={nextSlide} right={0} />



      <Dots slides={props.slides} activeSlide={activeSlide} />

    </div>
  )
}

Slider.defaultProps = {
  slides: [],
  autoPlay: null
}

const SliderCSS = css`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  width: 1511px;
  height: 272px;
  margin: auto;
`


export default Slider