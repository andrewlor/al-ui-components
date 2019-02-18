import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import './Card.scss'

export default class Card extends React.PureComponent {
  
  render = () =>
    <div className='card'>
      {this.props.children}
    </div>
}
