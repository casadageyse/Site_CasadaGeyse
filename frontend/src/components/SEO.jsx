import { useEffect } from 'react'

export default function SEO({ title, description, canonical, schema }) {
  useEffect(() => {
    document.title = title

    setMeta('description', description)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    if (canonical) setMeta('og:url', canonical, true)

    setLink('canonical', canonical)

    if (schema) {
      let el = document.getElementById('schema-jsonld')
      if (!el) {
        el = document.createElement('script')
        el.id = 'schema-jsonld'
        el.type = 'application/ld+json'
        document.head.appendChild(el)
      }
      el.textContent = JSON.stringify(schema)
    }

    return () => {
      const el = document.getElementById('schema-jsonld')
      if (el) el.remove()
    }
  }, [title, description, canonical, schema])

  return null
}

function setMeta(name, content, isProperty = false) {
  const attr = isProperty ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  if (!href) return
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}
