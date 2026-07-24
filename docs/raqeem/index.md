# لغة رقيم — نظرة عامة

**رقيم** لغة برمجة حديثة مبنية من الصفر بمترجمها الخاص، مصممة للأنظمة الآمنة عالية الأداء.

## مثال سريع

```raqeem
use std.io;

func add(a: int, b: int) -> int {
    return a + b;
}

func main() {
    val result = add(5, 5);
    var countdown = 3;

    loop countdown > 0 {
        countdown |> io.print;
        countdown = countdown - 1;
    }

    when result {
        10 => "Done!" |> io.print;
    }
}
```

## الميزات المميزة

- **Pipeline** `|>` كمواطن درجة أولى
- **`val` / `var`** — تمييز واضح بين الثابت والمتغير
- **`when`** — Pattern Matching قوي
- **`loop`** — حلقات آمنة بدون overflow
- **Error-as-Values** — أخطاء كقيم مستوحاة من Go وRust
- **بدون External Dependencies** للمترجم

## المترجم

```bash
# تشغيل مباشر (Evaluator)
./raqeem test.rq

# بناء ملف تنفيذي
./raqeem build test.rq
```

## المكونات

| الملف | الوظيفة |
|---|---|
| `src/lexer.c` | المُحلّل المعجمي |
| `src/parser.c` | المُحلّل النحوي |
| `src/ast.c` | شجرة بناء الجملة |
| `src/typecheck.c` | فحص الأنواع |
| `src/eval.c` | المُقيّم المباشر |
| `src/codegen.c` | مولّد الكود |
