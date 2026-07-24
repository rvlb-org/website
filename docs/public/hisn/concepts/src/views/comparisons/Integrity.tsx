import { motion } from 'framer-motion';

export function IntegrityComparison() {
  return (
    <motion.div key="integrity" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="compare-layout">
      <div className="compare-side integrity-side">
        <div className="side-hdr"><span className="icon">✈️</span><h3>INTEGRITY-178B</h3></div>
        <ul className="compare-list">
          <li><strong>نواة فصل عسكرية:</strong> نظام تشغيل تجاري يعتمد على معمارية العزل (Separation Kernel) المخصصة للطائرات الحربية والأنظمة فائقة الحرجية.</li>
          <li><strong>مغلق المصدر وباهظ:</strong> نظام تجاري (Proprietary) مغلق تماماً وتكلفة ترخيصه تقدر بملايين الدولارات، محتكر للشركات والحكومات.</li>
          <li><strong>شهادات أمان تقليدية:</strong> حاصل على أعلى شهادات الأمان (EAL6+ / DO-178B)، ولكن هذه الشهادات تعتمد على مراجعة بشرية صارمة واختبارات مكثفة.</li>
          <li><strong>بيئة استخدام صلبة:</strong> مُصمم ليعمل في خلفية العتاد العسكري كأنظمة الطيران، ولا يملك بيئة أو واجهة يمكن للمستخدم البشري العادي التفاعل معها.</li>
        </ul>
      </div>

      <div className="compare-vs">VS</div>

      <div className="compare-side vault-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>seL4-Vault</h3></div>
        <ul className="compare-list">
          <li><strong>مستوى عسكري، مفتوح للجميع:</strong> يقدم نفس معمارية العزل بل يتفوق عليها رياضياً، وهو مفتوح المصدر (Open Source) متاح للتدقيق والمراجعة العلنية.</li>
          <li><strong>مجاني وفي المتناول:</strong> لا يحتاج لميزانية دفاع لاستخدامه — نظام متاح لك ولأي مطور مجاناً.</li>
          <li><strong>إثبات رياضي آلي:</strong> يتجاوز الشهادات البشرية التقليدية بامتلاكه (Formal Proof)، إثبات رياضي حاسوبي بأن الكود خالٍ من ثغرات العزل بشكل قاطع.</li>
          <li><strong>واجهة للكمبيوتر الشخصي:</strong> يأخذ تكنولوجيا الطائرات الحربية ويضعها في سطح مكتب حديث بواجهة رسومية لإدارة ملفاتك وتطبيقاتك اليومية.</li>
        </ul>
      </div>
    </motion.div>
  );
}
