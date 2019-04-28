import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import Button from '../Button/Button'
import { IoIosClose } from 'react-icons/io'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import MenuItem from './MenuItem'

import './Menu.scss'
import '../../style/transitions.scss'
import '../../style/master.scss'

export default class Menu extends React.PureComponent {
  renderItem = (item, index) =>
    <MenuItem
      key={index}
      text={item.text}
      subItems={item.subItems}
      onClick={R.isNil(item.subItems) ? () => {
	  item.onClick();
	  this.props.toggle();
      } : R.F}
      first={R.equals(index, 0)}
      last={R.equals(index, this.props.items.length - 1)}
    />

  renderMenu = () =>
    (this.props.visible ? () =>
      <div className='menu'>
	<Button
	  icon={<IoIosClose />}
	  onClick={this.props.toggle}
	  type='ghost'
	  className='square'
	/>
	<div className='scroll-box'>
	  {this.props.items.map(this.renderItem)}
	</div>
      </div> : R.F)()
  
  render = () =>
    <ReactCSSTransitionGroup
      transitionName='left-swipe'
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
    >
      {this.renderMenu()}
    </ReactCSSTransitionGroup>
}

Menu.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

Menu.defaultProps = {
  items: [],
}
