import './Home.less'
import React from 'react';
// 获取首页背景图
import banner1 from '@A/images/banner1.jpg'
// 公共封装js
import commonApi from '@A/api/commonApi'
// element消息提醒组件
import { Message } from 'element-react';
// loading组件
import Loading from '@C/Loading'
// 右侧组件
import HomeMain from './pages/HomeMain'
import HomeObject from './pages/HomeObject'
import HomeObjectDetail from './pages/HomeObjectDetail'
import HomeTechnology from './pages/HomeTechnology'
import HomeAbout from './pages/HomeAbout'
class Home extends React.Component {
	constructor(props) {
		super(props)
		// 根据传参定位到菜单的某项
		if (this.props.location.state && this.props.location.state.clickMenu) {
			sessionStorage.setItem('clickMenu', this.props.location.state.clickMenu)
		}
		this.state = {
			hoverMenu: null,
			clickMenu: sessionStorage.getItem('clickMenu') ?
				sessionStorage.getItem('clickMenu') : 0,
			menuArr: [],//菜单及链接
			myArr: [],//我的个人信息
			shouLoading: false,//是否显示loading
			activeCompanyId: ''//选中的公司的id，作为父组件用来给两个子组件传值
		}
	}
	componentDidMount() {
		// 初始化
		// 获取个人信息、菜单列表
		this.getUserInfo()
	}
	// 获取个人信息、菜单列表
	getUserInfo() {
		this.setState({
			shouLoading: true
		})
		let param = {}
		commonApi.getApi('/getUserInfo', param).then((res) => {
			this.setState({
				shouLoading: false
			})
			if (res.data.code === "1") {
				this.setState({
					menuArr: res.data.data.menuArr,
					myArr: res.data.data.myArr,
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
	// 菜单悬浮第一级
	selectMenuLev1(e, index) {
		let element = document.getElementsByClassName('lev1Name')[index]
		this.setState({
			hoverMenu: index
		})
		if (element.classList.length === 1) {
			element.className = "lev1Name active";
		} else {
			if (this.state.hoverMenu === this.state.clickMenu) {
				// 如果悬浮的是当前的菜单，不做移出类名的操作
				element.className = "lev1Name active";
			} else {
				element.className = "lev1Name";
			}

		}
	}
	// 菜单悬浮第二级
	selectMenuLev2(e) {
		if (e.target.classList.length === 1) {
			e.target.classList.add('active');
		} else {
			e.target.classList.remove('active');
		}
	}
	// 点击一级菜单
	clickMenu(index) {
		// 点击一级菜单，更新clickMenu，动态改变一级菜单的active
		this.setState({
			clickMenu: index
		})
		sessionStorage.setItem('clickMenu', index)
	}

	// 切换公司列表、项目详情事件
	changeCompany(item, flag) {
		if (flag === '1') {
			// 公司列表跳转到项目
			this.setState({
				clickMenu: 5,
				activeCompanyId: item.id
			})
			sessionStorage.setItem('clickMenu', 5)
		} else if (flag === '2') {
			// 公司列表跳转到项目
			this.setState({
				clickMenu: 2,
			})
			sessionStorage.setItem('clickMenu', 2)
		}

	}
	render() {
		var sectionStyle = {
			backgroundImage: `url(${banner1})`,
			backgroundSize: "100% 100%"
		};
		return (
			<div id="Home" style={sectionStyle}>
				{
					this.state.shouLoading ? (<Loading />) : null
				}
				<div className="headMenu">
					<div className="posiBlock">
						{
							this.state.menuArr.map((item, index) => {
								return (
									<div className="lev1Menu" key={index}>
										<div className={Number(this.state.clickMenu) === index ? "lev1Name active" : "lev1Name"}
											onMouseEnter={(e) => { this.selectMenuLev1(e, index) }}
											onMouseLeave={(e) => { this.selectMenuLev1(e, index) }}
											onClick={() => { this.clickMenu(index) }}
										>{item.name}</div>
										{
											item.children.length === 0 ? null : (
												<div className={Number(this.state.hoverMenu) === index ? "lev2Menu active" : "lev2Menu"}
													onMouseLeave={(e) => {
														this.setState({
															hoverMenu: null
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
				<div className="listMenu">
					<div className="left">
						<div className="headImg">
							<div className="myname">YuebanZhou</div>
							<img src={banner1} alt="" title="" />
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
						{
							this.state.shouLoading ? null : (
								Number(this.state.clickMenu) === 0 ? <HomeMain /> :
									Number(this.state.clickMenu) === 1 ? <HomeTechnology /> :
										Number(this.state.clickMenu) === 2 ? <HomeObject parent={this} /> :
											Number(this.state.clickMenu) === 3 ? <HomeAbout /> :
												<HomeObjectDetail parent={this} />
							)
						}
					</div>
				</div>
			</div >
		)
	}
}
export default Home;
