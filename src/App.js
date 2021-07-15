// 引入app组件样式文件
import './App.less'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
// 登录页
import Login from './containers/Login'
import Home from './containers/Home'

function App() {
	return (
		<div id="App">
			<HashRouter>
				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/home" component={Home}></Route>
					<Route path="/" component={Login}></Route>
					<Redirect to="/login" component={Login}></Redirect>
				</Switch>
			</HashRouter>
		</div>
	)
}

export default App;
