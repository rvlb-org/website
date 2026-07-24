---
title: "🖥️ desktop"
description: "توثيق حاوية desktop في نظام Hisn-seL4 — GUI"
---

# 🖥️ desktop


## نظرة عامة

<div class="overview-content">

<p>
  حاوية <code>Desktop</code> هي الطبقة الأكثر تعقيداً في النظام — تجمع بين <strong>نظام نوافذ متكامل</strong>، وإدارة مدخلات الماوس والكيبورد، والتواصل مع FS/Auth/Init عبر IPC، والرسم المباشر على الـ Framebuffer بدون Heap ديناميكي. تتألف من ثلاثة أقسام رئيسية:
</p>
<ul>
  <li><strong>src/</strong>: نقطة الدخول وإدارة المؤشر</li>
  <li><strong>desktop_ui/</strong>: حالة الـ UI الكاملة + منطق الأحداث + الرسم</li>
  <li><strong>desktop_ui/wm/</strong>: Window Manager (Compositor, Z-Order, Taskbar, Focus, Layout, Shortcuts)</li>
</ul>
<p>
  قاعدة التصميم: لا <code>alloc</code> ديناميكي في حلقة الأحداث — كل الحالة في <code>UIState</code> المُخزَّنة في <code>static mut</code> ثابت بحجم ثابت. الـ <code>BumpAllocator</code> يُصفَّر في كل دورة لمنع تراكم الذاكرة.
</p>


</div>

## الملفات البرمجية

### `src/main.rs`
> المسار: containers/desktop/src/main.rs

### `src/cursor.rs`
> المسار: containers/desktop/src/cursor.rs

### `src/desktop_ui/mod.rs (UIState)`
> المسار: containers/desktop/src/desktop_ui/mod.rs

### `src/desktop_ui/drag.rs`
> المسار: containers/desktop/src/desktop_ui/drag.rs

### `src/desktop_ui/draw.rs`
> المسار: containers/desktop/src/desktop_ui/draw.rs

### `src/desktop_ui/window.rs`
> المسار: containers/desktop/src/desktop_ui/window.rs

### `src/desktop_ui/window_draw.rs`
> المسار: containers/desktop/src/desktop_ui/window_draw.rs

### `src/desktop_ui/wm/compositor.rs`
> المسار: containers/desktop/src/desktop_ui/wm/compositor.rs

### `src/desktop_ui/wm/zorder.rs`
> المسار: containers/desktop/src/desktop_ui/wm/zorder.rs

### `src/desktop_ui/wm/taskbar.rs`
> المسار: containers/desktop/src/desktop_ui/wm/taskbar.rs

### `src/desktop_ui/wm/focus + layout + shortcut`
> المسارات: containers/desktop/src/desktop_ui/wm/focus.rs | wm/layout.rs | wm/shortcut.rs


<div class="back-nav">

[← العودة إلى الحاويات](/hisn/containers/)

</div>
