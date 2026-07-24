import { motion } from 'framer-motion';

export function WindowsComparison() {
  return (
    <motion.div key="windows" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="compare-layout">
      <div className="compare-side windows-side">
        <div className="side-hdr"><span className="icon">🪟</span><h3>Windows</h3></div>
        <ul className="compare-list">
          <li><strong>نواة هجينة ضخمة:</strong> النواة تحتوي على واجهات رسومية وتعريفات أجهزة بصلاحيات كاملة — حجمها الهائل يعني ثغرات لا تنتهي.</li>
          <li><strong>عقود من الكود القديم:</strong> تراكم عشرات السنين من الكود يضمن توافقية البرامج القديمة، لكنه يُخفي ثغرات متوارثة لا حصر لها.</li>
          <li><strong>نظام صلاحيات ظاهري:</strong> يعتمد على طلب موافقة المستخدم بنافذة منبثقة — بمجرد تجاوزها تسقط كل الحماية.</li>
          <li><strong>بيئة خصبة للفيروسات:</strong> التطبيقات تملك وصولاً واسعاً للقرص والشبكة افتراضياً، مما يجعلها هدفاً مثالياً لبرامج الفدية.</li>
        </ul>
      </div>

      <div className="compare-vs">VS</div>

      <div className="compare-side vault-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>seL4-Vault</h3></div>
        <ul className="compare-list">
          <li><strong>واجهة معزولة عن النواة:</strong> نظام الرسوميات يعمل كحاوية منفصلة في فضاء المستخدم — لا يلمس النواة نهائياً.</li>
          <li><strong>كود حديث نظيف:</strong> بُني من الصفر بدون إرث قديم — مصمم للقرن الحادي والعشرين بإثبات رياضي صارم.</li>
          <li><strong>لا ثقة افتراضية:</strong> العزل مفروض بقوة الرياضيات — النظام لا يسألك "هل توافق؟" بل يمنع الاختراق هيكلياً.</li>
          <li><strong>مناعة ضد برامج الفدية:</strong> أي برمجية خبيثة لا تستطيع حتى رؤية حاوية التخزين بدون رمز وصول صريح لا يمكن تزويره.</li>
        </ul>
      </div>
    </motion.div>
  );
}
