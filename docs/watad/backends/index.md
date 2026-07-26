---
layout: doc
title: backends — طبقة التوافق
description: طبقة التوافق مع الأنظمة في وتد — backend خاص لحصن وآخر عادي للينكس وويندوز
---

<div style="padding-top: 1.5rem">

# 🧩 backends <span style="font-size:0.55em;font-weight:700;letter-spacing:0.15em;color:#f59e0b;opacity:0.7;font-family:monospace;vertical-align:middle">PLATFORM BACKENDS</span>

> نفس النواة، بيئات مختلفة — هذا ما يجعل وتد "لينكس محركات الويب"

**backends/** تحتوي على التنفيذات المحددة لكل منصة. النواة الأساسية (`watad-dom`, `watad-js`, `watad-render`) لا تعرف شيئاً عن هذه التنفيذات — فقط تستخدم الـ Traits.

## الهيكل

```
backends/
├── watad-net-hisn/    ← no_std — يتحدث مع Net_Vault عبر seL4 IPC
├── watad-net-std/     ← std — TCP مباشر للينكس وويندوز وماك
├── watad-render-vulkan/   ← GPU عالي الأداء
├── watad-render-software/ ← رسم برمجي للبيئات المعزولة (حصن)
└── watad-render-wgpu/     ← متعدد المنصات
```

> ✅ **بدأ التنفيذ** — تم إنشاء الهياكل الأولية (Crates)

## مثال تطبيقي: `watad-net-std`

نظراً لأن النواة وضعت عقداً واضحاً (`NetworkProvider`)، يمكن لأي نظام تنفيذه. هذا مثال لكيفية عمله في أنظمة لينكس/ويندوز (حيث تتوفر مكتبة `std` العادية):

```rust
use watad_net::{NetworkProvider, NetResponse, NetError};

pub struct StdNetworkProvider;

impl NetworkProvider for StdNetworkProvider {
    fn fetch(&self, url: &str) -> Result<NetResponse, NetError> {
        match reqwest::blocking::get(url) {
            Ok(response) => {
                let status_code = response.status().as_u16();
                let body = response.bytes().map_err(|_| NetError::ConnectionFailed)?.to_vec();
                
                Ok(NetResponse { status_code, body })
            }
            Err(_) => Err(NetError::ConnectionFailed),
        }
    }
}
```

</div>
