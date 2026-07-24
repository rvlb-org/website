---
title: "🔐 vault-crypto"
description: "توثيق مكتبة vault-crypto في نظام Hisn-seL4 — Security & Net"
---

# 🔐 vault-crypto


## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>vault-crypto</code> هي <strong>درع التشفير العسكري</strong> لنظام Hisn-seL4. كُتبت من الصفر بالكامل بدون أي تبعيات خارجية، وتنفذ مواصفات <strong>RFC 7539</strong> بدقة كاملة. تجمع بين خوارزميتين قياسيتين (ChaCha20 + Poly1305) في نمط تشفير مصادق عليه <strong>AEAD</strong> يضمن السرية والسلامة في آنٍ واحد. مُصممة خصيصاً لتشفير ملفات حاوية <code>crypto_vault</code> وتوزيع الأسرار بين حاويات النظام.</p>

</div>

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

### `src/chacha20.rs`

### `src/chacha20_impl.rs`

### `src/poly1305.rs`

### `src/poly1305_impl.rs`

### `src/chacha20poly1305.rs`

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
