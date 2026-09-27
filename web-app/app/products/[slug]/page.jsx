import { notFound } from 'next/navigation'
import products from '../../../src/data/products.json'
import { ProductDetail, SiteFooter, SiteHeader } from '../../../src/components/Storefront'

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)
  return product ? { title: `${product.title} | InkTec`, description: `Explore ${product.title}, view specifications and request a quote from InkTec.` } : {}
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)
  if (!product) notFound()

  return (
    <>
      <SiteHeader />
      <ProductDetail product={product} />
      <SiteFooter />
    </>
  )
}
