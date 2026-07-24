---
title: 🐧 مقارنة مع Linux
description: كيف يتفوق Hisn-seL4 معمارياً على نظام Linux؟
---

# 🐧 المقارنة المعمارية: Hisn-seL4 ضد Linux

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="Linux" osIcon="🐧" osCat="أنظمة عامة">

<template #competitor>

- النواة الضخمة: كل شيء يعمل داخل النواة بصلاحيات مطلقة — تعريفات الطابعة والشبكة والرسوميات كلها في قلب النظام.
- سطح هجوم هائل: ملايين الأسطر البرمجية، أي ثغرة في أي تعريف قد تطيح بالنظام بالكامل.
- عزل وهمي: تقنيات العزل المستخدمة قابلة للاختراق والهروب منها بأساليب موثقة.
- من يملك الجذر يملك النظام: بمجرد حصول المخترق على صلاحيات مدير النظام، يمتلك كل شيء دون قيود.

</template>

<template #vault>

- النواة الدقيقة: النواة وظيفتها الوحيدة هي العزل وتمرير الرسائل — لا تعريفات، لا برمجيات ضخمة بداخلها.
- إثبات رياضي: النواة مُثبتة رياضياً بواسطة الحاسوب أنها خالية من أساسيات الثغرات — ليس مجرد اختبار.
- عزل حقيقي: كل خدمة تعمل في حاوية منفصلة تماماً. اختراق حاوية لا يسمح بالوصول لغيرها.
- لا ثقة افتراضية: النظام لا يمنح أي صلاحية بدون رمز وصول رياضي محدد — حتى مكونات النظام نفسها.

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
