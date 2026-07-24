---
title: 🚁 مقارنة مع CrossOS
description: كيف يتفوق Hisn-seL4 معمارياً على نظام CrossOS؟
---

# 🚁 المقارنة المعمارية: Hisn-seL4 ضد CrossOS

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="CrossOS" osIcon="🚁" osCat="عسكري / حرج">

<template #competitor>

- **مبني على seL4 أيضاً:** طورته Galois بتمويل DARPA فوق seL4 بلغة Rust — شهادة من DARPA نفسها أن seL4 هو الأساس الوحيد للأنظمة العسكرية الحرجة.
- **مغلوق وعسكري حصراً:** مموّل لأغراض دفاعية أمريكية — مغلوق ومحتكر للعمليات العسكرية، لا يمكن لمطوّر عادي الوصول إليه أو التحقق منه.
- **مصمم للطائرات المسيّرة فقط:** يتألق في سيناريوهات الدرونز العسكرية — ليس نظام تشغيل للكمبيوتر الشخصي بأي حال، ولا تجد عنه وثائق عامة.
- **مجهول للعامة:** لا مجتمع مفتوح، لا وثائق علنية، تطوير في الخفاء — لا يمكن لأحد التحقق منه علنياً أو البناء فوقه.

</template>

<template #vault>

- **نفس الأساس بلا حدود:** يشتركان في نواة seL4 — لكن Hisn-seL4 يأخذ هذا الأساس ويبنيه لسطح مكتب مفتوح لكل مستخدم لا لعمليات سرية.
- **مفتوح وقابل للمراجعة:** بخلاف CrossOS، كل شيء في Hisn-seL4 متاح علنياً — لا تثق بصندوق أسود، راجع الكود بنفسك.
- **للمواطن لا للطائرات فقط:** CrossOS للدرونز العسكرية — Hisn-seL4 يأخذ أمان DARPA العسكري ويضعه في سطح مكتب يحمي بياناتك وملفاتك اليومية.
- **لا يحتاج لعقد DARPA:** CrossOS يحتاج موافقة حكومية أمريكية — Hisn-seL4 متاح لكل مطوّر ومستخدم عادي مجاناً بدون أي قيود.

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
