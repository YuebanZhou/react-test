import './Login.less'
import React from 'react';
import bgImg from '../asserts/images/loginBg.jpg'
import loginCode from '../asserts/images/loginCode.png'
import loginPer from '../asserts/images/loginPer.png'
import loginPwd from '../asserts/images/loginPwd.png'
import commonApi from '../asserts/api/commonApi'
import { Message } from 'element-react';
// 图标

// 登录模块整体
class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userName: "",
			password: "",
			code: "",
			codeImg: "",
		}
	}
	// 获取验证码
	getImage() {
		let param = {}
		commonApi.getApi('/getCaptchaCode', param).then((res) => {
			this.setState({
				codeImg: res.data.data.code
			})
			sessionStorage.setItem('token', res.data.data.token)
			console.log(res)
		}).catch((err) => {
			console.log(err)
		})
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
	// 改变验证码
	changeCode(e) {
		this.setState({
			code: e.target.value
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
			code: this.state.code,
		}
		commonApi.getApi('/login', param).then((res) => {
			if (res.code == 1) {
				this.props.history.push('/home')
			} else {
				Message.error('数据请求错误');
			}
		}).catch((err) => {
			Message.error('数据请求错误');
		})
	}
	componentDidMount() {
		// 初始化获取验证码
		this.getImage()
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
							<img src={loginCode} />
						</div>
						<div className="val">
							<input placeholder="请输入账号" onChange={(e) => { this.changeName(e) }} value={this.state.userName} />
						</div>
					</div>
					<div className="item">
						<div className="label">
							<img src={loginPer} />
						</div>
						<div className="val">
							<input type="password" placeholder="请输入密码" onChange={(e) => { this.changePwd(e) }} value={this.state.password} />
						</div>
					</div>
					<div className="item">
						<div className="label">
							<img src={loginPwd} />
						</div>
						<div className="val valSmall">
							<input placeholder="请输入验证码" onChange={(e) => { this.changeCode(e) }} value={this.state.code} />
						</div>
						<div className="codeImg">
							<div dangerouslySetInnerHTML={{ __html: this.state.codeImg }} />
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
