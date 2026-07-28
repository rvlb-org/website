---
title: "⚡ talc-alloc"
description: "توثيق مكتبة talc-alloc في نظام Hisn-seL4 — Memory Management"
---

# ⚡ talc-alloc

<div class="lib-new-badge">
  ✨ مكتبة جديدة — أُضيفت في يوليو ٢٠٢٦ لتحل محل <strong>bump-alloc</strong>
</div>

## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>talc-alloc</code> هي <strong>قلب إدارة الذاكرة في حِصن</strong> — غلاف موحّد فوق <code>talc v4</code>، المخصص الديناميكي عالي الأداء المصمم خصيصاً لبيئات <code>no_std</code>. على عكس <code>bump-alloc</code> القديمة التي كانت تحجز ولا تحرر، يستطيع <code>talc</code> إدارة الذاكرة بشكل كامل — حجزاً وتحريراً — مما يتيح استخدام <code>alloc::Vec</code> و <code>alloc::String</code> بأمان حقيقي في كل حاويات النظام. كل حاوية تكتفي بكتابة <code>extern crate talc_alloc;</code> في أعلى <code>main.rs</code> لتحصل على Global Allocator جاهز.</p>

</div>

## التبعيات الخارجية

| المكتبة | الإصدار | الدور | المصدر |
|---------|---------|-------|--------|
| `talc` | `4` | مخصص ذاكرة no_std عالي الأداء | [crates.io](https://crates.io/crates/talc) |
| `spin` | `0.9` | قفل دوّار خفيف الوزن لـ no_std | [crates.io](https://crates.io/crates/spin) |

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

يُعرِّف `HEAP` بحجم ٢٥٦ كيلوبايت، ويُسجّل `#[global_allocator]` تلقائياً عند استيراد المكتبة — مما يعني أي حاوية تضيفها كـ dependency تحصل على allocator بدون أي إعداد إضافي.

## الحاويات التي تستخدمها

- `containers/crypto_vault` — عبر `extern crate talc_alloc`
- `containers/desktop` — عبر global_allocator مباشر
- `containers/net`, `auth`, `fs`, `init`, `input_vault` — عبر `talc` مباشرة أو `talc-alloc`

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
