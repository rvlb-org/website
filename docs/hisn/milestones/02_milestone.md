---
title: "إعداد مكتبة sel4-sys"
date: "18:25 GMT+3 - 2026-06-23"
icon: "🦀"
cat: "Rust / seL4"
---

**تاريخ الإنجاز:** 2026-06-23 — 18:25 GMT+3

**التصنيف:** Rust / seL4

تم كتابة مكتبة `sel4-sys` يدوياً من الصفر (بدون bindgen) لتوفير واجهة Rust آمنة للتحدث مع النواة. تحتوي على: `seL4_DebugPutChar`، `seL4_Yield`، `seL4_Send`، `seL4_Wait`، وبنية `seL4_BootInfo` الكاملة بـ 230 منفذاً للذاكرة غير المُحددة النوع (Untyped).
