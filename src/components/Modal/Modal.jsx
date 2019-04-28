import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import Button from '../Button/Button'
import { IoIosClose } from 'react-icons/io'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './Modal.scss'
import '../../style/transitions.scss'

export default class Modal extends React.PureComponent {

  computeContentClassNames = () =>
    R.join(' ', ['content', this.props.alignContent])

  renderModal = () =>
    (this.props.visible ? () =>
      <div key={1}>
	<div className='outer-modal' />
	<div className='modal' >
	  <Button
	    icon={<IoIosClose />}
	    onClick={this.props.toggle}
	    type='ghost'
	    className='square'
	  />
	  <h2 className='title'>{this.props.title}</h2>
	  <br />
	  <div className='content-wrapper'>
	    <div className={this.computeContentClassNames()}>
	      {this.props.children}
	    </div>
	    <div className='footer'>
	      {this.props.footer}
	    </div>
	  </div>
	</div>
      </div> : R.F)()
  
  render = () =>
    <ReactCSSTransitionGroup
      transitionName='fade'
      transitionEnterTimeout={200}
      transitionLeaveTimeout={200}
    >
      {this.renderModal()}
    </ReactCSSTransitionGroup>
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  alignContent: PropTypes.oneOf(['left', 'right', 'center']),
}

Modal.defaultProps = {
  alignContent: 'left',
}
