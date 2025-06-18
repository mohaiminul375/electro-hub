'use client'
import {
  Webchat,
  WebchatProvider,
  Fab,
  getClient,
  Configuration,
} from '@botpress/webchat'
import { useState } from 'react'

const clientId = 'a412e64a-710a-4b28-8517-ed2d2e0f2fa3'

const configuration: Configuration = {
  color: '#000',
}

export default function BotpressChat() {
  const client = getClient({ clientId })
  const [isWebchatOpen, setIsWebchatOpen] = useState(false)

  const toggleWebchat = () => {
    setIsWebchatOpen((prev) => !prev)
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <WebchatProvider client={client} configuration={configuration}>
        <Fab onClick={toggleWebchat} />
        <div style={{ display: isWebchatOpen ? 'block' : 'none' }}>
          <Webchat />
        </div>
      </WebchatProvider>
    </div>
  )
}