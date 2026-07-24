import { motion } from 'framer-motion';

export function MuenComparison() {
  return (
    <motion.div key="muen" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="compare-layout">
      <div className="compare-side muen-side">
        <div className="side-hdr"><span className="icon">🦅</span><h3>Muen Separation Kernel</h3></div>
        <ul className="compare-list">
          <li><strong>عزل دقيق بلغة آمنة:</strong> مبني بلغة SPARK/Ada لتوفير عزل عالي الموثوقية — مخصص لمعماريات x86_64 فقط.</li>
          <li><strong>للخبراء المتخصصين فقط:</strong> موجه للاستخدامات العسكرية والأنظمة الحرجة — يتطلب خبراء متخصصين جداً للتهيئة والتشغيل.</li>
          <li><strong>إعداد بالغ التعقيد:</strong> تكوين النظام يتطلب كتابة سياسات أمان بصيغة XML ثابتة يدوياً — لا واجهة مستخدم تُسهّل العملية.</li>
          <li><strong>نظام ثابت لا مرن:</strong> الموارد تُخصص قبل الإقلاع ولا يمكن تغييرها أثناء التشغيل — يحد من المرونة في الاستخدام اليومي.</li>
        </ul>
      </div>

      <div className="compare-vs">VS</div>

      <div className="compare-side vault-side">
        <div className="side-hdr"><span className="icon">🛡️</span><h3>seL4-Vault</h3></div>
        <ul className="compare-list">
          <li><strong>إثبات رياضي أقوى:</strong> يستخدم نواة seL4 المثبتة رياضياً بالحاسوب — مستوى ضمان لا يقل عن Muen بل يتفوق عليه.</li>
          <li><strong>للجميع بلا استثناء:</strong> يقدم أماناً بمستوى عسكري لكنه مصمم ليكون في متناول المطورين والمستخدمين العاديين.</li>
          <li><strong>واجهة رسومية حديثة:</strong> إدارة الحاويات وتكوينها بضغطة زر من واجهة رسومية سلسة — لا حاجة لكتابة ملفات إعداد معقدة.</li>
          <li><strong>ديناميكي ومرن:</strong> إدارة الصلاحيات تتم أثناء التشغيل بشكل ديناميكي مع الحفاظ على صرامة العزل المطلق.</li>
        </ul>
      </div>
    </motion.div>
  );
}
