import React from 'react'
import classNames from 'classnames'
import './index.less'

const Icon = props => {
  let url = require(`./symbol-defs.svg`)
  let { name, size, color, style, className } = props
  name = `icon-${name}`
  return (
    <svg
      style={{
        width: size + 'px',
        height: size + 'px',
        fill: color,
        ...style
      }} 
      className={classNames('icon', { [className]: !!className })}>
      {<use xlinkHref={`${url}#${name}`}></use>}
    </svg>
  )
}
Icon.defaultProps = {
  color: 'currentColor',
  strokeWidth: 0,
  stroke: 'currentColor',
  fill: 'currentColor',
  size: 16
}
export default Icon