---
title: 📱 مقارنة مع KaiOS
description: كيف يتفوق Hisn-seL4 معمارياً على نظام KaiOS؟
---

# 📱 المقارنة المعمارية: Hisn-seL4 ضد KaiOS

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="KaiOS" osIcon="📱" osCat="أنظمة مدمجة">

<template #competitor>

- **الويب كنظام تشغيل:** وريث Firefox OS، يعتمد بالكامل على محرك ويب (Gecko) لتشغيل كافة التطبيقات كصفحات HTML5، مما جعله خفيفاً للهواتف الاقتصادية.
- **عزل متصفح لا عزل نظام:** الحماية بين التطبيقات تعتمد حصرياً على تقنيات صندوق الرمل للمتصفحات (JS Sandbox)، وهي تقنيات برمجية تُخترق باستمرار وليست حدوداً عتادية.
- **أساس لينكس متضخم:** تحت واجهة الويب الخفيفة جداً، تقبع نواة لينكس الأحادية الضخمة بكامل تاريخها وثغراتها، مما يناقض فكرة الخفة والأمان الجذري.
- **اقتصادي ومقيّد:** صُمم ليعمل على 256MB رام في الدول النامية، مما قيّد قدراته الأمنية وجعله يثق في المتصفح فقط كطبقة حماية وحيدة لتقليل استهلاك الموارد.

</template>

<template #vault>

- **العزل العتادي مقابل عزل الويب:** بينما يثق KaiOS في صندوق رمل المتصفح الهش (Sandbox)، يثق Hisn-seL4 في العزل المادي للمعالج (MMU) المبرهن رياضياً ضد الاختراق.
- **الخفة في الجذور لا في الواجهة:** خفة KaiOS ظاهرية بينما نواته ضخمة — Hisn-seL4 خفيف من الجذور بنواة دقيقة (seL4) لا تتجاوز 10,000 سطر برمجي.
- **تطبيقات أصلية (Native) آمنة:** بدل إجبار كل شيء ليكون تطبيق ويب بطيء ومحدود، يشغل Hisn-seL4 برامج أصلية (Rust/C) مع الحفاظ على عزل يفوق المتصفحات بمراحل.
- **أمان هندسي لا حلول ترقيعية:** نجاح KaiOS تجاري لربط الهواتف الرخيصة بالإنترنت — نجاح Hisn-seL4 هندسي وعلمي لربط المستخدمين بنظام يستحيل اختراقه من الأساس.

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
