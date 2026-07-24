---
title: "⚙️ ipc-sync"
description: "توثيق مكتبة ipc-sync في نظام Hisn-seL4 — System Core"
---

# ⚙️ ipc-sync


## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>ipc-sync</code> هي <strong>عمود التواصل الفقري</strong> للنظام بالكامل. تُغلّف استدعاءات <code>seL4 IPC</code> الخام في واجهات Rust نظيفة وآمنة وسهلة الاستخدام. بدونها، يضطر كل تطبيق لكتابة كود الـ Assembly مباشرةً لكل رسالة. تُقدم نموذجَي تواصل: <strong>Channel</strong> ثنائي الاتجاه، و<strong>Sender/Receiver</strong> أحاديَي الاتجاه مع حلقة خدمة لانهائية جاهزة (<code>serve()</code>).</p>

</div>

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

### `src/channel.rs`

### `src/channel/channel_01.rs`

### `src/channel/channel_02.rs`

### `src/channel/channel_03.rs`

### `src/channel/channel_recv.rs`

### `src/message.rs`

### `src/message/message_01.rs`

### `src/message/message_02.rs`

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
