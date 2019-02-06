import React from 'react'
import { hot } from 'react-hot-loader'
import Button from './components/Button'

class Demo extends React.Component {
  render = () =>
    <div>
      <Button text='Normal' onClick={() => alert('Click')} />
      <Button text='Cancel' type='cancel' />
      <Button text='Save' type='save' />
    </div>
}

export default hot(module)(Demo);
