import React from 'react'
import * as R from 'ramda'
import { hot } from 'react-hot-loader'
import Button from './components/Button'
import Input from './components/Input'
import Modal from './components/Modal'
import Menu from './components/Menu'

import './style/master.scss'

class Demo extends React.Component {
  state = {
    showModal: false,
    showMenu: false,
  }

  toggleState = (key) => () => this.setState(state => ({ [key]: R.not(state[key]) }))
  
  render = () =>
    <div>
      <Menu
	visible={this.state.showMenu}
	toggle={this.toggleState('showMenu')}
      items={[ {text: 'Dashboard', onClick: () => alert('Test')},
	       {text: 'Settings', subItems: [{ text: 'Profile' },
					     {
					       text: 'Configuration',
					       subItems: [{ text: 'Payments'}, {text: 'Invoices'}]
					     }] },
		 {text: 'Activity', onClick: () => alert('Test 2')}, ]}
      />
      <Modal
	visible={this.state.showModal}
	toggle={this.toggleState('showModal')}
	title='Login'
	alignContent='center'
	footer={<>
	  <Button text='Sign up'/>
	  <Button text='Login' type='save' className='fr' />
	</>}
      >
	<div className='spaced-vertical'>
	  <Input placeholder='Email' /><br />
	  <Input placeholder='Password' type='password' /><br />
	  <Input placeholder='Age' type='number' /><br />
	</div>
      </Modal>
      <div className='center' style={{ zIndex: -1 }}>
	<Button text='Show Modal' onClick={this.toggleState('showModal')} />
	<Button text='Show Menu' onClick={this.toggleState('showMenu')} />
      </div>
    </div>
}

export default hot(module)(Demo);
