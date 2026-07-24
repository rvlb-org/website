import { motion } from 'framer-motion';

export function MilitaryComparison() {
  return (
    <motion.div key="military" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="compare-layout">
      <div className="compare-side military-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>CDS — DARPA والجيش الأسترالي</h3></div>
        <ul className="compare-list">
          <li><strong>للنخبة العسكرية فقط:</strong> أنظمة عزل الاتصالات هذه مغلقة ومصنفة سرية تماماً — حصرياً للجيوش والحكومات بعقود بالملايين.</li>
          <li><strong>عتاد عسكري مخصص:</strong> مبني على أجهزة عسكرية معتمدة — لا يمكن تشغيله على كمبيوتر عادي.</li>
          <li><strong>تكلفة هائلة:</strong> الوحدة الواحدة قد تتجاوز الملايين — خارج نطاق أي فرد أو شركة.</li>
          <li><strong>لا بيئة عمل للمستخدم:</strong> أنظمة للتشفير والاتصالات الحساسة فقط — بدون سطح مكتب أو تجربة مستخدم.</li>
        </ul>
      </div>
      <div className="compare-vs">VS</div>
      <div className="compare-side vault-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>seL4-Vault</h3></div>
        <ul className="compare-list">
          <li><strong>نفس التكنولوجيا للجميع:</strong> نفس مستوى العزل والإثبات الرياضي المعتمد عسكرياً — في متناول كل مطور ومستخدم عادي.</li>
          <li><strong>يعمل على أي جهاز:</strong> لا حاجة لعتاد عسكري مخصص أو عقود حكومية بالملايين.</li>
          <li><strong>مفتوح المصدر:</strong> الكود متاح للفحص والمراجعة — لا تثق بصندوق أسود، تحقق بنفسك.</li>
          <li><strong>بيئة عمل متكاملة:</strong> سطح مكتب حديث وتطبيقات معزولة — كل هذا بأمان مُثبت رياضياً.</li>
        </ul>
      </div>
    </motion.div>
  );
}
