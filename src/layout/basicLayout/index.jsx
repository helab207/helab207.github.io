import React, { Component } from 'react'
import Header from '../header/index'
import RoterConfig from '../../rouer'
import { BaseContext } from '../../BaseContext'
import _ from 'lodash'



export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            screenHeight: 0
        }
        this.resizeDebounce = _.debounce(this.resize, 60)
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeDebounce)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeDebounce)
    }
    resize = () => {
        const offsetHeight = document.getElementsByTagName('body')[0].offsetHeight
        this.setState({
            screenHeight: offsetHeight
        })
    }
    render() {
        const config = { screenHeight: this.state.screenHeight }
        return (
            <div style={{height:'100vh'}}>
                <Header />
                <BaseContext.Provider value={config}>
                    <RoterConfig></RoterConfig>
                </BaseContext.Provider>

            </div>
        )
    }
}
