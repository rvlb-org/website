---
title: 🗿 مقارنة مع Sculpt OS
description: كيف يتفوق Hisn-seL4 معمارياً على نظام Sculpt OS؟
---

# 🗿 المقارنة المعمارية: Hisn-seL4 ضد Sculpt OS

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="Sculpt OS" osIcon="🗿" osCat="Microkernel">

<template #competitor>

- إطار عمل متعدد الأنوية: مبني على منصة Genode التي تدعم أنوية مختلفة، وتقدم seL4 كأحد الخيارات المدعومة لتشغيل النظام.
- طبقة تجريد (Abstraction): يستخدم طبقات برمجية إضافية ليتوافق مع مختلف الأنوية، مما قد يؤثر طفيفاً على الأداء ويضيف تعقيداً للكود.
- عزل شامل وممتاز: يقوم بعزل كل البرامج والتعريفات في بيئات وحاويات مستقلة تماماً، مما يوفر مستوى عالياً جداً من الأمان.
- واجهة تجريبية معقدة: واجهة الإدارة الخاصة به (Leitzentrale) تتطلب فهماً تقنياً عالياً لإدارة المكونات، وليست موجهة للمستخدم العادي.

</template>

<template #vault>

- أصلي وحصري لـ seL4: مبني خصيصاً ومباشرة فوق نواة seL4 دون أي طبقات تجريد، مما يضمن أقصى درجات الأداء والأمان المباشر.
- أداء مثالي (Native): عدم وجود طبقات وسيطة يسمح باستغلال سرعة seL4 الفائقة في تمرير الرسائل (IPC) بأفضل شكل ممكن.
- نفس مستوى العزل القوي: يستفيد من قدرات العزل المادي والـ Capabilities في seL4 لتقديم أمان مثبت رياضياً لكل حاوية.
- تجربة مستخدم حديثة وبديهية: يخفي التعقيد التقني خلف واجهة رسومية سلسة وجميلة، ليقدم نظاماً مؤمناً جاهزاً للاستخدام اليومي.

</template>

</ComparisonView>

<style>
.cmp-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  color: var(--vp-c-text-1) !important;
  text-decoration: none !important;
  font-weight: 600;
  transition: all 0.2s;
}
.cmp-back-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.2);
}
</style>
