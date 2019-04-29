import React from 'react'

import './Card.scss'

export default class Card extends React.PureComponent {
    render = () =>
        <div className='card'>
            {this.props.children}
        </div>
}
