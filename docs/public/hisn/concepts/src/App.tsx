import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomeView } from './views/HomeView';
import { CapabilitiesView } from './views/CapabilitiesView';
import { CompareView } from './views/CompareView';
import './index.css';

export default function App() {
  const [openConcept, setOpenConcept] = useState<string | null>(null);

  return (
    <div className="root">
      <AnimatePresence mode="wait">
        {!openConcept ? (
          <HomeView setOpenConcept={setOpenConcept} />
        ) : (
          <motion.div key="concept-view" className="concept-view" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
            <button className="back-btn" onClick={() => setOpenConcept(null)}>
              ← عودة للقائمة
            </button>

            {openConcept === 'capabilities' && <CapabilitiesView />}
            {openConcept === 'compare' && <CompareView />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
