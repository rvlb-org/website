import { motion } from 'framer-motion';

export function QubesComparison() {
  return (
    <motion.div key="qubes" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="compare-layout">
      <div className="compare-side qubes-side">
        <div className="side-hdr"><span className="icon">🧊</span><h3>Qubes OS</h3></div>
        <ul className="compare-list">
          <li><strong>عزل بالآلات الافتراضية:</strong> يعزل التطبيقات داخل آلات افتراضية كاملة ومنفصلة — فكرة ذكية لكنها ثقيلة جداً على الموارد.</li>
          <li><strong>استهلاك ضخم:</strong> تشغيل نظام تشغيل كامل لكل تطبيق يستنزف الذاكرة والمعالج بشكل هائل.</li>
          <li><strong>سطح هجوم الـ Hypervisor:</strong> نظام Xen المستخدم ضخم ومعقد وله تاريخ من ثغرات الهروب من الآلة الافتراضية.</li>
          <li><strong>لا إثبات رياضي:</strong> العزل قوي لكن طبقة الـ Hypervisor الأساسية لم تُثبت رياضياً.</li>
        </ul>
      </div>

      <div className="compare-vs">VS</div>

      <div className="compare-side vault-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>seL4-Vault</h3></div>
        <ul className="compare-list">
          <li><strong>حاويات خفيفة:</strong> العزل يتم بحاويات خفيفة جداً على مستوى المهام — لا حاجة لنظام تشغيل كامل لكل تطبيق.</li>
          <li><strong>استهلاك ضئيل:</strong> كل حاوية تستهلك ميجابايتات قليلة وتعمل بسرعة قريبة من الأداء الأصلي للجهاز.</li>
          <li><strong>نواة صغيرة جداً:</strong> النواة حوالي عشرة آلاف سطر فقط وخالية من التعريفات — سطح الهجوم شبه معدوم.</li>
          <li><strong>إثبات رياضي:</strong> العزل مُثبت رياضياً، كسر الجدار الفاصل بين الحاويات مستحيل من الناحية النظرية.</li>
        </ul>
      </div>
    </motion.div>
  );
}
