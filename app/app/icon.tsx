import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Icon generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00F0FF',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          textShadow: '0 0 10px #00F0FF, 0 0 20px #00F0FF',
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
