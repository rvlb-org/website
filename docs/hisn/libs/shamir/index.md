---
title: "🔐 shamir"
description: "توثيق مكتبة shamir في نظام Hisn-seL4 — Security & Net"
---

<div class="lib-deprecated-banner">
  ⛔ تم حذف هذه المكتبة — أُدمج منطقها مباشرةً في <strong>crypto_vault</strong> عبر GF(256) في يوليو ٢٠٢٦
</div>

# 🔐 shamir


## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>shamir</code> هي <strong>خامس مكتبة في تاريخ بناء Hisn-seL4</strong> وتُنفّذ خوارزمية Shamir's Secret Sharing كاملةً من الصفر. الفكرة: تقسيم مفتاح التشفير الرئيسي إلى 3 حصص توزَّع على ثلاث حاويات مختلفة (<code>crypto_vault</code>، <code>tor</code>، والحاوية العادية)، بحيث يكفي اجتماع أي <strong>حاويتين فقط</strong> لاستعادة المفتاح — وتكشف أي حصة واحدة منفردة <strong>صفراً</strong> من المعلومات عن السر (Perfect Secrecy مُثبتة رياضياً).</p>

</div>

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

### `src/gf256.rs`

### `src/shamir.rs`

### `src/shamir/shamir_01.rs`

### `src/shamir/shamir_02.rs`

### `src/shamir/shamir_03.rs`

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
