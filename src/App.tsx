import { useState, ReactNode } from 'react';
import { 
  ShieldCheck, 
  Copy, 
  ExternalLink, 
  QrCode, 
  Fingerprint, 
  Box, 
  Link as LinkIcon, 
  Layers,
  CheckCircle2,
  Sparkles,
  Diamond,
  ArrowLeft
} from 'lucide-react';

// --- Types & Interfaces ---
interface DetailItemProps {
  label: string;
  value: string;
  icon: ReactNode;
  onCopy?: () => void;
  isCopied?: boolean;
  truncate?: boolean;
}

// --- Mock Data & Materials ---
const MOCK_DATA = {
  title: "Ethereal Convergence #04",
  subtitle: "The Raw Fire | Agni | The Ignition",
  artist: "Elena Rostova",
  year: "2026",
  descriptionLink: "https://pemetaanbudaya.jkkn.gov.my/en/senibudaya/detail/741",
  descriptionText: "Tarian Dabus | The Warrior’s Trance Specific Traditional Dance Motif",
  imageUrl: "/sculpture.png", // Assuming your main floating image is still lowercase
  artRegistryId: "IA-VOL4-FIRE-005",
  serialNumber: "SN-2026-04-1901",
  ledgerAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d89B83",
  tokenId: "88492",
  creatorId: "CR-3310-EXP",
  tokenStandard: "ERC-721",
  blockchain: "Polygon (MATIC)",
  metadataType: "IPFS / Decentralized"
};

// --- UPDATED MATERIAL LISTS ---
// Notice how the image paths perfectly match the Capitalization and .png extensions you provided!
const VESSEL_MATERIALS = [
  {
    name: "Limestone",
    type: "Body",
    image: "/limestone.png", 
    desc: "A sedimentary rock forming the structural foundation, representing ancient earth and grounding physical presence."
  },
  {
    name: "Calcite",
    type: "Body",
    image: "/calcite.png", 
    desc: "A carbonate mineral providing luminous structural integrity, channeling energy through its crystalline lattice."
  }
];

const ESSENCE_MATERIALS = [
  {
    name: "Meteorite",
    type: "Soul",
    image: "/meteorite.png", 
    desc: "Extraterrestrial forged iron-nickel, carrying the cosmic signature and raw primordial fire of the universe."
  },
  {
    name: "Ruby",
    type: "Soul",
    image: "/ruby.png", 
    desc: "A blood-red corundum gemstone embedding the fierce, passionate essence of Agni (The Ignition)."
  },
  {
    name: "Topaz",
    type: "Soul",
    image: "/topaz.png", 
    desc: "A golden-hued silicate mineral radiating a warm, guiding light to balance the core fire of the sculpture."
  }
];

export default function App() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'main' | 'provenance'>('main');

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Global CSS for Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float3D {
          0% { 
            transform: translateY(0px) rotateY(-15deg) rotateX(8deg); 
            filter: drop-shadow(25px 25px 20px rgba(0,0,0,0.9)) drop-shadow(-10px -10px 20px rgba(212,175,55,0.15)) brightness(0.95) contrast(1.1); 
          }
          50% { 
            transform: translateY(-30px) rotateY(15deg) rotateX(-5deg); 
            filter: drop-shadow(-25px 40px 30px rgba(0,0,0,0.9)) drop-shadow(15px 15px 30px rgba(212,175,55,0.4)) brightness(1.25) contrast(1.2); 
          }
          100% { 
            transform: translateY(0px) rotateY(-15deg) rotateX(8deg); 
            filter: drop-shadow(25px 25px 20px rgba(0,0,0,0.9)) drop-shadow(-10px -10px 20px rgba(212,175,55,0.15)) brightness(0.95) contrast(1.1); 
          }
        }
        .sculpture-container {
          perspective: 800px;
          transform-style: preserve-3d;
        }
        .animate-float {
          animation: float3D 8s ease-in-out infinite;
          transform-style: preserve-3d;
          will-change: transform, filter;
        }
        .bento-card {
          background: linear-gradient(145deg, #111111 0%, #0a0a0a 100%);
          border: 1px solid rgba(212, 175, 55, 0.1);
          box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }
        .bento-card:hover {
          border-color: rgba(212, 175, 55, 0.3);
          box-shadow: 0 10px 40px -10px rgba(212, 175, 55, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
        }
      `}} />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-[#D4AF37]/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-[#D4AF37]" size={24} />
          <span className="font-semibold tracking-widest uppercase text-xs text-white">Provenance Passport</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1.5 rounded-full uppercase tracking-wider font-semibold">
          <span className="relative flex h-1.5 w-1.5 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4AF37]"></span>
          </span>
          Blockchain Verified
        </div>
      </nav>

      {/* MAIN VIEW */}
      {currentView === 'main' && (
        <div className="animate-in fade-in duration-700">
          {/* Cinematic Hero Section */}
          <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 px-4 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* 3D Floating Sculpture Container */}
            <div className="relative z-10 sculpture-container flex flex-col items-center mb-8">
              <img 
                src={MOCK_DATA.imageUrl} 
                alt="Sculpture"
                className="animate-float w-[280px] h-[350px] sm:w-[350px] sm:h-[450px] object-contain drop-shadow-2xl"
                draggable="false"
              />
            </div>

            {/* Hero Typography */}
            <div className="relative z-10 text-center flex flex-col items-center max-w-2xl">
              <h1 className="text-4xl sm:text-6xl font-light text-white tracking-widest uppercase mb-2" style={{ fontFamily: '"Cinzel", "Times New Roman", serif' }}>
                Ishwar Archives
              </h1>
              <h2 className="text-[#D4AF37] text-sm sm:text-lg tracking-[0.2em] uppercase font-medium mb-6">
                {MOCK_DATA.subtitle}
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6"></div>
              
              <a 
                href={MOCK_DATA.descriptionLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors text-sm sm:text-base font-light tracking-wide max-w-lg leading-relaxed px-4 underline-offset-4 hover:underline"
              >
                {MOCK_DATA.descriptionText}
                <ExternalLink size={14} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
              </a>
              
              <div className="mt-10 flex gap-4">
                <button 
                  onClick={() => setCurrentView('provenance')}
                  className="px-8 py-3.5 rounded-none border border-[#D4AF37]/50 text-black bg-[#D4AF37] hover:bg-white hover:border-white transition-all duration-500 font-medium tracking-[0.2em] uppercase text-xs"
                >
                  Learn More
                </button>
              </div>
            </div>
          </section>

          {/* Bento Box Dashboard UI */}
          <main className="relative z-10 max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Column 1: Core Details */}
            <div className="md:col-span-8 flex flex-col gap-4">
              <div className="bento-card rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <Fingerprint className="text-[#D4AF37]" size={20} />
                  <h2 className="text-lg font-light text-white tracking-widest uppercase">Cryptographic Identity</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <DetailItem 
                    label="Art Registry ID" 
                    value={MOCK_DATA.artRegistryId} 
                    icon={<ShieldCheck size={14} />} 
                    onCopy={() => handleCopy(MOCK_DATA.artRegistryId, 'artRegistry')}
                    isCopied={copiedField === 'artRegistry'}
                  />
                  <DetailItem 
                    label="Art Serial Number" 
                    value={MOCK_DATA.serialNumber} 
                    icon={<Layers size={14} />} 
                    onCopy={() => handleCopy(MOCK_DATA.serialNumber, 'serial')}
                    isCopied={copiedField === 'serial'}
                  />
                  <div className="sm:col-span-2">
                    <DetailItem 
                      label="Ledger Address (Smart Contract)" 
                      value={MOCK_DATA.ledgerAddress} 
                      icon={<LinkIcon size={14} />} 
                      onCopy={() => handleCopy(MOCK_DATA.ledgerAddress, 'ledger')}
                      isCopied={copiedField === 'ledger'}
                      truncate={false}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bento-card rounded-2xl p-6">
                  <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">Token Standard</h3>
                  <div className="flex items-center gap-3 text-white">
                    <Box className="text-[#D4AF37]" size={20} />
                    <span className="font-mono text-lg">{MOCK_DATA.tokenStandard}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <DetailItem 
                      label="Token ID" 
                      value={MOCK_DATA.tokenId} 
                      icon={<Layers size={12} />} 
                      onCopy={() => handleCopy(MOCK_DATA.tokenId, 'token')}
                      isCopied={copiedField === 'token'}
                    />
                  </div>
                </div>

                <div className="bento-card rounded-2xl p-6">
                  <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">Network & Storage</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider block mb-1">Blockchain</span>
                      <span className="text-sm text-gray-200">{MOCK_DATA.blockchain}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider block mb-1">Metadata</span>
                      <span className="text-sm text-gray-200">{MOCK_DATA.metadataType}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider block mb-1">Creator ID</span>
                      <span className="text-sm text-gray-200 font-mono">{MOCK_DATA.creatorId}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Media & Actions */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="bento-card rounded-2xl p-8 flex flex-col items-center text-center justify-center flex-grow">
                <QrCode className="text-[#D4AF37] mb-6 opacity-80" size={32} />
                <div className="bg-white p-3 rounded-xl mb-6 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ishwar-archives.vercel.app&color=000000&bgcolor=ffffff" alt="QR Code" className="w-[120px] h-[120px]" />
                </div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-2">
                  Physical Link
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  This QR code permanently anchors the physical sculpture to its digital ledger.
                </p>
              </div>

              <div 
                onClick={() => setCurrentView('provenance')}
                className="bento-card rounded-2xl p-6 relative overflow-hidden group cursor-pointer flex items-center justify-between"
              >
                <div className="absolute right-0 top-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-colors"></div>
                <div>
                  <h3 className="text-sm font-medium text-white mb-1">Provenance of Matter</h3>
                  <p className="text-xs text-gray-500">Explore physical origins</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                  <Sparkles size={16} />
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* PROVENANCE / LEARN MORE VIEW */}
      {currentView === 'provenance' && (
        <div className="animate-in slide-in-from-right-8 duration-500 pt-24 pb-24 px-6 min-h-screen">
          <div className="max-w-6xl mx-auto">
            
            {/* Back Button */}
            <button 
              onClick={() => setCurrentView('main')}
              className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors uppercase tracking-widest text-xs font-semibold mb-12 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Return to Registry
            </button>

            {/* Header */}
            <div className="mb-16">
              <h1 className="text-3xl sm:text-5xl font-light text-white tracking-widest uppercase mb-4" style={{ fontFamily: '"Cinzel", "Times New Roman", serif' }}>
                Provenance of Matter
              </h1>
              <div className="h-px w-32 bg-gradient-to-r from-[#D4AF37] to-transparent mb-8"></div>
              <p className="text-gray-400 max-w-2xl leading-relaxed font-light">
                Every physical element of this artwork has been meticulously sourced. Explore the duality of the grounding vessel and its passionate essence.
              </p>
            </div>

            {/* Section 1: The Vessel (Body) */}
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                <Box className="text-gray-500" size={24} />
                <h2 className="text-2xl font-light text-white tracking-widest uppercase">
                  The Vessel <span className="text-gray-600 mx-2">|</span> <span className="text-gray-400">Body</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {VESSEL_MATERIALS.map((mat, index) => (
                  <MaterialCard key={index} mat={mat} />
                ))}
              </div>
            </div>

            {/* Section 2: The Essence (Soul) */}
            <div>
              <div className="flex items-center gap-3 mb-8 border-b border-[#D4AF37]/20 pb-4">
                <Diamond className="text-[#D4AF37]" size={24} />
                <h2 className="text-2xl font-light text-white tracking-widest uppercase">
                  The Essence <span className="text-[#D4AF37]/50 mx-2">|</span> <span className="text-[#D4AF37]">Soul</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {ESSENCE_MATERIALS.map((mat, index) => (
                  <MaterialCard key={index} mat={mat} />
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center bg-[#000000]">
        <div className="flex items-center justify-center gap-2 text-zinc-500 mb-3">
          <ShieldCheck size={14} />
          <span className="text-xs tracking-widest uppercase">Secured by The Fine Art Ledger Protocol</span>
        </div>
        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
          © {new Date().getFullYear()} Ishwar Archives. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

// --- Helper Components ---
function MaterialCard({ mat }: { mat: any }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bento-card flex flex-col h-full border border-white/5 hover:border-white/20 transition-all duration-500">
      {/* Immersive Image Container */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#111]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10"></div>
        {/* The Image Tag */}
        <img 
          src={mat.image} 
          alt={mat.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        {/* Type Tag */}
        <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
          <span className={`text-[10px] uppercase tracking-widest font-semibold ${mat.type === 'Soul' ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
            {mat.type}
          </span>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-6 relative z-20 flex-grow flex flex-col bg-[#050505] border-t border-white/5">
        <h3 className="text-2xl font-light text-white mb-3 font-serif tracking-wide group-hover:text-[#D4AF37] transition-colors">{mat.name}</h3>
        <p className="text-sm text-gray-400 leading-relaxed font-light">{mat.desc}</p>
      </div>
    </div>
  );
}

function DetailItem({ label, value, icon, onCopy, isCopied, truncate = true }: DetailItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
        <span className="text-[#D4AF37] opacity-80">{icon}</span>
        {label}
      </div>
      <div className="flex items-center justify-between bg-[#000000] border border-white/5 rounded-lg p-3 group hover:border-[#D4AF37]/30 transition-colors">
        <span className={`font-mono text-sm text-gray-300 ${truncate ? 'truncate max-w-[85%]' : 'break-all'}`}>
          {value}
        </span>
        {onCopy && (
          <button 
            onClick={onCopy}
            className="text-zinc-600 hover:text-[#D4AF37] transition-colors focus:outline-none"
            title="Copy to clipboard"
          >
            {isCopied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}