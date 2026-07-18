import { useState, type ReactNode } from 'react';
import { 
  ShieldCheck, 
  Copy, 
  ExternalLink,  
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
  Compass,
  Palette,
  Gem,
  X,
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

// --- UPDATED MATERIAL LISTS (WITH DEEP CODEX DATA) ---
const VESSEL_MATERIALS = [
  {
    name: "Raw Limestone",
    subtitle: "The Foundation of The Vessel",
    type: "Body",
    image: "/Limestone.jpg", 
    desc: "A sedimentary rock forming the structural foundation, representing ancient earth and grounding physical presence.",
    materialData: [
      { label: "Composition", value: "Calcium Carbonate (CaCO₃) with trace geothermal mineral deposits." },
      { label: "Origin", value: "The Paleozoic Karst Systems of the Kinta Valley, Malaysia." },
      { label: "Geological Age", value: "Approx. 400 Million Years (Devonian Period)." },
      { label: "Hardness", value: "3.0 – 4.0 (Mohs Scale)." },
      { label: "Geological Profile", value: "A massive sedimentary cornerstone forged over eons of extreme subterranean pressure and ancient marine calcification. Within The Banjaran’s ecosystem, it acts as a natural thermodynamic regulator, trapping and sustaining the earth's geothermal heat." }
    ],
    resonanceData: [
      { label: "Frequency", value: "Ultra-Low (Deep Earth Resonance)." },
      { label: "Chakra Alignment", value: "Root (Muladhara) – The anchor of the physical plane." },
      { label: "Energetic Profile", value: "Governs extreme grounding and spatial endurance. Limestone absorbs and neutralizes chaotic frequencies, transmuting raw, volatile energy into stabilized matter." },
      { label: "Alchemical Purpose", value: "To serve as the absolute, unyielding foundation of The Vessel. It provides the silent architectural integrity required to hold the cosmic heat of The Spark without fracturing." }
    ]
  },
  {
    name: "Quartz",
    subtitle: "The Amplifier of The Vessel",
    type: "Body",
    image: "/ClearQuartz.jpg", 
    desc: "A carbonate mineral providing luminous structural integrity, channeling energy through its crystalline lattice.",
    materialData: [
      { label: "Composition", value: "Silicon Dioxide (SiO2)." },
      { label: "Origin", value: "Subterranean crystalline veins native to the Kinta Valley geological matrix." },
      { label: "Geological Age", value: "Primordial crystallization (Hydrothermal vein formation)." },
      { label: "Hardness", value: "7.0 (Mohs Scale)." },
      { label: "Geological Profile", value: "A highly structured, continuous framework of silicon-oxygen tetrahedra. Quartz possesses natural piezoelectric properties, meaning it physically generates a measurable electrical charge when subjected to mechanical or subterranean pressure." }
    ],
    resonanceData: [
      { label: "Frequency", value: "Ultra-High (Programmable Amplification)." },
      { label: "Chakra Alignment", value: "Crown (Sahasrara) and the Universal Matrix." },
      { label: "Energetic Profile", value: "Universally recognised as a 'Master Healer' and energetic hard drive. Quartz is a bio-resonant crystalline structure capable of absorbing, storing, regulating, and amplifying environmental frequencies with absolute clarity." },
      { label: "Alchemical Purpose", value: "To serve as the conductive nervous system within The Vessel. While the Limestone provides the heavy, unyielding anchor, the Quartz ensures the structure does not become inert. It catches the cosmic heat of The Spark and amplifies it, allowing the energy of creation to pulse continuously throughout the physical body." }
    ]
  },
  {
    name: "Red Earth Sand",
    subtitle: "The Binder of The Vessel",
    type: "Body",
    image: "/redsand.jpeg", 
    desc: "Rich, iron-infused terracotta soil grounding the piece in the primordial earth, representing raw, organic physical connection.",
    materialData: [
      { label: "Composition", value: "Ferric Oxide-rich Laterite (Fe₂O₃) and aluminosilicate clay minerals." },
      { label: "Origin", value: "The geothermal and tropical weathering layers of the Kinta Valley basin." },
      { label: "Geological Age", value: "Pleistocene to Holocene (Dynamic and continuously evolving)." },
      { label: "Hardness", value: "Variable (Malleable earth matrix)." },
      { label: "Geological Profile", value: "A highly oxidised, mineral-dense earth created by millennia of extreme tropical weathering and geothermal soil conditioning. Its deep crimson colour is a direct result of rich iron concentrations, making it a naturally porous, structurally binding terrestrial clay." }
    ],
    resonanceData: [
      { label: "Frequency", value: "Mid-Low (Telluric / Life-Force Resonance)." },
      { label: "Chakra Alignment", value: "Sacral (Svadhisthana) and Root (Muladhara) – The centers of creation and vitality." },
      { label: "Energetic Profile", value: "The physical 'blood' of the earth. It represents organic growth, primal vitality, and human ancestry. It carries a deeply somatic energy, vibrating with the pulse of terrestrial life rather than the cold silence of deep space or deep stone." },
      { label: "Alchemical Purpose", value: "To serve as the organic binding agent within The Vessel. If Limestone is the bone and Quartz is the nervous system, the Red Earth is the flesh. It bridges the gap between the ancient, sterile minerals and the living, breathing human element, ensuring the artwork retains a grounded, mortal warmth." }
    ]
  }
];

const ESSENCE_MATERIALS = [
  {
    name: "Meteorite",
    subtitle: "The Catalyst of The Spark",
    type: "Soul",
    image: "/Meteorite.png", 
    desc: "Extraterrestrial forged iron-nickel, carrying the cosmic signature and raw primordial fire of the universe.",
    materialData: [
      { label: "Composition", value: "Iron-Nickel (Fe-Ni) alloy, often characterised by naturally occurring Widmanstätten crystalline patterns." },
      { label: "Origin", value: "Extraterrestrial descent (Primordial asteroid belt remnants)." },
      { label: "Geological Age", value: "Approx. 4.5 Billion Years (Pre-dating the formation of Earth)." },
      { label: "Hardness", value: "4.0 – 5.0 (Mohs Scale)." },
      { label: "Geological Profile", value: "A literal fragment of the early solar system that survived the violent thermal shock of atmospheric entry. Forged in the vacuum of deep space through millions of years of microscopic cooling, it is dense, highly magnetic matter carrying an extreme electromagnetic signature from its cosmic impact." }
    ],
    resonanceData: [
      { label: "Frequency", value: "High-Velocity Cosmic." },
      { label: "Chakra Alignment", value: "Third Eye (Ajna) and Crown (Sahasrara) – The channels of universal consciousness." },
      { label: "Energetic Profile", value: "A conduit of extreme acceleration and sudden awakening. Unlike earth-bound stones that ground and stabilize, Meteorite shatters stagnation. It carries the chaotic, untamed velocity of a falling star, pushing boundaries and expanding spiritual endurance." },
      { label: "Alchemical Purpose", value: "To act as the cosmic strike against the earthly Vessel. In the alchemy of creation, Meteorite provides the celestial friction necessary to ignite the Dabus spirit. It is the alien catalyst that shocks the dormant limestone into the fire of manifestation." }
    ]
  },
  {
    name: "Ruby",
    subtitle: "The Core of The Spark",
    type: "Soul",
    image: "/Ruby.jpg", 
    desc: "A blood-red corundum gemstone embedding the fierce, passionate essence of Agni (The Ignition).",
    materialData: [
      { label: "Composition", value: "Aluminum Oxide with Chromium trace elements (Al₂O₃:Cr)." },
      { label: "Origin", value: "Extreme-pressure metamorphic rock formations." },
      { label: "Geological Age", value: "Deep crustal formation requiring specific, high temperature tectonic events." },
      { label: "Hardness", value: "9.0 (Mohs Scale) – The hardest natural mineral after diamond." },
      { label: "Geological Profile", value: "A premium variety of the corundum family. Its brilliant crimson colour and unique ability to naturally fluoresce under UV light are entirely dictated by the presence of chromium. It is a gemstone forged purely through intense subterranean heat and massive geological friction." }
    ],
    resonanceData: [
      { label: "Frequency", value: "High-Intensity Kinetic." },
      { label: "Chakra Alignment", value: "Root (Muladhara) and Heart (Anahata) – The bridge between survival and passion." },
      { label: "Energetic Profile", value: "Historically revered as the stone of kings and warriors. It radiates a fiercely active, unquenchable life force. Ruby does not calm; it invigorates, acting as an energetic battery for sustained passion, courage, and kinetic movement." },
      { label: "Alchemical Purpose", value: "To serve as the eternal, burning core of The Spark. If the Meteorite is the initial cosmic strike, the Ruby is the resulting flame. It perfectly embodies the raw, fearless energy of the Dabus spirit, ensuring that once the fire of creation is lit within The Vessel, it never burns out." }
    ]
  }
];

// --- CLICKABLE MATERIAL CARD COMPONENT ---
const MaterialCard = ({ mat, onClick }: { mat: any, onClick: () => void }) => (
  <div 
    onClick={onClick} 
    className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 hover:border-[#D4AF37]/50 transition-all duration-500 cursor-pointer hover:-translate-y-1"
  >
    <div className="aspect-[4/3] overflow-hidden">
      <img 
        src={mat.image} 
        alt={mat.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
      />
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-light text-white tracking-widest uppercase">{mat.name}</h3>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed font-light">{mat.desc}</p>
    </div>
  </div>
);

export default function App() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  // Three distinct page views: Main, Material Provenance (Page 2), and Regional Mapping (Page 3)
  const [currentView, setCurrentView] = useState<'main' | 'provenance' | 'geography'>('main');
  
  // 👇 MOVED THIS HERE: Tracks which mineral is currently open in the Deep Dive Modal
  const [selectedMineral, setSelectedMineral] = useState<any>(null);

  // 👇 handleCopy is now clean and separate!
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

  {/* 1. UPDATED NAVBAR - NEW TITLE, NO LOGOS, CENTERED ALIGNMENT */}
      <nav className="fixed top-0 w-full z-[100] bg-[#050505] border-b border-[#D4AF37]/10 shadow-lg overflow-hidden">
        
        {/* INNER WRAPPER */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex justify-center items-center">

          {/* Centered Title */}
          <div className="flex items-center relative text-center">
            {/* Ambient Background Flare */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[200%] bg-[#D4AF37]/20 blur-xl rounded-full pointer-events-none"></div>
            
            <span 
              className="relative z-10 font-light tracking-[0.15em] sm:tracking-[0.3em] uppercase text-[9px] sm:text-[11px] text-white leading-[1.6] sm:leading-none"
              style={{ textShadow: '0 0 15px rgba(212, 175, 55, 0.8), 0 0 30px rgba(212, 175, 55, 0.3)' }}
            >
              The Living Laboratory: <br className="sm:hidden" />Digital Frontier of Heritage
            </span>
          </div>

        </div>
      </nav>

      {/* MAIN VIEW */}
      {currentView === 'main' && (
        <div className="animate-in fade-in duration-700">
          {/* Cinematic Hero Section */}
          <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 px-4 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* 3D Floating Sculpture Container */}
            <div className="relative z-10 sculpture-container flex flex-col items-center mb-8 w-full px-4">
              <img 
                src={MOCK_DATA.imageUrl} 
                alt="Sculpture"
                /* 👇 UPDATED CLASSES: w-full, max-w, and h-auto allows it to infinitely scale! 👇 */
                className="animate-float w-full max-w-[260px] sm:max-w-[350px] md:max-w-[400px] h-auto object-contain drop-shadow-2xl"
                draggable="false"
              />
            </div>

            {/* Hero Typography */}
            <div className="relative z-10 text-center flex flex-col items-center max-w-2xl">
              <h1 
                className="text-5xl sm:text-7xl font-light text-white tracking-[0.2em] uppercase" 
                style={{ 
                  fontFamily: '"Cinzel", "Times New Roman", serif', // Added fallback fonts
                  color: '#ffffff',                                // Force white color
                  opacity: 1                                       // Ensure it is not hidden
                }}
              >
                The Raw Fire <br /> Agni |  The Ignition
              </h1>
              <h2 className="text-[#D4AF37] text-sm sm:text-lg tracking-[0.2em] uppercase font-medium mb-6">
                {MOCK_DATA.subtitle}
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6"></div>
              
              <p className="text-gray-400 text-sm sm:text-base font-light tracking-wider max-w-2xl mx-auto px-4 text-center leading-[1.8]">
                {MOCK_DATA.descriptionText}
              </p>
              
              {/* Premium Dual Buttons Rows with beautiful spacing */}
              {/* Hero Action Buttons */}
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                {/* View COA Button */}
                <a 
                  href="/certificate.jpg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 font-medium tracking-[0.2em] uppercase text-xs group mb-10"
                >
                  View COA
                  <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />

                </a>

                <a 
                  href="https://www.youtube.com/watch?v=kfD9L_aNf6w" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-none border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 font-medium tracking-[0.2em] uppercase text-xs flex items-center justify-center gap-2 group mb-10"
                >
                  <Play size={12} className="group-hover:scale-110 transition-transform fill-current" />
                  View Creation
                </a>
              </div>
            </div>
          </section>

          {/* Bento Box Dashboard UI */}
          <main className="relative z-10 max-w-4xl mx-auto px-4 pb-24 w-full">
            {/* Row 0: Artwork Specifications - HIGHLY ORGANIZED GRID */}
            <div className="bento-card rounded-2xl p-6 sm:p-8 w-full">
              <div className="flex items-center gap-3 mb-8">
                <Palette className="text-[#D4AF37]" size={20} />
                <h2 className="text-lg font-light text-white tracking-widest uppercase">Artwork Specifications</h2>
              </div>
              
              {/* Inner Grid with Mini-Cards (Upgraded to DetailItem boxes) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border-b border-white/5 pb-8 mb-6">
                
                <DetailItem 
                  icon={<Palette size={14} />} 
                  label="Artist" 
                  value="Raajashri Vegnishwar Nair" 
                  truncate={false}
                />
                
                <DetailItem 
                  icon={<Box size={14} />} 
                  label="Year" 
                  value="2026" 
                />
                
                <DetailItem 
                  icon={<Layers size={14} />} 
                  label="Series" 
                  value="VoL IV | The Living Geode" 
                  truncate={false}
                />
                
                {/* Spans 2 columns to give long text room */}
                <div className="sm:col-span-2">
                  <DetailItem 
                    icon={<Diamond size={14} />} 
                    label="Type" 
                    value="Geological Surrealism Fine Art Sculpture" 
                    truncate={false}
                  />
                </div>
                
                <DetailItem 
                  icon={<MapPin size={14} />} 
                  label="Size" 
                  value="1.3 x 1.9 ft" 
                />
                
                <DetailItem 
                  icon={<Gem size={14} />} 
                  label="Weight" 
                  value="26kg" 
                />
                
                <DetailItem 
                  icon={<ShieldCheck size={14} />} 
                  label="Edition" 
                  value="Master Piece 1/1" 
                />
                
                <DetailItem 
                  icon={<Sparkles size={14} />} 
                  label="Digital Creation" 
                  value="No" 
                />
                
                {/* Spans all 3 columns across the bottom */}
                <div className="sm:col-span-2 md:col-span-3">
                  <DetailItem 
                    icon={<Fingerprint size={14} />} 
                    label="Signature" 
                    value="Signed on the Upper Right Hand Corner" 
                    truncate={false}
                  />
                </div>
                
              </div>

              {/* Status & Purchase VIP Footer */}
              <div className="bg-[#D4AF37]/5 p-5 rounded-xl border border-[#D4AF37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 ">
                <div>
                  <span className="text-[9px] text-[#D4AF37] uppercase tracking-widest block mb-1">Purchased</span>
                  <span className="text-sm text-gray-200 ">May 18, 2026 @ Living Laboratory</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest block mb-1 sm:text-right">Status</span>
                  {/* Upgraded the SOLD badge to solid gold/black for premium contrast */}
                  <span className="inline-block text-xs font-bold tracking-[0.2em] text-black bg-[#D4AF37] px-4 py-1.5 rounded-sm  ">SOLD</span>
                </div>
              </div>
            </div>
            {/* Expanded Core Details Container */}
            <div className="flex flex-col gap-4 w-full mb-10 mt-3 ">
              <div className="bento-card rounded-2xl p-6 sm:p-8 m ">
                <div className="flex items-center gap-3 mb-10">
                  <Fingerprint className="text-[#D4AF37]" size={20} />
                  <h2 className="text-lg font-light text-white tracking-widest uppercase ">Blockchain Passport Identity</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
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
             

              {/* Row 3: Navigation Cards (Prominent Icons) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              
              {/* Lithic Codex Button */}
              <div onClick={() => setCurrentView('provenance')} className="bento-card rounded-2xl p-6 relative overflow-hidden group cursor-pointer flex flex-col justify-between h-[130px]">
                {/* Increased wrapper from w-10/h-10 to w-14/h-14 */}
                <div className="w-14 h-14 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform mb-2">
                  {/* Increased icon size from 16 to 28 */}
                  <Gem size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white mb-0.5">Lithic Codex</h3>
                  <p className="text-xs text-gray-500">Material & Resonance Data</p>
                </div>
              </div>

              {/* Geographic Map Button */}
              <div onClick={() => setCurrentView('geography')} className="bento-card rounded-2xl p-6 relative overflow-hidden group cursor-pointer flex flex-col justify-between h-[130px] border-[#D4AF37]/20">
                {/* Increased wrapper from w-10/h-10 to w-14/h-14 */}
                <div className="w-14 h-14 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] animate-pulse mb-2">
                  {/* Increased icon size from 16 to 28 */}
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white mb-0.5">Geographic Map</h3>
                  <p className="text-xs text-[#D4AF37]">Ipoh, Perak</p>
                </div>
              </div>

            </div>
            </div>
          </main>
          {/* --- THE KINETIC FOSSIL SECTION --- */}
          <section className="relative z-10 max-w-5xl mx-auto px-4 pb-32">
            
            {/* Title & Description */}
            <div className="mb-12 text-center flex flex-col items-center">
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-widest uppercase mb-4" style={{ fontFamily: '"Cinzel", "Times New Roman", serif', color: '#ffffff' }}>
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
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-widest uppercase mb-4" style={{ fontFamily: '"Cinzel", "Times New Roman", serif', textShadow: '0 0 40px rgba(212,175,55,0.2)', color: '#ffffff' }}>
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
            
          {/* --- YOGIC & VARMA SCIENCE CARD --- */}
            <div className="bento-card rounded-2xl p-6 sm:p-8 relative overflow-hidden h-full mb-10">
              {/* Subtle ambient glow in the corner */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/5 blur-3xl rounded-full pointer-events-none"></div>

              {/* Title & Subtitle */}
              <div className="flex flex-col mb-8 relative z-10">
                <h3 className="text-xl font-light text-white tracking-widest uppercase mb-3">
                  Yogic & Varma Science
                </h3>
                <div className="flex flex-col gap-1.5 text-[10px] tracking-[0.2em] uppercase font-mono text-[#D4AF37]/80">
                  <span>Element: Fire (Raw)</span>
                  <span>State: Unprocessed / Kinetic Catalyst</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="space-y-5 relative z-10">
                {/* Bolded Header */}
                <h4 className="text-sm font-medium text-white tracking-wider uppercase border-l-2 border-[#D4AF37] pl-3 mb-2">
                  Bio Energetic Resonance & Kinetic Activation
                </h4>
                
                <p className="text-sm text-gray-400 leading-[1.9] font-light tracking-wide">
                  IN ANCIENT BIO-ENERGETIC SCIENCES, THE RAW FIRE ELEMENT OPERATES ON THE PRIMAL FREQUENCY OF AGNI (COSMIC FIRE). WITHIN YOGIC PHYSIOLOGY, THIS RAW MINERAL DIRECTLY STIMULATES THE PINGALA NADI—THE BODY’S SOLAR, HEAT-GENERATING ENERGETIC CHANNEL. ITS RESONANT FREQUENCY ANCHORS INTO THE MANIPURA CHAKRA (THE SOLAR PLEXUS), SERVING AS THE PHYSIOLOGICAL FURNACE THAT TRANSFORMS LATENT HUMAN POTENTIAL INTO EXPLOSIVE, KINETIC ACTION.
                </p>
                
                <p className="text-sm text-gray-400 leading-[1.9] font-light tracking-wide">
                  VIEWED THROUGH THE LENS OF VARMA KALAI (THE ANCIENT SIDDHA SCIENCE OF VITAL NEURAL POINTS), THE RAW FIRE FREQUENCY ACTS AS A BIO-ELECTRICAL CATALYST. IT INTERACTS SPECIFICALLY WITH THE HEAT-GOVERNING VARMAM POINTS THAT REGULATE ADRENALINE, RHYTHM, AND MUSCULAR IGNITION. THIS IS THE EXACT BIO-ELECTRICAL FREQUENCY REQUIRED TO ENTER THE SUSTAINED, HIGH-ENERGY TRANCE STATES OBSERVED IN ANCIENT TRADITIONAL DANCES LIKE THE DABUS.
                </p>
                
                <p className="text-sm text-gray-400 leading-[1.9] font-light tracking-wide">
                  WHEN IN PROXIMITY TO THE HUMAN BIO-FIELD, THIS RAW MINERAL ACTS AS AN ENERGETIC AMPLIFIER. IT MIRRORS THE INTERNAL 'SPARK' OF THE HUMAN BODY, VISUALLY AND PHYSICALLY PROVING THE SCIENCE OF ONENESS: THE FIRE THAT FORGED THE COSMOS IS THE EXACT SAME ELECTRICAL FIRE THAT COMMANDS HUMAN MOVEMENT.
                </p>
              </div>
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
       {/* --- PILLARS OF CONVERGENCE SECTION (Formerly Trinity Narrative) --- */}
          <section className="relative z-10 max-w-6xl mx-auto px-4 pb-32 mt-16 sm:mt-24">
            
          {/* Title & Intro */}
            <div className="mb-16 text-center flex flex-col items-center">
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-widest uppercase mb-4" style={{ fontFamily: '"Cinzel", "Times New Roman", serif', color: '#ffffff' }}>
                Pillars of Convergence
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6"></div>
              
              <h3 className="text-sm sm:text-base font-medium text-[#D4AF37] tracking-[0.2em] uppercase mb-8 leading-[1.8] px-4">
                The Pillars of Convergence : <br className="sm:hidden" /> Ulu Kinta Geothermal Hot Springs
              </h3>
              
              <p className="text-sm sm:text-base text-gray-400 leading-[1.8] font-light tracking-wide max-w-4xl text-center">
                Within the Kinta Valley Geopark, the Raw Fire element does not manifest in the sky; it radiates from deep within the Earth. It is the subterranean geothermal spark that heats the ancient waters of the hot springs, acting as the primal catalyst for both the living ecosystem and the deep tectonic vibrations of the region. This raw kinetic energy is documented in the Lithic Codex through two distinct artistic lenses: Ecological and Resonant.
              </p>
            </div>

            {/* Image & Narrative Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-20">
              
              {/* Artwork 1: The Ecological (Herman WSY) */}
              <div className="flex flex-col group">
                <div className="relative h-[250px] sm:h-[500px] w-full overflow-hidden rounded-2xl bento-card border border-[#D4AF37]/20 transition-all duration-700 hover:border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] mb-8">
                  <div className="relative w-full h-full bg-[#111]">
                    <img 
                      src="/Paint1.png" 
                      alt="The Ecological | Herman WSY" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center text-center z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-[#D4AF37] text-xl sm:text-2xl tracking-[0.2em] uppercase font-light mb-2" style={{ fontFamily: '"Cinzel", "Times New Roman", serif' }}>
                      The Ecological
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

                <div className="px-2">
                  <div className="mb-4 border-l-2 border-[#D4AF37] pl-4">
                    <h4 className="text-lg font-light text-white tracking-widest uppercase mb-1" style={{ fontFamily: '"Cinzel", "Times New Roman", serif' }}>
                      The Biodiversity of The Hotsprings
                    </h4>
                    <span className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] block font-mono">Artwork Curation by Herman WSY</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-[1.8] font-light tracking-wide">
                    Moving from myth to the physical realm, Herman’s artwork documents the living, breathing reality forged by this geothermal fire. The raw heat of the earth creates a highly specialised micro-climate—a steaming, nutrient-rich environment that supports a unique matrix of flora and fauna. Herman captures the exact moment the Raw Fire element transforms into life-sustaining energy, immortalising the vibrant, thriving ecosystem of the hot springs.
                  </p>
                </div>
              </div>

              {/* Artwork 2: The Resonant (Garero Fumani) */}
              <div className="flex flex-col group">
                <div className="relative h-[250px] sm:h-[500px] w-full overflow-hidden rounded-2xl bento-card border border-[#D4AF37]/20 transition-all duration-700 hover:border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] mb-8">
                  <div className="relative w-full h-full bg-[#111]">
                    <img 
                      src="/Paint3.jpeg" 
                      alt="The Resonance | Garero Fumani" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center text-center z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-[#D4AF37] text-xl sm:text-2xl tracking-[0.2em] uppercase font-light mb-2" style={{ fontFamily: '"Cinzel", "Times New Roman", serif' }}>
                      The Resonance
                    </h3>
                    <div className="flex items-center gap-4 w-full justify-center">
                      <div className="h-[1px] w-8 bg-[#D4AF37]/30"></div>
                      <span className="text-gray-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">
                        Garero Fumani
                      </span>
                      <div className="h-[1px] w-8 bg-[#D4AF37]/30"></div>
                    </div>
                  </div>
                </div>

                {/* 👇 THIS IS THE BRAND NEW GARERO FUMANI TEXT BLOCK 👇 */}
                <div className="px-2">
                  <div className="mb-4 border-l-2 border-[#D4AF37] pl-4">
                    <h4 className="text-lg font-light text-white tracking-widest uppercase mb-1" style={{ fontFamily: '"Cinzel", "Times New Roman", serif' }}>
                      The Acoustic Geology of Fire
                    </h4>
                    <span className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] block font-mono">Artwork Curation by Garero Fumani</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-[1.8] font-light tracking-wide">
                    Moving from the visual to the invisible realm, Garero Fumani's artwork translates the kinetic breath of the earth into physical form. Drawing upon the deep, resonant traditions of Botswana and the acoustic geology of the Kinta Valley, this piece visualises the subterranean frequencies of the geothermal hot springs. Executed through the lens of the resonant convergence, the intense, boiling heat is captured not merely as temperature, but as tactile vibration—a cymatic manifestation of the earth’s primal fire.
                  </p>
                </div>
              </div>

            </div>

            {/* Outro Body (The Connective Tissue) */}
            <div className="max-w-5xl mx-auto relative z-10 py-12 px-6 sm:p-12 bg-[#111111]/50 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.05)]">
              <p className="text-sm sm:text-base text-[#D4AF37]/90 leading-[2] font-light tracking-wide text-center italic">
                Within the Lithic Codex, the Raw Fire does not exist in isolation; it is inextricably bound to its energetic twin: The Refined Fire. The artworks of Herman and Garero Fumani serve as the vital connective tissue between these two states of matter. By capturing the untamed spiritual heat (The Resonant) and the living ecosystem of the Biodiversity (The Ecological), their combined works ground this primal energy. They act as the necessary evolutionary pathway, bridging the "uncontrolled explosion" of the Raw Fire toward its eventual mastery, the radiant, laser-like precision (Tejas) of the Refined Fire.
              </p>
            </div>

            {/* (Your "View Refined Fire" button should still be safely down here!) */}
            {/* --- "VIEW REFINED FIRE" TRANSITION BUTTON --- */}
            <div className="mt-20 flex justify-center relative z-10">
              <button 
                onClick={() => {}} // Empty function for now!
                className="group relative flex items-center justify-center gap-6 px-12 py-5 cursor-pointer overflow-hidden transition-all duration-700"
              >
                {/* Decorative Geometric Corner Brackets */}
                <div className="absolute inset-0 border border-[#D4AF37]/20 transition-colors duration-500 group-hover:border-[#D4AF37]/0"></div>
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37] transition-all duration-500 group-hover:scale-125"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37] transition-all duration-500 group-hover:scale-125"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37] transition-all duration-500 group-hover:scale-125"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37] transition-all duration-500 group-hover:scale-125"></div>

                {/* Animated Gold Sweep Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#f1d570] to-[#D4AF37] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                
                {/* Button Text */}
                <span className="relative z-10 text-xs sm:text-sm font-medium tracking-[0.4em] text-[#D4AF37] uppercase transition-colors duration-700 group-hover:text-black">
                  View Refined Fire
                </span>

                {/* Animated Arrow */}
                <svg 
                  className="relative z-10 w-4 h-4 text-[#D4AF37] group-hover:text-black transition-all duration-700 group-hover:translate-x-3" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>

                {/* Hover Glow Aura */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-opacity duration-700 pointer-events-none"></div>
              </button>
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
                Lithic Codex
              </h1>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8"></div>
              <p className="text-gray-400 max-w-2xl leading-relaxed font-light text-center">
                OPERATING UNDER THE PRINCIPLE OF GEOLOGICAL AUTHENTICITY, EACH WORK OF ART DOESN’T MERELY REPRESENT THE ELEMENTS, IT IS PHYSICALLY INCORPORATED
              </p>
            </div>

{/* --- THE VESSEL | BODY SECTION --- */}
            <div className="mb-16 sm:mb-24">
              
              {/* 1. Subtitle Header */}
              <div className="flex items-center gap-3 mb-3 border-b border-white/10 pb-4">
                <Box className="text-gray-500" size={24} />
                <h2 className="text-2xl font-light text-white tracking-widest uppercase">
                  The Vessel <span className="text-gray-600 mx-2">|</span> <span className="text-gray-400">Body</span>
                </h2>
              </div>
              
              {/* 2. Philosophical Description */}
              {/* 👇 Changed mb-14 to mb-16 (or you can use mb-20) for a bigger gap 👇 */}
              <p className="text-gray-400 text-sm font-light tracking-wider max-w-4xl mb-16 leading-[1.8]">
                The unbreakable foundation of the physical plane. By synthesising deep-time limestone, resonant quartz, and organic red earth, the Vessel acts as the grounding matrix—capable of holding the untamed energy of creation without shattering.
              </p>

             {/* 3. The Vessel Pictures / Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {VESSEL_MATERIALS.map((mat, index) => (
                    <MaterialCard key={index} mat={mat} onClick={() => setSelectedMineral(mat)} />
                  ))}
              </div>
              
            </div>

            {/* --- THE SPARK | SOUL SECTION --- */}
            <div className="mb-24">
              
              {/* 1. Subtitle Header */}
              <div className="flex items-center gap-3 mb-3 border-b border-[#D4AF37]/20 pb-4">
                <Diamond className="text-[#D4AF37]" size={24} />
                <h2 className="text-2xl font-light text-white tracking-widest uppercase">
                  The Spark <span className="text-[#D4AF37]/50 mx-2">|</span> <span className="text-[#D4AF37]">Soul</span>
                </h2>
              </div>
              
              {/* 2. Philosophical Description */}
              {/* 👇 Changed mb-14 to mb-16 (or you can use mb-20) for a bigger gap 👇 */}
              <p className="text-gray-400 text-sm font-light tracking-wider max-w-4xl mb-16 leading-[1.8]">
                The catalyst of manifestation. Fusing the cosmic signature of iron-nickel meteorite with the passionate frequency of ruby, the Spark is the celestial, untamed heat that breathes kinetic life into the silent earth.
              </p>

             {/* 3. The Spark Pictures / Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {ESSENCE_MATERIALS.map((mat, index) => (
                  <MaterialCard key={index} mat={mat} onClick={() => setSelectedMineral(mat)} />
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
      <footer className="border-t border-white/10 py-16 text-center bg-[#000000] relative z-10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
          
          {/* Security Icon */}
          <div className="flex items-center justify-center text-[#D4AF37] mb-6">
            <ShieldCheck size={20} />
          </div>

          {/* Legacy & Authentication Text */}
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.2em] leading-loose mb-12 text-center max-w-2xl">
            © 2026 ISHWAR ARCHIVES LEGACY. PRODUCED IN PARTNERSHIP WITH SUNWAY SYNERGY.<br className="hidden md:block" /> AUTHENTICATED ON POLYGON BLOCKCHAIN.
          </p>

     {/* VIP Sponsor & Partner Logos */}
<div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16 w-full mt-8">
  
  {/* Logo Template with Hover Effect */}
  {[
    { src: "/IshwarLogo.png", alt: "Ishwar Archives" },
    { src: "/the-banjaran-logo.jpg", alt: "The Banjaran" },
    { src: "/Sunway.png", alt: "Sunway Synergy" },
    { src: "/TourismPerak.png", alt: "Tourism Perak" },
    { src: "/GeoparkKinta.png", alt: "Kinta Valley Geopark" },
    { src: "/MBOR.png", alt: "Malaysia Book of Records" },
  ].map((logo, index) => (
    <img 
      key={index}
      src={logo.src} 
      alt={logo.alt} 
      className="h-10 sm:h-12 w-auto object-contain shrink-0 
                 opacity-60 transition-all duration-500 
                 hover:opacity-100 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] 
                 cursor-pointer"
    />
  ))}

</div>

        </div>
      </footer>
      {selectedMineral && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer" onClick={() => setSelectedMineral(null)}></div>
          
          <div className="relative w-full max-w-6xl bg-[#050505] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col md:flex-row max-h-[90vh] z-10 animate-in zoom-in-95 duration-500">
            
            <button className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black rounded-full transition-colors border border-white/10" onClick={() => setSelectedMineral(null)}>
              <X size={20} />
            </button>

            <div className="w-full md:w-4/12 h-[300px] md:h-auto relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 md:bg-gradient-to-r"></div>
              <img src={selectedMineral.image} alt={selectedMineral.name} className="w-full h-full object-cover" />
            </div>

            <div className="w-full md:w-8/12 p-8 sm:p-10 overflow-y-auto custom-scrollbar">
              <span className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase mb-2 block font-medium">
                {selectedMineral.subtitle || 'Geological Codex'}
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-widest uppercase mb-10" style={{ fontFamily: '"Cinzel", "Times New Roman", serif' }}>
                {selectedMineral.name}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-6 border-b border-[#D4AF37]/20 pb-3">Material Data (Geological)</h3>
                  <div className="space-y-5">
                    {selectedMineral.materialData?.map((item: any, i: number) => (
                      <div key={i}>
                        <span className="text-white text-[10px] font-semibold uppercase tracking-widest block mb-1.5">{item.label}</span>
                        <span className="text-gray-400 text-sm font-light leading-[1.8]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-6 border-b border-[#D4AF37]/20 pb-3">Resonance Data (Energetic)</h3>
                  <div className="space-y-5">
                    {selectedMineral.resonanceData?.map((item: any, i: number) => (
                      <div key={i}>
                        <span className="text-white text-[10px] font-semibold uppercase tracking-widest block mb-1.5">{item.label}</span>
                        <span className="text-gray-400 text-sm font-light leading-[1.8]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Helper Components ---


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

