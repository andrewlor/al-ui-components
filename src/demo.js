import React from 'react'
import { hot } from 'react-hot-loader'
import Button from './components/Button'
import Input from './components/Input'

class Demo extends React.Component {
  render = () =>
    <div>
      <Input placeholder='Email' />
      <Button text='Normal' onClick={() => alert('Click')} />
      <Button text='Cancel' type='cancel' />
      <Button text='Save' type='save' />
    </div>
}

export default hot(module)(Demo);
