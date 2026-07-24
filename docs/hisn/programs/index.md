---
layout: doc
title: البرامج — Programs
---

<div class="pr-hero">
  <div class="pr-hero-bg"></div>
  <div class="pr-hero-content">
    <div class="pr-badge">🖥️ User Space Apps</div>
    <h1 class="pr-title">تطبيقات المستخدم</h1>
    <p class="pr-subtitle">
      برمجيات <code>no_std</code> عالية الأداء تعمل في بيئة User Space معزولة تماماً، وتتخاطب مع النظام عبر الـ Bus حصراً دون أي وصول مباشر للعتاد.
    </p>
  </div>
</div>

<ProgramsList />

## معمارية برامج User Space

يحتوي مجلد الجذر `programs/` على المجلدات المستقلة التالية، كل منها يُمثل تطبيقاً معزولاً بالكامل:



<div class="pr-arch">
  <div class="pr-arch-card">
    <div class="pr-arch-icon">🛡️</div>
    <div class="pr-arch-content">
      <h4>حماية صارمة (Sandboxing)</h4>
      <p>جميع التطبيقات لا تملك أي قدرة على إجراء System Calls مباشرة. كل ما يمكنها فعله هو إرسال رسائل IPC إلى بوابة الـ Bus، مما يجعل اختراق النظام من خلال تطبيق مصاب شبه مستحيل.</p>
    </div>
  </div>

  <div class="pr-arch-card">
    <div class="pr-arch-icon">🎨</div>
    <div class="pr-arch-content">
      <h4>مدير النوافذ المتكامل</h4>
      <p>التطبيقات تستخدم مكتبة واجهة مستخدم مدمجة تتعامل مع <strong>Compositor</strong> النظام. الـ Window Manager يضمن عدم تداخل النوافذ في المناطق المحجوزة (مثل Taskbar) ويدعم Drag-and-Drop.</p>
    </div>
  </div>

  <div class="pr-arch-card">
    <div class="pr-arch-icon">🦀</div>
    <div class="pr-arch-content">
      <h4>مبنية بـ Rust no_std</h4>
      <p>لتجنب الـ Overhead، كُتبت جميع البرامج باستخدام لغة Rust ولكن دون استدعاء مكتبة النظام القياسية، والاعتماد فقط على مكتبة <code>libsel4</code> لتمرير الرسائل.</p>
    </div>
  </div>
</div>

<style scoped>
/* ── Hero ── */
.pr-hero {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  padding: 44px 36px 36px;
  margin-bottom: 40px;
  border: 1px solid color-mix(in srgb, #10b981 25%, transparent);
}
.pr-hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 80% 0%, color-mix(in srgb, #10b981 12%, transparent) 0%, transparent 60%),
    radial-gradient(ellipse at 20% 100%, color-mix(in srgb, #0ea5e9 10%, transparent) 0%, transparent 50%),
    linear-gradient(135deg, var(--vp-c-bg-soft), var(--vp-c-bg-elv));
  z-index: 0;
}
.pr-hero-content { position: relative; z-index: 1; }
.pr-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: color-mix(in srgb, #10b981 12%, transparent);
  border: 1px solid color-mix(in srgb, #10b981 30%, transparent);
  color: #34d399;
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
  background: linear-gradient(135deg, var(--vp-c-text-1) 30%, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}
.pr-subtitle {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  max-width: 550px;
  margin: 0;
  line-height: 1.65;
}
.pr-subtitle code {
  color: #34d399;
  background: color-mix(in srgb, #10b981 15%, transparent);
  font-size: 0.85em;
  padding: 0.1em 0.4em;
  border-radius: 4px;
}

/* ── Grid Cards ── */
.pr-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 48px;
}
.pr-card {
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 24px;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
}
.pr-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, #10b981 40%, transparent);
  box-shadow: 0 8px 30px color-mix(in srgb, #10b981 8%, transparent);
}

.pr-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}
.pr-card-icon {
  font-size: 1.8rem;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-shrink: 0;
}
.pr-icon--files { background: color-mix(in srgb, #f59e0b 12%, transparent); border: 1px solid color-mix(in srgb, #f59e0b 25%, transparent); }
.pr-icon--calc { background: color-mix(in srgb, #3b82f6 12%, transparent); border: 1px solid color-mix(in srgb, #3b82f6 25%, transparent); }
.pr-icon--editor { background: color-mix(in srgb, #a855f7 12%, transparent); border: 1px solid color-mix(in srgb, #a855f7 25%, transparent); }
.pr-icon--viewer { background: color-mix(in srgb, #ec4899 12%, transparent); border: 1px solid color-mix(in srgb, #ec4899 25%, transparent); }

.pr-card-title-group { display: flex; flex-direction: column; gap: 4px; }
.pr-card-name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}
.pr-card-type {
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pr-card-body {
  flex: 1;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
.pr-card-body p { margin: 0 0 12px; }
.pr-card-body code {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-mute);
  padding: 0.1em 0.3em;
  border-radius: 4px;
  font-size: 0.85em;
}

.pr-list {
  padding-right: 18px;
  margin: 0;
  list-style: none;
}
.pr-list li { position: relative; margin-bottom: 8px; font-size: 0.84rem; }
.pr-list li::before {
  content: '✓';
  position: absolute;
  right: -18px;
  color: #10b981;
  font-weight: 800;
  font-size: 0.8rem;
}

.pr-card-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.pr-tag {
  background: color-mix(in srgb, var(--vp-c-bg-mute) 60%, transparent);
  color: var(--vp-c-text-3);
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 50%, transparent);
  padding: 3px 10px;
  border-radius: 6px;
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  font-weight: 700;
}
.pr-card:hover .pr-tag {
  background: color-mix(in srgb, #10b981 8%, transparent);
  color: #34d399;
  border-color: color-mix(in srgb, #10b981 25%, transparent);
}

/* ── Arch Section ── */
.pr-arch {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}
.pr-arch-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: linear-gradient(90deg, var(--vp-c-bg-soft), transparent);
  border-right: 3px solid #10b981;
  border-radius: 8px;
  padding: 20px;
}
.pr-arch-icon {
  font-size: 1.8rem;
  background: color-mix(in srgb, #10b981 10%, transparent);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-shrink: 0;
}
.pr-arch-content h4 {
  margin: 0 0 6px;
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}
.pr-arch-content p {
  margin: 0;
  font-size: 0.86rem;
  color: var(--vp-c-text-2);
  line-height: 1.65;
}
.pr-arch-content strong { color: var(--vp-c-text-1); }
</style>
