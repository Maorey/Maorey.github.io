import React from 'react'
import {Button} from 'antd'
import axios from 'axios'

export default class Sub1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
  }
  componentDidMount() {
    axios.get('blogs/快速入门MapboxGL.md')
      .then( (response) => {console.log(response);
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
      <div >
        <Button>Sub1</Button>
        <textarea>{this.state.data}</textarea>
      </div>
    )
  }
}
