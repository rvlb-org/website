import { motion } from 'framer-motion';

export function LionsOSComparison() {
  return (
    <motion.div key="lionsOS" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="compare-layout">
      <div className="compare-side lionsOS-side">
        <div className="side-hdr"><span className="icon">🦁</span><h3>LionsOS</h3></div>
        <ul className="compare-list">
          <li><strong>مبني على seL4 أيضاً:</strong> نظام مفتوح المصدر حديث يعمل فوق نواة seL4 مباشرة — وهذا اختيار ممتاز يؤكد موثوقية seL4 كأساس للأنظمة الحرجة.</li>
          <li><strong>مخصص للأنظمة المدمجة:</strong> مصمم للأنظمة الإلكترونية المدمجة والأنظمة التي تتفاعل مع العالم المادي — ليس نظام تشغيل كمبيوتر شخصي للمستخدم اليومي.</li>
          <li><strong>لا واجهة مستخدم رسومية:</strong> لا سطح مكتب ولا نوافذ ولا تطبيقات يومية — موجه للمهندسين والمتخصصين في الأنظمة الحرجة.</li>
          <li><strong>مجتمع بحثي متخصص:</strong> يتطلب خبرة تقنية عميقة في الأنظمة المدمجة للتعامل معه وتطويره.</li>
        </ul>
      </div>

      <div className="compare-vs">VS</div>

      <div className="compare-side vault-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>seL4-Vault</h3></div>
        <ul className="compare-list">
          <li><strong>نفس الأساس القوي:</strong> يشتركان في نفس النواة المثبتة رياضياً — لكن seL4-Vault يأخذ هذا الأساس ويبني فوقه تجربة كمبيوتر شخصي كاملة.</li>
          <li><strong>للمستخدم العادي والمطور:</strong> LionsOS للأجهزة المدمجة الحرجة — seL4-Vault لك أنت، تعمل وتتصفح وتدير ملفاتك بنفس مستوى الأمان.</li>
          <li><strong>واجهة رسومية حديثة:</strong> سطح مكتب متكامل وتطبيقات معزولة وتجربة مستخدم سلسة — كل هذا فوق نواة مثبتة رياضياً.</li>
          <li><strong>يسد فجوة في السوق:</strong> LionsOS يخدم الأنظمة المدمجة الحرجة — seL4-Vault يخدم الفراغ الكبير: كمبيوتر شخصي آمن للجميع.</li>
        </ul>
      </div>
    </motion.div>
  );
}
