---
title: "أول IPC كامل بين Init وحاوية Tor — بروتوكول Onion Routing يعمل"
date: "16:30 GMT+3 - 2026-06-29"
icon: "🧅"
cat: "IPC / Networking / Tor Protocol"
---

**تاريخ الإنجاز:** 2026-06-29 — 16:30 GMT+3

**التصنيف:** IPC / Networking / Tor Protocol

تم تحقيق أول握手 IPC ناجح وكامل بين حاوية `init` وحاوية `tor` في بيئة bare-metal seL4. اشتمل هذا الإنجاز على اكتشاف وحل مشكلة دقيقة في جدولة seL4 أحادي المعالج (Single-CPU): الحاوية يجب أن تصل إلى `seL4_Wait` قبل أن تُرسل init طلبها، وإلا ظلّ النظام معلّقاً. الحل تمثّل في تبني معمارية **IPC-First + Lazy Init**: تدخل حاوية Tor حلقة IPC فورياً عند الإقلاع، وتُهيّئ مكدس smoltcp ودوائر Tor عند وصول أول طلب فعلي. النتيجة النهائية الموثّقة في QEMU: `[Tor] Stream opened over Onion Circuit.` ← `[Init] SUCCESS: Tor Router responded with OK!`، مما يثبت أن البنية الكاملة من IPC إلى Circuit إلى Stream تعمل بشكل صحيح في بيئة معزولة حقيقية.
