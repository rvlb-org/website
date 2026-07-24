---
title: 🌺 مقارنة مع Fuchsia OS
description: كيف يتفوق Hisn-seL4 معمارياً على نظام Fuchsia OS؟
---

# 🌺 المقارنة المعمارية: Hisn-seL4 ضد Fuchsia OS

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="Fuchsia OS" osIcon="🌺" osCat="Microkernel">

<template #competitor>

- **Google تهجر Linux:** نظام جديد كلياً مبني على نواة دقيقة (Zircon) خاصة بـ Google، تخلت فيه عن نواة Linux الضخمة لصالح معمارية أكثر أماناً وعزلاً.
- **يعتمد على نظام القدرات (Capabilities):** يتبنى نفس المفهوم الأمني المتقدم، حيث لا توجد صلاحيات مطلقة (Root)، بل تُمنح كل عملية قدرات وصول محددة.
- **لا إثبات رياضي (C++):** رغم حداثته، نواة Zircon المكتوبة بـ C++ غير مثبتة رياضياً، وتعتمد في أمانها على الاختبار الهندسي التقليدي المعرض لثغرات الذاكرة البشرية.
- **رهينة لمصالح الشركة التجاري:** صُمم في الأساس لحل مشاكل Google (تحديثات Android المجزأة وأجهزة الذكاء الاصطناعي Nest)، مما يجعله محكوماً بجمع البيانات والبيئة المغلقة.

</template>

<template #vault>

- **القدرات (Capabilities) بقوة الرياضيات:** Fuchsia يستخدم القدرات هندسياً — Hisn-seL4 يستخدمها ببرهان رياضي آلي قاطع يضمن عدم إمكانية التحايل عليها إطلاقاً.
- **أمان الذاكرة المزدوج:** Zircon معرض لثغرات C++ — Hisn-seL4 يبني مكوناته بلغة Rust الآمنة تماماً للذاكرة، مقدماً طبقة حماية ثانية لا يملكها نظام Google.
- **أمان خالص بلا دوافع تجارية:** Hisn-seL4 لا يهدف لجمع بياناتك أو إجبارك على خدمات سحابية — صُمم للخصوصية والحماية المطلقة لسطح المكتب للمستخدم والمؤسسة.
- **تجاوز مستقبل Google:** Google تبني Fuchsia ليكون أمان المستقبل للأجهزة — Hisn-seL4 يوفر اليوم أماناً عسكرياً يتجاوز طموح Google، ومتاح للجميع مفتوح المصدر.

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
