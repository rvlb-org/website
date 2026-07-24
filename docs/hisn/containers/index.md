---
title: System Containers
description: حاويات النظام الأساسية في بيئة Hisn-seL4
layout: doc
---

<script setup>
import ContainersList from '../../.vitepress/theme/ContainersList.vue'
</script>

# 📦 حاويات النظام (System Containers)

تمثل الحاويات (Containers) المكونات التنفيذية المستقلة في نظام **Hisn-seL4**. بدلاً من تصميم نواة متجانسة (Monolithic)، يعمل النظام بمعمارية **Microkernel**، حيث تعمل كل خدمة أساسية (مثل التخزين، الشبكة، شاشة العرض) في حاوية معزولة تماماً في مساحة المستخدم (User-space). هذه الحاويات لا يمكنها التحدث مع بعضها إلا عبر نظام تبادل الرسائل (IPC) المراقب بشدة. 

أدناه نستعرض حاويات النظام مرتبة حسب تسلسل الإقلاع والأهمية:

<ContainersList />
