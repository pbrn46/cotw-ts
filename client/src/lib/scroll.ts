import React, { useEffect } from 'react'
import { useSelector } from '../redux/store'
import { Pos } from './mapUtil'

export function useScrollWatcher(scrollRef: React.MutableRefObject<HTMLDivElement | null>, innerRef: React.MutableRefObject<HTMLDivElement | null>) {
  const heroPos = useSelector(state => state.hero.pos)
  const tileSize = useSelector(state => state.config.tilePxSize)

  useEffect(() => {
    if (!scrollRef.current || !innerRef.current) return
    const heroPosPx = Pos(heroPos.x * tileSize.width, heroPos.y * tileSize.height)
    const scrollRect = scrollRef.current.getBoundingClientRect()
    const widthProxy = scrollRect.width * 0.15 // Distance from the side to trigger scroll
    const heightProxy = scrollRect.height * 0.15
    if (scrollRef.current.scrollLeft + widthProxy > heroPosPx.x) {
      scrollRef.current.scrollLeft = heroPosPx.x - (scrollRect.width / 2)
    }
    if (scrollRef.current.scrollLeft - widthProxy + scrollRect.width - tileSize.width < heroPosPx.x) {
      scrollRef.current.scrollLeft = heroPosPx.x - (scrollRect.width / 2)
    }
    if (scrollRef.current.scrollTop + heightProxy > heroPosPx.y) {
      scrollRef.current.scrollTop = heroPosPx.y - (scrollRect.height / 2)
    }
    if (scrollRef.current.scrollTop - heightProxy + scrollRect.height - tileSize.height < heroPosPx.y) {
      scrollRef.current.scrollTop = heroPosPx.y - (scrollRect.height / 2)
    }
  }, [innerRef, scrollRef, heroPos, tileSize.width, tileSize.height])
}