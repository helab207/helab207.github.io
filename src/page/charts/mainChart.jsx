import React, { Component } from 'react'
import Plotly from 'plotly.js-dist-min'
import * as d3 from 'd3'
import _ from 'lodash'

export default class mainChart extends Component {
    constructor(props){
        super(props)
        this.state={
            mainRecordIndex:2
        }
        this.resizeDebounce=_.debounce(this.resize,60)
    }


    componentDidMount() {
        this.init()
        window.addEventListener('resize',this.resizeDebounce)
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.resizeDebounce)
    }

    resize=()=>{
        if(this.plotInstance!=null){
            Plotly.newPlot(this.props.containerId, this.state.data,  this.getLayout(), { displayModeBar: true,displaylogo: false ,scrollZoom: true});
        }
    }

    init = async () => {
        const data = await this.getData()
        const layout = this.getLayout()
        this.setState({
            data,
            layout
        },()=>{
            this.plotInstance=Plotly.newPlot(this.props.containerId, data, layout, { displayModeBar: true,displaylogo: false,scrollZoom: true });
        })
    }

    getLayout = () => {
        const { width, height } = document.getElementById(this.props.containerId).getBoundingClientRect()
        return {
            width: width,
            height: height - 10,
            margin: {
                t: 10,
                b: 30,
                r: 30,
                l: 60
            },
            xaxis: {
                color:'#8ba9b0',
                showgrid: false,
                showline: false,
                showticklabels: true,
                zeroline: false,
            },
            yaxis: {
                color:'#8ba9b0',

                showgrid: true,
                griddash:'dash',
                gridcolor:'#e4e9ff',
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
            line:{color:'#2446B1',dash: 'dot',},
            x: [],
            y: [],
        }
        const yaxisLowData = {
            ...baseStyle,
            x: [],
            y: [],
            fill: "tozerox",
            fillcolor: "#B4C0E4",
            line: { color: "transparent" },
        }

        const axisData=this.getAxisData(data,yaxisData,yaxisLowData)
        return axisData
    }



    getAxisData=(data,mainColumnDataBaseStyle,subColumnDataBaseStyle)=>{
        const xAxiszColumn=this.props.xAxiszColumn
       if(this.props.column!=null&&this.props.column.length>0){
        const columnDataList=[]
         this.props.column.forEach((record,recordIndex)=>{
            const mainColumn=record[0]
            const lowColumn=record[1]
            const heightColumn=record[2]
            let mainColumnData=JSON.parse(JSON.stringify({...mainColumnDataBaseStyle}))
            let subColumnData=JSON.parse(JSON.stringify({...subColumnDataBaseStyle}))
            if(recordIndex==this.state.mainRecordIndex){

                mainColumnData={...mainColumnData,fill:'#2446B1'}
                subColumnData={...subColumnData,fillcolor:'#2446B1'}
            }
            data.forEach((item,index)=>{
                mainColumnData.x.push(item[xAxiszColumn])
                mainColumnData.y.push(item[mainColumn])
                subColumnData.x[index]=item[xAxiszColumn]
                subColumnData.x[data.length+index]=data[data.length-1-index][xAxiszColumn]
                subColumnData.y[index]=item[lowColumn]
                subColumnData.y[data.length+index]=data[data.length-1-index][heightColumn]
            })
            columnDataList.push(subColumnData,mainColumnData)

        })
        return columnDataList
       }
       return []

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
            <div style={{position:'absolute',display:'flex',alignItems:'center',width:'100%',left:-70}}>
                <div style={{transform:'rotate(-90deg)',color:'#aaa'}}>{this.props.title}</div>
            </div>
        </div>
    )
  }
}
