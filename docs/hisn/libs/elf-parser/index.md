---
title: "📦 elf-parser"
description: "توثيق مكتبة elf-parser في نظام Hisn-seL4 — System Core"
---

<div class="lib-deprecated-banner">
  ⛔ تم حذف هذه المكتبة — استُبدلت بـ <strong>xmas-elf v0.9</strong> في يوليو ٢٠٢٦
</div>

# 📦 elf-parser


## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>elf-parser</code> هي <strong>المكتبة الثالثة زمنياً</strong> وتمثل الحلقة الحيوية في عملية تحميل البرامج. كُتبت يدوياً من الصفر وتعمل بمبدأ <strong>Zero-Copy</strong> — أي أنها تُحلل الملف مباشرة في موقعه بالذاكرة دون نسخه. تتيح لحاوية <code>init</code> قراءة ملفات ELF64 التنفيذية المخزنة في الصورة الجذرية (Root Image) وتحميل مقاطعها في مساحة الذاكرة الافتراضية الصحيحة لإطلاق حاويات التطبيقات بشكل معزول.</p>

</div>

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
