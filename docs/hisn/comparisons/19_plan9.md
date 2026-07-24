---
title: 👽 مقارنة مع Plan 9
description: كيف يتفوق Hisn-seL4 معمارياً على نظام Plan 9؟
---

# 👽 المقارنة المعمارية: Hisn-seL4 ضد Plan 9

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="Plan 9" osIcon="👽" osCat="كلاسيكي / تاريخي">

<template #competitor>

- **الخليفة الشرعي لـ UNIX:** صممه نفس مبتكري UNIX (في مختبرات Bell) لإصلاح عيوبه المعمارية، وابتكروا فكرة 'Namespaces' التي ألهمت حاويات Linux اليوم.
- **كل شيء هو ملف وشبكة:** فلسفته الثورية دمجت العتاد والشبكة والعمليات كملفات عادية، مما قدم مستوى جديداً من العزل المنطقي وتوزيع الموارد.
- **أمان تنظيمي لا رياضي:** رغم عبقرية العزل بالـ Namespaces، الأمان استمر بالاعتماد على صلاحيات الملفات (Permissions) بدلاً من قدرات الوصول الجذرية (Capabilities).
- **هزمه مبدأ 'الأسوأ هو الأفضل':** فشل تجارياً لأن العالم كان قد استثمر بكثافة في UNIX، ليبقى Plan 9 مختبراً للأفكار الثورية دون تبني واسع.

</template>

<template #vault>

- **القطيعة الحقيقية مع الماضي:** ما حاول Plan 9 فعله بفلسفة 'كل شيء ملف'، يحققه Hisn-seL4 بفلسفة 'كل شيء قدرة (Capability) معزولة'.
- **من إخفاء المسارات إلى العزل الرياضي:** Plan 9 يعزل العمليات عبر إخفاء الموارد عنها (Namespaces) — Hisn-seL4 يعزلها عتادياً ورياضياً؛ يستحيل الاختراق حتى لو عُرفت المسارات.
- **سرعة الرسائل ضد تجريد الملفات:** فلسفة Plan 9 (كل شيء ملف) تضيف بطئاً في التجريد — seL4 يعتمد على تمرير الرسائل (IPC) الأسرع عالمياً والمثبت بأنه لا يُسرّب البيانات.
- **الثورة في وقتها الصحيح:** Plan 9 سبق عصره في زمن لم يهتم بالأمان — Hisn-seL4 يأتي في عصر الاختراقات حيث النواة المثبتة رياضياً لم تعد ترفاً بل ضرورة حتمية.

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
