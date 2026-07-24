---
title: 🧱 مقارنة مع seL4CP
description: كيف يتفوق Hisn-seL4 معمارياً على نظام seL4CP؟
---

# 🧱 المقارنة المعمارية: Hisn-seL4 ضد seL4CP

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="seL4CP" osIcon="🧱" osCat="Microkernel">

<template #competitor>

- **الإطار الرسمي من مؤسسة seL4:** يستبدل CAmkES القديم بواجهة أبسط وأحدث — معتمد رسمياً لبناء الأنظمة الحرجة فوق seL4.
- **للأنظمة المدمجة فقط:** مصمّم للسيارات ذاتية القيادة والأجهزة الطبية — يعمل بدون واجهة مستخدم أو سطح مكتب، ليس للكمبيوتر الشخصي.
- **إطار عمل لا نظام تشغيل جاهز:** seL4CP أداة لبناء أنظمة، ليس نظاماً جاهزاً — يحتاج فريقاً هندسياً متخصصاً للبناء فوقه.
- **مكتوب بلغة C تقليدياً:** الإطار مكتوب بلغة C — رغم محاولات دمج Rust تدريجياً، لا يوفّر أمان الذاكرة للغة C حتى الآن.

</template>

<template #vault>

- **نفس الأساس + سطح مكتب جاهز:** يشتركان في مؤسسة seL4 وفلسفته — لكن Hisn-seL4 يبني فوقه تجربة سطح مكتب متكاملة لا مجرد إطار عمل.
- **جاهز للاستخدام الفوري:** seL4CP يحتاج فريق هندسياً لبناء النظام — Hisn-seL4 نظام تشغيل متكامل بواجهة رسومية جاهز من اليوم الأول.
- **يسد فجوة الكمبيوتر الشخصي:** seL4CP يخدم السيارات والأجهزة الطبية — Hisn-seL4 يخدم الفراغ الأكبر: كمبيوتر شخصي آمن بأمان عسكري.
- **Rust من البداية:** Hisn-seL4 مكتوب بلغة Rust بالكامل — أمان الذاكرة مضمون على مستوى اللغة + إثبات رياضي للنواة، طبقتان من الحماية بدل طبقة واحدة.

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
