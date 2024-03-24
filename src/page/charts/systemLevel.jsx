import React, { Component } from 'react'
import { useState, useRef, useEffect } from 'react'
import MainChart from './mainChart'
import { Tabs, Select, Switch } from 'antd'
import SubChart from './subChart'
import BlockBrainViewer from './blockBrainViewer'

const System_levle = function (props) {
    const { screenHeight } = props
    const [layout, setLayout] = useState('inline')
    const mainRef = useRef(null)
    const subTopRef = useRef(null)
    const subBottomRef = useRef(null)
    useEffect(() => {
        console.log(mainRef)
        // mainRef.current.resize()
        // subTopRef.current.resize()
        // subBottomRef.current.resize()

    }, [layout])
    const baseHeight=screenHeight-365
    const renderMainCharts = () => {
        const yAxisColumn = [
            ['5th_centile', 'CI_low_5th', 'CI_high_5th'],
            ['25th_centile', 'CI_low_25th', 'CI_high_25th'],
            ['50th_centile', 'CI_low_50th', 'CI_high_50th'],
            ['75th_centile', 'CI_low_75th', 'CI_high_75th'],
            ['95th_centile', 'CI_low_95th', 'CI_high_95th'],
        ]
        return (
            <div style={{ width: '100%', }} >
                <Tabs
                    defaultActiveKey="1"
                    renderTabBar={(props, DefaultTabBar) => {
                        return <DefaultTabBar {...props} style={{ marginBottom: 0 }} />
                    }}
                    type="card"
                    items={[
                        {
                            key: '1',
                            label: <span>{`Global mean of FCS`}</span>,
                        },
                        {
                            key: '2',
                            label: <span>{`Global mean of FCS`}</span>,
                        }
                    ]}
                >
                </Tabs>
                <div className='charts-main-chart-wrapper' style={{ width: '100%', background: '#FFF', height:baseHeight*0.6 }}>
                    <MainChart title='Normative growth trajectory' ref={mainRef} layout={layout} xAxiszColumn='Age' column={yAxisColumn} containerId='/Plot_trajectory_demo1.csv' url='/Plot_trajectory_demo1.csv' />
                </div>
            </div>
        )
    }
    return <div style={{ display: 'flex',justifyContent:'space-between' }} >
        <div style={{ width: '42%' , height: (screenHeight - 330) }}>
            <BlockBrainViewer height={screenHeight - 330}/>
        </div>
        <div style={{ width: '55%' }}>
            {renderMainCharts()}
            <div style={{ display: 'flex',marginTop:15 ,justifyContent:'space-between'}}>
                <div className='charts-sub-chart-wrapper' style={{ height:baseHeight*0.4 ,width:'48%'}}>
                    <SubChart title='Normative variance trajectory' ref={subTopRef} lineColor='#2F92FF' fillColor='#CAE3FF' xAxiszColumn='Age' yAxisColumn={[['Growth_Rate', 'CI_low', 'CI_high']]} containerId='/Plot_trajectory_demo2.csv' url='/Plot_trajectory_demo2.csv' />
                </div>
                <div className='charts-sub-chart-wrapper' style={{ height:baseHeight*0.4 ,width:'48%'}}>
                    <SubChart title='Growth rate' ref={subBottomRef} lineColor='#FC486E' fillColor='#FEB6C5' xAxiszColumn='Age' yAxisColumn={[['Normative_variability', 'CI_low', 'CI_high']]} containerId='/Plot_trajectory_demo3.csv' url='/Plot_trajectory_demo3.csv' />
                </div>
            </div>
        </div>
    </div>
}
export default System_levle
