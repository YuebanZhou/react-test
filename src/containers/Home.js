import './Home.less'
import React from 'react';
// 获取首页背景图
import banner1 from '../asserts/images/banner1.jpg'
// 公共封装js
import commonApi from '../asserts/api/commonApi'
// element消息提醒组件
import { Message } from 'element-react';
// loading组件
import Loading from '../components/Loading'
class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			activeMenu: null,
			activeList: null,
			menuArr: [],//菜单及链接
			myArr: [],//我的个人信息
			techArr: [],//展示列表
			shouLoading: false//是否显示loading
		}
	}
	// 获取个人信息
	getUserInfo() {
		this.setState({
			shouLoading: true
		})
		let param = {}
		commonApi.getApi('/getUserInfo', param).then((res) => {
			this.setState({
				shouLoading: false
			})
			if (res.data.code == 1) {
				this.setState({
					menuArr: res.data.data.menuArr,
					myArr: res.data.data.myArr,
					techArr: res.data.data.techArr,
				})
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
	// 菜单选择第一级
	selectMenuLev1(e, index) {
		this.setState({
			activeMenu: index
		})
		if (e.target.classList.length == 1) {
			e.target.classList.add('active');
		} else {
			e.target.classList.remove('active');
		}
	}
	// 菜单选择第二级
	selectMenuLev2(e) {
		if (e.target.classList.length == 1) {
			e.target.classList.add('active');
		} else {
			e.target.classList.remove('active');
		}
	}
	// 悬浮菜单
	hoverList(e, index) {
		this.setState({
			activeList: index
		})
	}
	componentDidMount() {
		// 初始化获取验证码
		this.getUserInfo()
	}
	render() {
		return (
			<div className="homeBlock">
				{
					this.state.shouLoading ? (<Loading />) : null
				}
				<div className="headMenu">
					<div className="posiBlock">
						{
							this.state.menuArr.map((item, index) => {
								return (
									<div className="lev1Menu" key={index}>
										<div className="lev1Name"
											onMouseEnter={(e) => { this.selectMenuLev1(e, index) }}
											onMouseLeave={(e) => { this.selectMenuLev1(e, index) }}
										>{item.name}</div>
										{
											item.children.length == 0 ? null : (
												<div className={this.state.activeMenu == index ? "lev2Menu active" : "lev2Menu"}
													onMouseLeave={(e) => {
														this.setState({
															activeMenu: null
														})
													}}>
													{
														item.children.map((childItem, childIndex) => {
															return (
																<div className="lev2Name"
																	key={index + '-' + childIndex}
																	onMouseEnter={(e) => { this.selectMenuLev2(e) }}
																	onMouseLeave={(e) => { this.selectMenuLev2(e) }}
																>{childItem.name}</div>
															)
														})
													}
												</div>
											)
										}

									</div>
								)

							})

						}
					</div>

				</div>
				<div className="bannerMenu">
					<img src={banner1} />
				</div>
				<div className="listMenu">
					<div className="left">
						<div className="headImg">
							<div className="myname">标题栏</div>
							<img src={banner1} />
						</div>
						<div className="msgList">
							{
								this.state.myArr.map((item, index) => {
									return (
										<div className="sinMsg" key={index}>
											<div className="label">{item.name}</div>
											<div className="val">{item.msg}</div>
										</div>
									)

								})
							}
						</div>
					</div>
					<div className="right">
						<div className="techList">
							{
								this.state.techArr.map((item, index) => {
									return (
										<div className={this.state.activeList == index ? "sinTech active" : "sinTech"}
											key={index}
											onMouseEnter={(e) => { this.hoverList(e, index) }}
											onMouseLeave={(e) => { this.hoverList(e, null) }}>
											<div className="name">{item.name}</div>
											<div className="percent">{item.percent}</div>
										</div>
									)

								})
							}
						</div>
					</div>
				</div>
			</div >
		)
	}
}
export default Home;
