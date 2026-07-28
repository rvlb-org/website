<script setup>
import { ref, computed, onMounted } from 'vue'
import RustCinematic from './RustCinematic.vue'

const concepts = [
  {
    id: 'nostd', icon: '🚫', color: '#6366f1',
    shortTitle: 'no_std', title: 'سمة', code: '#![no_std]',
    subtitle: 'البرمجة على الحديد العاري (Bare Metal)',
    group: 'basics',
    description: [
      'بشكل افتراضي، تعتمد برامج Rust على مكتبة قياسية ضخمة تسمى <code>std</code> (Standard Library) تتواصل مع نظام التشغيل لفتح الملفات، حجز الذاكرة، والتواصل عبر الشبكة.',
      'لكن في <strong>Hisn-seL4</strong>، نحن لا نبني تطبيقات عادية تعمل فوق ويندوز أو لينكس؛ نحن نبني <span class="hl">الأساس نفسه</span>. مكوناتنا وحاوياتنا تعمل في بيئة معزولة ولا يوجد "نظام تشغيل تقليدي" ليقدم لها الخدمات!'
    ],
    analogy: {
      icon: '💡',
      title: 'أمثلة من الحياة اليومية',
      parts: [
        '<h5>🏗️ مثال البناء:</h5><p>استخدام <code>std</code> يشبه بناء منزل في <em>مدينة متطورة</em>؛ حيث توفر لك البلدية (نظام التشغيل) شبكات الكهرباء والماء الجاهزة. أما <code>no_std</code> فيشبه بناء محطة في <em>الفضاء الخارجي</em>! لا توجد بنية تحتية؛ عليك ابتكار نظامك الخاص من الصفر، معتمداً على مكتبة <code>core</code> فقط.</p>',
        '<h5>👨‍🍳 مثال الطبخ:</h5><p>استخدام <code>std</code> يشبه الطبخ في مطبخ حديث؛ تفتح الصنبور للماء وتشغل الموقد الكهربائي. لكن <code>no_std</code> يشبه الطبخ في وسط الصحراء! إذا أردت ناراً عليك جمع الحطب بنفسك، وإذا أردت ماءً عليك حفر بئر.</p>',
        '<h5>📱 مثال الأجهزة:</h5><p>استخدام <code>std</code> يشبه كتابة تطبيق لهاتف ذكي. لكن <code>no_std</code> يشبه برمجة الشريحة الدقيقة داخل "جهاز تنظيم ضربات القلب"! لكي تضيء لمبة صغيرة يجب أن ترسل النبضات الكهربائية بنفسك حرفياً.</p>'
      ]
    },
    items: [
      { icon: '⚡', title: 'الاعتماد على core فقط', text: 'باستخدام <code>no_std</code>، نتخلى عن المكتبة القياسية ونكتفي بمكتبة <code>core</code> الأصغر والأكثر استقلالية، والتي لا تحتاج لأي نظام تشغيل للعمل.' },
      { icon: '🛡️', title: 'أمان النواة الدقيقة', text: 'تضمن لنا هذه السمة أن الكود الخاص بنا لا يستدعي أي ميزات غير متوقعة من العتاد، مما يبقيه نظيفاً، صغيراً، ومناسباً للعمليات الحرجة المتصلة بنواة seL4 مباشرة.' }
    ]
  },
  {
    id: 'unsafe', icon: '⚠️', color: '#ef4444',
    shortTitle: 'unsafe', title: 'كتلة', code: 'unsafe { }',
    subtitle: 'الخروج عن حماية المترجم (Compiler)',
    group: 'basics',
    description: [
      'لغة Rust مشهورة بقواعدها الصارمة التي تمنع أخطاء الذاكرة بشكل قاطع. المترجم (Compiler) يرفض بناء أي كود قد يؤدي إلى ثغرات أمنية أو أعطال في الذاكرة.',
      'لكن في الأنظمة المنخفضة المستوى (مثل أنظمة التشغيل و RVLB)، <strong>نحتاج أحياناً للتعامل مع العتاد مباشرة</strong> (مثل قراءة عنوان محدد في الذاكرة للتواصل مع مستشعر). المترجم لا يمتلك عقلاً بشرياً ليثبت أمان هذه العملية الخارجية، وهنا نستخدم <code>unsafe</code>.'
    ],
    analogy: {
      icon: '☢️',
      title: 'القطار مقابل سيارة الدفع الرباعي:',
      parts: [
        '<p>البرمجة العادية في Rust تشبه ركوب <strong>قطار على سكة حديدية</strong>؛ من المستحيل أن تنحرف عن مسارك أو تصطدم لأن السكة (المترجم) تضمن ذلك بنسبة 100%. أما استخدام <code>unsafe</code> فهو يشبه النزول من القطار وقيادة <strong>سيارة يدوية في طريق وعر</strong> للوصول لمنطقة لا تصلها سكة القطار! أنت تمتلك القوة والحرية الكاملة للوصول لأي مكان، ولكن إذا ارتكبت خطأ، ستصطدم.</p>',
        '<p>بكلمة <code>unsafe</code>، أنت تقول للمترجم: <em>"توقف عن القلق، أنا أعرف ما أفعله وأتحمل مسؤولية الأمان في هذه الأسطر القليلة".</em></p>'
      ]
    },
    items: [
      { icon: '🔓', title: 'صلاحيات استثنائية', text: 'كلمة <code>unsafe</code> لا تلغي قواعد Rust الأساسية، بل تفتح لك صلاحيات محددة فقط، أهمها قراءة وتعديل الذاكرة العارية (Raw Pointers) للتعامل المباشر مع عتاد الكمبيوتر.' },
      { icon: '📦', title: 'عزل الخطر (Encapsulation)', text: 'نحن لا نكتب النظام كله بـ unsafe! بل نكتب العمليات الخطيرة داخل كبسولة <code>unsafe</code> صغيرة جداً، ثم نغلفها بواجهة آمنة 100% ليستخدمها باقي النظام بدون خوف.' }
    ]
  },
  {
    id: 'deadcode', icon: '👻', color: '#a855f7',
    shortTitle: 'dead_code', title: 'الكود الميت', code: 'dead_code',
    subtitle: 'صرامة المترجم وتحسين حجم النظام',
    group: 'basics',
    description: [
      'مترجم Rust مصاب بهوس النظافة! إذا قمت بكتابة دالة (Function) أو تعريف متغير ولم تستخدمه في برنامجك، فلن يمرر ذلك بصمت؛ بل سيصدر تحذيراً مزعجاً يخبرك بوجود <strong>"كود ميت" (Dead Code)</strong>.',
      'في عالم تطوير أنظمة التشغيل (مثل RVLB)، نحن نكتب مئات الدوال للتعامل مع العتاد، وقد لا نستخدمها كلها دفعة واحدة أثناء مرحلة التطوير. أحياناً نستخدم سمة <code>#![allow(dead_code)]</code> لنجعل المترجم يتجاهل هذا التحذير مؤقتاً، لكن في النسخة النهائية، يقوم المترجم بعملية مذهلة تسمى <strong>إزالة الكود الميت (Dead Code Elimination)</strong>.'
    ],
    analogy: {
      icon: '🎒',
      title: 'مثال تنظيف حقيبة السفر:',
      parts: [
        '<p>تخيل أنك ذاهب في رحلة وتضع في حقيبتك ملابس، مظلة، وكتاباً. قبل أن تغادر، يقوم المترجم (حارس الأمن) بتفتيش حقيبتك ويقول لك: <em>"الجو مشمس جداً في وجهتك، لن تستخدم هذه المظلة أبداً، إنها (وزن ميت) يثقل حركتك!"</em>.</p>',
        '<p>في نهاية المطاف، يقوم المترجم بإخراج أي أداة لن تستخدمها من حقيبتك قبل صعود الطائرة. النتيجة؟ طائرة (برنامج تنفيذي) خفيفة جداً، سريعة، ولا تحمل أي كود إضافي لا حاجة له!</p>'
      ]
    },
    items: [
      { icon: '🪶', title: 'نظام بحجم الريشة', text: 'حتى لو قمنا بتضمين مكتبة ضخمة جداً، فإن المترجم سيأخذ فقط الأسطر التي استدعيناها فعلياً ويرمي الباقي. هذا يحافظ على صغر حجم النواة وسرعتها القصوى.' },
      { icon: '🧐', title: 'تنبيهات استباقية', text: 'وجود تنبيهات الكود الميت أثناء البرمجة يساعدنا على اكتشاف الأخطاء؛ فإذا كتبت دالة مهمة للتعامل مع العتاد وظهر لك أنها "ميتة"، فهذا ينبهك أنك نسيت استدعاءها!' }
    ]
  },
  {
    id: 'ownership', icon: '👑', color: '#3b82f6',
    shortTitle: 'Ownership', title: 'الملكية والاستعارة', code: 'Ownership & Borrowing',
    subtitle: 'إدارة الذاكرة بدون Garbage Collector',
    group: 'solid',
    description: [
      'أعظم ابتكارات لغة Rust هو نظام الملكية. لا يوجد نظام تنظيف ذاكرة عشوائي يوقف برنامجك فجأة، ولا توجد إدارة يدوية تسبب أخطاء وتسريب للذاكرة. هناك قواعد صارمة: لكل بيانات "مالك" واحد فقط.'
    ],
    analogy: {
      icon: '🏠',
      title: 'مثال مفتاح المنزل:',
      parts: [
        '<p>تخيل أن البيانات هي <strong>منزل</strong>، وأنت صاحبه (المالك). لديك مفتاح واحد فقط.</p>',
        '<p>✅ <strong>الاستعارة للقراءة (Immutable Borrow):</strong> يمكنك أن تعطي نسخة من المفتاح لأي عدد من أصدقائك لـ<em>يزوروا</em> البيت ويتفرجوا. عشرة أشخاص يمكنهم الدخول في آن واحد طالما لن يعدّلوا شيئاً.</p>',
        '<p>⚠️ <strong>الاستعارة للتعديل (Mutable Borrow):</strong> إذا أعطيت أحدهم المفتاح ليُعيد ترتيب الأثاث، يجب أن <em>يعود جميع من دخل بنسخ القراءة أولاً</em> ويغلق الباب. لا يسمح للمترجم بوجود من يقرأ ومن يعدّل في نفس الوقت.</p>',
        '<p>🔑 <strong>نقل الملكية (Move):</strong> إذا سلّمت المفتاح الأصلي لشخص آخر كلياً، <em>أنت لم تعد مالكاً</em>. لو حاولت بعدها الدخول بمفتاحك القديم، سيرفض المترجم الكود فوراً لأن الملكية انتقلت!</p>'
      ]
    },
    items: []
  },
  {
    id: 'lifetimes', icon: '⏳', color: '#10b981',
    shortTitle: 'Lifetimes', title: 'فترات الحياة', code: "Lifetimes 'a",
    subtitle: 'ضمان عدم وجود مؤشرات معلقة (Dangling Pointers)',
    group: 'solid',
    description: [
      'يستخدم المترجم فترات الحياة ليتأكد أن أي مرجع (Reference) لبيانات معينة لن يعيش أطول من البيانات الأصلية نفسها، مما يمنع البرنامج من محاولة قراءة ذاكرة تم مسحها مسبقاً.'
    ],
    analogy: {
      icon: '🎟️',
      title: 'مثال تصريح الدخول:',
      parts: [
        '<p>تخيل أن البيانات هي "موظف دائم"، والمرجع (Reference) هو "زائر" دخل ببطاقة الموظف. المترجم يضمن قاعدة صارمة: <strong>مستحيل أن تنتهي صلاحية بطاقة الموظف أو يغادر المبنى، بينما الزائر لا يزال بالداخل يتجول!</strong> فترة حياة الزائر يجب أن تكون دائماً أقصر من أو تساوي فترة حياة الموظف الأصلي.</p>'
      ]
    },
    items: []
  },
  {
    id: 'result', icon: '🎁', color: '#14b8a6',
    shortTitle: 'Result & Option', title: 'التعامل مع النتائج', code: 'Result & Option',
    subtitle: 'بديل الاستثناءات (Exceptions) والأخطاء المفاجئة',
    group: 'solid',
    description: [
      'لا يوجد في Rust مفهوم (Null) الشائع الذي يسبب انهيار البرامج، ولا توجد استثناءات (Exceptions) مخفية تفاجئك. كل شيء مكشوف في التوقيع البرمجي للدالة باستخدام صناديق مغلفة مثل <code>Option</code> و <code>Result</code>.'
    ],
    analogy: {
      icon: '📦',
      title: 'مثال صندوق الهدايا:',
      parts: [
        '<p>بدلاً من أن أسلمك الهاتف الذي طلبته بيدك (وقد أعطيك الهواء فتتفاجأ وينهدم النظام لأن الهاتف غير موجود Null)، أقوم بتسليمك <strong>صندوق مغلق</strong> (Option). المترجم يجبرك بقوة القانون أن تفتح الصندوق أولاً بوعي؛ وتتحقق: هل الهاتف موجود (Some) لتستخدمه؟ أم أن الصندوق فارغ (None) فتتصرف بناءً على ذلك؟ المترجم يجبرك على التفكير في السيناريوهين!</p>'
      ]
    },
    items: []
  },
  {
    id: 'traits', icon: '🎭', color: '#f43f5e',
    shortTitle: 'Traits', title: 'السمات', code: 'Traits',
    subtitle: 'الواجهات المشتركة بين المكونات',
    group: 'os',
    description: [
      'لا يوجد وراثة (Inheritance) كلاسيكية في Rust. بدلاً من ذلك، نستخدم السمات (Traits) لتعريف السلوك المشترك. في بناء أنظمة مثل RVLB، نستخدمها لتوحيد طريقة التعامل مع قطع العتاد المختلفة (مثلاً: كل الأقراص الصلبة تمتلك سمة "قابلة للقراءة").'
    ],
    analogy: {
      icon: '🪪',
      title: 'مثال رخصة القيادة:',
      parts: [
        '<p>لا يهم إذا كنت رجلاً، امرأة، روبوتاً، أو كائناً فضائياً! طالما أنك تمتلك سمة (رخصة قيادة سارية)، يمكنك قيادة السيارة. السمة <code>Trait</code> لا تهتم بـ "من أنت"، بل تهتم بـ "ماذا تستطيع أن تفعل". المترجم يضمن أن أي كائن نمرره للدالة يمتلك هذه السمة فعلياً قبل تشغيل الكود.</p>'
      ]
    },
    items: []
  },
  {
    id: 'ffi', icon: '🤝', color: '#f97316',
    shortTitle: 'FFI', title: 'التخاطب الأجنبي', code: 'FFI',
    subtitle: 'التواصل مع لغة C ونواة seL4',
    group: 'os',
    description: [
      'بما أن نواة <code>seL4</code> مكتوبة بلغة C والتحقق الرياضي، يجب أن نتخاطب معها من داخل Rust. تقنية <strong>FFI (Foreign Function Interface)</strong> تسمح للغة Rust باستدعاء دوال مكتوبة بلغة C أو العكس، بدون أي تكلفة إضافية في الأداء (Zero-cost).'
    ],
    analogy: {
      icon: '👔',
      title: 'مثال المترجم الدبلوماسي:',
      parts: [
        '<p>تخيل أن Rust يتحدث العربية، ونواة C تتحدث اليابانية. لا يفهمان بعضهما مباشرة لاختلاف طرق تمثيل البيانات. تقنية FFI تعمل كمترجم دبلوماسي محترف يجلس بينهما؛ يأخذ الكلمة من Rust ويترجمها فوراً للصيغة التي تفهمها C (والعكس)، ليتم التخاطب بسلاسة، ولكن هذا التخاطب يُعتبر دائماً <code>unsafe</code> لأن المترجم لا يضمن ماذا سيقول الطرف الآخر!</p>'
      ]
    },
    items: []
  },
  {
    id: 'volatile', icon: '⚡', color: '#eab308',
    shortTitle: 'Volatile', title: 'القراءة المتقلبة', code: 'Volatile',
    subtitle: 'التواصل مع العتاد ومسجلات الذاكرة',
    group: 'os',
    description: [
      'المترجم ذكي جداً، وقد يقوم بمسح الأكواد التي يراها مكررة لتسريع البرنامج. لكن عند التعامل مع العتاد (Hardware Registers)، نستخدم القراءة والكتابة الـ <code>Volatile</code> لنجبر المترجم على تنفيذ الأوامر حرفياً دون تجاهلها، لأن القيمة في الذاكرة قد تتغير بواسطة العتاد نفسه وليس الكود.'
    ],
    analogy: {
      icon: '🏎️',
      title: 'مثال عداد السرعة:',
      parts: [
        '<p>أنت تقود سيارة وسرعتها الحالية <strong>120 كم/س</strong>. نظرت للعداد وقرأت القيمة. المترجم العادي يرى هذا ويقرر بنفسه: <em>"هو نظر للعداد قبل ثانية وكانت 120، سأوفر الجهد وأعطيه 120 مرة أخرى بدون قراءة العداد الحقيقي!"</em></p>',
        '<p>لكن <strong>العتاد (المحرك والعجلات)</strong> يعمل بشكل مستقل تماماً خارج إرادة المترجم! في تلك الثانية الواحدة قد تكون:<br>⬆️ ضغطت على الغاز → السرعة أصبحت <strong>135 كم/س</strong><br>⬇️ كبست الفرامل → السرعة أصبحت <strong>90 كم/س</strong><br>⚠️ انفجر إطار → السرعة أصبحت <strong>0 كم/س</strong></p>',
        '<p>باستخدام <code>Volatile</code> أنت تقول للمترجم: <em>"لا تتدخل ولا تخزّن! في كل مرة أطلب القراءة، اذهب للعداد الحقيقي في الذاكرة الآن، لأن العتاد غيّره خارج إرادتك تماماً."</em></p>'
      ]
    },
    items: []
  },
  {
    id: 'panic', icon: '💥', color: '#dc2626',
    shortTitle: 'Panic', title: 'الانهيار في', code: 'no_std (Panic)',
    subtitle: 'معالجة الأخطاء الكارثية بدون نظام تشغيل',
    group: 'os',
    description: [
      'عندما يحدث خطأ كارثي لا يمكن التعافي منه في البرنامج (مثلاً محاولة الوصول لقيمة خارج مصفوفة)، تقوم لغة Rust بعملية (Panic). في البرامج العادية، يتدخل نظام التشغيل ويغلق البرنامج بسلام. لكن في بيئة <code>no_std</code> (حيث أنت تصنع نظام التشغيل)، عليك برمجة معالج الانهيار <code>#[panic_handler]</code> الخاص بك لتقرر ماذا تفعل (مثل إعادة تشغيل الجهاز أو طباعة رسالة خطأ عبر المنفذ التسلسلي).'
    ],
    analogy: {
      icon: '🛑',
      title: 'مثال مكابح الطوارئ:',
      parts: [
        '<p>في الطائرة المدنية (برنامج عادي)، إذا حدث خلل كبير، سيقوم الطيار الآلي (نظام التشغيل) بالتدخل والهبوط الاضطراري. أما في صاروخ فضاء (no_std) لا يوجد طيار آلي خارجي لينقذك! يجب أن تكون قد برمجت مسبقاً نظام <strong>"التدمير الذاتي الآمن"</strong> أو <strong>"تفعيل مظلات الطوارئ"</strong> (معالج الـ Panic) ليتم تنفيذه تلقائياً فور استشعار الكارثة.</p>'
      ]
    },
    items: []
  },
  {
    id: 'macros', icon: '⚙️', color: '#c084fc',
    shortTitle: 'Macros !', title: 'الماكرو', code: 'Macros !',
    subtitle: 'كود يكتب كوداً آخر',
    group: 'advanced',
    description: [
      'أي شيء في Rust ينتهي بعلامة تعجب (مثل <code>println!</code>) هو ليس دالة عادية، بل "ماكرو" (Macro). الماكرو هو كود يتم تنفيذه <em>أثناء الترجمة (Compile time)</em> ليقوم بتوليد أكواد Rust جديدة وإدراجها بالنيابة عنك لتقليل التكرار.'
    ],
    analogy: {
      icon: '🏭',
      title: 'مثال المصنع الآلي:',
      parts: [
        '<p>الدالة العادية تشبه عاملاً يصنع لك كرسياً عند الطلب (أثناء تشغيل البرنامج). أما الماكرو فهو يشبه <strong>آلة تصنع آلات أخرى</strong>! قبل أن يبدأ المصنع بالعمل (أثناء الترجمة)، تقوم أنت بكتابة أمر صغير للماكرو، فيقوم هو ببناء 100 آلة مخصصة مختلفة لتكون جاهزة للعمل فور تشغيل المصنع.</p>'
      ]
    },
    items: []
  },
  {
    id: 'atomics', icon: '⚛️', color: '#a78bfa',
    shortTitle: 'Atomics', title: 'العمليات الذرية', code: 'Atomics',
    subtitle: 'مشاركة البيانات بين الأنوية بأمان تام',
    group: 'advanced',
    description: [
      'في أنظمة التشغيل متعددة الأنوية (Multicore)، قد يحاول معالجان قراءة وتعديل نفس المتغير في نفس اللحظة (Data Race)، مما يؤدي لتلف البيانات. المتغيرات الذرية (Atomics) تضمن أن أي عملية قراءة أو كتابة لا يمكن مقاطعتها أبداً.'
    ],
    analogy: {
      icon: '🚪',
      title: 'مثال الباب الدوار:',
      parts: [
        '<p>تخيل غرفة فيها كنز. في الوضع العادي، يمكن لعشرة أشخاص الدخول من باب كبير في نفس اللحظة والتصادم بالداخل. المتغير الذري يشبه <strong>باباً دواراً ضيقاً</strong> لا يسمح بمرور إلا لشخص واحد فقط. إذا جاء الثاني، يجب أن ينتظر حتى يخرج الأول. هذه العملية (الذرية) تحدث بسرعة فائقة جداً على مستوى العتاد بدون الحاجة لأقفال معقدة!</p>'
      ]
    },
    items: []
  },
  {
    id: 'generics', icon: '🧬', color: '#f472b6',
    shortTitle: 'Generics', title: 'البرمجة العامة', code: 'Generics <T>',
    subtitle: 'كتابة الكود مرة واحدة للعمل مع أي نوع بيانات',
    group: 'advanced',
    description: [
      'بدلاً من كتابة دالة لحساب مساحة مربع (أرقام صحيحة) ودالة أخرى لحساب مساحة مربع (أرقام عشرية)، يمكنك كتابة دالة واحدة باستخدام (Generics) تستقبل أي نوع من الأرقام، وسيقوم المترجم تلقائياً بتوليد النسخ المطلوبة لك في الخفاء.'
    ],
    analogy: {
      icon: '🧁',
      title: 'مثال قالب الكعك:',
      parts: [
        '<p>الكود العادي يشبه كعكة جاهزة بنكهة الفراولة. أما <code>Generics</code> فهو يشبه <strong>القالب المعدني</strong> الذي تصنع فيه الكعك. القالب لا يهتم بالنوع الأساسي (T)؛ يمكنك أن تصب فيه خليط الفراولة، الشوكولاتة، أو الفانيليا، وفي النهاية سيعطيك كعكة بنفس الشكل المثالي! أنت تكتب "القالب" مرة واحدة وتستخدمه ملايين المرات.</p>'
      ]
    },
    items: []
  }
]

const groups = [
  { id: 'basics', label: 'مفاهيم RVLB الأساسية', color: '#6366f1', concepts: concepts.filter(c => c.group === 'basics') },
  { id: 'solid', label: 'الأساسيات الصلبة', color: '#3b82f6', concepts: concepts.filter(c => c.group === 'solid') },
  { id: 'os', label: 'عصب أنظمة التشغيل', color: '#f43f5e', concepts: concepts.filter(c => c.group === 'os') },
  { id: 'advanced', label: 'المفاهيم المتقدمة', color: '#c084fc', concepts: concepts.filter(c => c.group === 'advanced') }
]

const selectedId = ref('nostd')
const active = computed(() => concepts.find(c => c.id === selectedId.value))

// Which group contains the initially selected concept
const initialGroup = groups.find(g => g.concepts.some(c => c.id === selectedId.value))?.id
const expandedGroups = ref(new Set([initialGroup]))

function toggleGroup(groupId) {
  const s = new Set(expandedGroups.value)
  s.has(groupId) ? s.delete(groupId) : s.add(groupId)
  expandedGroups.value = s
}

function selectConcept(conceptId, groupId) {
  selectedId.value = conceptId
  // ensure group stays open when concept selected
  const s = new Set(expandedGroups.value)
  s.add(groupId)
  expandedGroups.value = s
}

// Mobile navigation
// Mobile navigation
const activeIdx = computed(() => concepts.findIndex(c => c.id === selectedId.value))
function goNext() {
  const i = activeIdx.value
  if (i < concepts.length - 1) selectedId.value = concepts[i + 1].id
}
function goPrev() {
  const i = activeIdx.value
  if (i > 0) selectedId.value = concepts[i - 1].id
}

const showCinematic = ref(false)

// On mobile: open cinematic immediately
onMounted(() => {
  if (window.innerWidth <= 768) {
    showCinematic.value = true
  }
})
</script>

<template>
  <div class="rc-root">

    <!-- Ambient BG -->
    <div class="rc-bg">
      <div class="rc-orb orb-1"></div>
      <div class="rc-orb orb-2"></div>
      <div class="rc-grid"></div>
    </div>

    <!-- ── Hero ── -->
    <header class="rc-hero">
      <div class="rc-badge">
        <span class="badge-dot"></span>
        <span>RVLB · RUST CONCEPTS</span>
      </div>
      <div class="rc-title">
        <span class="title-en">Rust</span>
        <span class="title-ar">— لغة الصدأ الصلبة</span>
      </div>
      <button class="cinematic-hero-btn" @click="showCinematic = true">
        <span>🎬</span>
        <span class="btn-text">العرض التقديمي</span>
      </button>
    </header>

    <!-- ── Main Layout ── -->
    <div class="rc-layout">

      <!-- Sidebar -->
      <aside class="rc-sidebar">
        <div v-for="group in groups" :key="group.id" class="rc-nav-group">
          <!-- Accordion Header -->
          <button class="rc-nav-group-btn" @click="toggleGroup(group.id)">
            <span class="gl-dot" :style="`background: ${group.color}`"></span>
            <span class="gl-label">{{ group.label }}</span>
            <span class="gl-chevron" :class="{ open: expandedGroups.has(group.id) }">›</span>
          </button>
          <!-- Accordion Body -->
          <transition name="accordion">
            <div v-if="expandedGroups.has(group.id)" class="rc-nav-items">
              <button
                v-for="c in group.concepts"
                :key="c.id"
                class="rc-nav-item"
                :class="{ active: selectedId === c.id }"
                :style="selectedId === c.id ? `--accent: ${c.color}` : ''"
                @click="selectConcept(c.id, group.id)"
              >
                <span class="nav-icon">{{ c.icon }}</span>
                <span class="nav-label">{{ c.shortTitle }}</span>
              </button>
            </div>
          </transition>
        </div>
      </aside>

      <!-- Content Area -->
      <main class="rc-main">
        <transition name="slide-fade" mode="out-in">
          <div class="rc-card" :key="active.id">
            <div class="card-glow" :style="`background: radial-gradient(ellipse at 30% 20%, ${active.color}28 0%, transparent 65%)`"></div>

            <!-- Card Header -->
            <div class="card-header">
              <span class="card-icon">{{ active.icon }}</span>
              <div class="card-title-group">
                <h2 class="card-title" :style="`color: ${active.color}`">
                  {{ active.title }} <code>{{ active.code }}</code>
                </h2>
                <span class="card-subtitle">{{ active.subtitle }}</span>
              </div>
            </div>

            <!-- Separator -->
            <div class="card-sep" :style="`background: ${active.color}44`"></div>

            <!-- Description -->
            <div class="card-body">
              <div class="card-desc">
                <p v-for="(p, i) in active.description" :key="i" v-html="p"></p>
              </div>

              <!-- Analogy Box -->
              <div class="analogy-box" :style="`border-color: ${active.color}44; background: ${active.color}0d`">
                <div class="analogy-top">
                  <span class="analogy-emoji">{{ active.analogy.icon }}</span>
                  <h4 class="analogy-title" :style="`color: ${active.color}`">{{ active.analogy.title }}</h4>
                </div>
                <div class="analogy-parts">
                  <div v-for="(part, i) in active.analogy.parts" :key="i" v-html="part" class="analogy-part"></div>
                </div>
              </div>

              <!-- Feature Items -->
              <div v-if="active.items && active.items.length" class="items-grid">
                <div v-for="item in active.items" :key="item.title" class="feat-item">
                  <span class="feat-icon">{{ item.icon }}</span>
                  <div class="feat-text">
                    <h3>{{ item.title }}</h3>
                    <p v-html="item.text"></p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </transition>
      </main>

    </div>

    <!-- Mobile Bottom Nav -->
    <nav class="rc-mobile-nav">
      <button class="mob-nav-btn" :disabled="activeIdx === 0" @click="goPrev">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div class="mob-nav-info">
        <span class="mob-concept-icon">{{ active.icon }}</span>
        <div class="mob-nav-text">
          <span class="mob-group-name">{{ groups.find(g => g.concepts.some(c => c.id === selectedId))?.label }}</span>
          <span class="mob-concept-name">{{ active.shortTitle }}</span>
        </div>
        <span class="mob-counter">{{ activeIdx + 1 }}/{{ concepts.length }}</span>
      </div>
      <button class="mob-nav-btn" :disabled="activeIdx === concepts.length - 1" @click="goNext">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </nav>

    <!-- ── Cinematic Overlay ── -->
    <transition name="bg-fade">
      <RustCinematic v-if="showCinematic" @close="showCinematic = false" />
    </transition>
  </div>
</template>

<style scoped>
/* ── Root ── */
.rc-root {
  min-height: 100vh;
  background: #020206;
  color: #e2e8f0;
  font-family: 'Cairo', 'Inter', sans-serif;
  direction: rtl;
  position: relative;
  overflow-x: hidden;
}

/* ── Background ── */
.rc-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
.rc-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.18;
  animation: drift 18s ease-in-out infinite alternate;
}
.orb-1 { width: 600px; height: 600px; top: -120px; right: -120px; background: #f97316; }
.orb-2 { width: 500px; height: 500px; bottom: -80px; left: -100px; background: #6366f1; animation-delay: -9s; }
.rc-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}
@keyframes drift { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,30px) scale(1.08); } }

/* ── Hero ── */
.rc-hero {
  position: relative; z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 0.85rem 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(0,0,0,0.15);
}
.rc-badge {
  display: inline-flex; align-items: center; gap: 0.45rem;
  font-size: 0.62rem; font-weight: 800; letter-spacing: 0.16em;
  color: rgba(255,255,255,0.4);
  border: 1px solid rgba(249,115,22,0.2);
  border-radius: 100px; padding: 0.25rem 0.75rem;
  background: rgba(249,115,22,0.05);
  flex-shrink: 0;
}
.badge-dot { width: 5px; height: 5px; border-radius: 50%; background: #f97316; box-shadow: 0 0 6px #f97316; }
.rc-title { display: flex; align-items: center; gap: 0.6rem; }
.rc-title { display: flex; align-items: baseline; gap: 0.5rem; }
.title-en { font-size: 2.2rem; font-weight: 900; }
.title-ar { font-size: 0.85rem; font-weight: 600; color: rgba(255,255,255,0.3); }

.cinematic-hero-btn {
  display: flex; align-items: center; gap: 0.6rem;
  background: rgba(249,115,22,0.15); border: 1px solid rgba(249,115,22,0.4);
  color: #f97316; padding: 0.4rem 1.2rem; border-radius: 100px;
  font-family: inherit; font-weight: 700; font-size: 0.85rem;
  cursor: pointer; transition: all 0.25s ease;
}
.cinematic-hero-btn:hover {
  background: rgba(249,115,22,0.3);
  box-shadow: 0 0 15px rgba(249,115,22,0.4);
  transform: translateY(-2px);
}

/* ── Layout ── */
.rc-layout {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 1fr;
  gap: 0;
  height: calc(100vh - 112px); /* 64px VitePress navbar + 48px our hero */
}

/* ── Sidebar ── */
.rc-sidebar {
  border-left: 1px solid rgba(255,255,255,0.05);
  padding: 1.5rem 1rem 1.5rem 0;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  background: rgba(255,255,255,0.01);
  box-sizing: border-box;
}
.rc-nav-group { margin-bottom: 0.3rem; }

/* Accordion trigger button */
.rc-nav-group-btn {
  display: flex; align-items: center; gap: 0.5rem;
  width: 100%; padding: 0.6rem 0.7rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 10px;
  cursor: pointer; font-family: inherit;
  transition: all 0.2s ease;
}
.rc-nav-group-btn:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.12); }
.gl-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.gl-label {
  flex: 1; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em;
  color: rgba(255,255,255,0.55); text-transform: uppercase; text-align: right;
}
.gl-chevron {
  font-size: 1.1rem; color: rgba(255,255,255,0.3);
  transition: transform 0.25s ease;
  display: inline-block;
  transform: rotate(90deg);
}
.gl-chevron.open { transform: rotate(-90deg); }

/* Items container */
.rc-nav-items { padding: 0.3rem 0 0.3rem 0.5rem; }
.rc-nav-item {
  display: flex; align-items: center; gap: 0.6rem;
  width: 100%; padding: 0.5rem 0.8rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 9px;
  color: rgba(255,255,255,0.45);
  font-family: inherit; font-size: 0.82rem; font-weight: 600;
  cursor: pointer; transition: all 0.2s ease;
  text-align: right; direction: rtl;
  margin-bottom: 0.1rem;
}
.rc-nav-item:hover { color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.05); }
.rc-nav-item.active {
  color: var(--accent);
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}
.nav-icon { font-size: 1rem; flex-shrink: 0; }
.nav-label { flex: 1; }

/* ── Main Content ── */
.rc-main {
  padding: 2rem;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  box-sizing: border-box;
}

/* ── Custom Scrollbar ── */
.rc-main::-webkit-scrollbar, .rc-sidebar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.rc-main::-webkit-scrollbar-track, .rc-sidebar::-webkit-scrollbar-track {
  background: transparent;
}
.rc-main::-webkit-scrollbar-thumb, .rc-sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
}
.rc-main::-webkit-scrollbar-thumb:hover, .rc-sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* ── Card ── */
.rc-card {
  position: relative;
  background: rgba(255,255,255,0.028);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  overflow: hidden;
  min-height: 400px;
}
.card-glow {
  position: absolute; inset: 0; pointer-events: none;
  border-radius: 20px;
}
.card-header {
  position: relative; z-index: 1;
  display: flex; align-items: center; gap: 1.2rem;
  padding: 1.8rem 2rem 1.4rem;
}
.card-icon {
  font-size: 2.5rem; flex-shrink: 0;
  filter: drop-shadow(0 0 12px currentColor);
}
.card-title-group { flex: 1; }
.card-title {
  font-size: clamp(1.2rem, 3vw, 1.7rem);
  font-weight: 900; margin: 0 0 0.3rem;
  display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
}
.card-title code {
  font-size: 0.8em; background: rgba(255,255,255,0.08);
  padding: 0.15em 0.5em; border-radius: 6px;
  font-family: 'Fira Code', monospace; color: inherit;
}
.card-subtitle { font-size: 0.85rem; color: rgba(255,255,255,0.4); font-weight: 500; }
.card-sep { height: 1px; margin: 0 2rem; opacity: 0.6; }

/* ── Body ── */
.card-body { position: relative; z-index: 1; padding: 1.5rem 2rem 2rem; }
.card-desc p { color: rgba(255,255,255,0.7); line-height: 1.8; margin-bottom: 0.8rem; font-size: 0.95rem; }
.card-desc p:last-child { margin-bottom: 0; }
.card-desc code { background: rgba(255,255,255,0.1); padding: 0.1em 0.4em; border-radius: 4px; font-size: 0.88em; }

/* ── Analogy ── */
.analogy-box {
  margin-top: 1.5rem;
  border: 1px solid; border-radius: 14px;
  padding: 1.3rem 1.5rem;
}
.analogy-top { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1rem; }
.analogy-emoji { font-size: 1.8rem; }
.analogy-title { font-size: 1rem; font-weight: 800; margin: 0; }
.analogy-parts .analogy-part { color: rgba(255,255,255,0.7); line-height: 1.8; font-size: 0.9rem; margin-bottom: 0.7rem; }
.analogy-parts .analogy-part:last-child { margin-bottom: 0; }
.analogy-parts :deep(p) { margin: 0 0 0.6rem; }
.analogy-parts :deep(h5) { color: rgba(255,255,255,0.8); font-size: 0.9rem; margin: 0.8rem 0 0.3rem; }
.analogy-parts :deep(strong) { color: #fff; }
.analogy-parts :deep(code) { background: rgba(255,255,255,0.1); padding: 0.1em 0.4em; border-radius: 4px; font-size: 0.85em; }
.analogy-parts :deep(em) { color: rgba(255,255,255,0.85); font-style: italic; }

/* ── Items Grid ── */
.items-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; }
.feat-item {
  display: flex; align-items: flex-start; gap: 0.9rem;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px; padding: 1rem 1.1rem;
}
.feat-icon { font-size: 1.5rem; flex-shrink: 0; margin-top: 0.1rem; }
.feat-text h3 { font-size: 0.9rem; font-weight: 800; margin: 0 0 0.4rem; color: rgba(255,255,255,0.9); }
.feat-text p { font-size: 0.82rem; color: rgba(255,255,255,0.55); line-height: 1.7; margin: 0; }
.feat-text :deep(code) { background: rgba(255,255,255,0.1); padding: 0.1em 0.35em; border-radius: 4px; font-size: 0.85em; }

/* ── Highlight ── */
:deep(.hl) { color: #f97316; font-weight: 700; }

/* ── Transition ── */
.accordion-enter-active, .accordion-leave-active {
  transition: all 0.25s ease-in-out;
  overflow: hidden;
}
.accordion-enter-from, .accordion-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.accordion-enter-to, .accordion-leave-from {
  opacity: 1;
  max-height: 500px; /* enough to fit items */
}

.slide-fade-enter-active { transition: all 0.25s ease; }
.slide-fade-leave-active { transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1); position: absolute; width: 100%; }
.slide-fade-enter-from { opacity: 0; transform: translateY(8px); }
.slide-fade-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── Cinematic Transition ── */
.bg-fade-enter-active, .bg-fade-leave-active { transition: opacity 0.5s ease; }
.bg-fade-enter-from, .bg-fade-leave-to { opacity: 0; }

/* ── Responsive ── */
.rc-mobile-nav { display: none; }

@media (max-width: 768px) {
  /* Hide sidebar — too many items for mobile */
  .rc-sidebar { display: none !important; }

  /* Hide desktop layout to prevent flash before card renders */
  .rc-layout { visibility: hidden; }

  .rc-layout {
    grid-template-columns: 1fr;
    height: calc(100vh - 48px - 64px); /* hero + bottom nav */
  }

  .items-grid { grid-template-columns: 1fr; }
  .rc-main { padding: 1rem; height: 100%; padding-bottom: 0; }
  .card-header { padding: 1.2rem 1.2rem 0.8rem; gap: 0.9rem; }
  .card-icon { font-size: 2rem; }
  .card-body { padding: 1rem 1.2rem 1.5rem; }

  /* Show mobile bottom nav */
  .rc-mobile-nav {
    display: flex;
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 500;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 1rem;
    background: rgba(2, 2, 6, 0.92);
    backdrop-filter: blur(16px);
    border-top: 1px solid rgba(255,255,255,0.07);
    height: 64px;
    box-sizing: border-box;
  }

  .mob-nav-btn {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    color: white;
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0;
    transition: all 0.2s ease;
  }
  .mob-nav-btn:hover:not(:disabled) { background: rgba(255,255,255,0.15); }
  .mob-nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }

  .mob-nav-info {
    flex: 1; display: flex; align-items: center; gap: 0.6rem; min-width: 0;
  }

  .mob-concept-icon { font-size: 1.4rem; flex-shrink: 0; }

  .mob-nav-text {
    display: flex; flex-direction: column; min-width: 0; flex: 1;
  }

  .mob-group-name {
    font-size: 0.65rem; color: rgba(255,255,255,0.35); font-weight: 600;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .mob-concept-name {
    font-size: 0.88rem; font-weight: 700; color: rgba(255,255,255,0.9);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .mob-counter {
    font-size: 0.75rem; color: rgba(255,255,255,0.3);
    font-weight: 700; flex-shrink: 0;
    font-family: 'Inter', monospace;
  }
}
</style>
