import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LinuxComparison }    from './comparisons/Linux';
import { TailsComparison }    from './comparisons/Tails';
import { QubesComparison }    from './comparisons/Qubes';
import { WindowsComparison }  from './comparisons/Windows';
import { MacOSComparison }    from './comparisons/MacOS';
import { MuenComparison }     from './comparisons/Muen';
import { ChromeOSComparison } from './comparisons/ChromeOS';
import { CantripComparison }  from './comparisons/Cantrip';
import { MilitaryComparison } from './comparisons/Military';
import { FreeBSDComparison }  from './comparisons/FreeBSD';
import { OpenBSDComparison }  from './comparisons/OpenBSD';
import { LionsOSComparison }  from './comparisons/LionsOS';
import { SculptComparison }   from './comparisons/Sculpt';
import { RedoxComparison }    from './comparisons/Redox';
import { HubrisComparison }   from './comparisons/Hubris';
import { IntegrityComparison } from './comparisons/Integrity';

const osList = [
  { id: 'linux',    icon: '🐧', name: 'Linux' },
  { id: 'tails',    icon: '👻', name: 'Tails OS' },
  { id: 'qubes',    icon: '🧊', name: 'Qubes OS' },
  { id: 'windows',  icon: '🪟', name: 'Windows' },
  { id: 'macos',    icon: '🍎', name: 'macOS' },
  { id: 'muen',     icon: '🦅', name: 'Muen SK' },
  { id: 'chromeos', icon: '🌐', name: 'ChromeOS' },
  { id: 'cantrip',  icon: '🧬', name: 'Cantrip OS' },
  { id: 'military', icon: '🛡️', name: 'CDS / DARPA' },
  { id: 'freebsd',  icon: '🐡', name: 'FreeBSD' },
  { id: 'openbsd',  icon: '🟡', name: 'OpenBSD' },
  { id: 'lionsOS',  icon: '🦁', name: 'LionsOS' },
  { id: 'sculpt',   icon: '🗿', name: 'Sculpt OS' },
  { id: 'redox',    icon: '🦀', name: 'Redox OS' },
  { id: 'hubris',   icon: '⚙️', name: 'Hubris OS' },
  { id: 'integrity', icon: '✈️', name: 'INTEGRITY' },
];

export function CompareView() {
  const [compareTab, setCompareTab] = useState<string | null>(null);

  return (
    <div className="concept-content compare-modal">
      <AnimatePresence mode="wait">
        {!compareTab ? (
          <motion.div key="os-grid-view" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>

            <div className="legal-disclaimer" style={{ marginBottom: '2rem', marginTop: 0 }}>
              <p><strong>إخلاء مسؤولية قانوني (Legal Disclaimer):</strong> جميع أسماء أنظمة التشغيل، الشعارات، والعلامات التجارية المذكورة هي ملك لأصحابها. تم استخدامها هنا لأغراض "الاستخدام العادل" (Fair Use) في سياق البحث العلمي والمقارنة الأكاديمية والتحليل المعماري فقط. الآراء المطروحة تمثل تحليلاً فنياً موضوعياً لهيكلية الأنظمة ولا تمثل ادعاءات مطلقة. مشروع seL4-Vault هو مشروع بحثي مستقل ولا يدعي أي ارتباط أو رعاية من قِبل الشركات المذكورة.</p>
            </div>

            <div className="os-grid">
              {osList.map(os => (
                <button key={os.id} className="os-btn" onClick={() => setCompareTab(os.id)}>
                  <span className="os-icon">{os.icon}</span>
                  <span className="os-name">{os.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="os-compare-view" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="tab-content">
            <button className="back-btn" onClick={() => setCompareTab(null)} style={{ marginBottom: '1.5rem', alignSelf: 'flex-start' }}>
              ← عودة لقائمة الأنظمة
            </button>

            <AnimatePresence mode="wait">
              {compareTab === 'linux'    && <LinuxComparison />}
              {compareTab === 'tails'    && <TailsComparison />}
              {compareTab === 'qubes'    && <QubesComparison />}
              {compareTab === 'windows'  && <WindowsComparison />}
              {compareTab === 'macos'    && <MacOSComparison />}
              {compareTab === 'muen'     && <MuenComparison />}
              {compareTab === 'chromeos' && <ChromeOSComparison />}
              {compareTab === 'cantrip'  && <CantripComparison />}
              {compareTab === 'military' && <MilitaryComparison />}
              {compareTab === 'freebsd'  && <FreeBSDComparison />}
              {compareTab === 'openbsd'  && <OpenBSDComparison />}
              {compareTab === 'lionsOS'  && <LionsOSComparison />}
              {compareTab === 'sculpt'   && <SculptComparison />}
              {compareTab === 'redox'    && <RedoxComparison />}
              {compareTab === 'hubris'   && <HubrisComparison />}
              {compareTab === 'integrity' && <IntegrityComparison />}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
