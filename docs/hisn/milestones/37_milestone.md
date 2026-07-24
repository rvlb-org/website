---
title: "تصحيح نقاط الإقلاع والمعطيات للعمليات (Process Entry Points & Args)"
date: "18:30 GMT+3 - 2026-07-07"
icon: "🚀"
cat: "OS Kernel / Loader / Debugging"
---

**تاريخ الإنجاز:** 2026-07-07 — 18:30 GMT+3

**التصنيف:** OS Kernel / Loader / Debugging

تم الكشف عن وحل أخطاء حرجة في ترتيب المعطيات (Arguments) المرسلة من المحمل (Loader) إلى واجهات البرامج (Entry Points). تضمن الإصلاح إرجاع الترتيب المتوافق مع (ABI) `(ipc_buffer, endpoint_slot)`، وكتابة نقطة الإدراج `_start` مخصصة لـ `Auth_Vault` لضمان تمرير الـ `rsp` والذاكرة المؤقتة بشكل صحيح، مما مكن العمليات من الإقلاع بلا أخطاء (VM Faults) أو انهيارات.
