import { motion } from 'framer-motion';

export function ChromeOSComparison() {
  return (
    <motion.div key="chromeos" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="compare-layout">
      <div className="compare-side chromeos-side">
        <div className="side-hdr"><span className="icon">🌐</span><h3>ChromeOS</h3></div>
        <ul className="compare-list">
          <li><strong>عزل برمجي لا معماري:</strong> يعزل التبويبات والتطبيقات برمجياً — وهذا جيد، لكنه ليس عزلاً هيكلياً حقيقياً مضموناً رياضياً.</li>
          <li><strong>نواة لينكس الضخمة بالأساس:</strong> مبني فوق نواة لينكس مع تعديلات أمنية — ترث كل ثغرات النواة الأساسية وتبقى قائمة.</li>
          <li><strong>سيطرة جوجل المطلقة:</strong> كل شيء مرتبط بحساب Google — النظام يجمع بيانات استخدام مفصلة ويرسلها لجوجل.</li>
          <li><strong>يتوقف بدون إنترنت:</strong> معظم وظائفه تعتمد على خوادم جوجل — بدون اتصال تتجمد معظم الوظائف.</li>
        </ul>
      </div>

      <div className="compare-vs">VS</div>

      <div className="compare-side vault-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>seL4-Vault</h3></div>
        <ul className="compare-list">
          <li><strong>عزل معماري مثبت:</strong> العزل مفروض من النواة بالإثبات الرياضي — كسر الحاوية مستحيل نظرياً لا مجرد صعب.</li>
          <li><strong>لا مركزية تامة:</strong> لا حساب خارجي، لا تتبع، لا اشتراطات. بياناتك ملكك ولا تغادر جهازك بدون إذنك الصريح.</li>
          <li><strong>نواة دقيقة مؤمنة:</strong> سطح هجوم أصغر بآلاف المرات من لينكس — لا ثغرة في التعريفات تستطيع التأثير على النظام كله.</li>
          <li><strong>يعمل بالكامل بدون إنترنت:</strong> كل شيء محلي — الملفات والتطبيقات والبيانات تبقى على جهازك دون الحاجة لأي خادم.</li>
        </ul>
      </div>
    </motion.div>
  );
}
