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
  Smartphone
} from 'lucide-react';

const MOCK_DATA = {
  title: "Ishwar Archives",
  artist: "Raajashri Vegneshwar Nair",
  year: "2026",
  description: "A mixed-media exploration of digital permanence and physical decay, utilizing gold leaf, oil, and embedded NFC/QR technologies.",
  imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=1600",
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
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-[#D4AF37] selection:text-black pb-20">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes movingGlow {
          0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(40px, -40px) scale(1.1); opacity: 0.6; }
          66% { transform: translate(-30px, 50px) scale(0.9); opacity: 0.4; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        }
        .glow-orb-1 {
          animation: movingGlow 10s infinite alternate ease-in-out;
          background: radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(212,175,55,0) 70%);
        }
        .glow-orb-2 {
          animation: movingGlow 14s infinite alternate-reverse ease-in-out;
          animation-delay: -5s;
          background: radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(10,10,10,0) 70%);
        }
        .glass-panel {
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 175, 55, 0.15);
        }
      `}} />

      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b-0 border-b-[#D4AF37]/20 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-[#D4AF37]">
          <ShieldCheck size={24} />
          <span className="font-bold tracking-widest uppercase text-sm">Authenticity Record</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Verified Asset
        </div>
      </header>

      {/* Hero Section with Moving Glow */}
      <section className="relative w-full overflow-hidden flex flex-col items-center justify-center pt-16 pb-20 px-4">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="glow-orb-1 absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-2xl"></div>
          <div className="glow-orb-2 absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-3xl ml-20 mt-20"></div>
        </div>

        {/* Artwork Display */}
        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
          <div className="relative p-2 rounded-sm bg-gradient-to-b from-[#D4AF37]/40 to-transparent shadow-[0_0_40px_rgba(212,175,55,0.15)]">
            <img 
              src={MOCK_DATA.imageUrl} 
              alt={MOCK_DATA.title}
              className="w-full max-w-md h-auto object-cover rounded-sm border border-[#1a1a1a]"
            />
          </div>
          
          <div className="mt-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
              {MOCK_DATA.title}
            </h1>
            <p className="text-[#D4AF37] text-lg tracking-wide uppercase">
              By {MOCK_DATA.artist} • {MOCK_DATA.year}
            </p>
            <p className="mt-4 max-w-xl text-gray-400 mx-auto text-sm leading-relaxed">
              {MOCK_DATA.description}
            </p>
            
            <div className="mt-10 flex justify-center">
              <button className="px-8 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-semibold tracking-widest uppercase text-sm shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                View Galleries
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Provenance & Technical Details */}
        <div className="md:col-span-8 space-y-6">
          
          <div className="glass-panel rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-[#D4AF37]/20 pb-4">
              <Fingerprint className="text-[#D4AF37]" size={24} />
              <h2 className="text-xl font-semibold text-white">Digital Passport & Provenance</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
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
              <DetailItem 
                label="Creator ID" 
                value={MOCK_DATA.creatorId} 
                icon={<CheckCircle2 size={14} />} 
                onCopy={() => handleCopy(MOCK_DATA.creatorId, 'creator')}
                isCopied={copiedField === 'creator'}
              />
              <DetailItem 
                label="Token Standard" 
                value={MOCK_DATA.tokenStandard} 
                icon={<Box size={14} />} 
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

              <DetailItem 
                label="Token ID" 
                value={MOCK_DATA.tokenId} 
                icon={<Layers size={14} />} 
                onCopy={() => handleCopy(MOCK_DATA.tokenId, 'token')}
                isCopied={copiedField === 'token'}
              />
              <DetailItem 
                label="Blockchain Network" 
                value={MOCK_DATA.blockchain} 
                icon={<Box size={14} />} 
              />
              <div className="sm:col-span-2">
                <DetailItem 
                  label="Metadata Storage" 
                  value={MOCK_DATA.metadataType} 
                  icon={<LinkIcon size={14} />} 
                />
              </div>
            </div>
          </div>

          {/* Creation Process Video */}
          <div className="glass-panel rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-[#D4AF37]/20 pb-4">
              <Play className="text-[#D4AF37]" size={24} />
              <h2 className="text-xl font-semibold text-white">The Making Of</h2>
            </div>
            <div className="aspect-video w-full rounded-lg overflow-hidden border border-[#D4AF37]/20 bg-black relative group cursor-pointer">
              {/* Fallback image placeholder for the iframe (simulate YouTube preview) */}
              <img 
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1600" 
                alt="Video Thumbnail" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="text-black ml-1" size={32} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <p className="text-white font-medium">Studio Session: Ethereal Convergence</p>
                <p className="text-gray-400 text-sm">Watch the artist's technique and process.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Mobile Experience */}
        <div className="md:col-span-4 space-y-6">
          
          {/* Mobile Experience Call to Action */}
          <div className="glass-panel rounded-xl p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-yellow-700 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <Smartphone className="text-black" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Mobile Fine Art Experience™</h3>
            <p className="text-gray-400 text-sm mb-6">
              Step into the virtual gallery. View in 3D, augmented reality, and explore high-resolution interpretive content.
            </p>
            <button className="w-full py-3 px-4 bg-white hover:bg-gray-200 text-black font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
              <ExternalLink size={18} />
              Launch Experience
            </button>
          </div>

          {/* QR Code Section */}
          <div className="glass-panel rounded-xl p-6 flex flex-col items-center text-center">
            <h3 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-4">
              Physical Asset Link
            </h3>
            <div className="bg-white p-4 rounded-xl mb-4">
              <QrCode className="text-black" size={140} strokeWidth={1} />
            </div>
            <p className="text-xs text-gray-500">
              Scan from any device to access this immutable provenance record and view authenticity certificates.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-zinc-800 pt-8 pb-4 text-center">
        <div className="flex items-center justify-center gap-2 text-zinc-500 mb-2">
          <ShieldCheck size={16} />
          <span className="text-sm">Secured by The Fine Art Ledger Protocol</span>
        </div>
        <p className="text-xs text-zinc-600">
          © 2026 Fine Art Provenance Infrastructure. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

// TypeScript Interface defining the exact types required
interface DetailItemProps {
  label: string;
  value: string;
  icon: ReactNode;
  onCopy?: () => void;
  isCopied?: boolean;
  truncate?: boolean;
}

// Helper Component for Data Fields (Now strongly typed!)
function DetailItem({ label, value, icon, onCopy, isCopied, truncate = true }: DetailItemProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] uppercase tracking-wider font-semibold">
        {icon}
        {label}
      </div>
      <div className="flex items-center justify-between bg-black/40 border border-zinc-800 rounded-md p-3 group hover:border-[#D4AF37]/50 transition-colors">
        <span className={`font-mono text-sm text-gray-200 ${truncate ? 'truncate max-w-[85%]' : 'break-all'}`}>
          {value}
        </span>
        {onCopy && (
          <button 
            onClick={onCopy}
            className="text-zinc-500 hover:text-[#D4AF37] transition-colors focus:outline-none"
            title="Copy to clipboard"
          >
            {isCopied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}