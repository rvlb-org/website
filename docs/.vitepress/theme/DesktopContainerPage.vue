<script setup>
import { ref } from 'vue'

const files = [
  {
    id: '01', name: 'wm/compositor.rs', path: 'containers/desktop/src/desktop_ui/wm/compositor.rs', icon: '🎨', tag: 'Core Loop', size: '~200 سطر',
    desc: 'العقل المدبر للرسم. يجمع كل طبقات الشاشة (الخلفية، النوافذ بالترتيب، شريط المهام، ثم المؤشر) ويرسمها على الشاشة بتحديث مستمر عبر `eg-fb`.',
    highlights: [
      { label: 'الرسم (Draw)', value: 'استدعاء الدوال لكل نافذة حسب Z-Order' },
      { label: 'تحديث الشاشة', value: 'flush_screen()' }
    ]
  },
  {
    id: '02', name: 'desktop_ui/mod.rs', path: 'containers/desktop/src/desktop_ui/mod.rs', icon: '💾', tag: 'UI State', size: '~150 سطر',
    desc: 'يحتوي على حالة واجهة المستخدم الكاملة (UIState) والمخزنة في `static mut`. يضمن عدم الحاجة للحجز الديناميكي (No dynamic alloc) أثناء حلقة الأحداث.',
    highlights: [
      { label: 'حجم ثابت', value: 'Array of Windows ذات حجم ثابت عبر heapless' },
      { label: 'حالة الماوس', value: 'تخزين الإحداثيات وحالة النقر' }
    ]
  },
  {
    id: '03', name: 'wm/zorder.rs', path: 'containers/desktop/src/desktop_ui/wm/zorder.rs', icon: '🥞', tag: 'Layering', size: '~80 سطر',
    desc: 'يدير ترتيب النوافذ (من في المقدمة ومن في الخلف). عند النقر على نافذة، يتم نقلها فوراً إلى قمة ترتيب الـ Z-Order لترسم أخيراً فتظهر فوق الجميع.',
    highlights: [
      { label: 'رفع النافذة', value: 'bring_to_front(window_id)' }
    ]
  },
  {
    id: '04', name: 'main.rs', path: 'containers/desktop/src/main.rs', icon: '🚀', tag: 'Entry Point', size: '~120 سطر',
    desc: 'نقطة البداية. يستقبل قنوات الـ IPC من الـ init، يهيئ الـ Framebuffer، ويبدأ حلقة لا نهائية لاستقبال أحداث الماوس والكيبورد من الـ input vault.',
    highlights: [
      { label: 'الحدث الرئيسي', value: 'seL4_Wait لاستقبال الأحداث' }
    ]
  },
  {
    id: '05', name: 'window.rs & window_draw.rs', path: 'containers/desktop/src/desktop_ui/', icon: '🪟', tag: 'UI Elements', size: 'متعدد الملفات',
    desc: 'تعريف هيكل النافذة (العنوان، الأبعاد، المحتوى) والدوال الخاصة برسم إطارات النافذة وأزرار الإغلاق والتكبير والتصغير باستخدام embedded-graphics.',
    highlights: [
      { label: 'رسم الإطار', value: 'draw_window_frame(fb, window)' }
    ]
  }
]

const libraries = [
  { id: '01', name: 'eg-fb', path: 'libs/eg-fb', tag: 'Graphics', is_external: false, desc: 'مكتبتنا الخاصة، تعمل كغلاف لمكتبة embedded-graphics، تتيح الرسم المباشر والآمن على الـ Framebuffer باستخدام أشكال هندسية ونصوص بدلاً من framebuffer القديمة.' },
  { id: '02', name: 'ipc-sync', path: 'libs/ipc-sync', tag: 'IPC Comm', is_external: false, desc: 'مكتبتنا الخاصة. تستخدم لاستقبال أحداث الماوس والكيبورد من حاوية Input، وإرسال أوامر تشغيل البرامج.' },
  { id: '03', name: 'ps2-driver', path: 'libs/ps2-driver', tag: 'Input Parsing', is_external: false, desc: 'مكتبتنا الخاصة. تحليل حزم بيانات PS/2 القادمة عبر الـ IPC وترجمتها لإحداثيات ماوس وأحرف كيبورد.' },
  { id: '04', name: 'heapless', path: 'crates.io', tag: 'Data Structs', is_external: true, desc: 'مكتبة خارجية آمنة توفر هياكل بيانات (مثل Vec و String) بحجم ثابت ومحدد مسبقاً، مما يمنع الحاجة للـ alloc في الديسكتوب.' },
  { id: '05', name: 'sel4-sys', path: 'libs/sel4-sys', tag: 'seL4 API', is_external: false, desc: 'التواصل الأساسي مع النواة لانتظار الرسائل وإدارة القدرات.' }
]

const functions = [
  { name: 'compositor::render_all', desc: 'تمسح الشاشة، ترسم الخلفية، ثم ترسم جميع النوافذ المفتوحة بالترتيب الصحيح (Z-Order).' },
  { name: 'ui_state::handle_mouse', desc: 'تستقبل حركة الماوس الجديدة وتحدث إحداثيات المؤشر في الحالة الثابتة.' },
  { name: 'window::handle_click', desc: 'تتحقق مما إذا كان النقر داخل نافذة، وإذا كان كذلك تحدد ما إذا كان النقر على زر الإغلاق أم شريط السحب.' },
  { name: 'drag::update_drag', desc: 'إذا كانت النافذة في حالة (Drag)، تقوم بتحديث إحداثيات النافذة (X, Y) بناءً على حركة الماوس.' }
]

const activeTab = ref('files')
</script>

<template>
  <div class="desktop-root">
    <!-- Hero Section -->
    <header class="d-hero glass-panel">
      <div class="hero-content">
        <div class="hero-badge glow-purple-box">🖥️ Window Manager & Compositor</div>
        <h1 class="hero-title">حاوية <span class="text-purple-400">desktop</span></h1>
        <p class="hero-desc">
          الطبقة الأكثر تعقيداً في مساحة المستخدم. تجمع بين إدارة مدخلات الماوس والكيبورد، ونظام نوافذ متكامل، والرسم المباشر على الشاشة باستخدام `eg-fb`، وكل ذلك يتم <strong>بدون حجز ذاكرة ديناميكي (No dynamic allocation)</strong> في حلقة الأحداث الأساسية.
        </p>
      </div>
      <div class="hero-graphics">
        <div class="window-mockup">
          <div class="wm-header">
            <span class="wm-title">app_runner</span>
            <div class="wm-controls">
              <div class="wm-btn btn-min"></div>
              <div class="wm-btn btn-max"></div>
              <div class="wm-btn btn-close"></div>
            </div>
          </div>
          <div class="wm-body"></div>
        </div>
        <div class="cursor-mockup">↗</div>
      </div>
    </header>

    <!-- Flowchart Section (Event Loop) -->
    <section class="d-section mt-10">
      <div class="section-header">
        <div class="sh-icon glow-blue">🔄</div>
        <h2 class="sh-title">دورة حلقة الأحداث (Event Loop)</h2>
        <div class="line-decorator-purple"></div>
      </div>
      <div class="flowchart-container glass-panel mt-6" dir="ltr">
        <div class="fc-node fc-input border-blue">
          <span class="fc-icon">⌨️</span>
          <span class="fc-text">Input IPC<br><small>(Mouse/KB)</small></span>
        </div>
        <div class="fc-arrow"><div class="fc-pulse bg-blue"></div></div>
        
        <div class="fc-node fc-state border-green">
          <span class="fc-icon">💾</span>
          <span class="fc-text">UI State<br><small>(Static mut Update)</small></span>
        </div>
        <div class="fc-arrow"><div class="fc-pulse bg-green" style="animation-delay: 0.5s;"></div></div>

        <div class="fc-node fc-wm border-purple">
          <span class="fc-icon">🥞</span>
          <span class="fc-text">Window Manager<br><small>(Z-Order, Focus)</small></span>
        </div>
        <div class="fc-arrow"><div class="fc-pulse bg-purple" style="animation-delay: 1s;"></div></div>

        <div class="fc-node fc-compositor border-pink glow-pink-box">
          <span class="fc-icon">🎨</span>
          <span class="fc-text">Compositor<br><small>(eg-fb Render)</small></span>
        </div>
      </div>
    </section>

    <!-- Navigation Tabs -->
    <div class="d-tabs mt-12">
      <button class="d-tab-btn" :class="{ 'active': activeTab === 'files' }" @click="activeTab = 'files'">📂 ملفات النظام</button>
      <button class="d-tab-btn" :class="{ 'active': activeTab === 'funcs' }" @click="activeTab = 'funcs'">⚙️ الوظائف المركزية</button>
      <button class="d-tab-btn" :class="{ 'active': activeTab === 'libs' }" @click="activeTab = 'libs'">📚 المكتبات</button>
    </div>

    <!-- Content Sections -->
    <main class="d-content mt-6">
      <!-- Files Tab -->
      <div v-if="activeTab === 'files'" class="tab-pane fade-in">
        <div class="files-grid">
          <div v-for="file in files" :key="file.id" class="file-card glass-panel hover-border-purple">
            <div class="file-header">
              <div class="fh-main">
                <span class="file-icon">{{ file.icon }}</span>
                <h3 class="file-name" dir="ltr">{{ file.name }}</h3>
              </div>
              <span class="file-tag">{{ file.tag }}</span>
            </div>
            <code class="file-path" dir="ltr">{{ file.path }}</code>
            <p class="file-desc mt-3">{{ file.desc }}</p>
            <div class="file-highlights mt-4">
              <div v-for="hl in file.highlights" :key="hl.label" class="hl-item">
                <span class="hl-label">{{ hl.label }}:</span>
                <span class="hl-value" dir="ltr">{{ hl.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Functions Tab -->
      <div v-if="activeTab === 'funcs'" class="tab-pane fade-in">
        <div class="funcs-list glass-panel">
          <div v-for="func in functions" :key="func.name" class="func-item">
            <div class="func-signature" dir="ltr"><code>{{ func.name }}</code></div>
            <div class="func-desc">{{ func.desc }}</div>
          </div>
        </div>
      </div>

      <!-- Libraries Tab -->
      <div v-if="activeTab === 'libs'" class="tab-pane fade-in">
        <div class="libs-grid">
          <div v-for="lib in libraries" :key="lib.id" class="lib-card glass-panel hover-float-purple">
            <div class="lib-header">
              <div class="lib-id"># {{ lib.id }}</div>
              <div class="lib-icon-box">📦</div>
            </div>
            <h2 class="lib-name" dir="ltr">{{ lib.name }}</h2>
            <div class="lib-meta">
              <code class="meta-path" dir="ltr">{{ lib.path }}</code>
            </div>
            <div class="lib-tags mt-2">
              <span v-if="lib.is_external" class="pr-tag origin-tag tag-external">🌐 مكتبة خارجية</span>
              <span v-else class="pr-tag origin-tag tag-local">🛠️ مكتبتنا</span>
              <span class="pr-tag">{{ lib.tag }}</span>
            </div>
            <p class="lib-desc mt-2">{{ lib.desc }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.desktop-root {
  position: relative;
  min-height: 100vh;
  padding: calc(var(--vp-nav-height) + 2rem) 0 8rem;
  font-family: 'Cairo', 'Inter', system-ui, sans-serif;
}

/* ── Common ── */
.glass-panel {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
}
.glow-purple-box {
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
  border: 1px solid rgba(168, 85, 247, 0.5);
}
.glow-blue { text-shadow: 0 0 10px rgba(59, 130, 246, 0.8); }
.line-decorator-purple { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(168,85,247,0.3), transparent); margin-left: 1rem; }

/* ── Hero ── */
.d-hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem;
  gap: 2rem;
  overflow: hidden;
  position: relative;
}
.hero-content { flex: 1; z-index: 2; }
.hero-badge { display: inline-block; padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold; background: rgba(168, 85, 247, 0.1); color: #c084fc; margin-bottom: 1rem; }
.hero-title { font-size: 3rem; font-weight: 900; margin: 0 0 1rem 0; line-height: 1.2; }
.hero-desc { font-size: 1.1rem; color: #cbd5e1; line-height: 1.8; max-width: 600px; }

.hero-graphics {
  position: relative;
  width: 300px;
  height: 200px;
  perspective: 1000px;
}
.window-mockup {
  position: absolute;
  width: 280px;
  height: 180px;
  background: #0f172a;
  border: 2px solid #334155;
  border-radius: 8px;
  top: 10px;
  right: 10px;
  transform: rotateY(-15deg) rotateX(10deg);
  box-shadow: -20px 20px 30px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
}
.wm-header { height: 28px; background: #1e293b; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center; padding: 0 10px; }
.wm-title { font-size: 0.7rem; color: #94a3b8; font-family: monospace; }
.wm-controls { display: flex; gap: 6px; }
.wm-btn { width: 10px; height: 10px; border-radius: 50%; }
.btn-min { background: #eab308; }
.btn-max { background: #22c55e; }
.btn-close { background: #ef4444; }
.wm-body { flex: 1; background: #020617; }
.cursor-mockup {
  position: absolute;
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 0 2px 5px rgba(0,0,0,0.5);
  bottom: 20px;
  left: 40px;
  z-index: 10;
  animation: float-cursor 3s infinite ease-in-out;
}
@keyframes float-cursor {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
}

/* ── Section Header ── */
.section-header { display: flex; align-items: center; gap: 1rem; }
.sh-icon { font-size: 2rem; }
.sh-title { font-size: 1.8rem; font-weight: 800; margin: 0; }

/* ── Flowchart ── */
.flowchart-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 2rem;
  overflow-x: auto;
}
.fc-node {
  background: rgba(30, 41, 59, 0.7);
  border: 2px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 1.5rem 1rem;
  text-align: center;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  z-index: 2;
}
.fc-icon { font-size: 2rem; }
.fc-text { font-family: monospace; font-size: 0.9rem; font-weight: bold; color: #e2e8f0; }
.fc-text small { color: #94a3b8; font-size: 0.7rem; display: block; margin-top: 4px; }
.fc-arrow {
  flex: 1;
  height: 4px;
  background: rgba(255,255,255,0.1);
  position: relative;
  min-width: 40px;
  margin: 0 10px;
}
.fc-pulse {
  position: absolute;
  top: -3px;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: pulse-move 2s infinite linear;
}
.bg-blue { background: #3b82f6; box-shadow: 0 0 10px #3b82f6; }
.bg-green { background: #22c55e; box-shadow: 0 0 10px #22c55e; }
.bg-purple { background: #a855f7; box-shadow: 0 0 10px #a855f7; }
.border-blue { border-color: #3b82f6; }
.border-green { border-color: #22c55e; }
.border-purple { border-color: #a855f7; }
.border-pink { border-color: #ec4899; }
.glow-pink-box { box-shadow: 0 0 15px rgba(236, 72, 153, 0.4); }
@keyframes pulse-move {
  0% { left: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { left: calc(100% - 10px); opacity: 0; }
}

/* ── Tabs ── */
.d-tabs { display: flex; gap: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; }
.d-tab-btn {
  background: rgba(30,41,59,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
  padding: 10px 24px; color: #cbd5e1; font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.d-tab-btn:hover { background: rgba(255,255,255,0.1); }
.d-tab-btn.active { background: rgba(168, 85, 247, 0.2); border-color: #c084fc; color: #fff; }

/* ── Content Panes ── */
.fade-in { animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Files Grid */
.files-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.file-card { padding: 1.5rem; transition: transform 0.2s, border-color 0.2s; border: 1px solid rgba(255,255,255,0.05); }
.hover-border-purple:hover { transform: translateY(-3px); border-color: #a855f7; }
.file-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.fh-main { display: flex; align-items: center; gap: 10px; }
.file-icon { font-size: 1.5rem; }
.file-name { margin: 0; font-size: 1.1rem; font-weight: bold; font-family: monospace; }
.file-tag { background: rgba(168,85,247,0.15); color: #d8b4fe; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: bold; }
.file-path { background: rgba(0,0,0,0.3); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; color: #94a3b8; }
.file-desc { color: #cbd5e1; font-size: 0.95rem; line-height: 1.6; }
.file-highlights { background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px; display: flex; flex-direction: column; gap: 8px; }
.hl-item { display: flex; justify-content: space-between; font-size: 0.85rem; }
.hl-label { color: #94a3b8; font-weight: bold; }
.hl-value { color: #f8fafc; font-family: monospace; background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; }

/* Functions */
.funcs-list { display: flex; flex-direction: column; gap: 0; overflow: hidden; }
.func-item { display: flex; flex-direction: column; gap: 8px; padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
.func-item:last-child { border-bottom: none; }
.func-signature code { background: rgba(168,85,247,0.15); color: #d8b4fe; padding: 6px 12px; border-radius: 6px; font-size: 1rem; font-weight: bold; border: 1px solid rgba(168,85,247,0.3); }
.func-desc { color: #cbd5e1; font-size: 1rem; margin-top: 5px; line-height: 1.6; }

/* Libraries */
.libs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.lib-card { padding: 1.5rem; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.05); transition: transform 0.2s, box-shadow 0.2s; }
.hover-float-purple:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(168,85,247,0.15); border-color: rgba(168,85,247,0.4); }
.lib-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
.lib-id { font-size: 0.8rem; opacity: 0.6; font-family: monospace; }
.lib-icon-box { font-size: 1.5rem; width: 40px; height: 40px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; border-radius: 10px; }
.lib-name { margin: 0 0 0.5rem 0; font-size: 1.3rem; color: #fff; font-family: monospace; }
.meta-path { background: rgba(0,0,0,0.3); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; color: #94a3b8; }
.lib-desc { color: #cbd5e1; font-size: 0.95rem; line-height: 1.6; flex: 1; }

.origin-tag { font-weight: 800; border-width: 1px; font-size: 0.75rem; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px; }
.tag-local { background: color-mix(in srgb, #22c55e 15%, transparent); color: #4ade80; border-color: color-mix(in srgb, #22c55e 40%, transparent); margin-left: 8px;}
.tag-external { background: color-mix(in srgb, #f59e0b 15%, transparent); color: #fbbf24; border-color: color-mix(in srgb, #f59e0b 40%, transparent); margin-left: 8px;}
.pr-tag { background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; color: #cbd5e1; }

@media (max-width: 768px) {
  .d-hero { flex-direction: column; text-align: center; }
  .hero-graphics { display: none; }
  .flowchart-container { flex-direction: column; gap: 20px; }
  .fc-arrow { width: 4px; height: 30px; margin: 0; min-width: auto; }
  .fc-pulse { top: 0; left: -3px; animation: pulse-down 2s infinite linear; }
  @keyframes pulse-down { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: calc(100% - 10px); opacity: 0; } }
}
</style>
