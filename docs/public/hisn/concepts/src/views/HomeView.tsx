import { motion } from 'framer-motion';
import { conceptsList } from '../data/conceptsData';

interface HomeViewProps {
  setOpenConcept: (id: string) => void;
}

export function HomeView({ setOpenConcept }: HomeViewProps) {
  return (
    <motion.div key="home" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="home-view">
      {/* Page Title */}
      <header className="page-header">
        <button 
          onClick={() => {
            window.parent.postMessage({ action: 'closeConcepts' }, '*');
          }} 
          style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 'bold', marginBottom: '1.5rem', display: 'inline-block' }}
        >
          ← العودة للتوثيق الأصلي
        </button>
        <h1>مفاهيم <span className="accent">seL4-Vault</span> 🧠</h1>
      </header>

      {/* Concept Buttons Grid */}
      <div className="concepts-grid">
        {conceptsList.map((c, i) => (
          <motion.button
            key={c.id}
            className={`concept-btn ${!c.ready ? 'soon' : ''}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={c.ready ? { y: -4, scale: 1.02 } : {}}
            whileTap={c.ready ? { scale: 0.97 } : {}}
            onClick={() => c.ready && setOpenConcept(c.id)}
          >
            <span className="btn-emoji">{c.emoji}</span>
            <span className="btn-title">{c.title}</span>
            {!c.ready && <span className="soon-badge">قريباً</span>}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
