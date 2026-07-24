import { motion } from 'framer-motion';

export function LinuxComparison() {
  return (
    <motion.div key="linux" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="compare-layout">
      <div className="compare-side linux-side">
        <div className="side-hdr"><span className="icon">🐧</span><h3>Linux</h3></div>
        <ul className="compare-list">
          <li><strong>النواة الضخمة:</strong> كل شيء يعمل داخل النواة بصلاحيات مطلقة — تعريفات الطابعة والشبكة والرسوميات كلها في قلب النظام.</li>
          <li><strong>سطح هجوم هائل:</strong> ملايين الأسطر البرمجية، أي ثغرة في أي تعريف قد تطيح بالنظام بالكامل.</li>
          <li><strong>عزل وهمي:</strong> تقنيات العزل المستخدمة قابلة للاختراق والهروب منها بأساليب موثقة.</li>
          <li><strong>من يملك الجذر يملك النظام:</strong> بمجرد حصول المخترق على صلاحيات مدير النظام، يمتلك كل شيء دون قيود.</li>
        </ul>
      </div>

      <div className="compare-vs">VS</div>

      <div className="compare-side vault-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>seL4-Vault</h3></div>
        <ul className="compare-list">
          <li><strong>النواة الدقيقة:</strong> النواة وظيفتها الوحيدة هي العزل وتمرير الرسائل — لا تعريفات، لا برمجيات ضخمة بداخلها.</li>
          <li><strong>إثبات رياضي:</strong> النواة مُثبتة رياضياً بواسطة الحاسوب أنها خالية من أساسيات الثغرات — ليس مجرد اختبار.</li>
          <li><strong>عزل حقيقي:</strong> كل خدمة تعمل في حاوية منفصلة تماماً. اختراق حاوية لا يسمح بالوصول لغيرها.</li>
          <li><strong>لا ثقة افتراضية:</strong> النظام لا يمنح أي صلاحية بدون رمز وصول رياضي محدد — حتى مكونات النظام نفسها.</li>
        </ul>
      </div>
    </motion.div>
  );
}
