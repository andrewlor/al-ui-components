import React from 'react'
import * as R from 'ramda'
import { hot } from 'react-hot-loader'
import Button from './components/Button'
import Input from './components/Input'
import Modal from './components/Modal'
import Menu from './components/Menu'
import Card from './components/Card'
import Section from './components/Section'

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
                items={[ { text: 'Dashboard', onClick: () => alert('Test') },
                    {
                        text: 'Settings', subItems: [ { text: 'Profile' },
                            {
                                text: 'Configuration',
                                subItems: [ { text: 'Payments' }, { text: 'Invoices' } ]
                            } ]
                    },
                    { text: 'Activity', onClick: () => alert('Test 2') }, ]}
            />
            <Modal
                visible={this.state.showModal}
                toggle={this.toggleState('showModal')}
                title='Login'
                alignContent='center'
                footer={<>
                    <Button text='Sign up'/>
                    <Button text='Login' type='save' className='fr'/>
                </>}
            >
                <div className='spaced-vertical'>
                    <Input placeholder='Email'/><br/>
                    <Input placeholder='Password' type='password'/><br/>
                    <Input placeholder='Age' type='number'/><br/>
                </div>
            </Modal>
            <div className='center' style={{ zIndex: -1 }}>
                <Card>
                    <Button text='Show Modal' onClick={this.toggleState('showModal')}/>
                    <Button text='Show Menu' onClick={this.toggleState('showMenu')}/>
                </Card>
                <Card>
                    <Section
                        title={"Section"}
                        body={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lorem leo, dictum sed erat tincidunt, sodales eleifend velit. Aliquam eleifend interdum dignissim. Phasellus accumsan elit velit. Maecenas eu diam nec felis tincidunt mollis quis nec enim. Fusce tincidunt lorem sit amet leo varius convallis. Morbi eget justo id neque fermentum volutpat vel ut erat. Sed scelerisque quam vel nulla imperdiet pharetra. Nulla facilisi. Praesent semper mollis nibh, id auctor magna laoreet quis. Suspendisse potenti. Mauris ultricies cursus eleifend. Ut a dolor quis lectus porta maximus quis et justo. Suspendisse dapibus suscipit erat, ut cursus nulla tempus sed. Morbi eu tempus augue. Nam diam orci, lobortis molestie fringilla ut, varius sed sem. \n\n Sed sed gravida velit. Nulla viverra non arcu quis suscipit. Nulla quis posuere quam. In non quam lectus. Cras volutpat consectetur turpis non tristique. Nam ullamcorper, lacus interdum aliquet lacinia, urna nisl luctus ligula, fringilla semper lorem quam in nisl. Integer a consequat quam. Morbi porttitor lacus at sem bibendum, id pharetra dolor egestas. Suspendisse a suscipit felis. Vivamus finibus nisl quis augue vehicula, quis faucibus elit condimentum. Maecenas cursus dignissim pretium. Mauris cursus nunc lacus, sit amet pretium massa rhoncus sed."}
                    />
                </Card>
            </div>
        </div>
}

export default hot(module)(Demo);
