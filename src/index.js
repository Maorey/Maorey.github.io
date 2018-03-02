import React from "react";
import { render } from "react-dom";
import { Layout, Menu, Icon } from "antd";
import Promise from "es6-promise";
import nav from "./commom/nav";
import createBrowserHistory from "history/createBrowserHistory";
// BrowserRouter first，please url不能定位搞个球啊
import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom";
import './index.scss'
// import Background from './components/background'

Promise.polyfill();

const { Header, Sider, Footer, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.hashChangeHandle = this.hashChangeHandle.bind(this)
  }
  state = {
    collapsed: false
  };
  hashChangeHandle(){
    window.scrollTo(0, 0);
  }
  componentWillMount() {
    // if use HashRouter, the follow code will be uesfull for auto scrolling page to the top of page.
    window.addEventListener(
      "hashchange",
      this.hashChangeHandle,
      false
    );
  }
  componentWillUnmount(){
    window.removeEventListener('hashchange',this.hashChangeHandle)
  }
  getRoute = nav => {
    return nav.map(ele => {
      if (ele.child) {
        return this.getRoute(ele.child);
      }
      if (ele.component) {
        return (
          <Route
            key={ele.route}
            exact
            path={ele.route}
            component={ele.component}
          />
        );
      }
    });
  };
  getMenuItem = nav => {
    return nav.map(ele => {
      if (ele.child) {
        return <Menu.SubMenu className='sub-menu' key={ele.route} title={ele.title}>{this.getMenuItem(ele.child)}</Menu.SubMenu>;
      }
      return (
        <Menu.Item key={ele.route}>
          <Link to={ele.route}>{ele.title}</Link>
        </Menu.Item>
      );
    });
  };
  render() {
    return (
        <Router>
          <Layout>
            <Sider breakpoint="lg" collapsedWidth="0" onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }} className='cus-sider' width={250} >
              <div className="logo">
                <h1>博客</h1>
              </div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]} className='menu'>
                {this.getMenuItem(nav)}
              </Menu>
            </Sider>
            <Layout>
              <Header>
                暂未完成，关注 <a href="https://github.com/Maorey/Maorey.github.io">Maorey.github.io</a> 查看进度
              </Header>
              <Content style={{ margin: "24px 16px 0" }}>
                {/* <Background/> */}
                <div style={{ padding: 24, minHeight: 360 }}>
                  {this.getRoute(nav)}
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                毛瑞 ©2018 本站累计访问： xx 次  <a href='https://github.com/Maorey'>Maorey</a>
              </Footer>
            </Layout>
          </Layout>
        </Router>
    );
  }
}

render(<App />, document.getElementById("root"));

// import React from 'react'
// import { render } from 'react-dom'
// import { createStore, combineReducers } from 'redux'
// import { Provider } from 'react-redux'
// // import { browserHistory } from 'react-router'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
// import { BrowserRouter as Router, Route, Link, browserHistory } from 'react-router-dom'
// debugger
// const store = createStore(
//   combineReducers({
//     routing: routerReducer
//   })
// )
// const history = syncHistoryWithStore(browserHistory, store)
// render(
//   <Provider store={store}>
//     <Router history={history}>
//       <Route path="/" component={() => (
//         <div>
//           <h1>Home <Link to="/#about">About</Link></h1>
//           <h1>Home <Link to="/#other">Other</Link></h1>
//         </div>
//       )}/>
//         <Route path="/#about" component={() => (<h1>About <Link to="/">Home</Link></h1>)}/>
//         <Route path="/#other" component={() => (<h1>Other <Link to="/">Home</Link></h1>)}/>
//     </Router>
//   </Provider>,
//   document.getElementById('root'),
// )