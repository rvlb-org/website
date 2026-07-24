---
title: "إصلاح محاذاة الستاك (Stack Alignment)"
date: "21:42 GMT+3 - 2026-06-23"
icon: "📐"
cat: "Stability / ABI"
---

**تاريخ الإنجاز:** 2026-06-23 — 21:42 GMT+3

**التصنيف:** Stability / ABI

اكتشفنا أن استخدام `core::str::from_utf8` في بيئة Bare-Metal يؤدي إلى `vm fault on data` لأن Rust تستخدم داخلياً تعليمات SIMD تتطلب محاذاة 16-بايت للستاك. تم حل المشكلة بإضافة تعليمة `and rsp, -16` في نقطة الإدخال، وإعادة كتابة دالة `print_hex` للطباعة حرفاً حرفاً مباشرةً عبر Syscall.
