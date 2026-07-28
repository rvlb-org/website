---
title: "🖥️ eg-fb"
description: "توثيق مكتبة eg-fb في نظام Hisn-seL4 — Graphics Adapter"
---

# 🖥️ eg-fb

<div class="lib-new-badge">
  ✨ مكتبة جديدة — أُضيفت في يوليو ٢٠٢٦ لتحل محل <strong>framebuffer</strong> و <strong>font-render</strong>
</div>

## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>eg-fb</code> هي <strong>الجسر بين seL4 والعالم</strong> — تربط الـ raw framebuffer الخام الذي تمنحه نواة seL4 لحاوية <code>desktop</code> بنظام الرسوميات القياسي <strong>embedded-graphics</strong>. بدونها، لا يمكن للبرامج رسم أي شيء على الشاشة. تُنفّذ هذه المكتبة واجهة <code>DrawTarget</code> trait فوق شريحة الذاكرة المرئية مباشرةً، مما يجعل كل برامج النظام قادرةً على استخدام آلاف البدائيات الرسومية من <code>embedded-graphics</code> بدون أي تعديل.</p>

</div>

## التبعيات الخارجية

| المكتبة | الإصدار | الدور | المصدر |
|---------|---------|-------|--------|
| `embedded-graphics` | `0.8` | نظام الرسوميات القياسي لـ no_std | [crates.io](https://crates.io/crates/embedded-graphics) |
| `profont` | `0.7` | مجموعة خطوط Bitmap أحادية العرض | [crates.io](https://crates.io/crates/profont) |

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

تنفيذ `DrawTarget` trait من `embedded-graphics` فوق الـ framebuffer الخام — يحوّل كل عملية رسم إلى كتابة مباشرة في ذاكرة الشاشة بـ `write_volatile` الآمنة.

## البرامج التي تستخدمها

- `programs/calc` — آلة حاسبة النظام
- `programs/editor` — محرر النصوص
- `programs/files` — مدير الملفات
- `programs/viewer` — عارض الصور
- `containers/desktop` — واجهة سطح المكتب الرئيسية

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
