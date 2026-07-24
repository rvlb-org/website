---
title: 🐪 مقارنة مع CAmkES ARM VM
description: كيف يتفوق Hisn-seL4 معمارياً على نظام CAmkES ARM VM؟
---

# 🐪 المقارنة المعمارية: Hisn-seL4 ضد CAmkES ARM VM

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="CAmkES ARM VM" osIcon="🐪" osCat="أنظمة مدمجة">

<template #competitor>

- **أداة رسمية لعزل الأنظمة (VMs):** إطار عمل من مؤسسة seL4 يعتمد على CAmkES، يُستخدم لإنشاء آلات افتراضية معزولة عتادياً على معالجات ARM.
- **يعزل المشكلة ولا يحلها:** الهدف غالباً هو تشغيل نظام Linux كامل داخل الآلة الافتراضية؛ أنت تعزل النظام عن غيره، لكنه يظل قابلاً للاختراق من الداخل لضخامته.
- **تقنية CAmkES القديمة:** يعتمد على توليد كود التواصل بلغة C، وهي منهجية بدأت مؤسسة seL4 بالتخلي عنها تدريجياً لصالح أطر عمل أحدث وأبسط.
- **أداة تطوير لا منتج:** هو مكون برمجي (Component) للمهندسين لبناء أنظمة مدمجة، وليس نظام تشغيل متكامل قابل للاستخدام من قبل المستهلك.

</template>

<template #vault>

- **أصلي (Native) بدلاً من الافتراضي (Virtual):** بدلاً من استهلاك الموارد لتشغيل نظام Linux كامل في آلة افتراضية كـ camkes-arm-vm، يبني Hisn-seL4 مكوناته الأصلية الخفيفة.
- **عزل النظافة لا عزل الفوضى:** camkes يعزل نظام Linux (المعقد والمليء بالثغرات) — Hisn-seL4 يعزل برامج Rust صغيرة وآمنة، مما يُقلّص سطح الهجوم للصفر تقريباً.
- **تجاوز إرث CAmkES:** Hisn-seL4 يتجاوز تعقيدات CAmkES القديمة والمكتوبة بـ C، مستخدماً Rust لإدارة القدرات (Capabilities) بأمان ذاكرة كامل.
- **من أداة متناثرة إلى نظام متكامل:** ما توفره مؤسسة seL4 كأدوات متفرقة للمطورين، يجمعه Hisn-seL4 ويهندسه في نظام تشغيل رسومي متكامل وجاهز للمستخدم.

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
