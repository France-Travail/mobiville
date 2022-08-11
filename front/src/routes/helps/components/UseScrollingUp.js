import { useEffect, useState } from 'react'

function on(obj, ...args) {
  obj.addEventListener(...args)
}

function off(obj, ...args) {
  obj.removeEventListener(...args)
}

const UseScrollingUp = () => {
  let prevScroll

  const [scrollingUp, setScrollingUp] = useState(false)
  const handleScroll = () => {
    const currScroll = window.pageYOffset
    const isScrolled = currScroll > 100 && prevScroll > currScroll
    setScrollingUp(isScrolled)
    prevScroll = currScroll
  }
  useEffect(() => {
    on(window, 'scroll', handleScroll, { passive: true })
    return () => {
      off(window, 'scroll', handleScroll, { passive: true })
    }
  }, [])
  return scrollingUp
}

export default UseScrollingUp
