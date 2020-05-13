import { useEffect } from "react"
import { useDispatch } from "../redux/store"
import { transposeHero } from "../redux/reducers/hero"
import { batch } from "react-redux"


export function useKeyHandler() {
  const dispatch = useDispatch()

  useEffect(() => {
    const shiftHandlers: Record<string, (() => void) | undefined> = {
      "ArrowUp": () => {
        batch(() => {
          while (dispatch(transposeHero({ x: 0, y: -1 }))) { }
        })
      },
      "ArrowRight": () => {
        batch(() => {
          while (dispatch(transposeHero({ x: 1, y: 0 }))) { }
        })
      },
      "ArrowDown": () => {
        batch(() => {
          while (dispatch(transposeHero({ x: 0, y: 1 }))) { }
        })
      },
      "ArrowLeft": () => {
        batch(() => {
          while (dispatch(transposeHero({ x: -1, y: 0 }))) { }
        })
      },
      "Home": () => {
        batch(() => {
          while (dispatch(transposeHero({ x: -1, y: -1 }))) { }
        })
      },
      "End": () => {
        batch(() => {
          while (dispatch(transposeHero({ x: -1, y: 1 }))) { }
        })
      },
      "PageUp": () => {
        batch(() => {
          while (dispatch(transposeHero({ x: 1, y: -1 }))) { }
        })
      },
      "PageDown": () => {
        batch(() => {
          while (dispatch(transposeHero({ x: 1, y: 1 }))) { }
        })
      },
    }
    const handlers: Record<string, (() => void) | undefined> = {
      "ArrowUp": () => {
        dispatch(transposeHero({ x: 0, y: -1 }))
      },
      "ArrowRight": () => {
        dispatch(transposeHero({ x: 1, y: 0 }))
      },
      "ArrowDown": () => {
        dispatch(transposeHero({ x: 0, y: 1 }))
      },
      "ArrowLeft": () => {
        dispatch(transposeHero({ x: -1, y: 0 }))
      },
      "Home": () => {
        dispatch(transposeHero({ x: -1, y: -1 }))
      },
      "End": () => {
        dispatch(transposeHero({ x: -1, y: 1 }))
      },
      "PageUp": () => {
        dispatch(transposeHero({ x: 1, y: -1 }))
      },
      "PageDown": () => {
        dispatch(transposeHero({ x: 1, y: 1 }))
      },
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      const handler = e.shiftKey ? shiftHandlers[e.key] : handlers[e.key]
      if (handler) {
        e.stopPropagation()
        e.preventDefault()
        handler()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [dispatch])
  return null
}