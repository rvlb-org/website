---
title: 🍎 مقارنة مع macOS
description: كيف يتفوق Hisn-seL4 معمارياً على نظام macOS؟
---

# 🍎 المقارنة المعمارية: Hisn-seL4 ضد macOS

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="macOS" osIcon="🍎" osCat="أنظمة عامة">

<template #competitor>

- نواة هجينة بالأداء: رغم جذورها في نواة Mach الدقيقة، تحولت إلى نواة هجينة ضخمة لأسباب الأداء — مما وسّع سطح الهجوم كثيراً.
- الأمان بالحديقة المغلقة: حمايته تعتمد على سيطرة Apple على متجر التطبيقات أكثر من اعتمادها على عزل معماري حقيقي.
- نظام اتصال داخلي معقد: واجهات الاتصال بين العمليات معقدة تاريخياً وكانت مصدراً لثغرات خطيرة وعمليات كسر الحماية.
- طبقات حماية فوقية: يعتمد على أدوات برمجية مثل حماية النزاهة والبوابة لحماية النظام — تجاوزها يسقط الدفاع كله.

</template>

<template #vault>

- نواة دقيقة حقيقية: لا تنازلات للأداء على حساب الأمان — نواة دقيقة نقية مثبتة رياضياً ومُثبت أنها الأسرع في تمرير الرسائل.
- أمان مثبت لا مفروض: لا يعتمد على بيئة مغلقة — الكود مفتوح ومُثبت رياضياً أنه منيع ضد الاختراق.
- اتصال داخلي بسيط وآمن: الاتصال بين العمليات بسيط جداً ومحمي برموز وصول رياضية لا يمكن تزويرها أو الالتفاف عليها.
- عزل من الجذور: لا حاجة لطبقات حماية فوقية — الحاويات معزولة هيكلياً من الأساس لا بعد الإنشاء.

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
