import React from 'react'
import {Button} from 'antd'
import axios from 'axios'
import hljs from 'highlight.js'

export default class Sub1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
  }
  componentDidMount() {
    const md = require('markdown-it')({
      html:         false,        // Enable HTML tags in source
      xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                                  // This is only for full CommonMark compatibility.
      breaks:       false,        // Convert '\n' in paragraphs into <br>
      langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                                  // useful for external highlighters.
      linkify:      true,        // Autoconvert URL-like text to links

      // Enable some language-neutral replacement + quotes beautification
      typographer:  true,

      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: '“”‘’',

      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externally.
      // If result starts with <pre... internal wrapper is skipped.
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }

        return ''; // use external default escaping
      }
    });
    axios.get('blogs/快速入门MapboxGL.md')
      .then( (response) => {
        this.setState({
          data:md.render(response.data)
        });
      })
      .catch( (error) => {
        console.log(error);
      });
  }
  render() {
    return (
        <div dangerouslySetInnerHTML={{ __html:this.state.data}}/>
    )
  }
}
