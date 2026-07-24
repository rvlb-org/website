export const conceptsList = [
  { id: 'capabilities', emoji: '🔑', title: 'من يحق له التحدث مع نواة seL4؟', ready: true },
  { id: 'compare',      emoji: '⚔️', title: 'ما يميزنا عن المنافسين',             ready: true },
  { id: 'ipc',          emoji: '📡', title: 'كيف تتواصل الحاويات مع بعض؟',     ready: false },
  { id: 'memory',       emoji: '🧠', title: 'كيف يتم عزل الذاكرة؟',             ready: false },
  { id: 'scheduler',    emoji: '⏱️', title: 'كيف يُجدوِل النظام المهام؟',        ready: false },
];

export const capEntities = [
  { id: 'kernel',  icon: '⚙️', name: 'seL4 Kernel',       role: 'النواة نفسها',                 allowed: true,  color: '#0077ff', reason: 'النواة تتحكم بكل شيء — هي مصدر الصلاحيات' },
  { id: 'init',    icon: '🚀', name: 'Init Thread',         role: 'أول خيط يشتغل',               allowed: true,  color: '#00d4ff', reason: 'يمتلك Capability كاملة بعد الإقلاع، هو من يوزع الصلاحيات لباقي العمليات' },
  { id: 'vaults',  icon: '🔐', name: 'Vault Processes',     role: 'حاويات النظام (FS, Auth...)',  allowed: true,  color: '#a855f7', reason: 'تمتلك Capabilities محددة منحها إياها Init — تستطيع استدعاء النواة لعمليات بعينها فقط' },
  { id: 'driver',  icon: '🖥️', name: 'Device Drivers',      role: 'سائقو الأجهزة',               allowed: true,  color: '#22c55e', reason: 'تعمل في User Space وتمتلك Capability لمنطقة ذاكرة الجهاز فقط — عزل تام' },
  { id: 'apps',    icon: '📱', name: 'User Apps',            role: 'التطبيقات العادية',            allowed: false, color: '#ef4444', reason: 'لا تملك Capability مباشرة للنواة — يجب أن تمر عبر System Bus أولاً' },
  { id: 'malware', icon: '💀', name: 'Attacker / Malware',  role: 'برمجية خبيثة',                 allowed: false, color: '#ff6b00', reason: 'حتى لو اخترق تطبيقاً، لا Capability = لا وصول للنواة. العزل يمنع الانتشار' },
];
