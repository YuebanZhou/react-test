// 引入app组件样式文件
import './App.css'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
// 登录页
import Login from './containers/Login'
import Home from './containers/Home'

function App() {
	return (
		<div className="App">
			<HashRouter>
				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/home" component={Home}></Route>
					<Route path="/" component={Login}></Route>
				</Switch>
			</HashRouter>
		</div>
	)
}

export default App;
