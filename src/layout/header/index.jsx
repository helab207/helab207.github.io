import  { Component } from 'react'
// import styles from './index.css'
import './index.css'
import Logo from '../logo/index'
import Menu from '../menu/index'
import RightContent from '../rightContent/index'

export default class Index extends Component {

  render() {
    return (
      <div className='header'>
        <Logo/>
        <Menu/>
        <RightContent/>
      </div>
    )
  }
}
