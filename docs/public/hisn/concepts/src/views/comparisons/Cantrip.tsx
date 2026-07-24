import { motion } from 'framer-motion';

export function CantripComparison() {
  return (
    <motion.div key="cantrip" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="compare-layout">
      <div className="compare-side cantrip-side">
        <div className="side-hdr"><span className="icon">🧬</span><h3>Cantrip OS — جوجل</h3></div>
        <ul className="compare-list">
          <li><strong>مبني على seL4 أيضاً:</strong> مشروع من جوجل مكتوب بلغة Rust فوق نواة seL4 — شهادة من جوجل نفسها على موثوقية seL4.</li>
          <li><strong>للأجهزة المدمجة فقط:</strong> مخصص حصراً للأجهزة الذكية الصغيرة — ليس نظام تشغيل للكمبيوتر الشخصي بأي حال.</li>
          <li><strong>لا واجهة رسومية:</strong> بدون نوافذ أو سطح مكتب — للمطورين المتخصصين فقط لا للمستخدم العادي.</li>
          <li><strong>مجتمع جوجل المغلق:</strong> مشروع داخلي خاص — ليس مفتوحاً للمجتمع العام.</li>
        </ul>
      </div>
      <div className="compare-vs">VS</div>
      <div className="compare-side vault-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>seL4-Vault</h3></div>
        <ul className="compare-list">
          <li><strong>نفس الأساس بلا قيود:</strong> أيضاً مبني على seL4، لكنه نظام تشغيل متكامل للكمبيوتر الشخصي بواجهة رسومية حديثة.</li>
          <li><strong>للمستخدم العادي:</strong> Cantrip للمطورين — seL4-Vault لك أنت، تدير ملفاتك بأمان عسكري مثبت.</li>
          <li><strong>مستقل ولا مركزي:</strong> بياناتك لا يرسلها لأحد ولا تغادر جهازك.</li>
          <li><strong>يملأ الفراغ:</strong> Cantrip للأجهزة المدمجة — seL4-Vault للكمبيوتر الشخصي الآمن.</li>
        </ul>
      </div>
    </motion.div>
  );
}
