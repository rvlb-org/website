---
title: "إصلاح الانهيار (VM Fault) وهيكلة sel4-sys"
date: "04:30 GMT+3 - 2026-06-24"
icon: "🔧"
cat: "Refactoring / Debugging"
---

**تاريخ الإنجاز:** 2026-06-24 — 04:30 GMT+3

**التصنيف:** Refactoring / Debugging

قمنا بتقسيم مكتبة sel4-sys إلى 3 ملفات منطقية (types, syscalls, invocations). كما اكتشفنا السبب الجذري لانهيار النظام (VM fault on data / Cap fault) والذي كان بسبب قيام مترجم LLVM بتوليد استدعاء مخفي لدالة memset أثناء تهيئة مصفوفة، وبسبب عدم وجودها في بيئة Bare-Metal تم القفز للعنوان 0x0 مما دمر الـ Stack. قمنا بإصلاحها باستخدام core::ptr::write_volatile لإجبار المترجم على كتابة الذاكرة يدوياً، مما أدى إلى نجاح عملية Untyped Retype بالكامل وإنشاء كائنات حاوية التشفير (Crypto Vault).
