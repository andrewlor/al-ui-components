import React from 'react'

import './Section.scss'

export default class Section extends React.PureComponent {

    render = () =>
        <div className='section'>
            <h1>{this.props.title}</h1>
            <p>{this.props.body}</p>
        </div>
}
