import { Tabs, Select, Switch } from 'antd'
import { useState, useRef ,useEffect} from 'react'
import MainChart from './mainChart'
import SubChart from './subChart'
const Index = function (props) {
    const { screenHeight } = props
    const [layout, setLayout] = useState('inline')
    const mainRef = useRef(null)
    const subTopRef = useRef(null)
    const subBottomRef = useRef(null)
    useEffect(()=>{
        console.log(mainRef)
        mainRef.current.resize()
        subTopRef.current.resize()
        subBottomRef.current.resize()

    },[layout])
    const renderMainCharts = () => {
        const yAxisColumn = [
            ['5th_centile', 'CI_low_5th', 'CI_high_5th'],
            ['25th_centile', 'CI_low_25th', 'CI_high_25th'],
            ['50th_centile', 'CI_low_50th', 'CI_high_50th'],
            ['75th_centile', 'CI_low_75th', 'CI_high_75th'],
            ['95th_centile', 'CI_low_95th', 'CI_high_95th'],
        ]
        return (
            <div style={{ width: '100%', height: '100%' }} >
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
                <div className='charts-main-chart-wrapper' style={{ width: '100%', background: '#FFF', height: (screenHeight - 400) }}>
                    <MainChart title='Normative growth trajectory' ref={mainRef} layout={layout} xAxiszColumn='Age' column={yAxisColumn} containerId='/Plot_trajectory_demo1.csv' url='/Plot_trajectory_demo1.csv' />
                </div>
            </div>
        )
    }
    return <div>
        <div style={{ display: 'flex', justifyItems: 'end', justifyContent: 'end' }} className='customer-select-wrapper'>
            <div>
                <Select style={{ width: 130, borderRadius: 20 }}>
                    <Select.Option value='all'>All Chart</Select.Option>
                    <Select.Option value='male'>Male Chart</Select.Option>
                    <Select.Option value='female'>Female Chart</Select.Option>
                </Select>
            </div>
            <div style={{ marginLeft: 20, display: 'flex', placeContent: 'center', placeItems: 'center', transform: 'scale(1.3)' }}>
                <Switch
                    checkedChildren={<img src='' />}
                    unCheckedChildren={<img src='./' />}
                    checked={layout == 'inline'}
                    onChange={(v) => {
                        console.log(v)
                        if (!v) {
                            setLayout('noInline')
                        } else {
                            setLayout('inline')

                        }
                    }}
                />
            </div>
        </div>
        {layout == null ? null :
            layout == 'inline' ? (
                <div style={{ marginTop: 15, display: 'flex', justifyContent: 'space-between', height: '100%' }}>
                    <div style={{ width: '63%' }}>
                        {renderMainCharts()}
                    </div>

                    <div style={{ width: '35%', display: 'flex', flexDirection: 'column' }}>
                        <div className='charts-sub-chart-wrapper' style={{ height: (screenHeight - 384) / 2 }}>
                            <SubChart
                                title='Normative variance trajectory'
                                ref={subTopRef}
                                lineColor='#2F92FF'
                                fillColor='#CAE3FF'
                                xAxiszColumn='Age'
                                yAxisColumn={[['Growth_Rate', 'CI_low', 'CI_high']]}
                                containerId='/Plot_trajectory_demo2.csv'
                                url='/Plot_trajectory_demo2.csv'
                            />
                        </div>
                        <div style={{ marginTop: 20, height: (screenHeight - 384) / 2 }} className='charts-sub-chart-wrapper'>
                            <SubChart
                                title='Growth rate'
                                ref={subBottomRef}
                                lineColor='#FC486E'
                                fillColor='#FEB6C5'
                                xAxiszColumn='Age'
                                yAxisColumn={[['Normative_variability', 'CI_low', 'CI_high']]}
                                containerId='/Plot_trajectory_demo3.csv'
                                url='/Plot_trajectory_demo3.csv'
                            />
                        </div>
                    </div>
                </div>
            ) : (<div style={{ marginTop: 15, display: 'flex', justifyContent: 'space-between', height: '100%' }}>
                <div style={{ width: '52%', height: '100%' }} >
                    {renderMainCharts()}
                </div>
                <div style={{ width: '22%', display: 'flex', flexDirection: 'column' }}>
                    <div className='charts-sub-chart-wrapper' style={{ height: (screenHeight - 384) / 2 }}>
                        <SubChart title='Normative variance trajectory' ref={subTopRef} lineColor='#2F92FF' fillColor='#CAE3FF' xAxiszColumn='Age' yAxisColumn={[['Growth_Rate', 'CI_low', 'CI_high']]} containerId='/Plot_trajectory_demo2.csv' url='/Plot_trajectory_demo2.csv' />
                    </div>
                </div>
                <div style={{ width: '22%', display: 'flex', flexDirection: 'column' }}>
                    <div className='charts-sub-chart-wrapper' style={{ height: (screenHeight - 384) / 2 }}>
                        <SubChart title='Growth rate' ref={subBottomRef} lineColor='#FC486E' fillColor='#FEB6C5' xAxiszColumn='Age' yAxisColumn={[['Normative_variability', 'CI_low', 'CI_high']]} containerId='/Plot_trajectory_demo3.csv' url='/Plot_trajectory_demo3.csv' />
                    </div>
                </div>
            </div>
            )
        }
    </div>
}
export default Index
