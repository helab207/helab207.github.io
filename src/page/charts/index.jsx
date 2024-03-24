import React, { Component } from 'react'
import { Tabs } from 'antd'
import { Switch, Space, Select } from 'antd';
import SubChart from './subChart'
import MainChart from './mainChart'
import GlobalLevel from './globalLevel'
import SystemLevel from './systemLevel'
import 'hover.css'
import './index.css'

export default class index extends Component {
    constructor(props) {
        super(props)
        const offsetHeight = document.getElementsByTagName('body')[0].offsetHeight
        this.state = {
            screenHeight: offsetHeight,
            layout: 'inline',
            currentSelectMoudle: 'system_levle'
        }
    }

    componentDidMount() {
        this.resize()
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.addEventListener('resize', this.resize)
    }

    resize = () => {
        const offsetHeight = document.getElementsByTagName('body')[0].offsetHeight
        this.setState({
            screenHeight: offsetHeight
        })
    }

    renderSelectTitle = () => {
        const GLOBAL_LEVEL = { key: 'global_level', title: 'Global level', icon: <img src='./icon/global.svg' /> }
        const SYSTEM_LEVEL = { key: 'system_levle', title: 'System level', icon: <img src='./icon/system.svg' /> }
        const VERTEX_LEVEL = { key: 'vertex_level', title: 'Vertex level', icon: <img src='./icon/vertex.svg' /> }
        const renderList = [GLOBAL_LEVEL, SYSTEM_LEVEL, VERTEX_LEVEL]
        return renderList.map((record, index) => {
            const isSelect = this.state.currentSelectMoudle == record.key
            return <div onClick={() => {
                this.changeSelectModel(record)
            }} key={record.title} className='charts-select-wrapper'>
                <div style={{ width: '20%', display: 'flex', justifyItems: 'center', justifyContent: 'center' }}>{record.icon}</div>
                <div style={{ textShadow: isSelect ? '0px 0px 4px rgb(207 220 228 / 91%)' : null }} className='charts-select-tittle hvr-underline-from-center'>{record.title}</div>
            </div>
        })
    }

    changeSelectModel = (record) => {
        this.setState({
            currentSelectMoudle: record.key
        })
    }


    renderContent = () => {
        if (this.state.currentSelectMoudle == 'global_level') {
            return (<GlobalLevel screenHeight={this.state.screenHeight} />)
        }
        if (this.state.currentSelectMoudle == 'system_levle') {
            return <SystemLevel screenHeight={this.state.screenHeight} style={{ height: this.state.screenHeight - 310 }}></SystemLevel>
        }
        if (this.state.currentSelectMoudle == 'vertex_level') {
            return <div style={{ height: this.state.screenHeight - 310 }}>vertex_level</div>
        }
    }

    render() {

        return (
            <div style={{ padding: 40, background: '#f4f9fb', }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {this.renderSelectTitle()}
                </div>
                <div style={{ marginTop: 40 }}>
                    {this.renderContent()}
                </div>
            </div>
        )
    }
}
