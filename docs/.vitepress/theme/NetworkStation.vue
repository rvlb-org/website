<!-- NetworkStation.vue — One scrollytelling station with CSS illustration + text -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  concept:  { type: Object,  required: true },
  index:    { type: Number,  required: true },
  isActive: { type: Boolean, default: false }
})

// Map concept id → which illustration scene to show
const sceneMap = {
  physical:   'bits-wire',
  wifi:       'wifi-waves',
  mac:        'two-computers',
  loopback:   'mirror',
  dhcp:       'hotel-desk',
  subnet:     'neighborhood',
  arp:        'loudspeaker',
  vlan:       'glass-walls',
  isp_nat:    'building-nat',
  dns:        'phonebook',
  ip:         'globe-pin',
  ipv6:       'infinite-addresses',
  vpn:        'tunnel',
  bgp:        'world-map',
  icmp:       'ping-echo',
  tcpudp:     'scale',
  qos:        'ambulance',
  firewall:   'brick-wall',
  lb:         'ticket-windows',
  cdn:        'local-shop',
  ports:      'apartment-doors',
  nic_mmio:   'cockpit',
  dma_rings:  'conveyor-belt',
  interrupts: 'doorbell',
  net_stack:  'nested-envelopes',
  socket_api: 'mailbox',
  async_net:  'chef',
  http_tls:   'gift-unlock',
  websockets: 'open-call',
}
const scene = computed(() => sceneMap[props.concept.id] || 'default')
</script>

<template>
  <section
    class="ns-root"
    :class="{ 'is-active': isActive }"
    :style="`--c: ${concept.color}`"
  >
    <!-- ─── Illustration (LEFT) ─── -->
    <div class="ns-illustration">
      <!-- Scene art box -->
      <div class="ns-scene-box" :class="{ 'scene-active': isActive }">
        <!-- Horizontal connector pointing to the main wire on the right -->
        <div class="ns-branch" :class="{ lit: isActive }"></div>

        <!-- ── bits-wire ── -->
        <svg v-if="scene === 'bits-wire'" viewBox="0 0 200 120" class="ns-svg">
          <line x1="10" y1="60" x2="190" y2="60" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
          <line x1="10" y1="60" x2="190" y2="60" stroke="var(--c)" stroke-width="3" stroke-linecap="round"
                stroke-dasharray="8 6" class="anim-dash"/>
          <text x="18" y="44" font-size="18" fill="var(--c)" class="bit-text">0</text>
          <text x="54" y="44" font-size="18" fill="#fff" class="bit-text delay1">1</text>
          <text x="90" y="44" font-size="18" fill="var(--c)" class="bit-text delay2">0</text>
          <text x="126" y="44" font-size="18" fill="#fff" class="bit-text delay3">1</text>
          <text x="162" y="44" font-size="18" fill="var(--c)" class="bit-text delay4">1</text>
          <rect x="0" y="50" width="200" height="20" fill="url(#wireGrad)" rx="4"/>
          <defs>
            <linearGradient id="wireGrad" x1="0" x2="1">
              <stop offset="0%" stop-color="var(--c)" stop-opacity="0.05"/>
              <stop offset="50%" stop-color="var(--c)" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="var(--c)" stop-opacity="0.05"/>
            </linearGradient>
          </defs>
          <text x="100" y="90" text-anchor="middle" font-size="10" fill="#64748b">إشارات كهربائية تسافر عبر النحاس</text>
        </svg>

        <!-- ── wifi-waves ── -->
        <svg v-else-if="scene === 'wifi-waves'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Router box -->
          <rect x="80" y="85" width="40" height="25" rx="4" fill="#1e293b" stroke="var(--c)" stroke-width="1.5"/>
          <line x1="88" y1="85" x2="82" y2="60" stroke="var(--c)" stroke-width="2"/>
          <line x1="112" y1="85" x2="118" y2="60" stroke="var(--c)" stroke-width="2"/>
          <circle cx="100" cy="97" r="3" fill="var(--c)" class="blink"/>
          <!-- Waves -->
          <path d="M 68 75 Q 100 50 132 75" fill="none" stroke="var(--c)" stroke-width="2" stroke-linecap="round" class="wave wave1"/>
          <path d="M 52 65 Q 100 30 148 65" fill="none" stroke="var(--c)" stroke-width="1.5" stroke-linecap="round" opacity="0.6" class="wave wave2"/>
          <path d="M 36 55 Q 100 10 164 55" fill="none" stroke="var(--c)" stroke-width="1" stroke-linecap="round" opacity="0.3" class="wave wave3"/>
          <!-- Devices -->
          <rect x="14" y="88" width="30" height="22" rx="3" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
          <rect x="156" y="88" width="30" height="22" rx="3" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
          <text x="100" y="128" text-anchor="middle" font-size="9" fill="#64748b">موجات راديو تحمل البيانات</text>
        </svg>

        <!-- ── two-computers ── -->
        <svg v-else-if="scene === 'two-computers'" viewBox="0 0 200 130" class="ns-svg">
          <!-- Computer A -->
          <rect x="8" y="40" width="55" height="40" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
          <rect x="24" y="80" width="22" height="6" fill="#1e293b"/>
          <rect x="18" y="86" width="34" height="4" rx="2" fill="#1e293b"/>
          <text x="35" y="65" text-anchor="middle" font-size="8" fill="#475569">PC A</text>
          <text x="35" y="75" text-anchor="middle" font-size="7" fill="var(--c)">AA:BB</text>
          <!-- Wire connecting -->
          <path d="M 63 60 Q 100 50 137 60" fill="none" stroke="var(--c)" stroke-width="3" stroke-linecap="round" class="anim-dash" stroke-dasharray="5 4"/>
          <!-- Packet traveling on wire -->
          <rect x="90" y="52" width="20" height="12" rx="3" fill="var(--c)" opacity="0.9" class="packet-travel"/>
          <text x="100" y="61" text-anchor="middle" font-size="7" fill="#000" font-weight="bold">Data</text>
          <!-- Computer B -->
          <rect x="137" y="40" width="55" height="40" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
          <rect x="153" y="80" width="22" height="6" fill="#1e293b"/>
          <rect x="147" y="86" width="34" height="4" rx="2" fill="#1e293b"/>
          <text x="164" y="65" text-anchor="middle" font-size="8" fill="#475569">PC B</text>
          <text x="164" y="75" text-anchor="middle" font-size="7" fill="var(--c)">CC:DD</text>
          <text x="100" y="110" text-anchor="middle" font-size="9" fill="#64748b">MAC Address = بصمة الجهاز</text>
        </svg>

        <!-- ── mirror ── -->
        <svg v-else-if="scene === 'mirror'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Mirror frame -->
          <ellipse cx="100" cy="65" rx="45" ry="55" fill="none" stroke="var(--c)" stroke-width="3"/>
          <ellipse cx="100" cy="65" rx="40" ry="50" fill="#0a0a14" stroke="#1e293b" stroke-width="1"/>
          <!-- Reflection arrow loop -->
          <path d="M 80 45 Q 100 30 120 45 Q 135 65 120 85 Q 100 100 80 85 Q 65 65 80 45" fill="none" stroke="var(--c)" stroke-width="1.5" stroke-dasharray="5 3" class="anim-dash"/>
          <!-- Data box going in -->
          <rect x="30" y="58" width="30" height="14" rx="3" fill="var(--c)" opacity="0.8"/>
          <text x="45" y="68" text-anchor="middle" font-size="7" fill="#000">Data</text>
          <!-- Arrow in -->
          <line x1="62" y1="65" x2="58" y2="65" stroke="var(--c)" stroke-width="2" marker-end="url(#arr)"/>
          <!-- 127.0.0.1 label -->
          <text x="100" y="68" text-anchor="middle" font-size="11" fill="var(--c)" font-family="monospace">127.0.0.1</text>
          <text x="100" y="120" text-anchor="middle" font-size="9" fill="#64748b">البيانات تعود من حيث أتت</text>
          <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="var(--c)"/></marker></defs>
        </svg>

        <!-- ── hotel-desk (DHCP) ── -->
        <svg v-else-if="scene === 'hotel-desk'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Hotel counter -->
          <rect x="20" y="80" width="160" height="30" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <!-- Receptionist -->
          <circle cx="140" cy="65" r="12" fill="#1e293b" stroke="var(--c)" stroke-width="1.5"/>
          <text x="140" y="70" text-anchor="middle" font-size="12">👨‍💼</text>
          <!-- Card being handed -->
          <rect x="95" y="72" width="28" height="16" rx="2" fill="var(--c)" class="card-hand"/>
          <text x="109" y="83" text-anchor="middle" font-size="7" fill="#000" font-weight="bold">IP Card</text>
          <!-- Guest -->
          <circle cx="55" cy="65" r="12" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
          <text x="55" y="70" text-anchor="middle" font-size="12">🙋</text>
          <!-- Speech bubble from guest -->
          <rect x="12" y="40" width="70" height="18" rx="6" fill="#0f172a" stroke="#334155" stroke-width="1"/>
          <text x="47" y="52" text-anchor="middle" font-size="8" fill="#94a3b8">أعطني IP!</text>
          <text x="100" y="125" text-anchor="middle" font-size="9" fill="#64748b">DHCP يوزّع عناوين IP تلقائياً</text>
        </svg>

        <!-- ── neighborhood (Subnet) ── -->
        <svg v-else-if="scene === 'neighborhood'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Fence -->
          <rect x="20" y="20" width="160" height="100" rx="6" fill="none" stroke="var(--c)" stroke-width="2" stroke-dasharray="8 4"/>
          <!-- House A inside -->
          <polygon points="55,85 35,85 35,65 55,65" fill="#1e293b" stroke="#475569" stroke-width="1"/>
          <polygon points="35,65 55,65 45,50" fill="#334155"/>
          <text x="45" y="100" text-anchor="middle" font-size="7" fill="var(--c)">192.168.1.2</text>
          <!-- House B inside -->
          <polygon points="105,85 85,85 85,65 105,65" fill="#1e293b" stroke="#475569" stroke-width="1"/>
          <polygon points="85,65 105,65 95,50" fill="#334155"/>
          <text x="95" y="100" text-anchor="middle" font-size="7" fill="var(--c)">192.168.1.3</text>
          <!-- Gate/Router -->
          <rect x="145" y="55" width="22" height="35" rx="3" fill="#0f172a" stroke="var(--c)" stroke-width="1.5"/>
          <text x="156" y="76" text-anchor="middle" font-size="9">🚪</text>
          <text x="156" y="97" text-anchor="middle" font-size="6" fill="var(--c)">Router</text>
          <!-- Arrow going out to globe -->
          <line x1="167" y1="72" x2="190" y2="72" stroke="var(--c)" stroke-width="1.5" stroke-dasharray="3 2"/>
          <text x="190" y="70" font-size="9">🌍</text>
          <text x="100" y="132" text-anchor="middle" font-size="9" fill="#64748b">Subnet = سور الحي السكني</text>
        </svg>

        <!-- ── loudspeaker (ARP) ── -->
        <svg v-else-if="scene === 'loudspeaker'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Megaphone -->
          <polygon points="60,50 60,90 80,90 110,110 110,30 80,50" fill="#1e293b" stroke="var(--c)" stroke-width="2"/>
          <rect x="40" y="58" width="22" height="24" rx="3" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
          <!-- Sound waves -->
          <path d="M 115 55 Q 135 70 115 85" fill="none" stroke="var(--c)" stroke-width="2.5" stroke-linecap="round" class="wave wave1"/>
          <path d="M 120 45 Q 150 70 120 95" fill="none" stroke="var(--c)" stroke-width="1.8" stroke-linecap="round" opacity="0.6" class="wave wave2"/>
          <!-- Devices listening -->
          <rect x="148" y="38" width="26" height="18" rx="3" fill="#0f172a" stroke="#475569" stroke-width="1"/>
          <rect x="148" y="84" width="26" height="18" rx="3" fill="#0f172a" stroke="var(--c)" stroke-width="1.5"/>
          <text x="161" y="95" text-anchor="middle" font-size="7" fill="var(--c)">أنا!</text>
          <!-- Speech bubble -->
          <rect x="118" y="58" width="50" height="16" rx="5" fill="#0f172a" stroke="#334155" stroke-width="1"/>
          <text x="143" y="69" text-anchor="middle" font-size="7" fill="#94a3b8">من 192.168.1.5؟</text>
          <text x="100" y="128" text-anchor="middle" font-size="9" fill="#64748b">ARP يسأل الشبكة كلها</text>
        </svg>

        <!-- ── glass-walls (VLAN) ── -->
        <svg v-else-if="scene === 'glass-walls'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Room outline -->
          <rect x="10" y="20" width="180" height="100" rx="4" fill="#0a0a14" stroke="#1e293b" stroke-width="2"/>
          <!-- Glass dividers -->
          <line x1="70" y1="20" x2="70" y2="120" stroke="var(--c)" stroke-width="2.5" stroke-dasharray="4 2" opacity="0.8"/>
          <line x1="130" y1="20" x2="130" y2="120" stroke="var(--c)" stroke-width="2.5" stroke-dasharray="4 2" opacity="0.8"/>
          <!-- Departments -->
          <text x="40" y="60" text-anchor="middle" font-size="9" fill="#10b981">قسم A</text>
          <text x="40" y="73" text-anchor="middle" font-size="7" fill="#475569">VLAN 10</text>
          <text x="100" y="60" text-anchor="middle" font-size="9" fill="#3b82f6">قسم B</text>
          <text x="100" y="73" text-anchor="middle" font-size="7" fill="#475569">VLAN 20</text>
          <text x="160" y="60" text-anchor="middle" font-size="9" fill="#f43f5e">قسم C</text>
          <text x="160" y="73" text-anchor="middle" font-size="7" fill="#475569">VLAN 30</text>
          <!-- People icons -->
          <text x="40" y="95" text-anchor="middle" font-size="16">👤</text>
          <text x="100" y="95" text-anchor="middle" font-size="16">👤</text>
          <text x="160" y="95" text-anchor="middle" font-size="16">👤</text>
          <text x="100" y="132" text-anchor="middle" font-size="9" fill="#64748b">VLAN = جدران زجاجية رقمية</text>
        </svg>

        <!-- ── building-nat ── -->
        <svg v-else-if="scene === 'building-nat'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Building -->
          <rect x="60" y="30" width="80" height="80" rx="4" fill="#0f172a" stroke="#334155" stroke-width="2"/>
          <!-- Windows -->
          <rect x="70" y="42" width="18" height="14" rx="2" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1"/>
          <rect x="94" y="42" width="18" height="14" rx="2" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1"/>
          <rect x="118" y="42" width="18" height="14" rx="2" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1"/>
          <text x="70" y="53" text-anchor="start" font-size="6" fill="#3b82f6" dx="2">.1</text>
          <text x="94" y="53" text-anchor="start" font-size="6" fill="#3b82f6" dx="2">.2</text>
          <text x="118" y="53" text-anchor="start" font-size="6" fill="#3b82f6" dx="2">.3</text>
          <!-- Door / main IP -->
          <rect x="88" y="88" width="24" height="22" rx="2" fill="#1e293b" stroke="var(--c)" stroke-width="2"/>
          <text x="100" y="102" text-anchor="middle" font-size="7" fill="var(--c)">NAT</text>
          <!-- Public IP label -->
          <text x="100" y="124" text-anchor="middle" font-size="8" fill="var(--c)">203.0.113.5</text>
          <!-- Arrow to internet -->
          <line x1="140" y1="99" x2="180" y2="99" stroke="var(--c)" stroke-width="2" stroke-dasharray="4 3" class="anim-dash"/>
          <text x="182" y="97" font-size="11">🌍</text>
          <text x="100" y="138" text-anchor="middle" font-size="9" fill="#64748b">NAT = باب واحد للمبنى كله</text>
        </svg>

        <!-- ── phonebook (DNS) ── -->
        <svg v-else-if="scene === 'phonebook'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Open book -->
          <rect x="25" y="25" width="70" height="90" rx="3" fill="#1e293b" stroke="#475569" stroke-width="2"/>
          <rect x="95" y="25" width="70" height="90" rx="3" fill="#0f172a" stroke="#475569" stroke-width="2"/>
          <!-- Spine -->
          <line x1="95" y1="25" x2="95" y2="115" stroke="#334155" stroke-width="3"/>
          <!-- Book lines -->
          <line x1="35" y1="45" x2="85" y2="45" stroke="#334155" stroke-width="1"/>
          <text x="35" y="57" font-size="8" fill="#94a3b8">google.com</text>
          <text x="35" y="68" font-size="8" fill="#94a3b8">youtube.com</text>
          <text x="35" y="79" font-size="8" fill="#94a3b8">github.com</text>
          <!-- Arrows to IPs -->
          <line x1="95" y1="57" x2="105" y2="57" stroke="var(--c)" stroke-width="1.5"/>
          <line x1="95" y1="68" x2="105" y2="68" stroke="var(--c)" stroke-width="1.5"/>
          <line x1="95" y1="79" x2="105" y2="79" stroke="var(--c)" stroke-width="1.5"/>
          <!-- IPs -->
          <text x="108" y="59" font-size="8" fill="var(--c)" font-family="monospace">142.250.x.x</text>
          <text x="108" y="70" font-size="8" fill="var(--c)" font-family="monospace">142.250.x.x</text>
          <text x="108" y="81" font-size="8" fill="var(--c)" font-family="monospace">140.82.x.x</text>
          <!-- Magnifying glass highlight -->
          <circle cx="55" cy="68" r="10" fill="none" stroke="var(--c)" stroke-width="1.5" opacity="0.5" class="wave wave1"/>
          <text x="100" y="128" text-anchor="middle" font-size="9" fill="#64748b">DNS = دليل هاتف الإنترنت</text>
        </svg>

        <!-- ── globe-pin (IP) ── -->
        <svg v-else-if="scene === 'globe-pin'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Globe -->
          <circle cx="100" cy="70" r="50" fill="#0f172a" stroke="#1e3a5f" stroke-width="2"/>
          <ellipse cx="100" cy="70" rx="25" ry="50" fill="none" stroke="#1e3a5f" stroke-width="1" stroke-dasharray="3 2"/>
          <line x1="50" y1="70" x2="150" y2="70" stroke="#1e3a5f" stroke-width="1" stroke-dasharray="3 2"/>
          <line x1="55" y1="47" x2="145" y2="47" stroke="#1e3a5f" stroke-width="1" stroke-dasharray="3 2" opacity="0.5"/>
          <line x1="55" y1="93" x2="145" y2="93" stroke="#1e3a5f" stroke-width="1" stroke-dasharray="3 2" opacity="0.5"/>
          <!-- Pin -->
          <line x1="130" y1="38" x2="130" y2="60" stroke="var(--c)" stroke-width="2.5"/>
          <circle cx="130" cy="33" r="9" fill="var(--c)"/>
          <circle cx="130" cy="33" r="4" fill="#fff"/>
          <!-- IP label -->
          <rect x="80" y="92" width="82" height="18" rx="4" fill="#0a0a14" stroke="var(--c)" stroke-width="1"/>
          <text x="121" y="104" text-anchor="middle" font-size="9" fill="var(--c)" font-family="monospace">203.0.113.42</text>
          <text x="100" y="132" text-anchor="middle" font-size="9" fill="#64748b">IP = عنوانك في الإنترنت</text>
        </svg>

        <!-- ── infinite-addresses (IPv6) ── -->
        <svg v-else-if="scene === 'infinite-addresses'" viewBox="0 0 200 140" class="ns-svg">
          <!-- IPv4 (crossed) -->
          <rect x="14" y="30" width="72" height="36" rx="4" fill="#0f172a" stroke="#ef4444" stroke-width="1.5"/>
          <text x="50" y="47" text-anchor="middle" font-size="8" fill="#ef4444" font-family="monospace">IPv4</text>
          <text x="50" y="59" text-anchor="middle" font-size="7" fill="#64748b">4.3 مليار</text>
          <line x1="14" y1="30" x2="86" y2="66" stroke="#ef4444" stroke-width="2" opacity="0.8"/>
          <!-- IPv6 (glowing) -->
          <rect x="108" y="20" width="80" height="56" rx="5" fill="#0f172a" stroke="var(--c)" stroke-width="2"/>
          <text x="148" y="42" text-anchor="middle" font-size="10" fill="var(--c)" font-weight="bold" font-family="monospace">IPv6</text>
          <text x="148" y="57" text-anchor="middle" font-size="6" fill="#94a3b8">340 أندشيليون</text>
          <text x="148" y="68" text-anchor="middle" font-size="6" fill="#64748b">عنوان</text>
          <!-- Infinity symbol -->
          <text x="148" y="92" text-anchor="middle" font-size="28" fill="var(--c)" class="pulse">∞</text>
          <text x="100" y="128" text-anchor="middle" font-size="9" fill="#64748b">عناوين لكل ذرة في الكون</text>
        </svg>

        <!-- ── tunnel (VPN) ── -->
        <svg v-else-if="scene === 'tunnel'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Tunnel shape -->
          <ellipse cx="30" cy="70" rx="22" ry="35" fill="#0f172a" stroke="#475569" stroke-width="2"/>
          <ellipse cx="170" cy="70" rx="22" ry="35" fill="#0f172a" stroke="#475569" stroke-width="2"/>
          <rect x="30" y="35" width="140" height="70" fill="#0a0a14"/>
          <line x1="30" y1="35" x2="170" y2="35" stroke="#475569" stroke-width="2"/>
          <line x1="30" y1="105" x2="170" y2="105" stroke="#475569" stroke-width="2"/>
          <!-- Encrypted packet inside tunnel -->
          <rect x="78" y="57" width="44" height="26" rx="5" fill="var(--c)" opacity="0.85" class="packet-travel"/>
          <text x="100" y="73" text-anchor="middle" font-size="9" fill="#000" font-weight="bold">🔒 VPN</text>
          <!-- Spy outside -->
          <text x="100" y="30" text-anchor="middle" font-size="14">😈</text>
          <text x="100" y="22" text-anchor="middle" font-size="7" fill="#475569">لا يرى شيئاً!</text>
          <text x="100" y="128" text-anchor="middle" font-size="9" fill="#64748b">VPN = نفق مشفّر مخفي</text>
        </svg>

        <!-- ── world-map (BGP) ── -->
        <svg v-else-if="scene === 'world-map'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Simplified world map outline -->
          <rect x="10" y="20" width="180" height="100" rx="4" fill="#0a0a14" stroke="#1e293b" stroke-width="1.5"/>
          <!-- Continents (abstract rectangles) -->
          <rect x="20" y="30" width="50" height="35" rx="4" fill="#1e293b" opacity="0.8"/>
          <rect x="80" y="28" width="35" height="40" rx="4" fill="#1e293b" opacity="0.8"/>
          <rect x="120" y="35" width="60" height="30" rx="4" fill="#1e293b" opacity="0.8"/>
          <rect x="30" y="72" width="40" height="40" rx="4" fill="#1e293b" opacity="0.8"/>
          <rect x="130" y="68" width="45" height="45" rx="4" fill="#1e293b" opacity="0.8"/>
          <!-- City dots -->
          <circle cx="35" cy="48" r="4" fill="var(--c)"/>
          <circle cx="98" cy="48" r="4" fill="var(--c)"/>
          <circle cx="155" cy="50" r="4" fill="var(--c)"/>
          <circle cx="50" cy="92" r="4" fill="var(--c)"/>
          <circle cx="152" cy="90" r="4" fill="var(--c)"/>
          <!-- Routes -->
          <path d="M35,48 Q66,30 98,48" fill="none" stroke="var(--c)" stroke-width="1.5" stroke-dasharray="4 3" class="anim-dash"/>
          <path d="M98,48 Q126,38 155,50" fill="none" stroke="var(--c)" stroke-width="1.5" stroke-dasharray="4 3" class="anim-dash"/>
          <path d="M35,48 Q42,70 50,92" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6"/>
          <text x="42" y="68" font-size="6" fill="#ef4444" opacity="0.7">مسدود</text>
          <text x="100" y="128" text-anchor="middle" font-size="9" fill="#64748b">BGP يختار أسرع طريق</text>
        </svg>

        <!-- ── ping-echo (ICMP) ── -->
        <svg v-else-if="scene === 'ping-echo'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Computer sending -->
          <rect x="8" y="50" width="45" height="35" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
          <text x="30" y="72" text-anchor="middle" font-size="9">💻</text>
          <!-- Server receiving -->
          <rect x="147" y="50" width="45" height="35" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
          <text x="169" y="72" text-anchor="middle" font-size="9">🖥️</text>
          <!-- Ping going -->
          <rect x="65" y="58" width="30" height="12" rx="3" fill="var(--c)" opacity="0.9" class="ping-go"/>
          <text x="80" y="67" text-anchor="middle" font-size="7" fill="#000">PING</text>
          <!-- Pong returning -->
          <rect x="105" y="75" width="30" height="12" rx="3" fill="#10b981" opacity="0.7" class="ping-back"/>
          <text x="120" y="84" text-anchor="middle" font-size="7" fill="#000">PONG</text>
          <!-- Time label -->
          <text x="100" y="105" text-anchor="middle" font-size="11" fill="var(--c)" font-weight="bold">12ms</text>
          <text x="100" y="128" text-anchor="middle" font-size="9" fill="#64748b">Ping = نبض حياة الخادم</text>
        </svg>

        <!-- ── scale (TCP vs UDP) ── -->
        <svg v-else-if="scene === 'scale'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Scale stand -->
          <line x1="100" y1="110" x2="100" y2="40" stroke="#475569" stroke-width="3"/>
          <line x1="70" y1="110" x2="130" y2="110" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
          <!-- Balance arm (tilted to TCP = heavier) -->
          <line x1="30" y1="55" x2="170" y2="48" stroke="var(--c)" stroke-width="3" stroke-linecap="round"/>
          <!-- TCP pan -->
          <ellipse cx="38" cy="60" rx="28" ry="8" fill="#1e293b" stroke="var(--c)" stroke-width="1.5"/>
          <text x="38" y="57" text-anchor="middle" font-size="8" fill="var(--c)" font-weight="bold">TCP</text>
          <text x="38" y="72" text-anchor="middle" font-size="6" fill="#94a3b8">موثوق</text>
          <text x="38" y="82" text-anchor="middle" font-size="6" fill="#94a3b8">مرتّب</text>
          <text x="38" y="92" text-anchor="middle" font-size="6" fill="#94a3b8">بطيء نسبياً</text>
          <!-- UDP pan -->
          <ellipse cx="162" cy="53" rx="28" ry="8" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
          <text x="162" y="50" text-anchor="middle" font-size="8" fill="#f43f5e" font-weight="bold">UDP</text>
          <text x="162" y="62" text-anchor="middle" font-size="6" fill="#94a3b8">سريع</text>
          <text x="162" y="72" text-anchor="middle" font-size="6" fill="#94a3b8">بلا ضمان</text>
          <text x="100" y="132" text-anchor="middle" font-size="9" fill="#64748b">اختر: ضمان أم سرعة؟</text>
        </svg>

        <!-- ── ambulance (QoS) ── -->
        <svg v-else-if="scene === 'ambulance'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Road -->
          <rect x="0" y="85" width="200" height="30" fill="#1e293b"/>
          <line x1="0" y1="100" x2="200" y2="100" stroke="#f59e0b" stroke-width="2" stroke-dasharray="15 10"/>
          <!-- Traffic cars (stuck) -->
          <rect x="130" y="68" width="35" height="22" rx="4" fill="#475569"/>
          <rect x="170" y="68" width="24" height="22" rx="4" fill="#475569"/>
          <!-- Ambulance (priority) -->
          <rect x="30" y="65" width="55" height="25" rx="5" fill="#ef4444"/>
          <text x="57" y="81" text-anchor="middle" font-size="9" fill="#fff" font-weight="bold">🚑 URGENT</text>
          <!-- Siren -->
          <circle cx="57" cy="63" r="5" fill="#fff" opacity="0.9" class="blink"/>
          <!-- Arrow space opening up -->
          <path d="M 87 78 Q 110 78 128 75" fill="none" stroke="#10b981" stroke-width="2.5" stroke-dasharray="4 3" class="anim-dash"/>
          <text x="100" y="128" text-anchor="middle" font-size="9" fill="#64748b">QoS = الفيديو يتقدم في الطابور</text>
        </svg>

        <!-- ── brick-wall (Firewall) ── -->
        <svg v-else-if="scene === 'brick-wall'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Bricks -->
          <g fill="#1e293b" stroke="#0f172a" stroke-width="1">
            <rect x="10"  y="35" width="42" height="18" rx="1"/>
            <rect x="56"  y="35" width="42" height="18" rx="1"/>
            <rect x="102" y="35" width="42" height="18" rx="1"/>
            <rect x="148" y="35" width="42" height="18" rx="1"/>
            <rect x="30"  y="57" width="42" height="18" rx="1"/>
            <rect x="76"  y="57" width="42" height="18" rx="1"/>
            <rect x="122" y="57" width="42" height="18" rx="1"/>
            <rect x="168" y="57" width="22" height="18" rx="1"/>
            <rect x="10"  y="79" width="42" height="18" rx="1"/>
            <rect x="56"  y="79" width="42" height="18" rx="1"/>
            <rect x="102" y="79" width="42" height="18" rx="1"/>
            <rect x="148" y="79" width="42" height="18" rx="1"/>
          </g>
          <!-- Fire on top -->
          <text x="38" y="32" font-size="16">🔥</text>
          <text x="100" y="30" font-size="16">🔥</text>
          <text x="162" y="32" font-size="16">🔥</text>
          <!-- Blocked packet -->
          <rect x="83" y="100" width="34" height="20" rx="4" fill="#ef4444" opacity="0.9"/>
          <text x="100" y="113" text-anchor="middle" font-size="9" fill="#fff">🚫 BLOCKED</text>
          <!-- Arrow stopped at wall -->
          <line x1="100" y1="122" x2="100" y2="103" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
          <text x="100" y="136" text-anchor="middle" font-size="9" fill="#64748b">Firewall يوقف المشبوه</text>
        </svg>

        <!-- ── ticket-windows (LB) ── -->
        <svg v-else-if="scene === 'ticket-windows'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Counter -->
          <rect x="20" y="65" width="160" height="40" rx="3" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <!-- Windows -->
          <rect x="30" y="58" width="32" height="50" rx="3" fill="#0f172a" stroke="#475569" stroke-width="1"/>
          <rect x="70" y="58" width="32" height="50" rx="3" fill="#0f172a" stroke="var(--c)" stroke-width="1.5"/>
          <rect x="110" y="58" width="32" height="50" rx="3" fill="#0f172a" stroke="#475569" stroke-width="1"/>
          <rect x="150" y="58" width="32" height="50" rx="3" fill="#0f172a" stroke="#475569" stroke-width="1"/>
          <!-- Staff icons -->
          <text x="46" y="90" text-anchor="middle" font-size="14">😴</text>
          <text x="86" y="90" text-anchor="middle" font-size="14">😊</text>
          <text x="126" y="90" text-anchor="middle" font-size="14">😴</text>
          <text x="166" y="90" text-anchor="middle" font-size="14">😴</text>
          <!-- Arrow pointing to window 2 -->
          <line x1="86" y1="52" x2="86" y2="34" stroke="var(--c)" stroke-width="2"/>
          <text x="86" y="29" text-anchor="middle" font-size="8" fill="var(--c)">← هنا!</text>
          <!-- User -->
          <text x="30" y="30" font-size="14">🧍</text>
          <path d="M 42 25 Q 64 20 78 30" fill="none" stroke="var(--c)" stroke-width="1.5" stroke-dasharray="3 2"/>
          <text x="100" y="128" text-anchor="middle" font-size="9" fill="#64748b">Load Balancer يوجّهك للشباك الفارغ</text>
        </svg>

        <!-- ── local-shop (CDN) ── -->
        <svg v-else-if="scene === 'local-shop'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Map background -->
          <rect x="10" y="20" width="180" height="100" rx="5" fill="#0a0a14" stroke="#1e293b" stroke-width="1.5"/>
          <!-- Origin server (far) -->
          <rect x="140" y="30" width="42" height="28" rx="3" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
          <text x="161" y="47" text-anchor="middle" font-size="9">🏭</text>
          <text x="161" y="57" text-anchor="middle" font-size="6" fill="#64748b">Origin</text>
          <!-- CDN nodes (local) -->
          <rect x="18" y="55" width="38" height="24" rx="3" fill="#0f172a" stroke="var(--c)" stroke-width="1.5"/>
          <text x="37" y="70" text-anchor="middle" font-size="9">🏪</text>
          <text x="37" y="79" text-anchor="middle" font-size="6" fill="var(--c)">CDN</text>
          <rect x="75" y="78" width="38" height="24" rx="3" fill="#0f172a" stroke="var(--c)" stroke-width="1.5"/>
          <text x="94" y="93" text-anchor="middle" font-size="9">🏪</text>
          <text x="94" y="102" text-anchor="middle" font-size="6" fill="var(--c)">CDN</text>
          <!-- User close to CDN -->
          <text x="18" y="105" font-size="14">🧍</text>
          <line x1="28" y1="100" x2="37" y2="82" stroke="var(--c)" stroke-width="1.5" stroke-dasharray="3 2"/>
          <!-- Far arrow (crossed) -->
          <line x1="56" y1="67" x2="138" y2="45" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.5"/>
          <text x="97" y="53" font-size="8" fill="#ef4444">✗ بعيد</text>
          <text x="100" y="128" text-anchor="middle" font-size="9" fill="#64748b">CDN = البقالة القريبة منك</text>
        </svg>

        <!-- ── apartment-doors (Ports) ── -->
        <svg v-else-if="scene === 'apartment-doors'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Building facade -->
          <rect x="20" y="20" width="160" height="100" rx="4" fill="#0f172a" stroke="#334155" stroke-width="2"/>
          <!-- Floor label -->
          <text x="100" y="36" text-anchor="middle" font-size="8" fill="#475569">الخادم: 203.0.113.42</text>
          <line x1="20" y1="40" x2="180" y2="40" stroke="#1e293b" stroke-width="1"/>
          <!-- Doors -->
          <rect x="30" y="55" width="30" height="45" rx="2" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
          <text x="45" y="74" text-anchor="middle" font-size="7" fill="#10b981">:80</text>
          <text x="45" y="85" text-anchor="middle" font-size="6" fill="#64748b">HTTP</text>
          <rect x="75" y="55" width="30" height="45" rx="2" fill="#1e293b" stroke="var(--c)" stroke-width="2.5"/>
          <text x="90" y="74" text-anchor="middle" font-size="7" fill="var(--c)">:443</text>
          <text x="90" y="85" text-anchor="middle" font-size="6" fill="#94a3b8">HTTPS</text>
          <rect x="120" y="55" width="30" height="45" rx="2" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
          <text x="135" y="74" text-anchor="middle" font-size="7" fill="#3b82f6">:22</text>
          <text x="135" y="85" text-anchor="middle" font-size="6" fill="#64748b">SSH</text>
          <!-- Packet knocking -->
          <rect x="140" y="70" width="32" height="16" rx="3" fill="var(--c)" opacity="0.9" class="packet-travel"/>
          <text x="156" y="81" text-anchor="middle" font-size="7" fill="#000">📦 :443</text>
          <text x="100" y="128" text-anchor="middle" font-size="9" fill="#64748b">Port = رقم شقة في العمارة</text>
        </svg>

        <!-- ── cockpit (NIC MMIO) ── -->
        <svg v-else-if="scene === 'cockpit'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Dashboard -->
          <rect x="10" y="25" width="180" height="90" rx="6" fill="#0a0a14" stroke="#334155" stroke-width="2"/>
          <!-- Gauges -->
          <circle cx="45" cy="65" r="20" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
          <circle cx="100" cy="65" r="20" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
          <circle cx="155" cy="65" r="20" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
          <!-- Gauge needles -->
          <line x1="45" y1="65" x2="55" y2="52" stroke="var(--c)" stroke-width="2" stroke-linecap="round"/>
          <line x1="100" y1="65" x2="88" y2="50" stroke="#3b82f6" stroke-width="2" stroke-linecap="round"/>
          <line x1="155" y1="65" x2="165" y2="53" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
          <!-- Labels -->
          <text x="45"  y="82" text-anchor="middle" font-size="6" fill="var(--c)">TX</text>
          <text x="100" y="82" text-anchor="middle" font-size="6" fill="#3b82f6">RX</text>
          <text x="155" y="82" text-anchor="middle" font-size="6" fill="#f59e0b">MMIO</text>
          <!-- Buttons row -->
          <rect x="18" y="100" width="12" height="10" rx="2" fill="#10b981"/>
          <rect x="34" y="100" width="12" height="10" rx="2" fill="#3b82f6"/>
          <rect x="50" y="100" width="12" height="10" rx="2" fill="#f59e0b"/>
          <text x="100" y="128" text-anchor="middle" font-size="9" fill="#64748b">MMIO = لوحة تحكم بطاقة الشبكة</text>
        </svg>

        <!-- ── conveyor-belt (DMA) ── -->
        <svg v-else-if="scene === 'conveyor-belt'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Belt -->
          <rect x="20" y="75" width="160" height="18" rx="9" fill="#1e293b" stroke="#334155" stroke-width="2"/>
          <!-- Belt motion dots -->
          <circle cx="45" cy="84" r="4" fill="#334155" class="belt-dot"/>
          <circle cx="75" cy="84" r="4" fill="#334155" class="belt-dot delay1"/>
          <circle cx="105" cy="84" r="4" fill="#334155" class="belt-dot delay2"/>
          <circle cx="135" cy="84" r="4" fill="#334155" class="belt-dot delay3"/>
          <!-- NIC (left) -->
          <rect x="8" y="50" width="40" height="30" rx="4" fill="#0f172a" stroke="var(--c)" stroke-width="1.5"/>
          <text x="28" y="69" text-anchor="middle" font-size="8" fill="var(--c)">NIC</text>
          <!-- RAM (right) -->
          <rect x="152" y="50" width="40" height="30" rx="4" fill="#0f172a" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="172" y="69" text-anchor="middle" font-size="8" fill="#3b82f6">RAM</text>
          <!-- Packet on belt -->
          <rect x="78" y="65" width="44" height="24" rx="4" fill="var(--c)" opacity="0.9" class="packet-travel"/>
          <text x="100" y="80" text-anchor="middle" font-size="8" fill="#000" font-weight="bold">📦 Data</text>
          <!-- CPU sleeping -->
          <circle cx="100" cy="38" r="16" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
          <text x="100" y="43" text-anchor="middle" font-size="10">😴</text>
          <text x="100" y="28" text-anchor="middle" font-size="7" fill="#64748b">CPU يستريح</text>
          <text x="100" y="128" text-anchor="middle" font-size="9" fill="#64748b">DMA ينقل البيانات مباشرة</text>
        </svg>

        <!-- ── doorbell (Interrupts) ── -->
        <svg v-else-if="scene === 'doorbell'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Door -->
          <rect x="70" y="30" width="60" height="90" rx="4" fill="#1e293b" stroke="#475569" stroke-width="2"/>
          <circle cx="120" cy="75" r="5" fill="#475569"/>
          <!-- Bell -->
          <circle cx="62" cy="65" r="10" fill="#0f172a" stroke="var(--c)" stroke-width="2" class="blink"/>
          <text x="62" y="70" text-anchor="middle" font-size="10">🔔</text>
          <!-- Delivery person -->
          <text x="30" y="80" text-anchor="middle" font-size="22">🚚</text>
          <!-- CPU surprised -->
          <rect x="145" y="40" width="42" height="35" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
          <text x="166" y="62" text-anchor="middle" font-size="14">😲</text>
          <text x="166" y="75" text-anchor="middle" font-size="7" fill="var(--c)">CPU</text>
          <!-- Arrow to CPU -->
          <path d="M 72 65 Q 110 55 145 58" fill="none" stroke="var(--c)" stroke-width="1.5" stroke-dasharray="4 3" class="anim-dash"/>
          <text x="100" y="128" text-anchor="middle" font-size="9" fill="#64748b">Interrupt = جرس يوقظ المعالج</text>
        </svg>

        <!-- ── nested-envelopes (smoltcp) ── -->
        <svg v-else-if="scene === 'nested-envelopes'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Envelope 1 (Ethernet) -->
          <rect x="15" y="30" width="170" height="80" rx="5" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
          <text x="30" y="48" font-size="7" fill="#f59e0b">Ethernet</text>
          <!-- Envelope 2 (IP) -->
          <rect x="35" y="48" width="130" height="55" rx="4" fill="#0a0a14" stroke="#3b82f6" stroke-width="2"/>
          <text x="50" y="64" font-size="7" fill="#3b82f6">IP</text>
          <!-- Envelope 3 (TCP) -->
          <rect x="55" y="63" width="90" height="33" rx="3" fill="#0d1117" stroke="#10b981" stroke-width="2"/>
          <text x="70" y="77" font-size="7" fill="#10b981">TCP</text>
          <!-- Data inside -->
          <rect x="72" y="73" width="54" height="18" rx="2" fill="var(--c)" opacity="0.9"/>
          <text x="99" y="85" text-anchor="middle" font-size="7" fill="#000" font-weight="bold">Data 📄</text>
          <!-- Arrow opening right -->
          <path d="M 185 70 Q 195 70 195 95 Q 195 115 180 115" fill="none" stroke="var(--c)" stroke-width="1.5" stroke-dasharray="4 3"/>
          <text x="100" y="128" text-anchor="middle" font-size="9" fill="#64748b">smoltcp يفتح الأظرف المتتالية</text>
        </svg>

        <!-- ── mailbox (Socket API) ── -->
        <svg v-else-if="scene === 'mailbox'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Mailbox -->
          <rect x="65" y="45" width="70" height="50" rx="6" fill="#1e293b" stroke="var(--c)" stroke-width="2.5"/>
          <rect x="65" y="45" width="70" height="20" rx="6" fill="#0f172a" stroke="var(--c)" stroke-width="2.5"/>
          <!-- Flag up -->
          <line x1="134" y1="45" x2="134" y2="28" stroke="var(--c)" stroke-width="2.5"/>
          <rect x="134" y="22" width="16" height="10" rx="2" fill="var(--c)"/>
          <!-- Door slot -->
          <rect x="78" y="60" width="44" height="8" rx="4" fill="#0a0a14" stroke="#334155" stroke-width="1"/>
          <!-- App with key -->
          <rect x="18" y="55" width="40" height="30" rx="4" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
          <text x="38" y="74" text-anchor="middle" font-size="9">💻</text>
          <!-- Key -->
          <text x="60" y="72" font-size="12">🔑</text>
          <!-- Data in mailbox -->
          <rect x="78" y="78" width="44" height="12" rx="2" fill="var(--c)" opacity="0.7"/>
          <text x="100" y="87" text-anchor="middle" font-size="7" fill="#000">read()</text>
          <text x="100" y="128" text-anchor="middle" font-size="9" fill="#64748b">Socket API = مفتاح صندوق البريد</text>
        </svg>

        <!-- ── chef (Async) ── -->
        <svg v-else-if="scene === 'chef'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Chef -->
          <circle cx="50" cy="55" r="20" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
          <text x="50" y="62" text-anchor="middle" font-size="18">👨‍🍳</text>
          <!-- Oven -->
          <rect x="115" y="50" width="40" height="40" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
          <text x="135" y="74" text-anchor="middle" font-size="14">🎂</text>
          <!-- Timer arrow from chef to oven -->
          <path d="M 70 58 Q 95 40 113 65" fill="none" stroke="var(--c)" stroke-width="1.5" stroke-dasharray="4 3" class="anim-dash"/>
          <text x="91" y="45" font-size="8" fill="var(--c)">⏱ Set</text>
          <!-- Chef cooking veggies -->
          <rect x="15" y="90" width="70" height="28" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
          <text x="50" y="108" text-anchor="middle" font-size="9">🥦 تقطيع</text>
          <!-- Non-blocking arrow -->
          <text x="135" y="108" text-anchor="middle" font-size="8" fill="var(--c)">لم ينتهِ...</text>
          <text x="100" y="132" text-anchor="middle" font-size="9" fill="#64748b">Async = الشيف لا ينتظر الفرن</text>
        </svg>

        <!-- ── gift-unlock (HTTP TLS) ── -->
        <svg v-else-if="scene === 'gift-unlock'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Locked gift box -->
          <rect x="55" y="60" width="90" height="65" rx="5" fill="#0f172a" stroke="#ef4444" stroke-width="2"/>
          <rect x="55" y="48" width="90" height="18" rx="3" fill="#1e293b" stroke="#ef4444" stroke-width="2"/>
          <!-- Lock on top -->
          <rect x="88" y="30" width="24" height="22" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
          <circle cx="100" cy="37" r="8" fill="none" stroke="#f59e0b" stroke-width="2"/>
          <!-- Key opening -->
          <text x="148" y="55" font-size="18" class="key-turn">🔑</text>
          <!-- Unlocked state (green) -->
          <text x="100" y="100" text-anchor="middle" font-size="20">📄</text>
          <text x="100" y="116" text-anchor="middle" font-size="8" fill="var(--c)">HTTP Response</text>
          <!-- TLS label -->
          <text x="100" y="40" text-anchor="middle" font-size="7" fill="#f59e0b">TLS</text>
          <text x="100" y="132" text-anchor="middle" font-size="9" fill="#64748b">TLS يفكّ التشفير → HTTP يقرأ</text>
        </svg>

        <!-- ── open-call (WebSockets) ── -->
        <svg v-else-if="scene === 'open-call'" viewBox="0 0 200 140" class="ns-svg">
          <!-- Phone A -->
          <rect x="10" y="40" width="40" height="65" rx="7" fill="#0f172a" stroke="var(--c)" stroke-width="2.5"/>
          <rect x="17" y="50" width="26" height="40" rx="2" fill="#0a1628"/>
          <circle cx="30" cy="98" r="5" fill="#1e293b" stroke="#334155" stroke-width="1"/>
          <!-- Phone B -->
          <rect x="150" y="40" width="40" height="65" rx="7" fill="#0f172a" stroke="var(--c)" stroke-width="2.5"/>
          <rect x="157" y="50" width="26" height="40" rx="2" fill="#0a1628"/>
          <circle cx="170" cy="98" r="5" fill="#1e293b" stroke="#334155" stroke-width="1"/>
          <!-- Bidirectional data streams -->
          <path d="M 52 65 Q 100 50 148 65" fill="none" stroke="var(--c)" stroke-width="2.5" stroke-linecap="round" class="anim-dash" stroke-dasharray="8 5"/>
          <path d="M 148 82 Q 100 95 52 82" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" class="anim-dash-rev" stroke-dasharray="8 5"/>
          <!-- Labels on streams -->
          <text x="100" y="57" text-anchor="middle" font-size="7" fill="var(--c)">→ send</text>
          <text x="100" y="98" text-anchor="middle" font-size="7" fill="#3b82f6">← receive</text>
          <!-- Always open badge -->
          <rect x="70" y="108" width="60" height="14" rx="7" fill="var(--c)" opacity="0.2" stroke="var(--c)" stroke-width="1"/>
          <text x="100" y="118" text-anchor="middle" font-size="7" fill="var(--c)">✓ OPEN 24/7</text>
          <text x="100" y="136" text-anchor="middle" font-size="9" fill="#64748b">WebSocket = خط ساخن مفتوح دائماً</text>
        </svg>

        <!-- ── default fallback ── -->
        <div v-else class="ns-fallback">
          <span class="ns-fallback-icon">{{ concept.icon }}</span>
        </div>

      </div><!-- end ns-scene-box -->
    </div><!-- end ns-illustration -->

    <!-- ─── Right: Text content ─── -->
    <div class="ns-content" :class="{ 'content-visible': isActive }">
      <div class="ns-badge" :style="`background: ${concept.color}22; color: ${concept.color}; border-color: ${concept.color}44`">
        {{ concept.subtitle }}
      </div>
      <h2 class="ns-title" :style="`color: ${concept.color}`">{{ concept.title }}</h2>
      <p class="ns-desc">{{ concept.description }}</p>
      <div class="ns-analogy" :style="`border-right-color: ${concept.color}`">
        <span class="ns-analogy-icon">{{ concept.analogy.icon }}</span>
        <p>{{ concept.analogy.text }}</p>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* ─── Station Root ─── */
.ns-root {
  display: flex;
  align-items: stretch;
  min-height: 100vh;
  padding: 4rem 2rem 4rem 1rem;
  gap: 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  position: relative;
  transition: background 0.8s ease;
}
.ns-root.is-active {
  background: radial-gradient(ellipse at 10% 50%, var(--c, #10b981)08 0%, transparent 60%);
}

/* ─── Illustration Side ─── */
.ns-illustration {
  flex: 0 0 320px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
}

/* ─── Horizontal Branch Connector ─── */
.ns-branch {
  position: absolute;
  right: -50px;
  top: 50%;
  width: 50px;
  height: 2px;
  background: rgba(255,255,255,0.06);
  transform: translateY(-50%);
  transition: all 0.6s ease;
  z-index: -1;
}
.ns-branch.lit {
  background: var(--c, #10b981);
  box-shadow: 0 0 12px var(--c, #10b981);
}

/* ─── Scene Box ─── */
.ns-scene-box {
  flex: 1;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 1.25rem;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.16,1,0.3,1);
  transform: scale(0.97) translateY(8px);
  opacity: 0.5;
  max-width: 280px;
}
.ns-scene-box.scene-active {
  opacity: 1;
  transform: scale(1) translateY(0);
  border-color: var(--c, #10b981)33;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px var(--c, #10b981)22;
}

/* SVG illustrations fill the box */
.ns-svg {
  width: 100%;
  height: 160px;
  display: block;
}

.ns-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}
.ns-fallback-icon {
  font-size: 4rem;
  filter: drop-shadow(0 0 20px var(--c, #10b981));
}

/* ─── Content Side ─── */
.ns-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  opacity: 0.35;
  transform: translateX(-20px);
  transition: all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s;
}
.ns-content.content-visible {
  opacity: 1;
  transform: translateX(0);
}

.ns-badge {
  display: inline-block;
  padding: 0.25rem 0.9rem;
  border-radius: 999px;
  border: 1px solid;
  font-size: 0.8rem;
  font-weight: 700;
  width: fit-content;
}

.ns-title {
  margin: 0;
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 900;
  line-height: 1.2;
}

.ns-desc {
  margin: 0;
  font-size: 1rem;
  line-height: 1.8;
  color: #94a3b8;
}

.ns-analogy {
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.06);
  border-right: 3px solid;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}
.ns-analogy-icon { font-size: 1.5rem; flex-shrink: 0; }
.ns-analogy p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.7;
  color: #cbd5e1;
}

/* ─── SVG Animations ─── */
.anim-dash {
  animation: dashFlow 2s linear infinite;
}
.anim-dash-rev {
  animation: dashFlowRev 2s linear infinite;
}
@keyframes dashFlow    { to { stroke-dashoffset: -24; } }
@keyframes dashFlowRev { to { stroke-dashoffset:  24; } }

.wave { transform-origin: bottom center; }
.wave1 { animation: waveIn 2s ease-in-out infinite; }
.wave2 { animation: waveIn 2s ease-in-out 0.3s infinite; }
.wave3 { animation: waveIn 2s ease-in-out 0.6s infinite; }
@keyframes waveIn {
  0%, 100% { opacity: 0.2; } 50% { opacity: 1; }
}

.blink { animation: blink 1.2s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }

.pulse { animation: pulse 2s ease-in-out infinite; }
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.15); opacity: 0.7; }
}

.packet-travel {
  animation: packetMove 2.5s ease-in-out infinite;
}
@keyframes packetMove {
  0%,100% { transform: translateX(0); }
  50%     { transform: translateX(20px); }
}

.ping-go {
  animation: pingGo 1.8s ease-in-out infinite;
}
@keyframes pingGo {
  0%   { transform: translateX(0); opacity: 1; }
  45%  { transform: translateX(50px); opacity: 0; }
  46%  { transform: translateX(0); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}
.ping-back {
  animation: pingBack 1.8s ease-in-out 0.9s infinite;
}
@keyframes pingBack {
  0%   { transform: translateX(0); opacity: 1; }
  45%  { transform: translateX(-50px); opacity: 0; }
  46%  { transform: translateX(0); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

.card-hand {
  animation: cardHand 2s ease-in-out infinite;
}
@keyframes cardHand {
  0%,100% { transform: translateX(0) rotate(0deg); }
  50%     { transform: translateX(-12px) rotate(-5deg); }
}

.key-turn {
  animation: keyTurn 2.5s ease-in-out infinite;
}
@keyframes keyTurn {
  0%,100% { transform: rotate(0deg); }
  40%     { transform: rotate(-45deg); }
  60%     { transform: rotate(-45deg); }
}

.bit-text { animation: bitFade 1.5s ease-in-out infinite; }
.delay1   { animation-delay: 0.3s; }
.delay2   { animation-delay: 0.6s; }
.delay3   { animation-delay: 0.9s; }
.delay4   { animation-delay: 1.2s; }
@keyframes bitFade {
  0%,100% { opacity: 0.3; transform: translateY(0); }
  50%     { opacity: 1;   transform: translateY(-4px); }
}

/* ─── Mobile ─── */
@media (max-width: 900px) {
  .ns-root {
    flex-direction: column;
    padding: 2rem 1rem;
  }
  .ns-illustration {
    flex: none;
    width: 100%;
  }
  .ns-scene-box { max-width: none; }
}
</style>
