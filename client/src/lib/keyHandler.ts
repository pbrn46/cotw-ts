import { useEffect } from "react"
import { useDispatch } from "../redux/store"
import { heroWalkByDirection, heroSprintByDirection } from "../redux/reducers/hero"


export function useKeyHandler() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Keyboard handlers. Return true if handled, or false to propogate
    const handlers: Record<string, ((e: KeyboardEvent) => boolean) | undefined> = {
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
  }, [dispatch])
  return null
}