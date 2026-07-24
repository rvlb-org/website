---
title: ⚙️ مقارنة مع Hubris OS
description: كيف يتفوق Hisn-seL4 معمارياً على نظام Hubris OS؟
---

# ⚙️ المقارنة المعمارية: Hisn-seL4 ضد Hubris OS

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="Hubris OS" osIcon="⚙️" osCat="أنظمة مدمجة">

<template #competitor>

- ميكروكرنل خفيف بـ Rust: نظام طورته شركة Oxide Computer مبني بلغة Rust للاستفادة من مزايا حماية الذاكرة التي توفرها اللغة.
- كبسولات معزولة: يعزل المكونات داخل 'كبسولات' برمجية لمنع أي مكون من إسقاط النظام أو التعدي على مساحة الآخرين.
- للمتحكمات الدقيقة (Microcontrollers): مصمم خصيصاً للأنظمة المدمجة جداً ورقائق التحكم التي تفتقر غالباً لوحدة إدارة ذاكرة متقدمة (MMU).
- هدف هندسي محدد: صُمم ليكون 'جذر الثقة' (Root of Trust) داخل سيرفرات الشركة، وليس للاستخدام كنظام تشغيل عام.

</template>

<template #vault>

- عزل عتادي كامل (MMU): يتجاوز العزل البرمجي ليستغل وحدة إدارة الذاكرة (MMU) في المعالجات القوية لفرض حواجز يستحيل اختراقها مادياً.
- الثقة بالرياضيات لا المترجم: Hubris يثق في مترجم لغة Rust؛ seL4-Vault يعتمد على الإثبات الرياضي المستقل عن أي لغة أو مترجم.
- نظام سطح مكتب للمستخدم: Hubris يعمل في الظل داخل السيرفرات؛ seL4-Vault يضع هذا المستوى من الأمان في واجهة رسومية أمامك مباشرة.
- مهام ثقيلة وحاويات معقدة: مصمم لتشغيل تطبيقات يومية (متصفح، مدير ملفات) داخل حاويات، وليس فقط مهام تحكم دقيقة.

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
