import { motion } from 'framer-motion';

export function HubrisComparison() {
  return (
    <motion.div key="hubris" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="compare-layout">
      <div className="compare-side hubris-side">
        <div className="side-hdr"><span className="icon">⚙️</span><h3>Hubris OS (Oxide)</h3></div>
        <ul className="compare-list">
          <li><strong>ميكروكرنل خفيف بـ Rust:</strong> نظام طورته شركة Oxide Computer مبني بلغة Rust للاستفادة من مزايا حماية الذاكرة التي توفرها اللغة.</li>
          <li><strong>كبسولات معزولة:</strong> يعزل المكونات داخل "كبسولات" برمجية لمنع أي مكون من إسقاط النظام أو التعدي على مساحة الآخرين.</li>
          <li><strong>للمتحكمات الدقيقة (Microcontrollers):</strong> مصمم خصيصاً للأنظمة المدمجة جداً ورقائق التحكم التي تفتقر غالباً لوحدة إدارة ذاكرة متقدمة (MMU).</li>
          <li><strong>هدف هندسي محدد:</strong> صُمم ليكون "جذر الثقة" (Root of Trust) داخل سيرفرات الشركة، وليس للاستخدام كنظام تشغيل عام.</li>
        </ul>
      </div>

      <div className="compare-vs">VS</div>

      <div className="compare-side vault-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>seL4-Vault</h3></div>
        <ul className="compare-list">
          <li><strong>عزل عتادي كامل (MMU):</strong> يتجاوز العزل البرمجي ليستغل وحدة إدارة الذاكرة (MMU) في المعالجات القوية لفرض حواجز يستحيل اختراقها مادياً.</li>
          <li><strong>الثقة بالرياضيات لا المترجم:</strong> Hubris يثق في مترجم لغة Rust؛ seL4-Vault يعتمد على الإثبات الرياضي المستقل عن أي لغة أو مترجم.</li>
          <li><strong>نظام سطح مكتب للمستخدم:</strong> Hubris يعمل في الظل داخل السيرفرات؛ seL4-Vault يضع هذا المستوى من الأمان في واجهة رسومية أمامك مباشرة.</li>
          <li><strong>مهام ثقيلة وحاويات معقدة:</strong> مصمم لتشغيل تطبيقات يومية (متصفح، مدير ملفات) داخل حاويات، وليس فقط مهام تحكم دقيقة.</li>
        </ul>
      </div>
    </motion.div>
  );
}
