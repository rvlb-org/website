<script setup>
import { ref } from 'vue'

const files = [
  {
    id: '01', name: 'main.rs', path: 'containers/desktop/src/main.rs', icon: '🚀', tag: 'Entry Point', size: '283 سطر',
    desc: 'نقطة الدخول الفعلية للحاوية. يستقبل إحداثيات الـ Framebuffer من Init عبر IPC، يجلب Token من Auth_Vault، يهيئ UIState في static storage، ثم يدخل في حلقة أحداث لا نهائية تعالج الماوس والكيبورد.',
    highlights: [
      { label: 'حلقة الأحداث', value: 'tag 0x0300 = MouseEvent, 0x0301 = KeyboardEvent' },
      { label: 'المخصص الثابت', value: 'VAULT_HEAP [u8; 256KB] عبر talc' }
    ]
  },
  {
    id: '02', name: 'wm/compositor.rs', path: 'containers/desktop/src/desktop_ui/wm/compositor.rs', icon: '🎨', tag: 'Compositor', size: '~200 سطر',
    desc: 'قلب نظام الرسم. يرسم كل الطبقات بالترتيب: الخلفية، ثم النوافذ حسب Z-Order، ثم شريط المهام والـ Dock، ثم المؤشر في الأعلى. يدعم رسم نافذة واحدة (render_window) لتجنب الوميض.',
    highlights: [
      { label: 'رسم كامل', value: 'Compositor::render(fb, state, zstack)' },
      { label: 'رسم نافذة واحدة', value: 'Compositor::render_window(fb, state, win_id)' }
    ]
  },
  {
    id: '03', name: 'desktop_ui/mod.rs', path: 'containers/desktop/src/desktop_ui/mod.rs', icon: '💾', tag: 'UI State', size: '~150 سطر',
    desc: 'يعرّف هيكل UIState المركزي المخزن في static mut. يحتوي على حالة كل النوافذ، الـ ZOrderStack، شريط المهام، حالة السحب، مؤشر الماوس، وقنوات IPC. كل شيء بدون تخصيص ديناميكي.',
    highlights: [
      { label: 'حالة ثابتة', value: 'static mut UI_STORAGE_BYTES في main.rs' },
      { label: 'إعداد الحجم', value: 'UIState::init(ptr, fs_ep, token, ipc_buf)' }
    ]
  },
  {
    id: '04', name: 'wm/zorder.rs', path: 'containers/desktop/src/desktop_ui/wm/zorder.rs', icon: '🥞', tag: 'Window Layering', size: '~80 سطر',
    desc: 'يدير ZOrderStack الذي يحدد ترتيب رسم النوافذ. عند النقر على نافذة يتم استدعاء bring_to_front لنقلها لقمة المكدس فترسم آخراً وتظهر فوق الجميع. يدعم rebuild_from_open لإعادة بناء الترتيب.',
    highlights: [
      { label: 'رفع النافذة', value: 'bring_to_front(window_id)' },
      { label: 'إعادة البناء', value: 'rebuild_from_open(is_open)' }
    ]
  },
  {
    id: '05', name: 'wm/taskbar.rs', path: 'containers/desktop/src/desktop_ui/wm/taskbar.rs', icon: '📋', tag: 'Taskbar', size: '~120 سطر',
    desc: 'يدير شريط المهام السفلي: تسجيل التطبيقات المفتوحة، حساب تخطيط الأزرار، ومعالجة النقر لتفعيل أو تصغير النوافذ. يتكيف مع أي دقة شاشة عبر set_screen.',
    highlights: [
      { label: 'تسجيل تطبيق', value: 'taskbar.register(window_id, label)' },
      { label: 'معالجة النقر', value: 'taskbar.on_click(cx, cy) -> Option<Option<usize>>' }
    ]
  },
  {
    id: '06', name: 'wm/shortcut.rs', path: 'containers/desktop/src/desktop_ui/wm/shortcut.rs', icon: '🖱️', tag: 'Desktop Shortcuts', size: '~100 سطر',
    desc: 'يدير أيقونات سطح المكتب (Shortcuts) المرسومة على الخلفية. يخزن اسم التطبيق، مساره، ومعرّف الأيقونة. يدعم hit-testing للتحقق من النقر على أيقونة معينة.',
    highlights: [
      { label: 'اكتشاف النقر', value: 'shortcut.hit(cx, cy) -> bool' },
      { label: 'إيجاد المنقور عليه', value: 'find_hit(cx, cy) -> Option<usize>' }
    ]
  },
  {
    id: '07', name: 'desktop_ui/draw.rs', path: 'containers/desktop/src/desktop_ui/draw.rs', icon: '✏️', tag: 'Drawing', size: '~250 سطر',
    desc: 'مكتبة الرسم المركزية للـ UI. تحتوي على دوال رسم الـ Dock بتأثير تكبير ديناميكي عند التحوم (Zoom on Hover)، شريط المهام، قائمة Start، وأيقونات الاختصارات بجميع أنواعها.',
    highlights: [
      { label: 'الـ Dock', value: 'draw_dock_only(fb, state) مع dock_icon_size()' },
      { label: 'أيقونات مخصصة', value: 'icon_terminal / icon_vault / icon_files / icon_tor' }
    ]
  },
  {
    id: '08', name: 'cursor.rs', path: 'containers/desktop/src/cursor.rs', icon: '🖱️', tag: 'Cursor', size: '~60 سطر',
    desc: 'يدير مؤشر الماوس بتقنية save/restore: قبل رسم المؤشر يحفظ الـ pixels التي ستُغطى في CURSOR_BG static، وعند الحركة يعيدها ثم يرسم المؤشر في الموضع الجديد لمنع التلف البصري.',
    highlights: [
      { label: 'حفظ الخلفية', value: 'save_bg(fb, cx, cy, bg: &mut [Rgb888])' },
      { label: 'الرسم والاستعادة', value: 'draw_cursor() / restore_bg()' }
    ]
  },
  {
    id: '09', name: 'desktop_ui/drag.rs', path: 'containers/desktop/src/desktop_ui/drag.rs', icon: '🤚', tag: 'Drag & Drop', size: '~50 سطر',
    desc: 'يدير حالة السحب (Drag) للنوافذ وشريط التمرير. يتتبع DragTarget (WindowMove أو FilesScrollbar) ويحسب الإزاحة (Δx, Δy) لتحريك النوافذ أو تمرير محتوى نافذة الملفات بسلاسة.',
    highlights: [
      { label: 'هدف السحب', value: 'DragTarget::WindowMove(id) | FilesScrollbar(id)' },
      { label: 'الحالة', value: 'drag.active() -> bool' }
    ]
  },
  {
    id: '10', name: 'window.rs + window_draw.rs', path: 'containers/desktop/src/desktop_ui/', icon: '🪟', tag: 'Windows', size: 'ملفان مترابطان',
    desc: 'window.rs يعرّف هيكل Window (العنوان، الأبعاد، نوع المحتوى، حالة التعظيم). window_draw.rs يرسم إطار النافذة مع شريط العنوان وأزرار التحكم الثلاثة (إغلاق، تصغير، تعظيم) باستخدام eg-fb.',
    highlights: [
      { label: 'اكتشاف الأزرار', value: 'in_titlebar / in_close_btn / in_maximize_btn' },
      { label: 'أنواع النوافذ', value: 'Calc, Files, Editor, Viewer, Terminal' }
    ]
  }
]

const libraries = [
  { id: '01', name: 'eg-fb', path: 'libs/eg-fb', tag: 'Graphics Engine', is_external: false, desc: 'مكتبتنا. غلاف فوق embedded-graphics يتيح الرسم المباشر والآمن على الـ MMIO Framebuffer. تستخدم EgDisplay struct الذي يعمل مع أشكال هندسية ونصوص بدون heap.' },
  { id: '02', name: 'ipc-sync', path: 'libs/ipc-sync', tag: 'IPC', is_external: false, desc: 'مكتبتنا. تستقبل أحداث الماوس (0x0300) والكيبورد (0x0301) من حاوية Input، وترسل أوامر فتح البرامج عبر IpcMessage و Channel.' },
  { id: '03', name: 'sel4-sys', path: 'libs/sel4-sys', tag: 'seL4 Syscalls', is_external: false, desc: 'مكتبتنا. تغليف استدعاءات نواة seL4 الحرجة (seL4_NBRecv, seL4_Yield) واستدعاءات الطباعة المبكرة (print_str).' },
  { id: '04', name: 'ps2-driver', path: 'libs/ps2-driver', tag: 'Input Parsing', is_external: false, desc: 'مكتبتنا. تحلل حزم بيانات PS/2 القادمة عبر IPC وتترجمها لإحداثيات ماوس دقيقة وأحرف كيبورد قابلة للاستخدام مباشرة.' },
  { id: '05', name: 'pkg-format', path: 'libs/pkg-format', tag: 'App Packages', is_external: false, desc: 'مكتبتنا. تعريف صيغة حزم التطبيقات الخاصة بنا (.pkg). يستخدمها الديسكتوب لتحميل بيانات التطبيقات من نظام الملفات وتشغيلها.' },
  { id: '06', name: 'calc_ui / files_ui / editor_ui / viewer_ui', path: 'programs/{calc,files,editor,viewer}', tag: 'Built-in Apps', is_external: false, desc: 'برامجنا المدمجة المُضمّنة مباشرة في ثنائي الديسكتوب. كل برنامج يُضاف كـ Rust crate داخلي (package alias) يمكن استدعاؤه مباشرة دون IPC إضافي.' },
  { id: '07', name: 'talc', path: 'crates.io (v4)', tag: 'Memory Allocator', is_external: true, desc: 'مخصص ذاكرة خارجي خفيف الوزن للبيئات no_std. يُستخدم لإدارة الـ VAULT_HEAP (256KB ثابت في BSS) مع ClaimOnOom للعمل بأمان في بيئات بدون نظام تشغيل.' },
  { id: '08', name: 'heapless', path: 'crates.io (v0.8)', tag: 'Static Collections', is_external: true, desc: 'توفر هياكل بيانات (Vec, String) بحجم ثابت محدد وقت الترجمة. تُمكّن تخزين النوافذ وقوائم التطبيقات بدون أي تخصيص ديناميكي في حلقة الأحداث الحرجة.' },
  { id: '09', name: 'spin', path: 'crates.io (v0.9)', tag: 'Locking', is_external: true, desc: 'يوفر Mutex دوّار (spinlock) لبيئات no_std. يُستخدم مع talc لحماية ALLOCATOR في حال وجود تزامن مستقبلي، رغم أن الحاوية حالياً أحادية الخيط.' }
]

const functions = [
  { name: 'rust_main(ipc_buffer_vaddr, endpoint_slot)', desc: 'نقطة الدخول الفعلية. تستقبل معلومات الـ Framebuffer من Init، تجلب Token من Auth_Vault، تهيئ UIState وتبدأ حلقة أحداث الماوس/الكيبورد.' },
  { name: 'UIState::init(ptr, fs_ep, token, ipc_buf)', desc: 'تهيّء الـ UIState كاملاً في مساحة static بدون heap. تضبط مدير النوافذ، قائمة الاختصارات، وقناة FS IPC.' },
  { name: 'UIState::on_mouse_move(cx, cy) -> MouseMoveRedraw', desc: 'تحدّث إحداثيات المؤشر وتحسب ما إذا كان يجب إعادة رسم كامل (Full) أو نافذة واحدة (Window) أو لا شيء (None). تدير أيضاً حالة السحب (Drag) إذا كانت مفعلة.' },
  { name: 'UIState::on_press(cx, cy) / on_release()', desc: 'on_press يكتشف النقر على النافذة، الـ Dock، أو الاختصارات ويرفع النافذة المنقورة للمقدمة. on_release يُنهي حالة السحب.' },
  { name: 'UIState::on_release_with_launch(slot, ibuf)', desc: 'عند رفع زر الماوس بعد نقرة مزدوجة: يرسل IPC لتشغيل التطبيق عبر launch_slot المرسل من Init.' },
  { name: 'UIState::on_drag(cx, cy) -> bool', desc: 'تحرّك النافذة المحددة أو تمرر محتوى نافذة الملفات (Scrollbar) بحسب DragTarget المحدد.' },
  { name: 'UIState::on_key(ch: char) -> bool', desc: 'تمرر أحرف الكيبورد إلى النافذة المحددة (Focused Window) التي قد تكون Calculator أو Editor.' },
  { name: 'UIState::sync_desktop() / tick_pending_fetches()', desc: 'تزامن دوري (كل 80 حدث ماوس) مع نظام الملفات لجلب التطبيقات الجديدة وعرض أيقوناتها على سطح المكتب.' },
  { name: 'Compositor::render(fb, state, zstack)', desc: 'يرسم الشاشة بالكامل بالترتيب الصحيح: الخلفية، ثم النوافذ حسب Z-Order، ثم الـ Dock وشريط المهام.' },
  { name: 'Compositor::render_window(fb, state, win_id)', desc: 'يعيد رسم نافذة واحدة فقط (تحسين مهم لمنع الوميض عند تمرير شريط التمرير أو تحديث المحتوى).' },
  { name: 'cursor::save_bg / draw_cursor / restore_bg', desc: 'مثلث إدارة المؤشر: حفظ الـ pixels خلف المؤشر في CURSOR_BG static، رسم المؤشر، ثم استعادة الخلفية عند الحركة لمنع التلف البصري.' },
  { name: 'draw::draw_dock_only(fb, state)', desc: 'يرسم الـ Dock السفلي مع تأثير التكبير الديناميكي (Zoom on Hover): الأيقونات القريبة من المؤشر تكبر تدريجياً عبر dock_icon_size().' }
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
        <h2 class="sh-title glow-text-blue">مسار تدفق الأحداث</h2>
        <p class="sh-badge-en">Event Pipeline</p>
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

    <!-- ── قسم 1: التواصل مع الحاويات الأخرى ── -->
    <section class="d-section mt-16">
      <div class="section-header text-center">
        <h2 class="sh-title glow-text-blue">التواصل مع الحاويات</h2>
        <p class="sh-badge-en">Container Connections</p>
        <p class="sh-subtitle">مع من تتحدث حاوية الديسكتوب وماذا تطلب؟</p>
      </div>
      <div class="conn-grid mt-10" dir="ltr">
        <div class="conn-card glass-panel glow-blue-box">
          <div class="conn-arrow">⬅️</div>
          <div class="conn-info">
            <span class="conn-name">Init</span>
            <span class="conn-detail">يستقبل: fb_vaddr, fb_w, fb_h, fb_pitch, fb_bpp, launch_slot</span>
          </div>
        </div>
        <div class="conn-card glass-panel glow-green-box">
          <div class="conn-arrow">⬅️</div>
          <div class="conn-info">
            <span class="conn-name">Auth_Vault</span>
            <span class="conn-detail">يطلب Token (0x100) لاستخدامه مع FS_Vault</span>
          </div>
        </div>
        <div class="conn-card glass-panel glow-purple-box">
          <div class="conn-arrow">⬅️➡️</div>
          <div class="conn-info">
            <span class="conn-name">FS_Vault (ep=2)</span>
            <span class="conn-detail">يجلب قائمة ملفات Desktop ويحدّثها كل 80 حدث ماوس</span>
          </div>
        </div>
        <div class="conn-card glass-panel glow-pink-box">
          <div class="conn-arrow">⬅️</div>
          <div class="conn-info">
            <span class="conn-name">Input_Vault (ep=0)</span>
            <span class="conn-detail">يستقبل: 0x0300=MouseEvent, 0x0301=KeyboardEvent</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── قسم 2: البرامج المدمجة ── -->
    <section class="d-section mt-16">
      <div class="section-header text-center">
        <h2 class="sh-title glow-text-blue">البرامج المدمجة</h2>
        <p class="sh-badge-en">Built-in Applications</p>
        <p class="sh-subtitle">مدمجة مباشرة في ثنائي الديسكتوب — لا IPC إضافي</p>
      </div>
      <div class="apps-grid mt-10">
        <div class="app-card glass-panel hover-glow-purple">
          <div class="app-icon">🧮</div>
          <h3 class="app-name" dir="ltr">calc</h3>
          <p class="app-path" dir="ltr">programs/calc</p>
          <p class="app-desc">آلة حاسبة بواجهة نافذة كاملة مكتوبة بـ Rust</p>
        </div>
        <div class="app-card glass-panel hover-glow-purple">
          <div class="app-icon">📁</div>
          <h3 class="app-name" dir="ltr">files</h3>
          <p class="app-path" dir="ltr">programs/files</p>
          <p class="app-desc">متصفح ملفات يتواصل مع FS_Vault لعرض المجلدات والملفات</p>
        </div>
        <div class="app-card glass-panel hover-glow-purple">
          <div class="app-icon">✏️</div>
          <h3 class="app-name" dir="ltr">editor</h3>
          <p class="app-path" dir="ltr">programs/editor</p>
          <p class="app-desc">محرر نصوص بسيط يعمل داخل نافذة مع دعم الكيبورد الكامل</p>
        </div>
        <div class="app-card glass-panel hover-glow-purple">
          <div class="app-icon">🖼️</div>
          <h3 class="app-name" dir="ltr">viewer</h3>
          <p class="app-path" dir="ltr">programs/viewer</p>
          <p class="app-desc">عارض محتوى يقرأ الملفات من نظام الملفات ويعرضها في نافذة</p>
        </div>
      </div>
    </section>

    <!-- ── قسم 3: إحصائيات الحاوية ── -->
    <section class="d-section mt-16">
      <div class="section-header text-center">
        <h2 class="sh-title glow-text-blue">إحصائيات الحاوية</h2>
        <p class="sh-badge-en">Container Stats</p>
      </div>
      <div class="stats-grid mt-10">
        <div class="stat-card glass-panel glow-blue-box">
          <div class="stat-val-big text-purple">256 KB</div>
          <div class="stat-label">VAULT_HEAP (ثابت في BSS)</div>
        </div>
        <div class="stat-card glass-panel glow-green-box">
          <div class="stat-val-big text-green">283</div>
          <div class="stat-label">أسطر main.rs (نقطة الدخول)</div>
        </div>
        <div class="stat-card glass-panel glow-purple-box">
          <div class="stat-val-big text-purple">4</div>
          <div class="stat-label">تطبيقات مدمجة (calc, files, editor, viewer)</div>
        </div>
        <div class="stat-card glass-panel glow-pink-box">
          <div class="stat-val-big text-pink">9</div>
          <div class="stat-label">مكتبات في Cargo.toml</div>
        </div>
        <div class="stat-card glass-panel glow-blue-box">
          <div class="stat-val-big text-blue">80</div>
          <div class="stat-label">حدث ماوس بين كل تحديث لسطح المكتب</div>
        </div>
        <div class="stat-card glass-panel glow-green-box">
          <div class="stat-val-big text-green">0</div>
          <div class="stat-label">Dynamic Allocations في حلقة الأحداث</div>
        </div>
      </div>
    </section>

    <!-- ── قسم 4: ملاحظات الأداء ── -->
    <section class="d-section mt-16">
      <div class="section-header text-center">
        <h2 class="sh-title glow-text-blue">قرارات الأداء</h2>
        <p class="sh-badge-en">Performance Decisions</p>
      </div>
      <div class="perf-list mt-10">
        <div class="perf-item glass-panel">
          <div class="perf-icon">🎯</div>
          <div class="perf-content">
            <h4 class="perf-title">Single-Buffer Mode (بدون Double Buffer)</h4>
            <p class="perf-desc">نرسم مباشرة على MMIO Framebuffer بدلاً من إنشاء back-buffer في الذاكرة (كان سيستهلك ~3MB static في BSS). الثمن هو وميض خفيف أحياناً، والمكسب توفير كامل لذاكرة الـ BSS.</p>
          </div>
        </div>
        <div class="perf-item glass-panel">
          <div class="perf-icon">⚡</div>
          <div class="perf-content">
            <h4 class="perf-title">render_window() بدلاً من render() الكامل</h4>
            <p class="perf-desc">عند تمرير شريط الملفات أو تحديث محتوى نافذة واحدة، يُعاد رسم تلك النافذة فقط (Compositor::render_window) بدلاً من إعادة رسم الشاشة كاملاً، مما يمنع الوميض المرئي.</p>
          </div>
        </div>
        <div class="perf-item glass-panel">
          <div class="perf-icon">🖱️</div>
          <div class="perf-content">
            <h4 class="perf-title">تحديث الـ Dock كل 4 أحداث فقط</h4>
            <p class="perf-desc">تأثير تكبير أيقونات الـ Dock (Zoom on Hover) يُحسب في كل حدث ماوس ولكن يُرسم فقط كل 4 أحداث (loop_counter % 4 == 0) لتجنب استنزاف معالج الرسومات بإعادة رسم كاملة متكررة.</p>
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
.sh-title { font-size: 2.2rem; font-weight: 700; margin: 0; letter-spacing: 0.5px; }
.sh-badge-en { font-size: 0.95rem; font-family: monospace; font-weight: bold; color: #c084fc; letter-spacing: 2px; margin: 0.3rem 0 0; text-transform: uppercase; }
.sh-subtitle { font-size: 1.1rem; color: #94a3b8; margin-top: 0.4rem; }

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

/* ── Container Connections ── */
.conn-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.2rem; position: relative; z-index: 2; }
.conn-card { display: flex; align-items: center; gap: 1.2rem; padding: 1.2rem 1.5rem; border-radius: 14px; transition: transform 0.3s, box-shadow 0.3s; }
.conn-card:hover { transform: translateY(-3px); }
.conn-arrow { font-size: 1.5rem; flex-shrink: 0; }
.conn-info { display: flex; flex-direction: column; gap: 4px; }
.conn-name { font-size: 1.1rem; font-weight: 900; color: #fff; font-family: monospace; }
.conn-detail { font-size: 0.85rem; color: #94a3b8; line-height: 1.5; word-break: break-all; }

/* ── Built-in Apps ── */
.apps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; position: relative; z-index: 2; }
.app-card { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 2rem 1.5rem; border-radius: 16px; transition: transform 0.3s, box-shadow 0.3s; gap: 0.5rem; }
.app-icon { font-size: 3rem; margin-bottom: 0.5rem; }
.app-name { margin: 0; font-size: 1.3rem; font-weight: 900; color: #d8b4fe; font-family: monospace; }
.app-path { font-size: 0.8rem; color: #64748b; margin: 0; font-family: monospace; }
.app-desc { font-size: 0.95rem; color: #94a3b8; margin: 0; line-height: 1.6; }

/* ── Stats Grid ── */
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.2rem; position: relative; z-index: 2; }
.stat-card { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 2rem 1rem; border-radius: 16px; transition: transform 0.3s; }
.stat-card:hover { transform: translateY(-4px); }
.stat-val-big { font-size: 2.5rem; font-weight: 900; font-family: monospace; line-height: 1; margin-bottom: 0.75rem; }
.stat-label { font-size: 0.85rem; color: #94a3b8; line-height: 1.5; }
.text-purple { background: linear-gradient(135deg, #c084fc, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.text-green { background: linear-gradient(135deg, #4ade80, #22c55e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.text-blue { background: linear-gradient(135deg, #60a5fa, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.text-pink { background: linear-gradient(135deg, #f472b6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

/* ── Performance List ── */
.perf-list { display: flex; flex-direction: column; gap: 1.2rem; position: relative; z-index: 2; }
.perf-item { display: flex; align-items: flex-start; gap: 1.5rem; padding: 1.8rem 2rem; border-radius: 16px; border-right: 4px solid #a855f7; transition: transform 0.3s; }
.perf-item:hover { transform: translateX(-4px); }
.perf-icon { font-size: 2.2rem; flex-shrink: 0; }
.perf-content { flex: 1; }
.perf-title { margin: 0 0 0.6rem; font-size: 1.15rem; font-weight: 900; color: #e2e8f0; }
.perf-desc { margin: 0; font-size: 1rem; color: #94a3b8; line-height: 1.8; }

.d-section { position: relative; z-index: 2; }
.mt-16 { margin-top: 5rem; }

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
