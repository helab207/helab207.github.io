import { useEffect, useState, useRef } from 'react'
import {
    SurfaceViewer,
    ColorMaps,

} from '../../../lib/my-lib.es'
const defaultColor = [
    [0.2, [162 / 255, 81 / 255, 172 / 255]],
    [0.2, [120 / 255, 164 / 255, 192 / 255]],
    [0.2, [64 / 255, 162 / 255, 50 / 255]],
    [0.2, [224 / 255, 101 / 255, 255 / 255]],
    [0.2, [246 / 255, 253 / 255, 201 / 255]],
    [0.2, [239 / 255, 185 / 255, 67 / 255]],
    [0.2, [217 / 255, 113 / 255, 125 / 255]],
]
const colorLabel=[
    'A','B',"C",'D','E','F'
]

const BlockBrainViewer = (props) => {
    const viewerContainerId = 'blockBrainViewer'
    const surfaceViewerRef = useRef(null)
    const loadGiftiIntensity = async (url, modelName, showColorMap, underNodelName) => {
        const response = await fetch(url)
        const blob = await response.blob()
        const file = new File([blob], '')
        await surfaceViewerRef.current.handleGiftiIntensityFile(file, modelName, {
            modelName: underNodelName,
            colorMap: defaultColor,
        })

    }
    const loadGii = () => {
        return new Promise((res) => {

            fetch('/右脑底板_S1200.R.midthickness_MSMAll.32k_fs_LR.surf.gii').then((response) => {
                response.blob().then((b) => {
                    const file = new File([b], '')
                    surfaceViewerRef.current.handleGiftiFile(file, 'main1', { pick_ignore: true }).then(() => {
                        res({})
                    })
                })
            })
            fetch('/左脑底板_S1200.L.midthickness_MSMAll.32k_fs_LR.surf.gii').then((response) => {
                response.blob().then((b) => {
                    const file = new File([b], '')
                    surfaceViewerRef.current.handleGiftiFile(file, 'main2', { pick_ignore: true }).then(() => {
                        res({})
                    })
                })
            })
        })
    }

    const loadGiftiIntensityList = () => {
        loadGiftiIntensity('./右脑脑区_Atlas19_25_yeo7_fsLR32k_R.label.gii', 'Underlay1', true, 'main1')
        loadGiftiIntensity('./左脑脑区_Atlas19_25_yeo7_fsLR32k_L.label.gii', 'Underlay2', true, 'main2')
        surfaceViewerRef.current.setPickOnChange((v, view) => {
            const { object } = v
            const pickModelName = object.name

            const modelData = surfaceViewerRef.current.getModelDataByName(pickModelName)
            const handleResult = modelData.handlePickOnChange(v, view)
            if (handleResult != null) {
                let otherPickModelName = 'Underlay1'
                if (pickModelName == 'Underlay1') {
                    otherPickModelName = 'Underlay2'
                }
                const modelData = surfaceViewerRef.current.getModelDataByName(otherPickModelName)
                modelData.handlePickOnChange({ intensityValue: handleResult.targetIntensityValue }, view)
            }
        })
    }

    const viewerInit = async () => {
        const el = document.getElementById(viewerContainerId)
        if (el != null) {
            surfaceViewerRef.current = new SurfaceViewer({
                containerId: viewerContainerId,
                labelRender: true,
                keyCameraControl: true,
                backgroundColor: 0xFFFFFF,
            })
            const cameraControll = surfaceViewerRef.current.getCameraControll()
            cameraControll.zoomTo(0.08, false)
        }
        surfaceViewerRef.current.updateLookPostion({ x: 0, y: 1, z: 0 })
        await loadGii()
        loadGiftiIntensityList()

    }
    const renderBlockColorLable=()=>{
        return defaultColor.map((reocrd,index)=>{
            const color=`rgb(${reocrd[1][0]*255} ${reocrd[1][1]*255} ${reocrd[1][2]*255} )`
            console.log(color)
            return <div key={index} style={{background:color,width:38,height:15,marginBottom:15,borderRadius:2}}>
            </div>
        })
    }
    useEffect(() => {
        viewerInit()
    }, [])
    useEffect(() => {

        const dom = document.getElementById(viewerContainerId)
        surfaceViewerRef.current.updateSize(dom.clientWidth, dom.clientHeight)
        surfaceViewerRef.current.updated = true
    }, [props.height])
    return (
        <div className='charts-sub-chart-wrapper' style={{ width: '100%', height: '100%',padding:10,background:'#FFF',display:'flex'}}>
            <div style={{ width: 'calc(100% - 120px)', height: 'calc(100% )', position: 'relative' }} id={viewerContainerId}>
            </div>
            <div style={{width:120,paddingTop:20,paddingLeft:5}}>
                {renderBlockColorLable()}
            </div>
        </div>

    )
}
export default BlockBrainViewer
