---
layout: doc
title: watad-net — طبقة الشبكات
description: طبقة الشبكات في محرك وتد — تتواصل مع Net_Vault في حصن أو TCP مباشرة في بقية الأنظمة
---

<div style="padding-top: 1.5rem">

# 🌐 watad-net <span style="font-size:0.55em;font-weight:700;letter-spacing:0.15em;color:#38bdf8;opacity:0.7;font-family:monospace;vertical-align:middle">NETWORKING</span>

> طبقة جلب الموارد — تعمل في كل مكان، مُحسَّنة لـ Hisn-seL4

**وتد-نت** هي الطبقة المسؤولة عن جلب كل مورد يحتاجه المحرك (HTML، CSS، JS، الصور) من الخارج. لا تعرف شيئاً عن كيفية عرض هذه الموارد — دورها **الجلب فقط**.

## الفلسفة

تعتمد على نمط الـ **Backend Trait** — واجهة موحدة، تنفيذات متعددة:

| البيئة | التنفيذ | الوصف |
|---|---|---|
| Hisn-seL4 | `HisnBackend` | يتحدث مع `Net_Vault` عبر seL4 IPC |
| Linux / Windows / macOS | `StdBackend` | TCP مباشر عبر مكتبة Rust القياسية |

> ✅ **تم بناء النواة الأساسية** — جاهزة للتوسع والاستخدام

## العقد الأساسي (The Trait)

النواة لا تعتمد على نظام التشغيل أبداً (باستخدام `![no_std]`). كل ما تطلبه هو الالتزام بهذا العقد:

```rust
#![no_std]

extern crate alloc;
use alloc::string::String;
use alloc::vec::Vec;

pub struct NetResponse {
    pub status_code: u16,
    pub body: Vec<u8>,
}

pub enum NetError {
    ConnectionFailed,
    Timeout,
    InvalidUrl,
}

pub trait NetworkProvider {
    fn fetch(&self, url: &str) -> Result<NetResponse, NetError>;
}
```

</div>
