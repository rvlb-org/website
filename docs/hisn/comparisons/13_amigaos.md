---
title: 🖱️ مقارنة مع AmigaOS
description: كيف يتفوق Hisn-seL4 معمارياً على نظام AmigaOS؟
---

# 🖱️ المقارنة المعمارية: Hisn-seL4 ضد AmigaOS

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="AmigaOS" osIcon="🖱️" osCat="كلاسيكي / تاريخي">

<template #competitor>

- **رائد تعدد المهام في 1985:** ثورة حقيقية في زمنها — لكنه تعدد مهام تعاوني (Cooperative) يعتمد على حسن نية البرامج لا على إجبار النواة.
- **لا عزل للذاكرة:** كل البرامج تشارك نفس الفضاء العنواني — تعطل برنامج واحد يسحب النظام كله معه.
- **وصول مباشر للعتاد:** الأجهزة تتحدث مع الذاكرة مباشرة عبر DMA — شيء ثوري آنذاك لكنه يعني أن كل جهاز يملك صلاحيات مطلقة.
- **لم يُصمم للأمان:** في 1985 لم يكن إنترنت ولا تهديدات رقمية — Amiga بُني للإبداع والترفيه، لا للحماية.

</template>

<template #vault>

- **عزل الذاكرة مضمون عتادياً:** بخلاف Amiga، كل حاوية في فضاء ذاكرة منفصل تحميه وحدة MMU — يستحيل اختراقه برمجياً.
- **تعدد مهام بإجبار النواة:** seL4 تضمن التبديل الصارم بين العمليات دون اتفاق أو ثقة — حتى المكون الخبيث لا يستطيع الاستئثار بالمعالج.
- **تعطل الحاوية لا يُسقط النظام:** ما حلم به مصممو Amiga أصبح حقيقة — اختراق أو تعطل حاوية لا يلمس الباقي.
- **الرسوميات معزولة تماماً:** نظام الرسوميات يعمل كحاوية منفصلة — لا يملك صلاحيات النواة، وبدون seL4 كان هذا حلماً بعيداً حتى على Amiga.

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
