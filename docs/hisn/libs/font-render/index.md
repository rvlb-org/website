---
title: "🔤 font-render"
description: "توثيق مكتبة font-render في نظام Hisn-seL4 — System Core"
---

<div class="lib-deprecated-banner">
  ⛔ تم حذف هذه المكتبة — استُبدلت بـ <a href="/hisn/libs/eg-fb/"><strong>eg-fb</strong></a> + <strong>profont v0.7</strong> في يوليو ٢٠٢٦
</div>

# 🔤 font-render


## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>font-render</code> هي <strong>محرك النصوص المدمج</strong> في Hisn-seL4. بدلاً من الاعتماد على مكتبات خارجية أو تحميل خطوط معقدة من القرص، تقوم المكتبة بتضمين خط <strong>Bitmap Font 8x16</strong> مباشرة داخل الكود المصدري كملف ثنائي (<code>font8x16.bin</code>). هذا يسمح للنواة والبرامج بكتابة النصوص على الشاشة بشكل فوري، آمن، وبدون استهلاك للذاكرة الديناميكية.</p>

</div>

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

### `src/text_ctx.rs`

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
