// 引入app组件样式文件
import './App.css'
// 游戏组件
import Game from './containers/Square'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Switch>
                    <Route path="/game" component={Game}></Route>
                </Switch>
            </HashRouter>
        </div>
    )
}

export default App;
