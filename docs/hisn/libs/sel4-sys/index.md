---
title: "⚙️ sel4-sys"
description: "توثيق مكتبة sel4-sys في نظام Hisn-seL4 — System Core"
---

# ⚙️ sel4-sys


## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>sel4-sys</code> هي <strong>اللبنة الأساسية الأولى</strong> في نظام Hisn-seL4 بالكامل (المكتبة رقم 1 زمنياً والمؤسسة للنظام). تم تصميمها وكتابتها يدوياً <strong>من الصفر 100%</strong> بدون الاستعانة بأي أدوات توليد تلقائي (مثل <code>bindgen</code>).<br>الهدف من هذه المكتبة هو توفير تحكم أمني مطلق وفهم عميق جداً لكل استدعاء نظام (Syscall) ونداء (Invocation) يتم تمريره من بيئة <code>Rust</code> الآمنة إلى نواة <code>seL4</code> المكتوبة بـ C، عبر التخاطب المباشر مع سجلات المعالج (Registers) باستخدام الـ Assembly المضمن.</p>

</div>

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

### `src/invocations.rs`

### `src/types/types_01.rs`

### `src/types/types_02.rs`

### `src/invocations/invocations_03.rs`

### `src/syscalls.rs`

### `src/syscalls/syscalls_01.rs`

### `src/syscalls/syscalls_02.rs`

### `src/invocations/invocations_01.rs`

### `src/invocations/invocations_02.rs`

### `src/types.rs`

### `src/invocations/invocations_04.rs`

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
