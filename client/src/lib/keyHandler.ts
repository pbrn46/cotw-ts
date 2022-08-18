import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../redux/store"
import { heroWalkByDirection, heroSprintByDirection, pickupItem } from "../redux/reducers/hero"
import { debugTest1 } from "../redux/reducers/debug"
import { cancelPendingCommand, startCommand } from "../redux/reducers/command"


type KeyHandlerScreen = "home" | "inventory"

type KeyHandlers = Record<string, ((e: KeyboardEvent) => boolean) | undefined>
type GetKeyHandlersFn = (dispatch: ReturnType<typeof useAppDispatch>,
  navigate: ReturnType<typeof useNavigate>) => KeyHandlers

const getHomeKeyHandlers: GetKeyHandlersFn = (dispatch, navigate) => {
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
    "D": e => {
      if (e.shiftKey) {
        dispatch(debugTest1())
        return true
      }
      return false
    },
    "i": e => {
      navigate('/inventory', { replace: true })
      return true
    },
    "g": e => {
      dispatch(pickupItem())
      return true
    },
    "c": e => {
      dispatch(startCommand("closeDoor"))
      return true
    }
  }
}

const getInventoryKeyHandlers: GetKeyHandlersFn = (dispatch, navigate) => {
  return {
    "D": e => {
      if (e.shiftKey) {
        dispatch(debugTest1())
        return true
      }
      return false
    },
    "Escape": e => {
      navigate('/', { replace: true })
      return true
    },
  }
}

const getCommandKeyHandlers: GetKeyHandlersFn = (dispatch, navigate) => {
  return {
    // "ArrowRight": e => {
    //   if (e.shiftKey) {
    //     dispatch(debugTest1())
    //     return true
    //   }
    //   return false
    // },
    "Escape": e => {
      dispatch(cancelPendingCommand())
      return true
    },
  }
}

export function useKeyHandler(screen: KeyHandlerScreen) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const pendingCommand = useAppSelector(state => state.command.pendingCommand)

  useEffect(() => {
    // Keyboard handlers. Return true if handled, or false to propogate
    let handlers: KeyHandlers
    switch (screen) {
      case "inventory":
        handlers = getInventoryKeyHandlers(dispatch, navigate)
        break
      case "home":
      default:
        if (pendingCommand) {
          handlers = getCommandKeyHandlers(dispatch, navigate)
        } else {
          handlers = getHomeKeyHandlers(dispatch, navigate)
        }
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
  }, [dispatch, navigate, pendingCommand, screen])
  return null
}