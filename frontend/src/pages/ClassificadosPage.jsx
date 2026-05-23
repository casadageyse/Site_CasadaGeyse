import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { supabase } from '../supabase'

const REGIOES = [
  { id: 'todas',              label: 'Todas'             },
  { id: 'penha-centro',       label: 'Penha Centro'      },
  { id: 'penha-armacao',      label: 'Penha Armação'     },
  { id: 'barra-velha-centro', label: 'Barra Velha Centro'},
]

function Card({ nome, foto_url, whatsapp, regiao }) {
  const msg = encodeURIComponent(`Olá ${nome}, vi seu perfil na Casa da Geyse e gostaria de saber mais!`)
  return (
    <div className="group flex flex-col bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
                    hover:border-primary/30 hover:shadow-[0_0_30px_rgba(233,30,140,0.12)] transition-all duration-300">
      <div className="relative overflow-hidden aspect-[3/4] bg-white/[0.02]">
        {foto_url
          ? <img src={foto_url} alt={nome} loading="lazy"
                 className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
          : <div className="w-full h-full flex items-center justify-center text-gray-700 text-5xl">👤</div>
        }
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {regiao && (
          <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider
                           bg-black/50 text-white/80 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
            {REGIOES.find(r => r.id === regiao)?.label ?? regiao}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-3">
        <span className="font-black text-white text-base tracking-tight">{nome}</span>
        <a href={`https://wa.me/${whatsapp}?text=${msg}`}
           target="_blank" rel="noreferrer"
           className="w-full py-2.5 rounded-xl text-xs font-black tracking-widest text-center
                      bg-[#25D366] hover:bg-[#20bc5a] text-white
                      shadow-[0_0_20px_rgba(37,211,102,0.25)] hover:shadow-[0_0_35px_rgba(37,211,102,0.45)]
                      transition-all duration-300 flex items-center justify-center gap-2">
          <svg viewBox="0 0 32 32" fill="white" className="w-4 h-4 flex-shrink-0">
            <path fillRule="evenodd" clipRule="evenodd" d="M16 2C8.268 2 2 8.268 2 16c0 2.57.687 4.978 1.886 7.047L2 30l7.18-1.867A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Zm0 25.6a11.52 11.52 0 0 1-5.882-1.608l-.421-.252-4.366 1.135 1.164-4.245-.275-.435A11.47 11.47 0 0 1 4.4 16C4.4 9.594 9.594 4.4 16 4.4S27.6 9.594 27.6 16 22.406 27.6 16 27.6Z"/>
            <path d="M22.29 19.12c-.33-.165-1.96-.965-2.263-1.075-.302-.11-.522-.165-.741.165-.22.33-.852 1.075-1.044 1.295-.192.22-.385.247-.715.082-1.985-.992-3.286-1.77-4.591-4.016-.347-.6.347-.557.99-1.853.11-.22.055-.412-.027-.55-.083-.138-.742-1.786-1.016-2.446-.274-.66-.55-.57-.741-.58l-.632-.012c-.22 0-.578.083-.88.412-.303.33-1.155 1.128-1.155 2.75 0 1.622 1.182 3.19 1.347 3.41.165.22 2.33 3.558 5.647 4.992 2.097.906 2.916.982 3.966.826.638-.096 1.958-.8 2.234-1.572.275-.77.275-1.43.192-1.568-.08-.137-.3-.22-.632-.385Z"/>
          </svg>
          FALAR NO WHATSAPP
        </a>
      </div>
    </div>
  )
}

export default function ClassificadosPage() {
  const [ativa, setAtiva]       = useState('todas')
  const [dados, setDados]       = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    supabase
      .from('acompanhantes')
      .select('*')
      .eq('ativa', true)
      .order('criado_em', { ascending: true })
      .then(({ data }) => {
        setDados(data ?? [])
        setLoading(false)
      })
  }, [])

  const lista = ativa === 'todas'
    ? dados
    : dados.filter(a => a.regiao === ativa)

  const porRegiao = REGIOES.filter(r => r.id !== 'todas').map(r => ({
    ...r,
    acompanhantes: dados.filter(a => a.regiao === r.id),
  })).filter(r => r.acompanhantes.length > 0)

  return (
    <>
      <SEO
        title="Classificados — Acompanhantes em Penha e Barra Velha | Casa da Geyse"
        description="Veja os perfis das acompanhantes disponíveis em Penha Centro, Penha Armação e Barra Velha. Perfis verificados com contato direto via WhatsApp."
        canonical="https://casadageyse.com.br/classificados"
      />
      <Header />
      <main className="min-h-screen bg-[#06061a]">

        {/* Hero */}
        <div className="bg-[#080822] border-b border-white/[0.06] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-2">Santa Catarina</p>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Classificados</h1>
            <p className="text-gray-400 text-sm mt-1">
              {loading ? 'Carregando...' : `${lista.length} perfil${lista.length !== 1 ? 's' : ''} disponíve${lista.length !== 1 ? 'is' : 'l'}`}
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="border-b border-white/[0.06] bg-[#080822] sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
              {REGIOES.map(r => (
                <button key={r.id} onClick={() => setAtiva(r.id)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 ${
                          ativa === r.id
                            ? 'bg-primary text-white shadow-[0_0_16px_rgba(233,30,140,0.4)]'
                            : 'bg-white/[0.05] text-gray-400 hover:bg-white/10 hover:text-white border border-white/[0.06]'
                        }`}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : lista.length === 0 ? (
            <p className="text-gray-500 text-center py-20">Nenhum perfil disponível no momento.</p>
          ) : ativa !== 'todas' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {lista.map(a => <Card key={a.id} {...a} />)}
            </div>
          ) : (
            porRegiao.map(r => (
              <div key={r.id} className="mb-12">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  <h2 className="text-white font-black text-lg tracking-tight">{r.label}</h2>
                  <span className="text-gray-600 text-sm">{r.acompanhantes.length} perfis</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {r.acompanhantes.map(a => <Card key={a.id} {...a} />)}
                </div>
              </div>
            ))
          )}
        </div>

      </main>
      <Footer />
    </>
  )
}
