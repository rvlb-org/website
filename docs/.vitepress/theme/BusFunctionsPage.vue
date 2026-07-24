<script setup>
const messageTags = [
  { call: 'Ping', action: 'يرد بـ Pong لفحص حيوية الناقل والاتصال.' },
  { call: 'CreateFile / WriteFile', action: 'يُمرّر مباشرة لـ FS_Vault لإنشاء أو الكتابة على ملف.' },
  { call: 'ReadFile', action: 'يُمرّر مباشرة لـ FS_Vault لقراءة محتوى ملف محدد.' },
  { call: 'DeleteFile / DeleteDir', action: 'يُمرّر مباشرة لـ FS_Vault لحذف ملف أو مجلد.' },
  { call: 'CreateDir / ListDir', action: 'يُمرّر مباشرة لـ FS_Vault لإنشاء مجلد جديد أو عرض محتوياته.' },
  { call: 'CopyFile', action: 'عملية مركبة: يطلب ReadFile للمصدر ثم WriteFile للوجهة، ويرد بالنتيجة.' },
  { call: 'MoveFile', action: 'عملية مركبة ثلاثية: يستدعي CopyFile ثم DeleteFile للأصل.' },
  { call: 'CreateShortcut', action: 'يغلف مسار الاختصار وينشئ ملف .vlk في سطح المكتب عبر FS_Vault.' },
  { call: 'DeleteShortcut', action: 'يحذف ملف الـ .vlk الخاص بالاختصار من سطح المكتب عبر FS_Vault.' },
  { call: 'RegisterApp', action: 'يكتب الملف التنفيذي للتطبيق في مسار النظام /home/user/apps/.' },
  { call: 'ClipboardCopy', action: 'ينسخ البيانات في الذاكرة الساكنة المحلية (بحد أقصى 256 بايت).' },
  { call: 'ClipboardPaste', action: 'يسترجع البيانات المخزنة من الذاكرة الساكنة ويرسلها للتطبيق الطالب.' },
  { call: 'ClipboardClear', action: 'يُصفّر المصفوفة الساكنة لمنع تسرب البيانات الحساسة.' },
  { call: 'NetConnect / NetRequest', action: 'مجهزة للرد حالياً (Placeholder) بانتظار ربط Tor_Vault.' },
  { call: '_ (Unknown)', action: 'يلتقط أي أمر غير معروف ويرد بـ Err لحماية النظام.' }
]

const functions = [
  {
    id: '01',
    icon: '🛤️',
    title: 'الناقل المركزي للرسائل (IPC Message Broker)',
    desc: 'الموزع الأساسي (Router) لكافة اتصالات النظام. يستلم رسائل التطبيقات عبر Slot 0 ويُوجّهها بدقة نحو الحاويات المسؤولة، مما يمنع التطبيقات من الاتصال العشوائي المباشر ببعضها البعض.'
  },
  {
    id: '02',
    icon: '🛡️',
    title: 'تمركز سياسة الأمان (Security Policy Enforcement)',
    desc: 'يعمل كحاجز أمني أولي؛ مستقبلاً سيعتمد على Auth_Vault (Slot 2) للتحقق من الصلاحيات (Capabilities / Permissions) قبل تمرير أي طلب، مما يوحد منطق الأمان في نقطة واحدة يصعب تجاوزها.'
  },
  {
    id: '03',
    icon: '📂',
    title: 'توجيه العمليات المباشرة (Direct File Ops Forwarding)',
    desc: 'يفحص الطلبات المباشرة (CreateFile, WriteFile, ReadFile, DeleteDir) ويقوم بتغليفها وتوجيهها بشفافية تامة إلى FS_Vault عبر Slot 1 مع انتظار النتيجة وتمريرها للمرسل.'
  },
  {
    id: '04',
    icon: '🧩',
    title: 'النسخ المتسلسل (Composite Op: CopyFile)',
    desc: 'تنفيذ عملية النسخ كعملية مركبة داخل الناقل؛ يقوم بإرسال طلب قراءة (ReadFile) للمصدر، ثم يقوم ببناء طلب كتابة (WriteFile) للوجهة، مقللاً العبء والتعقيد على تطبيق العميل.'
  },
  {
    id: '05',
    icon: '🔄',
    title: 'النقل الآمن (Composite Op: MoveFile)',
    desc: 'يضمن أمان البيانات أثناء النقل. يقوم بتنفيذ عملية النسخ أولاً، ولا يرسل طلب الحذف (DeleteFile) للملف الأصلي إلا بعد التأكد التام من نجاح عملية النسخ 100%.'
  },
  {
    id: '06',
    icon: '🔗',
    title: 'توليد اختصارات سطح المكتب (Shortcut Generation)',
    desc: 'يعالج طلبات CreateShortcut و DeleteShortcut لكتابة أو حذف ملفات التكوين الوصفية (.vlk) مباشرة في مجلد /home/user/Desktop/ لإنشاء بيئة مرئية للمستخدم.'
  },
  {
    id: '07',
    icon: '📦',
    title: 'تسجيل وتنصيب التطبيقات (App Registration)',
    desc: 'يتعامل مع طلبات RegisterApp لاستلام الملفات التنفيذية (Binaries) للتطبيقات وحقنها بمسار نظامي داخل /home/user/apps/ استعداداً لتنفيذها وإدارتها.'
  },
  {
    id: '08',
    icon: '📥',
    title: 'تخزين الحافظة المؤقت (Clipboard Copy & Storage)',
    desc: 'يُدير الحافظة المشتركة عبر مصفوفة ساكنة آمنة (Static Array) بحجم 256 بايت. يسمح بنسخ النصوص والبيانات السريعة وحفظها بشكل معزول تماماً عن ذاكرة التطبيقات.'
  },
  {
    id: '09',
    icon: '📤',
    title: 'الاسترجاع والتفريغ الآمن (Clipboard Paste & Clear)',
    desc: 'يتيح للتطبيقات استدعاء ClipboardPaste لتبادل البيانات المنسوخة، ويدعم ClipboardClear لتصفير الذاكرة المشتركة (Zeroing) لمنع تسرب البيانات الحساسة بعد استخدامها.'
  },
  {
    id: '10',
    icon: '🌐',
    title: 'بوابة التوجيه الشبكي (Network Gateway Placeholder)',
    desc: 'مُعد مسبقاً لاستقبال نداءات NetConnect و NetRequest؛ لتكون الخطوة القادمة هي توجيهها بشفافية نحو حاوية Tor_Vault المعزولة للاتصال المشفر الخارجي.'
  },
  {
    id: '11',
    icon: '🔌',
    title: 'إدارة منافذ القدرات (Capability Slots Management)',
    desc: 'يتولى التعامل الدقيق مع الـ Endpoint Slots الممنوحة له من الحاوية الأم (Init)، حيث يدير إرسال واستقبال مؤشرات الذاكرة IPC Buffers بكفاءة.'
  },
  {
    id: '12',
    icon: '⚠️',
    title: 'تمرير الأخطاء والتعافي (Error Propagation)',
    desc: 'القدرة على اكتشاف فشل العمليات الفرعية (مثل فشل القراءة أثناء النسخ) وإيقاف العملية المركبة فوراً مع إعادة رسالة خطأ موحدة (Err) للتطبيق، لضمان استقرار النظام.'
  }
]
</script>

<template>
  <div class="bfp-root">
    <!-- Ambient Glows -->
    <div class="bfp-root::before"></div>
    <div class="bfp-root::after"></div>

    <header class="bfp-header">
      <a href="/hisn/containers/bus/" class="back-link">
        <span class="back-arrow">←</span> حاوية bus
      </a>
      
      <h1 class="bfp-title">
        الوظائف التي تقوم بها <span class="gradient-text-yellow">bus</span>
      </h1>
      
      <p class="bfp-subtitle">
        حاوية <code>Bus_Vault</code> تمثل مركز العمليات (Message Broker). تستقبل الطلبات، وتدير التوجيه الآمن، وتنفذ العمليات المركبة والحافظة.
      </p>

      <div class="bfp-stats">
        <span class="stat-badge">{{ functions.length }} وظائف تخصصية</span>
        <span class="stat-badge stat-alt">{{ messageTags.length }} أمر استدعاء</span>
      </div>
    </header>

    <main class="bfp-content">
      <!-- Message Tags Section -->
      <section class="tags-section">
        <div class="section-header">
          <div class="sh-icon">📡</div>
          <h2 class="sh-title">دليل أوامر الاستدعاء (Message Tags)</h2>
        </div>
        <p class="sh-desc">هذه هي كافة النداءات التي يستقبلها الناقل من تطبيقات المستخدم وكيفية تفاعله معها لحظياً:</p>
        
        <div class="tags-grid">
          <div v-for="(tag, index) in messageTags" :key="index" class="tag-row">
            <div class="tag-call">{{ tag.call }}</div>
            <div class="tag-action">{{ tag.action }}</div>
          </div>
        </div>
      </section>

      <!-- Functions List -->
      <section class="funcs-section">
        <div class="section-header">
          <div class="sh-icon">⚙️</div>
          <h2 class="sh-title">المهام الأساسية والمركّبة للناقل</h2>
        </div>
        <div class="bfp-list">
          <div v-for="fn in functions" :key="fn.id" class="fn-card">
            <div class="fn-glow"></div>
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
    </main>
  </div>
</template>

<style scoped>
.bfp-root {
  position: relative;
  min-height: 100vh;
  padding: calc(var(--vp-nav-height) + 2.5rem) 1.5rem 6rem;
  max-width: 860px;
  margin: 0 auto;
  font-family: 'Cairo', 'Inter', system-ui, sans-serif;
  color: #f8fafc;
}

/* ── Ambient Glows ── */
.bfp-root::before {
  content: '';
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(234, 179, 8, 0.1), transparent 70%);
  filter: blur(80px);
  top: -100px; right: -200px;
  pointer-events: none; z-index: 0;
}
.bfp-root::after {
  content: '';
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.08), transparent 70%);
  filter: blur(80px);
  bottom: 100px; left: -150px;
  pointer-events: none; z-index: 0;
}

.bfp-header {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-bottom: 4rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #eab308;
  background: rgba(234, 179, 8, 0.1);
  padding: 0.4rem 1rem;
  border-radius: 100px;
  text-decoration: none !important;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(234, 179, 8, 0.2);
}
.back-link:hover {
  background: rgba(234, 179, 8, 0.2);
  transform: translateX(-4px);
}

.bfp-title {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 900;
  line-height: 1.3;
  margin: 0 0 1rem;
}
.gradient-text-yellow {
  background: linear-gradient(135deg, #eab308 0%, #facc15 50%, #fde047 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 15px rgba(234,179,8,0.3));
}

.bfp-subtitle {
  font-size: 1.15rem;
  color: rgba(248, 250, 252, 0.7);
  max-width: 650px;
  margin: 0 auto 2rem;
  line-height: 1.7;
}

.bfp-stats {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.stat-badge {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1.5rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  backdrop-filter: blur(10px);
}
.stat-alt {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
}

.bfp-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* ── Section Headers ── */
.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.sh-icon {
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.05);
  width: 50px; height: 50px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.sh-title {
  font-size: 1.8rem;
  font-weight: 900;
  color: #fff;
  margin: 0;
}
.sh-desc {
  font-size: 1rem;
  color: rgba(248, 250, 252, 0.7);
  margin: 0 0 2rem;
}

/* ── Tags Grid ── */
.tags-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 1rem;
}
.tag-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  transition: background 0.3s ease;
}
.tag-row:hover {
  background: rgba(59, 130, 246, 0.08);
}
.tag-call {
  flex-basis: 250px;
  flex-shrink: 0;
  font-family: 'Space Mono', monospace;
  font-size: 0.95rem;
  font-weight: 700;
  color: #38bdf8;
}
.tag-action {
  flex: 1;
  font-size: 0.95rem;
  color: rgba(248, 250, 252, 0.85);
  line-height: 1.6;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding-right: 1.5rem;
}

@media (max-width: 768px) {
  .tag-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 1rem;
  }
  .tag-call { flex-basis: auto; }
  .tag-action {
    border-right: none;
    padding-right: 0;
    border-top: 1px dashed rgba(255, 255, 255, 0.1);
    padding-top: 0.5rem;
  }
}

/* ── Functions List ── */
.bfp-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.fn-card {
  position: relative;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 1.75rem;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  backdrop-filter: blur(16px);
  overflow: hidden;
  transition: all 0.4s ease;
}
.fn-card:hover {
  transform: translateY(-3px) scale(1.01);
  border-color: rgba(234, 179, 8, 0.3);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.fn-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at left top,
    rgba(234, 179, 8, 0.08) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}
.fn-card:hover .fn-glow { opacity: 1; }

.fn-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  width: 60px;
}
.fn-id {
  font-size: 0.75rem;
  font-weight: 800;
  color: #eab308;
  background: rgba(234, 179, 8, 0.15);
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
}
.fn-icon {
  font-size: 2rem;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

.fn-content { flex: 1; }
.fn-name {
  font-size: 1.25rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.5rem;
  line-height: 1.4;
}
.fn-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(248, 250, 252, 0.75);
  margin: 0;
}

@media (max-width: 640px) {
  .fn-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
  }
  .fn-header {
    flex-direction: row-reverse;
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
