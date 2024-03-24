import React, { Component } from 'react'
import { Slider, Form } from 'antd'
import {
    SurfaceViewer,
    ColorMaps,

} from '../../../lib/my-lib.es'
export default class viewerWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewerContainerId: 'mapViewerContainerId'
        }
        this.surfaceViewerRef = null
    }
    componentDidMount() {
        this.viewerInit()

    }

    componentDidUpdate(pre, current) {
        if (this.props.height != pre.height) {
            if (this.surfaceViewerRef != null) {
                const dom = document.getElementById(this.state.viewerContainerId)
                this.surfaceViewerRef.updateSize(dom.clientWidth, dom.clientHeight)
                this.surfaceViewerRef.updated = true
            }
        }
    }

    loadGii = () => {
        return new Promise((res) => {
            fetch('/S1200.L.midthickness_MSMAll.32k_fs_LR.surf.gii').then((response) => {
                response.blob().then((b) => {
                    console.log(b)
                    const file = new File([b], '')
                    this.surfaceViewerRef.handleGiftiFile(file, 'main1', { pick_ignore: true }).then(() => {
                        res({})
                    })
                })
            })
            fetch('/S1200.R.midthickness_MSMAll.32k_fs_LR.surf.gii').then((response) => {
                response.blob().then((b) => {
                    const file = new File([b], '')
                    this.surfaceViewerRef.handleGiftiFile(file, 'main2', { pick_ignore: true }).then(() => {
                        res({})
                    })
                })
            })
        })
    }

    loadGiftiIntensityList = () => {
        this.loadGiftiIntensity('./Vertex_meanFCSdata.L.func.gii', 'Underlay1', true, 'main1')
        this.loadGiftiIntensity('./Vertex_meanFCSdata.R.func.gii', 'Underlay2', true, 'main2')
        // loadGiftiIntensity('./fsaverage_lh_curv.curv.gii', 'Overlay', true)
        // surfaceViewer.setPickOnChange((v, view) => {
        //     const { object } = v
        //     const pickModelName = object.name

        //     const modelData = surfaceViewer.getModelDataByName(pickModelName)
        //     const handleResult = modelData.handlePickOnChange(v, view)
        //     if (handleResult != null) {
        //         let otherPickModelName = 'Underlay1'
        //         if (pickModelName == 'Underlay1') {
        //             otherPickModelName = 'Underlay2'
        //         }
        //         const modelData = surfaceViewer.getModelDataByName(otherPickModelName)
        //         modelData.handlePickOnChange({ intensityValue: handleResult.targetIntensityValue }, view)
        //     }
        // })
    }
    loadGiftiIntensity = async (url, modelName, showColorMap, underNodelName) => {
        const response = await fetch(url)
        const blob = await response.blob()
        const file = new File([blob], '')
        console.log(new ColorMaps().getColorMap('rainbow'))
        await this.surfaceViewerRef.handleGiftiIntensityFile(file, modelName, {
            modelName: underNodelName,
            colorMap: new ColorMaps().getColorMap('rainbow'),
            // isNoumenon: !showColorMap
        })


    }

    viewerInit = async () => {
        const el = document.getElementById(this.state.viewerContainerId)
        if (el != null) {
            this.surfaceViewerRef = new SurfaceViewer({
                containerId: this.state.viewerContainerId,
                labelRender: true,
                keyCameraControl: true,
                backgroundColor: 0xFFFFFF
            })
            const cameraControll = this.surfaceViewerRef.getCameraControll()
            cameraControll.zoomTo(0.08, false)
        }
        await this.loadGii()
        this.loadGiftiIntensityList()
        this.surfaceViewerRef.updateLookPostion({ x: 0, y: 1, z: 0 })
        this.surfaceViewerRef.updateAutorotate({
            z: true
        })
    }

    loadData = () => {

    }

    updateCurrentTimePoint = (v) => {
        this.surfaceViewerRef.updateIntensityIndex(v, {
            name: 'Underlay1'
        })
        this.surfaceViewerRef.updateIntensityIndex(v, {
            name: 'Underlay2'
        })
    }

    handleMouseOver=()=>{
        this.surfaceViewerRef.updateAutorotate({
            z: false
        })
    }

    handleMouseOut=()=>{
        this.surfaceViewerRef.updateAutorotate({
            z:true
        })
    }

    render() {
        const { viewerContainerId } = this.state
        return (
            <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                <div onMouseOut={this.handleMouseOut} onMouseOver={this.handleMouseOver} style={{margin:30,width:'calc( 80% - 80px )'}}>
                    <div style={{ width: '100%', height: '100%', position: 'relative' }} id={viewerContainerId}>
                    </div>
                </div>

                <div style={{ width: '20%', padding: 20, margin: 30, background: 'rgb(207 220 228 / 20%)', borderRadius: 5 }}>
                    <div style={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.4)' }}>时刻点</div>
                    <div style={{ marginTop: 25 }}><Slider onChange={this.updateCurrentTimePoint} step={1} min={0} max={8} />
                    </div>
                </div>
            </div>
        )
    }
}
