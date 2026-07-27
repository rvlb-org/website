// NetworkData.js — The 29 Stages of the Network Journey

export const concepts = [
  // ─── GROUP 1: LOCAL ───────────────────────────────────────────────────────
  {
    id: 'physical', icon: '⚡', color: '#f59e0b',
    shortTitle: 'Physical Layer',
    title: 'لغة الأسلاك',
    subtitle: 'المحطة 1 · الطبقة الفيزيائية',
    group: 'local', groupLabel: 'الشبكة المحلية',
    description: 'رحلتنا تبدأ فيزيائياً. الحواسيب لا تفهم النصوص بل نبضات كهربائية فقط (0 و 1). كل بت يتحوّل إلى إشارة تسافر عبر كابلات النحاس أو ومضة ضوء في ألياف بصرية.',
    analogy: { icon: '🔦', text: 'تخيل أنك على قمة جبل تومض مصباحاً لصديقك — بمورس — لترسل الحروف. الطبقة لا تهتم بمعنى الرسالة، فقط بكيفية نقل الضوء.' }
  },
  {
    id: 'wifi', icon: '📡', color: '#0ea5e9',
    shortTitle: 'Wi-Fi & Radio',
    title: 'الأمواج في الهواء',
    subtitle: 'المحطة 2 · اللاسلكي',
    group: 'local', groupLabel: 'الشبكة المحلية',
    description: 'ماذا لو لا يوجد سلك؟ النبضات تتحوّل إلى موجات راديو تسبح في الهواء. عبر Wi-Fi يُعدّل تردد الموجات ليمثّل الأصفار والآحاد، ثم يُترجمها الراوتر.',
    analogy: { icon: '📻', text: 'محطة الإذاعة لا ترسل لك شريط كاسيت، بل تبثّ موجات. هوائي سيارتك يلتقطها ويحولها إلى صوت.' }
  },
  {
    id: 'mac', icon: '🤝', color: '#10b981',
    shortTitle: 'Ethernet & MAC',
    title: 'مصافحة الجيران',
    subtitle: 'المحطة 3 · Data Link Layer',
    group: 'local', groupLabel: 'الشبكة المحلية',
    description: 'عندما يتصل أجهزة عدة بنفس الشبكة، كيف لا يتحدثان في آنٍ واحد؟ MAC Address هو بصمة بطاقة الشبكة الفريدة. البيانات تُعبّأ في "إطارات" منظمة.',
    analogy: { icon: '🗣️', text: 'طاولة مستديرة: كل شخص له اسم (MAC). أحمد يقول "يا خالد خذ هذه الورقة" — الكل يسمع لكن خالد وحده يأخذها.' }
  },
  {
    id: 'loopback', icon: '🔁', color: '#f43f5e',
    shortTitle: 'Localhost',
    title: 'المرآة الداخلية',
    subtitle: 'المحطة 4 · 127.0.0.1',
    group: 'local', groupLabel: 'الشبكة المحلية',
    description: 'تريد إرسال بيانات من تطبيق لآخر داخل نفس الجهاز؟ نظام التشغيل يوفّر شبكة وهمية اسمها Loopback. البيانات تعود من حيث أتت بسرعة البرق.',
    analogy: { icon: '🪞', text: 'لا تحتاج رسالة بريدية لتذكّر نفسك بشيء. تنظر في المرآة وتقوله لنفسك — أسرع اتصال داخلي ممكن.' }
  },
  {
    id: 'dhcp', icon: '🙋', color: '#3b82f6',
    shortTitle: 'DHCP',
    title: 'طلب هوية',
    subtitle: 'المحطة 5 · DHCP',
    group: 'local', groupLabel: 'الشبكة المحلية',
    description: 'جهازك متصل لكن بلا رقم. يصرخ للجميع (Broadcast): "هل يوجد خادم يعطيني IP؟" فيرد الراوتر (DHCP) بعنوان مؤقت.',
    analogy: { icon: '🎫', text: 'دخلت فندقاً وصرخت في البهو: "أين الاستقبال؟" جاءك الموظف وأعطاك بطاقة غرفتك.' }
  },
  {
    id: 'subnet', icon: '📏', color: '#8b5cf6',
    shortTitle: 'Subnetting',
    title: 'الحدود الجغرافية',
    subtitle: 'المحطة 6 · Subnet Mask',
    group: 'local', groupLabel: 'الشبكة المحلية',
    description: 'جهازك يريد مراسلة هدف — هل هو في نفس الحي أم في قارة أخرى؟ Subnet Mask مسطرة تقسّم العنوان: جزء للشبكة وجزء للجهاز.',
    analogy: { icon: '🚧', text: 'سور حيّك السكني. تزور جارك مباشرة، أما من في مدينة أخرى — تخرج من البوابة (الراوتر).' }
  },
  {
    id: 'arp', icon: '🔍', color: '#6366f1',
    shortTitle: 'ARP',
    title: 'دفتر عناوين الحي',
    subtitle: 'المحطة 7 · ARP Protocol',
    group: 'local', groupLabel: 'الشبكة المحلية',
    description: 'نعرف IP الهدف، لكن الأجهزة المحلية تتحدث فقط بـ MAC. ARP يسأل الشبكة كلها ليعرف الهوية الفيزيائية المقابلة.',
    analogy: { icon: '📢', text: 'تصرخ في القاعة: "من صاحب الرقم 055-1234؟" يجيبك أحمد: "أنا صاحبه!"' }
  },
  {
    id: 'vlan', icon: '🧱', color: '#ec4899',
    shortTitle: 'VLANs',
    title: 'الجدران الوهمية',
    subtitle: 'المحطة 8 · VLAN',
    group: 'local', groupLabel: 'الشبكة المحلية',
    description: 'مئات الموظفين على راوتر واحد؟ VLAN يقسّم السلك الواحد إلى شبكات معزولة برمجياً — كأنها منفصلة فيزيائياً.',
    analogy: { icon: '🏢', text: 'قاعة ضخمة بجدران زجاجية عازلة للصوت بين قسم المحاسبة والإدارة.' }
  },

  // ─── GROUP 2: INTERNET ────────────────────────────────────────────────────
  {
    id: 'isp_nat', icon: '📡', color: '#10b981',
    shortTitle: 'NAT & ISP',
    title: 'الخروج من المنزل',
    subtitle: 'المحطة 9 · NAT',
    group: 'internet', groupLabel: 'الإنترنت والنقل',
    description: 'الأجهزة داخل منزلك تملك عناوين محلية لا يعرفها الإنترنت. NAT في الراوتر يترجمها إلى عنوان عام واحد يمثّل المنزل بالكامل.',
    analogy: { icon: '🏢', text: 'رقمك الداخلي 105. موظف الاستقبال (NAT) يستقبل المكالمة على رقم الشركة ثم يحوّلها لك سراً.' }
  },
  {
    id: 'dns', icon: '📖', color: '#0ea5e9',
    shortTitle: 'DNS',
    title: 'دليل الهاتف',
    subtitle: 'المحطة 10 · DNS',
    group: 'internet', groupLabel: 'الإنترنت والنقل',
    description: 'نحفظ الأسماء لا الأرقام. جهازك يسأل DNS: "ما IP جوجل؟" فيرد بالرقم الفعلي.',
    analogy: { icon: '📞', text: 'تبحث عن "خالد" في جهات اتصالك فيتصل الهاتف برقمه تلقائياً — DNS هو جهات الاتصال للإنترنت.' },
    img: '/assets/images/cinematic_dns_phonebook_1785186804554.png'
  },
  {
    id: 'ip', icon: '🌍', color: '#3b82f6',
    shortTitle: 'IP Address',
    title: 'التذكرة العالمية',
    subtitle: 'المحطة 11 · Network Layer',
    group: 'internet', groupLabel: 'الإنترنت والنقل',
    description: 'IP Address يُوضع على الرزمة كعنوان وجهة — معرّف عالمي فريد يُستخدم في كل خطوة عبر العالم.',
    analogy: { icon: '✉️', text: 'لحظة كتابة عنوان المرسل إليه (دولة، مدينة، شارع) على المغلف.' }
  },
  {
    id: 'ipv6', icon: '🌌', color: '#8b5cf6',
    shortTitle: 'IPv6',
    title: 'عالم بلا حدود',
    subtitle: 'المحطة 12 · IPv6',
    group: 'internet', groupLabel: 'الإنترنت والنقل',
    description: 'عناوين IPv4 نفدت! IPv6 يمنحنا 340 أندشيليون عنوان — يكفي لإعطاء IP لكل ذرة رمل في الأرض عدة مرات.',
    analogy: { icon: '🔢', text: 'نفدت لوحات السيارات ذات 3 أرقام فأصدروا لوحات بـ 7 حروف و7 أرقام.' }
  },
  {
    id: 'vpn', icon: '🚇', color: '#6366f1',
    shortTitle: 'VPN & Tunnels',
    title: 'الأنفاق السرية',
    subtitle: 'المحطة 13 · VPN',
    group: 'internet', groupLabel: 'الإنترنت والنقل',
    description: 'VPN يشفّر رزمتك كاملاً ويضعها في رزمة أخرى تتجه لخادم VPN، الذي يفكّها ويرسلها نيابةً عنك.',
    analogy: { icon: '📦', text: 'تضع رسالتك في ظرف أسود مختوم. شركة التوصيل تأخذه وتوصّل رسالتك لصديقك سراً.' },
    img: '/assets/images/cinematic_vpn_tunnel_1785186855122.png'
  },
  {
    id: 'bgp', icon: '🕸️', color: '#8b5cf6',
    shortTitle: 'BGP & Routers',
    title: 'شرايين الإنترنت',
    subtitle: 'المحطة 14 · BGP',
    group: 'internet', groupLabel: 'الإنترنت والنقل',
    description: 'BGP هو بروتوكول تواصل الموجهات الكبرى. يبحث عن أسرع مسار ويتجنب الكابلات المقطوعة في الوقت الفعلي.',
    analogy: { icon: '🗺️', text: 'Google Maps للإنترنت: "طريق لندن مزدحم، سأوجّه عبر باريس".' }
  },
  {
    id: 'icmp', icon: '🩺', color: '#14b8a6',
    shortTitle: 'ICMP / Ping',
    title: 'نبض الحياة',
    subtitle: 'المحطة 15 · ICMP',
    group: 'internet', groupLabel: 'الإنترنت والنقل',
    description: 'أمر Ping يرسل رسائل تشخيصية قصيرة تعود فوراً لقياس سرعة الاستجابة والتأكد أن الخادم حي.',
    analogy: { icon: '🗣️', text: 'تصرخ في كهف. إن عاد الصدى سريعاً فالكهف قصير. إن لم يعد — الطريق مسدود.' }
  },
  {
    id: 'tcpudp', icon: '⚖️', color: '#ec4899',
    shortTitle: 'TCP vs UDP',
    title: 'الثقة أم السرعة؟',
    subtitle: 'المحطة 16 · Transport Layer',
    group: 'internet', groupLabel: 'الإنترنت والنقل',
    description: 'TCP صارم يتأكد من وصول كل جزء بالترتيب (للملفات). UDP سريع لا يكترث للضياع (للألعاب والبث المباشر).',
    analogy: { icon: '📮', text: 'ساعي البريد يطلب توقيعك على كل رسالة (TCP). بائع جرائد يرمي الجريدة من دراجته (UDP).' },
    img: '/assets/images/cinematic_tcp_udp_scale_1785186832142.png'
  },
  {
    id: 'qos', icon: '⭐', color: '#f59e0b',
    shortTitle: 'QoS',
    title: 'أولوية المرور',
    subtitle: 'المحطة 17 · QoS',
    group: 'internet', groupLabel: 'الإنترنت والنقل',
    description: 'QoS يُعلّم بعض الرزم كـ VIP فتعطيها الموجهات الأولوية (مكالمات الفيديو تتقدم على تحميل الملفات).',
    analogy: { icon: '🚑', text: 'سيارات الإسعاف تشغّل صفارات الإنذار لتفسح لها بقية السيارات الطريق في الزحام.' }
  },

  // ─── GROUP 3: INFRASTRUCTURE ──────────────────────────────────────────────
  {
    id: 'firewall', icon: '🛡️', color: '#f43f5e',
    shortTitle: 'Firewalls / IDS',
    title: 'حرس الحدود',
    subtitle: 'المحطة 18 · Firewall & IDS',
    group: 'infra', groupLabel: 'البنية التحتية',
    description: 'أول خط دفاع: جدار الحماية (Firewall) وأنظمة كشف التسلل (IDS). إن كانت الرزمة مشبوهة تُسقَط فوراً.',
    analogy: { icon: '👮', text: 'شرطي يتفحّص جواز سفرك: "هل تحمل فيروسات؟ هل أنت في القائمة السوداء؟"' },
    img: '/assets/images/cinematic_firewall_1785186813078.png'
  },
  {
    id: 'lb', icon: '🔀', color: '#0ea5e9',
    shortTitle: 'Load Balancers',
    title: 'موزّع الأحمال',
    subtitle: 'المحطة 19 · Load Balancer',
    group: 'infra', groupLabel: 'البنية التحتية',
    description: 'مواقع ضخمة لديها آلاف الخوادم. Load Balancer يحوّل طلبك إلى الخادم الأقل انشغالاً.',
    analogy: { icon: '🎫', text: '10 موظفين في شباك التذاكر. النظام يقول: "اذهب للشباك 4 فهو فارغ الآن".' }
  },
  {
    id: 'cdn', icon: '⚡', color: '#10b981',
    shortTitle: 'CDN',
    title: 'المستودعات القريبة',
    subtitle: 'المحطة 20 · CDN',
    group: 'infra', groupLabel: 'البنية التحتية',
    description: 'CDN تحتفظ بنسخة من الملفات الثابتة في مدينتك — لا تحتاج للسفر إلى أمريكا لتحميل صورة.',
    analogy: { icon: '🏪', text: 'بدلاً من السفر للمصنع تجد منتجاته في البقالة القريبة منك.' }
  },
  {
    id: 'ports', icon: '🚪', color: '#8b5cf6',
    shortTitle: 'Ports & Sockets',
    title: 'أبواب العمارة',
    subtitle: 'المحطة 21 · Ports',
    group: 'infra', groupLabel: 'البنية التحتية',
    description: 'الخادم يشغّل عشرات التطبيقات. Port 80 للويب، 443 للآمن. IP + Port = Socket.',
    analogy: { icon: '🏢', text: 'IP هو عنوان العمارة الرئيسي، Port هو رقم الشقة بداخلها.' }
  },

  // ─── GROUP 4: RVLB BARE METAL ─────────────────────────────────────────────
  {
    id: 'nic_mmio', icon: '🖧', color: '#14b8a6',
    shortTitle: 'NIC & MMIO',
    title: 'التحكم بالعتاد',
    subtitle: 'المحطة 22 · MMIO',
    group: 'rvlb', groupLabel: 'RVLB — الحديد العاري',
    description: 'في RVLB نبرمج بطاقة الشبكة عبر MMIO: نكتب أوامر في مواقع ذاكرة محددة فتستجيب البطاقة مباشرة.',
    analogy: { icon: '🎛️', text: 'المعالج يضغط زراً (يكتب في الذاكرة) فتنفّذ بطاقة الشبكة الأمر على الفور.' }
  },
  {
    id: 'dma_rings', icon: '🔄', color: '#0ea5e9',
    shortTitle: 'DMA Rings',
    title: 'الوصول المباشر',
    subtitle: 'المحطة 23 · DMA',
    group: 'rvlb', groupLabel: 'RVLB — الحديد العاري',
    description: 'DMA تسمح لبطاقة الشبكة بوضع الرزم مباشرة في RAM دون إزعاج المعالج.',
    analogy: { icon: '🏭', text: 'بدلاً من أن يحمل المدير الصناديق بيده، الحزام الناقل ينقلها للمستودع مباشرة.' }
  },
  {
    id: 'interrupts', icon: '🔔', color: '#f59e0b',
    shortTitle: 'Interrupts (IRQ)',
    title: 'المقاطعات الكهربائية',
    subtitle: 'المحطة 24 · IRQ',
    group: 'rvlb', groupLabel: 'RVLB — الحديد العاري',
    description: 'عند اكتمال نقل الرزمة، البطاقة ترسل مقاطعة كهربائية (Interrupt) — المعالج يترك ما بيده ويعالجها فوراً.',
    analogy: { icon: '🔔', text: 'الساعي يضع الطرد ويدق الجرس — بدلاً من أن تفتح الباب كل دقيقة للتحقق.' }
  },
  {
    id: 'net_stack', icon: '🧠', color: '#8b5cf6',
    shortTitle: 'smoltcp Stack',
    title: 'مكدس الشبكة',
    subtitle: 'المحطة 25 · smoltcp',
    group: 'rvlb', groupLabel: 'RVLB — الحديد العاري',
    description: 'نستخدم مكتبة smoltcp لتحليل البايتات الخام واستخراج البيانات عبر طبقات الـ Ethernet ثم IP ثم TCP.',
    analogy: { icon: '🕵️', text: 'مترجم يفتح الأظرف المتتالية (Ethernet → IP → TCP) ليسلّمك الرسالة النهائية.' }
  },

  // ─── GROUP 5: APPLICATIONS ────────────────────────────────────────────────
  {
    id: 'socket_api', icon: '🔌', color: '#10b981',
    shortTitle: 'Sockets API',
    title: 'واجهة البرمجة',
    subtitle: 'المحطة 26 · Sockets API',
    group: 'apps', groupLabel: 'التطبيقات والبرامج',
    description: 'البرنامج ينشئ مقبساً (Socket) ويستدعي read()، فيسلّمه نظام التشغيل مصفوفة البايتات الجاهزة.',
    analogy: { icon: '📬', text: 'البرنامج يفتح صندوق بريده بمفتاحه الخاص ويقرأ رسائله فوراً.' }
  },
  {
    id: 'async_net', icon: '⏳', color: '#f43f5e',
    shortTitle: 'Async & epoll',
    title: 'الانتظار الذكي',
    subtitle: 'المحطة 27 · Async/epoll',
    group: 'apps', groupLabel: 'التطبيقات والبرامج',
    description: 'عبر epoll أو Async، البرنامج لا ينتظر الرسالة ليتجمّد — يقول لنظام التشغيل: "أيقظني عند وصول بيانات".',
    analogy: { icon: '👨‍🍳', text: 'الشيف لا ينتظر أمام الفرن — يضع مؤقتاً ويذهب لتقطيع الخضروات.' }
  },
  {
    id: 'http_tls', icon: '🌐', color: '#3b82f6',
    shortTitle: 'HTTP & TLS',
    title: 'لغة البشر والتشفير',
    subtitle: 'المحطة 28 · HTTP/TLS',
    group: 'apps', groupLabel: 'التطبيقات والبرامج',
    description: 'TLS يفكّ التشفير، ثم يقرأ المتصفح HTTP ليرسم صفحة الويب أمامك.',
    analogy: { icon: '🎁', text: 'نفتح الصندوق بالمفتاح السري لنجد رسالة مكتوبة نفهمها.' }
  },
  {
    id: 'websockets', icon: '📞', color: '#0ea5e9',
    shortTitle: 'WebSockets',
    title: 'الخط الساخن',
    subtitle: 'المحطة 29 · WebSockets',
    group: 'apps', groupLabel: 'التطبيقات والبرامج',
    description: 'HTTP يفتح الخط ويغلقه بعد كل رسالة. WebSockets يفتح قناة ثنائية الاتجاه تبقى مفتوحة بلا انقطاع للزمن الفعلي.',
    analogy: { icon: '📞', text: 'بدلاً من رسائل بريدية ذهاباً وإياباً — نفتح مكالمة مفتوحة 24 ساعة نتحدث متى نشاء.' }
  }
]

export const groups = {
  local: { id: 'local', name: 'الشبكة المحلية', color: '#10b981', bg: '/assets/images/bg_local_1785183761719.png' },
  internet: { id: 'internet', name: 'الإنترنت الموسع', color: '#3b82f6', bg: '/assets/images/bg_internet_1785183777021.png' },
  infra: { id: 'infra', name: 'البنية التحتية والخوادم', color: '#8b5cf6', bg: '/assets/images/bg_infra_1785183786815.png' },
  apps: { id: 'apps', name: 'طبقة التطبيقات', color: '#f59e0b', bg: '/assets/images/bg_apps_1785183813903.png' },
  rvlb: { id: 'rvlb', name: 'بروتوكول rvlb', color: '#ef4444', bg: '/assets/images/bg_rvlb_1785183804153.png' }
}
