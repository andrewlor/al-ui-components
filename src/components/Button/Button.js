import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { IconContext } from 'react-icons'

import './Button.scss'

export default class Button extends React.PureComponent {

  computeClassNames = () =>
    R.join(' ', [this.props.type, this.props.className, 'button'])

  renderContent = () =>
    this.props.text ? this.props.text :
		      <IconContext.Provider value={{ size: '2em' }}>
			{this.props.icon}
		      </IconContext.Provider>
		      
  
  render = () =>
    <button
      onClick={this.props.onClick}
      className={this.computeClassNames()}
    >
      {this.renderContent()}
    </button>
}

Button.propTypes = {
  type: PropTypes.oneOf(['save', 'cancel', 'ghost']),
  text: PropTypes.string,
  icon: PropTypes.node,
}
