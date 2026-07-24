---
title: "📁 fs"
description: "توثيق حاوية fs في نظام Hisn-seL4 — Service"
---

# 📁 fs


## نظرة عامة

<div class="overview-content">

<p>
  حاوية <code>FS_Vault</code> هي <strong>نظام الملفات الافتراضي الكامل (Virtual File System)</strong>. تجمع بين ثلاثة طبقات:
</p>
<ul>
  <li><strong>RamFS</strong>: نظام ملفات في الذاكرة لسرعة أقصاها</li>
  <li><strong>Disk_Writer</strong>: مزامنة تلقائية مع القرص الفعلي عبر IPC مع <code>Disk_Vault</code></li>
  <li><strong>Security Layer</strong>: كل أمر يخضع للتحقق من <code>PolicyBadge</code> قبل التنفيذ</li>
</ul>
<p>شجرة المجلدات التي تُنشئها عند الإقلاع:</p>
<pre style="background:#0d1117;color:#c9d1d9;padding:1rem;border-radius:8px;font-size:0.85rem;">
/
├── sys/        (version.txt, hostname.txt, shadow.dat)
├── lib/
├── home/
│   └── user/
│       ├── apps/       (Calculator, Files)
│       ├── Desktop/    (calc.vlk, files.vlk)
│       ├── Downloads/
│       ├── Documents/  (notes.txt)
│       ├── Pictures/   (logo.raw — 16KB ملف مُدمج)
│       ├── Videos/
│       └── Music/
├── proc/
├── etc/
├── tmp/
├── vault/
└── net/
</pre>
<p>
  نمط التهيئة عند الإقلاع: أولاً يحاول <code>load_from_disk()</code> — إذا نجح يُبقي البيانات المستمرة. إذا فشل (قرص فارغ) يكتب الملفات الافتراضية ثم <code>flush_to_disk()</code> لحفظها.
</p>


</div>

## الملفات البرمجية

### `src/main.rs`
> المسار: containers/fs/src/main.rs

### `src/ramfs.rs`
> المسار: containers/fs/src/ramfs.rs

### `src/disk_writer.rs`
> المسار: containers/fs/src/disk_writer.rs


<div class="back-nav">

[← العودة إلى الحاويات](/hisn/containers/)

</div>
