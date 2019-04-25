import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import './Input.scss'

export default class Input extends Component {

    computeClassNames = () =>
        R.join(' ', ['input'])

    handleChange = e =>
        R.pipe(
            R.when(
                R.always(this.props.type === 'number'),
                Number
            ),
            this.props.onChange
        )(e.target.value)

    render = () =>
        <div className='input-wrapper'>
            <p className='label'>{this.props.label}</p>
            <input
                value={this.props.value}
                onChange={this.handleChange}
                className={this.computeClassNames()}
                type={this.props.type}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                placeholder={this.props.label}
            />
        </div>
}

Input.propTypes = {
    type: PropTypes.oneOf(['text', 'textarea', 'number', 'password']),
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    label: PropTypes.string,
}

Input.defaultProps = {
    type: 'text',
    onChange: R.F,
    value: '',
    onBlur: R.F,
    onFocus: R.F,
    label: '',
}
