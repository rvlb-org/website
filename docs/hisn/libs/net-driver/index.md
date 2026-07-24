---
title: "🔐 net-driver"
description: "توثيق مكتبة net-driver في نظام Hisn-seL4 — Security & Net"
---

# 🔐 net-driver


## نظرة عامة

<div class="overview-content">

<p>مكتبة <code>net-driver</code> هي <strong>طبقة التجريد لبطاقة الشبكة الافتراضية</strong> في بيئة QEMU. تُغلّف التفاعل مع بروتوكول <strong>VirtIO-Net</strong> عبر ناقل <strong>PCI</strong>، وهي المكتبة التي تُمكّن حاوية <code>tor-vault</code> من الوصول إلى الشبكة الخارجية بشكل معزول وآمن تحت إشراف نواة seL4.</p>

</div>

## الملفات البرمجية

### `Cargo.toml`

### `src/lib.rs`

### `src/pci.rs`

### `src/virtio.rs`

<div class="back-nav">

[← العودة إلى المكتبات](/hisn/libs/)

</div>
