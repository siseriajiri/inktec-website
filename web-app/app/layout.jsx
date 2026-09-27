import '../src/index.css'
import '../src/App.css'

export const metadata = {
  title: 'InkTec | Printing Equipment & Supplies',
  description: 'Browse InkTec printing equipment, heat presses, DTF systems, and supplies. Get product advice and request a quote on WhatsApp.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
