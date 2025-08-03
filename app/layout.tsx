import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Youth Startup Forum',
  description: 'Youth Startup Forum - Coming Soon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="font-['BDO_Grotesk']">{children}</body>
    </html>
  )
}