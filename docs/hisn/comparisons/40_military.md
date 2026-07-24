---
title: 🛡️ مقارنة مع CDS / DARPA
description: كيف يتفوق Hisn-seL4 معمارياً على نظام CDS / DARPA؟
---

# 🛡️ المقارنة المعمارية: Hisn-seL4 ضد CDS / DARPA

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="CDS / DARPA" osIcon="🛡️" osCat="عسكري / حرج">

<template #competitor>

- للنخبة العسكرية فقط: أنظمة عزل الاتصالات هذه مغلقة ومصنفة سرية تماماً — حصرياً للجيوش والحكومات بعقود بالملايين.
- عتاد عسكري مخصص: مبني على أجهزة عسكرية معتمدة — لا يمكن تشغيله على كمبيوتر عادي.
- تكلفة هائلة: الوحدة الواحدة قد تتجاوز الملايين — خارج نطاق أي فرد أو شركة.
- لا بيئة عمل للمستخدم: أنظمة للتشفير والاتصالات الحساسة فقط — بدون سطح مكتب أو تجربة مستخدم.

</template>

<template #vault>

- نفس التكنولوجيا للجميع: نفس مستوى العزل والإثبات الرياضي المعتمد عسكرياً — في متناول كل مطور ومستخدم عادي.
- يعمل على أي جهاز: لا حاجة لعتاد عسكري مخصص أو عقود حكومية بالملايين.
- مفتوح المصدر: الكود متاح للفحص والمراجعة — لا تثق بصندوق أسود، تحقق بنفسك.
- بيئة عمل متكاملة: سطح مكتب حديث وتطبيقات معزولة — كل هذا بأمان مُثبت رياضياً.

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
