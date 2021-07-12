import './Login.less'
import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import bgImg from '../asserts/images/loginBg.jpg'

import axios from 'axios'
// 图标
import {
    UserOutlined,
    LockOutlined,
} from '@ant-design/icons';

// 登录模块整体
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            password: ""
        }
    }
    // 改变账号
    changeName(e) {
        this.setState({
            userName: e.target.value
        })
    }
    // 改变密码
    changePwd(e) {
        this.setState({
            password: e.target.value
        })
    }
    // 提交按钮添加动画效果
    toggleAniBtn(e, type) {
        let dom = document.getElementsByClassName('btn')[0]
        if (type == 'enter') {
            dom.className = "btn active"
        } else {
            dom.className = "btn"
        }
    }
    submit() {
        let param = {
            username: this.state.userName,
            password: this.state.password,
        }
        console.log(this.state)
        this.props.history.push('/home')
        return

        axios.get('http://9ce8afc47730.ngrok.io/login', { params: param }).then((res) => {
            console.log(res)
            // this.props.history.push('/child02')
        }).catch(() => { })

    }
    render() {
        return (
            <div className="loginBlock">
                <div className="imgBlock">
                    <img src={bgImg} />
                </div>
                <div className="msgBlock">
                    <div className="title">react测试系统</div>
                    <div className="item">
                        <div className="label">
                            <UserOutlined />
                        </div>
                        <div className="val">
                            <input placeholder="请输入账号" onChange={(e) => { this.changeName(e) }} value={this.state.userName} />
                        </div>
                    </div>
                    <div className="item">
                        <div className="label">
                            <LockOutlined />
                        </div>
                        <div className="val">
                            <input type="password" placeholder="请输入密码" onChange={(e) => { this.changePwd(e) }} value={this.state.password} />
                        </div>
                    </div>
                    <div className="btn"
                        onClick={() => { this.submit() }}
                        onMouseEnter={(e) => { this.toggleAniBtn(e, 'enter') }}
                        onMouseLeave={(e) => { this.toggleAniBtn(e, 'leave') }}
                    >
                        <span className="ani1"></span>
                        <span className="ani2"></span>
                        登录
                    </div>
                </div>

            </div>
        )
    }
}
export default (Login);
