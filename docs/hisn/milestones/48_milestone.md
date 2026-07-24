---
title: "🔐 دمج حزمة RustCrypto المُدققة وترقية مكتبة vault-crypto"
date: "21:04 GMT+3 - 2026-07-23"
icon: "🏰"
cat: "Cryptographic Architecture & Security"
---

**تاريخ الإنجاز:** 2026-07-23 — 21:04 GMT+3

**التصنيف:** Cryptographic Architecture & Security

تم تنفيذ مرحلة مفصلية في تعزيز الأمان وتطوير البنية التحتية لتشفير البيانات في **نظام حِصن (Hisn-seL4)**، حيث تم استبدال التنفيذ اليدوي المنفصل لخوارزميات التشفير ChaCha20 و Poly1305 في مكتبة `vault-crypto` بالحزم التشفيرية المعتمدة والمُدققة رسمياً من مجتمع **RustCrypto** (`chacha20poly1305`, `chacha20`, `poly1305`, `subtle`).

### التفاصيل الهندسية والإنجازات المنجزة:

1. **الترقية إلى حزم تشفير مُدققة (Audited Cryptographic Crates):**
   - دمج `chacha20poly1305` إصدار `0.10` مع تفعيل `default-features = false` لدعم العمل المتكامل داخل بيئة Bare-Metal (`no_std`) فوق نواة seL4 مع تفعيل ميزة `alloc`.
   - إضافة حزمة `chacha20` إصدار `0.9` وحزمة `poly1305` إصدار `0.8` لدعم النوى المنفردة والأغلفة المحلية (Wrappers).
   - اعتماد حزمة `subtle` إصدار `2.5` لتطبيق مقارنات الوسوم (Tags) بوقت ثابت (`Constant-Time Comparison`) لمنع هجمات التوقيت (Timing Attacks).

2. **إعادة هيكلة مكتبة `vault-crypto` بالكامل:**
   - **`libs/vault-crypto/Cargo.toml`**: إضافة وتنسيق كافة التبعيات التشفيرية الجديدة بدون الاعتماد على `std`.
   - **`libs/vault-crypto/src/lib.rs`**: تحديث واجهة التصدير، وإلغاء التصريح عن الوحدات التنفيذية اليدوية القديمة.
   - **`libs/vault-crypto/src/chacha20.rs`**: بناء غلاف برمجي (Wrapper) متوافق فوق `chacha20::ChaCha20` من RustCrypto، وتوفير الثوابت (`BLOCK_SIZE`, `KEY_SIZE`, `NONCE_SIZE`) والدوال (`new`, `process`, `block_fn`) مع ضبط العداد تلقائياً عبر `seek`.
   - **`libs/vault-crypto/src/poly1305.rs`**: بناء غلاف متوافق فوق `poly1305::Poly1305` وتأمين دالة `verify` التوقيتية المستقرة، ودعم دوال `new`, `update` (عبر `update_padded`), و `finalize`.
   - **`libs/vault-crypto/src/chacha20poly1305.rs`**: إعادة كتابة آليات التشفير وفك التشفير المصادق عليه (AEAD) باستخدام `encrypt_in_place_detached` و `decrypt_in_place_detached` للعمل في المكان (In-Place Detached) بدون استهلاك إضافي للذاكرة، ودعم التعامل الدقيق مع أخطاء المصادقة والحجم.

3. **حذف الشفرات القديمة وتنظيف الشجرة:**
   - حذف ملف `src/chacha20_impl.rs` (الذي كان يحتوي على التنفيذ اليدوي لـ Quarter Round والتحويلات).
   - حذف ملف `src/poly1305_impl.rs` (الذي كان يحتوي على التنفيذ اليدوي لحسابات الحقل GF(2^130 - 5)).

4. **التحقق والتثبت الصارم:**
   - نجاح كافة اختبارات الوحدة (`cargo test`) بنسبة 100% لتأكيد التحقق من التشفير، فك التشفير، واكتشاف التلاعب بالبيانات والمفاتيح الخاطئة.
   - التحقق من تجميع المكتبة واختبار التوافق التام مع أهداف Bare-Metal باستخدام `cargo check --target x86_64-unknown-none`.
   - الحفاظ الكامل على توافقية الواجهة (100% API Compatibility) مع كافة الحاويات ومكونات النظام التابعة مثل `crypto_vault`.

    الملفات المؤثرة:
    `libs/vault-crypto/Cargo.toml` | `libs/vault-crypto/src/lib.rs` | `libs/vault-crypto/src/chacha20.rs` | `libs/vault-crypto/src/poly1305.rs` | `libs/vault-crypto/src/chacha20poly1305.rs` | `libs/vault-crypto/src/chacha20_impl.rs` (محذوف) | `libs/vault-crypto/src/poly1305_impl.rs` (محذوف)
