import React, { Fragment } from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'

import './CodeBlock.scss'

const CodeBlock = React.memo(({ code }) =>
    <div className='code-block'>
        {
            R.pipe(
                R.split('\n'),
                R.map(
                    (line, index) =>
                        R.pipe(
                            R.map(R.when(R.equals(" "), R.always("\u00A0"))),
                            R.join(''),
                            str => <Fragment key={index}>{str}<br/></Fragment>
                        )(line)
                )
            )(code)
        }
    </div>
)

CodeBlock.propTypes = {
    code: PropTypes.string
}

export default CodeBlock
