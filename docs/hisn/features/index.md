---
layout: doc
title: الميزات — Features
---

<div class="ft-hero">
  <div class="ft-hero-bg"></div>
  <div class="ft-hero-content">
    <div class="ft-badge">⚡ Core Features</div>
    <h1 class="ft-title">الميزات الجوهرية</h1>
    <p class="ft-subtitle">
      بُني seL4-Vault على فلسفة واحدة — الأمان لا يُضاف، بل يُثبَت
    </p>
  </div>
</div>

<div class="ft-grid">

  <div class="ft-card ft-card--security">
    <div class="ft-card-top">
      <span class="ft-card-icon">🛡️</span>
      <span class="ft-card-title">العزل الأمني المطلق</span>
    </div>
    <ul class="ft-list">
      <li>كل حاوية تمتلك <code>CSpace</code> و <code>VSpace</code> خاصة بها — لا حاوية تستطيع لمس ذاكرة أخرى</li>
      <li>لا يوجد نظام ملفات مشترك، ولا متغيرات بيئة مشتركة بين الحاويات</li>
      <li>النواة تُثبت رياضياً أن العزل محكم — بدون أي ثغرة Side-Channel</li>
    </ul>
  </div>

  <div class="ft-card ft-card--perf">
    <div class="ft-card-top">
      <span class="ft-card-icon">⚡</span>
      <span class="ft-card-title">Bare-Metal عالي الأداء</span>
    </div>
    <ul class="ft-list">
      <li>لا Linux، لا Windows، لا Overhead — النظام يعمل مباشرة فوق العتاد</li>
      <li>بنية Microkernel تجعله خفيفاً بشكل استثنائي</li>
      <li>جميع المكتبات مكتوبة بـ Rust <code>#[no_std]</code> — صفر تسريبات ذاكرة بضمان المُترجم</li>
    </ul>
  </div>

  <div class="ft-card ft-card--crypto">
    <div class="ft-card-top">
      <span class="ft-card-icon">🔐</span>
      <span class="ft-card-title">تشفير فوري أثناء النقل</span>
    </div>
    <ul class="ft-list">
      <li>كل رسالة IPC بين الحاويات مشفرة بـ <code>ChaCha20-Poly1305</code></li>
      <li>حتى النواة نفسها لا تستطيع قراءة محتوى الرسائل</li>
      <li>مفاتيح التشفير محبوسة بالكامل داخل <code>Crypto_Vault</code> المعزولة عن الشبكة</li>
    </ul>
  </div>

  <div class="ft-card ft-card--containers">
    <div class="ft-card-top">
      <span class="ft-card-icon">📦</span>
      <span class="ft-card-title">حاويات مخصصة ومتخصصة</span>
    </div>
    <div class="ft-container-list">
      <div class="ft-container-item">
        <span class="ft-container-dot ft-dot--desktop"></span>
        <div><strong>Desktop</strong> — واجهة المستخدم والتفاعل مع الشاشة</div>
      </div>
      <div class="ft-container-item">
        <span class="ft-container-dot ft-dot--tor"></span>
        <div><strong>Tor</strong> — التوجيه البصلي والشبكة المشفرة</div>
      </div>
      <div class="ft-container-item">
        <span class="ft-container-dot ft-dot--crypto"></span>
        <div><strong>Crypto_Vault</strong> — الخزنة المعزولة، الوحيدة التي تحمل مفاتيح التشفير</div>
      </div>
    </div>
  </div>

</div>

## بنية متقدمة

<div class="ft-advanced">

  <div class="ft-feature-block">
    <div class="ft-feature-header">
      <span class="ft-feature-icon">🧅</span>
      <div>
        <div class="ft-feature-name">Tor Onion Routing — من الصفر</div>
        <div class="ft-feature-sub">4 مكتبات مكتوبة يدوياً بدون أي Dependency خارجي</div>
      </div>
    </div>
    <div class="ft-libs-grid">
      <div class="ft-lib">
        <span class="ft-lib-name">tor-cell</span>
        <span class="ft-lib-desc">خلايا ثابتة 514 بايت بشكل محكم</span>
      </div>
      <div class="ft-lib">
        <span class="ft-lib-name">tor-handshake</span>
        <span class="ft-lib-desc">مصافحة ntor واشتقاق مفاتيح الجلسة</span>
      </div>
      <div class="ft-lib">
        <span class="ft-lib-name">tor-circuit</span>
        <span class="ft-lib-desc">بناء الدوائر وتشفير Onion متتالي</span>
      </div>
      <div class="ft-lib">
        <span class="ft-lib-name">tor-stream</span>
        <span class="ft-lib-desc">تجريد تدفقات TCP المتزامنة</span>
      </div>
    </div>
    <p class="ft-feature-note">
      مدعوم بتشفير <code>ChaCha20</code> من <code>vault-crypto</code>، وبرنامج تشغيل <strong>VirtIO Net</strong> يتخاطب مباشرة مع PCI — بدون وسطاء.
    </p>
  </div>

  <div class="ft-feature-block ft-feature-block--bus">
    <div class="ft-feature-header">
      <span class="ft-feature-icon">🚌</span>
      <div>
        <div class="ft-feature-name">System Bus Gateway</div>
        <div class="ft-feature-sub">بنية أمنية مشابهة لـ D-Bus و Android Binder — لكن بدون Kernel</div>
      </div>
    </div>
    <div class="ft-bus-flow">
      <div class="ft-bus-app">التطبيقات</div>
      <div class="ft-bus-arrow">→</div>
      <div class="ft-bus-node ft-bus-node--main">
        <span>Bus_Vault</span>
        <span class="ft-bus-node-sub">16+ IPC Tag</span>
      </div>
      <div class="ft-bus-arrow">→</div>
      <div class="ft-bus-side">
        <div class="ft-bus-node ft-bus-node--auth">Auth_Vault</div>
        <div class="ft-bus-node ft-bus-node--fs">FS_Vault</div>
        <div class="ft-bus-node ft-bus-node--net">Tor_Vault</div>
      </div>
    </div>
    <ul class="ft-list" style="margin-top: 16px;">
      <li>لا يوجد تعريف عتاد في النواة — كل شيء في User Space</li>
      <li>الحافظة، الملفات، الشبكة — كلها تمر عبر الـ Bus حصراً</li>
      <li><code>Auth_Vault</code> تتحقق من الصلاحيات قبل أي عملية — يمنع أي برمجية خبيثة من الوصول</li>
    </ul>
  </div>

</div>

<style scoped>
/* ── Hero ── */
.ft-hero {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  padding: 44px 36px 36px;
  margin-bottom: 36px;
  border: 1px solid color-mix(in srgb, #a855f7 25%, transparent);
}
.ft-hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 85% 0%, color-mix(in srgb, #a855f7 14%, transparent) 0%, transparent 55%),
    radial-gradient(ellipse at 15% 100%, color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent) 0%, transparent 50%),
    linear-gradient(135deg, var(--vp-c-bg-soft), var(--vp-c-bg-elv));
  z-index: 0;
}
.ft-hero-content { position: relative; z-index: 1; }
.ft-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: color-mix(in srgb, #a855f7 12%, transparent);
  border: 1px solid color-mix(in srgb, #a855f7 30%, transparent);
  color: #c084fc;
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 16px;
}
.ft-title {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 800;
  margin: 0 0 12px;
  background: linear-gradient(135deg, var(--vp-c-text-1) 30%, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}
.ft-subtitle {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  max-width: 480px;
  margin: 0;
  line-height: 1.65;
  font-style: italic;
}

/* ── Grid Cards ── */
.ft-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
  margin-bottom: 40px;
}
.ft-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
}
.ft-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  opacity: 0;
  transition: opacity 0.25s;
}
.ft-card:hover { transform: translateY(-3px); }
.ft-card:hover::before { opacity: 1; }

.ft-card--security { }
.ft-card--security::before { background: linear-gradient(90deg, transparent, var(--vp-c-brand-1), transparent); }
.ft-card--security:hover { border-color: color-mix(in srgb, var(--vp-c-brand-1) 30%, transparent); box-shadow: 0 8px 28px color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent); }

.ft-card--perf::before { background: linear-gradient(90deg, transparent, #facc15, transparent); }
.ft-card--perf:hover { border-color: color-mix(in srgb, #facc15 30%, transparent); box-shadow: 0 8px 28px color-mix(in srgb, #facc15 8%, transparent); }

.ft-card--crypto::before { background: linear-gradient(90deg, transparent, #a855f7, transparent); }
.ft-card--crypto:hover { border-color: color-mix(in srgb, #a855f7 30%, transparent); box-shadow: 0 8px 28px color-mix(in srgb, #a855f7 8%, transparent); }

.ft-card--containers::before { background: linear-gradient(90deg, transparent, #f97316, transparent); }
.ft-card--containers:hover { border-color: color-mix(in srgb, #f97316 30%, transparent); box-shadow: 0 8px 28px color-mix(in srgb, #f97316 8%, transparent); }

.ft-card-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.ft-card-icon { font-size: 1.4rem; }
.ft-card-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.ft-list {
  padding-right: 18px;
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  line-height: 1.75;
  list-style: none;
}
.ft-list li { position: relative; padding-right: 14px; margin-bottom: 6px; }
.ft-list li::before {
  content: '▸';
  position: absolute;
  right: 0;
  color: var(--vp-c-brand-1);
  opacity: 0.6;
  font-size: 0.7rem;
  top: 3px;
}

/* Containers list */
.ft-container-list { display: flex; flex-direction: column; gap: 10px; }
.ft-container-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
.ft-container-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 5px;
}
.ft-dot--desktop { background: var(--vp-c-brand-1); box-shadow: 0 0 6px var(--vp-c-brand-1); }
.ft-dot--tor { background: #a855f7; box-shadow: 0 0 6px #a855f7; }
.ft-dot--crypto { background: #facc15; box-shadow: 0 0 6px #facc15; }
.ft-container-item strong { color: var(--vp-c-text-1); }

/* ── Advanced Section ── */
.ft-advanced { display: flex; flex-direction: column; gap: 16px; margin-top: 20px; }

.ft-feature-block {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 22px 24px;
  transition: border-color 0.2s;
}
.ft-feature-block:hover {
  border-color: color-mix(in srgb, #a855f7 25%, transparent);
}
.ft-feature-block--bus:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 25%, transparent);
}

.ft-feature-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 18px;
}
.ft-feature-icon {
  font-size: 1.6rem;
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, #a855f7 8%, transparent);
  border: 1px solid color-mix(in srgb, #a855f7 20%, transparent);
  border-radius: 10px;
  flex-shrink: 0;
}
.ft-feature-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 3px;
}
.ft-feature-sub {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-family: 'Space Mono', monospace;
}

/* Tor libs grid */
.ft-libs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
  margin-bottom: 14px;
}
.ft-lib {
  display: flex;
  flex-direction: column;
  gap: 3px;
  background: color-mix(in srgb, #a855f7 5%, var(--vp-c-bg));
  border: 1px solid color-mix(in srgb, #a855f7 15%, transparent);
  border-radius: 8px;
  padding: 10px 14px;
}
.ft-lib-name {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  color: #c084fc;
}
.ft-lib-desc {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.ft-feature-note {
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.65;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 12px;
}

/* Bus Flow Diagram */
.ft-bus-flow {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 4px;
  padding: 14px;
  background: color-mix(in srgb, var(--vp-c-bg) 60%, transparent);
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}
.ft-bus-app {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-family: 'Space Mono', monospace;
  padding: 6px 12px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 6px;
}
.ft-bus-arrow {
  color: var(--vp-c-text-3);
  opacity: 0.5;
  font-size: 1.1rem;
}
.ft-bus-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  font-family: 'Space Mono', monospace;
}
.ft-bus-node--main {
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 30%, transparent);
  color: var(--vp-c-brand-1);
}
.ft-bus-node-sub { font-size: 0.65rem; opacity: 0.65; font-weight: 400; margin-top: 2px; }
.ft-bus-side { display: flex; flex-direction: column; gap: 4px; }
.ft-bus-node--auth {
  background: color-mix(in srgb, #facc15 10%, transparent);
  border: 1px solid color-mix(in srgb, #facc15 25%, transparent);
  color: #facc15;
}
.ft-bus-node--fs {
  background: color-mix(in srgb, #f97316 10%, transparent);
  border: 1px solid color-mix(in srgb, #f97316 25%, transparent);
  color: #fb923c;
}
.ft-bus-node--net {
  background: color-mix(in srgb, #a855f7 10%, transparent);
  border: 1px solid color-mix(in srgb, #a855f7 25%, transparent);
  color: #c084fc;
}

code {
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent);
  padding: 0.1em 0.4em;
  border-radius: 4px;
  font-size: 0.84em;
}
</style>
