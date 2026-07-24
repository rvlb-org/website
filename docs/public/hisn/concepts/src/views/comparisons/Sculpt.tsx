import { motion } from 'framer-motion';

export function SculptComparison() {
  return (
    <motion.div key="sculpt" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="compare-layout">
      <div className="compare-side sculpt-side">
        <div className="side-hdr"><span className="icon">🗿</span><h3>Sculpt OS (Genode)</h3></div>
        <ul className="compare-list">
          <li><strong>إطار عمل متعدد الأنوية:</strong> مبني على منصة Genode التي تدعم أنوية مختلفة، وتقدم seL4 كأحد الخيارات المدعومة لتشغيل النظام.</li>
          <li><strong>طبقة تجريد (Abstraction):</strong> يستخدم طبقات برمجية إضافية ليتوافق مع مختلف الأنوية، مما قد يؤثر طفيفاً على الأداء ويضيف تعقيداً للكود.</li>
          <li><strong>عزل شامل وممتاز:</strong> يقوم بعزل كل البرامج والتعريفات في بيئات وحاويات مستقلة تماماً، مما يوفر مستوى عالياً جداً من الأمان.</li>
          <li><strong>واجهة تجريبية معقدة:</strong> واجهة الإدارة الخاصة به (Leitzentrale) تتطلب فهماً تقنياً عالياً لإدارة المكونات، وليست موجهة للمستخدم العادي.</li>
        </ul>
      </div>

      <div className="compare-vs">VS</div>

      <div className="compare-side vault-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>seL4-Vault</h3></div>
        <ul className="compare-list">
          <li><strong>أصلي وحصري لـ seL4:</strong> مبني خصيصاً ومباشرة فوق نواة seL4 دون أي طبقات تجريد، مما يضمن أقصى درجات الأداء والأمان المباشر.</li>
          <li><strong>أداء مثالي (Native):</strong> عدم وجود طبقات وسيطة يسمح باستغلال سرعة seL4 الفائقة في تمرير الرسائل (IPC) بأفضل شكل ممكن.</li>
          <li><strong>نفس مستوى العزل القوي:</strong> يستفيد من قدرات العزل المادي والـ Capabilities في seL4 لتقديم أمان مثبت رياضياً لكل حاوية.</li>
          <li><strong>تجربة مستخدم حديثة وبديهية:</strong> يخفي التعقيد التقني خلف واجهة رسومية سلسة وجميلة، ليقدم نظاماً مؤمناً جاهزاً للاستخدام اليومي.</li>
        </ul>
      </div>
    </motion.div>
  );
}
