---
title: 👻 مقارنة مع Tails OS
description: كيف يتفوق Hisn-seL4 معمارياً على نظام Tails OS؟
---

# 👻 المقارنة المعمارية: Hisn-seL4 ضد Tails OS

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="Tails OS" osIcon="👻" osCat="أنظمة الخصوصية">

<template #competitor>

- نواة لينكس في الأساس: مبني على لينكس، أي أنه يرث نفس مشاكله المعمارية وسطح الهجوم الواسع للنواة الضخمة.
- التخفي لا العزل: يتميز بمسح البيانات وتوجيه الاتصال عبر شبكة Tor، لكنه لا يوفر حماية معمارية حقيقية من الاختراق.
- بيئة موحدة: التطبيقات تشاركت نفس البيئة — اختراق المتصفح يفتح الباب لنظام التشغيل كاملاً.
- الأمان بالنسيان: يمسح الآثار بعد الإغلاق بدلاً من منع حدوث الاختراق أصلاً.

</template>

<template #vault>

- أساس مُثبت رياضياً: مبني من الصفر على نواة دقيقة مثبتة رياضياً — اختراق النواة ذاتها مستحيل نظرياً.
- عزل مادي للتطبيقات: المتصفح والشبكة والتخزين يعملون في حاويات منفصلة. اختراق أحدها لا يؤثر على الباقي.
- الأمان الاستباقي: مصمم لمنع حدوث الاختراق من الأساس، لا لإخفاء آثاره بعد وقوعه.
- تحكم كامل بالشبكة: كل الاتصالات تمر عبر بوابة مركزية تتحكم بالصلاحيات بصرامة ولا يمكن تجاوزها.

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
