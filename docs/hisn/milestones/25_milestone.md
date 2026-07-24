---
title: "مجلد البرامج القابلة للتثبيت (programs/)"
date: "00:20 GMT+3 - 2026-07-04"
icon: "📦"
cat: "Architecture / Developer Experience / Build System"
---

**تاريخ الإنجاز:** 2026-07-04 — 00:20 GMT+3

**التصنيف:** Architecture / Developer Experience / Build System

تم إنشاء بنية مجلد `programs/` في جذر المشروع كـ **بيئة تطوير مستقلة** لكتابة التطبيقات الخاصة بـ seL4-Vault. أول برنامج تجريبي **"hello"** تم تطويره كـ `no_std` app يعمل في مساحة ذاكرة معزولة. كل برنامج يحتوي على: `Cargo.toml` و `src/main.rs` وملف `build.sh` خاص به. تم دمج هذه البرامج مع حاوية `init` عبر `program_manager.rs` الذي يقرأ الـ manifest ويُخصص لكل برنامج: **TCB** خاص و **CNode** و **VSpace** معزولة، محافظاً على مبدأ العزل الصارم لنواة seL4. هذا يعني إمكانية نشر تطبيقات جديدة بمجرد وضعها في المجلد وإعادة البناء دون تعديل النظام الأساسي.
