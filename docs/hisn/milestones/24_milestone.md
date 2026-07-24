---
title: "نظام إدارة البرامج الديناميكية (SVP Package System)"
date: "00:10 GMT+3 - 2026-07-04"
icon: "🚀"
cat: "Package System / Dynamic Loading / Program Registry"
---

**تاريخ الإنجاز:** 2026-07-04 — 00:10 GMT+3

**التصنيف:** Package System / Dynamic Loading / Program Registry

تم تصميم وتنفيذ **صيغة SVP (seL4 Vault Package)** كأول نظام حزم مخصص لنظام تشغيل مبني على microkernel من الصفر. كل برنامج الآن يُغلَّف في ملف `.svp` يحتوي على: **Header السحري (Magic "SVP1")**، واسم البرنامج (32 بايت)، وحجم الـ ELF، ولون الأيقونة. تم بناء مكتبة `libs/pkg-format` التي تُعرّف `SvpHeader` و `RegistryIter` لتكرار الحزم من ملف `manifest.bin`. وتم كتابة سكريبتات أتمتة (`build_programs.sh` و `pack_programs.py`) لتجميع كل برامج مجلد `programs/` وتغليفها آلياً في ملف `manifest.bin` واحد عند كل بناء. أصبح بالإمكان إضافة برنامج جديد فقط بوضعه في `programs/` وتظهر تلقائياً في قائمة ابدأ دون تعديل أي كود في النظام الأساسي.
