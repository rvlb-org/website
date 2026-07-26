<script setup>
// Rust Concept Page
// Explains Rust's role and no_std in RVLB
</script>

<template>
  <div class="rc-root">
    
    <!-- Ambient Background -->
    <div class="rc-bg">
      <div class="rc-orb orb-1"></div>
      <div class="rc-orb orb-2"></div>
      <div class="rc-grid"></div>
    </div>

    <div class="rc-content">
      
      <!-- HERO -->
      <header class="rc-hero">
        <div class="rc-badge">
          <span class="badge-dot"></span>
          <span>LANGUAGES & CONCEPTS</span>
        </div>
        
        <div class="rc-icon-wrap">
          <span class="rc-icon-ring ring-1"></span>
          <span class="rc-icon-ring ring-2"></span>
          <span class="rc-main-icon">🦀</span>
        </div>

        <h1 class="rc-title">
          <span class="title-en">Rust</span>
          <span class="title-dash">—</span>
          <span class="title-ar">لغة الصدأ الصلبة</span>
        </h1>

        <p class="rc-tagline">
          لغة برمجة الأنظمة التي نعتمد عليها بالكامل لبناء حاويات ومكونات آمنة رياضياً وخالية من أخطاء الذاكرة.
        </p>
      </header>

      <!-- NO_STD EXPLANATION -->
      <section class="rc-section">
        <div class="rc-section-head">
          <span class="rc-sep-line"></span>
          <span class="rc-sep-label">CORE CONCEPT</span>
          <span class="rc-sep-line"></span>
        </div>

        <div class="rc-card feature-card">
          <div class="rc-card-glow"></div>
          
          <div class="fc-header">
            <div class="fc-icon">🚫</div>
            <div class="fc-title-group">
              <h2 class="fc-title">سمة <code>#![no_std]</code></h2>
              <span class="fc-subtitle">البرمجة على الحديد العاري (Bare Metal)</span>
            </div>
          </div>

          <div class="fc-body">
            <p>
              بشكل افتراضي، تعتمد برامج Rust على مكتبة قياسية ضخمة تسمى <code>std</code> (Standard Library) تتواصل مع نظام التشغيل لفتح الملفات، حجز الذاكرة، والتواصل عبر الشبكة.
            </p>
            <p>
              لكن في <strong>Hisn-seL4</strong>، نحن لا نبني تطبيقات عادية تعمل فوق ويندوز أو لينكس؛ نحن نبني <span class="highlight">الأساس نفسه</span>. مكوناتنا وحاوياتنا تعمل في بيئة معزولة ولا يوجد "نظام تشغيل تقليدي" ليقدم لها الخدمات!
            </p>

            <div class="fc-analogy">
              <div class="analogy-icon">💡</div>
              <div class="analogy-text">
                <h4>مثال من الحياة اليومية لتبسيط الفكرة</h4>
                <p>
                  تخيل أنك تبني منزلاً. استخدام <strong>std</strong> يشبه بناء المنزل في <em>مدينة متطورة</em>؛ حيث توفر لك البلدية (نظام التشغيل) شبكات جاهزة للكهرباء والماء، وما عليك سوى توصيل الأسلاك والأنابيب.<br><br>
                  أما <strong>no_std</strong> فهو يشبه بناء محطة في <em>الفضاء الخارجي</em> أو على جزيرة معزولة؛ لا توجد بلدية أو بنية تحتية جاهزة! عليك الاعتماد على أدواتك الأساسية فقط (مكتبة <code>core</code>) وإدارة كل قطرة ماء وكل طاقة بنفسك من الصفر.
                </p>
              </div>
            </div>

            <div class="fc-grid">
              <div class="fc-item">
                <span class="fc-item-icon">⚡</span>
                <div class="fc-item-text">
                  <h3>الاعتماد على <code>core</code> فقط</h3>
                  <p>باستخدام <code>no_std</code>، نتخلى عن المكتبة القياسية ونكتفي بمكتبة <code>core</code> الأصغر والأكثر استقلالية، والتي لا تحتاج لأي نظام تشغيل للعمل.</p>
                </div>
              </div>
              <div class="fc-item">
                <span class="fc-item-icon">🛡️</span>
                <div class="fc-item-text">
                  <h3>أمان النواة الدقيقة</h3>
                  <p>تضمن لنا هذه السمة أن الكود الخاص بنا لا يستدعي أي ميزات غير متوقعة من العتاد، مما يبقيه نظيفاً، صغيراً، ومناسباً للعمليات الحرجة المتصلة بنواة seL4 مباشرة.</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
/* ── Root ── */
.rc-root {
  position: relative;
  min-height: calc(100vh - var(--vp-nav-height));
  overflow-x: hidden;
  font-family: 'Cairo', 'Inter', sans-serif;
}

/* ── Background ── */
.rc-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.rc-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
}
.orb-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, #f97316, transparent 65%);
  top: -200px; left: -100px;
  animation: float 20s ease-in-out infinite alternate;
}
.orb-2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, #ea580c, transparent 65%);
  bottom: -150px; right: -150px;
  animation: float 15s ease-in-out infinite alternate-reverse;
}
@keyframes float {
  from { transform: translate(0, 0); }
  to { transform: translate(50px, 40px); }
}
.rc-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ── Content ── */
.rc-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ── Hero ── */
.rc-hero {
  text-align: center;
  margin-bottom: 5rem;
  width: 100%;
}
.rc-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.6);
  border: 1px solid rgba(249,115,22,0.3);
  border-radius: 100px;
  padding: 0.35rem 1rem;
  margin-bottom: 2.5rem;
  background: rgba(249,115,22,0.05);
}
.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #f97316;
  box-shadow: 0 0 8px #f97316;
}
.rc-icon-wrap {
  position: relative;
  width: 130px; height: 130px;
  margin: 0 auto 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rc-icon-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.08);
  animation: spin 20s linear infinite;
}
.ring-2 {
  inset: -15px;
  border-color: rgba(249,115,22,0.2);
  border-style: dashed;
  animation-direction: reverse;
  animation-duration: 30s;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.rc-main-icon {
  font-size: 4.5rem;
  filter: drop-shadow(0 0 20px rgba(249,115,22,0.4));
  animation: pulseIcon 4s ease-in-out infinite;
}
@keyframes pulseIcon {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

.rc-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  margin: 0 0 1.5rem;
  line-height: 1.2;
}
.title-en {
  font-family: 'Inter', sans-serif;
  font-size: clamp(4rem, 10vw, 7rem);
  font-weight: 900;
  line-height: 1.1;
  padding: 0.1em 0;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #f97316 0%, #fdba74 60%, #f97316 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 15px rgba(249,115,22,0.3));
}
.title-dash {
  display: none;
}
.title-ar {
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.rc-tagline {
  font-size: 1.15rem;
  color: rgba(255,255,255,0.5);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ── Section ── */
.rc-section {
  width: 100%;
}
.rc-section-head {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
}
.rc-sep-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent);
}
.rc-sep-label {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: rgba(249,115,22,0.6);
  border: 1px solid rgba(249,115,22,0.2);
  padding: 0.25rem 0.85rem;
  border-radius: 100px;
  background: rgba(249,115,22,0.05);
}

/* ── Cards ── */
.rc-card {
  position: relative;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 2.5rem;
  overflow: hidden;
  transition: transform 0.4s, border-color 0.4s, box-shadow 0.4s;
}
.rc-card:hover {
  transform: translateY(-5px);
  border-color: rgba(249,115,22,0.3);
  box-shadow: 0 20px 40px -20px rgba(249,115,22,0.2);
}
.rc-card-glow {
  position: absolute;
  top: -50px; right: -50px;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}
.rc-card:hover .rc-card-glow { opacity: 1; }

.fc-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.fc-icon {
  font-size: 3rem;
  filter: drop-shadow(0 4px 12px rgba(249,115,22,0.3));
}
.fc-title {
  font-size: 2rem;
  font-weight: 900;
  color: #fff;
  margin: 0 0 0.3rem;
  direction: ltr;
  display: inline-block;
}
code {
  background: rgba(249,115,22,0.15);
  color: #fdba74;
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
  font-family: 'Space Mono', monospace;
}
.fc-subtitle {
  display: block;
  font-size: 0.9rem;
  color: rgba(249,115,22,0.8);
  font-weight: 700;
  letter-spacing: 0.05em;
}

.fc-body p {
  font-size: 1.05rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}
.highlight {
  color: #fff;
  font-weight: 700;
  border-bottom: 1px dashed rgba(249,115,22,0.5);
}

.fc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* Analogy Box */
.fc-analogy {
  display: flex;
  gap: 1.5rem;
  background: rgba(250, 204, 21, 0.05);
  border: 1px dashed rgba(250, 204, 21, 0.3);
  padding: 1.5rem;
  border-radius: 16px;
  margin: 1.5rem 0;
  align-items: flex-start;
}
.analogy-icon {
  font-size: 2.5rem;
  line-height: 1;
}
.analogy-text h4 {
  color: #facc15;
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 800;
}
.analogy-text p {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.6;
}

.fc-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: rgba(255,255,255,0.03);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.05);
}
.fc-item-icon {
  font-size: 2rem;
}
.fc-item-text h3 {
  font-size: 1.1rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.5rem;
}
.fc-item-text p {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.4);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .fc-grid { grid-template-columns: 1fr; }
  .rc-card { padding: 1.5rem; }
  .fc-title { font-size: 1.5rem; }
}
</style>
