import React from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './codeBlock'
import './styles/imageStyle.css'

export default class Sub1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
  }
  componentDidMount() {
    axios.get('blogs/快速入门MapboxGL.md')
      .then( (response) => {
        this.setState({
          data:response.data
        });
      })
      .catch( (error) => {
        console.log(error);
      });
  }
  render() {
    return (
        <ReactMarkdown source={this.state.data} renderers={{"code": CodeBlock}}/>
    )
  }
}