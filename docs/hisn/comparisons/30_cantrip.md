---
title: 🧬 مقارنة مع Cantrip OS
description: كيف يتفوق Hisn-seL4 معمارياً على نظام Cantrip OS؟
---

# 🧬 المقارنة المعمارية: Hisn-seL4 ضد Cantrip OS

<a href="/hisn/comparisons/" class="cmp-back-btn" style="margin-top: -15px; margin-bottom: 0.5rem;">← العودة لقائمة الأنظمة</a>

<ComparisonView osName="Cantrip OS" osIcon="🧬" osCat="Microkernel">

<template #competitor>

- مبني على seL4 أيضاً: مشروع من جوجل مكتوب بلغة Rust فوق نواة seL4 — شهادة من جوجل نفسها على موثوقية seL4.
- للأجهزة المدمجة فقط: مخصص حصراً للأجهزة الذكية الصغيرة — ليس نظام تشغيل للكمبيوتر الشخصي بأي حال.
- لا واجهة رسومية: بدون نوافذ أو سطح مكتب — للمطورين المتخصصين فقط لا للمستخدم العادي.
- مجتمع جوجل المغلق: مشروع داخلي خاص — ليس مفتوحاً للمجتمع العام.

</template>

<template #vault>

- نفس الأساس بلا قيود: أيضاً مبني على seL4، لكنه نظام تشغيل متكامل للكمبيوتر الشخصي بواجهة رسومية حديثة.
- للمستخدم العادي: Cantrip للمطورين — seL4-Vault لك أنت، تدير ملفاتك بأمان عسكري مثبت.
- مستقل ولا مركزي: بياناتك لا يرسلها لأحد ولا تغادر جهازك.
- يملأ الفراغ: Cantrip للأجهزة المدمجة — seL4-Vault للكمبيوتر الشخصي الآمن.

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
