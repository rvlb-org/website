---
title: "🛡️ crypto"
description: "توثيق حاوية crypto في نظام Hisn-seL4 — Security"
---

# 🛡️ crypto


<div class="container-actions" style="margin: 20px 0;">
  <a href="/hisn/containers/crypto_vault/functions" style="display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); color: white !important; padding: 12px 24px; border-radius: 12px; font-weight: 800; text-decoration: none !important; box-shadow: 0 4px 15px rgba(168, 85, 247, 0.35); font-size: 1.05rem;">
    <span>⚡</span>
    <span>الوظائف التي تقوم بها الحاوية</span>
    <span>←</span>
  </a>
</div>


## نظرة عامة

<div class="overview-content">

<p>
  حاوية <code>Crypto_Vault</code> هي المزود المركزي لخدمات التشفير في بنية <strong>Hisn-seL4</strong>. تُقدم خدمات التشفير المتماثل والمصادق عليه (AEAD) وتقسيم الأسرار، وكل ذلك في بيئة <strong>Zero-Heap (بدون تخصيص ديناميكي)</strong> لضمان أمان كامل من هجمات الذاكرة.
</p>
<p>المكونات والوظائف الرئيسية:</p>
<ol>
  <li><strong>التشفير المتماثل (ChaCha20-Poly1305):</strong> تستخدم خوارزمية AEAD (وفق RFC 7539) لضمان سرية البيانات وتوثيق مصدرها (Integrity) في آن واحد. الخوارزمية مكتوبة بالكامل من الصفر لتناسب بيئة Bare-Metal.</li>
  <li><strong>دعم الذاكرة المشتركة (Shared Memory):</strong> لتقليل الـ Overhead الخاص بحدود رسائل الـ IPC، تُقدم الحاوية دوال <code>EncryptShared</code> و <code>DecryptShared</code> التي تعمل على كتلة ذاكرة مشتركة بحجم 4KB على العنوان <code>0x5F0000</code>.</li>
  <li><strong>تقسيم الأسرار (Shamir's Secret Sharing):</strong> تطبيق كامل لخوارزمية Shamir باستخدام رياضيات <strong>Galois Field GF(2^8)</strong>، مما يسمح بتقسيم سر إلى <code>N</code> حصص، بحيث يتطلب استعادته توفر <code>K</code> حصة (Threshold).</li>
</ol>


</div>

## الملفات البرمجية

### `src/crypto_handlers.rs`
> المسارات: crypto_handlers.rs | crypto_handlers_shared.rs | libs/vault-crypto/

### `libs/shamir`
> المسارات: shamir_handlers.rs | libs/shamir/


<div class="back-nav">

[← العودة إلى الحاويات](/hisn/containers/)

</div>
