import { useState, type ReactNode } from 'react';
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
  ArrowLeft,
  Play,
  MapPin,
  Globe,
  Compass
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
  subtitle: "ISHWAR ARCHIVES VOL 4 | LIVING GEODE",
  artist: "Elena Rostova",
  year: "2026",
  descriptionLink: "https://pemetaanbudaya.jkkn.gov.my/en/senibudaya/detail/741",
  descriptionText: "THIS WORK IS A TOPOGRAPHICAL RECORD OF SPIRITUAL ENDURANCE.UTILISING THE RAW LIMESTONE AND RED EARTH HARVESTED FROM THE LIVING LABORATORY @ THE BANJARAN’S STEAM CAVE, I HAVE LITHIFIED THE GEOTHERMAL HEAT INTO A PHYSICAL PLANE THROUGH THE FOSSILISATION OF ONE OF PERAK’S CULTURAL WARRIOR DANCE; DABUS.",
  imageUrl: "/sculpture.png", 
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
const VESSEL_MATERIALS = [
  {
    name: "Limestone",
    type: "Body",
    image: "/Limestone.jpg", 
    desc: "A sedimentary rock forming the structural foundation, representing ancient earth and grounding physical presence."
  },
  {
    name: "Quartz Crystals",
    type: "Body",
    image: "/ClearQuartz.jpg", 
    desc: "A carbonate mineral providing luminous structural integrity, channeling energy through its crystalline lattice."
  },
  {
    name: "Red Earth Sand",
    type: "Body",
    image: "/redsand.jpeg", // Make sure your image name matches this exactly! (or change to .jpg)
    desc: "Rich, iron-infused terracotta soil grounding the piece in the primordial earth, representing raw, organic physical connection."
  }
];

const ESSENCE_MATERIALS = [
  {
    name: "Meteorite",
    type: "Soul",
    image: "/Meteorite.png", 
    desc: "Extraterrestrial forged iron-nickel, carrying the cosmic signature and raw primordial fire of the universe."
  },
  {
    name: "Ruby",
    type: "Soul",
    image: "/Ruby.jpg", 
    desc: "A blood-red corundum gemstone embedding the fierce, passionate essence of Agni (The Ignition)."
  }
];

export default function App() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  // Three distinct page views: Main, Material Provenance (Page 2), and Regional Mapping (Page 3)
  const [currentView, setCurrentView] = useState<'main' | 'provenance' | 'geography'>('main');

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
                The Raw Fire | Agni | <br />The Ignition
              </h1>
              <h2 className="text-[#D4AF37] text-sm sm:text-lg tracking-[0.2em] uppercase font-medium mb-6">
                {MOCK_DATA.subtitle}
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6"></div>
              
              <a 
                href={MOCK_DATA.descriptionLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-wrap items-center justify-center text-center gap-2 text-gray-400 hover:text-white transition-colors text-sm sm:text-base font-light tracking-wider max-w-2xl leading-loose px-4 underline-offset-8 hover:underline"
                  >
                <span>{MOCK_DATA.descriptionText}</span>
                <ExternalLink size={14} className="text-[#D4AF37] group-hover:scale-110 transition-transform shrink-0 mt-0.5" />
              </a>
              
              {/* Premium Dual Buttons Rows with beautiful spacing */}
              <div className="mt-10 mb-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => setCurrentView('provenance')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-none border border-[#D4AF37]/50 text-black bg-[#D4AF37] hover:bg-white hover:border-white transition-all duration-500 font-medium tracking-[0.2em] uppercase text-xs text-center"
                >
                  Learn More
                </button>

                <a 
                  href="https://www.youtube.com/watch?v=kfD9L_aNf6w" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-none border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 font-medium tracking-[0.2em] uppercase text-xs flex items-center justify-center gap-2 group"
                >
                  <Play size={12} className="group-hover:scale-110 transition-transform fill-current" />
                  View Creation
                </a>
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
                  <h2 className="text-lg font-light text-white tracking-widest uppercase">Blockchain Passport Identity</h2>
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
                    label="Art Serial number" 
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
                  {/* Standardized QR Image asset from previous step */}
                  <img src="/certificate.png" alt="QR Code" className="w-[120px] h-[120px] object-contain" />
                </div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-2">
                  Physical Link
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  This QR code permanently anchors the physical sculpture to its digital ledger.
                </p>
              </div>

              {/* Navigation Split Row to visit Page 2 or Page 3 */}
              <div className="grid grid-cols-2 gap-3">
                <div 
                  onClick={() => setCurrentView('provenance')}
                  className="bento-card rounded-2xl p-4 relative overflow-hidden group cursor-pointer flex flex-col justify-between h-[110px]"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform mb-2">
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-white mb-0.5">Matter Provenance</h3>
                    <p className="text-[10px] text-gray-500">Physical origins</p>
                  </div>
                </div>

                <div 
                  onClick={() => setCurrentView('geography')}
                  className="bento-card rounded-2xl p-4 relative overflow-hidden group cursor-pointer flex flex-col justify-between h-[110px] border-[#D4AF37]/20"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] animate-pulse mb-2">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-white mb-0.5">Geographic Map</h3>
                    <p className="text-[10px] text-[#D4AF37]">Ipoh, Perak</p>
                  </div>
                </div>
              </div>

            </div>
          </main>
          {/* --- THE KINETIC FOSSIL SECTION --- */}
          <section className="relative z-10 max-w-5xl mx-auto px-4 pb-32">
            
            {/* Title & Description */}
            <div className="mb-12 text-center flex flex-col items-center">
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-widest uppercase mb-4" style={{ fontFamily: '"Cinzel", "Times New Roman", serif' }}>
                The Kinetic Fossil
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8"></div>
              
              <p className="text-gray-400 max-w-3xl leading-loose font-light text-[10px] sm:text-xs tracking-[0.2em] uppercase text-center">
                Dabus is a unique martial art form found primarily in the state of Perak, introduced over 300 years ago. It is not merely a performance but a spiritual discipline. Historically, it was used to mentally and spiritually prepare warriors for battle, instilling a state of fearlessness. The ritual involves the use of the Anak Dabus; a sharp iron spike with ringing bells attached to the handle.
              </p>
            </div>

            {/* Cinematic Video Link Image */}
            <a 
              href="https://cdpapps.jkkn.gov.my/video/pemetaan-budaya/04V04_Tarian%20Dabus_F2_Subs.mp4"
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative w-full h-[300px] sm:h-[500px] overflow-hidden rounded-2xl border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              {/* Darkening Overlay for mood */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10"></div>
              
              {/* Interactive Play Button HUD */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-20 h-20 rounded-full bg-[#111]/80 backdrop-blur-md border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                  <Play size={28} className="ml-1 fill-current" />
                </div>
              </div>

              {/* The Background Image */}
              {/* IMPORTANT: Ensure the filename matches what you uploaded to the public folder! */}
              <img 
                src="/dabus_thumbnail.png" 
                alt="The Kinetic Fossil - Dabus Ritual" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80 group-hover:opacity-100"
              />
            </a>
            {/* Learn More Button - Deep Dive Link */}
            <div className="mt-12 flex justify-center">
              <a 
                href="https://pemetaanbudaya.jkkn.gov.my/senibudaya/detail/741"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-none border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 font-medium tracking-[0.2em] uppercase text-xs flex items-center justify-center gap-2 group"
              >
                Learn More
                <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </section>
          {/* --- MANIFESTING THE REALM OF FIRE SECTION --- */}
          <section className="relative z-10 max-w-5xl mx-auto px-4 pb-32">
            
            {/* Title & Description */}
            <div className="mb-12 text-center flex flex-col items-center">
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-widest uppercase mb-4" style={{ fontFamily: '"Cinzel", "Times New Roman", serif', textShadow: '0 0 40px rgba(212,175,55,0.2)' }}>
                Manifesting the Realm of Fire
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8"></div>
              
              <p className="text-gray-400 max-w-3xl leading-loose font-light text-[10px] sm:text-xs tracking-[0.2em] uppercase text-center">
                A 4K cinematic bridge between heart and canvas. Step into the mind of the artist to experience the visceral manifestation of Agni; witnessing the alchemical fusion of mineral, art and soul.
              </p>
            </div>

            {/* Cinematic Auto-Looping Video */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              
              {/* The Video Element */}
              {/* IMPORTANT: Make sure your video in the public folder is named 'agni-cinematic.mp4' */}
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-[300px] sm:h-[600px] object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000 saturate-150 contrast-125"
              >
                <source src="RealofFire.mp4" type="video/mp4" />
                
              </video>

              {/* Seamless Dark Edge Blending */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,5,5,0.6)_100%)] pointer-events-none z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-50 pointer-events-none z-10"></div>
            </div>

          </section>
          {/* --- LIGHT BODY MECHANISM SECTION --- */}
          <section className="relative z-10 max-w-5xl mx-auto px-4 pb-32">
            
            {/* Title & Description */}
            <div className="mb-12 text-center flex flex-col items-center">
              <h3 className="text-[#D4AF37] text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
                Yogic & Varma Science
              </h3>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-widest uppercase mb-4" style={{ fontFamily: '"Cinzel", "Times New Roman", serif' }}>
                Light Body Mechanism
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8"></div>
              
              <p className="text-gray-400 max-w-3xl leading-loose font-light text-[10px] sm:text-xs tracking-[0.2em] uppercase text-center">
                <span className="text-white font-medium">AGNI TATTWA:</span> THE INTEGRATION OF THE METEORITE (CELESTIAL IRON) AND RUBY ACTIVATES THE SOLAR PLEXUS. BY MIRRORING THE KUTTU VARMAM STRIKES, THE ARTWORK CAUTERISES THE NERVOUS SYSTEM, TRANSFORMING TAMASIC INERTIA INTO TEJAS (ILLUMINATION).
              </p>
            </div>

            {/* Mid Section Box: ATT Points */}
            <div className="max-w-md mx-auto bento-card rounded-2xl p-8 relative overflow-hidden group border border-[#D4AF37]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-[#D4AF37]/5 group-hover:bg-[#D4AF37]/10 transition-colors duration-500"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
                  <Sparkles size={14} className="text-[#D4AF37]" />
                  Energy Matrix
                </span>
                <h4 className="text-lg text-white uppercase tracking-widest font-light mb-6">
                  ATT Points Collected
                </h4>
                
                {/* Score Display */}
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-6xl sm:text-7xl font-light text-[#D4AF37] font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">80</span>
                  <span className="text-xl text-gray-600 font-mono">/ 100</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-black rounded-full overflow-hidden border border-white/5 relative mb-2">
                  <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#D4AF37]/30 to-[#D4AF37] w-[80%] shadow-[0_0_15px_rgba(212,175,55,0.8)]"></div>
                </div>
                
                {/* Status Tags */}
                <div className="w-full flex justify-between text-[9px] text-gray-500 uppercase tracking-widest font-mono">
                  <span>Tamasic</span>
                  <span className="text-[#D4AF37] animate-pulse">Tejas Active</span>
                </div>
              </div>
            </div>
            
          </section>
          {/* --- THE TRINITY NARRATIVE SECTION --- */}
          <section className="relative z-10 max-w-6xl mx-auto px-4 pb-32">
            
            {/* Title */}
            <div className="mb-16 text-center flex flex-col items-center">
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-widest uppercase mb-4" style={{ fontFamily: '"Cinzel", "Times New Roman", serif' }}>
                The Trinity Narrative
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8"></div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Image 1: The Roads */}
              <div className="group relative overflow-hidden rounded-2xl bento-card border border-[#D4AF37]/20 transition-all duration-700 hover:border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="relative h-[450px] sm:h-[600px] w-full overflow-hidden bg-[#111]">
                  <img 
                    src="/Paint1.png" 
                    alt="The Roads | Herman WSY" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  {/* Cinematic gradient fade at the bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700"></div>
                </div>
                
                {/* Floating Text Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center text-center z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-[#D4AF37] text-xl sm:text-2xl tracking-[0.2em] uppercase font-light mb-2" style={{ fontFamily: '"Cinzel", "Times New Roman", serif' }}>
                    The Roads
                  </h3>
                  <div className="flex items-center gap-4 w-full justify-center">
                    <div className="h-[1px] w-8 bg-[#D4AF37]/30"></div>
                    <span className="text-gray-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">
                      Herman WSY
                    </span>
                    <div className="h-[1px] w-8 bg-[#D4AF37]/30"></div>
                  </div>
                </div>
              </div>

              {/* Image 2: The Roots */}
              <div className="group relative overflow-hidden rounded-2xl bento-card border border-[#D4AF37]/20 transition-all duration-700 hover:border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="relative h-[450px] sm:h-[600px] w-full overflow-hidden bg-[#111]">
                  <img 
                    src="/Paint2.png" 
                    alt="The Roots | Mashitah N" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  {/* Cinematic gradient fade at the bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700"></div>
                </div>
                
                {/* Floating Text Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center text-center z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-[#D4AF37] text-xl sm:text-2xl tracking-[0.2em] uppercase font-light mb-2" style={{ fontFamily: '"Cinzel", "Times New Roman", serif' }}>
                    The Roots
                  </h3>
                  <div className="flex items-center gap-4 w-full justify-center">
                    <div className="h-[1px] w-8 bg-[#D4AF37]/30"></div>
                    <span className="text-gray-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">
                      Mashitah N
                    </span>
                    <div className="h-[1px] w-8 bg-[#D4AF37]/30"></div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
      )}

      {/* PAGE 2: MATERIAL PROVENANCE VIEW */}
      {currentView === 'provenance' && (
        <div className="animate-in slide-in-from-right-8 duration-500 pt-24 pb-24 px-6 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <button 
              onClick={() => setCurrentView('main')}
              className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors uppercase tracking-widest text-xs font-semibold mb-12 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Return to Registry
            </button>

            <div className="mb-16 text-center flex flex-col items-center">
              <h1 className="text-3xl sm:text-5xl font-light text-white tracking-widest uppercase mb-4" style={{ fontFamily: '"Cinzel", "Times New Roman", serif' }}>
                Provenance of Matter
              </h1>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8"></div>
              <p className="text-gray-400 max-w-2xl leading-relaxed font-light text-center">
                OPERATING UNDER THE PRINCIPLE OF GEOLOGICAL AUTHENTICITY, EACH WORK OF ART DOESN’T MERELY REPRESENT THE ELEMENTS, IT IS PHYSICALLY INCORPORATED
              </p>
            </div>

            <div className="mb-20">
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                <Box className="text-gray-500" size={24} />
                <h2 className="text-2xl font-light text-white tracking-widest uppercase">
                  The Vessel <span className="text-gray-600 mx-2">|</span> <span className="text-gray-400">Body</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                  The Spark <span className="text-[#D4AF37]/50 mx-2">|</span> <span className="text-[#D4AF37]">Soul</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {ESSENCE_MATERIALS.map((mat, index) => (
                  <MaterialCard key={index} mat={mat} />
                ))}
              </div>
            </div>

            {/* Learn More Button - Gem Society Link (MOVED HERE) */}
            <div className="mt-16 flex justify-center">
              <a 
                href="https://www.gemsociety.org/article/gem-pricing-guide-sample/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-none border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 font-medium tracking-[0.2em] uppercase text-xs flex items-center justify-center gap-2 group"
              >
                Learn More
                <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>

          </div>
        </div>
      )}

      {/* PAGE 3: GEOGRAPHIC ORIGIN REGISTRY (WITH INTERACTIVE HOVER MAP) */}
      {currentView === 'geography' && (
        <div className="animate-in slide-in-from-right-8 duration-500 pt-24 pb-24 px-6 min-h-screen">
          <div className="max-w-6xl mx-auto">
            
            {/* Navigation back */}
            <button 
              onClick={() => setCurrentView('main')}
              className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors uppercase tracking-widest text-xs font-semibold mb-12 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Return to Registry
            </button>

            {/* Header */}
              <div className="mb-12 text-center flex flex-col items-center">
              <h1 className="text-3xl sm:text-5xl font-light text-white tracking-widest uppercase mb-4" style={{ fontFamily: '"Cinzel", "Times New Roman", serif' }}>
                Geographic Provenance
              </h1>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8"></div>
              <p className="text-gray-400 max-w-2xl leading-relaxed font-light text-center">
              VERIFIABLE GEOSPATIAL COORDINATED LOGGING THE PRIMARY ORIGIN OF THE MINERALS EMBEDDED WITHIN THIS PHYSICAL MASTERWORK
              </p>
              </div>

            {/* Interactive Grid Map Interface Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Map Left Side Dashboard Display */}
              <div className="lg:col-span-8 bg-neutral-950/40 border border-[#D4AF37]/20 rounded-3xl p-4 sm:p-8 relative h-[450px] sm:h-[550px] flex items-center justify-center overflow-hidden group/map select-none">
                
                {/* Tech HUD style matrix grid background lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505] pointer-events-none"></div>

                <img 
                  src="/map-ipoh.png" 
                  alt="Ipoh Perak Sourcing Map" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity group-hover/map:scale-105 transition-transform duration-1000 pointer-events-none" 
                />

                {/* Compass HUD Element */}
                <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-neutral-600">
                  <Compass size={16} className="animate-spin-slow text-neutral-700" />
                  REGIONAL MATRICES ACTIVE
                </div>

                {/* --- INTERACTIVE PULSING TARGET PINPOINT MAP MARKER --- */}
                <div className="absolute top-[50%] left-[55%] -translate-x-1/2 -translate-y-1/2 z-3xl group/pin cursor-crosshair">
                  
                  {/* Concentric expanding wave rings */}
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex h-20 w-20 rounded-full bg-[#D4AF37]/10 animate-ping opacity-60"></span>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex h-10 w-10 rounded-full bg-[#D4AF37]/20 animate-pulse"></span>
                  
                  {/* Glowing central golden pivot pin */}
                  <div className="w-5 h-5 bg-[#D4AF37] rounded-full border-4 border-black relative z-10 shadow-[0_0_20px_#D4AF37] group-hover/pin:scale-125 transition-transform duration-300"></div>

                  {/* --- HOVERING TRIGGERED INFO OVERLAY MODAL WINDOW --- */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[260px] sm:w-[320px] bg-[#0a0a0a]/95 border border-[#D4AF37] p-5 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-md opacity-0 pointer-events-none group-hover/pin:opacity-100 transition-all duration-500 transform translate-y-2 group-hover/pin:translate-y-0 z-50">
                    <div className="flex items-start gap-2.5 mb-3">
                      <MapPin size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-white font-medium text-sm tracking-wide">Banjaran Hotsprings</h4>
                        <p className="text-[11px] text-[#D4AF37] font-serif tracking-wider uppercase">Ipoh, Perak, Malaysia</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2.5 border-t border-white/10 pt-3 text-xs">
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-0.5">Geospatial Coordinates</span>
                        <span className="font-mono text-gray-300 text-[11px]">4.6306° N, 101.1561° E</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-0.5">Harvested Minerals Payload</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          <span className="px-2 py-0.5 bg-[#111] border border-white/10 rounded text-[10px] text-white">Limestone Hills Sourcing</span>
                          <span className="px-2 py-0.5 bg-[#111] border border-[#D4AF37]/30 rounded text-[10px] text-[#D4AF37]">Pure Calcite Matrix</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructional Indicator Tag */}
                <div className="absolute top-6 right-6 bg-black/60 border border-white/5 px-4 py-1.5 rounded-md text-[10px] font-mono tracking-widest uppercase text-gray-400">
                  ⚡ Hover over the golden pinpoint
                </div>
              </div>

              {/* Sidebar metadata specifications profile card */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bento-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-white mb-6">
                    <Globe size={16} className="text-[#D4AF37]" />
                    <h3 className="text-xs uppercase tracking-widest font-semibold">Origin Report</h3>
                  </div>

                  <div className="space-y-5 text-sm">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Geographic Region</span>
                      <p className="text-gray-200">KINTA VALLEY KARST</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Environmental Site</span>
                      <p className="text-gray-200">ACTIVE GEOTHERMAL SPRINGS, TAMBUN</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Geological Age</span>
                      <p className="text-gray-200 font-mono text-xs">Formal Epoch :  Paleozoic Antiquity</p>
                    </div>
                  </div>
                </div>

                <div className="bento-card rounded-2xl p-6 bg-gradient-to-br from-[#111] to-black border-l-2 border-l-[#D4AF37]">
                  <h4 className="text-xs text-white uppercase tracking-widest font-semibold mb-2 flex items-center gap-1">
                    <ShieldCheck size={12} className="text-[#D4AF37]" /> Sourcing Authenticity
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    A VERIFIED PROVENANCE LEDGER ENSURING ZERO-IMPACT ETHICAL SOURCING. EXTRACTION COORDINATES ARE PERMANENTLY LOGGED TO HONOUR THE ANCIENT GEOLOGICAL HERITAGE AND ECOLOGICAL SANCTITY OF THE BANJARAN ENVIRONMENT.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      {/* Footer */}
      <footer className="border-t border-white/10 py-16 text-center bg-[#000000] relative z-10">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
          
          {/* Security Icon */}
          <div className="flex items-center justify-center text-[#D4AF37] mb-6">
            <ShieldCheck size={20} />
          </div>

          {/* Legacy & Authentication Text */}
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.2em] leading-loose mb-12 text-center max-w-2xl">
            © 2026 ISHWAR ARCHIVES LEGACY. PRODUCED IN PARTNERSHIP WITH SUNWAY SYNERGY.<br className="hidden md:block" /> AUTHENTICATED ON POLYGON BLOCKCHAIN.
          </p>

          {/* VIP Sponsor Logos - Expanded Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-12 w-full max-w-5xl mx-auto mt-12 items-center">
            
            {/* Logo 1: The Banjaran */}
            <SponsorLogo src="/the-banjaran-logo.jpg" alt="The Banjaran" />
            
            {/* Logo 2: Sunway */}
            <SponsorLogo src="/Sunway_logo.png" alt="Sunway Synergy" />
            
            {/* Logo 3: FAI */}
            <SponsorLogo src="/FAI_LOGO-removebg-preview.png" alt="FAI" />
            
            {/* Logo 4: Wellness */}
            <SponsorLogo src="/wellness_logo-removebg-preview.png" alt="Wellness" />
            
            {/* Logo 5: Ishwar */}
            <SponsorLogo src="/IshwarLogo.png" alt="Ishwar" />

          </div>

        </div>
      </footer>
    </div>
  );
}

// --- Helper Components ---
function MaterialCard({ mat }: { mat: any }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bento-card flex flex-col h-full border border-white/5 hover:border-white/20 transition-all duration-500">
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#111]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10"></div>
        <img 
          src={mat.image} 
          alt={mat.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
          <span className={`text-[10px] uppercase tracking-widest font-semibold ${mat.type === 'Soul' ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
            {mat.type}
          </span>
        </div>
      </div>
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
function SponsorLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative p-4 sm:p-6 rounded-2xl border border-transparent hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition-all duration-500 flex items-center justify-center cursor-pointer">
      <div className="absolute inset-0 bg-[#D4AF37] opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 rounded-full"></div>
      <img 
        src={src} 
        alt={alt} 
        /* UPDATED HEIGHTS: Changed h-12 -> h-16 and h-20 -> h-28 */
        className="relative z-10 h-40 sm:h-50 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 drop-shadow-[0_0_10px_rgba(255,255,255,0.05)] group-hover:drop-shadow-[0_10px_20px_rgba(212,175,55,0.3)]"
      />
    </div>
  );
}