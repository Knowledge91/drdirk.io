import React, {Fragment, useState, useCallback} from 'react'
import {useSpring, animated} from 'react-spring'
import styled from 'styled-components'
import Link from 'next/link'
import useEventListener from './useEventListener'
import Sidebar from './Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const [scrollPos, setScrollPos] = useState({y: window.scrollY})
  const [width, setWidth] = useState(window.innerWidth)
  const [isOpen, setIsOpen] = useState(false)

  const handleScroll = useCallback(
    () => {
      const scrollY = window.scrollY
      setScrollPos({y: scrollY})
    }, [setScrollPos]
  )
  const handleResize = useCallback(
    () => {
      const width = window.innerWidth
      setWidth(width)
    }, [setWidth]
  )

  useEventListener('scroll', handleScroll, window)
  useEventListener('resize', handleResize, window)

  const isScrolled = (scrollPos.y > 15) ? true : false
  const props = useSpring({
    height: (isScrolled) ? '40px' : '64px',
    lineHeight: (isScrolled) ? '40px' : '64px',
    backgroundColor: (isScrolled) ? 'rgba(28, 29, 35, 0.8)' : 'rgba(28, 29, 35, 1)'
  })

  return (
    <div style={{position: 'relative', zIndex: 5}}>
      {width > 767 ? (
        <NavigationContainer style={props}>
          <StyledUl>
            <li>
              <Link href="/"><a className="dark">Home</a></Link>
            </li>
            <li>
              <Link href="/timeline"><a className="dark">Timeline</a></Link>
            </li>
            <li>
              <img src="../static/images/logo.png" style={{height: '80%', verticalAlign: 'middle'}} />
            </li>
            <li>
              <Link href="/portfolio"><a className="dark">Portfolio</a></Link>
            </li>
            <li>
              <a className="dark" href="mailto:hello@drdirk.io">hello@drdirk.io</a>
            </li>
          </StyledUl>
        </NavigationContainer>
      ) : (
        <Fragment>
          <MobileNavigationContainer style={props}>
            <Icon icon={faBars} onClick={() => setIsOpen(true)}/>
            <img src="../static/images/logo.png" style={{height: '80%', verticalAlign: 'middle'}} />
            <div></div>
          </MobileNavigationContainer>
          <Sidebar isOpen={isOpen} close={() => setIsOpen(false)}>
            <li>
              <Link href="/"><a className="dark">Home</a></Link>
            </li>
            <li>
              <Link href="/timeline"><a className="dark">Timeline</a></Link>
            </li>
            <li>
              <Link href="/portfolio"><a className="dark">Portfolio</a></Link>
            </li>
            <li>
              <a className="dark" href="mailto:hello@drdirk.io">hello@drdirk.io</a>
            </li>
          </Sidebar>
        </Fragment>
      )}
    </div>
  )
}

export default Navbar

const NavigationContainer = styled(animated.div)`
  width: 100vw;
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 1;
`
const StyledUl = styled(animated.div)`
  list-style: none;
  display: flex;
  margin: 0;
  height: 100%;

  > li {
    color: white;
    font-family: FontRegular;
    padding: 0 50px 0 50px;
    /* line-height: 60px; */
    font-size: 17px;
    height: 100%;
    position: relative;
  }
`

const MobileNavigationContainer = styled(animated.div)`
  position: fixed;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  z-index: 1;
`
const Icon = styled(FontAwesomeIcon)`
  padding: 5px;
  color: white;
  font-size: 20px;
`
