---
title: "ابتكار الصلاحيات المشفرة (Cryptographic Capabilities)"
date: "18:05 GMT+3 - 2026-07-07"
icon: "🔑"
cat: "Security / IPC / Capabilities"
---

**تاريخ الإنجاز:** 2026-07-07 — 18:05 GMT+3

**التصنيف:** Security / IPC / Capabilities

بدلاً من تعقيد تناقل القدرات (Capabilities) العتادية عبر قنوات النواة، تم ابتكار نظام **التذاكر المشفرة (Badged Tokens)** ضمن مكتبة `security-policy`. يتم دمج (رقم التطبيق + الصلاحيات + هاش المسار) في رقم واحد 64-بت، والذي يُستخدم كـ Badge لرسائل الـ IPC. يوفر هذا النظام أماناً مطلقاً وأداءً فائقاً (Stateless) في التحقق من الصلاحيات.
