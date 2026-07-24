---
title: 🧊 مقارنة مع Qubes OS
description: كيف يتفوق Hisn-seL4 معمارياً على نظام Qubes OS؟
---

# 🧊 المقارنة المعمارية: Hisn-seL4 ضد Qubes OS

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="Qubes OS" osIcon="🧊" osCat="أنظمة الخصوصية">

<template #competitor>

- عزل بالآلات الافتراضية: يعزل التطبيقات داخل آلات افتراضية كاملة ومنفصلة — فكرة ذكية لكنها ثقيلة جداً على الموارد.
- استهلاك ضخم: تشغيل نظام تشغيل كامل لكل تطبيق يستنزف الذاكرة والمعالج بشكل هائل.
- سطح هجوم الـ Hypervisor: نظام Xen المستخدم ضخم ومعقد وله تاريخ من ثغرات الهروب من الآلة الافتراضية.
- لا إثبات رياضي: العزل قوي لكن طبقة الـ Hypervisor الأساسية لم تُثبت رياضياً.

</template>

<template #vault>

- حاويات خفيفة: العزل يتم بحاويات خفيفة جداً على مستوى المهام — لا حاجة لنظام تشغيل كامل لكل تطبيق.
- استهلاك ضئيل: كل حاوية تستهلك ميجابايتات قليلة وتعمل بسرعة قريبة من الأداء الأصلي للجهاز.
- نواة صغيرة جداً: النواة حوالي عشرة آلاف سطر فقط وخالية من التعريفات — سطح الهجوم شبه معدوم.
- إثبات رياضي: العزل مُثبت رياضياً، كسر الجدار الفاصل بين الحاويات مستحيل من الناحية النظرية.

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
