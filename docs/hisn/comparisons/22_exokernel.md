---
title: 🎓 مقارنة مع MIT Exokernel
description: كيف يتفوق Hisn-seL4 معمارياً على نظام MIT Exokernel؟
---

# 🎓 المقارنة المعمارية: Hisn-seL4 ضد MIT Exokernel

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="MIT Exokernel" osIcon="🎓" osCat="كلاسيكي / تاريخي">

<template #competitor>

- **إلغاء نظام التشغيل (LibOS):** مشروع ثوري من جامعة MIT في التسعينات ألغى النواة التقليدية، واستبدلها بجدار حماية (Exokernel) يترك لكل برنامج مهمة إحضار نظام التشغيل الخاص به.
- **الهدف هو الأداء المخصص:** صُمم ليسمح للتطبيقات بإدارة العتاد مباشرة (كالقرص والشبكة) للحصول على أقصى أداء، متجاوزاً بطء النواة التقليدية.
- **عبء أمني على المطور:** إعطاء التطبيقات وصولاً للعتاد الخام عبر أنظمة تشغيل مصغرة يجعل كتابة الكود الآمن مهمة بالغة التعقيد، ويعرض النظام لأخطاء المبرمجين.
- **بقي كإثبات مفهوم أكاديمي:** أثبتت التجربة أن التخلي عن النواة يمنح أداءً خارقاً، لكنه يجعل تطوير البرامج كابوساً هندسياً، ليبقى أطروحة أكاديمية لامعة.

</template>

<template #vault>

- **النواة الدقيقة كحل وسط ومثالي:** MIT Exokernel تخلص من النواة كلياً — Hisn-seL4 احتفظ بنواة دقيقة جداً (10,000 سطر) لتنظيم العزل بقوانين رياضية دون إبطاء الأداء.
- **قدرات (Capabilities) رياضية بدل العتاد الخام:** بدلاً من رمي العتاد الخام للتطبيق، يعطيه Hisn-seL4 قدرات وصول مبرهنة رياضياً تضمن الأمان وتمنع التخريب.
- **حاويات (Vaults) آمنة بلغة حديثة:** يتبنى Hisn-seL4 فكرة (LibOS) لكن بشكل آمن؛ كل حاوية تمتلك بيئتها المستقلة، لكنها مكتوبة بـ Rust ومقيدة بحدود عتادية لا تُخترق.
- **من المختبر للمستخدم:** ما حاولت MIT إثباته في التسعينات معمارياً، طبقه Hisn-seL4 عملياً، وقدمه كسطح مكتب جاهز لا يتطلب من المطورين إعادة اختراع العجلة.

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
