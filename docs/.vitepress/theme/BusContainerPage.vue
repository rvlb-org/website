<script setup>
import { ref, onMounted } from 'vue'

const messageTags = [
  { call: '0x301-0x304 (Direct FS Ops)', action: 'يستقبل طلبات (Create, Read, Write, Delete) ويُمررها مباشرة لـ FS_Vault عبر نقطة الاتصال FS_EP_CAP=1 وينتظر الرد.' },
  { call: '0x310-0x311 (Composite Ops)', action: 'ينفذ عمليات مركبة مثل النسخ (CopyFile = Read+Write) والنقل (MoveFile). يتعامل مع فشل الخطوات تتابعيًا داخل الحاوية.' },
  { call: '0x320-0x322 (Clipboard Ops)', action: 'يُدير الحافظة المؤقتة في الذاكرة (static mut CLIPBOARD) لنسخ ولصق ومسح البيانات بين التطبيقات بأمان تام.' },
  { call: '0x330-0x332 (Desktop Ops)', action: 'يتولى إنشاء أيقونات سطح المكتب (.vlk) أو حذفها، وتسجيل تطبيقات جديدة في /home/user/apps/ ليعرضها الـ Desktop.' },
  { call: '0x340-0x341 (Network Proxy)', action: 'يحول طلبات الاتصال بالشبكة (NetConnect, NetRequest) إلى حاوية Tor_Vault لتتم العملية عبر طبقات التشفير المخفية.' }
]

const functions = [
  { id: '01', icon: '🚦', title: 'توجيه الرسائل (IPC Routing)', desc: 'تمثل الموزع المركزي (Router) للرسائل بين التطبيقات والحاويات. تمنع التطبيقات من التحدث المباشر مع نظام الملفات وتجبرها على المرور عبرها.' },
  { id: '02', icon: '🔗', title: 'العمليات المركبة (Composite Orchestration)', desc: 'بدل إرهاق التطبيقات بنقل الملفات ببطء، تأخذ Bus الطلب (MoveFile) وتنفذ هي سلسلة أوامر الـ FS داخلياً بأسرع طريقة ممكنة.' },
  { id: '03', icon: '📋', title: 'إدارة الحافظة (Global Clipboard)', desc: 'تحفظ البيانات المنسوخة (Copy/Paste) في مساحتها الآمنة لمنع التطبيقات الخبيثة من سرقة الحافظة، حيث تخضع لقواعد الوصول.' },
  { id: '04', icon: '🖥️', title: 'مدير الاختصارات (Shortcut Manager)', desc: 'تساعد حاوية الـ Desktop في إدارة روابط التطبيقات واختصاراتها بعيداً عن تعقيدات نظام الملفات المباشر.' }
]

const files = [
  {
    id: '01', name: 'src/main.rs', path: 'containers/bus/src/main.rs', icon: '🦀', tag: 'IPC Server', size: '~180 سطر',
    desc: 'الحلقة اللانهائية (Event Loop) الخاصة بالناقل. تحتوي على تصنيف صارم لكل رسالة IPC واردة وتوجيهها حسب الـ MessageTag. تحتوي أيضاً على مصفوفة CLIPBOARD الثابتة.',
    highlights: [
      { label: 'تفويض الـ FS', value: 'forward_to_fs(req, ipc_buf)' },
      { label: 'العملية المركبة (نسخ)', value: 'CopyFile = ReadFile(src) -> WriteFile(dst)' },
      { label: 'الذاكرة المؤقتة', value: 'static mut CLIPBOARD: [u8; 256]' },
      { label: 'تحويل الشبكة', value: 'NetRequest -> Tor_Vault_EP' }
    ]
  },
  {
    id: '02', name: 'Cargo.toml', path: 'containers/bus/Cargo.toml', icon: '📦', tag: 'Package Config', size: '~15 سطر',
    desc: 'ملف التعريف الخاص بالحاوية، والذي يربطها بمكتبة sel4-sys ومكتبة utils، ويعرّفها كـ executable مستقل.',
    highlights: [
      { label: 'الاسم', value: 'bus (v0.1.0)' },
      { label: 'تجميع (Profile)', value: 'opt-level = "z"' },
    ]
  }
]

const terminalLines = ref([
  { text: '[Bus] Initializing IPC Router matrix...', color: 'text-purple-400 font-bold' },
  { text: '[Bus] Capabilities linked: FS_EP=1, TOR_EP=3.', color: 'text-gray-400' },
  { text: '[Bus] Listening on Endpoint 0...', color: 'text-purple-300' },
  { text: '>> INCOMING [App_ID: 15] 0x301 (CreateFile)', color: 'text-pink-400 font-bold mt-2' },
  { text: '[Bus] Forwarding 0x301 to FS_Vault...', color: 'text-gray-500' },
  { text: '<< REPLY [FS_Vault] Success (0)', color: 'text-green-400' },
  { text: '[Bus] Returning reply to App_ID: 15.', color: 'text-gray-400' },
  { text: '>> INCOMING [App_ID: 22] 0x310 (CopyFile)', color: 'text-pink-400 font-bold mt-2' },
  { text: '[Bus] Executing composite: ReadFile(src) -> WriteFile(dst)', color: 'text-purple-300' },
  { text: '<< REPLY [Bus_Vault] Composite Success (0)', color: 'text-green-400' }
])
</script>

<template>
  <div class="bus-root">
    <!-- Glowing background effects -->
    <div class="ambient-glow glow-top"></div>
    <div class="ambient-glow glow-bottom"></div>
    <div class="grid-bg"></div>

    <!-- Header Section -->
    <header class="bus-header">
      <div class="bus-badge-container">
        <div class="bus-badge">
          <span class="badge-pulse"></span>
          <span>IPC ROUTER / PORT 0</span>
        </div>
        <div class="matrix-badge glow-purple-box">
          <span class="us-icon">🔀</span>
          <span>The Nexus</span>
        </div>
      </div>

      <div class="bus-icon-wrapper">
        <div class="nexus-core"></div>
        <div class="data-ring ring-1"></div>
        <div class="data-ring ring-2"></div>
        <div class="data-ring ring-3"></div>
        <span class="bus-main-icon">🔮</span>
      </div>

      <h1 class="bus-title">
        <span class="gradient-text-white">حاوية </span>
        <span class="gradient-text-purple">الناقل</span>
      </h1>

      <p class="bus-subtitle">
        المحور المركزي لتوجيه الرسائل <strong>(The IPC Router)</strong>. نقطة الالتقاء التي تقطع الاتصال المباشر بين التطبيقات والموارد الأساسية، وتتولى تنظيم الطلبات، تنفيذ العمليات المركبة، وإدارة الذاكرة المؤقتة (Clipboard) بأمان تام.
      </p>

      <div class="bus-stats-bar">
        <div class="stat-pill"><span class="stat-icon">🔀</span><span class="stat-val">Message Router</span><span class="stat-tag">Core</span></div>
        <div class="stat-divider"></div>
        <div class="stat-pill"><span class="stat-icon">📋</span><span class="stat-val">Clipboard Manager</span><span class="stat-tag">Memory</span></div>
        <div class="stat-divider"></div>
        <div class="stat-pill"><span class="stat-icon">⚡</span><span class="stat-val">Composite Ops</span><span class="stat-tag bg-purple">Optimized</span></div>
        <div class="stat-divider"></div>
        <div class="stat-pill"><span class="stat-icon">🛡️</span><span class="stat-val">Tor Proxy</span><span class="stat-tag">Secure</span></div>
      </div>
    </header>

    <main class="bus-content">

      <!-- The Nexus Visualizer -->
      <section class="bus-section">
        <div class="section-header">
          <div class="sh-icon glow-purple">🎛️</div>
          <h2 class="sh-title">محول الرسائل المركزي (The IPC Matrix)</h2>
          <div class="line-decorator-purple"></div>
        </div>
        
        <div class="philosophical-note-bus glass-panel">
          <div class="pn-icon">🧩</div>
          <div class="pn-text">
            <strong>مبدأ الوساطة الحتمية (Mandatory Intermediation)</strong>
            في `HISN-seL4`، لا يُسمح لتطبيق المستخدم بالتحدث مباشرة مع حاوية الملفات أو الشبكة لتجنب الهجمات الجانبية ومعرفة البنية التحتية. التطبيق يرى فقط <code>Bus_Vault</code> الذي يلعب دور <strong>الوكيل</strong> (Proxy) الذي يوجه الرسائل، يدمجها، ويرد عليها كأنها جهاز واحد ضخم.
          </div>
        </div>
        
        <div class="nexus-visualizer glass-panel mt-6" dir="ltr">
          <div class="matrix-container">
            
            <!-- Left Side: Apps -->
            <div class="apps-column">
              <div class="matrix-node app-node">
                <span class="node-icon">📱</span>
                <div class="node-text">
                  <span class="node-title">App A</span>
                  <span class="node-ar-title">تطبيق أ</span>
                  <span class="node-sub">PID 15 (معرف 15)</span>
                </div>
              </div>
              <div class="matrix-node app-node mt-4">
                <span class="node-icon">🖥️</span>
                <div class="node-text">
                  <span class="node-title">Desktop</span>
                  <span class="node-ar-title">سطح المكتب</span>
                  <span class="node-sub">PID 7 (معرف 7)</span>
                </div>
              </div>
            </div>

            <!-- Flow Arrows to Bus -->
            <div class="flow-paths">
              <svg class="flow-svg" viewBox="0 0 100 150" preserveAspectRatio="none">
                <path d="M 0,30 C 50,30 50,75 100,75" class="flow-line in-line" />
                <path d="M 0,120 C 50,120 50,75 100,75" class="flow-line in-line" />
                <!-- Animated Packets -->
                <circle r="6" class="packet in-packet p1"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 0,30 C 50,30 50,75 100,75" /></circle>
                <circle r="6" class="packet in-packet p2"><animateMotion dur="2s" repeatCount="indefinite" path="M 0,120 C 50,120 50,75 100,75" /></circle>
              </svg>
            </div>

            <!-- Center: Bus Vault -->
            <div class="center-column">
              <div class="matrix-node bus-node pulse-purple">
                <div class="bus-ring-bg"></div>
                <span class="node-icon">🔮</span>
                <div class="node-text">
                  <span class="node-title">Bus Vault</span>
                  <span class="node-ar-title">حاوية الناقل</span>
                  <span class="node-sub">IPC Router (موزع الرسائل)</span>
                </div>
              </div>
              <!-- Internal Ops indicator -->
              <div class="internal-ops">
                <div class="op-badge">📋 Clipboard (الحافظة)</div>
                <div class="op-badge">⚡ Composite Ops (عمليات مركبة)</div>
              </div>
            </div>

            <!-- Flow Arrows to Vaults -->
            <div class="flow-paths">
              <svg class="flow-svg" viewBox="0 0 100 220" preserveAspectRatio="none">
                <path d="M 0,110 C 50,110 50,30 100,30" class="flow-line out-line" />
                <path d="M 0,110 C 50,110 50,110 100,110" class="flow-line out-line" />
                <path d="M 0,110 C 50,110 50,190 100,190" class="flow-line out-line" />
                
                <circle r="6" class="packet out-packet p3"><animateMotion dur="1.2s" repeatCount="indefinite" path="M 0,110 C 50,110 50,30 100,30" /></circle>
                <circle r="6" class="packet out-packet p4"><animateMotion dur="1.8s" repeatCount="indefinite" path="M 0,110 C 50,110 50,110 100,110" /></circle>
                <circle r="6" class="packet out-packet p5"><animateMotion dur="1.4s" repeatCount="indefinite" path="M 0,110 C 50,110 50,190 100,190" /></circle>
              </svg>
            </div>

            <!-- Right Side: Vaults -->
            <div class="vaults-column">
              <div class="matrix-node vault-node yellow-glow">
                <span class="node-icon">📁</span>
                <div class="node-text">
                  <span class="node-title">FS Vault</span>
                  <span class="node-ar-title">نظام الملفات</span>
                  <span class="node-sub">EP=1 (نقطة 1)</span>
                </div>
              </div>
              <div class="matrix-node vault-node blue-glow mt-4">
                <span class="node-icon">🧅</span>
                <div class="node-text">
                  <span class="node-title">Tor Vault</span>
                  <span class="node-ar-title">الشبكة المخفية</span>
                  <span class="node-sub">EP=3 (نقطة 3)</span>
                </div>
              </div>
              <div class="matrix-node vault-node red-glow mt-4 opacity-50">
                <span class="node-icon">🛡️</span>
                <div class="node-text">
                  <span class="node-title">Auth Vault</span>
                  <span class="node-ar-title">الصلاحيات</span>
                  <span class="node-sub">No Route (بدون مسار)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Boot Sequence Terminal -->
      <section class="bus-section mt-10">
        <div class="section-header">
          <div class="sh-icon glow-pink">💻</div>
          <h2 class="sh-title">شاشة المراقبة (Bus Terminal)</h2>
          <div class="line-decorator-purple"></div>
        </div>
        
        <div class="terminal-window glass-panel">
          <div class="tw-header">
            <div class="tw-dots"><span></span><span></span><span></span></div>
            <div class="tw-title">nexus_router_tty</div>
            <div class="tw-action">tail -f</div>
          </div>
          <div class="tw-body" dir="ltr">
            <div v-for="(line, index) in terminalLines" :key="index" class="tw-line" :class="line.color">
              {{ line.text }}
            </div>
            <div class="tw-cursor">_</div>
          </div>
        </div>
      </section>

      <!-- Message Tags Section -->
      <section class="bus-section mt-10">
        <div class="section-header">
          <div class="sh-icon glow-cyan">📡</div>
          <h2 class="sh-title">بروتوكول الناقل (Routing Tags)</h2>
          <div class="line-decorator-purple"></div>
        </div>
        <p class="sh-desc">تقوم حاوية <code>Bus</code> بتصنيف الطلبات فور وصولها وتحديد مسارها إما للتعامل الداخلي أو التوجيه.</p>
        <div class="tags-grid">
          <div v-for="(tag, i) in messageTags" :key="i" class="tag-row glass-panel hover-glow-purple">
            <div class="tag-call" dir="ltr">{{ tag.call }}</div>
            <div class="tag-action">{{ tag.action }}</div>
          </div>
        </div>
      </section>

      <!-- Functions Section -->
      <section class="bus-section mt-10">
        <div class="section-header">
          <div class="sh-icon glow-orange">⚙️</div>
          <h2 class="sh-title">المسؤوليات الجوهرية (Core Responsibilities)</h2>
          <div class="line-decorator-purple"></div>
        </div>
        <div class="afp-list">
          <div v-for="fn in functions" :key="fn.id" class="fn-card glass-panel hover-glow-purple">
            <div class="fn-glow-purple"></div>
            <div class="fn-header">
              <span class="fn-id"># {{ fn.id }}</span>
              <div class="fn-icon">{{ fn.icon }}</div>
            </div>
            <div class="fn-content">
              <h2 class="fn-name">{{ fn.title }}</h2>
              <p class="fn-desc">{{ fn.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Files Section -->
      <section class="bus-section mt-10">
        <div class="section-header">
          <div class="sh-icon glow-yellow">📁</div>
          <h2 class="sh-title">البنية البرمجية (Source Files)</h2>
          <div class="line-decorator-purple"></div>
        </div>
        <div class="files-list">
          <div v-for="file in files" :key="file.id" class="file-card glass-panel hover-border-purple">
            <div class="file-top-bar-purple"></div>
            <div class="file-header">
              <div class="file-icon-box">{{ file.icon }}</div>
              <div class="file-meta">
                <div class="file-name-row">
                  <h2 class="file-name" dir="ltr">{{ file.name }}</h2>
                  <span class="file-tag">{{ file.tag }}</span>
                </div>
                <code class="file-path" dir="ltr">{{ file.path }}</code>
              </div>
              <div class="file-size" dir="ltr">{{ file.size }}</div>
            </div>

            <p class="file-desc">{{ file.desc }}</p>

            <div class="highlights-block">
              <div class="block-label">🔍 المكونات الأساسية</div>
              <div class="highlights-grid">
                <div v-for="(h, i) in file.highlights" :key="i" class="hl-item glass-inset">
                  <span class="hl-label">{{ h.label }}</span>
                  <div class="hl-value">{{ h.value }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<style scoped>
.bus-root {
  position: relative;
  min-height: 100vh;
  padding: calc(var(--vp-nav-height) + 3rem) 1.5rem 8rem;
  font-family: 'Cairo', 'Inter', system-ui, sans-serif;
  color: #f8fafc;
  overflow: hidden;
  max-width: 1000px;
  margin: 0 auto;
}

/* ── Ambient Background ── */
.ambient-glow { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }
.glow-top { width: 800px; height: 800px; background: radial-gradient(circle, rgba(168, 85, 247, 0.08), transparent 70%); top: -200px; right: -200px; }
.glow-bottom { width: 900px; height: 900px; background: radial-gradient(circle, rgba(236, 72, 153, 0.06), transparent 70%); bottom: -300px; left: -300px; }
.grid-bg { position: absolute; inset: 0; z-index: 0; background-image: linear-gradient(rgba(168, 85, 247, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.05) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }

/* ── Glass Components ── */
.glass-panel { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3); }
.glass-inset { background: rgba(0, 0, 0, 0.3); box-shadow: inset 0 2px 8px rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05); }

/* Hover Effects (Purple/Pink Theme) */
.hover-glow-purple:hover { border-color: rgba(192, 132, 252, 0.4); box-shadow: 0 10px 40px rgba(168, 85, 247, 0.15); transform: translateY(-2px); }
.hover-border-purple:hover { border-color: rgba(192, 132, 252, 0.5); box-shadow: 0 15px 40px rgba(0,0,0,0.4); transform: translateY(-4px); }
.mt-6 { margin-top: 1.5rem; }
.mt-10 { margin-top: 5rem; }
.mt-4 { margin-top: 1rem; }
.opacity-50 { opacity: 0.4; filter: grayscale(1); }

/* ── Header ── */
.bus-header { position: relative; z-index: 1; text-align: center; margin-bottom: 5rem; }
.bus-badge-container { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
.bus-badge { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.2em; color: rgba(248, 250, 252, 0.9); border: 1px solid rgba(236, 72, 153, 0.4); border-radius: 100px; padding: 0.6rem 1.5rem; background: rgba(236, 72, 153, 0.1); backdrop-filter: blur(12px); box-shadow: 0 0 20px rgba(236, 72, 153, 0.2); }
.matrix-badge { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em; color: #d8b4fe; border-radius: 100px; padding: 0.6rem 1.5rem; background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.4); }
.glow-purple-box { box-shadow: 0 0 25px rgba(168, 85, 247, 0.25); }
.badge-pulse { width: 8px; height: 8px; border-radius: 50%; background: #f472b6; box-shadow: 0 0 12px #f472b6, 0 0 20px #f472b6; animation: pulse-pink 2s infinite; }
@keyframes pulse-pink { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } }

/* Bus Animated Icon */
.bus-icon-wrapper { position: relative; width: 140px; height: 140px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; }
.nexus-core { position: absolute; inset: 25px; border-radius: 50%; background: radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%); box-shadow: 0 0 40px rgba(168, 85, 247, 0.4); animation: pulse-core 2s ease-in-out infinite alternate; }
.data-ring { position: absolute; border: 2px solid transparent; border-radius: 50%; }
.ring-1 { inset: -5px; border-top-color: rgba(192, 132, 252, 0.8); border-left-color: rgba(192, 132, 252, 0.2); animation: spin-slow 8s linear infinite; }
.ring-2 { inset: -20px; border-bottom-color: rgba(236, 72, 153, 0.8); border-right-color: rgba(236, 72, 153, 0.2); animation: spin-rev 10s linear infinite; }
.ring-3 { inset: -35px; border: 1px dashed rgba(255,255,255,0.2); animation: spin-slow 15s linear infinite; }
.bus-main-icon { font-size: 4.5rem; z-index: 2; filter: drop-shadow(0 0 15px rgba(255,255,255,0.8)); }
@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes spin-rev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
@keyframes pulse-core { from { transform: scale(0.9); opacity: 0.6; } to { transform: scale(1.1); opacity: 1; } }

.bus-title { font-size: clamp(3rem, 7vw, 4.5rem); font-weight: 900; line-height: 1.2; margin: 0 0 1.5rem; letter-spacing: -0.02em; }
.gradient-text-white { background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.gradient-text-purple { background: linear-gradient(135deg, #c084fc 0%, #ec4899 50%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 0 30px rgba(192,132,252,0.4)); }
.bus-subtitle { font-size: 1.25rem; color: rgba(248, 250, 252, 0.75); max-width: 800px; margin: 0 auto 3rem; line-height: 1.8; }

.bus-stats-bar { display: flex; align-items: center; justify-content: center; gap: 2rem; padding: 1.2rem 2.5rem; background: linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 100px; backdrop-filter: blur(24px); width: fit-content; margin: 0 auto; box-shadow: 0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1); flex-wrap: wrap; }
.stat-pill { display: flex; align-items: center; gap: 0.85rem; font-size: 1rem; }
.stat-icon { font-size: 1.3rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); }
.stat-val { font-weight: 900; color: #fff; letter-spacing: 0.05em; }
.stat-tag { font-size: 0.75rem; padding: 0.3rem 0.75rem; border-radius: 8px; background: rgba(192, 132, 252, 0.2); color: #e9d5ff; font-weight: 800; border: 1px solid rgba(192, 132, 252, 0.4); text-transform: uppercase; }
.bg-purple { background: rgba(236, 72, 153, 0.2); color: #fbcfe8; border-color: rgba(236, 72, 153, 0.4); }
.stat-divider { width: 2px; height: 30px; background: rgba(255,255,255,0.1); border-radius: 2px; }

/* ── Content Sections ── */
.bus-content { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 2rem; }
.section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; position: relative; }
.sh-icon { font-size: 1.8rem; background: rgba(255,255,255,0.05); width: 55px; height: 55px; display: flex; align-items: center; justify-content: center; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); position: relative; z-index: 2; }
.glow-purple { box-shadow: 0 0 20px rgba(168,85,247,0.3); border-color: rgba(168,85,247,0.5); }
.glow-pink { box-shadow: 0 0 20px rgba(236,72,153,0.3); border-color: rgba(236,72,153,0.5); }
.glow-cyan { box-shadow: 0 0 20px rgba(34,211,238,0.3); border-color: rgba(34,211,238,0.5); }
.glow-orange { box-shadow: 0 0 20px rgba(249,115,22,0.3); border-color: rgba(249,115,22,0.5); }
.glow-yellow { box-shadow: 0 0 20px rgba(234,179,8,0.3); border-color: rgba(234,179,8,0.5); }

.sh-title { font-size: 2rem; font-weight: 900; color: #fff; margin: 0; z-index: 2; letter-spacing: -0.02em; }
.line-decorator-purple { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(192,132,252,0.3), transparent); z-index: 1; margin-left: 1rem; }
.sh-desc { font-size: 1.1rem; color: rgba(248,250,252,0.65); margin: 0 0 2rem 5rem; }

/* ── Philosophical Note ── */
.philosophical-note-bus { display: flex; gap: 1.5rem; padding: 1.5rem 2rem; border-radius: 16px; border-right: 4px solid #c084fc; align-items: flex-start; }
.pn-icon { font-size: 2.5rem; flex-shrink: 0; filter: drop-shadow(0 0 10px rgba(192,132,252,0.4)); }
.pn-text { font-size: 1.05rem; line-height: 1.8; color: rgba(248,250,252,0.85); }
.pn-text strong { display: block; font-size: 1.2rem; color: #e9d5ff; margin-bottom: 0.5rem; }

/* ── The Nexus Visualizer ── */
.nexus-visualizer { padding: 3rem; border-radius: 24px; position: relative; overflow: hidden; background: rgba(15,23,42,0.7); }
.matrix-container { display: flex; justify-content: space-between; align-items: center; width: 100%; max-width: 800px; margin: 0 auto; position: relative; font-family: 'Inter', system-ui, sans-serif; }

.matrix-node { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.25rem; border-radius: 16px; background: rgba(30,41,59,0.9); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 20px rgba(0,0,0,0.3); transition: all 0.3s; position: relative; z-index: 2; }
.matrix-node:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0,0,0,0.4); }
.node-icon { font-size: 2rem; z-index: 2; }
.node-text { display: flex; flex-direction: column; z-index: 2; }
.node-title { font-weight: 900; font-size: 1.1rem; color: #fff; }
.node-ar-title { font-family: 'Cairo', sans-serif; font-size: 0.85rem; font-weight: 700; color: #d8b4fe; margin-top: 0.1rem; }
.node-sub { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: rgba(255,255,255,0.5); margin-top: 0.2rem; }

/* Columns */
.apps-column { display: flex; flex-direction: column; gap: 1rem; }
.center-column { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.vaults-column { display: flex; flex-direction: column; gap: 1rem; }

/* Specific Nodes */
.app-node { border-left: 3px solid #cbd5e1; }
.bus-node { background: rgba(168,85,247,0.15); border-color: rgba(168,85,247,0.5); padding: 1.5rem 2rem; position: relative; }
.bus-ring-bg { position: absolute; inset: -10px; border: 1px dashed rgba(192,132,252,0.3); border-radius: 24px; animation: spin-slow 20s linear infinite; }
.pulse-purple { box-shadow: 0 0 40px rgba(168,85,247,0.3); }
.pulse-purple .node-title { color: #e9d5ff; font-size: 1.3rem; }
.internal-ops { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem; z-index: 2; }
.op-badge { font-family: 'Space Mono', monospace; font-size: 0.7rem; background: rgba(168,85,247,0.2); color: #fbcfe8; padding: 0.3rem 0.6rem; border-radius: 6px; border: 1px solid rgba(168,85,247,0.3); text-align: center; }

.vault-node { min-width: 170px; }
.yellow-glow { border-color: rgba(234,179,8,0.5); box-shadow: inset 0 0 15px rgba(234,179,8,0.1); }
.yellow-glow .node-ar-title { color: #fef08a; }
.blue-glow { border-color: rgba(59,130,246,0.5); box-shadow: inset 0 0 15px rgba(59,130,246,0.1); }
.blue-glow .node-ar-title { color: #bfdbfe; }
.red-glow { border-color: rgba(239,68,68,0.3); }
.red-glow .node-ar-title { color: #fecaca; }

/* Flow Paths */
.flow-paths { position: relative; flex: 1; min-width: 60px; display: flex; align-items: center; z-index: 1; }
.flow-svg { width: 100%; height: 100%; min-height: 150px; overflow: visible; }
.flow-line { fill: none; stroke-width: 4; stroke-dasharray: 6,6; }
.in-line { stroke: rgba(192,132,252,0.6); }
.out-line { stroke: rgba(236,72,153,0.6); }
.packet { fill: #fff; filter: drop-shadow(0 0 6px #fff); }
.in-packet { fill: #c084fc; filter: drop-shadow(0 0 10px #c084fc); }
.out-packet { fill: #ec4899; filter: drop-shadow(0 0 10px #ec4899); }

/* ── Terminal Window ── */
.terminal-window { border-radius: 16px; overflow: hidden; padding: 0; }
.tw-header { display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1.25rem; background: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(255,255,255,0.1); }
.tw-dots { display: flex; gap: 8px; }
.tw-dots span { width: 14px; height: 14px; border-radius: 50%; }
.tw-dots span:nth-child(1) { background: #ff5f56; }
.tw-dots span:nth-child(2) { background: #ffbd2e; }
.tw-dots span:nth-child(3) { background: #27c93f; }
.tw-title { font-family: 'Space Mono', monospace; font-size: 0.85rem; color: rgba(255,255,255,0.5); font-weight: 700; }
.tw-action { font-family: 'Space Mono', monospace; font-size: 0.8rem; color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.1); padding: 0.2rem 0.6rem; border-radius: 6px; }
.tw-body { padding: 2rem; font-family: 'Space Mono', monospace; font-size: 0.95rem; line-height: 1.7; background: rgba(0,0,0,0.3); overflow-x: auto; }
.tw-line { margin-bottom: 0.35rem; text-shadow: 0 0 5px rgba(255,255,255,0.1); }
.tw-cursor { display: inline-block; width: 10px; height: 18px; background: #fff; animation: blink 1s step-end infinite; margin-top: 1rem; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.text-gray-400 { color: #94a3b8; }
.text-gray-500 { color: #64748b; }
.text-purple-400 { color: #c084fc; text-shadow: 0 0 10px rgba(192,132,252,0.4); }
.text-purple-300 { color: #d8b4fe; }
.text-pink-400 { color: #f472b6; text-shadow: 0 0 10px rgba(244,114,182,0.4); }
.text-green-400 { color: #4ade80; }

/* ── Tags Grid ── */
.tags-grid { display: flex; flex-direction: column; gap: 0.75rem; }
.tag-row { display: flex; align-items: center; gap: 1.5rem; padding: 1.25rem 1.75rem; border-radius: 16px; transition: all 0.3s ease; }
.tag-call { flex-basis: 280px; flex-shrink: 0; font-family: 'Space Mono', monospace; font-size: 0.9rem; font-weight: 800; color: #c084fc; background: rgba(192,132,252,0.1); padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid rgba(192,132,252,0.2); text-align: center; }
.tag-action { flex: 1; font-size: 1.05rem; color: rgba(248,250,252,0.9); line-height: 1.7; }

/* ── Functions List ── */
.afp-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 1.5rem; }
.fn-card { border-radius: 20px; padding: 2rem; display: flex; flex-direction: column; gap: 1.25rem; transition: all 0.4s ease; position: relative; overflow: hidden; }
.fn-header { display: flex; align-items: center; gap: 1rem; }
.fn-id { font-size: 0.8rem; font-weight: 900; color: #c084fc; background: rgba(192,132,252,0.15); padding: 0.3rem 0.75rem; border-radius: 8px; border: 1px solid rgba(192,132,252,0.3); }
.fn-icon { font-size: 2.5rem; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4)); }
.fn-name { font-size: 1.3rem; font-weight: 900; color: #fff; margin: 0; line-height: 1.4; }
.fn-desc { font-size: 1.05rem; line-height: 1.7; color: rgba(248,250,252,0.8); margin: 0; }
.fn-glow-purple { position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: rgba(192,132,252,0.2); filter: blur(40px); border-radius: 50%; }

/* ── Files List ── */
.files-list { display: flex; flex-direction: column; gap: 2rem; }
.file-card { border-radius: 24px; padding: 2.5rem; position: relative; overflow: hidden; transition: all 0.4s ease; }
.file-top-bar-purple { position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, transparent, rgba(192,132,252,0.8), transparent); }
.file-header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; }
.file-icon-box { font-size: 3rem; width: 70px; height: 70px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 20px rgba(255,255,255,0.02); }
.file-meta { flex: 1; }
.file-name-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; flex-wrap: wrap; }
.file-name { font-size: 1.8rem; font-weight: 900; color: #fff; margin: 0; font-family: 'Space Mono', monospace; }
.file-tag { font-size: 0.8rem; font-weight: 800; padding: 0.3rem 1rem; border-radius: 8px; background: rgba(192,132,252,0.15); color: #e9d5ff; border: 1px solid rgba(192,132,252,0.4); text-transform: uppercase; }
.file-path { font-family: 'Space Mono', monospace; font-size: 0.95rem; color: #e9d5ff; background: rgba(192,132,252,0.1) !important; padding: 0.3rem 0.8rem !important; border-radius: 8px; border: 1px solid rgba(192,132,252,0.2); }
.file-size { font-size: 1rem; color: rgba(255,255,255,0.5); font-weight: 800; background: rgba(0,0,0,0.3); padding: 0.5rem 1rem; border-radius: 12px; }
.file-desc { font-size: 1.1rem; line-height: 1.8; color: rgba(248,250,252,0.85); margin: 0 0 2rem; padding: 1.5rem; background: rgba(0,0,0,0.3); border-radius: 16px; border-right: 4px solid #c084fc; }
.block-label { font-size: 0.9rem; font-weight: 900; color: rgba(255,255,255,0.6); letter-spacing: 0.1em; margin-bottom: 1.25rem; text-transform: uppercase; }
.highlights-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
.hl-item { display: flex; flex-direction: column; gap: 0.6rem; border-radius: 12px; padding: 1rem 1.25rem; transition: border-color 0.3s ease; }
.hl-label { font-size: 0.8rem; font-weight: 800; color: rgba(255,255,255,0.5); text-transform: uppercase; }
.hl-value { font-family: 'Cairo', 'Space Mono', monospace; font-size: 0.95rem; font-weight: 700; color: #fbcfe8; line-height: 1.6; word-wrap: break-word; }

@media (max-width: 900px) {
  .afp-list { grid-template-columns: 1fr; }
  .bus-stats-bar { flex-direction: column; border-radius: 24px; gap: 1rem; padding: 1.5rem 3rem; }
  .stat-divider { display: none; }
  .tag-row { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .tag-call { width: 100%; flex-basis: auto; }
  .matrix-container { flex-direction: column; gap: 2rem; }
  .flow-paths { display: none; }
}
@media (max-width: 640px) {
  .file-header { flex-direction: column; align-items: flex-start; }
  .file-size { align-self: flex-start; }
  .highlights-grid { grid-template-columns: 1fr; }
  .sh-desc { margin-left: 0; }
  .philosophical-note-bus { flex-direction: column; }
}
</style>
