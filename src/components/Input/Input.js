import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import './Input.scss'

export default class Input extends React.PureComponent {

  computeClassNames = () =>
    R.join(' ', ['input'])
  
  render = () =>
    <input
      className={this.computeClassNames()}
      type={this.props.type}
      onChange={this.props.onChange}
      onBlur={this.props.onBlur}
      placeholder={this.props.placeholder}
    />
}

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'textarea', 'number']),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
}
