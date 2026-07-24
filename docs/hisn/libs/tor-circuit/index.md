---
title: "🔐 tor-circuit"
description: "توثيق مكتبة tor-circuit في نظام Hisn-seL4 — Security & Net"
---

# 🔐 tor-circuit


## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>tor-circuit</code> تُدير <strong>دوائر Tor</strong> (Circuits) — السلاسل المشفرة من العقد (Hops) التي تُشكّل قلب بروتوكول Tor للخصوصية. تدعم حتى 3 قفزات (Entry → Middle → Exit) وتُنفّذ نمط Onion Encryption — حيث تُشفَّر كل خلية بجميع طبقات التشفير قبل الإرسال ثم تُفكَّك طبقة تلو الأخرى عند الاستقبال. تعتمد على <code>vault-crypto</code> للتشفير و<code>tor-cell</code> لبناء الخلايا و<code>tor-handshake</code> للمفاتيح.</p>

</div>

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

### `src/circuit_ops.rs`

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
