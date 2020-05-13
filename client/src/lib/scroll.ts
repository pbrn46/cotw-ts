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
    const width20 = scrollRect.width * 0.20
    const height20 = scrollRect.height * 0.20
    if (scrollRef.current.scrollLeft + width20 > heroPosPx.x) {
      scrollRef.current.scrollLeft = heroPosPx.x - (scrollRect.width / 2)
    }
    if (scrollRef.current.scrollLeft - width20 + scrollRect.width - tileSize.width < heroPosPx.x) {
      scrollRef.current.scrollLeft = heroPosPx.x - (scrollRect.width / 2)
    }
    if (scrollRef.current.scrollTop + height20 > heroPosPx.y) {
      scrollRef.current.scrollTop = heroPosPx.y - (scrollRect.height / 2)
    }
    if (scrollRef.current.scrollTop - height20 + scrollRect.height - tileSize.height < heroPosPx.y) {
      scrollRef.current.scrollTop = heroPosPx.y - (scrollRect.height / 2)
    }
  }, [innerRef, scrollRef, heroPos, tileSize.width, tileSize.height])
}