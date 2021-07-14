import './Home.less'
import React from 'react';
import ReactDOM from 'react-dom';
import banner1 from '../asserts/images/banner1.jpg'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			activeMenu: null,
			activeList: null
		}
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
	render() {
		let menuArr = [
			{
				name: "首页",
				link: "",
				children: []
			}, {
				name: "多次",
				link: "",
				children: [
					{
						name: "多次1",
						link: "",
					}, {
						name: "多次2",
						link: "",
					}, {
						name: "多次3",
						link: "",
					}
				]
			}, {
				name: "其他",
				link: "",
				children: [
					{
						name: "其他1",
						link: "",
					}, {
						name: "其他2",
						link: "",
					}
				]
			}, {
				name: "关于",
				link: "",
				children: []
			}
		]
		let myArr = [
			{
				name: "信息1",
				msg: "内容111111"
			}, {
				name: "信息2",
				msg: "内容2222222222222222"
			}, {
				name: "信息3333",
				msg: "内容"
			}, {
				name: "信息44444444",
				msg: "内容444444444"
			}, {
				name: "信息5",
				msg: "内容555555"
			}, {
				name: "信息6",
				msg: "内容666"
			}
		]
		let techArr = [
			{
				name: "技能1",
				percent: "80"
			},
			{
				name: "技能2",
				percent: "30"
			},
			{
				name: "技能3",
				percent: "50"
			},
			{
				name: "技能4",
				percent: "60"
			},
			{
				name: "技能5",
				percent: "10"
			}
		]
		return (
			<div className="homeBlock">
				<div className="headMenu">
					<div className="posiBlock">
						{
							menuArr.map((item, index) => {
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
								myArr.map((item, index) => {
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
								techArr.map((item, index) => {
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
