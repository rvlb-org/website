---
title: "💽 disk"
description: "توثيق حاوية disk في نظام Hisn-seL4 — Driver"
---

# 💽 disk


## نظرة عامة

<div class="overview-content">

<p>
  حاوية <code>Disk_Vault</code> هي مشغل التخزين منخفض المستوى (Block Storage Driver) في النظام. 
  وظيفتها الوحيدة هي التعامل المباشر مع عتاد القرص الصلب (Hard Disk) وتوفير واجهة قراءة/كتابة قطاعات (Sectors) لباقي الحاويات (تحديداً <code>FS_Vault</code>).
</p>
<p>مبدأ العمل المعماري:</p>
<ol>
  <li><strong>مشغل ATA PIO:</strong> تستخدم بروتوكول <em>ATA Programmed Input/Output (PIO)</em> مع عنونة <em>LBA28</em> للتعامل مع القرص. هذا بروتوكول مدعوم عالمياً ويعمل بكفاءة عالية للنظم المدمجة.</li>
  <li><strong>الوصول للعتاد:</strong> تمتلك تفويضاً من <code>init</code> للوصول المباشر إلى منافذ الإدخال/الإخراج للقرص (<code>0x1F0</code> - <code>0x3F6</code>).</li>
  <li><strong>الذاكرة المشتركة (Zero-Copy):</strong> لنقل البيانات بفاعلية، لا تمرر القطاعات (512 بايت) عبر رسائل IPC، بل تستخدم صفحة ذاكرة مشتركة (Shared Memory) في العنوان <code>0x600000</code>. هذا نفس العنوان الذي تستخدمه <code>FS_Vault</code>، مما يحقق مبدأ الـ Zero-Copy.</li>
  <li><strong>عزل تام:</strong> لا تفهم هذه الحاوية مفهوم "الملفات" أو "المجلدات"، بل تفهم فقط "اقرأ القطاع رقم X" أو "اكتب القطاع رقم Y". نظام الملفات بالكامل يُدار بواسطة <code>FS_Vault</code>.</li>
</ol>


</div>

## الملفات البرمجية

### `init/src/disk_setup.rs`
> المسار: containers/init/src/disk_setup.rs

### `src/main.rs`
> المسار: containers/disk/src/main.rs


<div class="back-nav">

[← العودة إلى الحاويات](/hisn/containers/)

</div>
