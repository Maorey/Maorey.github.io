import React from 'react'
import All from './libs/all'
import './style/background.scss'

class Background extends React.Component {
		componentDidMount(){
			All();
		}
		render() {
				return (
						<div bgcolor="#FFFFFF" id="index" className="home" link="#000000" vlink="#000000">
								<div id="maindiv">
										<canvas id="main" width="1920" height="1080" style={{cursor:'default'}}/>
								</div>
								<div id="removeDiv" style={{display:'none'}}></div>
						</div>
				)
		}
}
const toggle = All.inter;
export {Background, toggle}