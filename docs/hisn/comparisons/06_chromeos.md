---
title: 🌐 مقارنة مع ChromeOS
description: كيف يتفوق Hisn-seL4 معمارياً على نظام ChromeOS؟
---

# 🌐 المقارنة المعمارية: Hisn-seL4 ضد ChromeOS

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="ChromeOS" osIcon="🌐" osCat="أنظمة عامة">

<template #competitor>

- عزل برمجي لا معماري: يعزل التبويبات والتطبيقات برمجياً — وهذا جيد، لكنه ليس عزلاً هيكلياً حقيقياً مضموناً رياضياً.
- نواة لينكس الضخمة بالأساس: مبني فوق نواة لينكس مع تعديلات أمنية — ترث كل ثغرات النواة الأساسية وتبقى قائمة.
- سيطرة جوجل المطلقة: كل شيء مرتبط بحساب Google — النظام يجمع بيانات استخدام مفصلة ويرسلها لجوجل.
- يتوقف بدون إنترنت: معظم وظائفه تعتمد على خوادم جوجل — بدون اتصال تتجمد معظم الوظائف.

</template>

<template #vault>

- عزل معماري مثبت: العزل مفروض من النواة بالإثبات الرياضي — كسر الحاوية مستحيل نظرياً لا مجرد صعب.
- لا مركزية تامة: لا حساب خارجي، لا تتبع، لا اشتراطات. بياناتك ملكك ولا تغادر جهازك بدون إذنك الصريح.
- نواة دقيقة مؤمنة: سطح هجوم أصغر بآلاف المرات من لينكس — لا ثغرة في التعريفات تستطيع التأثير على النظام كله.
- يعمل بالكامل بدون إنترنت: كل شيء محلي — الملفات والتطبيقات والبيانات تبقى على جهازك دون الحاجة لأي خادم.

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
