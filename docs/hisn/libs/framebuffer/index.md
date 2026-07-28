---
title: "🖥️ framebuffer"
description: "توثيق مكتبة framebuffer في نظام Hisn-seL4 — System Core"
---

<div class="lib-deprecated-banner">
  ⛔ تم حذف هذه المكتبة — استُبدلت بـ <a href="/hisn/libs/eg-fb/"><strong>eg-fb</strong></a> + <strong>embedded-graphics v0.8</strong> في يوليو ٢٠٢٦
</div>

# 🖥️ framebuffer


## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>framebuffer</code> هي <strong>محرك الرسم الأساسي (Graphics Engine)</strong> في Hisn-seL4. تُوفر تجريداً مباشراً وسريعاً للرسم على الشاشة عبر الكتابة المباشرة في الذاكرة (MMIO) باستخدام <code>write_volatile</code>. خالية من أي تبعيات (<code>no_std</code>)، وتدعم الألوان (ARGB)، مزج الألوان (Alpha Blending)، ورسم الأشكال الهندسية الأساسية (مستطيلات، خطوط، دوائر) بكفاءة عالية لتلبية متطلبات بيئة سطح المكتب.</p>

</div>

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

### `src/color.rs`

### `src/fb.rs`

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
