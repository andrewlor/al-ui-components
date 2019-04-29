import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import './Toggle.scss'

const Toggle = ({ on, onToggle, label, leftLabel, rightLabel, showBackgroundWhenOff }) =>
    <div className='toggle-wrapper'>
        <p className='label'>{R.defaultTo(label, leftLabel)}</p>
        <div
            className={R.join(' ', [ 'toggle', on || showBackgroundWhenOff ? '' : 'off' ])}
            onClick={onToggle}
        >
            <div
                className={R.join(' ', [ 'ball', on ? 'left' : 'right' ])}
            />
        </div>
        <p className='label'>{rightLabel}</p>
    </div>

Toggle.propTypes = {
    on: PropTypes.bool,
    onToggle: PropTypes.func,
    label: PropTypes.string,
    leftLabel: PropTypes.string,
    rightLabel: PropTypes.string,
    showBackgroundWhenOff: PropTypes.bool,
}

Toggle.defaultProps = {
    on: false,
    onToggle: R.F,
    showBackgroundWhenOff: false,
}

export default Toggle