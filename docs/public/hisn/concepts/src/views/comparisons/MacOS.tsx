import { motion } from 'framer-motion';

export function MacOSComparison() {
  return (
    <motion.div key="macos" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="compare-layout">
      <div className="compare-side macos-side">
        <div className="side-hdr"><span className="icon">🍎</span><h3>macOS</h3></div>
        <ul className="compare-list">
          <li><strong>نواة هجينة بالأداء:</strong> رغم جذورها في نواة Mach الدقيقة، تحولت إلى نواة هجينة ضخمة لأسباب الأداء — مما وسّع سطح الهجوم كثيراً.</li>
          <li><strong>الأمان بالحديقة المغلقة:</strong> حمايته تعتمد على سيطرة Apple على متجر التطبيقات أكثر من اعتمادها على عزل معماري حقيقي.</li>
          <li><strong>نظام اتصال داخلي معقد:</strong> واجهات الاتصال بين العمليات معقدة تاريخياً وكانت مصدراً لثغرات خطيرة وعمليات كسر الحماية.</li>
          <li><strong>طبقات حماية فوقية:</strong> يعتمد على أدوات برمجية مثل حماية النزاهة والبوابة لحماية النظام — تجاوزها يسقط الدفاع كله.</li>
        </ul>
      </div>

      <div className="compare-vs">VS</div>

      <div className="compare-side vault-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>seL4-Vault</h3></div>
        <ul className="compare-list">
          <li><strong>نواة دقيقة حقيقية:</strong> لا تنازلات للأداء على حساب الأمان — نواة دقيقة نقية مثبتة رياضياً ومُثبت أنها الأسرع في تمرير الرسائل.</li>
          <li><strong>أمان مثبت لا مفروض:</strong> لا يعتمد على بيئة مغلقة — الكود مفتوح ومُثبت رياضياً أنه منيع ضد الاختراق.</li>
          <li><strong>اتصال داخلي بسيط وآمن:</strong> الاتصال بين العمليات بسيط جداً ومحمي برموز وصول رياضية لا يمكن تزويرها أو الالتفاف عليها.</li>
          <li><strong>عزل من الجذور:</strong> لا حاجة لطبقات حماية فوقية — الحاويات معزولة هيكلياً من الأساس لا بعد الإنشاء.</li>
        </ul>
      </div>
    </motion.div>
  );
}
