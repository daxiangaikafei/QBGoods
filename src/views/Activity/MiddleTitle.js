import React from 'react'
import classNames from 'classnames'
import styles from './channelEntry.less'
import CSSModules from 'react-css-modules'

const MiddleTitle = ({ title, className, today }) => {
  return (
    <div styleName={classNames('middle-title', className, { 'today': today })}>
      {today ? <span styleName="title-bg"></span> : ''}
      {title}
      {today ? <span styleName="title-bg right"></span> : ''}
    </div>
  )
}
MiddleTitle.defaultProps ={
  title: '',
  styleName: '',
  today: false
}

export default CSSModules(MiddleTitle, styles, { allowMultiple: true })