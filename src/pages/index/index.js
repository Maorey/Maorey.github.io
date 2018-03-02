import React from 'react'
import axios from 'axios'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '加载中...'
    };
  }
  scrollTo (tar) {
    var tar_dom = document.getElementById(tar)
    var _offsetParet = tar_dom.offsetParent
    var top = tar_dom.offsetTop
    while (_offsetParet) {
      top += _offsetParet.offsetTop
      _offsetParet = _offsetParet.offsetParent
    }
  }
  componentDidMount () {
    axios.get('blogs/blogs.json')
    .then(res=>{
      let html=''
      res.data.forEach(element=>{
        html += `<a href='#/page1/sub1'>${element.title}</a><br/>`
      });
      this.setState({
        data: html
      });
    })
    .catch(err=>console.log(err))
  }

  render () {
    return (
      <div dangerouslySetInnerHTML={{ __html:this.state.data}}/>
    )
  }
}
