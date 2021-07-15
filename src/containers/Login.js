import './Login.less'
import React from 'react';
// 登录页背景图
import bgImg from '@A/images/loginBg.jpg'
// 输入三元素的图标
import loginCode from '@A/images/loginCode.png'
import loginPer from '@A/images/loginPer.png'
import loginPwd from '@A/images/loginPwd.png'
// 公共封装js
import commonApi from '@A/api/commonApi'
// element消息提醒组件
import { Message } from 'element-react';
// loading组件
import Loading from '@C/Loading'
// 图标

// 登录模块整体
class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userName: "",//用户名
			password: "",//密码
			code: "",//验证码
			codeImg: "",//验证码图片
			shouLoading: false//是否显示loading
		}
	}
	// 获取验证码
	getImage() {
		let param = {}
		commonApi.postApi('/getCode', param).then((res) => {
			let num = parseInt(Math.random() * 5)
			if (res.data.code === "1") {
				this.setState({
					codeImg: res.data.data.list[num].image
				})
			}
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
		if (type === 'enter') {
			dom.className = "btn active"
		} else {
			dom.className = "btn"
		}
	}
	submit() {
		this.setState({
			shouLoading: true
		})
		let param = {
			userName: this.state.userName,
			password: this.state.password,
			code: this.state.code,
		}
		commonApi.postApi('/login', param).then((res) => {
			this.setState({
				shouLoading: false
			})
			if (res.data.code === "1") {
				if (res.data.data.verifySuccess === 'success') {
					Message.success('登录成功');
					this.props.history.push('/home')
				} else {
					Message.error('用户名或密码错误');
				}
			} else {
				Message.error('数据请求错误');
			}
		}).catch((err) => {
			this.setState({
				shouLoading: false
			})
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
				{
					this.state.shouLoading ? (<Loading />) : null
				}
				<div className="imgBlock">
					<img src={bgImg} alt="" title="" />
				</div>
				<div className="msgBlock">
					<div className="title">react测试系统</div>
					<div className="item">
						<div className="label">
							<img src={loginCode} alt="" title="" />
						</div>
						<div className="val">
							<input placeholder="请输入账号" onChange={(e) => { this.changeName(e) }} value={this.state.userName} />
						</div>
					</div>
					<div className="item">
						<div className="label">
							<img src={loginPer} alt="" title="" />
						</div>
						<div className="val">
							<input type="password" placeholder="请输入密码" onChange={(e) => { this.changePwd(e) }} value={this.state.password} />
						</div>
					</div>
					<div className="item">
						<div className="label">
							<img src={loginPwd} alt="" title="" />
						</div>
						<div className="val valSmall">
							<input placeholder="请输入验证码" onChange={(e) => { this.changeCode(e) }} value={this.state.code} />
						</div>
						<div className="codeImg">
							<img src={this.state.codeImg} alt="" title="" />
						</div>
						<div className="changeCode" onClick={() => { this.getImage() }}>换一张</div>
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
