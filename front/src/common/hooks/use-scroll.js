import { useEffect, useState } from 'react'

function on(obj, ...args) {
  obj.addEventListener(...args)
}

function off(obj, ...args) {
  obj.removeEventListener(...args)
}

export function useScroll() {
  let prevScroll = 0

  const [scrollingUp, setScrollingUp] = useState(false)
  const [currentScroll, setCurrentScroll] = useState(null)

  const handleScroll = () => {
    const currScroll = window.pageYOffset

    const isScrolled = currScroll > 100 && prevScroll > currScroll
    prevScroll = currScroll

    setScrollingUp(isScrolled)
    setCurrentScroll(currScroll)
  }

  useEffect(() => {
    on(window, 'scroll', handleScroll, { passive: true })
    return () => {
      off(window, 'scroll', handleScroll, { passive: true })
    }
  }, [])

  return {
    isScrollingUp: scrollingUp,
    currentScroll: currentScroll,
  }
}
