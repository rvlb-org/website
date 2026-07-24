import { motion } from 'framer-motion';

export function OpenBSDComparison() {
  return (
    <motion.div key="openbsd" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="compare-layout">
      <div className="compare-side openbsd-side">
        <div className="side-hdr"><span className="icon">🟡</span><h3>OpenBSD</h3></div>
        <ul className="compare-list">
          <li><strong>لقب الأكثر أماناً:</strong> يحمل لقب أكثر أنظمة التشغيل أماناً بفضل مراجعة دقيقة ومكثفة لكل سطر كود — جهد بشري هائل في ضبط الجودة البرمجية.</li>
          <li><strong>الأمان يعتمد على البشر:</strong> الحماية مبنية على مراجعة بشرية مكثفة — والخطأ البشري وارد بطبيعته مهما بلغت الدقة.</li>
          <li><strong>نواة ضخمة بصلاحيات كاملة:</strong> رغم صلابته البرمجية، تعمل نواته بصلاحيات مطلقة — المشكلة المعمارية الجذرية لا تزال قائمة.</li>
          <li><strong>موجه للمتخصصين:</strong> واجهته متقشفة تفتقر للحداثة وسلاسة الاستخدام التي يتوقعها المستخدم العادي.</li>
        </ul>
      </div>
      <div className="compare-vs">VS</div>
      <div className="compare-side vault-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>seL4-Vault</h3></div>
        <ul className="compare-list">
          <li><strong>تحقق رياضي بالحاسوب:</strong> الأمان ليس جهداً بشرياً فقط — مثبت آلياً بالحاسوب أنه مستحيل رياضياً حدوث ثغرات تجاوز الذاكرة أو كسر العزل.</li>
          <li><strong>فوق الجهد البشري:</strong> النواة الصغيرة مثبتة آلياً — المراجعة البشرية تضاف فوق هذا الإثبات لا بديلاً عنه.</li>
          <li><strong>عزل معماري حقيقي:</strong> الحل ليس كتابة كود أفضل فحسب — بل تصميم يجعل الأضرار محصورة حتى لو اخترق مكون.</li>
          <li><strong>أمان مع سهولة الاستخدام:</strong> يجمع بين الأمان المثبت رياضياً وواجهة رسومية حديثة سلسة — ما لم يجمعه OpenBSD قط.</li>
        </ul>
      </div>
    </motion.div>
  );
}
