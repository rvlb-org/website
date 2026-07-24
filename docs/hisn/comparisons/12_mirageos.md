---
title: 🏜️ مقارنة مع MirageOS
description: كيف يتفوق Hisn-seL4 معمارياً على نظام MirageOS؟
---

# 🏜️ المقارنة المعمارية: Hisn-seL4 ضد MirageOS

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="MirageOS" osIcon="🏜️" osCat="أنظمة عامة">

<template #competitor>

- **البرنامج كنظام تشغيل (Unikernel):** يحول برامجك مباشرة إلى أنظمة تشغيل مصغرة ومستقلة (Unikernels) للعمل على السحابة، متخلصاً من الحاجة لنظام وسيط مثل Linux.
- **أمان لغوي (OCaml):** يعتمد بشكل شبه كلي على قوة نظام الأنواع (Type System) في لغة OCaml لمنع أخطاء الذاكرة والثغرات، ليعوض غياب العزل العتادي الداخلي.
- **احتكار لغوي صارم:** لكي تستفيد من أمانه، أنت مجبر هندسياً على كتابة كل تطبيقاتك وتطويراتك حصرياً بلغة OCaml، مما يجعله بيئة مغلقة وصعبة التبني.
- **عزل يعتمد على الـ Hypervisor:** رغم أمان اللغة، يظل البرنامج والنواة في فضاء واحد؛ وإذا حدث اختراق، فالعزل الوحيد المتبقي هو برنامج الاستضافة السحابية (Hypervisor).

</template>

<template #vault>

- **عزل عتادي لا يحتكر لغة:** لا يجبرك Hisn-seL4 على لغة واحدة؛ فهو يوفر درعاً رياضياً (seL4) يعزل الحاويات عتادياً سواء كانت برامجها مكتوبة بـ C أو Rust أو غيرها.
- **أمان مزدوج (عتاد + رياضيات):** أمان OCaml ممتاز، لكن Hisn-seL4 يدمج بين لغة آمنة (Rust) وبرهان رياضي (Isabelle/HOL) وحدود عتادية (MMU) في منظومة واحدة لا تُقهر.
- **عزل داخلي مستقل:** بينما يحتاج MirageOS لـ Hypervisor سحابي خارجي ليعزله عن جيرانه، Hisn-seL4 هو طبقة العزل بحد ذاته، ويدير العزل داخلياً دون مساعدة.
- **للمكتب لا للسحابة فقط:** MirageOS مخصص لبناء خدمات سحابية دقيقة (Microservices) — Hisn-seL4 موجه لبناء حاسوب شخصي آمن بالكامل ومتعدد المهام للمستخدم اليومي.

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
