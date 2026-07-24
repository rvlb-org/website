---
title: "⚡ الوظائف التي تقوم بها حاوية crypto_vault"
description: "الدليل الشامل للوظائف والمسؤوليات التي تنفذها حاوية crypto_vault في نظام Hisn-seL4"
---

# 🔑 الوظائف التي تقوم بها حاوية crypto_vault


حاوية `crypto_vault` هي الخادم المركزي للعمليات التشفيرية في نظام Hisn-seL4. تقوم بالحفاظ على المفاتيح السرية وتأمين معالجة تشفير/فك تشفير البيانات وحفظ الأسرار عبر تقنية Shamir's Secret Sharing.

---

## 1. الوظائف الرئيسية

### 1.1 التشفير وفك التشفير المصادق عليه (AEAD Encryption)
- تنفيذ خوارزمية **ChaCha20-Poly1305** من مكتبة `vault-crypto` المعتمدة على حزم RustCrypto.
- التشفير وفك التشفير في المكان (In-Place) لبيانات الحاويات عبر الذاكرة المشتركة (Shared Memory).
- التحقق التوقيتي المباشر لمنع هجمات التلاعب (Tampering) وهجمات التوقيت (Timing Attacks).

### 1.2 تقسيم وإعادة تجميع الأسرار (Shamir's Secret Sharing)
- تنفيذ خوارزمية تقسيم الأسرار عبر حقل GF(256) الحسابي في مكتبة `shamir`.
- توزيع أسهم المفاتيح (Key Shares) على الحاويات المعزولة بحيث لا يمكن استرجاع مفتاح التشفير إلا باجتماع النصاب المطلوب (Threshold).

### 1.3 إدارة وتمرير الرسائل عبر الذاكرة المشتركة (Shared Memory Handlers)
- معالجة طلبات `handle_encrypt_shared` و `handle_decrypt_shared` لنقل وتشفير الأحجام الكبيرة من البيانات بسرعة عالية وصفر نسخ للذاكرة.

---

<div class="back-nav" style="margin-top: 30px;">

[← العودة إلى توثيق حاوية crypto_vault](/hisn/containers/crypto_vault/) &nbsp;|&nbsp; [← العودة إلى قائمة الحاويات](/hisn/containers/)

</div>
