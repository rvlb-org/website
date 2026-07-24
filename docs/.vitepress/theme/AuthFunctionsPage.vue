<script setup>
const messageTags = [
  { call: '0x100 (Request Token)', action: 'يستقبل app_id في mr[1] ويُولّد PolicyBadge بصلاحية ReadWrite لمسار /home/user ويُعيده في reply.mr[1].' },
  { call: '_ (Unknown)', action: 'يلتقط أي أمر غير معروف ويرد بـ Err لحماية النظام من الطلبات الغير شرعية.' }
]

const functions = [
  {
    id: '01',
    icon: '🏛️',
    title: 'مصدر الثقة الأمني الوحيد (Single Trusted Authority)',
    desc: 'تعمل كـ Trusted Authority مركزي — المصدر الوحيد في النظام المخوّل بإصدار تذاكر الأمان. لا يمكن لأي تطبيق الوصول لـ FS_Vault بدون الحصول على Badge صادر منها أولاً.'
  },
  {
    id: '02',
    icon: '🎫',
    title: 'توليد تذاكر الأمان (Security Token Generation)',
    desc: 'تُولّد PolicyBadge مُشفَّرة تحمل هوية التطبيق (app_id) وصلاحياته (Permission) وهاش المسار المسموح به (FNV-1a). تُعاد كرقم 64-bit واحد يحمل كل هذه المعلومات مضغوطة.'
  },
  {
    id: '03',
    icon: '🔐',
    title: 'ترميز الصلاحيات في 64-bit (Badge Word Encoding)',
    desc: 'تُرمّز كل صلاحية في كلمة 64-bit واحدة: الـ 16 bit العليا = app_id | الـ 8 bits التالية = نوع الصلاحية | الـ 32 bit السفلى = hash المسار. هذا يجعل التحقق من الـ Badge عملية بسيطة وسريعة جداً.'
  },
  {
    id: '04',
    icon: '#️⃣',
    title: 'تشفير المسارات بخوارزمية FNV-1a',
    desc: 'تستخدم خوارزمية FNV-1a 32-bit لتحويل مسارات الملفات (مثل /home/user) إلى أرقام hash ثابتة وفريدة. يجب أن يتطابق الـ hash بين ما تُصدره auth وما تتحقق منه FS_Vault لقبول أي طلب.'
  },
  {
    id: '05',
    icon: '🔄',
    title: 'إدارة دورة حياة الـ Allocator (BumpAllocator Lifecycle)',
    desc: 'تمتلك Global Allocator خاص بها (BumpAllocator) للذاكرة الديناميكية. هذا يُميّزها عن باقي الحاويات ويسمح لها بتخصيص هياكل بيانات Policy أكثر تعقيداً مستقبلاً.'
  },
  {
    id: '06',
    icon: '🔑',
    title: 'إدارة Capability Slots الأمنية',
    desc: 'تحتفظ بـ Slot 0 لاستماع طلبات التوثيق وSlot 1 محجوز لـ FS_Vault لحفظ سجلات الأمان مستقبلاً. هذا الفصل يضمن أن Auth_Vault لا تملك صلاحيات أكثر مما تحتاجه.'
  },
  {
    id: '07',
    icon: '📋',
    title: 'سياسة الصلاحيات الموحدة (Unified Policy — Temporary)',
    desc: 'في الإصدار الحالي، جميع التطبيقات تحصل تلقائياً على صلاحية ReadWrite للمسار /home/user بغض النظر عن app_id. هذا مؤقت — المرحلة القادمة ستربطه بقاعدة بيانات سياسات حقيقية.'
  },
  {
    id: '08',
    icon: '⚠️',
    title: 'رفض الطلبات المجهولة (Unknown Request Rejection)',
    desc: 'أي أمر خارج النطاق المعروف يُرفض فوراً بـ MessageTag::Err. هذا يحمي النظام من أي محاولة للوصول عبر أوامر غير موثقة أو هجمات من نوع command injection.'
  }
]
</script>

<template>
  <div class="afp-root">
    <header class="afp-header">
      <a href="/hisn/containers/auth/" class="back-link">
        <span>←</span> حاوية auth
      </a>

      <h1 class="afp-title">
        الوظائف التي تقوم بها <span class="gradient-text-red">auth</span>
      </h1>

      <p class="afp-subtitle">
        حاوية <code>Auth_Vault</code> هي مصدر الثقة الوحيد. تُصدر تذاكر أمان مُشفَّرة لا يمكن تزويرها وتُدير سياسات الصلاحيات بشكل مركزي.
      </p>

      <div class="afp-stats">
        <span class="stat-badge">{{ functions.length }} وظائف تخصصية</span>
        <span class="stat-badge stat-alt">{{ messageTags.length }} أوامر مدعومة</span>
      </div>
    </header>

    <main class="afp-content">
      <!-- Message Tags -->
      <section>
        <div class="section-header">
          <div class="sh-icon">📡</div>
          <h2 class="sh-title">دليل أوامر الاستدعاء (Message Tags)</h2>
        </div>
        <p class="sh-desc">كافة الأوامر التي تستقبلها الحاوية حالياً وكيف تتعامل معها:</p>
        <div class="tags-grid">
          <div v-for="(tag, i) in messageTags" :key="i" class="tag-row">
            <div class="tag-call">{{ tag.call }}</div>
            <div class="tag-action">{{ tag.action }}</div>
          </div>
        </div>
      </section>

      <!-- Functions -->
      <section>
        <div class="section-header">
          <div class="sh-icon">⚙️</div>
          <h2 class="sh-title">المهام الأساسية لحاوية الأمان</h2>
        </div>
        <div class="afp-list">
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
.afp-root {
  position: relative;
  min-height: 100vh;
  padding: calc(var(--vp-nav-height) + 2.5rem) 1.5rem 6rem;
  max-width: 860px;
  margin: 0 auto;
  font-family: 'Cairo', 'Inter', system-ui, sans-serif;
  color: #f8fafc;
}
.afp-root::before {
  content: '';
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.1), transparent 70%);
  filter: blur(80px);
  top: -100px; right: -200px;
  pointer-events: none; z-index: 0;
}
.afp-root::after {
  content: '';
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.08), transparent 70%);
  filter: blur(80px);
  bottom: 100px; left: -150px;
  pointer-events: none; z-index: 0;
}

.afp-header { position: relative; z-index: 1; text-align: center; margin-bottom: 4rem; }

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  padding: 0.4rem 1rem;
  border-radius: 100px;
  text-decoration: none !important;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(239, 68, 68, 0.2);
}
.back-link:hover { background: rgba(239, 68, 68, 0.2); transform: translateX(-4px); }

.afp-title { font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 900; line-height: 1.3; margin: 0 0 1rem; }
.gradient-text-red {
  background: linear-gradient(135deg, #ef4444 0%, #f87171 50%, #fca5a5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 15px rgba(239,68,68,0.3));
}
.afp-subtitle { font-size: 1.15rem; color: rgba(248,250,252,0.7); max-width: 650px; margin: 0 auto 2rem; line-height: 1.7; }

.afp-stats { display: flex; justify-content: center; gap: 1rem; }
.stat-badge {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 0.5rem 1.5rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  backdrop-filter: blur(10px);
}
.stat-alt { background: rgba(168,85,247,0.1); border-color: rgba(168,85,247,0.2); color: #d8b4fe; }

.afp-content { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 4rem; }

.section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.sh-icon {
  font-size: 2rem;
  background: rgba(255,255,255,0.05);
  width: 50px; height: 50px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);
}
.sh-title { font-size: 1.8rem; font-weight: 900; color: #fff; margin: 0; }
.sh-desc { font-size: 1rem; color: rgba(248,250,252,0.7); margin: 0 0 2rem; }

.tags-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(15,23,42,0.4);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 1rem;
}
.tag-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(255,255,255,0.02);
  border-radius: 12px;
  transition: background 0.3s ease;
}
.tag-row:hover { background: rgba(239,68,68,0.07); }
.tag-call {
  flex-basis: 250px;
  flex-shrink: 0;
  font-family: 'Space Mono', monospace;
  font-size: 0.95rem;
  font-weight: 700;
  color: #f87171;
}
.tag-action {
  flex: 1;
  font-size: 0.95rem;
  color: rgba(248,250,252,0.85);
  line-height: 1.6;
  border-right: 1px solid rgba(255,255,255,0.1);
  padding-right: 1.5rem;
}

.afp-list { display: flex; flex-direction: column; gap: 1.5rem; }

.fn-card {
  position: relative;
  background: rgba(15,23,42,0.5);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 1.75rem;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  backdrop-filter: blur(16px);
  overflow: hidden;
  transition: all 0.4s ease;
}
.fn-card:hover { transform: translateY(-3px) scale(1.01); border-color: rgba(239,68,68,0.3); box-shadow: 0 15px 30px rgba(0,0,0,0.2); }

.fn-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at left top, rgba(239,68,68,0.08) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
}
.fn-card:hover .fn-glow { opacity: 1; }

.fn-header { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; flex-shrink: 0; width: 60px; }
.fn-id { font-size: 0.75rem; font-weight: 800; color: #ef4444; background: rgba(239,68,68,0.15); padding: 0.2rem 0.5rem; border-radius: 6px; }
.fn-icon { font-size: 2rem; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3)); }
.fn-content { flex: 1; }
.fn-name { font-size: 1.25rem; font-weight: 800; color: #fff; margin: 0 0 0.5rem; line-height: 1.4; }
.fn-desc { font-size: 0.95rem; line-height: 1.7; color: rgba(248,250,252,0.75); margin: 0; }

@media (max-width: 640px) {
  .fn-card { flex-direction: column; align-items: flex-start; gap: 1rem; padding: 1.5rem; }
  .fn-header { flex-direction: row-reverse; width: 100%; justify-content: flex-end; }
  .tag-row { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
  .tag-call { flex-basis: auto; }
  .tag-action { border-right: none; padding-right: 0; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 0.5rem; }
}
</style>
