---
layout: doc
title: watad-dom — محلل المستندات
description: محلل HTML مبني من الصفر يحول النص إلى شجرة DOM آمنة وخفيفة بدون تبعيات
---

<div style="padding-top: 1.5rem">

# 🌳 watad-dom <span style="font-size:0.55em;font-weight:700;letter-spacing:0.15em;color:#34d399;opacity:0.7;font-family:monospace;vertical-align:middle">DOM PARSER</span>

> محلل HTML مبني من الصفر — بدون تبعيات خارجية، `no_std` متوافق

**وتد-دوم** يأخذ نص HTML الخام ويحوله إلى شجرة بيانات منظمة (DOM Tree) يمكن لبقية الوحدات التعامل معها. مبني بالكامل من الصفر لضمان الخفة والتوافق مع بيئة Hisn-seL4.

## المبدأ

```
"<div><p>مرحبا</p></div>"
         ↓
    Document
       └── div
            └── p
                 └── "مرحبا"
```

## الحالة

> 🚧 **قيد التطوير** — هذه الوحدة مخططة ولم تبدأ بعد

</div>
