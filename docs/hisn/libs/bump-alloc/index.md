---
title: "📦 bump-alloc"
description: "توثيق مكتبة bump-alloc في نظام Hisn-seL4 — System Core"
---

# 📦 bump-alloc


## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>bump-alloc</code> هي <strong>ثاني مكتبة في تاريخ بناء Hisn-seL4</strong> وتمثل أبسط وأسرع نموذج لإدارة الذاكرة (Memory Allocator) في بيئة Bare-Metal. تعمل بمبدأ «الدفع للأمام» فقط — إذ يُحرَّك مؤشر واحد للأمام مع كل حجز جديد بكفاءة <strong>O(1)</strong> مطلقة. مصممة خصيصاً للمرحلة الأولى من إقلاع حاوية <code>init</code> قبل أن يتوفر نظام ذاكرة أكثر تعقيداً.</p>

</div>

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
