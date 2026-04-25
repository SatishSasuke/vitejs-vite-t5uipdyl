import { useState, ReactNode } from 'react';
import { 
  ShieldCheck, 
  Copy, 
  ExternalLink, 
  QrCode, 
  Play, 
  Fingerprint, 
  Box, 
  Link as LinkIcon, 
  Layers,
  CheckCircle2,
  Smartphone,
  Award
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

// --- Mock Data ---
const MOCK_DATA = {
  title: "Ethereal Convergence #04",
  artist: "Elena Rostova",
  year: "2026",
  description: "A mixed-media exploration of digital permanence and physical decay, utilizing gold leaf, oil, and embedded NFC/QR technologies.",
  imageUrl: "/sculpture.png",
  artAssistId: "AA-982-441-OX",
  serialNumber: "SN-2026-04-1901",
  ledgerAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d89B83",
  tokenId: "88492",
  creatorId: "CR-3310-EXP",
  tokenStandard: "ERC-721",
  blockchain: "Polygon (MATIC)",
  metadataType: "IPFS / Decentralized"
};

export default function App() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

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
          <Award className="text-[#D4AF37]" size={24} />
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

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 px-4 overflow-hidden">
        {/* Background Ambience */}
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
          <h1 className="text-4xl sm:text-6xl font-light text-white tracking-widest uppercase mb-4" style={{ fontFamily: '"Cinzel", "Times New Roman", serif' }}>
            Ishwar Archives
          </h1>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-6"></div>
          <p className="text-gray-400 text-sm sm:text-base font-light tracking-wide max-w-lg leading-relaxed px-4">
            A permanent, immutable record of authenticity and ownership, secured on the blockchain for future generations.
          </p>
          
          <button className="mt-10 px-8 py-3.5 rounded-none border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 font-medium tracking-[0.2em] uppercase text-xs relative group overflow-hidden">
            <span className="relative z-10">View Galleries</span>
            <div className="absolute inset-0 h-full w-0 bg-[#D4AF37] transition-all duration-500 ease-out group-hover:w-full"></div>
          </button>
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
                label="Art Assist ID" 
                value={MOCK_DATA.artAssistId} 
                icon={<ShieldCheck size={14} />} 
                onCopy={() => handleCopy(MOCK_DATA.artAssistId, 'artAssist')}
                isCopied={copiedField === 'artAssist'}
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

          <div className="bento-card rounded-2xl p-6 relative overflow-hidden group cursor-pointer flex items-center justify-between">
            <div className="absolute right-0 top-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-colors"></div>
            <div>
              <h3 className="text-sm font-medium text-white mb-1">Mobile AR Experience</h3>
              <p className="text-xs text-gray-500">View object in your space</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
              <Smartphone size={16} />
            </div>
          </div>

          <div className="bento-card rounded-2xl p-6 relative overflow-hidden group cursor-pointer flex items-center justify-between">
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
            <div>
              <h3 className="text-sm font-medium text-white mb-1">The Making Of</h3>
              <p className="text-xs text-gray-500">Studio session video</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Play size={16} className="ml-0.5" />
            </div>
          </div>

        </div>
      </main>

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

// --- Helper Component ---
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