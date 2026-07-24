<script setup>
// No logic needed — pure visual hub
</script>

<template>
  <div class="phi-hub">

    <!-- Header -->
    <div class="phi-header">
      <div class="phi-nav">
        <a href="/hisn/" class="phi-back-btn">
          <span class="phi-back-icon">→</span>
          <span>عودة إلى Hub النظام</span>
        </a>
      </div>
      <h2 class="phi-title">الفلسفة المعمارية</h2>
      <p class="phi-subtitle">
        نظام تشغيل مثبت رياضياً — بُني ليكون المستقبل، وليس لاستنساخ الماضي
      </p>
    </div>

    <!-- Cards Grid -->
    <div class="phi-grid">

      <!-- Features -->
      <a href="/hisn/features/" class="phi-card phi-card--green">
        <div class="phi-card__bg"></div>
        <div class="phi-card__shine"></div>
        <div class="phi-card__top">
          <div class="phi-card__icon">⚡</div>
          <div class="phi-card__tag">Features</div>
        </div>
        <div class="phi-card__body">
          <h3>الميزات</h3>
          <p>العزل العتادي، نواة دقيقة مثبتة، Rust من البداية</p>
        </div>
        <div class="phi-card__footer">
          <span>اكتشف الميزات</span>
          <span class="phi-card__arrow">←</span>
        </div>
      </a>

      <!-- Milestones -->
      <a href="/hisn/milestones/" class="phi-card phi-card--gold">
        <div class="phi-card__bg"></div>
        <div class="phi-card__shine"></div>
        <div class="phi-card__top">
          <div class="phi-card__icon">🏆</div>
          <div class="phi-card__tag">Milestones</div>
        </div>
        <div class="phi-card__body">
          <h3>الإنجازات</h3>
          <p>رحلة البناء من الصفر إلى منظومة تقنية متكاملة</p>
        </div>
        <div class="phi-card__footer">
          <span>استعرض التاريخ</span>
          <span class="phi-card__arrow">←</span>
        </div>
      </a>

      <!-- Capability -->
      <a href="/hisn/capabilities/" class="phi-card phi-card--blue">
        <div class="phi-card__bg"></div>
        <div class="phi-card__shine"></div>
        <div class="phi-card__top">
          <div class="phi-card__icon">🔑</div>
          <div class="phi-card__tag">Capability System</div>
        </div>
        <div class="phi-card__body">
          <h3>نظام القدرات</h3>
          <p>الصلاحيات الرياضية التي تجعل الاختراق مستحيلاً نظرياً</p>
        </div>
        <div class="phi-card__footer">
          <span>تعمّق في الفلسفة</span>
          <span class="phi-card__arrow">←</span>
        </div>
      </a>

      <!-- Comparisons -->
      <a href="/hisn/comparisons/" class="phi-card phi-card--purple">
        <div class="phi-card__bg"></div>
        <div class="phi-card__shine"></div>
        <div class="phi-card__top">
          <div class="phi-card__icon">⚔️</div>
          <div class="phi-card__tag">43 نظام</div>
        </div>
        <div class="phi-card__body">
          <h3>ماذا يميزنا؟</h3>
          <p>مقارنة معمارية شاملة مع كل منافس في تاريخ الأنظمة</p>
        </div>
        <div class="phi-card__footer">
          <span>شاهد المقارنات</span>
          <span class="phi-card__arrow">←</span>
        </div>
      </a>

    </div>
  </div>
</template>

<style scoped>
.phi-hub {
  font-family: 'Cairo', sans-serif;
  margin: 0 0 3rem;
}

/* ── Header ── */
.phi-header {
  text-align: center;
  margin-bottom: 3.5rem;
}
.phi-nav {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
.phi-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 100px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.5);
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none !important;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.phi-back-btn:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.15);
  color: #fff;
  transform: translateX(4px);
}
.phi-back-icon {
  font-size: 1.1rem;
  line-height: 1;
}

.phi-title {
  font-size: 2rem;
  font-weight: 900;
  margin: 0 0 0.5rem;
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.phi-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: var(--vp-c-brand);
  border: 1px solid var(--vp-c-brand);
  border-radius: 100px;
  padding: 0.2rem 0.9rem;
  margin-bottom: 1rem;
  opacity: 0.85;
}



.phi-subtitle {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin: 0;
  max-width: 480px;
  margin: 0 auto;
}

/* ── Grid ── */
.phi-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.4rem;
}

@media (max-width: 680px) {
  .phi-grid { grid-template-columns: 1fr; }
  .phi-title { font-size: 1.5rem; }
}

/* ── Card base ── */
.phi-card {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  padding: 2rem 2rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  text-decoration: none !important;
  color: inherit !important;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition:
    transform 0.4s cubic-bezier(0.22,1,0.36,1),
    box-shadow 0.4s ease,
    border-color 0.4s ease;
}

.phi-card:hover {
  transform: translateY(-8px) scale(1.015);
}

/* Diagonal shine */
.phi-card__shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(255,255,255,0.08) 0%,
    rgba(255,255,255,0) 45%
  );
  pointer-events: none;
  z-index: 1;
}

/* Glow blob */
.phi-card__bg {
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.22;
  pointer-events: none;
  right: -60px;
  bottom: -60px;
  transition: opacity 0.4s;
}
.phi-card:hover .phi-card__bg { opacity: 0.45; }

/* ── Color themes ── */
.phi-card--green {
  background: linear-gradient(150deg, rgba(5,18,8,0.97) 0%, rgba(2,12,5,0.99) 100%);
  box-shadow: 0 2px 0 rgba(34,197,94,0.4) inset, 0 6px 40px rgba(34,197,94,0.08);
}
.phi-card--green:hover {
  border-color: rgba(34,197,94,0.45);
  box-shadow: 0 2px 0 rgba(34,197,94,0.5) inset, 0 24px 80px rgba(34,197,94,0.22);
}
.phi-card--green .phi-card__bg    { background: #16a34a; }
.phi-card--green .phi-card__icon  { background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.35); color: #4ade80; }
.phi-card--green .phi-card__tag   { color: #4ade80; border-color: rgba(74,222,128,0.3); background: rgba(74,222,128,0.1); }
.phi-card--green .phi-card__arrow { color: #4ade80; }
.phi-card--green .phi-card__body h3 { color: #d1fae5; }

.phi-card--gold {
  background: linear-gradient(150deg, rgba(18,12,2,0.97) 0%, rgba(12,8,0,0.99) 100%);
  box-shadow: 0 2px 0 rgba(245,158,11,0.4) inset, 0 6px 40px rgba(245,158,11,0.08);
}
.phi-card--gold:hover {
  border-color: rgba(245,158,11,0.45);
  box-shadow: 0 2px 0 rgba(245,158,11,0.5) inset, 0 24px 80px rgba(245,158,11,0.22);
}
.phi-card--gold .phi-card__bg    { background: #d97706; }
.phi-card--gold .phi-card__icon  { background: rgba(245,158,11,0.18); border-color: rgba(245,158,11,0.35); color: #fbbf24; }
.phi-card--gold .phi-card__tag   { color: #fbbf24; border-color: rgba(251,191,36,0.3); background: rgba(251,191,36,0.1); }
.phi-card--gold .phi-card__arrow { color: #fbbf24; }
.phi-card--gold .phi-card__body h3 { color: #fef3c7; }

.phi-card--blue {
  background: linear-gradient(150deg, rgba(2,10,22,0.97) 0%, rgba(0,6,16,0.99) 100%);
  box-shadow: 0 2px 0 rgba(14,165,233,0.4) inset, 0 6px 40px rgba(14,165,233,0.08);
}
.phi-card--blue:hover {
  border-color: rgba(14,165,233,0.45);
  box-shadow: 0 2px 0 rgba(14,165,233,0.5) inset, 0 24px 80px rgba(14,165,233,0.22);
}
.phi-card--blue .phi-card__bg    { background: #0369a1; }
.phi-card--blue .phi-card__icon  { background: rgba(14,165,233,0.18); border-color: rgba(14,165,233,0.35); color: #38bdf8; }
.phi-card--blue .phi-card__tag   { color: #38bdf8; border-color: rgba(56,189,248,0.3); background: rgba(56,189,248,0.1); }
.phi-card--blue .phi-card__arrow { color: #38bdf8; }
.phi-card--blue .phi-card__body h3 { color: #e0f2fe; }

.phi-card--purple {
  background: linear-gradient(150deg, rgba(12,4,22,0.97) 0%, rgba(8,2,16,0.99) 100%);
  box-shadow: 0 2px 0 rgba(168,85,247,0.4) inset, 0 6px 40px rgba(168,85,247,0.08);
}
.phi-card--purple:hover {
  border-color: rgba(168,85,247,0.45);
  box-shadow: 0 2px 0 rgba(168,85,247,0.5) inset, 0 24px 80px rgba(168,85,247,0.22);
}
.phi-card--purple .phi-card__bg    { background: #7c3aed; }
.phi-card--purple .phi-card__icon  { background: rgba(168,85,247,0.18); border-color: rgba(168,85,247,0.35); color: #c084fc; }
.phi-card--purple .phi-card__tag   { color: #c084fc; border-color: rgba(192,132,252,0.3); background: rgba(192,132,252,0.1); }
.phi-card--purple .phi-card__arrow { color: #c084fc; }
.phi-card--purple .phi-card__body h3 { color: #f3e8ff; }

/* ── Card inner parts ── */
.phi-card__top {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.phi-card__icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.9rem;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.phi-card__tag {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: 1px solid;
  border-radius: 100px;
  padding: 0.15rem 0.65rem;
}

.phi-card__body {
  flex: 1;
  position: relative;
  z-index: 2;
}
.phi-card__body h3 {
  margin: 0 0 0.4rem;
  font-size: 1.4rem;
  font-weight: 900;
  border: none;
  padding: 0;
  line-height: 1.2;
}
.phi-card__body p {
  margin: 0;
  font-size: 0.88rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.65;
}

.phi-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255,255,255,0.3);
  border-top: 1px solid rgba(255,255,255,0.07);
  padding-top: 1rem;
  position: relative;
  z-index: 2;
  transition: color 0.3s;
}
.phi-card:hover .phi-card__footer { color: rgba(255,255,255,0.65); }

.phi-card__arrow {
  font-size: 1.2rem;
  transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
}
.phi-card:hover .phi-card__arrow { transform: translateX(-7px); }
</style>
