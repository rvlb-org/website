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
    <div class="ambient-glow glow-top"></div>
    <div class="ambient-glow glow-bottom"></div>
    <div class="stars-bg"></div>

    <header class="d-hero">
      <div class="hero-content">
        <div class="hero-badge glow-purple-box">🖥️ Window Manager & Compositor</div>
        <h1 class="hero-title">حاوية <span class="text-purple-400">desktop</span></h1>
        <p class="hero-desc glass-panel">
          الطبقة الأجمل والأكثر تعقيداً في مساحة المستخدم. تجمع بين إدارة مدخلات الماوس والكيبورد، ونظام نوافذ متكامل، والرسم المباشر على الشاشة باستخدام <code>eg-fb</code>. يتم كل هذا <strong>بدون حجز ذاكرة ديناميكي (No dynamic allocation)</strong> بفضل المعمارية المحكمة.
        </p>
      </div>
      
      <div class="hero-graphics">
        <div class="window-mockup glass-panel glow-purple-box">
          <div class="wm-header">
            <span class="wm-title">app_runner</span>
            <div class="wm-controls">
              <div class="wm-btn btn-close"></div>
              <div class="wm-btn btn-min"></div>
              <div class="wm-btn btn-max"></div>
            </div>
          </div>
          <div class="wm-body">
            <div class="wm-content-line w-3/4"></div>
            <div class="wm-content-line w-1/2"></div>
            <div class="wm-content-line w-5/6"></div>
          </div>
        </div>
        <div class="cursor-mockup">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="white"/>
          </svg>
        </div>
      </div>
    </header>

    <section class="d-section mt-16">
      <div class="section-header text-center">
        <h2 class="sh-title glow-text-blue">مسار تدفق الأحداث (Event Pipeline)</h2>
        <p class="sh-subtitle">كيف تتحول نقرة الماوس إلى رسمة على الشاشة؟</p>
      </div>
      
      <div class="pipeline-container mt-10" dir="ltr">
        
        <!-- Node 1 -->
        <div class="pl-node pl-input glass-panel glow-blue-box">
          <div class="pl-icon">⌨️</div>
          <div class="pl-info">
            <h4>Input IPC</h4>
            <p>Receive Mouse & KB Events</p>
          </div>
        </div>
        
        <div class="pl-connector">
          <div class="pl-beam bg-blue"></div>
        </div>

        <!-- Node 2 -->
        <div class="pl-node pl-state glass-panel glow-green-box">
          <div class="pl-icon">💾</div>
          <div class="pl-info">
            <h4>UI State</h4>
            <p>Update Static Mut Data</p>
          </div>
        </div>
        
        <div class="pl-connector">
          <div class="pl-beam bg-green"></div>
        </div>

        <!-- Node 3 -->
        <div class="pl-node pl-wm glass-panel glow-purple-box">
          <div class="pl-icon">🥞</div>
          <div class="pl-info">
            <h4>Window Manager</h4>
            <p>Z-Order & Focus Logic</p>
          </div>
        </div>

        <div class="pl-connector">
          <div class="pl-beam bg-purple"></div>
        </div>

        <!-- Node 4 -->
        <div class="pl-node pl-compositor glass-panel glow-pink-box">
          <div class="pl-icon">🎨</div>
          <div class="pl-info">
            <h4>Compositor</h4>
            <p>Render layers via eg-fb</p>
          </div>
        </div>

      </div>
    </section>

    <!-- Navigation Tabs -->
    <div class="d-tabs mt-20">
      <button class="d-tab-btn" :class="{ 'active': activeTab === 'files' }" @click="activeTab = 'files'">📂 ملفات النظام</button>
      <button class="d-tab-btn" :class="{ 'active': activeTab === 'funcs' }" @click="activeTab = 'funcs'">⚙️ الوظائف المركزية</button>
      <button class="d-tab-btn" :class="{ 'active': activeTab === 'libs' }" @click="activeTab = 'libs'">📚 المكتبات</button>
    </div>

    <!-- Content Sections -->
    <main class="d-content mt-8">
      <!-- Files Tab -->
      <div v-if="activeTab === 'files'" class="tab-pane fade-in">
        <div class="files-grid">
          <div v-for="file in files" :key="file.id" class="file-card glass-panel hover-glow-purple">
            <div class="file-header">
              <div class="fh-main">
                <span class="file-icon">{{ file.icon }}</span>
                <h3 class="file-name" dir="ltr">{{ file.name }}</h3>
              </div>
              <span class="file-tag">{{ file.tag }}</span>
            </div>
            <div class="path-container" dir="ltr">
              <code class="file-path">{{ file.path }}</code>
            </div>
            <p class="file-desc mt-4">{{ file.desc }}</p>
            <div class="file-highlights mt-5">
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
          <div v-for="func in functions" :key="func.name" class="func-item hover-bg">
            <div class="func-signature" dir="ltr"><code>{{ func.name }}</code></div>
            <div class="func-desc">{{ func.desc }}</div>
          </div>
        </div>
      </div>

      <!-- Libraries Tab -->
      <div v-if="activeTab === 'libs'" class="tab-pane fade-in">
        <div class="libs-grid">
          <div v-for="lib in libraries" :key="lib.id" class="lib-card glass-panel hover-glow-purple">
            <div class="lib-header">
              <div class="lib-id"># {{ lib.id }}</div>
              <div class="lib-icon-box">📦</div>
            </div>
            <h2 class="lib-name" dir="ltr">{{ lib.name }}</h2>
            <div class="path-container mt-2">
              <code class="meta-path" dir="ltr">{{ lib.path }}</code>
            </div>
            <div class="lib-tags mt-3">
              <span v-if="lib.is_external" class="pr-tag origin-tag tag-external">🌐 مكتبة خارجية</span>
              <span v-else class="pr-tag origin-tag tag-local">🛠️ مكتبتنا</span>
              <span class="pr-tag">{{ lib.tag }}</span>
            </div>
            <p class="lib-desc mt-3">{{ lib.desc }}</p>
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
  padding: calc(var(--vp-nav-height) + 2rem) 1.5rem 8rem;
  font-family: 'Cairo', 'Inter', system-ui, sans-serif;
  overflow: hidden;
}

/* ── Background & Ambient ── */
.ambient-glow {
  position: absolute;
  width: 60vw; height: 60vw;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0; opacity: 0.15;
  pointer-events: none;
}
.glow-top { top: -20%; right: -10%; background: #a855f7; }
.glow-bottom { bottom: -20%; left: -10%; background: #3b82f6; }
.stars-bg {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background-image: radial-gradient(circle at center, #ffffff 1px, transparent 1px);
  background-size: 50px 50px; opacity: 0.03; z-index: 0; pointer-events: none;
}

/* ── Common ── */
.glass-panel {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  position: relative; z-index: 2;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.glow-purple-box { box-shadow: 0 0 25px rgba(168, 85, 247, 0.2); border-color: rgba(168, 85, 247, 0.4); }
.glow-blue-box { box-shadow: 0 0 25px rgba(59, 130, 246, 0.2); border-color: rgba(59, 130, 246, 0.4); }
.glow-green-box { box-shadow: 0 0 25px rgba(34, 197, 94, 0.2); border-color: rgba(34, 197, 94, 0.4); }
.glow-pink-box { box-shadow: 0 0 25px rgba(236, 72, 153, 0.2); border-color: rgba(236, 72, 153, 0.4); }

.glow-text-blue {
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
  background: linear-gradient(90deg, #60a5fa, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ── Hero ── */
.d-hero {
  display: flex; justify-content: space-between; align-items: center;
  padding: 4rem 2rem; gap: 4rem; position: relative; z-index: 2;
}
.hero-content { flex: 1.2; }
.hero-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: bold; background: rgba(168, 85, 247, 0.15); color: #d8b4fe; margin-bottom: 1.5rem; }
.hero-title { font-size: 3.5rem; font-weight: 900; margin: 0 0 1.5rem 0; line-height: 1.2; }
.hero-desc { padding: 1.5rem 2rem; font-size: 1.15rem; color: #e2e8f0; line-height: 1.8; border-right: 4px solid #a855f7; }

/* Desktop Mockup */
.hero-graphics { flex: 0.8; position: relative; perspective: 1200px; display: flex; justify-content: center; align-items: center; }
.window-mockup {
  width: 100%; max-width: 360px; height: 240px;
  transform: rotateY(-15deg) rotateX(10deg);
  transition: transform 0.5s ease;
  display: flex; flex-direction: column; overflow: hidden;
}
.window-mockup:hover { transform: rotateY(0deg) rotateX(0deg) scale(1.05); }
.wm-header { height: 32px; background: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; padding: 0 12px; }
.wm-title { font-size: 0.75rem; color: #cbd5e1; font-family: monospace; font-weight: bold; }
.wm-controls { display: flex; gap: 8px; flex-direction: row-reverse; } /* Mac style */
.wm-btn { width: 12px; height: 12px; border-radius: 50%; }
.btn-close { background: #ef4444; } .btn-min { background: #f59e0b; } .btn-max { background: #10b981; }
.wm-body { flex: 1; background: rgba(2, 6, 23, 0.7); padding: 20px; display: flex; flex-direction: column; gap: 12px; }
.wm-content-line { height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; }
.w-3\/4 { width: 75%; } .w-1\/2 { width: 50%; } .w-5\/6 { width: 83%; }

.cursor-mockup {
  position: absolute; bottom: 10%; right: 15%; z-index: 10;
  animation: float-cursor 4s infinite ease-in-out;
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5));
}
@keyframes float-cursor {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-30px, -20px); }
}

/* ── Section Header ── */
.section-header { text-align: center; margin-bottom: 2rem; }
.sh-title { font-size: 2.2rem; font-weight: 900; margin: 0; }
.sh-subtitle { font-size: 1.1rem; color: #94a3b8; margin-top: 0.5rem; }

/* ── Vertical Pipeline ── */
.pipeline-container {
  display: flex; flex-direction: column; align-items: center; gap: 0;
  padding: 2rem 0; position: relative; z-index: 2;
}
.pl-node {
  display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem 2rem;
  width: 100%; max-width: 400px; border-radius: 16px;
  position: relative; z-index: 3;
}
.pl-icon { font-size: 2.5rem; }
.pl-info h4 { margin: 0; font-size: 1.2rem; color: #fff; font-family: monospace; font-weight: bold; }
.pl-info p { margin: 4px 0 0; font-size: 0.85rem; color: #cbd5e1; }

.pl-connector { height: 60px; width: 4px; background: rgba(255,255,255,0.1); position: relative; z-index: 1; }
.pl-beam {
  position: absolute; top: 0; left: -2px; width: 8px; height: 30px; border-radius: 4px;
  animation: beam-drop 1.5s infinite linear;
}
@keyframes beam-drop {
  0% { top: -10px; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.bg-blue { background: #3b82f6; box-shadow: 0 0 15px #3b82f6; }
.bg-green { background: #22c55e; box-shadow: 0 0 15px #22c55e; }
.bg-purple { background: #a855f7; box-shadow: 0 0 15px #a855f7; }

/* ── Tabs ── */
.d-tabs { display: flex; justify-content: center; gap: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; position: relative; z-index: 2;}
.d-tab-btn {
  background: rgba(30,41,59,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
  padding: 12px 28px; color: #cbd5e1; font-weight: 700; font-size: 1.05rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.d-tab-btn:hover { background: rgba(168, 85, 247, 0.1); border-color: rgba(168, 85, 247, 0.3); transform: translateY(-2px); }
.d-tab-btn.active { background: rgba(168, 85, 247, 0.2); border-color: #c084fc; color: #fff; box-shadow: 0 4px 20px rgba(168,85,247,0.2); }

/* ── Content Panes ── */
.fade-in { animation: fadeIn 0.4s ease forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

/* Files Grid */
.files-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; position: relative; z-index: 2;}
.file-card { padding: 2rem; transition: transform 0.3s, box-shadow 0.3s; }
.hover-glow-purple:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(168,85,247,0.15); border-color: rgba(168,85,247,0.4); }

.file-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; }
.fh-main { display: flex; align-items: center; gap: 12px; }
.file-icon { font-size: 1.8rem; }
.file-name { margin: 0; font-size: 1.2rem; font-weight: 900; font-family: monospace; color: #f8fafc; }
.file-tag { background: rgba(168,85,247,0.15); color: #d8b4fe; padding: 6px 10px; border-radius: 8px; font-size: 0.8rem; font-weight: bold; border: 1px solid rgba(168,85,247,0.3); }

/* Fix overflow issues */
.path-container {
  background: rgba(0,0,0,0.4); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);
  display: block; width: 100%; box-sizing: border-box; overflow: hidden;
}
.file-path, .meta-path { font-size: 0.85rem; color: #94a3b8; font-family: monospace; word-break: break-all; white-space: pre-wrap; display: block; }

.file-desc { color: #cbd5e1; font-size: 1.05rem; line-height: 1.7; }
.file-highlights { background: rgba(0,0,0,0.3); padding: 1.2rem; border-radius: 12px; display: flex; flex-direction: column; gap: 10px; border: 1px solid rgba(255,255,255,0.03); }
.hl-item { display: flex; justify-content: space-between; font-size: 0.9rem; align-items: center;}
.hl-label { color: #94a3b8; font-weight: bold; }
.hl-value { color: #f8fafc; font-family: monospace; background: rgba(168,85,247,0.1); padding: 4px 8px; border-radius: 6px; text-align: right; border: 1px solid rgba(168,85,247,0.2); }

/* Functions */
.funcs-list { display: flex; flex-direction: column; gap: 0; overflow: hidden; position: relative; z-index: 2; }
.func-item { display: flex; flex-direction: column; gap: 10px; padding: 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.2s; }
.func-item:last-child { border-bottom: none; }
.hover-bg:hover { background: rgba(255,255,255,0.02); }
.func-signature code { background: rgba(168,85,247,0.1); color: #d8b4fe; padding: 8px 16px; border-radius: 8px; font-size: 1.1rem; font-weight: bold; border: 1px solid rgba(168,85,247,0.3); display: inline-block; }
.func-desc { color: #cbd5e1; font-size: 1.1rem; line-height: 1.7; margin-left: 8px; }

/* Libraries */
.libs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; position: relative; z-index: 2;}
.lib-card { padding: 2rem; display: flex; flex-direction: column; }
.lib-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
.lib-id { font-size: 0.9rem; opacity: 0.5; font-family: monospace; font-weight: bold; }
.lib-icon-box { font-size: 1.8rem; width: 50px; height: 50px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
.lib-name { margin: 0 0 0.5rem 0; font-size: 1.5rem; color: #fff; font-family: monospace; font-weight: 900; }
.origin-tag { font-weight: 800; border-width: 1px; font-size: 0.8rem; padding: 4px 10px; border-radius: 6px; display: inline-block; margin-bottom: 8px; margin-left: 8px; }
.tag-local { background: rgba(34,197,94,0.15); color: #4ade80; border-color: rgba(34,197,94,0.3); }
.tag-external { background: rgba(245,158,11,0.15); color: #fbbf24; border-color: rgba(245,158,11,0.3); }
.pr-tag { background: rgba(255,255,255,0.08); padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; color: #cbd5e1; font-weight: bold;}

@media (max-width: 1024px) {
  .d-hero { flex-direction: column; text-align: center; gap: 3rem; }
  .hero-desc { border-right: none; border-bottom: 4px solid #a855f7; }
}
@media (max-width: 768px) {
  .d-tabs { flex-direction: column; }
  .hl-item { flex-direction: column; align-items: flex-start; gap: 5px; }
  .hl-value { width: 100%; text-align: left; }
}
</style>
