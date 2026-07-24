import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { capEntities } from '../data/conceptsData';

export function CapabilitiesView() {
  const [selectedEntity, setSelectedEntity] = useState<typeof capEntities[0] | null>(null);

  return (
    <div className="concept-content">
      <div className="modal-hdr">
        <div>
          <h2>🔑 من يحق له التحدث مع نواة seL4؟</h2>
          <p className="modal-sub">في seL4، لا استدعاء بدون <strong>Capability</strong> — رمز وصول رياضي لا يمكن تزويره</p>
        </div>
      </div>

      {/* Entities Grid */}
      <div className="ent-grid">
        {capEntities.map((e) => (
          <motion.button key={e.id} className={`ent-card ${e.allowed ? 'ent-ok' : 'ent-no'}`}
            style={{ '--c': e.color } as any}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedEntity(selectedEntity?.id === e.id ? null : e)}
          >
            <span className="ent-icon">{e.icon}</span>
            <div className="ent-info">
              <span className="ent-name">{e.name}</span>
              <span className="ent-role">{e.role}</span>
            </div>
            <span className={`badge ${e.allowed ? 'yes' : 'no'}`}>{e.allowed ? '✓' : '✗'}</span>
          </motion.button>
        ))}
      </div>

      {/* Selected Entity Detail */}
      <AnimatePresence>
        {selectedEntity && (
          <motion.div className={`detail-box ${selectedEntity.allowed ? 'detail-ok' : 'detail-no'}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ '--c': selectedEntity.color } as any}
          >
            <span className="detail-icon">{selectedEntity.icon}</span>
            <div>
              <strong>{selectedEntity.name}</strong>
              <p>{selectedEntity.reason}</p>
              <code className={selectedEntity.allowed ? 'code-ok' : 'code-no'}>
                {selectedEntity.allowed ? '→ Capability valid → kernel executes' : '→ No Capability → SYSCALL REJECTED'}
              </code>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rule */}
      <div className="rule">
        🔑 القاعدة: النواة لا تسأل "من أنت؟" بل "هل تملك الـ Capability الصحيحة؟"
      </div>
    </div>
  );
}
