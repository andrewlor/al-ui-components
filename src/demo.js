import React from 'react'
import * as R from 'ramda'
import { hot } from 'react-hot-loader'
import Button from './components/Button'
import Input from './components/Input'
import Modal from './components/Modal'

class Demo extends React.Component {
  state = {
    showModal: false
  }

  updateStateValue = key => value => this.setState(R.assoc(key, value))

  toggleModal = () => this.setState(state => ({ showModal: R.not(state.showModal) }))

  renderModal = () =>
    this.state.showModal ? <Modal onClose={this.toggleModal}>
      <Input placeholder='Email' />
      <br />
      <Button text='Normal' onClick={() => alert('Click')} />
      <Button text='Cancel' type='cancel' />
      <Button text='Save' type='save' />
    </Modal> : null
  
  render = () =>
    <div>
      <Button text='Show Modal' onClick={this.toggleModal} />
      {this.renderModal()}
    </div>
}

export default hot(module)(Demo);
