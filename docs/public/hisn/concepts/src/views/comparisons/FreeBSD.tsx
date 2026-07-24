import { motion } from 'framer-motion';

export function FreeBSDComparison() {
  return (
    <motion.div key="freebsd" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="compare-layout">
      <div className="compare-side freebsd-side">
        <div className="side-hdr"><span className="icon">🐡</span><h3>FreeBSD / HardenedBSD</h3></div>
        <ul className="compare-list">
          <li><strong>سمعة أمنية راسخة:</strong> تاريخياً أكثر أماناً من لينكس التقليدي — تستخدمها PlayStation وشركات كبرى كقاعدة لأنظمتها.</li>
          <li><strong>نواة ضخمة بصلاحيات مطلقة:</strong> رغم تحسيناتها الأمنية، تظل نواة بملايين الأسطر تعمل بصلاحيات كاملة لا قيود عليها.</li>
          <li><strong>الثغرة الواحدة تكفي:</strong> أي ثغرة في تعريف شبكة أو نظام ملفات داخل النواة تمنح المخترق سيطرة كاملة.</li>
          <li><strong>لا إثبات رياضي:</strong> التحسينات الأمنية برمجية جيدة لكن لا يوجد تحقق رياضي رسمي بخلو النواة من الثغرات.</li>
        </ul>
      </div>
      <div className="compare-vs">VS</div>
      <div className="compare-side vault-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>seL4-Vault</h3></div>
        <ul className="compare-list">
          <li><strong>نواة دقيقة صغيرة:</strong> عشرة آلاف سطر فقط — وظيفتها الوحيدة العزل وتمرير الرسائل، لا تعريفات داخلها.</li>
          <li><strong>إثبات رياضي رسمي:</strong> مثبت بالحاسوب أن اختراق النواة مستحيل رياضياً — ليس مجرد اختبار أو أمل.</li>
          <li><strong>عزل مادي للخدمات:</strong> كل خدمة في حاوية منفصلة — اختراق التعريفات لن يصل للنواة أو باقي الحاويات.</li>
          <li><strong>واجهة مستخدم حديثة:</strong> سطح مكتب سلس يتجاوز تجربة FreeBSD المعقدة للمستخدم العادي.</li>
        </ul>
      </div>
    </motion.div>
  );
}
