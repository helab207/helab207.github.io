// 引入依赖项
import { Navigate,useRoutes } from 'react-router-dom'
import React,{ lazy } from 'react'
import Charts from './page/charts/index.jsx'
import Home from './page/home/index'
import Maps from './page/maps/index'
// 懒加载


const GetRouters = () => {
    const routes = useRoutes([
        {
            path:'/',
            element:<Navigate  to='/maps' />,
        },
        {
            path: '/charts',
            element:<Charts/>
        },
        {
            path: '/maps',
            element:<Maps/>
        },
        {
            path: '/home',
            element:<Home/>
        },
        // 默认路由

    ])
    return routes
}

export default GetRouters
