import { motion } from 'framer-motion';

export function RedoxComparison() {
  return (
    <motion.div key="redox" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="compare-layout">
      <div className="compare-side redox-side">
        <div className="side-hdr"><span className="icon">🦀</span><h3>Redox OS</h3></div>
        <ul className="compare-list">
          <li><strong>نواة دقيقة بلغة Rust:</strong> يمتلك نواة ميكروكرنل (Microkernel) خاصة به مكتوبة بالكامل بلغة Rust التي تضمن حماية الذاكرة من الأخطاء.</li>
          <li><strong>عزل البرامج والتعريفات:</strong> يعزل جميع برامج التشغيل (Drivers) وخدمات النظام في مساحة المستخدم لتحسين الأمان والاستقرار.</li>
          <li><strong>بديل مستقل للينكس:</strong> مشروع طموح يهدف لبناء نظام تشغيل متكامل ومستقل من الصفر (بما في ذلك الواجهة والأدوات الأساسية).</li>
          <li><strong>الأمان يعتمد على لغة البرمجة:</strong> يعتمد بشكل أساسي على القواعد الصارمة للغة Rust لمنع تسرب الذاكرة والثغرات التقليدية.</li>
        </ul>
      </div>

      <div className="compare-vs">VS</div>

      <div className="compare-side vault-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>seL4-Vault</h3></div>
        <ul className="compare-list">
          <li><strong>أبعد من أمان لغة البرمجة:</strong> Rust ممتازة وتمنع أخطاء الذاكرة، لكن نواة seL4 مثبتة رياضياً (Formal Proof) كلياً، وهو مستوى أمان يتجاوز قدرات أي لغة برمجة.</li>
          <li><strong>نواة أصلب وأكثر نضجاً:</strong> seL4 مجربة لسنوات في أعقد الأنظمة العسكرية والفضائية، بينما نواة Redox لا تزال حديثة وفي طور التطور.</li>
          <li><strong>نظام الصلاحيات (Capabilities):</strong> التحكم بالوصول في seL4 يتم عبر رموز رياضية صارمة لا يمكن الالتفاف عليها بأي شكل.</li>
          <li><strong>أداء تمرير الرسائل:</strong> نواة seL4 تُعتبر الأسرع عالمياً في التواصل بين الحاويات (IPC)، وهو العنصر الأهم لسرعة أنظمة النواة الدقيقة.</li>
        </ul>
      </div>
    </motion.div>
  );
}
