---
title: "🌐 net"
description: "توثيق حاوية net في نظام Hisn-seL4 — Network Gateway"
---

# 🌐 net

<div class="lib-new-badge">
  ✨ مُعاد هيكلتها — استُبدلت حاوية <strong>tor</strong> القديمة بحاوية <strong>net</strong> الشاملة في يوليو ٢٠٢٦
</div>

## نظرة عامة

<div class="overview-content">

<p>
  حاوية <code>Net_Vault</code> هي <strong>بوابة الشبكة الشاملة</strong> في النظام.
  صُممت لعزل مكدس الشبكة بالكامل عن باقي النظام. بينما كانت حاوية <code>tor</code> القديمة تقتصر على الاتصال عبر شبكة Tor، أصبحت <code>net</code> تدير مكدس الشبكة العام <code>smoltcp</code>، مع جعل اتصال Tor <strong>خياراً برمجياً</strong> يتم توجيهه من الداخل بدلاً من أن يكون هوية الحاوية بأكملها.
</p>
<p>مبدأ العمل المعماري:</p>
<ol>
  <li><strong>مكدس شبكي مُستقل:</strong> تعتمد على <code>smoltcp</code> وتستخدم مخصص الذاكرة <code>talc-alloc</code> لإدارة الحزم بمرونة عالية، بدلاً من المصفوفات الثابتة.</li>
  <li><strong>اتصال اختياري بـ Tor:</strong> يمكنها توجيه تدفقات TCP عبر دوائر <code>Circuit</code> متعددة القفزات عند الطلب عبر مكتبات <code>tor-circuit</code> و <code>tor-stream</code>.</li>
  <li><strong>العزل التام:</strong> هي الحاوية الوحيدة التي لها حق الوصول لمشغلات بطاقة الشبكة، ولا تستقبل إلا طلبات IPC موثقة من باقي الحاويات (مثل <code>fs</code> أو <code>desktop</code>).</li>
</ol>
</div>

## الملفات البرمجية

### `src/main.rs`
> المسار: containers/net/src/main.rs

### `src/network.rs`
> المسار: containers/net/src/network.rs

<div class="back-nav">

[← العودة إلى الحاويات](/hisn/containers/)

</div>
