---
title: System Containers
description: حاويات النظام الأساسية في بيئة Hisn-seL4
layout: page
---

<script setup>
import ContainersList from '../../.vitepress/theme/ContainersList.vue'
</script>

<div class="containers-page-wrapper">
<div class="pr-hero">
  <div class="pr-hero-bg"></div>
  <div class="pr-hero-content">
    <div class="pr-badge">📦 Isolated Services</div>
    <h1 class="pr-title">حاويات النظام (Containers)</h1>
    <p class="pr-subtitle">
      تمثل الحاويات المكونات التنفيذية المستقلة في نظام <strong>Hisn-seL4</strong>. بدلاً من تصميم نواة متجانسة، يعمل النظام بمعمارية <strong>Microkernel</strong>، حيث تعمل كل خدمة أساسية في حاوية معزولة تماماً في مساحة المستخدم. أدناه نستعرض حاويات النظام مرتبة حسب تسلسل الإقلاع والأهمية:
    </p>
  </div>
</div>

<ContainersList />
</div>

<style scoped>
.containers-page-wrapper {
  max-width: 1152px;
  margin: 0 auto;
  padding: 32px 24px;
}
.pr-hero {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  padding: 44px 36px 36px;
  margin-bottom: 40px;
  border: 1px solid color-mix(in srgb, #6366f1 25%, transparent);
}
.pr-hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 80% 0%, color-mix(in srgb, #6366f1 12%, transparent) 0%, transparent 60%),
    radial-gradient(ellipse at 20% 100%, color-mix(in srgb, #8b5cf6 10%, transparent) 0%, transparent 50%),
    linear-gradient(135deg, var(--vp-c-bg-soft), var(--vp-c-bg-elv));
  z-index: 0;
}
.pr-hero-content { position: relative; z-index: 1; }
.pr-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: color-mix(in srgb, #6366f1 12%, transparent);
  border: 1px solid color-mix(in srgb, #6366f1 30%, transparent);
  color: #818cf8;
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 16px;
}
.pr-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  margin: 0 0 12px;
  background: linear-gradient(135deg, var(--vp-c-text-1) 30%, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}
.pr-subtitle {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  max-width: 800px;
  margin: 0;
  line-height: 1.65;
}
</style>
