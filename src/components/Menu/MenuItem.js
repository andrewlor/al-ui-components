import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'
import { IconContext } from 'react-icons'

import './Menu.scss'
import '../../style/transitions.scss'
import '../../style/master.scss'

export default class MenuItem extends React.PureComponent {
  state = {
    open: false,
  }

  hasSubItems = () => R.not(R.isNil(this.props.subItems))

  toggleOpen = () => this.setState(state => ({ open: R.not(state.open) }))

  computeClassName = () =>
    R.join(' ', ['item', (this.props.first ? 'first' : '')])

  renderItem = (item, index) =>
    <MenuItem
      key={index}
      text={item.text}
      subItems={item.subItems}
      onClick={R.isNil(item.subItems) ? item.onClick : R.F}
      indent={this.props.indent + 1}
    />
    
    render = () =>
    <>
      <div
	onClick={this.hasSubItems() ? this.toggleOpen : this.props.onClick}
	className={this.computeClassName()}
      >
	<div className='text-box'>
	  {Array.from(Array(this.props.indent * 5).keys())
		.map(x => <div key={x} className='spacing-quantum-square'/>)}
	  {this.hasSubItems() ?
	   (this.state.open ? <IoIosArrowDown /> : <IoIosArrowForward />) : null}
	  <p>{this.props.text}</p>
	</div>
      </div>
      <ReactCSSTransitionGroup
	transitionName='expand-vertical'
	transitionEnterTimeout={500}
	transitionLeaveTimeout={500}
      >
	{R.ifElse(
	   R.always(this.state.open),
	   R.pipe(
	     R.map(this.renderItem),
	     items => <div>{items}</div>
	   ),
	   R.always(null)
	)(this.props.subItems)}
      </ReactCSSTransitionGroup>
    </>
}

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
  subItems: PropTypes.array,
  onClick: PropTypes.func,
  indent: PropTypes.number,
  first: PropTypes.bool,
}

MenuItem.defaultProps = {
  indent: 0,
}
