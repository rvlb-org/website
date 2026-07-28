<!-- PhoneCinematic.vue — Cinematic Journey for Phone Anatomy -->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['close'])

const concepts = [
  // Processing
  {
    id: 'soc', icon: '🧠', color: '#ff2a5f',
    shortTitle: 'SoC', title: 'النظام على شريحة (SoC)', subtitle: 'مبنى البلدية المجمع',
    group: 'processing',
    description: ['المبنى الحكومي المجمع الذي يضم المعالج المركزي (CPU)، المعالج الرسومي (GPU)، ووحدة المعالجة العصبية (NPU) في شريحة واحدة.']
  },
  {
    id: 'ram', icon: '⚡', color: '#00c3ff',
    shortTitle: 'الذواكر', title: 'RAM & Storage', subtitle: 'مكاتب الموظفين والمخازن',
    group: 'processing',
    description: ['الذاكرة العشوائية (RAM) هي المكاتب النشطة ذات الوصول الفوري، بينما التخزين (UFS/NVMe) هو الأرشيف الوطني الضخم الذي تُحفظ فيه الملفات للسنوات القادمة.']
  },

  // Modem & Connectivity
  {
    id: 'baseband', icon: '📡', color: '#6600ff',
    shortTitle: 'Baseband', title: 'معالج النطاق الأساسي', subtitle: 'العقل المدبر للمودم',
    group: 'modem',
    description: [
      'يأخذ البيانات الرقمية من معالج الهاتف (الصفر والواحد) ويقوم بتشفيرها وضغطها وتحويلها إلى بيانات جاهزة للبث عبر موجات الراديو، والعكس عند استقبال البيانات.'
    ]
  },
  {
    id: 'transceiver', icon: '📻', color: '#ff7700',
    shortTitle: 'RF Transceiver', title: 'جهاز الإرسال والاستقبال الراديوي', subtitle: 'جسر العالم الرقمي والتناظري',
    group: 'modem',
    description: [
      'يأخذ البيانات المجهزة من الـ Baseband، ويحولها إلى موجات كهرومغناطيسية تناظرية (Analog) للتردد المطلوب (مثلاً 5G أو 4G)، ثم يرسلها إلى المرحلة التالية.'
    ]
  },
  {
    id: 'rffe', icon: '🎛️', color: '#00e5ff',
    shortTitle: 'RFFE', title: 'الواجهة الأمامية للترددات الراديوية', subtitle: 'مضخمات ومحولات الإشارة',
    group: 'modem',
    description: [
      '<strong>مضخمات الطاقة (PA):</strong> تضخم الإشارة بقوة هائلة للسفر من هاتفك إلى برج الاتصالات.',
      '<strong>مضخمات منخفضة الضوضاء (LNA):</strong> تستقبل الإشارة الضعيفة جداً من البرج وتضخمها دون تضخيم التشويش.',
      '<strong>المرشحات (SAW & BAW):</strong> تحجب كل الترددات بالجو وتسمح فقط بتردد شبكتك بالمرور.',
      '<strong>المحولات (Switches):</strong> تسمح للهاتف بالإرسال والاستقبال في نفس الوقت دون تصادم.'
    ]
  },
  {
    id: 'tuner', icon: '🎚️', color: '#f5a623',
    shortTitle: 'Antenna Tuner', title: 'موالفات الهوائي', subtitle: 'التكيف الفوري مع الترددات',
    group: 'modem',
    description: [
      'شريحة تغير الخصائص الكهربائية للهوائي في أجزاء من الثانية ليتناسب مع التردد المطلوب في تلك اللحظة بالضبط، حيث لا يمكن تركيب هوائي بحجم مختلف لكل تردد.'
    ]
  },
  {
    id: 'envelope', icon: '🔋', color: '#7ed321',
    shortTitle: 'Envelope Tracking', title: 'شريحة تتبع غلاف الطاقة', subtitle: 'سر توفير طاقة الـ 5G',
    group: 'modem',
    description: [
      'تراقب قوة الإشارة المطلوبة، وتزود مضخمات الطاقة (PA) بالكهرباء "على قدر الحاجة بالمللي ثانية". إذا كان برج الاتصال قريباً، تقلل الكهرباء، وإذا كان بعيداً تزيدها.'
    ]
  },
  {
    id: 'antennas', icon: '📶', color: '#9013fe',
    shortTitle: 'الهوائيات و UWB', title: 'الهوائيات وشريحة UWB', subtitle: 'أبراج التقاط الإشارة والتتبع الدقيق',
    group: 'modem',
    description: [
      '<strong>الهوائيات (Antennas):</strong> أبراج الراديو الموزعة على الإطار المعدني (للـ 5G، WiFi، Bluetooth، و GPS).',
      '<strong>النطاق فائق العرض (UWB):</strong> شريحة تواصل دقيقة تُستخدم للتتبع المكاني الدقيق (كـ AirTags) والمشاركة القريبة.'
    ]
  },

  // Power & Infra
  {
    id: 'pmic', icon: '🔌', color: '#d0021b',
    shortTitle: 'PMIC و البطارية', title: 'إدارة الطاقة والبطارية', subtitle: 'محطة الكهرباء والتوزيع',
    group: 'power',
    description: [
      'البطارية هي خزان الطاقة، وشريحة إدارة الطاقة (PMIC) هي شركة توزيع الكهرباء التي تقرر كم فولت يحتاج كل مكون وتمنع الانفجارات.'
    ]
  },
  {
    id: 'motherboard', icon: '🛣️', color: '#4a90e2',
    shortTitle: 'اللوحة الأم', title: 'اللوحة الأم والكابلات', subtitle: 'شبكة الطرق السريعة والجسور',
    group: 'power',
    description: [
      'اللوحة الرئيسية والفرعية تمثل الشوارع، والكابلات المرنة (Flex Cables) هي الجسور المعلقة التي تربط المناطق المتباعدة ببعضها لنقل الطاقة والبيانات.'
    ]
  },
  {
    id: 'enclave', icon: '🛡️', color: '#f8e71c',
    shortTitle: 'Secure Enclave', title: 'وحدة الأمان المادية', subtitle: 'الخزنة الفولاذية',
    group: 'power',
    description: [
      'شريحة معزولة تماماً عن المعالج وظيفتها تخزين بصمتك، وجهك، وكلمات مرورك وتشفيرها بحيث لا يمكن حتى لنظام التشغيل الوصول إليها مباشرة.'
    ]
  },

  // Display, Audio & Haptics
  {
    id: 'display', icon: '📺', color: '#bd10e0',
    shortTitle: 'الشاشة', title: 'الشاشة وشريحة DDIC', subtitle: 'اللوحة الإعلانية العملاقة',
    group: 'display_audio',
    description: [
      'لوحة العرض (Panel)، وزجاج الحماية، وحساسات اللمس (Digitizer). شريحة تشغيل الشاشة (DDIC) هي العقل الذي يخبر كل بكسل متى يضيء وبأي لون.'
    ]
  },
  {
    id: 'camera', icon: '📸', color: '#417505',
    shortTitle: 'الكاميرا', title: 'عالم الكاميرا والتصوير', subtitle: 'المراصد الفلكية ومعمل التحميض',
    group: 'display_audio',
    description: [
      '<strong>المثبت البصري (OIS):</strong> محركات دقيقة جداً تحرك العدسة عكس حركة يدك لمنع اهتزاز الفيديو.',
      '<strong>مستشعر الألوان:</strong> لضبط توازن اللون الأبيض بدقة.',
      '<strong>معالج الصور (ISP):</strong> معمل تحميض وتعديل الصور.'
    ]
  },
  {
    id: 'audio_haptics', icon: '🔊', color: '#50e3c2',
    shortTitle: 'الصوت والاهتزاز', title: 'الصوت ومحرك الاهتزاز', subtitle: 'نظام الإذاعة والتنبيه الملموس',
    group: 'display_audio',
    description: [
      '<strong>محرك الاهتزاز (Haptic Engine):</strong> المسؤول عن الاهتزازات الدقيقة عند الكتابة أو تلقي إشعارات.',
      '<strong>شريحة الصوت (Audio Codec):</strong> تتواصل مع الـ DAC وتدير ضغط وفك ضغط الملفات الصوتية.'
    ]
  },

  // Sensors
  {
    id: 'motion_sensors', icon: '🧭', color: '#b8e986',
    shortTitle: 'الحركة والاتجاه', title: 'حساسات الحركة والاتجاه', subtitle: 'إحساس الهاتف بالمكان',
    group: 'sensors',
    description: [
      '<strong>البوصلة (Magnetometer):</strong> لتحديد الاتجاهات القطيبة وتعمل مع الـ GPS.',
      '<strong>البارومتر (Barometer):</strong> لقياس الضغط الجوي والارتفاع، مفيد في تتبع صعود الدرج.',
      'الجيروسكوب ومقياس التسارع لرصد الحركة الدقيقة.'
    ]
  },
  {
    id: 'depth_sensors', icon: '📏', color: '#9b9b9b',
    shortTitle: 'حساسات إضافية', title: 'حساس العمق (LiDAR) والقاعة', subtitle: 'رادار الليزر والبوابات المغناطيسية',
    group: 'sensors',
    description: [
      '<strong>حساس القاعة (Hall Effect):</strong> يكتشف إغلاق الغلاف الذكي ليطفئ الشاشة.',
      '<strong>حساسات العمق (LiDAR / ToF):</strong> تستخدم ضوء الليزر لقياس المسافات بدقة بالغة وتفيد في الواقع المعزز وعزل الصور.'
    ]
  }
]

const currentIndex = ref(0)
const currentConcept = computed(() => concepts[currentIndex.value])
const progressWidth = computed(() => `${((currentIndex.value + 1) / concepts.length) * 100}%`)

function next() {
  if (currentIndex.value < concepts.length - 1) currentIndex.value++
}

function prev() {
  if (currentIndex.value > 0) currentIndex.value--
}

function handleKeydown(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
  if (e.key === 'Escape') emit('close')
}

let touchStartX = 0
function handleTouchStart(e) { touchStartX = e.touches[0].clientX }
function handleTouchEnd(e) {
  const touchEndX = e.changedTouches[0].clientX
  const diff = touchEndX - touchStartX
  if (diff > 50) prev()
  else if (diff < -50) next()
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="cinematic-overlay" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressWidth, background: currentConcept.color }"></div>
    </div>
    
    <button class="close-btn" @click="emit('close')">×</button>

    <div class="cinematic-bg">
      <div class="ambient-light" :style="{ background: currentConcept.color }"></div>
      <div class="grid-layer"></div>
    </div>

    <div class="cinematic-content">
      <transition name="slide-up" mode="out-in">
        <div class="concept-card" :key="currentConcept.id">
          <div class="icon-ring" :style="{ borderColor: currentConcept.color, boxShadow: `0 0 40px ${currentConcept.color}44` }">
            <span class="icon">{{ currentConcept.icon }}</span>
          </div>
          
          <span class="subtitle" :style="{ color: currentConcept.color }">{{ currentConcept.subtitle }}</span>
          <h1 class="title">{{ currentConcept.title }}</h1>
          
          <div class="descriptions">
            <p v-for="(desc, idx) in currentConcept.description" :key="idx" v-html="desc"></p>
          </div>
        </div>
      </transition>
    </div>

    <div class="controls">
      <button class="nav-btn" :class="{ disabled: currentIndex === 0 }" @click="prev">
        <span class="arrow">→</span>
      </button>
      <div class="counter">{{ currentIndex + 1 }} / {{ concepts.length }}</div>
      <button class="nav-btn" :class="{ disabled: currentIndex === concepts.length - 1 }" @click="next">
        <span class="arrow">←</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.cinematic-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #000;
  color: #fff;
  font-family: 'Cairo', 'Inter', sans-serif;
  direction: rtl;
  display: flex;
  flex-direction: column;
}

.progress-bar {
  position: absolute; top: 0; left: 0; right: 0;
  height: 4px; background: rgba(255,255,255,0.1);
  z-index: 10;
}
.progress-fill {
  height: 100%; transition: width 0.4s ease, background 0.4s ease;
}

.close-btn {
  position: absolute; top: 1rem; left: 1.5rem;
  z-index: 10; background: rgba(255,255,255,0.1);
  border: none; color: #fff; width: 44px; height: 44px;
  border-radius: 50%; font-size: 2rem; display: flex;
  align-items: center; justify-content: center;
  cursor: pointer; backdrop-filter: blur(10px);
  transition: all 0.2s;
}
.close-btn:hover { background: rgba(255,255,255,0.2); transform: scale(1.1); }

.cinematic-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.ambient-light {
  position: absolute; top: 50%; left: 50%;
  width: 80vw; height: 80vw; max-width: 800px; max-height: 800px;
  transform: translate(-50%, -50%);
  border-radius: 50%; filter: blur(120px);
  opacity: 0.15; transition: background 0.5s ease;
}
.grid-layer {
  position: absolute; inset: 0;
  background-image: 
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse at center, black 10%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 10%, transparent 80%);
}

.cinematic-content {
  flex: 1; display: flex; align-items: center; justify-content: center;
  padding: 2rem; position: relative; z-index: 1;
}

.concept-card {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; max-width: 700px; width: 100%;
}

.icon-ring {
  width: 140px; height: 140px; border-radius: 50%;
  border: 2px solid; display: flex; align-items: center;
  justify-content: center; margin-bottom: 2rem;
  background: rgba(0,0,0,0.4); backdrop-filter: blur(10px);
  transition: all 0.5s ease;
}
.icon { font-size: 4rem; filter: drop-shadow(0 0 20px rgba(255,255,255,0.3)); }

.subtitle { font-size: 1rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; transition: color 0.5s; }
.title { font-size: 3rem; font-weight: 900; margin: 0 0 2rem; text-shadow: 0 10px 30px rgba(0,0,0,0.5); line-height: 1.2; }

.descriptions {
  display: flex; flex-direction: column; gap: 1rem;
}
.descriptions p {
  font-size: 1.3rem; line-height: 1.7; color: rgba(255,255,255,0.85);
  margin: 0;
}
.descriptions :deep(strong) { color: #fff; font-weight: 700; border-bottom: 1px dashed rgba(255,255,255,0.4); }

.controls {
  padding: 2rem; display: flex; align-items: center; justify-content: center; gap: 2rem;
  position: relative; z-index: 1;
}

.nav-btn {
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
  width: 60px; height: 60px; border-radius: 50%; color: #fff;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; backdrop-filter: blur(10px); transition: all 0.2s;
}
.nav-btn:hover:not(.disabled) { background: rgba(255,255,255,0.2); transform: scale(1.1); }
.nav-btn.disabled { opacity: 0.3; cursor: not-allowed; }
.arrow { font-size: 1.5rem; font-weight: bold; }

.counter { font-size: 1.2rem; font-weight: 700; letter-spacing: 0.2em; font-family: monospace; color: rgba(255,255,255,0.5); }

/* Transitions */
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
.slide-up-enter-from { opacity: 0; transform: translateY(40px) scale(0.95); }
.slide-up-leave-to { opacity: 0; transform: translateY(-40px) scale(0.95); position: absolute; }

@media (max-width: 768px) {
  .icon-ring { width: 100px; height: 100px; margin-bottom: 1.5rem; }
  .icon { font-size: 3rem; }
  .title { font-size: 2rem; margin-bottom: 1.5rem; }
  .descriptions p { font-size: 1.1rem; }
  .nav-btn { width: 50px; height: 50px; }
  .controls { padding: 1.5rem; gap: 1.5rem; }
}
</style>
