---
title: 🪟 مقارنة مع Windows
description: كيف يتفوق Hisn-seL4 معمارياً على نظام Windows؟
---

# 🪟 المقارنة المعمارية: Hisn-seL4 ضد Windows

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="Windows" osIcon="🪟" osCat="أنظمة عامة">

<template #competitor>

- نواة هجينة ضخمة: النواة تحتوي على واجهات رسومية وتعريفات أجهزة بصلاحيات كاملة — حجمها الهائل يعني ثغرات لا تنتهي.
- عقود من الكود القديم: تراكم عشرات السنين من الكود يضمن توافقية البرامج القديمة، لكنه يُخفي ثغرات متوارثة لا حصر لها.
- نظام صلاحيات ظاهري: يعتمد على طلب موافقة المستخدم بنافذة منبثقة — بمجرد تجاوزها تسقط كل الحماية.
- بيئة خصبة للفيروسات: التطبيقات تملك وصولاً واسعاً للقرص والشبكة افتراضياً، مما يجعلها هدفاً مثالياً لبرامج الفدية.

</template>

<template #vault>

- واجهة معزولة عن النواة: نظام الرسوميات يعمل كحاوية منفصلة في فضاء المستخدم — لا يلمس النواة نهائياً.
- كود حديث نظيف: بُني من الصفر بدون إرث قديم — مصمم للقرن الحادي والعشرين بإثبات رياضي صارم.
- لا ثقة افتراضية: العزل مفروض بقوة الرياضيات — النظام لا يسألك 'هل توافق؟' بل يمنع الاختراق هيكلياً.
- مناعة ضد برامج الفدية: أي برمجية خبيثة لا تستطيع حتى رؤية حاوية التخزين بدون رمز وصول صريح لا يمكن تزويره.

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
