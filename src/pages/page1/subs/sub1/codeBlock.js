import React from 'react'
import PropTypes from 'prop-types'
import hljs from "highlight.js"
import './styles/codeStyle.css'
import './styles/imageStyle.css'

export default class codeBlock extends React.PureComponent {
  static defaultProps = {
    language: ''
  }
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  }
  constructor(props) {
    super(props)
    this.setRef = this.setRef.bind(this)
  }
  setRef(el) {
    this.codeEl = el
  }
  componentDidMount() {
    this.highlightCode()
  }
  componentDidUpdate() {
    this.highlightCode()
  }
  highlightCode() {
    hljs.highlightBlock(this.codeEl)
  }
  render() {
    return (
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    )
  }
}