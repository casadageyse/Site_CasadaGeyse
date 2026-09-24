import Header from '../components/Header'
import MarqueeBanner from '../components/MarqueeBanner'
import HeroCasa from '../components/HeroCasa'
import SobreCasa from '../components/SobreCasa'
import LocalizacoesSection from '../components/LocalizacoesSection'
import CasasSection from '../components/CasasSection'
import DiferenciaisSection from '../components/DiferenciaisSection'
import ComoFunciona from '../components/ComoFunciona'
import ClassificadosPreview from '../components/ClassificadosPreview'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Casa da Geyse',
  description: 'Hospedagem feminina com quartos equipados, estrutura completa e localização privilegiada em Penha e Barra Velha, Santa Catarina.',
  url: 'https://casadageyse.com.br',
  telephone: '+554788515979',
  image: 'https://casadageyse.com.br/logo.png',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Porto Alegre, 363',
      addressLocality: 'Penha',
      addressRegion: 'SC',
      addressCountry: 'BR',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Ludgero F. Gonçalves, 32',
      addressLocality: 'Barra Velha',
      addressRegion: 'SC',
      addressCountry: 'BR',
    },
  ],
  areaServed: ['Penha', 'Barra Velha', 'Santa Catarina'],
}

export default function Home() {
  return (
    <>
      <SEO
        title="Casa da Geyse — Hospedagem Feminina em Penha e Barra Velha, SC"
        description="Casa da Geyse oferece hospedagem feminina com quartos equipados, estrutura completa e localização privilegiada em Penha e Barra Velha, Santa Catarina. Ambiente discreto e seguro."
        canonical="https://casadageyse.com.br/"
        schema={schema}
      />
      <Header />
      <MarqueeBanner />
      <main>
        <HeroCasa />
        <SobreCasa />
        <LocalizacoesSection />
        <CasasSection />
        <DiferenciaisSection />
        <ComoFunciona />
        <ClassificadosPreview />
      </main>
      <Footer />
    </>
  )
}

