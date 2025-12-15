import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Apple icon generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00F0FF',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          textShadow: '0 0 20px #00F0FF, 0 0 40px #00F0FF',
          borderRadius: '20%',
        }}
      >
        {'</>'}
      </div>
    ),
    {
      ...size,
    }
  )
}
