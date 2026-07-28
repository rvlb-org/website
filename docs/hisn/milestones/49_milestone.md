---
title: "🔄 الفاصل الاستراتيجي: التحوّل من البناء الذاتي إلى الأكتاف العملاقة"
date: "17:05 GMT+3 - 2026-07-28"
icon: "🏗️"
cat: "Architecture Refactoring & Library Migration"
---

**تاريخ الإنجاز:** 2026-07-28 — 17:05 GMT+3

**التصنيف:** Architecture Refactoring & Library Migration

---

كان هناك **صمت مقصود** في سجلات حِصن — لم يكن توقفاً، بل كان إعادة تفكير عميقة. منذ المايلستون ٤٨، قرر المطور التوقف مؤقتاً عن إضافة ميزات جديدة للنظام، والتوجه نحو شيء أكثر أهمية على المدى البعيد: **إعادة بناء الأساس من جديد — لكن هذه المرة على أكتاف عمالقة حقيقيين.**

> *"لا تُعيد اختراع العجلة إذا كان هناك من صنعها بشكل أتقن وأُدقَّق من طرف آلاف المهندسين."*

---

### السياق: لماذا التوقف؟

منذ البداية، بنى حِصن كل شيء من الصفر — مخصص الذاكرة، محلل الـ ELF، مكتبة الرسومات، مكتبات التشفير، وحتى خوارزمية شامير. كان ذلك ضرورياً لفهم الأعماق وإثبات المفهوم. لكنه في نفس الوقت أنتج كوداً غير مُدققاً أمنياً، يصعب صيانته، وقد يحمل ثغرات خفية.

في نظام **صمّم أصلاً لتحدي المخابرات**، هذا غير مقبول.

---

### ما الذي تغيّر؟

#### 1. 🧠 مخصص الذاكرة: من `bump-alloc` إلى `talc`
استُبدلت مكتبة `bump-alloc` المكتوبة يدوياً — والتي كانت تفتقر لآلية تحرير الذاكرة — بـ **`talc v4`**، وهو مخصص ذاكرة عالي الأداء مصمم خصيصاً لبيئات `no_std` الحرجة.

- **المصدر:** [crates.io/crates/talc](https://crates.io/crates/talc)
- **السبب:** دعم كامل لـ `alloc::Vec` و `alloc::String` مع إمكانية تحرير الذاكرة فعلياً.
- **الحاويات المُحدَّثة:** `init`, `desktop`, `net`, `auth`, `fs`, `input_vault`, `crypto_vault`

#### 2. 📦 محلل ELF: من `elf-parser` إلى `xmas-elf`
حذفت مكتبة `elf-parser` المكتوبة من الصفر واستُبدلت بـ **`xmas-elf v0.9`**، المكتبة الصفرية التخصيص المُعتمدة في مجتمع تطوير الأنوية.

- **المصدر:** [crates.io/crates/xmas-elf](https://crates.io/crates/xmas-elf)
- **السبب:** تغطية كاملة لمعيار ELF64، بدون أي تخصيص ذاكرة ديناميكي، ومُختبرة في مشاريع Bootloader حقيقية.
- **الملف المُعاد كتابته:** `containers/init/src/loader/elf_load.rs`

#### 3. 🔑 خوارزمية شامير: من `libs/shamir` إلى منطق مدمج بـ GF(256)
حذفت مكتبة `shamir` المبنية يدوياً وأُعيدت كتابة منطقها مباشرةً داخل `crypto_vault` باستخدام حسابات **حقل جالوا GF(2^8)** المُدمجة — وهو النهج الأكثر خفة والأقل تعقيداً من إصافة تبعية خارجية لخوارزمية بحجمها.

#### 4. 🖥️ نظام الرسومات: من `framebuffer`+`font-render` إلى `embedded-graphics` + `profont`
ربما كان هذا أضخم التغييرات. مكتبتان مبنيتان من الصفر تُرسمان البكسل واحداً واحداً — حُذفتا وأُعيدت كتابة كل واجهات البرامج الأربعة (`calc`, `editor`, `files`, `viewer`) وحاوية `desktop` باستخدام:

- **`embedded-graphics v0.8`** — نظام الرسوميات القياسي لبيئات Bare-Metal.
  - **المصدر:** [crates.io/crates/embedded-graphics](https://crates.io/crates/embedded-graphics)
- **`profont v0.7`** — مجموعة خطوط Bitmap أحادية العرض للشاشات المدمجة.
  - **المصدر:** [crates.io/crates/profont](https://crates.io/crates/profont)

وتم بناء جسر مخصص **`libs/eg-fb`** يربط بين الـ raw framebuffer لـ seL4 وبين نظام `embedded-graphics` عبر تنفيذ `DrawTarget` trait.

#### 5. 🌐 حاوية الشبكة: من `tor` إلى `net`
أُعيدت هيكلة حاوية `tor` المتخصصة لتصبح حاوية `net` العامة — بوابة الشبكة الوحيدة للنظام — حيث أصبح Tor **خياراً للاتصال** داخلها، لا هويتها الكاملة. بنية أكثر نضجاً ومرونة.

---

### الحالة بعد كل هذا:

```
✅ containers/auth        ✅ containers/bus
✅ containers/crypto_vault ✅ containers/desktop
✅ containers/disk        ✅ containers/fs
✅ containers/init        ✅ containers/input_vault
✅ containers/net
✅ programs/calc          ✅ programs/editor
✅ programs/files         ✅ programs/viewer
✅ libs/eg-fb             ✅ libs/talc-alloc
✅ libs/vault-crypto      ✅ libs/ipc-sync
✅ ... وجميع المكتبات الأخرى
```

**٢٦ من ٢٦ crate — صفر أخطاء.**

---

### الجانب الثاني من الفاصل: نظام التوثيق

بالتوازي مع التحولات الهندسية، استثمر المطور هذا الفاصل الزمني في **تطوير منظومة التوثيق** للموقع الرسمي لـ RVLB. من إضافة أقسام المفاهيم والتقنيات التفاعلية (عتاد الهاتف، الشبكات، Rust)، إلى صفحات الرحلة السينمائية التي تأخذ القارئ في غوص عميق داخل عالم التقنية — كل ذلك باللغة العربية، ليكون المرجع التقني العربي الأشمل في هذه المجالات.

---


<div class="ms-files-section">

  <div class="ms-files-group ms-files-removed">
    <div class="ms-files-label">⛔ المكتبات المحذوفة</div>
    <div class="ms-files-list">
      <code>libs/bump-alloc/</code>
      <code>libs/elf-parser/</code>
      <code>libs/framebuffer/</code>
      <code>libs/font-render/</code>
      <code>libs/shamir/</code>
      <code>containers/tor/</code>
    </div>
  </div>

  <div class="ms-files-group ms-files-added">
    <div class="ms-files-label">✨ المكتبات الجديدة والمُضافة</div>
    <div class="ms-files-list">
      <code>libs/eg-fb/</code>
      <code>libs/talc-alloc/</code>
      <code>xmas-elf v0.9</code>
      <code>embedded-graphics v0.8</code>
      <code>profont v0.7</code>
      <code>talc v4</code>
    </div>
  </div>

</div>

<style scoped>
.ms-files-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 32px;
}
.ms-files-group {
  border-radius: 10px;
  padding: 14px 18px;
}
.ms-files-removed {
  background: color-mix(in srgb, #ef4444 10%, transparent);
  border: 1px solid color-mix(in srgb, #ef4444 30%, transparent);
}
.ms-files-added {
  background: color-mix(in srgb, #22c55e 10%, transparent);
  border: 1px solid color-mix(in srgb, #22c55e 30%, transparent);
}
.ms-files-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  margin-bottom: 10px;
  opacity: 0.85;
}
.ms-files-removed .ms-files-label { color: #fca5a5; }
.ms-files-added .ms-files-label { color: #86efac; }
.ms-files-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.ms-files-removed code {
  background: color-mix(in srgb, #ef4444 18%, transparent);
  color: #fca5a5;
  border: 1px solid color-mix(in srgb, #ef4444 25%, transparent);
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
}
.ms-files-added code {
  background: color-mix(in srgb, #22c55e 18%, transparent);
  color: #86efac;
  border: 1px solid color-mix(in srgb, #22c55e 25%, transparent);
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
}
</style>

