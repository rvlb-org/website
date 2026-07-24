---
title: 🏛️ مقارنة مع OpenVMS
description: كيف يتفوق Hisn-seL4 معمارياً على نظام OpenVMS؟
---

# 🏛️ المقارنة المعمارية: Hisn-seL4 ضد OpenVMS

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="OpenVMS" osIcon="🏛️" osCat="كلاسيكي / تاريخي">

<template #competitor>

- **ملهم Windows NT الحقيقي:** Dave Cutler بنى VMS عام 1977، ثم انتقل لـMicrosoft حاملاً مبادئه بنى فوقها Windows NT — VMS هو الجد الحقيقي لكل Windows الحديثة.
- **نواة أحادية ضخمة:** رغم ابتكاراته الأمنية لزمنه، VMS نواة أحادية ضخمة — كل طبقات الحماية المضافة فوقها لا تحل المشكلة المعمارية الجذرية.
- **لا إثبات رياضي:** أمانه مبني على عقود من الهندسة الدقيقة والاختبار — لا يوجد تحقق رياضي رسمي يضمن خلو نواته من الثغرات البنيوية.
- **إرث تاريخي ثقيل:** يعيش حياً في البنوك والبنية التحتية القديمة — مقيّد بعقود من القرارات المعمارية القديمة التي تجعل التطور الجذري مستحيلاً.

</template>

<template #vault>

- **تجاوز الملهم وحفيده معاً:** Hisn-seL4 لا يرث من VMS ولا من Windows NT — يبني من الصفر بإثبات رياضي يتجاوز كل ما أنجزه Cutler.
- **الإثبات يتجاوز الهندسة الدقيقة:** VMS آمن بالخبرة والهندسة — seL4 آمن بالبرهان الرياضي الآلي، مستوى أعلى بالكامل.
- **نواة دقيقة لا أحادية:** VMS اختار الضخامة لأسباب الأداء آنذاك — seL4 تثبت أن النواة الدقيقة الصغيرة أسرع وأكثر أماناً في آنإ واحد.
- **المستقبل لا الماضي:** OpenVMS يبقى حياً في البنوك والبنية القديمة — Hisn-seL4 مبني للقرن الحادي والعشرين بلغة Rust ومعمارية حديثة خالية من الإرث.

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
