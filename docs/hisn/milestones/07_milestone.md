---
title: " بناء مكتبة bump-alloc (مدير الذاكرة)"
date: "21:53 GMT+3 - 2026-06-23"
icon: "🏗"
cat: "Memory Management"
---

**تاريخ الإنجاز:** 2026-06-23 — 21:53 GMT+3

**التصنيف:** Memory Management

تم كتابة مكتبة `bump-alloc` كـ crate منفصل قابل لإعادة الاستخدام في جميع الحاويات. تعتمد على مؤشر ذري (`AtomicUsize`) يتحرك للأمام عند كل تخصيص ذاكرة (O(1)). وتم تسجيلها كـ `#[global_allocator]` في حاوية `init` مما مكّننا من استخدام `Vec`، `String`، و `Box` داخل بيئة Bare-Metal بدون أي نظام تشغيل وسيط!
