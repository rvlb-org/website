---
layout: doc
title: مجلد النواة — Kernel
---

<div class="kernel-hero">
  <div class="kernel-hero-bg"></div>
  <div class="kernel-hero-content">
    <div class="kernel-badge">⚙️ seL4 Microkernel</div>
    <h1 class="kernel-title">مجلد النواة</h1>
    <p class="kernel-subtitle">
      أول نواة في العالم يُثبَت رياضياً خلوّها من الأخطاء البرمجية
    </p>
  </div>
</div>

<div class="kernel-alert">
  <span class="kernel-alert-icon">🔒</span>
  <div>
    <strong>نواة مُثبَتة رسمياً</strong> — seL4 هي النواة الوحيدة في العالم التي تم إثبات صحتها رياضياً (<em>Formally Verified</em>). بمعنى أن كل سطر فيها مضمون لا يحتوي على أخطاء أمنية.
  </div>
</div>

## دور النواة في النظام

<div class="kernel-cards">

  <div class="kernel-card">
    <div class="kernel-card-icon">🧱</div>
    <div class="kernel-card-body">
      <h3>عزل الحاويات</h3>
      <p>
        تضمن النواة أن لا توجد أي حاوية يمكنها الوصول إلى ذاكرة حاوية أخرى إلا بتصريح صريح عبر نظام <strong>Capabilities</strong>. هذا العزل مُطبَّق على مستوى العتاد نفسه.
      </p>
    </div>
  </div>

  <div class="kernel-card">
    <div class="kernel-card-icon">📬</div>
    <div class="kernel-card-body">
      <h3>التواصل الآمن — IPC</h3>
      <p>
        توفر قنوات اتصال سريعة وآمنة (<strong>Endpoints</strong>) لتبادل الرسائل بين الحاويات دون أي مشاركة مباشرة في الذاكرة.
      </p>
    </div>
  </div>

  <div class="kernel-card">
    <div class="kernel-card-icon">🖥️</div>
    <div class="kernel-card-body">
      <h3>إدارة العتاد</h3>
      <p>
        تتولى النواة التحكم الحصري بالمقاطعات (<strong>Interrupts</strong>) وتقسيم الموارد، وتمنع أي وصول مباشر للعتاد — كما تعلّمنا من خطأ <code>General Protection Fault (0xd)</code>.
      </p>
    </div>
  </div>

</div>

## كيف نتعامل مع النواة؟

<div class="kernel-flow">
  <div class="kernel-flow-step">
    <div class="kernel-flow-num">01</div>
    <div class="kernel-flow-text">
      <strong>لا نعدّل النواة أبداً</strong>
      <p>نحن لا نلمس كود seL4 الداخلي. النواة هي صندوق أسود موثوق.</p>
    </div>
  </div>
  <div class="kernel-flow-arrow">↓</div>
  <div class="kernel-flow-step">
    <div class="kernel-flow-num">02</div>
    <div class="kernel-flow-text">
      <strong>نبني ونكوّن فقط</strong>
      <p>نستخدم <code>CMake</code> عبر سكربتات مجلد <code>scripts/</code> لبناء النواة وضبط إعداداتها.</p>
    </div>
  </div>
  <div class="kernel-flow-arrow">↓</div>
  <div class="kernel-flow-step">
    <div class="kernel-flow-num">03</div>
    <div class="kernel-flow-text">
      <strong>النواة تعمل في الخلفية</strong>
      <p>بعد الإقلاع، تترك النواة إدارة كل شيء لحاوية <strong>init</strong> التي نكتبها نحن بلغة Rust.</p>
    </div>
  </div>
</div>

<style scoped>
/* ── Hero ── */
.kernel-hero {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  padding: 48px 36px 40px;
  margin-bottom: 32px;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 25%, transparent);
}
.kernel-hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 80% 0%, color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent) 0%, transparent 60%),
    radial-gradient(ellipse at 20% 100%, color-mix(in srgb, var(--vp-c-brand-2) 8%, transparent) 0%, transparent 50%),
    linear-gradient(135deg, var(--vp-c-bg-soft), var(--vp-c-bg-elv));
  z-index: 0;
}
.kernel-hero-content { position: relative; z-index: 1; }
.kernel-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 30%, transparent);
  color: var(--vp-c-brand-1);
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 16px;
}
.kernel-title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  margin: 0 0 12px;
  background: linear-gradient(135deg, var(--vp-c-text-1) 30%, var(--vp-c-brand-1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}
.kernel-subtitle {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  max-width: 500px;
  margin: 0;
  line-height: 1.6;
}

/* ── Alert ── */
.kernel-alert {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 6%, transparent);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 20%, transparent);
  border-right: 3px solid var(--vp-c-brand-1);
  border-radius: 10px;
  padding: 14px 18px;
  margin-bottom: 36px;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.kernel-alert-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 1px; }
.kernel-alert strong { color: var(--vp-c-brand-1); }

/* ── Role Cards ── */
.kernel-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
  margin: 24px 0 40px;
}
.kernel-card {
  display: flex;
  gap: 14px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 18px;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}
.kernel-card:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent);
  box-shadow: 0 4px 24px color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent);
  transform: translateY(-2px);
}
.kernel-card-icon {
  font-size: 1.6rem;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent);
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 15%, transparent);
}
.kernel-card-body h3 {
  margin: 0 0 6px;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.kernel-card-body p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.65;
}
.kernel-card-body strong { color: var(--vp-c-brand-1); }

/* ── Flow Steps ── */
.kernel-flow {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 24px 0;
  max-width: 620px;
}
.kernel-flow-step {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px 18px;
  transition: border-color 0.2s, transform 0.2s;
}
.kernel-flow-step:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 30%, transparent);
  transform: translateX(-4px);
}
.kernel-flow-num {
  font-family: 'Space Mono', monospace;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  opacity: 0.6;
  flex-shrink: 0;
  width: 32px;
  text-align: center;
  line-height: 1.5;
}
.kernel-flow-text strong {
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  display: block;
  margin-bottom: 4px;
}
.kernel-flow-text p {
  margin: 0;
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.kernel-flow-arrow {
  text-align: center;
  color: var(--vp-c-brand-1);
  opacity: 0.35;
  font-size: 1.1rem;
  padding: 4px 0;
  margin-right: 23px;
}
code {
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent);
  padding: 0.1em 0.4em;
  border-radius: 4px;
  font-size: 0.85em;
}
</style>
