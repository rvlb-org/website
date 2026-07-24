---
title: "⌨️ ps2-driver"
description: "توثيق مكتبة ps2-driver في نظام Hisn-seL4 — System Core"
---

# ⌨️ ps2-driver


## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>ps2-driver</code> تُوفر <strong>محرك الإدخال الأساسي للوحة المفاتيح والماوس</strong> في بيئة x86_64. تتعامل مباشرة مع وحدة التحكم PS/2 عبر منافذ الإدخال/الإخراج (I/O Ports: 0x60 للبيانات و 0x64 للحالة والأوامر) باستخدام استدعاءات <code>seL4_Call</code>. تقوم بترجمة رموز المسح (Scan Codes) إلى أحرف ASCII، وتفسير حزم بيانات الماوس (Mouse Packets) لتحديث إحداثيات المؤشر وحالة الأزرار.</p>

</div>

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

### `src/keyboard.rs`

### `src/mouse.rs`

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
