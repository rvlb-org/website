---
title: "🔐 tor-cell"
description: "توثيق مكتبة tor-cell في نظام Hisn-seL4 — Security & Net"
---

# 🔐 tor-cell


## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>tor-cell</code> تُعرّف الوحدة الأساسية لبروتوكول Tor: <strong>الخلية (Cell)</strong>. كل خلية لها حجم ثابت 514 بايت وفق مواصفة Tor § 3 — هذا التوحيد مصمم لمنع تحليل حركة المرور (Traffic Analysis). يحتوي على تعداد كامل لأوامر الخلايا الخارجية (<code>CellCmd</code>) والداخلية (<code>RelayCmd</code>) مع دوال Serialize/Deserialize نظيفة.</p>

</div>

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

### `src/relay_cell.rs`

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
