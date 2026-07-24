---
title: 🚗 مقارنة مع QNX
description: كيف يتفوق Hisn-seL4 معمارياً على نظام QNX؟
---

# 🚗 المقارنة المعمارية: Hisn-seL4 ضد QNX

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="QNX" osIcon="🚗" osCat="أنظمة مدمجة">

<template #competitor>

- **نواة دقيقة حقيقية لكن مغلقة:** QNX نواة دقيقة فعلية مثبتة على مدى عقود — لكنها تجارية مغلقة المصدر، لا يمكن لأحد مراجعة كودها أو التحقق منها بشكل مستقل.
- **لا إثبات رياضي:** رغم استقراره الأسطوري في 200+ مليون سيارة، QNX لم يحظَ بإثبات رياضي رسمي (Formal Verification) — استقراره مبني على 40 سنة اختبار لا على برهان رياضي.
- **مملوك لـ BlackBerry:** قرارات تطويره وترخيصه تعتمد على شركة واحدة — من يريد استخدامه يدفع لـBlackBerry ويخضع لشروطها.
- **للأنظمة المدمجة لا لسطح المكتب:** يتألق في السيارات والمحطات الفضائية — لكنه غير موجّه للمستخدم العادي ولا يوفّر واجهة سطح مكتب حقيقية.

</template>

<template #vault>

- **مفتوح + مثبت رياضياً:** ما يقدمه QNX مع سرية الكود، Hisn-seL4 يتجاوزه — مفتوح المصدر ومثبت رياضياً بالحاسوب.
- **الثقة بالرياضيات لا بالسنين:** QNX يثق في 40 سنة اختبار — seL4 يثبت رياضياً أن الثغرة مستحيلة من الأساس، فارق جوهري.
- **للسيارة وسطح المكتب معاً:** QNX للأنظمة المدمجة فقط — Hisn-seL4 يجمع أمان الأنظمة الحرجة مع واجهة سطح مكتب حديثة للمستخدم العادي.
- **لا قيود تجارية:** مفتوح المصدر، لا تدفع لـBlackBerry، قابل للتدقيق والتطوير والمراجعة من الجميع بحرية تامة.

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
