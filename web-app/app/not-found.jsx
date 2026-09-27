import Link from 'next/link'
import { SiteFooter, SiteHeader } from '../src/components/Storefront'

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="not-found">
        <h1>Page not found</h1>
        <Link href="/">Return to equipment</Link>
      </main>
      <SiteFooter />
    </>
  )
}
