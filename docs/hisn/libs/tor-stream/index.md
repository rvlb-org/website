---
title: "🔐 tor-stream"
description: "توثيق مكتبة tor-stream في نظام Hisn-seL4 — Security & Net"
---

# 🔐 tor-stream


## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>tor-stream</code> تُقدّم <strong>تجريد اتصالات TCP فوق دوائر Tor</strong> في واجهة بسيطة (<code>read/write</code>) تشبه البرمجة الشبكية المعتادة. تُمكّن إدارة حتى 8 تدفقات متزامنة على دائرة واحدة، مع مخزن استقبال Circular Buffer بحجم 4KB لكل تدفق.</p>

</div>

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

### `src/stream_ops.rs`

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
