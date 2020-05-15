import { useEffect } from "react"
import { useDispatch } from "../redux/store"
import { heroWalkByDirection, heroSprintByDirection } from "../redux/reducers/hero"
import { useHistory } from "react-router-dom"


type KeyHandlerScreen = "world" | "inventory"

type KeyHandlers = Record<string, ((e: KeyboardEvent) => boolean) | undefined>
type GetKeyHandlersFn = (dispatch: ReturnType<typeof useDispatch>,
  history: ReturnType<typeof useHistory>) => KeyHandlers

const getWorldKeyHandlers: GetKeyHandlersFn = (dispatch, history) => {
  return {
    "ArrowUp": e => {
      if (e.shiftKey) dispatch(heroSprintByDirection("up"))
      else dispatch(heroWalkByDirection("up"))
      return true
    },
    "ArrowRight": e => {
      if (e.shiftKey) dispatch(heroSprintByDirection("right"))
      else dispatch(heroWalkByDirection("right"))
      return true
    },
    "ArrowDown": e => {
      if (e.shiftKey) dispatch(heroSprintByDirection("down"))
      else dispatch(heroWalkByDirection("down"))
      return true
    },
    "ArrowLeft": e => {
      if (e.shiftKey) dispatch(heroSprintByDirection("left"))
      else dispatch(heroWalkByDirection("left"))
      return true
    },
    "Home": e => {
      if (e.shiftKey) dispatch(heroSprintByDirection("upperLeft"))
      else dispatch(heroWalkByDirection("upperLeft"))
      return true
    },
    "End": e => {
      if (e.shiftKey) dispatch(heroSprintByDirection("lowerLeft"))
      else dispatch(heroWalkByDirection("lowerLeft"))
      return true
    },
    "PageUp": e => {
      if (e.shiftKey) dispatch(heroSprintByDirection("upperRight"))
      else dispatch(heroWalkByDirection("upperRight"))
      return true
    },
    "PageDown": e => {
      if (e.shiftKey) dispatch(heroSprintByDirection("lowerRight"))
      else dispatch(heroWalkByDirection("lowerRight"))
      return true
    },
    "i": e => {
      history.replace('/inventory')
      return true
    }
  }
}

const getInventoryKeyHandlers: GetKeyHandlersFn = (dispatch, history) => {
  return {
    "Escape": e => {
      history.replace('/')
      return true
    }
  }
}

export function useKeyHandler(screen: KeyHandlerScreen) {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    // Keyboard handlers. Return true if handled, or false to propogate
    let handlers: KeyHandlers
    switch (screen) {
      case "inventory":
        handlers = getInventoryKeyHandlers(dispatch, history)
        break
      case "world":
      default:
        handlers = getWorldKeyHandlers(dispatch, history)
        break
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      const handler = handlers[e.key]
      if (handler) {
        if (handler(e)) {
          e.stopPropagation()
          e.preventDefault()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [dispatch, history, screen])
  return null
}