import React, { Component } from 'react'
import * as d3 from 'd3'
import Plotly from 'plotly.js-dist-min'
import _ from 'lodash'
export default class subChart extends Component {

    constructor(props) {
        super(props)
        this.resizeDebounce = _.debounce(this.resize, 100)
        this.state = {

        }
    }
    componentDidMount() {
        this.init()
        window.addEventListener('resize', this.resizeDebounce)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeDebounce)
    }

    init = async () => {
        const data = await this.getData()
        const layout = this.getLayout()
        this.setState({
            data,
            layout
        }, () => {
            this.plotInstance = Plotly.newPlot(this.props.containerId, data, layout, { displayModeBar: false, scrollZoom: true });
        })
    }

    resize = () => {
        if (this.plotInstance != null) {
            Plotly.newPlot(this.props.containerId, this.state.data, this.getLayout(), { displayModeBar: false, scrollZoom: true });
        }
    }

    getLayout = () => {
        const { width, height } = document.getElementById(this.props.containerId).getBoundingClientRect()
        return {
            width: width,
            height: height - 10,
            // responsive: true,
            margin: {
                t: 0,
                b: 50,
                r: 30,
                l: 60
            },
            xaxis: {
                color: '#8ba9b0',
                showgrid: false,
                showline: false,
                showticklabels: true,
                zeroline: false,
            },
            yaxis: {
                color: '#8ba9b0',

                showgrid: true,
                griddash: 'dash',
                gridcolor: '#e4e9ff',
                showline: false,
                showticklabels: true,
                zeroline: false
            }
        }
    }
    getData = async () => {
        const { url, xAxiszColumn, yAxisColumn } = this.props
        const response = await fetch(url)
        const text = await response.text();
        const data = d3.csvParse(text, d3.autoType);
        const baseStyle = {
            line: { color: "rgb(231,107,243)" },
            showlegend: false,
            type: "scatter"
        }
        const yaxisData = {
            ...baseStyle,
            mode: "lines",
            name: "Fair",
            line: { color: this.props.lineColor },
            x: [],
            y: [],
        }
        const yaxisLowData = {
            ...baseStyle,
            x: [],
            y: [],
            fill: "tozerox",
            fillcolor: this.props.fillColor,
            line: { color: "transparent" },
        }
        const xDataLow = []
        const xDataHigh = []
        const yLowData = []
        const yHighData = []
        data.forEach((record, index) => {
            yaxisData.x.push(record[xAxiszColumn])//标准X轴曲线
            yaxisData.y.push(record[yAxisColumn[0][0]])//标准Y轴曲线
            xDataLow.push(record[xAxiszColumn])
            xDataHigh.push(data[data.length - index - 1][xAxiszColumn])
            yLowData.push(record[yAxisColumn[0][1]])
            yHighData.push(data[data.length - index - 1][yAxisColumn[0][2]])
        })
        yaxisLowData.x = [...xDataLow, ...xDataHigh]
        yaxisLowData.y = [...yLowData, ...yHighData]
        return [yaxisLowData, yaxisData]
    }
    render() {
        return (
            <div style={{
                padding: '10px',
                height: '100%',
                width: '100%',
                display: 'flex',
                placeContent: 'center',
                placeItems: 'center',
                position:'relative'
            }}>
                <div style={{ height: 'calc(100% - 40px)', width: 'calc(100% - 40px)' }} id={this.props.containerId}></div>
                <div style={{ position: 'absolute', justifyContent:'center',justifyItems:'center',bottom:35 }}>
                    <div style={{ color:'#aaa'}}>{this.props.title}</div>
                </div>
            </div>

        )
    }
}
