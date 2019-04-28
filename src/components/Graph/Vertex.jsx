import React from 'react'

import './Vertex.scss'

class Vertex extends React.PureComponent {
  render = () =>
    <div className='vertex-container'>
      <div
	className='vertex'
	onClick={this.props.handleClick}
	ref={this.props.reference}
      >
	<p
	  className='label'
	  id={this.props.label}
	>
	  {this.props.label}
	</p>
      </div>
    </div>
}

export default Vertex
