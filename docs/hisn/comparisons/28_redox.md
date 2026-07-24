---
title: 🦀 مقارنة مع Redox OS
description: كيف يتفوق Hisn-seL4 معمارياً على نظام Redox OS؟
---

# 🦀 المقارنة المعمارية: Hisn-seL4 ضد Redox OS

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="Redox OS" osIcon="🦀" osCat="Microkernel">

<template #competitor>

- نواة دقيقة بلغة Rust: يمتلك نواة ميكروكرنل (Microkernel) خاصة به مكتوبة بالكامل بلغة Rust التي تضمن حماية الذاكرة من الأخطاء.
- عزل البرامج والتعريفات: يعزل جميع برامج التشغيل (Drivers) وخدمات النظام في مساحة المستخدم لتحسين الأمان والاستقرار.
- بديل مستقل للينكس: مشروع طموح يهدف لبناء نظام تشغيل متكامل ومستقل من الصفر (بما في ذلك الواجهة والأدوات الأساسية).
- الأمان يعتمد على لغة البرمجة: يعتمد بشكل أساسي على القواعد الصارمة للغة Rust لمنع تسرب الذاكرة والثغرات التقليدية.

</template>

<template #vault>

- أبعد من أمان لغة البرمجة: Rust ممتازة وتمنع أخطاء الذاكرة، لكن نواة seL4 مثبتة رياضياً (Formal Proof) كلياً، وهو مستوى أمان يتجاوز قدرات أي لغة برمجة.
- نواة أصلب وأكثر نضجاً: seL4 مجربة لسنوات في أعقد الأنظمة العسكرية والفضائية، بينما نواة Redox لا تزال حديثة وفي طور التطور.
- نظام الصلاحيات (Capabilities): التحكم بالوصول في seL4 يتم عبر رموز رياضية صارمة لا يمكن الالتفاف عليها بأي شكل.
- أداء تمرير الرسائل: نواة seL4 تُعتبر الأسرع عالمياً في التواصل بين الحاويات (IPC)، وهو العنصر الأهم لسرعة أنظمة النواة الدقيقة.

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
