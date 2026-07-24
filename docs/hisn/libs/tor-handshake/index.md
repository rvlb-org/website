---
title: "🔐 tor-handshake"
description: "توثيق مكتبة tor-handshake في نظام Hisn-seL4 — Security & Net"
---

# 🔐 tor-handshake


## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>tor-handshake</code> تُنفّذ مرحلة <strong>المصافحة ntor</strong> (Key Agreement) مع عقد شبكة Tor — وهي العملية التي تُولّد المفاتيح المشتركة اللازمة لتشفير كل قفزة في الدائرة. تشمل بناء رسالة العميل، معالجة رد الخادم، والتحقق من الـ auth token، ثم اشتقاق 72 بايت من المواد المفتاحية (Kf+Kb+Df+Db) عبر ChaCha20 كـ KDF. ملاحظة: بعض الدوال في مرحلة Placeholder تنتظر مكتبة Curve25519 كاملة.</p>

</div>

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

### `src/handshake_helpers.rs`

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
