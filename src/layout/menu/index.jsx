import  { Component, useState,useEffect } from 'react'
import './index.css'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import React, { memo } from 'react'

// eslint-disable-next-line react/display-name
const index = memo(() => {
    const defaultMenuList=[
        {
            label: 'Home',
            key: '/home',
        },
        {
            label: 'Charts',
            key: '/charts',
        }, {
            label: 'Maps',
            key: '/maps',
        }
    ]
    const [items, setItems] = useState(defaultMenuList)
    useEffect(()=>{
        const currentPath=window.location.hash
        const currentRouter=defaultMenuList.find((r)=>{
            return currentPath.indexOf(r.key)!=-1
        })
        if(currentRouter!=null){
            setCurrentSelectKey(currentRouter.key)
        }
    },[])
    const [currentSelectKey,setCurrentSelectKey]=useState('/charts')
    const navigate=useNavigate()
    const handleClick = (record) => {
        navigate(record.key)
        setCurrentSelectKey(record.key)
    }
    const renderMenus = () => {
        return items.map((r) => {
            return <div onClick={() => { handleClick(r) }} className='custom-menu ' style={{ fontWeight: currentSelectKey == r.key ? '500' : '300', }} key={r.key}>
                <span className='custom-menu-content hvr-underline-from-center'>
                    {
                        r.label
                    }
                </span>
            </div>
        })
    }
    return (
        <div style={{ width: '40%', display: 'flex' }}>
            {renderMenus()}
        </div>
    )
})

export default index

// export default class index extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             items: ,
//             selectedKeys: [],
//             currentSelectKey: 'charts'
//         }
//     }

//     renderMenus = () => {
//         return this.state.items.map((r) => {
//             return <div onClick={() => { this.handleClick(r) }} className='custom-menu' style={{ fontWeight: this.state.currentSelectKey == r.key ? '500' : '300', }} key={r.key}>
//                 <span className='custom-menu-content'>
//                     {
//                         r.label
//                     }
//                 </span>
//             </div>
//         })
//     }

//     render() {
//         return (
//             <div style={{ width: '40%', display: 'flex' }}>
//                 {this.renderMenus()}
//             </div>
//         )
//     }
// }
