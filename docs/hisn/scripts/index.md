---
layout: doc
title: السكربتات — Scripts
---

<div class="sc-hero">
  <div class="sc-hero-bg"></div>
  <div class="sc-hero-content">
    <div class="sc-badge">📜 Automation Scripts</div>
    <h1 class="sc-title">سكربتات المشروع</h1>
    <p class="sc-subtitle">
      مجموعة من السكربتات المتخصصة التي تُحكم دورة حياة المشروع بالكامل — من التهيئة حتى الإقلاع
    </p>
  </div>
</div>

<div class="sc-pipeline-label">🔁 Pipeline التنفيذ</div>

<div class="sc-pipeline">

  <div class="sc-step" data-order="01">
    <div class="sc-step-header">
      <span class="sc-step-icon">⚙️</span>
      <div>
        <div class="sc-step-name">setup.sh</div>
        <div class="sc-step-tag">Environment Setup</div>
      </div>
      <span class="sc-step-num">01</span>
    </div>
    <p class="sc-step-desc">
      يُهيّئ بيئة التطوير من الصفر — يثبّت المتطلبات الأساسية (Dependencies) ويجهّز مجلدات المشروع للعمل لأول مرة.
    </p>
    <div class="sc-step-cmd"><span class="sc-prompt">$</span> bash scripts/setup.sh</div>
  </div>

  <div class="sc-connector">
    <div class="sc-connector-line"></div>
    <span class="sc-connector-arrow">↓</span>
  </div>

  <div class="sc-step" data-order="02">
    <div class="sc-step-header">
      <span class="sc-step-icon">⬇️</span>
      <div>
        <div class="sc-step-name">fetch.sh</div>
        <div class="sc-step-tag">Source Fetching</div>
      </div>
      <span class="sc-step-num">02</span>
    </div>
    <p class="sc-step-desc">
      يُنزّل الشيفرة المصدرية لنواة <strong>seL4</strong> والأدوات المساعدة من المستودعات الرسمية، ويجهّزها لعملية البناء.
    </p>
    <div class="sc-step-cmd"><span class="sc-prompt">$</span> bash scripts/fetch.sh</div>
  </div>

  <div class="sc-connector">
    <div class="sc-connector-line"></div>
    <span class="sc-connector-arrow">↓</span>
  </div>

  <div class="sc-step" data-order="03">
    <div class="sc-step-header">
      <span class="sc-step-icon">🏗️</span>
      <div>
        <div class="sc-step-name">compile.sh</div>
        <div class="sc-step-tag">Rust Compilation</div>
      </div>
      <span class="sc-step-num">03</span>
    </div>
    <p class="sc-step-desc">
      يُجمّع أكواد <strong>Rust</strong> الخاصة بالحاويات (مثل <code>init</code>) ويُحوّلها إلى ملفات تنفيذية خام <em>Bare-Metal</em> متوافقة مع بيئة <code>no_std</code>.
    </p>
    <div class="sc-step-cmd"><span class="sc-prompt">$</span> bash containers/init/compile.sh</div>
  </div>

  <div class="sc-connector">
    <div class="sc-connector-line"></div>
    <span class="sc-connector-arrow">↓</span>
  </div>

  <div class="sc-step" data-order="04">
    <div class="sc-step-header">
      <span class="sc-step-icon">🔨</span>
      <div>
        <div class="sc-step-name">build.sh</div>
        <div class="sc-step-tag">Kernel Build</div>
      </div>
      <span class="sc-step-num">04</span>
    </div>
    <p class="sc-step-desc">
      يبني نواة <strong>seL4</strong> باستخدام <code>CMake</code> و <code>Ninja</code>، ويُجمّع مكتبة <code>libsel4</code> التي تستخدمها الحاويات للتحدث مع النواة.
    </p>
    <div class="sc-step-cmd"><span class="sc-prompt">$</span> bash scripts/build.sh</div>
  </div>

  <div class="sc-connector">
    <div class="sc-connector-line"></div>
    <span class="sc-connector-arrow">↓</span>
  </div>

  <div class="sc-step sc-step--highlight" data-order="05">
    <div class="sc-step-header">
      <span class="sc-step-icon">🚀</span>
      <div>
        <div class="sc-step-name">boot.sh</div>
        <div class="sc-step-tag sc-step-tag--launch">Launch 🟢</div>
      </div>
      <span class="sc-step-num">05</span>
    </div>
    <p class="sc-step-desc">
      <strong>المشغّل الأساسي:</strong> يربط النواة مع حاوية <code>init</code> في ملف <em>ISO</em> قابل للإقلاع، ثم يُشغّله فوراً داخل بيئة <strong>QEMU</strong> الافتراضية.
    </p>
    <div class="sc-step-cmd"><span class="sc-prompt">$</span> bash scripts/boot.sh</div>
  </div>

</div>

<style scoped>
/* ── Hero ── */
.sc-hero {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  padding: 44px 36px 36px;
  margin-bottom: 36px;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 22%, transparent);
}
.sc-hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 90% 10%, color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent) 0%, transparent 55%),
    radial-gradient(ellipse at 10% 90%, color-mix(in srgb, #f97316 8%, transparent) 0%, transparent 50%),
    linear-gradient(135deg, var(--vp-c-bg-soft), var(--vp-c-bg-elv));
  z-index: 0;
}
.sc-hero-content { position: relative; z-index: 1; }
.sc-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: color-mix(in srgb, #f97316 10%, transparent);
  border: 1px solid color-mix(in srgb, #f97316 28%, transparent);
  color: #fb923c;
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 16px;
}
.sc-title {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 800;
  margin: 0 0 12px;
  background: linear-gradient(135deg, var(--vp-c-text-1) 40%, #fb923c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}
.sc-subtitle {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  max-width: 520px;
  margin: 0;
  line-height: 1.65;
}

/* ── Pipeline ── */
.sc-pipeline-label, .sc-extra-label {
  font-size: 0.72rem;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin-bottom: 14px;
}
.sc-extra-label { margin-top: 36px; }

.sc-pipeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 680px;
}

.sc-step {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 18px 20px;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  position: relative;
  overflow: hidden;
}
.sc-step::before {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--vp-c-brand-1), transparent);
  opacity: 0;
  transition: opacity 0.25s;
}
.sc-step:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 30%, transparent);
  box-shadow: 0 4px 20px color-mix(in srgb, var(--vp-c-brand-1) 7%, transparent);
  transform: translateX(-3px);
}
.sc-step:hover::before { opacity: 1; }

.sc-step--highlight {
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--vp-c-brand-1) 8%, var(--vp-c-bg-soft)),
    var(--vp-c-bg-soft)
  );
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 25%, transparent);
}
.sc-step--highlight::before { opacity: 0.6 !important; }

.sc-step-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.sc-step-icon {
  font-size: 1.3rem;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent);
  border-radius: 9px;
  flex-shrink: 0;
  transition: transform 0.2s, box-shadow 0.2s;
}
.sc-step:hover .sc-step-icon {
  transform: scale(1.1);
  box-shadow: 0 0 12px color-mix(in srgb, var(--vp-c-brand-1) 20%, transparent);
}
.sc-step-name {
  font-family: 'Space Mono', monospace;
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.sc-step-tag {
  font-size: 0.68rem;
  font-family: 'Space Mono', monospace;
  color: var(--vp-c-text-3);
  letter-spacing: 0.06em;
  margin-top: 1px;
}
.sc-step-tag--launch {
  color: #4ade80;
  font-weight: 700;
}
.sc-step-num {
  margin-right: auto;
  font-family: 'Space Mono', monospace;
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  opacity: 0.15;
  transition: opacity 0.2s;
  line-height: 1;
}
.sc-step:hover .sc-step-num { opacity: 0.4; }

.sc-step-desc {
  font-size: 0.87rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0 0 12px;
}
.sc-step-desc strong { color: var(--vp-c-text-1); }
.sc-step-desc em { color: var(--vp-c-text-2); font-style: normal; }

.sc-step-cmd {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  background: color-mix(in srgb, var(--vp-c-bg) 60%, transparent);
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  padding: 7px 12px;
  direction: ltr;
  text-align: left;
}
.sc-prompt {
  color: #4ade80;
  margin-left: 6px;
  font-weight: 700;
}

/* ── Connector ── */
.sc-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3px 0;
  gap: 0;
}
.sc-connector-line {
  width: 1px;
  height: 10px;
  background: linear-gradient(180deg, var(--vp-c-brand-1), transparent);
  opacity: 0.25;
}
.sc-connector-arrow {
  color: var(--vp-c-brand-1);
  opacity: 0.3;
  font-size: 0.85rem;
  line-height: 1;
}

/* ── Extra Card ── */
.sc-extra { max-width: 680px; }
.sc-extra-card {
  display: flex;
  gap: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  transition: border-color 0.2s, transform 0.2s;
}
.sc-extra-card:hover {
  border-color: color-mix(in srgb, #f97316 30%, transparent);
  transform: translateX(-3px);
}
.sc-extra-icon {
  font-size: 1.4rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, #f97316 8%, transparent);
  border: 1px solid color-mix(in srgb, #f97316 20%, transparent);
  border-radius: 10px;
  flex-shrink: 0;
}
.sc-extra-name {
  font-family: 'Space Mono', monospace;
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}
.sc-extra-card p {
  margin: 0;
  font-size: 0.86rem;
  color: var(--vp-c-text-2);
  line-height: 1.65;
}

code {
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent);
  padding: 0.1em 0.4em;
  border-radius: 4px;
  font-size: 0.85em;
}
</style>
