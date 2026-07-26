---
layout: doc
title: watad-render — محرك الرسم
description: محرك الرسم في وتد — يحول شجرة العناصر لبيكسلات ويدعم Vulkan وSoftware Renderer
---

<div style="padding-top: 1.5rem">

# 🎨 watad-render <span style="font-size:0.55em;font-weight:700;letter-spacing:0.15em;color:#f472b6;opacity:0.7;font-family:monospace;vertical-align:middle">RENDERER</span>

> يحوّل شجرة العناصر إلى بيكسلات — Vulkan للقوة، Software Renderer للعزل

**وتد-ريندر** هو آخر حلقة في خط التجميع — يأخذ شجرة العناصر بعد حساب التخطيط ويرسمها على الشاشة. يدعم backends متعددة لتناسب البيئات المختلفة.

## الـ Backends المدعومة (مستقبلاً)

| الـ Backend | البيئة | الوصف |
|---|---|---|
| `VulkanRenderer` | Linux / Windows | أداء عالي عبر GPU |
| `WgpuRenderer` | متعدد المنصات | مرونة عالية |
| `SoftwareRenderer` | Hisn-seL4 | رسم برمجي بدون GPU |

## الحالة

> 🚧 **قيد التطوير** — هذه الوحدة مخططة ولم تبدأ بعد

</div>
