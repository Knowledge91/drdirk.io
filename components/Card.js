import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import makeCarousel from 'react-reveal/makeCarousel';
import withReveal from '../components/withReveal'
import Fade from 'react-reveal/Fade'
import PropTypes from 'prop-types'
import { faFilePdf, faLink} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

const Card = (props) => (
  <StyledGrid {...props}>
    <StyledCard {...props}>
      <svg width="0" height="0">
	      <linearGradient id="lgrad" x1="100%" y1="100%" x2="0%" y2="0%" >
		      <stop offset="0%" style={{stopColor: '#bae7f1', stopOpacity: 1}} />
		      <stop offset="100%" style={{stopColor: '#65d2e9', stopOpacity: 1}} />
	      </linearGradient>
      </svg>
      {props.header && <h4>{props.header}</h4>}
      {props.icon && <StyledIcon icon={props.icon} /> }
      <h1>{props.title}</h1>

      {props.subtitle && <ReactMarkdown source={props.subtitle}/>}
      {props.timeline === 'professional' && <Link><PortfolioA href="/portfolio">Show projects</PortfolioA></Link> }
      {displayAttachements(props)}
    </StyledCard>
  </StyledGrid>
)
Card.propTypes = {
  backgroundColor: PropTypes.string,
  dark: PropTypes.bool,
  full: PropTypes.bool,
  gradient: PropTypes.number,
  textAlign: PropTypes.string
}

const displayAttachements = (entry) => {
  return (
    <Attachements>
      {entry.pdfs && entry.pdfs.map((e) => <a key={entry[1]} href={`static/attachements/${entry[1]}`} download><FontAwesomeIcon icon={faFilePdf} /></a>)}
      {entry.gits && entry.gits.map((e) => <a key={entry[1]} href={entry[1]} target="_blank"><FontAwesomeIcon icon={faGithub} /></a>)}
      {entry.youtubeLinks && entry.youtubeLinks.map((e) => <a key={e} href={e} target="_blank"><FontAwesomeIcon icon={faYoutube} /></a>)}
      {entry.webs && entry.webs.map((e) => <a key={e} href={e} target="_blank"><FontAwesomeIcon icon={faLink} /></a>)}
    </Attachements>
  )
}
const addLineBreaks = string =>
      string.split('\n').map((text, index) => (
        <React.Fragment key={`${text}-${index}`}>
          {text}
          <br />
        </React.Fragment>
      ));




const StyledGrid = styled.div`
  ${(props) => props.full && `
    grid-column-start: 1;
    grid-column-end: 3;
  `}
`
const StyledCard = withReveal(styled.div`
  display: flex;
  justify-content: space-between;
  algin-items: center;
  flex-direction: column;
  width: 100%;
  padding: 60px;
  margin-bottom: 20px;
  text-align: ${(props) => props.textAlign ? props.textAlign : 'center'};
  border-radius: 12px;
  color: ${(props) => props.dark ? 'white' : 'black'};
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 4px 6px 0px;
  background-color: ${(props) => props.backgroundColor ? props.backgroundColor : 'rgb(249, 250, 252)'};
  ${function(props) {
    switch(props.gradient) {
        case 1:
          return `background-image: linear-gradient(261.3deg, rgb(251, 242, 232) 0%, rgb(255, 237, 217) 99.84%);`
        case 2:
          return `background-image: linear-gradient(24.28deg, rgb(195, 228, 223) 0%, rgb(237, 250, 242) 100.94%);`
        case 3:
          return `background-image: linear-gradient(335.08deg, rgb(149, 187, 206) -0.56%, rgb(197, 208, 230) 46.04%, rgb(231, 228, 246) 100%);`
        default: return ''
    }
  }}
  > h1 {
    margin: 0;
    margin-bottom: 25px;
  }
  > h4 {
    margin: 0;
    margin-bottom: 25px;
  }
  > p {
    margin: 0;
    font-family: FontLight;
    font-size: 1.2rem;
  }
 `, <Fade />)

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 100px;
  margin: 0 auto 0 auto;
  path {
    fill: url(#lgrad);
  }
`

const Attachements = styled.div`
  display: flex;
  justify-content: flex-end;
  > a {
    color: ${props => props.theme.colors.primary};
    font-size: 2rem;
    margin-right: 20px;
  }
`

const PortfolioA = styled.a`
  position: absolute;
  bottom: 30px;
`
export default Card
