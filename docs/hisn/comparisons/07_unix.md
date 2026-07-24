---
title: 🏛️ مقارنة مع UNIX
description: كيف يتفوق Hisn-seL4 معمارياً على نظام UNIX؟
---

# 🏛️ المقارنة المعمارية: Hisn-seL4 ضد UNIX

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="UNIX" osIcon="🏛️" osCat="أنظمة عامة">

<template #competitor>

- **الأب الروحي الضخم:** Unix صُمم عام 1969 في مختبرات Bell — معماريته تعكس فلسفة عصر لم يكن الأمان فيه أولوية، بل التبسيط والتشارك.
- **مفهوم الجذر المطلق:** أبدع Unix مفهوم المستخدم "root" — من يملكه يملك النظام بلا قيود. هذا DNA الخطير ورثه كل أحفاده: Linux وmacOS وBSD.
- **الثقة الضمنية الموروثة:** صُمم في بيئة جامعية تعاونية حيث الثقة افتراض — هذا الافتراض لا يزال مدفوناً في معمارية كل نظام ينحدر منه.
- **التاريخ ثقل معماري:** عقود من الكود المتراكم وآلاف القرارات التصميمية القديمة تجعل التغيير الجذري مستحيلاً — الحفاظ على التوافق أهم من الأمان.

</template>

<template #vault>

- **القطيعة التامة مع الإرث:** بينما كل أحفاد Unix يحملون جيناته المعمارية، Hisn-seL4 يكسر هذا النسب كلياً — لا "root"، لا ثقة افتراضية، لا إرث قديم.
- **Capabilities بدل الجذر:** لا وجود لمفهوم المستخدم الكلي الصلاحيات — كل عملية تمتلك رمزاً رياضياً محدداً لفعل شيء واحد فقط، لا أكثر.
- **مبني للقرن الحادي والعشرين:** Unix صُمم قبل أن يوجد الإنترنت والهجمات المتطورة — seL4 صُمم عام 2009 بعد أن علّمتنا 40 سنة من الاختراقات درساً واحداً: الثقة لا تُفترض.
- **الحفيد الثائر:** Unix هو الجد — seL4-Vault هو الجيل الذي رفض كل ما ورثه وبنى نظاماً لم يستطع الجد حتى تخيّله: نواة مثبتة رياضياً أن اختراقها مستحيل.

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
