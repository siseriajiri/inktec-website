'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Menu, MessageCircle, Search, X } from 'lucide-react'
import products from '../data/products.json'

const whatsappNumber = '2347063636774'
const categoryOrder = ['DTF Printing', 'Heat Presses', 'Cutting & Finishing', 'UV Printing', 'Ink & Supplies', 'Other']

function whatsappUrl(product) {
  const message = product
    ? `Hello InkTec, please send me details and a quote for ${product.title}.`
    : 'Hello InkTec, I would like help choosing printing equipment.'
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="promo-bar">
        <span>Printing solutions, equipment and support across Nigeria</span>
        <a href={`tel:+${whatsappNumber}`}>Call 0706 363 6774</a>
      </div>
      <header className="site-header">
        <div className="header-main">
          <Link className="brand" href="/" aria-label="InkTec home">
            <img src="/assets/inktecleftlogo.png" alt="InkTec" />
          </Link>
          <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            <Link href="/" onClick={() => setMenuOpen(false)}>Equipment</Link>
            <a href="https://wa.me/2347063636774" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Talk to a specialist</a>
          </nav>
          <a className="header-contact" href={whatsappUrl()} target="_blank" rel="noreferrer">
            <MessageCircle size={17} aria-hidden="true" />
            <span>Get advice</span>
          </a>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
    </>
  )
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link className="product-card-image" href={`/products/${product.slug}/`} aria-label={`View ${product.title}`}>
        <img src={product.images[0]} alt={product.title} loading="lazy" />
      </Link>
      <div className="product-card-copy">
        <span className="product-category">{product.category}</span>
        <h3><Link href={`/products/${product.slug}/`}>{product.title}</Link></h3>
        <div className="product-card-bottom">
          <span className="product-price">{product.price || 'Request a quote'}</span>
          <Link className="text-link" href={`/products/${product.slug}/`} aria-label={`View ${product.title}`}>
            Details <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}

function HomeShowcase() {
  const starter = products.find((product) => product.slug === 'dtfprinter') || products.find((product) => product.category === 'DTF Printing')
  const heatPress = products.find((product) => product.category === 'Heat Presses')
  const advanced = products.find((product) => product.slug === 'a2dtfprinter') || products.find((product) => product.category === 'DTF Printing')
  const picks = [
    { product: starter, label: 'Starter kit', title: 'DTF starter setup', description: 'Flexible production to help a new print business get moving.' },
    { product: heatPress, label: 'Most popular', title: 'Heat press essentials', description: 'Dependable transfer equipment for apparel and custom work.' },
    { product: advanced, label: 'Business upgrade', title: 'Advanced print package', description: 'More output and flexibility for a growing print operation.' },
  ].filter((pick) => pick.product)

  return (
    <>
      <section className="brand-hero">
        <div className="brand-hero-image"><img src="/assets/yiwu%20t-shirt%20press%20machine.png" alt="InkTec heat press equipment" /></div>
        <div className="brand-hero-copy">
          <span className="hero-kicker">Digital Printing Solutions</span>
          <h1>Build your print business with the right equipment.</h1>
          <p>Explore trusted heat presses, DTF printers, inks and production tools backed by local guidance.</p>
          <div className="hero-actions">
            <a className="hero-primary" href="#catalog">Explore equipment <ArrowRight size={17} aria-hidden="true" /></a>
            <a className="hero-secondary" href={whatsappUrl()} target="_blank" rel="noreferrer">Get a quote</a>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="InkTec service highlights">
        <div><strong>Local support</strong><span>Setup and after-sales guidance</span></div>
        <div><strong>Fast delivery</strong><span>Shipping options across Nigeria</span></div>
        <div><strong>33 products</strong><span>Equipment and supplies to explore</span></div>
      </section>

      <section className="top-picks" aria-labelledby="top-picks-title">
        <div className="home-section-heading">
          <div><span className="section-kicker">Top picks</span><h2 id="top-picks-title">Setups for starting or growing a print shop</h2></div>
          <a href="#catalog">Browse all equipment <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
        <div className="top-picks-grid">
          {picks.map(({ product, label, title, description }) => (
            <article className="pick-card" key={`${product.slug}-${label}`}>
              <Link className="pick-image" href={`/products/${product.slug}/`} aria-label={`View ${title}`}>
                <img src={product.images[0]} alt={product.title} loading="lazy" />
              </Link>
              <div className="pick-copy"><span>{label}</span><h3>{title}</h3><p>{description}</p><Link href={`/products/${product.slug}/`}>View setup <ArrowRight size={16} aria-hidden="true" /></Link></div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export function CatalogPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All equipment')
  const categories = ['All equipment', ...categoryOrder.filter((category) => products.some((product) => product.category === category))]
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'All equipment' || product.category === activeCategory
    const searchText = `${product.title} ${product.category} ${product.highlights.join(' ')}`.toLowerCase()
    return matchesCategory && searchText.includes(query.trim().toLowerCase())
  })

  return (
    <main>
      <HomeShowcase />

      <section className="catalog-section" id="catalog" aria-label="Equipment catalog">
        <div className="catalog-toolbar">
          <div>
            <p className="kicker">Browse by need</p>
            <h2>Equipment</h2>
          </div>
          <label className="search-field">
            <Search size={18} aria-hidden="true" />
            <span className="visually-hidden">Search equipment</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search machines and supplies" />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={16} /></button>}
          </label>
        </div>
        <div className="category-filters" aria-label="Filter by category">
          {categories.map((category) => (
            <button key={category} className={activeCategory === category ? 'filter-chip is-active' : 'filter-chip'} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category}>
              {category}
            </button>
          ))}
        </div>
        <div className="results-line"><span>{filteredProducts.length} items</span><span>Prices and packages may vary; contact us for a current quote.</span></div>
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        ) : (
          <div className="empty-state"><h3>No equipment found</h3><p>Try another search term or choose a different category.</p></div>
        )}
      </section>
    </main>
  )
}

export function ProductDetail({ product }) {
  const [activeImage, setActiveImage] = useState(product.images[0])
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <main className="detail-page">
      <Link className="back-link" href="/"><ArrowLeft size={16} aria-hidden="true" /> Back to equipment</Link>
      <section className="detail-layout">
        <div className="detail-gallery">
          <div className="detail-main-image"><img src={activeImage} alt={product.title} /></div>
          {product.images.length > 1 && (
            <div className="thumbnail-list" aria-label="Product images">
              {product.images.map((image, index) => (
                <button key={image} className={activeImage === image ? 'thumbnail is-active' : 'thumbnail'} type="button" onClick={() => setActiveImage(image)} aria-label={`Show product image ${index + 1}`} aria-pressed={activeImage === image}>
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="detail-summary">
          <p className="product-category">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="detail-price">{product.price || 'Request a quote'}</p>
          <ul className="highlight-list">
            {product.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
          <a className="primary-action" href={whatsappUrl(product)} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" /> Ask about this product</a>
          <p className="contact-note">Get current pricing, availability and setup advice from InkTec.</p>
        </div>
      </section>

      <section className="detail-information">
        <div className="tab-list" role="tablist" aria-label="Product information">
          <button id="overview-tab" className={activeTab === 'overview' ? 'info-tab is-active' : 'info-tab'} type="button" role="tab" aria-selected={activeTab === 'overview'} aria-controls="overview-panel" onClick={() => setActiveTab('overview')}>Overview</button>
          <button id="specifications-tab" className={activeTab === 'specifications' ? 'info-tab is-active' : 'info-tab'} type="button" role="tab" aria-selected={activeTab === 'specifications'} aria-controls="specifications-panel" onClick={() => setActiveTab('specifications')}>Specifications</button>
        </div>
        {activeTab === 'overview' ? (
          <div id="overview-panel" role="tabpanel" aria-labelledby="overview-tab" className="overview-copy">
            <p>{product.description || `Contact InkTec for details about ${product.title}, setup options and availability.`}</p>
          </div>
        ) : (
          <div id="specifications-panel" role="tabpanel" aria-labelledby="specifications-tab">
            {product.specifications.length > 0 ? <dl className="spec-list">{product.specifications.map(({ label, value }) => <div key={`${label}-${value}`}><dt>{label}</dt><dd>{value}</dd></div>)}</dl> : <p className="no-specs">Contact our team for product specifications and package options.</p>}
          </div>
        )}
      </section>
    </main>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span>InkTec Printing Solutions</span>
        <span>Equipment advice and support across Nigeria</span>
        <a href="https://wa.me/2347063636774" target="_blank" rel="noreferrer">Contact InkTec <ArrowRight size={15} aria-hidden="true" /></a>
      </div>
    </footer>
  )
}
