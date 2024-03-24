import React, { Component } from 'react'
import Viewer from './viewer'
import  {BaseContext} from '../../BaseContext'


export default class index extends Component {



  render() {
    return (
      <div style={{width:'100%',height:'calc( 100% - 120px )'}}>
        <BaseContext.Consumer>
        {(props)=>{
            return   <Viewer height={props.screenHeight}></Viewer>
        }}
        </BaseContext.Consumer>
      </div>
    )
  }
}
