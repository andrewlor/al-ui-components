import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import Button from '../Button'
import { IoIosClose } from 'react-icons/io'

import './Modal.scss'

export default class Modal extends React.PureComponent {
  
  render = () =>
    <>
      <div className='outer-modal' />
      	<div className='modal'>
	  <Button
	    icon={<IoIosClose />}
	    onClick={this.props.onClose}
	    type='ghost'
	    className='square'
	  />
	  <br />
	  {this.props.children}
	</div>
    </>
}

Modal.propTypes = {}
