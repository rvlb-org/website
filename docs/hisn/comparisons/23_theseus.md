---
title: 🚢 مقارنة مع Theseus OS
description: كيف يتفوق Hisn-seL4 معمارياً على نظام Theseus OS؟
---

# 🚢 المقارنة المعمارية: Hisn-seL4 ضد Theseus OS

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="Theseus OS" osIcon="🚢" osCat="كلاسيكي / تاريخي">

<template #competitor>

- **عزل بلغة البرمجة لا العتاد:** يرفض معمارية 'النواة الدقيقة'، ويعمل في فضاء ذاكرة واحد. يعتمد كلياً على أمان لغة Rust (مترجم الأكواد) لعزل آلاف المكونات عن بعضها بدلاً من عزل العتاد (MMU).
- **تحديث حي دون إعادة تشغيل:** فكرته الثورية (State-free runtime) تسمح باستبدال أو تحديث أي تعريف أو جزء من النظام أثناء عمله بسلاسة تامة ودون الحاجة لإعادة التشغيل.
- **الثقة المطلقة في المترجم (Compiler):** لأنه يعمل في ذاكرة واحدة، فإن أي ثغرة في مترجم Rust أو كود غير آمن (Unsafe) ستؤدي لانهيار أمان النظام بالكامل.
- **تجربة بحثية مبهرة:** تجربة أكاديمية من جامعة ييل (Yale) لاختبار حدود لغة Rust كبديل للنواة، لكنه يفتقر للحماية ضد الهجمات العتادية المعقدة (مثل Rowhammer).

</template>

<template #vault>

- **أمان مزدوج (لغة + عتاد):** Hisn-seL4 يحب لغة Rust ويستخدمها، لكنه لا يمنحها الثقة المطلقة؛ بل يُعززها بحدود مادية عتادية (MMU) ونواة مبرهنة رياضياً لمنع أي انهيار شامل.
- **تحديث الحاويات لا النظام:** بدل تعقيد تحديث النظام حياً بالكامل (مثل Theseus)، يكتفي Hisn-seL4 بتحديث وإعادة بناء الحاويات المعزولة في أجزاء من الثانية دون التأثير على النواة.
- **الصمود أمام هجمات العتاد:** بيئة الذاكرة الواحدة في Theseus هشة أمام ثغرات العتاد؛ بينما عزل Hisn-seL4 يمنع اختراقات الذاكرة المادية من تخطي حدود الحاوية المخترقة.
- **من التجربة إلى سطح المكتب:** Theseus تجربة أكاديمية رائعة للغة Rust — Hisn-seL4 يأخذ أمان Rust ويضعه داخل درع seL4 العسكري ليقدم نظام سطح مكتب لا يُخترق للاستخدام الحقيقي.

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
