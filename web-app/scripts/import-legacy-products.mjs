import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { load } from 'cheerio'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const appDirectory = path.resolve(scriptDirectory, '..')
const siteDirectory = path.resolve(appDirectory, '..')
const assetsDirectory = path.join(appDirectory, 'public', 'assets')
const dataDirectory = path.join(appDirectory, 'src', 'data')

await mkdir(assetsDirectory, { recursive: true })
await mkdir(dataDirectory, { recursive: true })

function classifyProduct(sourceName, title) {
  const text = `${sourceName} ${title}`.toLowerCase()
  if (/\buv\b/.test(text)) return 'UV Printing'
  if (/dtf/.test(text)) return 'DTF Printing'
  if (/plotter|cutter|cutting|laminat|binding|paper cutter/.test(text)) return 'Cutting & Finishing'
  if (/ink|film|powder|printhead|print head|sparepart|spare part|teflon/.test(text)) return 'Ink & Supplies'
  if (/press|heat|mug|cap|tumbler|sublimation/.test(text)) return 'Heat Presses'
  return 'Other'
}

function cleanText(value) {
  return value.replace(/\s+/g, ' ').trim()
}

async function copyImage(source) {
  if (!source || /^(data:|https?:\/\/)/i.test(source)) return null
  const pathname = decodeURIComponent(source.split(/[?#]/, 1)[0]).replace(/^\/+/, '')
  const sourcePath = path.resolve(siteDirectory, pathname)
  if (!sourcePath.startsWith(`${siteDirectory}${path.sep}`)) return null
  try {
    await copyFile(sourcePath, path.join(assetsDirectory, path.basename(sourcePath)))
    return `/assets/${encodeURIComponent(path.basename(sourcePath))}`
  } catch {
    return null
  }
}

const sourceFiles = (await readdir(siteDirectory)).filter((name) => name.toLowerCase().endsWith('.html'))
const products = []

for (const sourceFile of sourceFiles) {
  const markup = await readFile(path.join(siteDirectory, sourceFile), 'utf8')
  const $ = load(markup)
  const container = $('.product-container').first()
  const title = cleanText(container.find('.product-title').first().text())
  if (!title) continue

  const sourceImages = [
    container.find('.img-display-container img').first().attr('src'),
    ...container.find('.thumbnails-list img').map((_, image) => $(image).attr('src')).get(),
  ].filter(Boolean)
  const images = [...new Set(await Promise.all(sourceImages.map(copyImage)))].filter(Boolean)
  const price = cleanText(container.find('.price').first().text())
  const highlights = container.find('.short-description li').map((_, item) => cleanText($(item).text())).get().filter(Boolean)
  const description = cleanText($('#description').text())
  const specifications = $('#info .info-table tr').map((_, row) => {
    const cells = $(row).find('th, td').map((__, cell) => cleanText($(cell).text())).get()
    return cells.length > 1 ? { label: cells[0], value: cells.slice(1).join(' ') } : null
  }).get().filter(Boolean)

  if (images.length === 0) continue
  const slug = path.basename(sourceFile, path.extname(sourceFile)).toLowerCase().replace(/[^a-z0-9]+/g, '-')
  products.push({
    slug,
    title,
    source: sourceFile,
    category: classifyProduct(sourceFile, title),
    price,
    images,
    highlights,
    description,
    specifications,
  })
}

for (const source of ['inktecleftlogo.png', 'yiwu t-shirt press machine.png', 'dtf5.avif', 'heatpress 38by38 side 1.jpg', 'A2 DTF printer side 3.png']) {
  await copyImage(source)
}

await writeFile(path.join(dataDirectory, 'products.json'), `${JSON.stringify(products, null, 2)}\n`)
console.log(`Imported ${products.length} products from ${sourceFiles.length} legacy pages.`)
