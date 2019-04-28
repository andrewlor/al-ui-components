import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import './Section.scss'

export default class Section extends React.PureComponent {
  
  render = () =>
    <div className='section'>
      <h1>{this.props.title}</h1>
      <p>{this.props.body}</p>
    </div>
}

Section.propTypes = {
}

Section.defaultProps = {
}
