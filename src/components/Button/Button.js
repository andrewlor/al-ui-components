import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import './Button.scss'

export default class Button extends React.PureComponent {

  computeClassNames = () =>
    R.join(' ', [this.props.type, 'button'])
  
  render = () =>
    <button
      onClick={this.props.onClick}
      className={this.computeClassNames()}
    >
      {this.props.text}
    </button>
}

Button.propTypes = {
  type: PropTypes.oneOf(['save', 'cancel'])
}
