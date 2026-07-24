import { motion } from 'framer-motion';

export function TailsComparison() {
  return (
    <motion.div key="tails" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="compare-layout">
      <div className="compare-side tails-side">
        <div className="side-hdr"><span className="icon">👻</span><h3>Tails OS</h3></div>
        <ul className="compare-list">
          <li><strong>نواة لينكس في الأساس:</strong> مبني على لينكس، أي أنه يرث نفس مشاكله المعمارية وسطح الهجوم الواسع للنواة الضخمة.</li>
          <li><strong>التخفي لا العزل:</strong> يتميز بمسح البيانات وتوجيه الاتصال عبر شبكة Tor، لكنه لا يوفر حماية معمارية حقيقية من الاختراق.</li>
          <li><strong>بيئة موحدة:</strong> التطبيقات تشاركت نفس البيئة — اختراق المتصفح يفتح الباب لنظام التشغيل كاملاً.</li>
          <li><strong>الأمان بالنسيان:</strong> يمسح الآثار بعد الإغلاق بدلاً من منع حدوث الاختراق أصلاً.</li>
        </ul>
      </div>

      <div className="compare-vs">VS</div>

      <div className="compare-side vault-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>seL4-Vault</h3></div>
        <ul className="compare-list">
          <li><strong>أساس مُثبت رياضياً:</strong> مبني من الصفر على نواة دقيقة مثبتة رياضياً — اختراق النواة ذاتها مستحيل نظرياً.</li>
          <li><strong>عزل مادي للتطبيقات:</strong> المتصفح والشبكة والتخزين يعملون في حاويات منفصلة. اختراق أحدها لا يؤثر على الباقي.</li>
          <li><strong>الأمان الاستباقي:</strong> مصمم لمنع حدوث الاختراق من الأساس، لا لإخفاء آثاره بعد وقوعه.</li>
          <li><strong>تحكم كامل بالشبكة:</strong> كل الاتصالات تمر عبر بوابة مركزية تتحكم بالصلاحيات بصرامة ولا يمكن تجاوزها.</li>
        </ul>
      </div>
    </motion.div>
  );
}
