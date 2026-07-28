---
layout: page
title: المكتبات (Libraries)
---

<div class="libs-page-wrapper">
<div class="pr-hero">
  <div class="pr-hero-bg"></div>
  <div class="pr-hero-content">
    <div class="pr-badge">📚 Zero-Dependency Libraries</div>
    <h1 class="pr-title">مكتبات Hisn-seL4</h1>
    <p class="pr-subtitle">
      يحتوي نظام <code>Hisn-seL4</code> على ١٨ مكتبة جوهرية — ١٦ مبنية من الصفر بلغة Rust و٢ جديدة تعتمد على مكتبات موثقة — تعمل جميعها في بيئة Bare-Metal (بدون <code>std</code>)، توفر التشفير العسكري، اتصال الشبكات، الرسوميات، وإدارة الذاكرة.
    </p>
  </div>
</div>

<LibsList />
</div>

<style scoped>
.libs-page-wrapper {
  max-width: 1152px;
  margin: 0 auto;
  padding: 32px 24px;
}
/* ── Hero ── */
.pr-hero {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  padding: 44px 36px 36px;
  margin-bottom: 40px;
  border: 1px solid color-mix(in srgb, #0ea5e9 25%, transparent);
}
.pr-hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 80% 0%, color-mix(in srgb, #0ea5e9 12%, transparent) 0%, transparent 60%),
    radial-gradient(ellipse at 20% 100%, color-mix(in srgb, #3b82f6 10%, transparent) 0%, transparent 50%),
    linear-gradient(135deg, var(--vp-c-bg-soft), var(--vp-c-bg-elv));
  z-index: 0;
}
.pr-hero-content { position: relative; z-index: 1; }
.pr-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: color-mix(in srgb, #0ea5e9 12%, transparent);
  border: 1px solid color-mix(in srgb, #0ea5e9 30%, transparent);
  color: #38bdf8;
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
  background: linear-gradient(135deg, var(--vp-c-text-1) 30%, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}
.pr-subtitle {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  max-width: 600px;
  margin: 0;
  line-height: 1.65;
}
.pr-subtitle code {
  color: #38bdf8;
  background: color-mix(in srgb, #0ea5e9 15%, transparent);
  font-size: 0.85em;
  padding: 0.1em 0.4em;
  border-radius: 4px;
}
.lib-deprecated-banner {
  background: color-mix(in srgb, #ef4444 12%, transparent);
  border: 1px solid color-mix(in srgb, #ef4444 35%, transparent);
  color: #fca5a5;
  border-radius: 10px;
  padding: 10px 16px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  line-height: 1.6;
}
.lib-deprecated-banner a { color: #f87171; font-weight: 600; }
.lib-new-badge {
  background: color-mix(in srgb, #22c55e 12%, transparent);
  border: 1px solid color-mix(in srgb, #22c55e 35%, transparent);
  color: #86efac;
  border-radius: 10px;
  padding: 10px 16px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  line-height: 1.6;
}
</style>
