---
title: "📦 pkg-format"
description: "توثيق مكتبة pkg-format في نظام Hisn-seL4 — System Core"
---

# 📦 pkg-format


## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>pkg-format</code> تُعرّف <strong>صيغة الحزم الخاصة بنظام seL4-Vault (SVP - seL4 Vault Package)</strong>. هذه الصيغة تسمح بتغليف البرامج التنفيذية (ELF) مع بياناتها الوصفية (الاسم، الإصدار، الأيقونة، الصلاحيات) في ملف واحد (SVP). يُستخدم هذا التنسيق في <code>PROGRAM_REGISTRY</code> لتخزين تطبيقات النظام بشكل مضغوط وآمن داخل مساحة النواة، مما يسمح لـ <code>init</code> بقراءتها وإطلاقها كحاويات دون الحاجة لملفات منفصلة على القرص.</p>

</div>

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
