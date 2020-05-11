import React, { useRef, useEffect } from 'react'
import { useSelector } from '../../redux/store'
import './Messages.css'


export default function Messages() {
  const scrollableDivRef = useRef<HTMLDivElement | null>(null)
  const bottomDivRef = useRef<HTMLDivElement | null>(null)
  const messages = useSelector(state => state.messages)

  useEffect(() => {
    if (!scrollableDivRef.current || !bottomDivRef.current) return
    scrollableDivRef.current.scrollTop = bottomDivRef.current.offsetTop - scrollableDivRef.current.offsetTop;
  }, [messages])

  return <div className="Messages">
    <div
      ref={scrollableDivRef}
      className="Messages-Inner">
      {messages.map(message => <div key={message.listKey}>
        {message.message}
        <div ref={bottomDivRef}></div>
      </div>)}
    </div>
  </div>
}