import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { classNames } from '../../common/utils'

import './Input.scss'

export default class Input extends Component {

    computeClassNames = () =>
        R.join(' ', [ 'input' ])

    handleChange = e =>
        R.pipe(
            R.when(
                R.always(this.props.type === 'number'),
                Number
            ),
            this.props.onChange
        )(e.target.value)

    isValid = () =>
        this.props.isValid(this.props.value)

    invalidMsg = () =>
        R.isEmpty(this.props.invalidMsg) ? '[Invalid]' : `[${this.props.invalidMsg}]`

    render = () =>
        <div className='input-wrapper'>
            <p
                className={classNames([
                    'label',
                    [ R.not(this.isValid()), 'invalid' ]
                ])}
            >{`${this.props.label} ${this.isValid() ? '' : this.invalidMsg()}`}</p>
            {
                this.props.type === 'textarea'
                    ? <textarea
                        value={this.props.value}
                        onChange={this.handleChange}
                        className={this.computeClassNames()}
                        onBlur={this.props.onBlur}
                        onFocus={this.props.onFocus}
                        placeholder={this.props.label}
                        rows={this.props.rows}
                        cols={this.props.cols}
                    />
                    : <input
                        value={this.props.value}
                        onChange={this.handleChange}
                        className={this.computeClassNames()}
                        type={this.props.type}
                        onBlur={this.props.onBlur}
                        onFocus={this.props.onFocus}
                        placeholder={this.props.label}
                        step={this.props.step}
                        min={this.props.min}
                        max={this.props.max}
                    />
            }
        </div>
}

Input.propTypes = {
    type: PropTypes.oneOf([ 'text', 'textarea', 'number', 'password' ]),
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    label: PropTypes.string,
    isValid: PropTypes.func,
    invalidMsg: PropTypes.string,
}

Input.defaultProps = {
    type: 'text',
    onChange: R.F,
    value: '',
    onBlur: R.F,
    onFocus: R.F,
    label: '',
    isValid: R.T,
    invalidMsg: '',
}
