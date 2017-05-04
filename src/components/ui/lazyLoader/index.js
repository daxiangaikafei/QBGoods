import React from 'react'
import './index.less'

const LazyLoader = props => {
  return (
    <div ref={lazy=>{
      getLoader(lazy).init({
        ...props.lazyConfig
      })
    }}>
    </div>
  )
}

LazyLoader.defaultProps = {
  offset: 100,
  throttle: 100
}

function getLoader(node) {
  let lazyLoader = {}
  let root
  let callback = function() {}

  let offset, poll, delay, useDebounce, unload

  let isHidden = function (element) {
    return (element.offsetParent === null)
  }

  let inView = function (element, view) {
    if (isHidden(element)) {
      return false
    }

    let box = element.getBoundingClientRect()
    return (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b)
  }

  let debounceOrThrottle = function () {
    if (!useDebounce && !!poll) {
      return
    }
    clearTimeout(poll)
    poll = setTimeout(function () {
      lazyLoader.render()
      poll = null
    }, delay)
  }

  lazyLoader.init = function (opts) {
    root = lazyLoader.getScrollParent(node)
    if (!root) return
    opts = opts || {}
    let offsetAll = opts.offset || 0
    let offsetVertical = opts.offsetVertical || offsetAll
    let offsetHorizontal = opts.offsetHorizontal || offsetAll
    let optionToInt = function (opt, fallback) {
      return parseInt(opt || fallback, 10)
    }
    offset = {
      t: optionToInt(opts.offsetTop, offsetVertical),
      b: optionToInt(opts.offsetBottom, offsetVertical),
      l: optionToInt(opts.offsetLeft, offsetHorizontal),
      r: optionToInt(opts.offsetRight, offsetHorizontal)
    }
    delay = optionToInt(opts.throttle, 250)
    useDebounce = opts.debounce !== false
    unload = !!opts.unload
    callback = opts.callback || callback
    lazyLoader.render()
    if (document.addEventListener) {
      root.addEventListener('scroll', debounceOrThrottle, false)
      root.addEventListener('load', debounceOrThrottle, false)
    } else {
      root.attachEvent('onscroll', debounceOrThrottle)
      root.attachEvent('onload', debounceOrThrottle)
    }
  }

  lazyLoader.render = function (context) {
    let nodes = (context || document).querySelectorAll('[data-src], [data-src-background]')
    let length = nodes.length
    // debugger
    let src, elem
    let view = {
      l: 0 - offset.l,
      t: 0 - offset.t,
      b: (root.innerHeight || document.documentElement.clientHeight) + offset.b,
      r: (root.innerWidth || document.documentElement.clientWidth) + offset.r
    }
    for (let i = 0; i < length; i++) {
      elem = nodes[i]
      if (inView(elem, view)) {

        if (unload) {
          elem.setAttribute('data-src-placeholder', elem.src)
        }

        if (elem.getAttribute('data-src-background') !== null) {
          elem.style.backgroundImage = 'url(' + elem.getAttribute('data-src-background') + ')'
        }
        else if (elem.src !== (src = elem.getAttribute('data-src'))) {
          elem.src = src
        }

        if (!unload) {
          elem.onload = function() {
            this.removeAttribute('data-src')
            this.removeAttribute('data-src-background')
          }
        }

        callback(elem, 'load')
      }
      else if (unload && !!(src = elem.getAttribute('data-src-placeholder'))) {

        if (elem.getAttribute('data-src-background') !== null) {
          elem.style.backgroundImage = 'url(' + src + ')'
        }
        else {
          elem.src = src
        }

        elem.removeAttribute('data-src-placeholder')
        callback(elem, 'unload')
      }
    }
    if (!length) {
      lazyLoader.detach()
    }
  }

  lazyLoader.getScrollParent = function (node) {
    if (node === null) {
      return null
    }

    if (node.scrollHeight > node.clientHeight || node.scrollWidth > node.clientWidth) {
      return node
    } else {
      return lazyLoader.getScrollParent(node.parentNode)
    }
  }

  lazyLoader.detach = function () {
    if (document.removeEventListener) {
      root.removeEventListener('scroll', debounceOrThrottle)
    } else {
      root.detachEvent('onscroll', debounceOrThrottle)
    }
    clearTimeout(poll)
  }

  return lazyLoader

}
  


export default LazyLoader