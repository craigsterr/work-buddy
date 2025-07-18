"use strict";
(() => {
  var Yt = "4.1.8";
  var Pe = 92,
    We = 47,
    qe = 42,
    Oi = 34,
    _i = 39,
    zi = 58,
    He = 59,
    ne = 10,
    Ge = 13,
    Oe = 32,
    Ye = 9,
    Jt = 123,
    yt = 125,
    Ct = 40,
    Qt = 41,
    Ki = 91,
    Di = 93,
    Zt = 45,
    xt = 64,
    Ui = 33;
  function $e(t, r) {
    let i = r?.from ? { file: r.from, code: t } : null;
    t[0] === "\uFEFF" && (t = " " + t.slice(1));
    let e = [],
      o = [],
      s = [],
      a = null,
      f = null,
      u = "",
      c = "",
      g = 0,
      p;
    for (let m = 0; m < t.length; m++) {
      let v = t.charCodeAt(m);
      if (!(v === Ge && ((p = t.charCodeAt(m + 1)), p === ne)))
        if (v === Pe) u === "" && (g = m), (u += t.slice(m, m + 2)), (m += 1);
        else if (v === We && t.charCodeAt(m + 1) === qe) {
          let k = m;
          for (let y = m + 2; y < t.length; y++)
            if (((p = t.charCodeAt(y)), p === Pe)) y += 1;
            else if (p === qe && t.charCodeAt(y + 1) === We) {
              m = y + 1;
              break;
            }
          let x = t.slice(k, m + 1);
          if (x.charCodeAt(2) === Ui) {
            let y = Je(x.slice(2, -2));
            o.push(y), i && ((y.src = [i, k, m + 1]), (y.dst = [i, k, m + 1]));
          }
        } else if (v === _i || v === Oi) {
          let k = m;
          for (let x = m + 1; x < t.length; x++)
            if (((p = t.charCodeAt(x)), p === Pe)) x += 1;
            else if (p === v) {
              m = x;
              break;
            } else {
              if (
                p === He &&
                (t.charCodeAt(x + 1) === ne ||
                  (t.charCodeAt(x + 1) === Ge && t.charCodeAt(x + 2) === ne))
              )
                throw new Error(
                  `Unterminated string: ${
                    t.slice(k, x + 1) + String.fromCharCode(v)
                  }`
                );
              if (p === ne || (p === Ge && t.charCodeAt(x + 1) === ne))
                throw new Error(
                  `Unterminated string: ${
                    t.slice(k, x) + String.fromCharCode(v)
                  }`
                );
            }
          u += t.slice(k, m + 1);
        } else {
          if (
            (v === Oe || v === ne || v === Ye) &&
            (p = t.charCodeAt(m + 1)) &&
            (p === Oe ||
              p === ne ||
              p === Ye ||
              (p === Ge && (p = t.charCodeAt(m + 2)) && p == ne))
          )
            continue;
          if (v === ne) {
            if (u.length === 0) continue;
            (p = u.charCodeAt(u.length - 1)),
              p !== Oe && p !== ne && p !== Ye && (u += " ");
          } else if (v === Zt && t.charCodeAt(m + 1) === Zt && u.length === 0) {
            let k = "",
              x = m,
              y = -1;
            for (let b = m + 2; b < t.length; b++)
              if (((p = t.charCodeAt(b)), p === Pe)) b += 1;
              else if (p === We && t.charCodeAt(b + 1) === qe) {
                for (let V = b + 2; V < t.length; V++)
                  if (((p = t.charCodeAt(V)), p === Pe)) V += 1;
                  else if (p === qe && t.charCodeAt(V + 1) === We) {
                    b = V + 1;
                    break;
                  }
              } else if (y === -1 && p === zi) y = u.length + b - x;
              else if (p === He && k.length === 0) {
                (u += t.slice(x, b)), (m = b);
                break;
              } else if (p === Ct) k += ")";
              else if (p === Ki) k += "]";
              else if (p === Jt) k += "}";
              else if ((p === yt || t.length - 1 === b) && k.length === 0) {
                (m = b - 1), (u += t.slice(x, b));
                break;
              } else
                (p === Qt || p === Di || p === yt) &&
                  k.length > 0 &&
                  t[b] === k[k.length - 1] &&
                  (k = k.slice(0, -1));
            let N = At(u, y);
            if (!N)
              throw new Error("Invalid custom property, expected a value");
            i && ((N.src = [i, x, m]), (N.dst = [i, x, m])),
              a ? a.nodes.push(N) : e.push(N),
              (u = "");
          } else if (v === He && u.charCodeAt(0) === xt)
            (f = _e(u)),
              i && ((f.src = [i, g, m]), (f.dst = [i, g, m])),
              a ? a.nodes.push(f) : e.push(f),
              (u = ""),
              (f = null);
          else if (v === He && c[c.length - 1] !== ")") {
            let k = At(u);
            if (!k)
              throw u.length === 0
                ? new Error("Unexpected semicolon")
                : new Error(`Invalid declaration: \`${u.trim()}\``);
            i && ((k.src = [i, g, m]), (k.dst = [i, g, m])),
              a ? a.nodes.push(k) : e.push(k),
              (u = "");
          } else if (v === Jt && c[c.length - 1] !== ")")
            (c += "}"),
              (f = G(u.trim())),
              i && ((f.src = [i, g, m]), (f.dst = [i, g, m])),
              a && a.nodes.push(f),
              s.push(a),
              (a = f),
              (u = ""),
              (f = null);
          else if (v === yt && c[c.length - 1] !== ")") {
            if (c === "") throw new Error("Missing opening {");
            if (((c = c.slice(0, -1)), u.length > 0))
              if (u.charCodeAt(0) === xt)
                (f = _e(u)),
                  i && ((f.src = [i, g, m]), (f.dst = [i, g, m])),
                  a ? a.nodes.push(f) : e.push(f),
                  (u = ""),
                  (f = null);
              else {
                let x = u.indexOf(":");
                if (a) {
                  let y = At(u, x);
                  if (!y)
                    throw new Error(`Invalid declaration: \`${u.trim()}\``);
                  i && ((y.src = [i, g, m]), (y.dst = [i, g, m])),
                    a.nodes.push(y);
                }
              }
            let k = s.pop() ?? null;
            k === null && a && e.push(a), (a = k), (u = ""), (f = null);
          } else if (v === Ct) (c += ")"), (u += "(");
          else if (v === Qt) {
            if (c[c.length - 1] !== ")") throw new Error("Missing opening (");
            (c = c.slice(0, -1)), (u += ")");
          } else {
            if (u.length === 0 && (v === Oe || v === ne || v === Ye)) continue;
            u === "" && (g = m), (u += String.fromCharCode(v));
          }
        }
    }
    if (u.charCodeAt(0) === xt) {
      let m = _e(u);
      i && ((m.src = [i, g, t.length]), (m.dst = [i, g, t.length])), e.push(m);
    }
    if (c.length > 0 && a) {
      if (a.kind === "rule")
        throw new Error(`Missing closing } at ${a.selector}`);
      if (a.kind === "at-rule")
        throw new Error(`Missing closing } at ${a.name} ${a.params}`);
    }
    return o.length > 0 ? o.concat(e) : e;
  }
  function _e(t, r = []) {
    let i = t,
      e = "";
    for (let o = 5; o < t.length; o++) {
      let s = t.charCodeAt(o);
      if (s === Oe || s === Ct) {
        (i = t.slice(0, o)), (e = t.slice(o));
        break;
      }
    }
    return F(i.trim(), e.trim(), r);
  }
  function At(t, r = t.indexOf(":")) {
    if (r === -1) return null;
    let i = t.indexOf("!important", r + 1);
    return l(
      t.slice(0, r).trim(),
      t.slice(r + 1, i === -1 ? t.length : i).trim(),
      i !== -1
    );
  }
  function me(t) {
    if (arguments.length === 0)
      throw new TypeError("`CSS.escape` requires an argument.");
    let r = String(t),
      i = r.length,
      e = -1,
      o,
      s = "",
      a = r.charCodeAt(0);
    if (i === 1 && a === 45) return "\\" + r;
    for (; ++e < i; ) {
      if (((o = r.charCodeAt(e)), o === 0)) {
        s += "\uFFFD";
        continue;
      }
      if (
        (o >= 1 && o <= 31) ||
        o === 127 ||
        (e === 0 && o >= 48 && o <= 57) ||
        (e === 1 && o >= 48 && o <= 57 && a === 45)
      ) {
        s += "\\" + o.toString(16) + " ";
        continue;
      }
      if (
        o >= 128 ||
        o === 45 ||
        o === 95 ||
        (o >= 48 && o <= 57) ||
        (o >= 65 && o <= 90) ||
        (o >= 97 && o <= 122)
      ) {
        s += r.charAt(e);
        continue;
      }
      s += "\\" + r.charAt(e);
    }
    return s;
  }
  function ve(t) {
    return t.replace(/\\([\dA-Fa-f]{1,6}[\t\n\f\r ]?|[\S\s])/g, (r) =>
      r.length > 2
        ? String.fromCodePoint(Number.parseInt(r.slice(1).trim(), 16))
        : r[1]
    );
  }
  var er = new Map([
    ["--font", ["--font-weight", "--font-size"]],
    ["--inset", ["--inset-shadow", "--inset-ring"]],
    [
      "--text",
      [
        "--text-color",
        "--text-decoration-color",
        "--text-decoration-thickness",
        "--text-indent",
        "--text-shadow",
        "--text-underline-offset",
      ],
    ],
  ]);
  function Xt(t, r) {
    return (er.get(r) ?? []).some((i) => t === i || t.startsWith(`${i}-`));
  }
  var Qe = class {
    constructor(r = new Map(), i = new Set([])) {
      this.values = r;
      this.keyframes = i;
    }
    prefix = null;
    get size() {
      return this.values.size;
    }
    add(r, i, e = 0, o) {
      if (r.endsWith("-*")) {
        if (i !== "initial")
          throw new Error(
            `Invalid theme value \`${i}\` for namespace \`${r}\``
          );
        r === "--*"
          ? this.values.clear()
          : this.clearNamespace(r.slice(0, -2), 0);
      }
      if (e & 4) {
        let s = this.values.get(r);
        if (s && !(s.options & 4)) return;
      }
      i === "initial"
        ? this.values.delete(r)
        : this.values.set(r, { value: i, options: e, src: o });
    }
    keysInNamespaces(r) {
      let i = [];
      for (let e of r) {
        let o = `${e}-`;
        for (let s of this.values.keys())
          s.startsWith(o) &&
            s.indexOf("--", 2) === -1 &&
            (Xt(s, e) || i.push(s.slice(o.length)));
      }
      return i;
    }
    get(r) {
      for (let i of r) {
        let e = this.values.get(i);
        if (e) return e.value;
      }
      return null;
    }
    hasDefault(r) {
      return (this.getOptions(r) & 4) === 4;
    }
    getOptions(r) {
      return (r = ve(this.#r(r))), this.values.get(r)?.options ?? 0;
    }
    entries() {
      return this.prefix
        ? Array.from(this.values, (r) => ((r[0] = this.prefixKey(r[0])), r))
        : this.values.entries();
    }
    prefixKey(r) {
      return this.prefix ? `--${this.prefix}-${r.slice(2)}` : r;
    }
    #r(r) {
      return this.prefix ? `--${r.slice(3 + this.prefix.length)}` : r;
    }
    clearNamespace(r, i) {
      let e = er.get(r) ?? [];
      e: for (let o of this.values.keys())
        if (o.startsWith(r)) {
          if (i !== 0 && (this.getOptions(o) & i) !== i) continue;
          for (let s of e) if (o.startsWith(s)) continue e;
          this.values.delete(o);
        }
    }
    #e(r, i) {
      for (let e of i) {
        let o = r !== null ? `${e}-${r}` : e;
        if (!this.values.has(o))
          if (r !== null && r.includes(".")) {
            if (((o = `${e}-${r.replaceAll(".", "_")}`), !this.values.has(o)))
              continue;
          } else continue;
        if (!Xt(o, e)) return o;
      }
      return null;
    }
    #t(r) {
      let i = this.values.get(r);
      if (!i) return null;
      let e = null;
      return (
        i.options & 2 && (e = i.value),
        `var(${me(this.prefixKey(r))}${e ? `, ${e}` : ""})`
      );
    }
    markUsedVariable(r) {
      let i = ve(this.#r(r)),
        e = this.values.get(i);
      if (!e) return !1;
      let o = e.options & 16;
      return (e.options |= 16), !o;
    }
    resolve(r, i, e = 0) {
      let o = this.#e(r, i);
      if (!o) return null;
      let s = this.values.get(o);
      return (e | s.options) & 1 ? s.value : this.#t(o);
    }
    resolveValue(r, i) {
      let e = this.#e(r, i);
      return e ? this.values.get(e).value : null;
    }
    resolveWith(r, i, e = []) {
      let o = this.#e(r, i);
      if (!o) return null;
      let s = {};
      for (let f of e) {
        let u = `${o}${f}`,
          c = this.values.get(u);
        c && (c.options & 1 ? (s[f] = c.value) : (s[f] = this.#t(u)));
      }
      let a = this.values.get(o);
      return a.options & 1 ? [a.value, s] : [this.#t(o), s];
    }
    namespace(r) {
      let i = new Map(),
        e = `${r}-`;
      for (let [o, s] of this.values)
        o === r
          ? i.set(null, s.value)
          : o.startsWith(`${e}-`)
          ? i.set(o.slice(r.length), s.value)
          : o.startsWith(e) && i.set(o.slice(e.length), s.value);
      return i;
    }
    addKeyframes(r) {
      this.keyframes.add(r);
    }
    getKeyframes() {
      return Array.from(this.keyframes);
    }
  };
  var W = class extends Map {
    constructor(i) {
      super();
      this.factory = i;
    }
    get(i) {
      let e = super.get(i);
      return e === void 0 && ((e = this.factory(i, this)), this.set(i, e)), e;
    }
  };
  function St(t) {
    return { kind: "word", value: t };
  }
  function ji(t, r) {
    return { kind: "function", value: t, nodes: r };
  }
  function Li(t) {
    return { kind: "separator", value: t };
  }
  function ee(t, r, i = null) {
    for (let e = 0; e < t.length; e++) {
      let o = t[e],
        s = !1,
        a = 0,
        f =
          r(o, {
            parent: i,
            replaceWith(u) {
              s ||
                ((s = !0),
                Array.isArray(u)
                  ? u.length === 0
                    ? (t.splice(e, 1), (a = 0))
                    : u.length === 1
                    ? ((t[e] = u[0]), (a = 1))
                    : (t.splice(e, 1, ...u), (a = u.length))
                  : (t[e] = u));
            },
          }) ?? 0;
      if (s) {
        f === 0 ? e-- : (e += a - 1);
        continue;
      }
      if (f === 2) return 2;
      if (f !== 1 && o.kind === "function" && ee(o.nodes, r, o) === 2) return 2;
    }
  }
  function J(t) {
    let r = "";
    for (let i of t)
      switch (i.kind) {
        case "word":
        case "separator": {
          r += i.value;
          break;
        }
        case "function":
          r += i.value + "(" + J(i.nodes) + ")";
      }
    return r;
  }
  var tr = 92,
    Ii = 41,
    rr = 58,
    ir = 44,
    Fi = 34,
    or = 61,
    nr = 62,
    lr = 60,
    ar = 10,
    Mi = 40,
    Bi = 39,
    sr = 47,
    ur = 32,
    cr = 9;
  function q(t) {
    t = t.replaceAll(
      `\r
`,
      `
`
    );
    let r = [],
      i = [],
      e = null,
      o = "",
      s;
    for (let a = 0; a < t.length; a++) {
      let f = t.charCodeAt(a);
      switch (f) {
        case tr: {
          (o += t[a] + t[a + 1]), a++;
          break;
        }
        case rr:
        case ir:
        case or:
        case nr:
        case lr:
        case ar:
        case sr:
        case ur:
        case cr: {
          if (o.length > 0) {
            let p = St(o);
            e ? e.nodes.push(p) : r.push(p), (o = "");
          }
          let u = a,
            c = a + 1;
          for (
            ;
            c < t.length &&
            ((s = t.charCodeAt(c)),
            !(
              s !== rr &&
              s !== ir &&
              s !== or &&
              s !== nr &&
              s !== lr &&
              s !== ar &&
              s !== sr &&
              s !== ur &&
              s !== cr
            ));
            c++
          );
          a = c - 1;
          let g = Li(t.slice(u, c));
          e ? e.nodes.push(g) : r.push(g);
          break;
        }
        case Bi:
        case Fi: {
          let u = a;
          for (let c = a + 1; c < t.length; c++)
            if (((s = t.charCodeAt(c)), s === tr)) c += 1;
            else if (s === f) {
              a = c;
              break;
            }
          o += t.slice(u, a + 1);
          break;
        }
        case Mi: {
          let u = ji(o, []);
          (o = ""), e ? e.nodes.push(u) : r.push(u), i.push(u), (e = u);
          break;
        }
        case Ii: {
          let u = i.pop();
          if (o.length > 0) {
            let c = St(o);
            u?.nodes.push(c), (o = "");
          }
          i.length > 0 ? (e = i[i.length - 1]) : (e = null);
          break;
        }
        default:
          o += String.fromCharCode(f);
      }
    }
    return o.length > 0 && r.push(St(o)), r;
  }
  function Ze(t) {
    let r = [];
    return (
      ee(q(t), (i) => {
        if (!(i.kind !== "function" || i.value !== "var"))
          return (
            ee(i.nodes, (e) => {
              e.kind !== "word" ||
                e.value[0] !== "-" ||
                e.value[1] !== "-" ||
                r.push(e.value);
            }),
            1
          );
      }),
      r
    );
  }
  var qi = 64;
  function M(t, r = []) {
    return { kind: "rule", selector: t, nodes: r };
  }
  function F(t, r = "", i = []) {
    return { kind: "at-rule", name: t, params: r, nodes: i };
  }
  function G(t, r = []) {
    return t.charCodeAt(0) === qi ? _e(t, r) : M(t, r);
  }
  function l(t, r, i = !1) {
    return { kind: "declaration", property: t, value: r, important: i };
  }
  function Je(t) {
    return { kind: "comment", value: t };
  }
  function ue(t, r) {
    return { kind: "context", context: t, nodes: r };
  }
  function I(t) {
    return { kind: "at-root", nodes: t };
  }
  function L(t, r, i = [], e = {}) {
    for (let o = 0; o < t.length; o++) {
      let s = t[o],
        a = i[i.length - 1] ?? null;
      if (s.kind === "context") {
        if (L(s.nodes, r, i, { ...e, ...s.context }) === 2) return 2;
        continue;
      }
      i.push(s);
      let f = !1,
        u = 0,
        c =
          r(s, {
            parent: a,
            context: e,
            path: i,
            replaceWith(g) {
              f ||
                ((f = !0),
                Array.isArray(g)
                  ? g.length === 0
                    ? (t.splice(o, 1), (u = 0))
                    : g.length === 1
                    ? ((t[o] = g[0]), (u = 1))
                    : (t.splice(o, 1, ...g), (u = g.length))
                  : ((t[o] = g), (u = 1)));
            },
          }) ?? 0;
      if ((i.pop(), f)) {
        c === 0 ? o-- : (o += u - 1);
        continue;
      }
      if (c === 2) return 2;
      if (c !== 1 && "nodes" in s) {
        i.push(s);
        let g = L(s.nodes, r, i, e);
        if ((i.pop(), g === 2)) return 2;
      }
    }
  }
  function Xe(t, r, i = [], e = {}) {
    for (let o = 0; o < t.length; o++) {
      let s = t[o],
        a = i[i.length - 1] ?? null;
      if (s.kind === "rule" || s.kind === "at-rule")
        i.push(s), Xe(s.nodes, r, i, e), i.pop();
      else if (s.kind === "context") {
        Xe(s.nodes, r, i, { ...e, ...s.context });
        continue;
      }
      i.push(s),
        r(s, {
          parent: a,
          context: e,
          path: i,
          replaceWith(f) {
            Array.isArray(f)
              ? f.length === 0
                ? t.splice(o, 1)
                : f.length === 1
                ? (t[o] = f[0])
                : t.splice(o, 1, ...f)
              : (t[o] = f),
              (o += f.length - 1);
          },
        }),
        i.pop();
    }
  }
  function be(t, r, i = 3) {
    let e = [],
      o = new Set(),
      s = new W(() => new Set()),
      a = new W(() => new Set()),
      f = new Set(),
      u = new Set(),
      c = [],
      g = [],
      p = new W(() => new Set());
    function m(k, x, y = {}, N = 0) {
      if (k.kind === "declaration") {
        if (
          k.property === "--tw-sort" ||
          k.value === void 0 ||
          k.value === null
        )
          return;
        if (y.theme && k.property[0] === "-" && k.property[1] === "-") {
          if (k.value === "initial") {
            k.value = void 0;
            return;
          }
          y.keyframes || s.get(x).add(k);
        }
        if (k.value.includes("var("))
          if (y.theme && k.property[0] === "-" && k.property[1] === "-")
            for (let b of Ze(k.value)) p.get(b).add(k.property);
          else r.trackUsedVariables(k.value);
        if (k.property === "animation") for (let b of fr(k.value)) u.add(b);
        i & 2 && k.value.includes("color-mix(") && a.get(x).add(k), x.push(k);
      } else if (k.kind === "rule")
        if (k.selector === "&")
          for (let b of k.nodes) {
            let V = [];
            m(b, V, y, N + 1), V.length > 0 && x.push(...V);
          }
        else {
          let b = { ...k, nodes: [] };
          for (let V of k.nodes) m(V, b.nodes, y, N + 1);
          b.nodes.length > 0 && x.push(b);
        }
      else if (k.kind === "at-rule" && k.name === "@property" && N === 0) {
        if (o.has(k.params)) return;
        if (i & 1) {
          let V = k.params,
            R = null,
            U = !1;
          for (let K of k.nodes)
            K.kind === "declaration" &&
              (K.property === "initial-value"
                ? (R = K.value)
                : K.property === "inherits" && (U = K.value === "true"));
          let P = l(V, R ?? "initial");
          (P.src = k.src), U ? c.push(P) : g.push(P);
        }
        o.add(k.params);
        let b = { ...k, nodes: [] };
        for (let V of k.nodes) m(V, b.nodes, y, N + 1);
        x.push(b);
      } else if (k.kind === "at-rule") {
        k.name === "@keyframes" && (y = { ...y, keyframes: !0 });
        let b = { ...k, nodes: [] };
        for (let V of k.nodes) m(V, b.nodes, y, N + 1);
        k.name === "@keyframes" && y.theme && f.add(b),
          (b.nodes.length > 0 ||
            b.name === "@layer" ||
            b.name === "@charset" ||
            b.name === "@custom-media" ||
            b.name === "@namespace" ||
            b.name === "@import") &&
            x.push(b);
      } else if (k.kind === "at-root")
        for (let b of k.nodes) {
          let V = [];
          m(b, V, y, 0);
          for (let R of V) e.push(R);
        }
      else if (k.kind === "context") {
        if (k.context.reference) return;
        for (let b of k.nodes) m(b, x, { ...y, ...k.context }, N);
      } else k.kind === "comment" && x.push(k);
    }
    let v = [];
    for (let k of t) m(k, v, {}, 0);
    e: for (let [k, x] of s)
      for (let y of x) {
        if (dr(y.property, r.theme, p)) {
          if (y.property.startsWith(r.theme.prefixKey("--animate-")))
            for (let V of fr(y.value)) u.add(V);
          continue;
        }
        let b = k.indexOf(y);
        if ((k.splice(b, 1), k.length === 0)) {
          let V = Hi(v, (R) => R.kind === "rule" && R.nodes === k);
          if (!V || V.length === 0) continue e;
          V.unshift({ kind: "at-root", nodes: v });
          do {
            let R = V.pop();
            if (!R) break;
            let U = V[V.length - 1];
            if (!U || (U.kind !== "at-root" && U.kind !== "at-rule")) break;
            let P = U.nodes.indexOf(R);
            if (P === -1) break;
            U.nodes.splice(P, 1);
          } while (!0);
          continue e;
        }
      }
    for (let k of f)
      if (!u.has(k.params)) {
        let x = e.indexOf(k);
        e.splice(x, 1);
      }
    if (((v = v.concat(e)), i & 2))
      for (let [k, x] of a)
        for (let y of x) {
          let N = k.indexOf(y);
          if (N === -1 || y.value == null) continue;
          let b = q(y.value),
            V = !1;
          if (
            (ee(b, (P, { replaceWith: K }) => {
              if (P.kind !== "function" || P.value !== "color-mix") return;
              let _ = !1,
                H = !1;
              if (
                (ee(P.nodes, (j, { replaceWith: B }) => {
                  if (
                    j.kind == "word" &&
                    j.value.toLowerCase() === "currentcolor"
                  ) {
                    (H = !0), (V = !0);
                    return;
                  }
                  let Q = j,
                    oe = null,
                    n = new Set();
                  do {
                    if (Q.kind !== "function" || Q.value !== "var") return;
                    let d = Q.nodes[0];
                    if (!d || d.kind !== "word") return;
                    let h = d.value;
                    if (n.has(h)) {
                      _ = !0;
                      return;
                    }
                    if (
                      (n.add(h),
                      (V = !0),
                      (oe = r.theme.resolveValue(null, [d.value])),
                      !oe)
                    ) {
                      _ = !0;
                      return;
                    }
                    if (oe.toLowerCase() === "currentcolor") {
                      H = !0;
                      return;
                    }
                    oe.startsWith("var(") ? (Q = q(oe)[0]) : (Q = null);
                  } while (Q);
                  B({ kind: "word", value: oe });
                }),
                _ || H)
              ) {
                let j = P.nodes.findIndex(
                  (Q) => Q.kind === "separator" && Q.value.trim().includes(",")
                );
                if (j === -1) return;
                let B = P.nodes.length > j ? P.nodes[j + 1] : null;
                if (!B) return;
                K(B);
              } else if (V) {
                let j = P.nodes[2];
                j.kind === "word" &&
                  (j.value === "oklab" ||
                    j.value === "oklch" ||
                    j.value === "lab" ||
                    j.value === "lch") &&
                  (j.value = "srgb");
              }
            }),
            !V)
          )
            continue;
          let R = { ...y, value: J(b) },
            U = G("@supports (color: color-mix(in lab, red, red))", [y]);
          (U.src = y.src), k.splice(N, 1, R, U);
        }
    if (i & 1) {
      let k = [];
      if (c.length > 0) {
        let x = G(":root, :host", c);
        (x.src = c[0].src), k.push(x);
      }
      if (g.length > 0) {
        let x = G("*, ::before, ::after, ::backdrop", g);
        (x.src = g[0].src), k.push(x);
      }
      if (k.length > 0) {
        let x = v.findIndex(
            (b) =>
              !(
                b.kind === "comment" ||
                (b.kind === "at-rule" &&
                  (b.name === "@charset" || b.name === "@import"))
              )
          ),
          y = F("@layer", "properties", []);
        (y.src = k[0].src), v.splice(x < 0 ? v.length : x, 0, y);
        let N = G("@layer properties", [
          F(
            "@supports",
            "((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))",
            k
          ),
        ]);
        (N.src = k[0].src), (N.nodes[0].src = k[0].src), v.push(N);
      }
    }
    return v;
  }
  function le(t, r) {
    let i = 0,
      e = { file: null, code: "" };
    function o(a, f = 0) {
      let u = "",
        c = "  ".repeat(f);
      if (a.kind === "declaration") {
        if (
          ((u += `${c}${a.property}: ${a.value}${
            a.important ? " !important" : ""
          };
`),
          r)
        ) {
          i += c.length;
          let g = i;
          (i += a.property.length),
            (i += 2),
            (i += a.value?.length ?? 0),
            a.important && (i += 11);
          let p = i;
          (i += 2), (a.dst = [e, g, p]);
        }
      } else if (a.kind === "rule") {
        if (
          ((u += `${c}${a.selector} {
`),
          r)
        ) {
          i += c.length;
          let g = i;
          (i += a.selector.length), (i += 1);
          let p = i;
          (a.dst = [e, g, p]), (i += 2);
        }
        for (let g of a.nodes) u += o(g, f + 1);
        (u += `${c}}
`),
          r && ((i += c.length), (i += 2));
      } else if (a.kind === "at-rule") {
        if (a.nodes.length === 0) {
          let g = `${c}${a.name} ${a.params};
`;
          if (r) {
            i += c.length;
            let p = i;
            (i += a.name.length), (i += 1), (i += a.params.length);
            let m = i;
            (i += 2), (a.dst = [e, p, m]);
          }
          return g;
        }
        if (
          ((u += `${c}${a.name}${a.params ? ` ${a.params} ` : " "}{
`),
          r)
        ) {
          i += c.length;
          let g = i;
          (i += a.name.length),
            a.params && ((i += 1), (i += a.params.length)),
            (i += 1);
          let p = i;
          (a.dst = [e, g, p]), (i += 2);
        }
        for (let g of a.nodes) u += o(g, f + 1);
        (u += `${c}}
`),
          r && ((i += c.length), (i += 2));
      } else if (a.kind === "comment") {
        if (
          ((u += `${c}/*${a.value}*/
`),
          r)
        ) {
          i += c.length;
          let g = i;
          i += 2 + a.value.length + 2;
          let p = i;
          (a.dst = [e, g, p]), (i += 1);
        }
      } else if (a.kind === "context" || a.kind === "at-root") return "";
      return u;
    }
    let s = "";
    for (let a of t) s += o(a, 0);
    return (e.code = s), s;
  }
  function Hi(t, r) {
    let i = [];
    return (
      L(t, (e, { path: o }) => {
        if (r(e)) return (i = [...o]), 2;
      }),
      i
    );
  }
  function dr(t, r, i, e = new Set()) {
    if (e.has(t) || (e.add(t), r.getOptions(t) & 24)) return !0;
    {
      let s = i.get(t) ?? [];
      for (let a of s) if (dr(a, r, i, e)) return !0;
    }
    return !1;
  }
  function fr(t) {
    return t.split(/[\s,]+/);
  }
  var Nt = [
      "calc",
      "min",
      "max",
      "clamp",
      "mod",
      "rem",
      "sin",
      "cos",
      "tan",
      "asin",
      "acos",
      "atan",
      "atan2",
      "pow",
      "sqrt",
      "hypot",
      "log",
      "exp",
      "round",
    ],
    tt = ["anchor-size"],
    pr = new RegExp(`(${tt.join("|")})\\(`, "g");
  function ze(t) {
    return t.indexOf("(") !== -1 && Nt.some((r) => t.includes(`${r}(`));
  }
  function mr(t) {
    if (!Nt.some((o) => t.includes(o))) return t;
    let r = !1;
    tt.some((o) => t.includes(o)) &&
      ((pr.lastIndex = 0),
      (t = t.replace(pr, (o, s) => ((r = !0), `$${tt.indexOf(s)}$(`))));
    let i = "",
      e = [];
    for (let o = 0; o < t.length; o++) {
      let s = t[o];
      if (s === "(") {
        i += s;
        let a = o;
        for (let u = o - 1; u >= 0; u--) {
          let c = t.charCodeAt(u);
          if (c >= 48 && c <= 57) a = u;
          else if (c >= 97 && c <= 122) a = u;
          else break;
        }
        let f = t.slice(a, o);
        if (Nt.includes(f)) {
          e.unshift(!0);
          continue;
        } else if (e[0] && f === "") {
          e.unshift(!0);
          continue;
        }
        e.unshift(!1);
        continue;
      } else if (s === ")") (i += s), e.shift();
      else if (s === "," && e[0]) {
        i += ", ";
        continue;
      } else {
        if (s === " " && e[0] && i[i.length - 1] === " ") continue;
        if ((s === "+" || s === "*" || s === "/" || s === "-") && e[0]) {
          let a = i.trimEnd(),
            f = a[a.length - 1];
          if (f === "+" || f === "*" || f === "/" || f === "-") {
            i += s;
            continue;
          } else if (f === "(" || f === ",") {
            i += s;
            continue;
          } else t[o - 1] === " " ? (i += `${s} `) : (i += ` ${s} `);
        } else if (e[0] && t.startsWith("to-zero", o)) {
          let a = o;
          (o += 7), (i += t.slice(a, o + 1));
        } else i += s;
      }
    }
    return r ? i.replace(/\$(\d+)\$/g, (o, s) => tt[s] ?? o) : i;
  }
  function ge(t) {
    if (t.indexOf("(") === -1) return Se(t);
    let r = q(t);
    return Vt(r), (t = J(r)), (t = mr(t)), t;
  }
  function Se(t, r = !1) {
    let i = "";
    for (let e = 0; e < t.length; e++) {
      let o = t[e];
      o === "\\" && t[e + 1] === "_"
        ? ((i += "_"), (e += 1))
        : o === "_" && !r
        ? (i += " ")
        : (i += o);
    }
    return i;
  }
  function Vt(t) {
    for (let r of t)
      switch (r.kind) {
        case "function": {
          if (r.value === "url" || r.value.endsWith("_url")) {
            r.value = Se(r.value);
            break;
          }
          if (
            r.value === "var" ||
            r.value.endsWith("_var") ||
            r.value === "theme" ||
            r.value.endsWith("_theme")
          ) {
            r.value = Se(r.value);
            for (let i = 0; i < r.nodes.length; i++) {
              if (i == 0 && r.nodes[i].kind === "word") {
                r.nodes[i].value = Se(r.nodes[i].value, !0);
                continue;
              }
              Vt([r.nodes[i]]);
            }
            break;
          }
          (r.value = Se(r.value)), Vt(r.nodes);
          break;
        }
        case "separator":
        case "word": {
          r.value = Se(r.value);
          break;
        }
        default:
          Yi(r);
      }
  }
  function Yi(t) {
    throw new Error(`Unexpected value: ${t}`);
  }
  var Tt = new Uint8Array(256);
  function fe(t) {
    let r = 0,
      i = t.length;
    for (let e = 0; e < i; e++) {
      let o = t.charCodeAt(e);
      switch (o) {
        case 92:
          e += 1;
          break;
        case 39:
        case 34:
          for (; ++e < i; ) {
            let s = t.charCodeAt(e);
            if (s === 92) {
              e += 1;
              continue;
            }
            if (s === o) break;
          }
          break;
        case 40:
          (Tt[r] = 41), r++;
          break;
        case 91:
          (Tt[r] = 93), r++;
          break;
        case 123:
          break;
        case 93:
        case 125:
        case 41:
          if (r === 0) return !1;
          r > 0 && o === Tt[r - 1] && r--;
          break;
        case 59:
          if (r === 0) return !1;
          break;
      }
    }
    return !0;
  }
  var rt = new Uint8Array(256);
  function z(t, r) {
    let i = 0,
      e = [],
      o = 0,
      s = t.length,
      a = r.charCodeAt(0);
    for (let f = 0; f < s; f++) {
      let u = t.charCodeAt(f);
      if (i === 0 && u === a) {
        e.push(t.slice(o, f)), (o = f + 1);
        continue;
      }
      switch (u) {
        case 92:
          f += 1;
          break;
        case 39:
        case 34:
          for (; ++f < s; ) {
            let c = t.charCodeAt(f);
            if (c === 92) {
              f += 1;
              continue;
            }
            if (c === u) break;
          }
          break;
        case 40:
          (rt[i] = 41), i++;
          break;
        case 91:
          (rt[i] = 93), i++;
          break;
        case 123:
          (rt[i] = 125), i++;
          break;
        case 93:
        case 125:
        case 41:
          i > 0 && u === rt[i - 1] && i--;
          break;
      }
    }
    return e.push(t.slice(o)), e;
  }
  var Ji = 58,
    gr = 45,
    hr = 97,
    kr = 122;
  function* vr(t, r) {
    let i = z(t, ":");
    if (r.theme.prefix) {
      if (i.length === 1 || i[0] !== r.theme.prefix) return null;
      i.shift();
    }
    let e = i.pop(),
      o = [];
    for (let p = i.length - 1; p >= 0; --p) {
      let m = r.parseVariant(i[p]);
      if (m === null) return;
      o.push(m);
    }
    let s = !1;
    e[e.length - 1] === "!"
      ? ((s = !0), (e = e.slice(0, -1)))
      : e[0] === "!" && ((s = !0), (e = e.slice(1))),
      r.utilities.has(e, "static") &&
        !e.includes("[") &&
        (yield { kind: "static", root: e, variants: o, important: s, raw: t });
    let [a, f = null, u] = z(e, "/");
    if (u) return;
    let c = f === null ? null : Et(f);
    if (f !== null && c === null) return;
    if (a[0] === "[") {
      if (a[a.length - 1] !== "]") return;
      let p = a.charCodeAt(1);
      if (p !== gr && !(p >= hr && p <= kr)) return;
      a = a.slice(1, -1);
      let m = a.indexOf(":");
      if (m === -1 || m === 0 || m === a.length - 1) return;
      let v = a.slice(0, m),
        k = ge(a.slice(m + 1));
      if (!fe(k)) return;
      yield {
        kind: "arbitrary",
        property: v,
        value: k,
        modifier: c,
        variants: o,
        important: s,
        raw: t,
      };
      return;
    }
    let g;
    if (a[a.length - 1] === "]") {
      let p = a.indexOf("-[");
      if (p === -1) return;
      let m = a.slice(0, p);
      if (!r.utilities.has(m, "functional")) return;
      let v = a.slice(p + 1);
      g = [[m, v]];
    } else if (a[a.length - 1] === ")") {
      let p = a.indexOf("-(");
      if (p === -1) return;
      let m = a.slice(0, p);
      if (!r.utilities.has(m, "functional")) return;
      let v = a.slice(p + 2, -1),
        k = z(v, ":"),
        x = null;
      if (
        (k.length === 2 && ((x = k[0]), (v = k[1])),
        v[0] !== "-" || v[1] !== "-" || !fe(v))
      )
        return;
      g = [[m, x === null ? `[var(${v})]` : `[${x}:var(${v})]`]];
    } else g = br(a, (p) => r.utilities.has(p, "functional"));
    for (let [p, m] of g) {
      let v = {
        kind: "functional",
        root: p,
        modifier: c,
        value: null,
        variants: o,
        important: s,
        raw: t,
      };
      if (m === null) {
        yield v;
        continue;
      }
      {
        let k = m.indexOf("[");
        if (k !== -1) {
          if (m[m.length - 1] !== "]") return;
          let y = ge(m.slice(k + 1, -1));
          if (!fe(y)) continue;
          let N = "";
          for (let b = 0; b < y.length; b++) {
            let V = y.charCodeAt(b);
            if (V === Ji) {
              (N = y.slice(0, b)), (y = y.slice(b + 1));
              break;
            }
            if (!(V === gr || (V >= hr && V <= kr))) break;
          }
          if (y.length === 0 || y.trim().length === 0) continue;
          v.value = { kind: "arbitrary", dataType: N || null, value: y };
        } else {
          let y =
            f === null || v.modifier?.kind === "arbitrary" ? null : `${m}/${f}`;
          v.value = { kind: "named", value: m, fraction: y };
        }
      }
      yield v;
    }
  }
  function Et(t) {
    if (t[0] === "[" && t[t.length - 1] === "]") {
      let r = ge(t.slice(1, -1));
      return !fe(r) || r.length === 0 || r.trim().length === 0
        ? null
        : { kind: "arbitrary", value: r };
    }
    return t[0] === "(" && t[t.length - 1] === ")"
      ? ((t = t.slice(1, -1)),
        t[0] !== "-" || t[1] !== "-" || !fe(t)
          ? null
          : ((t = `var(${t})`), { kind: "arbitrary", value: ge(t) }))
      : { kind: "named", value: t };
  }
  function wr(t, r) {
    if (t[0] === "[" && t[t.length - 1] === "]") {
      if (t[1] === "@" && t.includes("&")) return null;
      let i = ge(t.slice(1, -1));
      if (!fe(i) || i.length === 0 || i.trim().length === 0) return null;
      let e = i[0] === ">" || i[0] === "+" || i[0] === "~";
      return (
        !e && i[0] !== "@" && !i.includes("&") && (i = `&:is(${i})`),
        { kind: "arbitrary", selector: i, relative: e }
      );
    }
    {
      let [i, e = null, o] = z(t, "/");
      if (o) return null;
      let s = br(i, (a) => r.variants.has(a));
      for (let [a, f] of s)
        switch (r.variants.kind(a)) {
          case "static":
            return f !== null || e !== null
              ? null
              : { kind: "static", root: a };
          case "functional": {
            let u = e === null ? null : Et(e);
            if (e !== null && u === null) return null;
            if (f === null)
              return { kind: "functional", root: a, modifier: u, value: null };
            if (f[f.length - 1] === "]") {
              if (f[0] !== "[") continue;
              let c = ge(f.slice(1, -1));
              return !fe(c) || c.length === 0 || c.trim().length === 0
                ? null
                : {
                    kind: "functional",
                    root: a,
                    modifier: u,
                    value: { kind: "arbitrary", value: c },
                  };
            }
            if (f[f.length - 1] === ")") {
              if (f[0] !== "(") continue;
              let c = ge(f.slice(1, -1));
              return !fe(c) ||
                c.length === 0 ||
                c.trim().length === 0 ||
                c[0] !== "-" ||
                c[1] !== "-"
                ? null
                : {
                    kind: "functional",
                    root: a,
                    modifier: u,
                    value: { kind: "arbitrary", value: `var(${c})` },
                  };
            }
            return {
              kind: "functional",
              root: a,
              modifier: u,
              value: { kind: "named", value: f },
            };
          }
          case "compound": {
            if (f === null) return null;
            let u = r.parseVariant(f);
            if (u === null || !r.variants.compoundsWith(a, u)) return null;
            let c = e === null ? null : Et(e);
            return e !== null && c === null
              ? null
              : { kind: "compound", root: a, modifier: c, variant: u };
          }
        }
    }
    return null;
  }
  function* br(t, r) {
    r(t) && (yield [t, null]);
    let i = t.lastIndexOf("-");
    for (; i > 0; ) {
      let e = t.slice(0, i);
      if (r(e)) {
        let o = [e, t.slice(i + 1)];
        if (o[1] === "") break;
        yield o;
      }
      i = t.lastIndexOf("-", i - 1);
    }
    t[0] === "@" && r("@") && (yield ["@", t.slice(1)]);
  }
  function yr(t, r) {
    let i = [];
    for (let o of r.variants) i.unshift(it(o));
    t.theme.prefix && i.unshift(t.theme.prefix);
    let e = "";
    if (
      (r.kind === "static" && (e += r.root),
      r.kind === "functional" && ((e += r.root), r.value))
    )
      if (r.value.kind === "arbitrary") {
        if (r.value !== null) {
          let o = Pt(r.value.value),
            s = o ? r.value.value.slice(4, -1) : r.value.value,
            [a, f] = o ? ["(", ")"] : ["[", "]"];
          r.value.dataType
            ? (e += `-${a}${r.value.dataType}:${Ne(s)}${f}`)
            : (e += `-${a}${Ne(s)}${f}`);
        }
      } else r.value.kind === "named" && (e += `-${r.value.value}`);
    return (
      r.kind === "arbitrary" && (e += `[${r.property}:${Ne(r.value)}]`),
      (r.kind === "arbitrary" || r.kind === "functional") &&
        (e += xr(r.modifier)),
      r.important && (e += "!"),
      i.push(e),
      i.join(":")
    );
  }
  function xr(t) {
    if (t === null) return "";
    let r = Pt(t.value),
      i = r ? t.value.slice(4, -1) : t.value,
      [e, o] = r ? ["(", ")"] : ["[", "]"];
    return t.kind === "arbitrary"
      ? `/${e}${Ne(i)}${o}`
      : t.kind === "named"
      ? `/${t.value}`
      : "";
  }
  function it(t) {
    if (t.kind === "static") return t.root;
    if (t.kind === "arbitrary") return `[${Ne(Xi(t.selector))}]`;
    let r = "";
    if (t.kind === "functional") {
      r += t.root;
      let i = t.root !== "@";
      if (t.value)
        if (t.value.kind === "arbitrary") {
          let e = Pt(t.value.value),
            o = e ? t.value.value.slice(4, -1) : t.value.value,
            [s, a] = e ? ["(", ")"] : ["[", "]"];
          r += `${i ? "-" : ""}${s}${Ne(o)}${a}`;
        } else
          t.value.kind === "named" && (r += `${i ? "-" : ""}${t.value.value}`);
    }
    return (
      t.kind === "compound" &&
        ((r += t.root), (r += "-"), (r += it(t.variant))),
      (t.kind === "functional" || t.kind === "compound") &&
        (r += xr(t.modifier)),
      r
    );
  }
  var Qi = new W((t) => {
    let r = q(t),
      i = new Set();
    return (
      ee(r, (e, { parent: o }) => {
        let s = o === null ? r : o.nodes ?? [];
        if (
          e.kind === "word" &&
          (e.value === "+" ||
            e.value === "-" ||
            e.value === "*" ||
            e.value === "/")
        ) {
          let a = s.indexOf(e) ?? -1;
          if (a === -1) return;
          let f = s[a - 1];
          if (f?.kind !== "separator" || f.value !== " ") return;
          let u = s[a + 1];
          if (u?.kind !== "separator" || u.value !== " ") return;
          i.add(f), i.add(u);
        } else
          e.kind === "separator" && e.value.trim() === "/"
            ? (e.value = "/")
            : e.kind === "separator" &&
              e.value.length > 0 &&
              e.value.trim() === ""
            ? (s[0] === e || s[s.length - 1] === e) && i.add(e)
            : e.kind === "separator" &&
              e.value.trim() === "," &&
              (e.value = ",");
      }),
      i.size > 0 &&
        ee(r, (e, { replaceWith: o }) => {
          i.has(e) && (i.delete(e), o([]));
        }),
      Rt(r),
      J(r)
    );
  });
  function Ne(t) {
    return Qi.get(t);
  }
  var Zi = new W((t) => {
    let r = q(t);
    return r.length === 3 &&
      r[0].kind === "word" &&
      r[0].value === "&" &&
      r[1].kind === "separator" &&
      r[1].value === ":" &&
      r[2].kind === "function" &&
      r[2].value === "is"
      ? J(r[2].nodes)
      : t;
  });
  function Xi(t) {
    return Zi.get(t);
  }
  function Rt(t) {
    for (let r of t)
      switch (r.kind) {
        case "function": {
          if (r.value === "url" || r.value.endsWith("_url")) {
            r.value = Ke(r.value);
            break;
          }
          if (
            r.value === "var" ||
            r.value.endsWith("_var") ||
            r.value === "theme" ||
            r.value.endsWith("_theme")
          ) {
            r.value = Ke(r.value);
            for (let i = 0; i < r.nodes.length; i++) Rt([r.nodes[i]]);
            break;
          }
          (r.value = Ke(r.value)), Rt(r.nodes);
          break;
        }
        case "separator":
          r.value = Ke(r.value);
          break;
        case "word": {
          (r.value[0] !== "-" || r.value[1] !== "-") && (r.value = Ke(r.value));
          break;
        }
        default:
          to(r);
      }
  }
  var eo = new W((t) => {
    let r = q(t);
    return r.length === 1 && r[0].kind === "function" && r[0].value === "var";
  });
  function Pt(t) {
    return eo.get(t);
  }
  function to(t) {
    throw new Error(`Unexpected value: ${t}`);
  }
  function Ke(t) {
    return t.replaceAll("_", String.raw`\_`).replaceAll(" ", "_");
  }
  function ye(t, r, i) {
    if (t === r) return 0;
    let e = t.indexOf("("),
      o = r.indexOf("("),
      s = e === -1 ? t.replace(/[\d.]+/g, "") : t.slice(0, e),
      a = o === -1 ? r.replace(/[\d.]+/g, "") : r.slice(0, o),
      f =
        (s === a ? 0 : s < a ? -1 : 1) ||
        (i === "asc" ? parseInt(t) - parseInt(r) : parseInt(r) - parseInt(t));
    return Number.isNaN(f) ? (t < r ? -1 : 1) : f;
  }
  var ro = new Set([
      "black",
      "silver",
      "gray",
      "white",
      "maroon",
      "red",
      "purple",
      "fuchsia",
      "green",
      "lime",
      "olive",
      "yellow",
      "navy",
      "blue",
      "teal",
      "aqua",
      "aliceblue",
      "antiquewhite",
      "aqua",
      "aquamarine",
      "azure",
      "beige",
      "bisque",
      "black",
      "blanchedalmond",
      "blue",
      "blueviolet",
      "brown",
      "burlywood",
      "cadetblue",
      "chartreuse",
      "chocolate",
      "coral",
      "cornflowerblue",
      "cornsilk",
      "crimson",
      "cyan",
      "darkblue",
      "darkcyan",
      "darkgoldenrod",
      "darkgray",
      "darkgreen",
      "darkgrey",
      "darkkhaki",
      "darkmagenta",
      "darkolivegreen",
      "darkorange",
      "darkorchid",
      "darkred",
      "darksalmon",
      "darkseagreen",
      "darkslateblue",
      "darkslategray",
      "darkslategrey",
      "darkturquoise",
      "darkviolet",
      "deeppink",
      "deepskyblue",
      "dimgray",
      "dimgrey",
      "dodgerblue",
      "firebrick",
      "floralwhite",
      "forestgreen",
      "fuchsia",
      "gainsboro",
      "ghostwhite",
      "gold",
      "goldenrod",
      "gray",
      "green",
      "greenyellow",
      "grey",
      "honeydew",
      "hotpink",
      "indianred",
      "indigo",
      "ivory",
      "khaki",
      "lavender",
      "lavenderblush",
      "lawngreen",
      "lemonchiffon",
      "lightblue",
      "lightcoral",
      "lightcyan",
      "lightgoldenrodyellow",
      "lightgray",
      "lightgreen",
      "lightgrey",
      "lightpink",
      "lightsalmon",
      "lightseagreen",
      "lightskyblue",
      "lightslategray",
      "lightslategrey",
      "lightsteelblue",
      "lightyellow",
      "lime",
      "limegreen",
      "linen",
      "magenta",
      "maroon",
      "mediumaquamarine",
      "mediumblue",
      "mediumorchid",
      "mediumpurple",
      "mediumseagreen",
      "mediumslateblue",
      "mediumspringgreen",
      "mediumturquoise",
      "mediumvioletred",
      "midnightblue",
      "mintcream",
      "mistyrose",
      "moccasin",
      "navajowhite",
      "navy",
      "oldlace",
      "olive",
      "olivedrab",
      "orange",
      "orangered",
      "orchid",
      "palegoldenrod",
      "palegreen",
      "paleturquoise",
      "palevioletred",
      "papayawhip",
      "peachpuff",
      "peru",
      "pink",
      "plum",
      "powderblue",
      "purple",
      "rebeccapurple",
      "red",
      "rosybrown",
      "royalblue",
      "saddlebrown",
      "salmon",
      "sandybrown",
      "seagreen",
      "seashell",
      "sienna",
      "silver",
      "skyblue",
      "slateblue",
      "slategray",
      "slategrey",
      "snow",
      "springgreen",
      "steelblue",
      "tan",
      "teal",
      "thistle",
      "tomato",
      "turquoise",
      "violet",
      "wheat",
      "white",
      "whitesmoke",
      "yellow",
      "yellowgreen",
      "transparent",
      "currentcolor",
      "canvas",
      "canvastext",
      "linktext",
      "visitedtext",
      "activetext",
      "buttonface",
      "buttontext",
      "buttonborder",
      "field",
      "fieldtext",
      "highlight",
      "highlighttext",
      "selecteditem",
      "selecteditemtext",
      "mark",
      "marktext",
      "graytext",
      "accentcolor",
      "accentcolortext",
    ]),
    io = /^(rgba?|hsla?|hwb|color|(ok)?(lab|lch)|light-dark|color-mix)\(/i;
  function Ar(t) {
    return t.charCodeAt(0) === 35 || io.test(t) || ro.has(t.toLowerCase());
  }
  var oo = {
    color: Ar,
    length: ot,
    percentage: Ot,
    ratio: vo,
    number: $r,
    integer: E,
    url: Cr,
    position: yo,
    "bg-size": xo,
    "line-width": lo,
    image: uo,
    "family-name": fo,
    "generic-name": co,
    "absolute-size": po,
    "relative-size": mo,
    angle: $o,
    vector: No,
  };
  function Y(t, r) {
    if (t.startsWith("var(")) return null;
    for (let i of r) if (oo[i]?.(t)) return i;
    return null;
  }
  var no = /^url\(.*\)$/;
  function Cr(t) {
    return no.test(t);
  }
  function lo(t) {
    return z(t, " ").every(
      (r) => ot(r) || $r(r) || r === "thin" || r === "medium" || r === "thick"
    );
  }
  var ao = /^(?:element|image|cross-fade|image-set)\(/,
    so = /^(repeating-)?(conic|linear|radial)-gradient\(/;
  function uo(t) {
    let r = 0;
    for (let i of z(t, ","))
      if (!i.startsWith("var(")) {
        if (Cr(i)) {
          r += 1;
          continue;
        }
        if (so.test(i)) {
          r += 1;
          continue;
        }
        if (ao.test(i)) {
          r += 1;
          continue;
        }
        return !1;
      }
    return r > 0;
  }
  function co(t) {
    return (
      t === "serif" ||
      t === "sans-serif" ||
      t === "monospace" ||
      t === "cursive" ||
      t === "fantasy" ||
      t === "system-ui" ||
      t === "ui-serif" ||
      t === "ui-sans-serif" ||
      t === "ui-monospace" ||
      t === "ui-rounded" ||
      t === "math" ||
      t === "emoji" ||
      t === "fangsong"
    );
  }
  function fo(t) {
    let r = 0;
    for (let i of z(t, ",")) {
      let e = i.charCodeAt(0);
      if (e >= 48 && e <= 57) return !1;
      i.startsWith("var(") || (r += 1);
    }
    return r > 0;
  }
  function po(t) {
    return (
      t === "xx-small" ||
      t === "x-small" ||
      t === "small" ||
      t === "medium" ||
      t === "large" ||
      t === "x-large" ||
      t === "xx-large" ||
      t === "xxx-large"
    );
  }
  function mo(t) {
    return t === "larger" || t === "smaller";
  }
  var de = /[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/,
    go = new RegExp(`^${de.source}$`);
  function $r(t) {
    return go.test(t) || ze(t);
  }
  var ho = new RegExp(`^${de.source}%$`);
  function Ot(t) {
    return ho.test(t) || ze(t);
  }
  var ko = new RegExp(`^${de.source}s*/s*${de.source}$`);
  function vo(t) {
    return ko.test(t) || ze(t);
  }
  var wo = [
      "cm",
      "mm",
      "Q",
      "in",
      "pc",
      "pt",
      "px",
      "em",
      "ex",
      "ch",
      "rem",
      "lh",
      "rlh",
      "vw",
      "vh",
      "vmin",
      "vmax",
      "vb",
      "vi",
      "svw",
      "svh",
      "lvw",
      "lvh",
      "dvw",
      "dvh",
      "cqw",
      "cqh",
      "cqi",
      "cqb",
      "cqmin",
      "cqmax",
    ],
    bo = new RegExp(`^${de.source}(${wo.join("|")})$`);
  function ot(t) {
    return bo.test(t) || ze(t);
  }
  function yo(t) {
    let r = 0;
    for (let i of z(t, " ")) {
      if (
        i === "center" ||
        i === "top" ||
        i === "right" ||
        i === "bottom" ||
        i === "left"
      ) {
        r += 1;
        continue;
      }
      if (!i.startsWith("var(")) {
        if (ot(i) || Ot(i)) {
          r += 1;
          continue;
        }
        return !1;
      }
    }
    return r > 0;
  }
  function xo(t) {
    let r = 0;
    for (let i of z(t, ",")) {
      if (i === "cover" || i === "contain") {
        r += 1;
        continue;
      }
      let e = z(i, " ");
      if (e.length !== 1 && e.length !== 2) return !1;
      if (e.every((o) => o === "auto" || ot(o) || Ot(o))) {
        r += 1;
        continue;
      }
    }
    return r > 0;
  }
  var Ao = ["deg", "rad", "grad", "turn"],
    Co = new RegExp(`^${de.source}(${Ao.join("|")})$`);
  function $o(t) {
    return Co.test(t);
  }
  var So = new RegExp(`^${de.source} +${de.source} +${de.source}$`);
  function No(t) {
    return So.test(t);
  }
  function E(t) {
    let r = Number(t);
    return Number.isInteger(r) && r >= 0 && String(r) === String(t);
  }
  function _t(t) {
    let r = Number(t);
    return Number.isInteger(r) && r > 0 && String(r) === String(t);
  }
  function xe(t) {
    return Sr(t, 0.25);
  }
  function nt(t) {
    return Sr(t, 0.25);
  }
  function Sr(t, r) {
    let i = Number(t);
    return i >= 0 && i % r === 0 && String(i) === String(t);
  }
  var Vo = new Set(["inset", "inherit", "initial", "revert", "unset"]),
    Nr = /^-?(\d+|\.\d+)(.*?)$/g;
  function De(t, r) {
    return z(t, ",")
      .map((e) => {
        e = e.trim();
        let o = z(e, " ").filter((c) => c.trim() !== ""),
          s = null,
          a = null,
          f = null;
        for (let c of o)
          Vo.has(c) ||
            (Nr.test(c)
              ? (a === null ? (a = c) : f === null && (f = c),
                (Nr.lastIndex = 0))
              : s === null && (s = c));
        if (a === null || f === null) return e;
        let u = r(s ?? "currentcolor");
        return s !== null ? e.replace(s, u) : `${e} ${u}`;
      })
      .join(", ");
  }
  var To = /^-?[a-z][a-zA-Z0-9/%._-]*$/,
    Eo = /^-?[a-z][a-zA-Z0-9/%._-]*-\*$/,
    at = [
      "0",
      "0.5",
      "1",
      "1.5",
      "2",
      "2.5",
      "3",
      "3.5",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "14",
      "16",
      "20",
      "24",
      "28",
      "32",
      "36",
      "40",
      "44",
      "48",
      "52",
      "56",
      "60",
      "64",
      "72",
      "80",
      "96",
    ],
    zt = class {
      utilities = new W(() => []);
      completions = new Map();
      static(r, i) {
        this.utilities.get(r).push({ kind: "static", compileFn: i });
      }
      functional(r, i, e) {
        this.utilities
          .get(r)
          .push({ kind: "functional", compileFn: i, options: e });
      }
      has(r, i) {
        return (
          this.utilities.has(r) &&
          this.utilities.get(r).some((e) => e.kind === i)
        );
      }
      get(r) {
        return this.utilities.has(r) ? this.utilities.get(r) : [];
      }
      getCompletions(r) {
        return this.completions.get(r)?.() ?? [];
      }
      suggest(r, i) {
        this.completions.set(r, i);
      }
      keys(r) {
        let i = [];
        for (let [e, o] of this.utilities.entries())
          for (let s of o)
            if (s.kind === r) {
              i.push(e);
              break;
            }
        return i;
      }
    };
  function $(t, r, i) {
    return F("@property", t, [
      l("syntax", i ? `"${i}"` : '"*"'),
      l("inherits", "false"),
      ...(r ? [l("initial-value", r)] : []),
    ]);
  }
  function Z(t, r) {
    if (r === null) return t;
    let i = Number(r);
    return (
      Number.isNaN(i) || (r = `${i * 100}%`),
      r === "100%" ? t : `color-mix(in oklab, ${t} ${r}, transparent)`
    );
  }
  function Tr(t, r) {
    let i = Number(r);
    return (
      Number.isNaN(i) || (r = `${i * 100}%`), `oklab(from ${t} l a b / ${r})`
    );
  }
  function X(t, r, i) {
    if (!r) return t;
    if (r.kind === "arbitrary") return Z(t, r.value);
    let e = i.resolve(r.value, ["--opacity"]);
    return e ? Z(t, e) : nt(r.value) ? Z(t, `${r.value}%`) : null;
  }
  function te(t, r, i) {
    let e = null;
    switch (t.value.value) {
      case "inherit": {
        e = "inherit";
        break;
      }
      case "transparent": {
        e = "transparent";
        break;
      }
      case "current": {
        e = "currentcolor";
        break;
      }
      default: {
        e = r.resolve(t.value.value, i);
        break;
      }
    }
    return e ? X(e, t.modifier, r) : null;
  }
  var Er = /(\d+)_(\d+)/g;
  function Rr(t) {
    let r = new zt();
    function i(n, d) {
      function* h(w) {
        for (let C of t.keysInNamespaces(w))
          yield C.replace(Er, (O, S, T) => `${S}.${T}`);
      }
      let A = [
        "1/2",
        "1/3",
        "2/3",
        "1/4",
        "2/4",
        "3/4",
        "1/5",
        "2/5",
        "3/5",
        "4/5",
        "1/6",
        "2/6",
        "3/6",
        "4/6",
        "5/6",
        "1/12",
        "2/12",
        "3/12",
        "4/12",
        "5/12",
        "6/12",
        "7/12",
        "8/12",
        "9/12",
        "10/12",
        "11/12",
      ];
      r.suggest(n, () => {
        let w = [];
        for (let C of d()) {
          if (typeof C == "string") {
            w.push({ values: [C], modifiers: [] });
            continue;
          }
          let O = [...(C.values ?? []), ...h(C.valueThemeKeys ?? [])],
            S = [...(C.modifiers ?? []), ...h(C.modifierThemeKeys ?? [])];
          C.supportsFractions && O.push(...A),
            C.hasDefaultValue && O.unshift(null),
            w.push({
              supportsNegative: C.supportsNegative,
              values: O,
              modifiers: S,
            });
        }
        return w;
      });
    }
    function e(n, d) {
      r.static(n, () =>
        d.map((h) => (typeof h == "function" ? h() : l(h[0], h[1])))
      );
    }
    function o(n, d) {
      function h({ negative: A }) {
        return (w) => {
          let C = null,
            O = null;
          if (w.value)
            if (w.value.kind === "arbitrary") {
              if (w.modifier) return;
              (C = w.value.value), (O = w.value.dataType);
            } else {
              if (
                ((C = t.resolve(
                  w.value.fraction ?? w.value.value,
                  d.themeKeys ?? []
                )),
                C === null && d.supportsFractions && w.value.fraction)
              ) {
                let [S, T] = z(w.value.fraction, "/");
                if (!E(S) || !E(T)) return;
                C = `calc(${w.value.fraction} * 100%)`;
              }
              if (C === null && A && d.handleNegativeBareValue) {
                if (
                  ((C = d.handleNegativeBareValue(w.value)),
                  !C?.includes("/") && w.modifier)
                )
                  return;
                if (C !== null) return d.handle(C, null);
              }
              if (
                C === null &&
                d.handleBareValue &&
                ((C = d.handleBareValue(w.value)),
                !C?.includes("/") && w.modifier)
              )
                return;
            }
          else {
            if (w.modifier) return;
            C =
              d.defaultValue !== void 0
                ? d.defaultValue
                : t.resolve(null, d.themeKeys ?? []);
          }
          if (C !== null) return d.handle(A ? `calc(${C} * -1)` : C, O);
        };
      }
      d.supportsNegative && r.functional(`-${n}`, h({ negative: !0 })),
        r.functional(n, h({ negative: !1 })),
        i(n, () => [
          {
            supportsNegative: d.supportsNegative,
            valueThemeKeys: d.themeKeys ?? [],
            hasDefaultValue:
              d.defaultValue !== void 0 && d.defaultValue !== null,
            supportsFractions: d.supportsFractions,
          },
        ]);
    }
    function s(n, d) {
      r.functional(n, (h) => {
        if (!h.value) return;
        let A = null;
        if (
          (h.value.kind === "arbitrary"
            ? ((A = h.value.value), (A = X(A, h.modifier, t)))
            : (A = te(h, t, d.themeKeys)),
          A !== null)
        )
          return d.handle(A);
      }),
        i(n, () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: d.themeKeys,
            modifiers: Array.from({ length: 21 }, (h, A) => `${A * 5}`),
          },
        ]);
    }
    function a(
      n,
      d,
      h,
      { supportsNegative: A = !1, supportsFractions: w = !1 } = {}
    ) {
      A && r.static(`-${n}-px`, () => h("-1px")),
        r.static(`${n}-px`, () => h("1px")),
        o(n, {
          themeKeys: d,
          supportsFractions: w,
          supportsNegative: A,
          defaultValue: null,
          handleBareValue: ({ value: C }) => {
            let O = t.resolve(null, ["--spacing"]);
            return !O || !xe(C) ? null : `calc(${O} * ${C})`;
          },
          handleNegativeBareValue: ({ value: C }) => {
            let O = t.resolve(null, ["--spacing"]);
            return !O || !xe(C) ? null : `calc(${O} * -${C})`;
          },
          handle: h,
        }),
        i(n, () => [
          {
            values: t.get(["--spacing"]) ? at : [],
            supportsNegative: A,
            supportsFractions: w,
            valueThemeKeys: d,
          },
        ]);
    }
    e("sr-only", [
      ["position", "absolute"],
      ["width", "1px"],
      ["height", "1px"],
      ["padding", "0"],
      ["margin", "-1px"],
      ["overflow", "hidden"],
      ["clip", "rect(0, 0, 0, 0)"],
      ["white-space", "nowrap"],
      ["border-width", "0"],
    ]),
      e("not-sr-only", [
        ["position", "static"],
        ["width", "auto"],
        ["height", "auto"],
        ["padding", "0"],
        ["margin", "0"],
        ["overflow", "visible"],
        ["clip", "auto"],
        ["white-space", "normal"],
      ]),
      e("pointer-events-none", [["pointer-events", "none"]]),
      e("pointer-events-auto", [["pointer-events", "auto"]]),
      e("visible", [["visibility", "visible"]]),
      e("invisible", [["visibility", "hidden"]]),
      e("collapse", [["visibility", "collapse"]]),
      e("static", [["position", "static"]]),
      e("fixed", [["position", "fixed"]]),
      e("absolute", [["position", "absolute"]]),
      e("relative", [["position", "relative"]]),
      e("sticky", [["position", "sticky"]]);
    for (let [n, d] of [
      ["inset", "inset"],
      ["inset-x", "inset-inline"],
      ["inset-y", "inset-block"],
      ["start", "inset-inline-start"],
      ["end", "inset-inline-end"],
      ["top", "top"],
      ["right", "right"],
      ["bottom", "bottom"],
      ["left", "left"],
    ])
      e(`${n}-auto`, [[d, "auto"]]),
        e(`${n}-full`, [[d, "100%"]]),
        e(`-${n}-full`, [[d, "-100%"]]),
        a(n, ["--inset", "--spacing"], (h) => [l(d, h)], {
          supportsNegative: !0,
          supportsFractions: !0,
        });
    e("isolate", [["isolation", "isolate"]]),
      e("isolation-auto", [["isolation", "auto"]]),
      e("z-auto", [["z-index", "auto"]]),
      o("z", {
        supportsNegative: !0,
        handleBareValue: ({ value: n }) => (E(n) ? n : null),
        themeKeys: ["--z-index"],
        handle: (n) => [l("z-index", n)],
      }),
      i("z", () => [
        {
          supportsNegative: !0,
          values: ["0", "10", "20", "30", "40", "50"],
          valueThemeKeys: ["--z-index"],
        },
      ]),
      e("order-first", [["order", "-9999"]]),
      e("order-last", [["order", "9999"]]),
      o("order", {
        supportsNegative: !0,
        handleBareValue: ({ value: n }) => (E(n) ? n : null),
        themeKeys: ["--order"],
        handle: (n) => [l("order", n)],
      }),
      i("order", () => [
        {
          supportsNegative: !0,
          values: Array.from({ length: 12 }, (n, d) => `${d + 1}`),
          valueThemeKeys: ["--order"],
        },
      ]),
      e("col-auto", [["grid-column", "auto"]]),
      o("col", {
        supportsNegative: !0,
        handleBareValue: ({ value: n }) => (E(n) ? n : null),
        themeKeys: ["--grid-column"],
        handle: (n) => [l("grid-column", n)],
      }),
      e("col-span-full", [["grid-column", "1 / -1"]]),
      o("col-span", {
        handleBareValue: ({ value: n }) => (E(n) ? n : null),
        handle: (n) => [l("grid-column", `span ${n} / span ${n}`)],
      }),
      e("col-start-auto", [["grid-column-start", "auto"]]),
      o("col-start", {
        supportsNegative: !0,
        handleBareValue: ({ value: n }) => (E(n) ? n : null),
        themeKeys: ["--grid-column-start"],
        handle: (n) => [l("grid-column-start", n)],
      }),
      e("col-end-auto", [["grid-column-end", "auto"]]),
      o("col-end", {
        supportsNegative: !0,
        handleBareValue: ({ value: n }) => (E(n) ? n : null),
        themeKeys: ["--grid-column-end"],
        handle: (n) => [l("grid-column-end", n)],
      }),
      i("col-span", () => [
        {
          values: Array.from({ length: 12 }, (n, d) => `${d + 1}`),
          valueThemeKeys: [],
        },
      ]),
      i("col-start", () => [
        {
          supportsNegative: !0,
          values: Array.from({ length: 13 }, (n, d) => `${d + 1}`),
          valueThemeKeys: ["--grid-column-start"],
        },
      ]),
      i("col-end", () => [
        {
          supportsNegative: !0,
          values: Array.from({ length: 13 }, (n, d) => `${d + 1}`),
          valueThemeKeys: ["--grid-column-end"],
        },
      ]),
      e("row-auto", [["grid-row", "auto"]]),
      o("row", {
        supportsNegative: !0,
        handleBareValue: ({ value: n }) => (E(n) ? n : null),
        themeKeys: ["--grid-row"],
        handle: (n) => [l("grid-row", n)],
      }),
      e("row-span-full", [["grid-row", "1 / -1"]]),
      o("row-span", {
        themeKeys: [],
        handleBareValue: ({ value: n }) => (E(n) ? n : null),
        handle: (n) => [l("grid-row", `span ${n} / span ${n}`)],
      }),
      e("row-start-auto", [["grid-row-start", "auto"]]),
      o("row-start", {
        supportsNegative: !0,
        handleBareValue: ({ value: n }) => (E(n) ? n : null),
        themeKeys: ["--grid-row-start"],
        handle: (n) => [l("grid-row-start", n)],
      }),
      e("row-end-auto", [["grid-row-end", "auto"]]),
      o("row-end", {
        supportsNegative: !0,
        handleBareValue: ({ value: n }) => (E(n) ? n : null),
        themeKeys: ["--grid-row-end"],
        handle: (n) => [l("grid-row-end", n)],
      }),
      i("row-span", () => [
        {
          values: Array.from({ length: 12 }, (n, d) => `${d + 1}`),
          valueThemeKeys: [],
        },
      ]),
      i("row-start", () => [
        {
          supportsNegative: !0,
          values: Array.from({ length: 13 }, (n, d) => `${d + 1}`),
          valueThemeKeys: ["--grid-row-start"],
        },
      ]),
      i("row-end", () => [
        {
          supportsNegative: !0,
          values: Array.from({ length: 13 }, (n, d) => `${d + 1}`),
          valueThemeKeys: ["--grid-row-end"],
        },
      ]),
      e("float-start", [["float", "inline-start"]]),
      e("float-end", [["float", "inline-end"]]),
      e("float-right", [["float", "right"]]),
      e("float-left", [["float", "left"]]),
      e("float-none", [["float", "none"]]),
      e("clear-start", [["clear", "inline-start"]]),
      e("clear-end", [["clear", "inline-end"]]),
      e("clear-right", [["clear", "right"]]),
      e("clear-left", [["clear", "left"]]),
      e("clear-both", [["clear", "both"]]),
      e("clear-none", [["clear", "none"]]);
    for (let [n, d] of [
      ["m", "margin"],
      ["mx", "margin-inline"],
      ["my", "margin-block"],
      ["ms", "margin-inline-start"],
      ["me", "margin-inline-end"],
      ["mt", "margin-top"],
      ["mr", "margin-right"],
      ["mb", "margin-bottom"],
      ["ml", "margin-left"],
    ])
      e(`${n}-auto`, [[d, "auto"]]),
        a(n, ["--margin", "--spacing"], (h) => [l(d, h)], {
          supportsNegative: !0,
        });
    e("box-border", [["box-sizing", "border-box"]]),
      e("box-content", [["box-sizing", "content-box"]]),
      e("line-clamp-none", [
        ["overflow", "visible"],
        ["display", "block"],
        ["-webkit-box-orient", "horizontal"],
        ["-webkit-line-clamp", "unset"],
      ]),
      o("line-clamp", {
        themeKeys: ["--line-clamp"],
        handleBareValue: ({ value: n }) => (E(n) ? n : null),
        handle: (n) => [
          l("overflow", "hidden"),
          l("display", "-webkit-box"),
          l("-webkit-box-orient", "vertical"),
          l("-webkit-line-clamp", n),
        ],
      }),
      i("line-clamp", () => [
        {
          values: ["1", "2", "3", "4", "5", "6"],
          valueThemeKeys: ["--line-clamp"],
        },
      ]),
      e("block", [["display", "block"]]),
      e("inline-block", [["display", "inline-block"]]),
      e("inline", [["display", "inline"]]),
      e("hidden", [["display", "none"]]),
      e("inline-flex", [["display", "inline-flex"]]),
      e("table", [["display", "table"]]),
      e("inline-table", [["display", "inline-table"]]),
      e("table-caption", [["display", "table-caption"]]),
      e("table-cell", [["display", "table-cell"]]),
      e("table-column", [["display", "table-column"]]),
      e("table-column-group", [["display", "table-column-group"]]),
      e("table-footer-group", [["display", "table-footer-group"]]),
      e("table-header-group", [["display", "table-header-group"]]),
      e("table-row-group", [["display", "table-row-group"]]),
      e("table-row", [["display", "table-row"]]),
      e("flow-root", [["display", "flow-root"]]),
      e("flex", [["display", "flex"]]),
      e("grid", [["display", "grid"]]),
      e("inline-grid", [["display", "inline-grid"]]),
      e("contents", [["display", "contents"]]),
      e("list-item", [["display", "list-item"]]),
      e("field-sizing-content", [["field-sizing", "content"]]),
      e("field-sizing-fixed", [["field-sizing", "fixed"]]),
      e("aspect-auto", [["aspect-ratio", "auto"]]),
      e("aspect-square", [["aspect-ratio", "1 / 1"]]),
      o("aspect", {
        themeKeys: ["--aspect"],
        handleBareValue: ({ fraction: n }) => {
          if (n === null) return null;
          let [d, h] = z(n, "/");
          return !E(d) || !E(h) ? null : n;
        },
        handle: (n) => [l("aspect-ratio", n)],
      });
    for (let [n, d] of [
      ["full", "100%"],
      ["svw", "100svw"],
      ["lvw", "100lvw"],
      ["dvw", "100dvw"],
      ["svh", "100svh"],
      ["lvh", "100lvh"],
      ["dvh", "100dvh"],
      ["min", "min-content"],
      ["max", "max-content"],
      ["fit", "fit-content"],
    ])
      e(`size-${n}`, [
        ["--tw-sort", "size"],
        ["width", d],
        ["height", d],
      ]),
        e(`w-${n}`, [["width", d]]),
        e(`h-${n}`, [["height", d]]),
        e(`min-w-${n}`, [["min-width", d]]),
        e(`min-h-${n}`, [["min-height", d]]),
        e(`max-w-${n}`, [["max-width", d]]),
        e(`max-h-${n}`, [["max-height", d]]);
    e("size-auto", [
      ["--tw-sort", "size"],
      ["width", "auto"],
      ["height", "auto"],
    ]),
      e("w-auto", [["width", "auto"]]),
      e("h-auto", [["height", "auto"]]),
      e("min-w-auto", [["min-width", "auto"]]),
      e("min-h-auto", [["min-height", "auto"]]),
      e("h-lh", [["height", "1lh"]]),
      e("min-h-lh", [["min-height", "1lh"]]),
      e("max-h-lh", [["max-height", "1lh"]]),
      e("w-screen", [["width", "100vw"]]),
      e("min-w-screen", [["min-width", "100vw"]]),
      e("max-w-screen", [["max-width", "100vw"]]),
      e("h-screen", [["height", "100vh"]]),
      e("min-h-screen", [["min-height", "100vh"]]),
      e("max-h-screen", [["max-height", "100vh"]]),
      e("max-w-none", [["max-width", "none"]]),
      e("max-h-none", [["max-height", "none"]]),
      a(
        "size",
        ["--size", "--spacing"],
        (n) => [l("--tw-sort", "size"), l("width", n), l("height", n)],
        { supportsFractions: !0 }
      );
    for (let [n, d, h] of [
      ["w", ["--width", "--spacing", "--container"], "width"],
      ["min-w", ["--min-width", "--spacing", "--container"], "min-width"],
      ["max-w", ["--max-width", "--spacing", "--container"], "max-width"],
      ["h", ["--height", "--spacing"], "height"],
      ["min-h", ["--min-height", "--height", "--spacing"], "min-height"],
      ["max-h", ["--max-height", "--height", "--spacing"], "max-height"],
    ])
      a(n, d, (A) => [l(h, A)], { supportsFractions: !0 });
    r.static("container", () => {
      let n = [...t.namespace("--breakpoint").values()];
      n.sort((h, A) => ye(h, A, "asc"));
      let d = [l("--tw-sort", "--tw-container-component"), l("width", "100%")];
      for (let h of n)
        d.push(F("@media", `(width >= ${h})`, [l("max-width", h)]));
      return d;
    }),
      e("flex-auto", [["flex", "auto"]]),
      e("flex-initial", [["flex", "0 auto"]]),
      e("flex-none", [["flex", "none"]]),
      r.functional("flex", (n) => {
        if (n.value) {
          if (n.value.kind === "arbitrary")
            return n.modifier ? void 0 : [l("flex", n.value.value)];
          if (n.value.fraction) {
            let [d, h] = z(n.value.fraction, "/");
            return !E(d) || !E(h)
              ? void 0
              : [l("flex", `calc(${n.value.fraction} * 100%)`)];
          }
          if (E(n.value.value))
            return n.modifier ? void 0 : [l("flex", n.value.value)];
        }
      }),
      i("flex", () => [{ supportsFractions: !0 }]),
      o("shrink", {
        defaultValue: "1",
        handleBareValue: ({ value: n }) => (E(n) ? n : null),
        handle: (n) => [l("flex-shrink", n)],
      }),
      o("grow", {
        defaultValue: "1",
        handleBareValue: ({ value: n }) => (E(n) ? n : null),
        handle: (n) => [l("flex-grow", n)],
      }),
      i("shrink", () => [
        { values: ["0"], valueThemeKeys: [], hasDefaultValue: !0 },
      ]),
      i("grow", () => [
        { values: ["0"], valueThemeKeys: [], hasDefaultValue: !0 },
      ]),
      e("basis-auto", [["flex-basis", "auto"]]),
      e("basis-full", [["flex-basis", "100%"]]),
      a(
        "basis",
        ["--flex-basis", "--spacing", "--container"],
        (n) => [l("flex-basis", n)],
        { supportsFractions: !0 }
      ),
      e("table-auto", [["table-layout", "auto"]]),
      e("table-fixed", [["table-layout", "fixed"]]),
      e("caption-top", [["caption-side", "top"]]),
      e("caption-bottom", [["caption-side", "bottom"]]),
      e("border-collapse", [["border-collapse", "collapse"]]),
      e("border-separate", [["border-collapse", "separate"]]);
    let f = () =>
      I([
        $("--tw-border-spacing-x", "0", "<length>"),
        $("--tw-border-spacing-y", "0", "<length>"),
      ]);
    a("border-spacing", ["--border-spacing", "--spacing"], (n) => [
      f(),
      l("--tw-border-spacing-x", n),
      l("--tw-border-spacing-y", n),
      l(
        "border-spacing",
        "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
      ),
    ]),
      a("border-spacing-x", ["--border-spacing", "--spacing"], (n) => [
        f(),
        l("--tw-border-spacing-x", n),
        l(
          "border-spacing",
          "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
        ),
      ]),
      a("border-spacing-y", ["--border-spacing", "--spacing"], (n) => [
        f(),
        l("--tw-border-spacing-y", n),
        l(
          "border-spacing",
          "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
        ),
      ]),
      e("origin-center", [["transform-origin", "center"]]),
      e("origin-top", [["transform-origin", "top"]]),
      e("origin-top-right", [["transform-origin", "top right"]]),
      e("origin-right", [["transform-origin", "right"]]),
      e("origin-bottom-right", [["transform-origin", "bottom right"]]),
      e("origin-bottom", [["transform-origin", "bottom"]]),
      e("origin-bottom-left", [["transform-origin", "bottom left"]]),
      e("origin-left", [["transform-origin", "left"]]),
      e("origin-top-left", [["transform-origin", "top left"]]),
      o("origin", {
        themeKeys: ["--transform-origin"],
        handle: (n) => [l("transform-origin", n)],
      }),
      e("perspective-origin-center", [["perspective-origin", "center"]]),
      e("perspective-origin-top", [["perspective-origin", "top"]]),
      e("perspective-origin-top-right", [["perspective-origin", "top right"]]),
      e("perspective-origin-right", [["perspective-origin", "right"]]),
      e("perspective-origin-bottom-right", [
        ["perspective-origin", "bottom right"],
      ]),
      e("perspective-origin-bottom", [["perspective-origin", "bottom"]]),
      e("perspective-origin-bottom-left", [
        ["perspective-origin", "bottom left"],
      ]),
      e("perspective-origin-left", [["perspective-origin", "left"]]),
      e("perspective-origin-top-left", [["perspective-origin", "top left"]]),
      o("perspective-origin", {
        themeKeys: ["--perspective-origin"],
        handle: (n) => [l("perspective-origin", n)],
      }),
      e("perspective-none", [["perspective", "none"]]),
      o("perspective", {
        themeKeys: ["--perspective"],
        handle: (n) => [l("perspective", n)],
      });
    let u = () =>
      I([
        $("--tw-translate-x", "0"),
        $("--tw-translate-y", "0"),
        $("--tw-translate-z", "0"),
      ]);
    e("translate-none", [["translate", "none"]]),
      e("-translate-full", [
        u,
        ["--tw-translate-x", "-100%"],
        ["--tw-translate-y", "-100%"],
        ["translate", "var(--tw-translate-x) var(--tw-translate-y)"],
      ]),
      e("translate-full", [
        u,
        ["--tw-translate-x", "100%"],
        ["--tw-translate-y", "100%"],
        ["translate", "var(--tw-translate-x) var(--tw-translate-y)"],
      ]),
      a(
        "translate",
        ["--translate", "--spacing"],
        (n) => [
          u(),
          l("--tw-translate-x", n),
          l("--tw-translate-y", n),
          l("translate", "var(--tw-translate-x) var(--tw-translate-y)"),
        ],
        { supportsNegative: !0, supportsFractions: !0 }
      );
    for (let n of ["x", "y"])
      e(`-translate-${n}-full`, [
        u,
        [`--tw-translate-${n}`, "-100%"],
        ["translate", "var(--tw-translate-x) var(--tw-translate-y)"],
      ]),
        e(`translate-${n}-full`, [
          u,
          [`--tw-translate-${n}`, "100%"],
          ["translate", "var(--tw-translate-x) var(--tw-translate-y)"],
        ]),
        a(
          `translate-${n}`,
          ["--translate", "--spacing"],
          (d) => [
            u(),
            l(`--tw-translate-${n}`, d),
            l("translate", "var(--tw-translate-x) var(--tw-translate-y)"),
          ],
          { supportsNegative: !0, supportsFractions: !0 }
        );
    a(
      "translate-z",
      ["--translate", "--spacing"],
      (n) => [
        u(),
        l("--tw-translate-z", n),
        l(
          "translate",
          "var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)"
        ),
      ],
      { supportsNegative: !0 }
    ),
      e("translate-3d", [
        u,
        [
          "translate",
          "var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)",
        ],
      ]);
    let c = () =>
      I([
        $("--tw-scale-x", "1"),
        $("--tw-scale-y", "1"),
        $("--tw-scale-z", "1"),
      ]);
    e("scale-none", [["scale", "none"]]);
    function g({ negative: n }) {
      return (d) => {
        if (!d.value || d.modifier) return;
        let h;
        return d.value.kind === "arbitrary"
          ? ((h = d.value.value),
            (h = n ? `calc(${h} * -1)` : h),
            [l("scale", h)])
          : ((h = t.resolve(d.value.value, ["--scale"])),
            !h && E(d.value.value) && (h = `${d.value.value}%`),
            h
              ? ((h = n ? `calc(${h} * -1)` : h),
                [
                  c(),
                  l("--tw-scale-x", h),
                  l("--tw-scale-y", h),
                  l("--tw-scale-z", h),
                  l("scale", "var(--tw-scale-x) var(--tw-scale-y)"),
                ])
              : void 0);
      };
    }
    r.functional("-scale", g({ negative: !0 })),
      r.functional("scale", g({ negative: !1 })),
      i("scale", () => [
        {
          supportsNegative: !0,
          values: [
            "0",
            "50",
            "75",
            "90",
            "95",
            "100",
            "105",
            "110",
            "125",
            "150",
            "200",
          ],
          valueThemeKeys: ["--scale"],
        },
      ]);
    for (let n of ["x", "y", "z"])
      o(`scale-${n}`, {
        supportsNegative: !0,
        themeKeys: ["--scale"],
        handleBareValue: ({ value: d }) => (E(d) ? `${d}%` : null),
        handle: (d) => [
          c(),
          l(`--tw-scale-${n}`, d),
          l(
            "scale",
            `var(--tw-scale-x) var(--tw-scale-y)${
              n === "z" ? " var(--tw-scale-z)" : ""
            }`
          ),
        ],
      }),
        i(`scale-${n}`, () => [
          {
            supportsNegative: !0,
            values: [
              "0",
              "50",
              "75",
              "90",
              "95",
              "100",
              "105",
              "110",
              "125",
              "150",
              "200",
            ],
            valueThemeKeys: ["--scale"],
          },
        ]);
    e("scale-3d", [
      c,
      ["scale", "var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z)"],
    ]),
      e("rotate-none", [["rotate", "none"]]);
    function p({ negative: n }) {
      return (d) => {
        if (!d.value || d.modifier) return;
        let h;
        if (d.value.kind === "arbitrary") {
          h = d.value.value;
          let A = d.value.dataType ?? Y(h, ["angle", "vector"]);
          if (A === "vector") return [l("rotate", `${h} var(--tw-rotate)`)];
          if (A !== "angle") return [l("rotate", n ? `calc(${h} * -1)` : h)];
        } else if (
          ((h = t.resolve(d.value.value, ["--rotate"])),
          !h && E(d.value.value) && (h = `${d.value.value}deg`),
          !h)
        )
          return;
        return [l("rotate", n ? `calc(${h} * -1)` : h)];
      };
    }
    r.functional("-rotate", p({ negative: !0 })),
      r.functional("rotate", p({ negative: !1 })),
      i("rotate", () => [
        {
          supportsNegative: !0,
          values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"],
          valueThemeKeys: ["--rotate"],
        },
      ]);
    {
      let n = [
          "var(--tw-rotate-x,)",
          "var(--tw-rotate-y,)",
          "var(--tw-rotate-z,)",
          "var(--tw-skew-x,)",
          "var(--tw-skew-y,)",
        ].join(" "),
        d = () =>
          I([
            $("--tw-rotate-x"),
            $("--tw-rotate-y"),
            $("--tw-rotate-z"),
            $("--tw-skew-x"),
            $("--tw-skew-y"),
          ]);
      for (let h of ["x", "y", "z"])
        o(`rotate-${h}`, {
          supportsNegative: !0,
          themeKeys: ["--rotate"],
          handleBareValue: ({ value: A }) => (E(A) ? `${A}deg` : null),
          handle: (A) => [
            d(),
            l(`--tw-rotate-${h}`, `rotate${h.toUpperCase()}(${A})`),
            l("transform", n),
          ],
        }),
          i(`rotate-${h}`, () => [
            {
              supportsNegative: !0,
              values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"],
              valueThemeKeys: ["--rotate"],
            },
          ]);
      o("skew", {
        supportsNegative: !0,
        themeKeys: ["--skew"],
        handleBareValue: ({ value: h }) => (E(h) ? `${h}deg` : null),
        handle: (h) => [
          d(),
          l("--tw-skew-x", `skewX(${h})`),
          l("--tw-skew-y", `skewY(${h})`),
          l("transform", n),
        ],
      }),
        o("skew-x", {
          supportsNegative: !0,
          themeKeys: ["--skew"],
          handleBareValue: ({ value: h }) => (E(h) ? `${h}deg` : null),
          handle: (h) => [
            d(),
            l("--tw-skew-x", `skewX(${h})`),
            l("transform", n),
          ],
        }),
        o("skew-y", {
          supportsNegative: !0,
          themeKeys: ["--skew"],
          handleBareValue: ({ value: h }) => (E(h) ? `${h}deg` : null),
          handle: (h) => [
            d(),
            l("--tw-skew-y", `skewY(${h})`),
            l("transform", n),
          ],
        }),
        i("skew", () => [
          {
            supportsNegative: !0,
            values: ["0", "1", "2", "3", "6", "12"],
            valueThemeKeys: ["--skew"],
          },
        ]),
        i("skew-x", () => [
          {
            supportsNegative: !0,
            values: ["0", "1", "2", "3", "6", "12"],
            valueThemeKeys: ["--skew"],
          },
        ]),
        i("skew-y", () => [
          {
            supportsNegative: !0,
            values: ["0", "1", "2", "3", "6", "12"],
            valueThemeKeys: ["--skew"],
          },
        ]),
        r.functional("transform", (h) => {
          if (h.modifier) return;
          let A = null;
          if (
            (h.value
              ? h.value.kind === "arbitrary" && (A = h.value.value)
              : (A = n),
            A !== null)
          )
            return [d(), l("transform", A)];
        }),
        i("transform", () => [{ hasDefaultValue: !0 }]),
        e("transform-cpu", [["transform", n]]),
        e("transform-gpu", [["transform", `translateZ(0) ${n}`]]),
        e("transform-none", [["transform", "none"]]);
    }
    e("transform-flat", [["transform-style", "flat"]]),
      e("transform-3d", [["transform-style", "preserve-3d"]]),
      e("transform-content", [["transform-box", "content-box"]]),
      e("transform-border", [["transform-box", "border-box"]]),
      e("transform-fill", [["transform-box", "fill-box"]]),
      e("transform-stroke", [["transform-box", "stroke-box"]]),
      e("transform-view", [["transform-box", "view-box"]]),
      e("backface-visible", [["backface-visibility", "visible"]]),
      e("backface-hidden", [["backface-visibility", "hidden"]]);
    for (let n of [
      "auto",
      "default",
      "pointer",
      "wait",
      "text",
      "move",
      "help",
      "not-allowed",
      "none",
      "context-menu",
      "progress",
      "cell",
      "crosshair",
      "vertical-text",
      "alias",
      "copy",
      "no-drop",
      "grab",
      "grabbing",
      "all-scroll",
      "col-resize",
      "row-resize",
      "n-resize",
      "e-resize",
      "s-resize",
      "w-resize",
      "ne-resize",
      "nw-resize",
      "se-resize",
      "sw-resize",
      "ew-resize",
      "ns-resize",
      "nesw-resize",
      "nwse-resize",
      "zoom-in",
      "zoom-out",
    ])
      e(`cursor-${n}`, [["cursor", n]]);
    o("cursor", { themeKeys: ["--cursor"], handle: (n) => [l("cursor", n)] });
    for (let n of ["auto", "none", "manipulation"])
      e(`touch-${n}`, [["touch-action", n]]);
    let m = () => I([$("--tw-pan-x"), $("--tw-pan-y"), $("--tw-pinch-zoom")]);
    for (let n of ["x", "left", "right"])
      e(`touch-pan-${n}`, [
        m,
        ["--tw-pan-x", `pan-${n}`],
        [
          "touch-action",
          "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)",
        ],
      ]);
    for (let n of ["y", "up", "down"])
      e(`touch-pan-${n}`, [
        m,
        ["--tw-pan-y", `pan-${n}`],
        [
          "touch-action",
          "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)",
        ],
      ]);
    e("touch-pinch-zoom", [
      m,
      ["--tw-pinch-zoom", "pinch-zoom"],
      [
        "touch-action",
        "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)",
      ],
    ]);
    for (let n of ["none", "text", "all", "auto"])
      e(`select-${n}`, [
        ["-webkit-user-select", n],
        ["user-select", n],
      ]);
    e("resize-none", [["resize", "none"]]),
      e("resize-x", [["resize", "horizontal"]]),
      e("resize-y", [["resize", "vertical"]]),
      e("resize", [["resize", "both"]]),
      e("snap-none", [["scroll-snap-type", "none"]]);
    let v = () => I([$("--tw-scroll-snap-strictness", "proximity", "*")]);
    for (let n of ["x", "y", "both"])
      e(`snap-${n}`, [
        v,
        ["scroll-snap-type", `${n} var(--tw-scroll-snap-strictness)`],
      ]);
    e("snap-mandatory", [v, ["--tw-scroll-snap-strictness", "mandatory"]]),
      e("snap-proximity", [v, ["--tw-scroll-snap-strictness", "proximity"]]),
      e("snap-align-none", [["scroll-snap-align", "none"]]),
      e("snap-start", [["scroll-snap-align", "start"]]),
      e("snap-end", [["scroll-snap-align", "end"]]),
      e("snap-center", [["scroll-snap-align", "center"]]),
      e("snap-normal", [["scroll-snap-stop", "normal"]]),
      e("snap-always", [["scroll-snap-stop", "always"]]);
    for (let [n, d] of [
      ["scroll-m", "scroll-margin"],
      ["scroll-mx", "scroll-margin-inline"],
      ["scroll-my", "scroll-margin-block"],
      ["scroll-ms", "scroll-margin-inline-start"],
      ["scroll-me", "scroll-margin-inline-end"],
      ["scroll-mt", "scroll-margin-top"],
      ["scroll-mr", "scroll-margin-right"],
      ["scroll-mb", "scroll-margin-bottom"],
      ["scroll-ml", "scroll-margin-left"],
    ])
      a(n, ["--scroll-margin", "--spacing"], (h) => [l(d, h)], {
        supportsNegative: !0,
      });
    for (let [n, d] of [
      ["scroll-p", "scroll-padding"],
      ["scroll-px", "scroll-padding-inline"],
      ["scroll-py", "scroll-padding-block"],
      ["scroll-ps", "scroll-padding-inline-start"],
      ["scroll-pe", "scroll-padding-inline-end"],
      ["scroll-pt", "scroll-padding-top"],
      ["scroll-pr", "scroll-padding-right"],
      ["scroll-pb", "scroll-padding-bottom"],
      ["scroll-pl", "scroll-padding-left"],
    ])
      a(n, ["--scroll-padding", "--spacing"], (h) => [l(d, h)]);
    e("list-inside", [["list-style-position", "inside"]]),
      e("list-outside", [["list-style-position", "outside"]]),
      e("list-none", [["list-style-type", "none"]]),
      e("list-disc", [["list-style-type", "disc"]]),
      e("list-decimal", [["list-style-type", "decimal"]]),
      o("list", {
        themeKeys: ["--list-style-type"],
        handle: (n) => [l("list-style-type", n)],
      }),
      e("list-image-none", [["list-style-image", "none"]]),
      o("list-image", {
        themeKeys: ["--list-style-image"],
        handle: (n) => [l("list-style-image", n)],
      }),
      e("appearance-none", [["appearance", "none"]]),
      e("appearance-auto", [["appearance", "auto"]]),
      e("scheme-normal", [["color-scheme", "normal"]]),
      e("scheme-dark", [["color-scheme", "dark"]]),
      e("scheme-light", [["color-scheme", "light"]]),
      e("scheme-light-dark", [["color-scheme", "light dark"]]),
      e("scheme-only-dark", [["color-scheme", "only dark"]]),
      e("scheme-only-light", [["color-scheme", "only light"]]),
      e("columns-auto", [["columns", "auto"]]),
      o("columns", {
        themeKeys: ["--columns", "--container"],
        handleBareValue: ({ value: n }) => (E(n) ? n : null),
        handle: (n) => [l("columns", n)],
      }),
      i("columns", () => [
        {
          values: Array.from({ length: 12 }, (n, d) => `${d + 1}`),
          valueThemeKeys: ["--columns", "--container"],
        },
      ]);
    for (let n of [
      "auto",
      "avoid",
      "all",
      "avoid-page",
      "page",
      "left",
      "right",
      "column",
    ])
      e(`break-before-${n}`, [["break-before", n]]);
    for (let n of ["auto", "avoid", "avoid-page", "avoid-column"])
      e(`break-inside-${n}`, [["break-inside", n]]);
    for (let n of [
      "auto",
      "avoid",
      "all",
      "avoid-page",
      "page",
      "left",
      "right",
      "column",
    ])
      e(`break-after-${n}`, [["break-after", n]]);
    e("grid-flow-row", [["grid-auto-flow", "row"]]),
      e("grid-flow-col", [["grid-auto-flow", "column"]]),
      e("grid-flow-dense", [["grid-auto-flow", "dense"]]),
      e("grid-flow-row-dense", [["grid-auto-flow", "row dense"]]),
      e("grid-flow-col-dense", [["grid-auto-flow", "column dense"]]),
      e("auto-cols-auto", [["grid-auto-columns", "auto"]]),
      e("auto-cols-min", [["grid-auto-columns", "min-content"]]),
      e("auto-cols-max", [["grid-auto-columns", "max-content"]]),
      e("auto-cols-fr", [["grid-auto-columns", "minmax(0, 1fr)"]]),
      o("auto-cols", {
        themeKeys: ["--grid-auto-columns"],
        handle: (n) => [l("grid-auto-columns", n)],
      }),
      e("auto-rows-auto", [["grid-auto-rows", "auto"]]),
      e("auto-rows-min", [["grid-auto-rows", "min-content"]]),
      e("auto-rows-max", [["grid-auto-rows", "max-content"]]),
      e("auto-rows-fr", [["grid-auto-rows", "minmax(0, 1fr)"]]),
      o("auto-rows", {
        themeKeys: ["--grid-auto-rows"],
        handle: (n) => [l("grid-auto-rows", n)],
      }),
      e("grid-cols-none", [["grid-template-columns", "none"]]),
      e("grid-cols-subgrid", [["grid-template-columns", "subgrid"]]),
      o("grid-cols", {
        themeKeys: ["--grid-template-columns"],
        handleBareValue: ({ value: n }) =>
          _t(n) ? `repeat(${n}, minmax(0, 1fr))` : null,
        handle: (n) => [l("grid-template-columns", n)],
      }),
      e("grid-rows-none", [["grid-template-rows", "none"]]),
      e("grid-rows-subgrid", [["grid-template-rows", "subgrid"]]),
      o("grid-rows", {
        themeKeys: ["--grid-template-rows"],
        handleBareValue: ({ value: n }) =>
          _t(n) ? `repeat(${n}, minmax(0, 1fr))` : null,
        handle: (n) => [l("grid-template-rows", n)],
      }),
      i("grid-cols", () => [
        {
          values: Array.from({ length: 12 }, (n, d) => `${d + 1}`),
          valueThemeKeys: ["--grid-template-columns"],
        },
      ]),
      i("grid-rows", () => [
        {
          values: Array.from({ length: 12 }, (n, d) => `${d + 1}`),
          valueThemeKeys: ["--grid-template-rows"],
        },
      ]),
      e("flex-row", [["flex-direction", "row"]]),
      e("flex-row-reverse", [["flex-direction", "row-reverse"]]),
      e("flex-col", [["flex-direction", "column"]]),
      e("flex-col-reverse", [["flex-direction", "column-reverse"]]),
      e("flex-wrap", [["flex-wrap", "wrap"]]),
      e("flex-nowrap", [["flex-wrap", "nowrap"]]),
      e("flex-wrap-reverse", [["flex-wrap", "wrap-reverse"]]),
      e("place-content-center", [["place-content", "center"]]),
      e("place-content-start", [["place-content", "start"]]),
      e("place-content-end", [["place-content", "end"]]),
      e("place-content-center-safe", [["place-content", "safe center"]]),
      e("place-content-end-safe", [["place-content", "safe end"]]),
      e("place-content-between", [["place-content", "space-between"]]),
      e("place-content-around", [["place-content", "space-around"]]),
      e("place-content-evenly", [["place-content", "space-evenly"]]),
      e("place-content-baseline", [["place-content", "baseline"]]),
      e("place-content-stretch", [["place-content", "stretch"]]),
      e("place-items-center", [["place-items", "center"]]),
      e("place-items-start", [["place-items", "start"]]),
      e("place-items-end", [["place-items", "end"]]),
      e("place-items-center-safe", [["place-items", "safe center"]]),
      e("place-items-end-safe", [["place-items", "safe end"]]),
      e("place-items-baseline", [["place-items", "baseline"]]),
      e("place-items-stretch", [["place-items", "stretch"]]),
      e("content-normal", [["align-content", "normal"]]),
      e("content-center", [["align-content", "center"]]),
      e("content-start", [["align-content", "flex-start"]]),
      e("content-end", [["align-content", "flex-end"]]),
      e("content-center-safe", [["align-content", "safe center"]]),
      e("content-end-safe", [["align-content", "safe flex-end"]]),
      e("content-between", [["align-content", "space-between"]]),
      e("content-around", [["align-content", "space-around"]]),
      e("content-evenly", [["align-content", "space-evenly"]]),
      e("content-baseline", [["align-content", "baseline"]]),
      e("content-stretch", [["align-content", "stretch"]]),
      e("items-center", [["align-items", "center"]]),
      e("items-start", [["align-items", "flex-start"]]),
      e("items-end", [["align-items", "flex-end"]]),
      e("items-center-safe", [["align-items", "safe center"]]),
      e("items-end-safe", [["align-items", "safe flex-end"]]),
      e("items-baseline", [["align-items", "baseline"]]),
      e("items-baseline-last", [["align-items", "last baseline"]]),
      e("items-stretch", [["align-items", "stretch"]]),
      e("justify-normal", [["justify-content", "normal"]]),
      e("justify-center", [["justify-content", "center"]]),
      e("justify-start", [["justify-content", "flex-start"]]),
      e("justify-end", [["justify-content", "flex-end"]]),
      e("justify-center-safe", [["justify-content", "safe center"]]),
      e("justify-end-safe", [["justify-content", "safe flex-end"]]),
      e("justify-between", [["justify-content", "space-between"]]),
      e("justify-around", [["justify-content", "space-around"]]),
      e("justify-evenly", [["justify-content", "space-evenly"]]),
      e("justify-baseline", [["justify-content", "baseline"]]),
      e("justify-stretch", [["justify-content", "stretch"]]),
      e("justify-items-normal", [["justify-items", "normal"]]),
      e("justify-items-center", [["justify-items", "center"]]),
      e("justify-items-start", [["justify-items", "start"]]),
      e("justify-items-end", [["justify-items", "end"]]),
      e("justify-items-center-safe", [["justify-items", "safe center"]]),
      e("justify-items-end-safe", [["justify-items", "safe end"]]),
      e("justify-items-stretch", [["justify-items", "stretch"]]),
      a("gap", ["--gap", "--spacing"], (n) => [l("gap", n)]),
      a("gap-x", ["--gap", "--spacing"], (n) => [l("column-gap", n)]),
      a("gap-y", ["--gap", "--spacing"], (n) => [l("row-gap", n)]),
      a(
        "space-x",
        ["--space", "--spacing"],
        (n) => [
          I([$("--tw-space-x-reverse", "0")]),
          M(":where(& > :not(:last-child))", [
            l("--tw-sort", "row-gap"),
            l("--tw-space-x-reverse", "0"),
            l("margin-inline-start", `calc(${n} * var(--tw-space-x-reverse))`),
            l(
              "margin-inline-end",
              `calc(${n} * calc(1 - var(--tw-space-x-reverse)))`
            ),
          ]),
        ],
        { supportsNegative: !0 }
      ),
      a(
        "space-y",
        ["--space", "--spacing"],
        (n) => [
          I([$("--tw-space-y-reverse", "0")]),
          M(":where(& > :not(:last-child))", [
            l("--tw-sort", "column-gap"),
            l("--tw-space-y-reverse", "0"),
            l("margin-block-start", `calc(${n} * var(--tw-space-y-reverse))`),
            l(
              "margin-block-end",
              `calc(${n} * calc(1 - var(--tw-space-y-reverse)))`
            ),
          ]),
        ],
        { supportsNegative: !0 }
      ),
      e("space-x-reverse", [
        () => I([$("--tw-space-x-reverse", "0")]),
        () =>
          M(":where(& > :not(:last-child))", [
            l("--tw-sort", "row-gap"),
            l("--tw-space-x-reverse", "1"),
          ]),
      ]),
      e("space-y-reverse", [
        () => I([$("--tw-space-y-reverse", "0")]),
        () =>
          M(":where(& > :not(:last-child))", [
            l("--tw-sort", "column-gap"),
            l("--tw-space-y-reverse", "1"),
          ]),
      ]),
      e("accent-auto", [["accent-color", "auto"]]),
      s("accent", {
        themeKeys: ["--accent-color", "--color"],
        handle: (n) => [l("accent-color", n)],
      }),
      s("caret", {
        themeKeys: ["--caret-color", "--color"],
        handle: (n) => [l("caret-color", n)],
      }),
      s("divide", {
        themeKeys: ["--divide-color", "--color"],
        handle: (n) => [
          M(":where(& > :not(:last-child))", [
            l("--tw-sort", "divide-color"),
            l("border-color", n),
          ]),
        ],
      }),
      e("place-self-auto", [["place-self", "auto"]]),
      e("place-self-start", [["place-self", "start"]]),
      e("place-self-end", [["place-self", "end"]]),
      e("place-self-center", [["place-self", "center"]]),
      e("place-self-end-safe", [["place-self", "safe end"]]),
      e("place-self-center-safe", [["place-self", "safe center"]]),
      e("place-self-stretch", [["place-self", "stretch"]]),
      e("self-auto", [["align-self", "auto"]]),
      e("self-start", [["align-self", "flex-start"]]),
      e("self-end", [["align-self", "flex-end"]]),
      e("self-center", [["align-self", "center"]]),
      e("self-end-safe", [["align-self", "safe flex-end"]]),
      e("self-center-safe", [["align-self", "safe center"]]),
      e("self-stretch", [["align-self", "stretch"]]),
      e("self-baseline", [["align-self", "baseline"]]),
      e("self-baseline-last", [["align-self", "last baseline"]]),
      e("justify-self-auto", [["justify-self", "auto"]]),
      e("justify-self-start", [["justify-self", "flex-start"]]),
      e("justify-self-end", [["justify-self", "flex-end"]]),
      e("justify-self-center", [["justify-self", "center"]]),
      e("justify-self-end-safe", [["justify-self", "safe flex-end"]]),
      e("justify-self-center-safe", [["justify-self", "safe center"]]),
      e("justify-self-stretch", [["justify-self", "stretch"]]);
    for (let n of ["auto", "hidden", "clip", "visible", "scroll"])
      e(`overflow-${n}`, [["overflow", n]]),
        e(`overflow-x-${n}`, [["overflow-x", n]]),
        e(`overflow-y-${n}`, [["overflow-y", n]]);
    for (let n of ["auto", "contain", "none"])
      e(`overscroll-${n}`, [["overscroll-behavior", n]]),
        e(`overscroll-x-${n}`, [["overscroll-behavior-x", n]]),
        e(`overscroll-y-${n}`, [["overscroll-behavior-y", n]]);
    e("scroll-auto", [["scroll-behavior", "auto"]]),
      e("scroll-smooth", [["scroll-behavior", "smooth"]]),
      e("truncate", [
        ["overflow", "hidden"],
        ["text-overflow", "ellipsis"],
        ["white-space", "nowrap"],
      ]),
      e("text-ellipsis", [["text-overflow", "ellipsis"]]),
      e("text-clip", [["text-overflow", "clip"]]),
      e("hyphens-none", [
        ["-webkit-hyphens", "none"],
        ["hyphens", "none"],
      ]),
      e("hyphens-manual", [
        ["-webkit-hyphens", "manual"],
        ["hyphens", "manual"],
      ]),
      e("hyphens-auto", [
        ["-webkit-hyphens", "auto"],
        ["hyphens", "auto"],
      ]),
      e("whitespace-normal", [["white-space", "normal"]]),
      e("whitespace-nowrap", [["white-space", "nowrap"]]),
      e("whitespace-pre", [["white-space", "pre"]]),
      e("whitespace-pre-line", [["white-space", "pre-line"]]),
      e("whitespace-pre-wrap", [["white-space", "pre-wrap"]]),
      e("whitespace-break-spaces", [["white-space", "break-spaces"]]),
      e("text-wrap", [["text-wrap", "wrap"]]),
      e("text-nowrap", [["text-wrap", "nowrap"]]),
      e("text-balance", [["text-wrap", "balance"]]),
      e("text-pretty", [["text-wrap", "pretty"]]),
      e("break-normal", [
        ["overflow-wrap", "normal"],
        ["word-break", "normal"],
      ]),
      e("break-words", [["overflow-wrap", "break-word"]]),
      e("break-all", [["word-break", "break-all"]]),
      e("break-keep", [["word-break", "keep-all"]]),
      e("wrap-anywhere", [["overflow-wrap", "anywhere"]]),
      e("wrap-break-word", [["overflow-wrap", "break-word"]]),
      e("wrap-normal", [["overflow-wrap", "normal"]]);
    for (let [n, d] of [
      ["rounded", ["border-radius"]],
      ["rounded-s", ["border-start-start-radius", "border-end-start-radius"]],
      ["rounded-e", ["border-start-end-radius", "border-end-end-radius"]],
      ["rounded-t", ["border-top-left-radius", "border-top-right-radius"]],
      ["rounded-r", ["border-top-right-radius", "border-bottom-right-radius"]],
      [
        "rounded-b",
        ["border-bottom-right-radius", "border-bottom-left-radius"],
      ],
      ["rounded-l", ["border-top-left-radius", "border-bottom-left-radius"]],
      ["rounded-ss", ["border-start-start-radius"]],
      ["rounded-se", ["border-start-end-radius"]],
      ["rounded-ee", ["border-end-end-radius"]],
      ["rounded-es", ["border-end-start-radius"]],
      ["rounded-tl", ["border-top-left-radius"]],
      ["rounded-tr", ["border-top-right-radius"]],
      ["rounded-br", ["border-bottom-right-radius"]],
      ["rounded-bl", ["border-bottom-left-radius"]],
    ])
      e(
        `${n}-none`,
        d.map((h) => [h, "0"])
      ),
        e(
          `${n}-full`,
          d.map((h) => [h, "calc(infinity * 1px)"])
        ),
        o(n, { themeKeys: ["--radius"], handle: (h) => d.map((A) => l(A, h)) });
    e("border-solid", [
      ["--tw-border-style", "solid"],
      ["border-style", "solid"],
    ]),
      e("border-dashed", [
        ["--tw-border-style", "dashed"],
        ["border-style", "dashed"],
      ]),
      e("border-dotted", [
        ["--tw-border-style", "dotted"],
        ["border-style", "dotted"],
      ]),
      e("border-double", [
        ["--tw-border-style", "double"],
        ["border-style", "double"],
      ]),
      e("border-hidden", [
        ["--tw-border-style", "hidden"],
        ["border-style", "hidden"],
      ]),
      e("border-none", [
        ["--tw-border-style", "none"],
        ["border-style", "none"],
      ]);
    {
      let d = function (h, A) {
        r.functional(h, (w) => {
          if (!w.value) {
            if (w.modifier) return;
            let C = t.get(["--default-border-width"]) ?? "1px",
              O = A.width(C);
            return O ? [n(), ...O] : void 0;
          }
          if (w.value.kind === "arbitrary") {
            let C = w.value.value;
            switch (
              w.value.dataType ??
              Y(C, ["color", "line-width", "length"])
            ) {
              case "line-width":
              case "length": {
                if (w.modifier) return;
                let S = A.width(C);
                return S ? [n(), ...S] : void 0;
              }
              default:
                return (
                  (C = X(C, w.modifier, t)), C === null ? void 0 : A.color(C)
                );
            }
          }
          {
            let C = te(w, t, ["--border-color", "--color"]);
            if (C) return A.color(C);
          }
          {
            if (w.modifier) return;
            let C = t.resolve(w.value.value, ["--border-width"]);
            if (C) {
              let O = A.width(C);
              return O ? [n(), ...O] : void 0;
            }
            if (E(w.value.value)) {
              let O = A.width(`${w.value.value}px`);
              return O ? [n(), ...O] : void 0;
            }
          }
        }),
          i(h, () => [
            {
              values: ["current", "inherit", "transparent"],
              valueThemeKeys: ["--border-color", "--color"],
              modifiers: Array.from({ length: 21 }, (w, C) => `${C * 5}`),
              hasDefaultValue: !0,
            },
            {
              values: ["0", "2", "4", "8"],
              valueThemeKeys: ["--border-width"],
            },
          ]);
      };
      var _ = d;
      let n = () => I([$("--tw-border-style", "solid")]);
      d("border", {
        width: (h) => [
          l("border-style", "var(--tw-border-style)"),
          l("border-width", h),
        ],
        color: (h) => [l("border-color", h)],
      }),
        d("border-x", {
          width: (h) => [
            l("border-inline-style", "var(--tw-border-style)"),
            l("border-inline-width", h),
          ],
          color: (h) => [l("border-inline-color", h)],
        }),
        d("border-y", {
          width: (h) => [
            l("border-block-style", "var(--tw-border-style)"),
            l("border-block-width", h),
          ],
          color: (h) => [l("border-block-color", h)],
        }),
        d("border-s", {
          width: (h) => [
            l("border-inline-start-style", "var(--tw-border-style)"),
            l("border-inline-start-width", h),
          ],
          color: (h) => [l("border-inline-start-color", h)],
        }),
        d("border-e", {
          width: (h) => [
            l("border-inline-end-style", "var(--tw-border-style)"),
            l("border-inline-end-width", h),
          ],
          color: (h) => [l("border-inline-end-color", h)],
        }),
        d("border-t", {
          width: (h) => [
            l("border-top-style", "var(--tw-border-style)"),
            l("border-top-width", h),
          ],
          color: (h) => [l("border-top-color", h)],
        }),
        d("border-r", {
          width: (h) => [
            l("border-right-style", "var(--tw-border-style)"),
            l("border-right-width", h),
          ],
          color: (h) => [l("border-right-color", h)],
        }),
        d("border-b", {
          width: (h) => [
            l("border-bottom-style", "var(--tw-border-style)"),
            l("border-bottom-width", h),
          ],
          color: (h) => [l("border-bottom-color", h)],
        }),
        d("border-l", {
          width: (h) => [
            l("border-left-style", "var(--tw-border-style)"),
            l("border-left-width", h),
          ],
          color: (h) => [l("border-left-color", h)],
        }),
        o("divide-x", {
          defaultValue: t.get(["--default-border-width"]) ?? "1px",
          themeKeys: ["--divide-width", "--border-width"],
          handleBareValue: ({ value: h }) => (E(h) ? `${h}px` : null),
          handle: (h) => [
            I([$("--tw-divide-x-reverse", "0")]),
            M(":where(& > :not(:last-child))", [
              l("--tw-sort", "divide-x-width"),
              n(),
              l("--tw-divide-x-reverse", "0"),
              l("border-inline-style", "var(--tw-border-style)"),
              l(
                "border-inline-start-width",
                `calc(${h} * var(--tw-divide-x-reverse))`
              ),
              l(
                "border-inline-end-width",
                `calc(${h} * calc(1 - var(--tw-divide-x-reverse)))`
              ),
            ]),
          ],
        }),
        o("divide-y", {
          defaultValue: t.get(["--default-border-width"]) ?? "1px",
          themeKeys: ["--divide-width", "--border-width"],
          handleBareValue: ({ value: h }) => (E(h) ? `${h}px` : null),
          handle: (h) => [
            I([$("--tw-divide-y-reverse", "0")]),
            M(":where(& > :not(:last-child))", [
              l("--tw-sort", "divide-y-width"),
              n(),
              l("--tw-divide-y-reverse", "0"),
              l("border-bottom-style", "var(--tw-border-style)"),
              l("border-top-style", "var(--tw-border-style)"),
              l("border-top-width", `calc(${h} * var(--tw-divide-y-reverse))`),
              l(
                "border-bottom-width",
                `calc(${h} * calc(1 - var(--tw-divide-y-reverse)))`
              ),
            ]),
          ],
        }),
        i("divide-x", () => [
          {
            values: ["0", "2", "4", "8"],
            valueThemeKeys: ["--divide-width", "--border-width"],
            hasDefaultValue: !0,
          },
        ]),
        i("divide-y", () => [
          {
            values: ["0", "2", "4", "8"],
            valueThemeKeys: ["--divide-width", "--border-width"],
            hasDefaultValue: !0,
          },
        ]),
        e("divide-x-reverse", [
          () => I([$("--tw-divide-x-reverse", "0")]),
          () =>
            M(":where(& > :not(:last-child))", [
              l("--tw-divide-x-reverse", "1"),
            ]),
        ]),
        e("divide-y-reverse", [
          () => I([$("--tw-divide-y-reverse", "0")]),
          () =>
            M(":where(& > :not(:last-child))", [
              l("--tw-divide-y-reverse", "1"),
            ]),
        ]);
      for (let h of ["solid", "dashed", "dotted", "double", "none"])
        e(`divide-${h}`, [
          () =>
            M(":where(& > :not(:last-child))", [
              l("--tw-sort", "divide-style"),
              l("--tw-border-style", h),
              l("border-style", h),
            ]),
        ]);
    }
    e("bg-auto", [["background-size", "auto"]]),
      e("bg-cover", [["background-size", "cover"]]),
      e("bg-contain", [["background-size", "contain"]]),
      o("bg-size", {
        handle(n) {
          if (n) return [l("background-size", n)];
        },
      }),
      e("bg-fixed", [["background-attachment", "fixed"]]),
      e("bg-local", [["background-attachment", "local"]]),
      e("bg-scroll", [["background-attachment", "scroll"]]),
      e("bg-top", [["background-position", "top"]]),
      e("bg-top-left", [["background-position", "left top"]]),
      e("bg-top-right", [["background-position", "right top"]]),
      e("bg-bottom", [["background-position", "bottom"]]),
      e("bg-bottom-left", [["background-position", "left bottom"]]),
      e("bg-bottom-right", [["background-position", "right bottom"]]),
      e("bg-left", [["background-position", "left"]]),
      e("bg-right", [["background-position", "right"]]),
      e("bg-center", [["background-position", "center"]]),
      o("bg-position", {
        handle(n) {
          if (n) return [l("background-position", n)];
        },
      }),
      e("bg-repeat", [["background-repeat", "repeat"]]),
      e("bg-no-repeat", [["background-repeat", "no-repeat"]]),
      e("bg-repeat-x", [["background-repeat", "repeat-x"]]),
      e("bg-repeat-y", [["background-repeat", "repeat-y"]]),
      e("bg-repeat-round", [["background-repeat", "round"]]),
      e("bg-repeat-space", [["background-repeat", "space"]]),
      e("bg-none", [["background-image", "none"]]);
    {
      let h = function (C) {
          let O = "in oklab";
          if (C?.kind === "named")
            switch (C.value) {
              case "longer":
              case "shorter":
              case "increasing":
              case "decreasing":
                O = `in oklch ${C.value} hue`;
                break;
              default:
                O = `in ${C.value}`;
            }
          else C?.kind === "arbitrary" && (O = C.value);
          return O;
        },
        A = function ({ negative: C }) {
          return (O) => {
            if (!O.value) return;
            if (O.value.kind === "arbitrary") {
              if (O.modifier) return;
              let D = O.value.value;
              switch (O.value.dataType ?? Y(D, ["angle"])) {
                case "angle":
                  return (
                    (D = C ? `calc(${D} * -1)` : `${D}`),
                    [
                      l("--tw-gradient-position", D),
                      l(
                        "background-image",
                        `linear-gradient(var(--tw-gradient-stops,${D}))`
                      ),
                    ]
                  );
                default:
                  return C
                    ? void 0
                    : [
                        l("--tw-gradient-position", D),
                        l(
                          "background-image",
                          `linear-gradient(var(--tw-gradient-stops,${D}))`
                        ),
                      ];
              }
            }
            let S = O.value.value;
            if (!C && d.has(S)) S = d.get(S);
            else if (E(S)) S = C ? `calc(${S}deg * -1)` : `${S}deg`;
            else return;
            let T = h(O.modifier);
            return [
              l("--tw-gradient-position", `${S}`),
              G(
                "@supports (background-image: linear-gradient(in lab, red, red))",
                [l("--tw-gradient-position", `${S} ${T}`)]
              ),
              l(
                "background-image",
                "linear-gradient(var(--tw-gradient-stops))"
              ),
            ];
          };
        },
        w = function ({ negative: C }) {
          return (O) => {
            if (O.value?.kind === "arbitrary") {
              if (O.modifier) return;
              let D = O.value.value;
              return [
                l("--tw-gradient-position", D),
                l(
                  "background-image",
                  `conic-gradient(var(--tw-gradient-stops,${D}))`
                ),
              ];
            }
            let S = h(O.modifier);
            if (!O.value)
              return [
                l("--tw-gradient-position", S),
                l(
                  "background-image",
                  "conic-gradient(var(--tw-gradient-stops))"
                ),
              ];
            let T = O.value.value;
            if (E(T))
              return (
                (T = C ? `calc(${T}deg * -1)` : `${T}deg`),
                [
                  l("--tw-gradient-position", `from ${T} ${S}`),
                  l(
                    "background-image",
                    "conic-gradient(var(--tw-gradient-stops))"
                  ),
                ]
              );
          };
        };
      var H = h,
        j = A,
        B = w;
      let n = [
          "oklab",
          "oklch",
          "srgb",
          "hsl",
          "longer",
          "shorter",
          "increasing",
          "decreasing",
        ],
        d = new Map([
          ["to-t", "to top"],
          ["to-tr", "to top right"],
          ["to-r", "to right"],
          ["to-br", "to bottom right"],
          ["to-b", "to bottom"],
          ["to-bl", "to bottom left"],
          ["to-l", "to left"],
          ["to-tl", "to top left"],
        ]);
      r.functional("-bg-linear", A({ negative: !0 })),
        r.functional("bg-linear", A({ negative: !1 })),
        i("bg-linear", () => [
          { values: [...d.keys()], modifiers: n },
          {
            values: [
              "0",
              "30",
              "60",
              "90",
              "120",
              "150",
              "180",
              "210",
              "240",
              "270",
              "300",
              "330",
            ],
            supportsNegative: !0,
            modifiers: n,
          },
        ]),
        r.functional("-bg-conic", w({ negative: !0 })),
        r.functional("bg-conic", w({ negative: !1 })),
        i("bg-conic", () => [
          { hasDefaultValue: !0, modifiers: n },
          {
            values: [
              "0",
              "30",
              "60",
              "90",
              "120",
              "150",
              "180",
              "210",
              "240",
              "270",
              "300",
              "330",
            ],
            supportsNegative: !0,
            modifiers: n,
          },
        ]),
        r.functional("bg-radial", (C) => {
          if (!C.value) {
            let O = h(C.modifier);
            return [
              l("--tw-gradient-position", O),
              l(
                "background-image",
                "radial-gradient(var(--tw-gradient-stops))"
              ),
            ];
          }
          if (C.value.kind === "arbitrary") {
            if (C.modifier) return;
            let O = C.value.value;
            return [
              l("--tw-gradient-position", O),
              l(
                "background-image",
                `radial-gradient(var(--tw-gradient-stops,${O}))`
              ),
            ];
          }
        }),
        i("bg-radial", () => [{ hasDefaultValue: !0, modifiers: n }]);
    }
    r.functional("bg", (n) => {
      if (n.value) {
        if (n.value.kind === "arbitrary") {
          let d = n.value.value;
          switch (
            n.value.dataType ??
            Y(d, [
              "image",
              "color",
              "percentage",
              "position",
              "bg-size",
              "length",
              "url",
            ])
          ) {
            case "percentage":
            case "position":
              return n.modifier ? void 0 : [l("background-position", d)];
            case "bg-size":
            case "length":
            case "size":
              return n.modifier ? void 0 : [l("background-size", d)];
            case "image":
            case "url":
              return n.modifier ? void 0 : [l("background-image", d)];
            default:
              return (
                (d = X(d, n.modifier, t)),
                d === null ? void 0 : [l("background-color", d)]
              );
          }
        }
        {
          let d = te(n, t, ["--background-color", "--color"]);
          if (d) return [l("background-color", d)];
        }
        {
          if (n.modifier) return;
          let d = t.resolve(n.value.value, ["--background-image"]);
          if (d) return [l("background-image", d)];
        }
      }
    }),
      i("bg", () => [
        {
          values: ["current", "inherit", "transparent"],
          valueThemeKeys: ["--background-color", "--color"],
          modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`),
        },
        { values: [], valueThemeKeys: ["--background-image"] },
      ]);
    let k = () =>
      I([
        $("--tw-gradient-position"),
        $("--tw-gradient-from", "#0000", "<color>"),
        $("--tw-gradient-via", "#0000", "<color>"),
        $("--tw-gradient-to", "#0000", "<color>"),
        $("--tw-gradient-stops"),
        $("--tw-gradient-via-stops"),
        $("--tw-gradient-from-position", "0%", "<length-percentage>"),
        $("--tw-gradient-via-position", "50%", "<length-percentage>"),
        $("--tw-gradient-to-position", "100%", "<length-percentage>"),
      ]);
    function x(n, d) {
      r.functional(n, (h) => {
        if (h.value) {
          if (h.value.kind === "arbitrary") {
            let A = h.value.value;
            switch (
              h.value.dataType ??
              Y(A, ["color", "length", "percentage"])
            ) {
              case "length":
              case "percentage":
                return h.modifier ? void 0 : d.position(A);
              default:
                return (
                  (A = X(A, h.modifier, t)), A === null ? void 0 : d.color(A)
                );
            }
          }
          {
            let A = te(h, t, ["--background-color", "--color"]);
            if (A) return d.color(A);
          }
          {
            if (h.modifier) return;
            let A = t.resolve(h.value.value, [
              "--gradient-color-stop-positions",
            ]);
            if (A) return d.position(A);
            if (
              h.value.value[h.value.value.length - 1] === "%" &&
              E(h.value.value.slice(0, -1))
            )
              return d.position(h.value.value);
          }
        }
      }),
        i(n, () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--background-color", "--color"],
            modifiers: Array.from({ length: 21 }, (h, A) => `${A * 5}`),
          },
          {
            values: Array.from({ length: 21 }, (h, A) => `${A * 5}%`),
            valueThemeKeys: ["--gradient-color-stop-positions"],
          },
        ]);
    }
    x("from", {
      color: (n) => [
        k(),
        l("--tw-sort", "--tw-gradient-from"),
        l("--tw-gradient-from", n),
        l(
          "--tw-gradient-stops",
          "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))"
        ),
      ],
      position: (n) => [k(), l("--tw-gradient-from-position", n)],
    }),
      e("via-none", [["--tw-gradient-via-stops", "initial"]]),
      x("via", {
        color: (n) => [
          k(),
          l("--tw-sort", "--tw-gradient-via"),
          l("--tw-gradient-via", n),
          l(
            "--tw-gradient-via-stops",
            "var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position)"
          ),
          l("--tw-gradient-stops", "var(--tw-gradient-via-stops)"),
        ],
        position: (n) => [k(), l("--tw-gradient-via-position", n)],
      }),
      x("to", {
        color: (n) => [
          k(),
          l("--tw-sort", "--tw-gradient-to"),
          l("--tw-gradient-to", n),
          l(
            "--tw-gradient-stops",
            "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))"
          ),
        ],
        position: (n) => [k(), l("--tw-gradient-to-position", n)],
      }),
      e("mask-none", [["mask-image", "none"]]),
      r.functional("mask", (n) => {
        if (!n.value || n.modifier || n.value.kind !== "arbitrary") return;
        let d = n.value.value;
        switch (
          n.value.dataType ??
          Y(d, ["image", "percentage", "position", "bg-size", "length", "url"])
        ) {
          case "percentage":
          case "position":
            return n.modifier ? void 0 : [l("mask-position", d)];
          case "bg-size":
          case "length":
          case "size":
            return [l("mask-size", d)];
          case "image":
          case "url":
          default:
            return [l("mask-image", d)];
        }
      }),
      e("mask-add", [["mask-composite", "add"]]),
      e("mask-subtract", [["mask-composite", "subtract"]]),
      e("mask-intersect", [["mask-composite", "intersect"]]),
      e("mask-exclude", [["mask-composite", "exclude"]]),
      e("mask-alpha", [["mask-mode", "alpha"]]),
      e("mask-luminance", [["mask-mode", "luminance"]]),
      e("mask-match", [["mask-mode", "match-source"]]),
      e("mask-type-alpha", [["mask-type", "alpha"]]),
      e("mask-type-luminance", [["mask-type", "luminance"]]),
      e("mask-auto", [["mask-size", "auto"]]),
      e("mask-cover", [["mask-size", "cover"]]),
      e("mask-contain", [["mask-size", "contain"]]),
      o("mask-size", {
        handle(n) {
          if (n) return [l("mask-size", n)];
        },
      }),
      e("mask-top", [["mask-position", "top"]]),
      e("mask-top-left", [["mask-position", "left top"]]),
      e("mask-top-right", [["mask-position", "right top"]]),
      e("mask-bottom", [["mask-position", "bottom"]]),
      e("mask-bottom-left", [["mask-position", "left bottom"]]),
      e("mask-bottom-right", [["mask-position", "right bottom"]]),
      e("mask-left", [["mask-position", "left"]]),
      e("mask-right", [["mask-position", "right"]]),
      e("mask-center", [["mask-position", "center"]]),
      o("mask-position", {
        handle(n) {
          if (n) return [l("mask-position", n)];
        },
      }),
      e("mask-repeat", [["mask-repeat", "repeat"]]),
      e("mask-no-repeat", [["mask-repeat", "no-repeat"]]),
      e("mask-repeat-x", [["mask-repeat", "repeat-x"]]),
      e("mask-repeat-y", [["mask-repeat", "repeat-y"]]),
      e("mask-repeat-round", [["mask-repeat", "round"]]),
      e("mask-repeat-space", [["mask-repeat", "space"]]),
      e("mask-clip-border", [["mask-clip", "border-box"]]),
      e("mask-clip-padding", [["mask-clip", "padding-box"]]),
      e("mask-clip-content", [["mask-clip", "content-box"]]),
      e("mask-clip-fill", [["mask-clip", "fill-box"]]),
      e("mask-clip-stroke", [["mask-clip", "stroke-box"]]),
      e("mask-clip-view", [["mask-clip", "view-box"]]),
      e("mask-no-clip", [["mask-clip", "no-clip"]]),
      e("mask-origin-border", [["mask-origin", "border-box"]]),
      e("mask-origin-padding", [["mask-origin", "padding-box"]]),
      e("mask-origin-content", [["mask-origin", "content-box"]]),
      e("mask-origin-fill", [["mask-origin", "fill-box"]]),
      e("mask-origin-stroke", [["mask-origin", "stroke-box"]]),
      e("mask-origin-view", [["mask-origin", "view-box"]]);
    let y = () =>
      I([
        $("--tw-mask-linear", "linear-gradient(#fff, #fff)"),
        $("--tw-mask-radial", "linear-gradient(#fff, #fff)"),
        $("--tw-mask-conic", "linear-gradient(#fff, #fff)"),
      ]);
    function N(n, d) {
      r.functional(n, (h) => {
        if (h.value) {
          if (h.value.kind === "arbitrary") {
            let A = h.value.value;
            switch (
              h.value.dataType ??
              Y(A, ["length", "percentage", "color"])
            ) {
              case "color":
                return (
                  (A = X(A, h.modifier, t)), A === null ? void 0 : d.color(A)
                );
              case "percentage":
                return h.modifier || !E(A.slice(0, -1))
                  ? void 0
                  : d.position(A);
              default:
                return h.modifier ? void 0 : d.position(A);
            }
          }
          {
            let A = te(h, t, ["--background-color", "--color"]);
            if (A) return d.color(A);
          }
          {
            if (h.modifier) return;
            let A = Y(h.value.value, ["number", "percentage"]);
            if (!A) return;
            switch (A) {
              case "number": {
                let w = t.resolve(null, ["--spacing"]);
                return !w || !xe(h.value.value)
                  ? void 0
                  : d.position(`calc(${w} * ${h.value.value})`);
              }
              case "percentage":
                return E(h.value.value.slice(0, -1))
                  ? d.position(h.value.value)
                  : void 0;
              default:
                return;
            }
          }
        }
      }),
        i(n, () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--background-color", "--color"],
            modifiers: Array.from({ length: 21 }, (h, A) => `${A * 5}`),
          },
          {
            values: Array.from({ length: 21 }, (h, A) => `${A * 5}%`),
            valueThemeKeys: ["--gradient-color-stop-positions"],
          },
        ]),
        i(n, () => [
          { values: Array.from({ length: 21 }, (h, A) => `${A * 5}%`) },
          { values: t.get(["--spacing"]) ? at : [] },
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--background-color", "--color"],
            modifiers: Array.from({ length: 21 }, (h, A) => `${A * 5}`),
          },
        ]);
    }
    let b = () =>
      I([
        $("--tw-mask-left", "linear-gradient(#fff, #fff)"),
        $("--tw-mask-right", "linear-gradient(#fff, #fff)"),
        $("--tw-mask-bottom", "linear-gradient(#fff, #fff)"),
        $("--tw-mask-top", "linear-gradient(#fff, #fff)"),
      ]);
    function V(n, d, h) {
      N(n, {
        color(A) {
          let w = [
            y(),
            b(),
            l(
              "mask-image",
              "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
            ),
            l("mask-composite", "intersect"),
            l(
              "--tw-mask-linear",
              "var(--tw-mask-left), var(--tw-mask-right), var(--tw-mask-bottom), var(--tw-mask-top)"
            ),
          ];
          for (let C of ["top", "right", "bottom", "left"])
            h[C] &&
              (w.push(
                l(
                  `--tw-mask-${C}`,
                  `linear-gradient(to ${C}, var(--tw-mask-${C}-from-color) var(--tw-mask-${C}-from-position), var(--tw-mask-${C}-to-color) var(--tw-mask-${C}-to-position))`
                )
              ),
              w.push(
                I([
                  $(`--tw-mask-${C}-from-position`, "0%"),
                  $(`--tw-mask-${C}-to-position`, "100%"),
                  $(`--tw-mask-${C}-from-color`, "black"),
                  $(`--tw-mask-${C}-to-color`, "transparent"),
                ])
              ),
              w.push(l(`--tw-mask-${C}-${d}-color`, A)));
          return w;
        },
        position(A) {
          let w = [
            y(),
            b(),
            l(
              "mask-image",
              "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
            ),
            l("mask-composite", "intersect"),
            l(
              "--tw-mask-linear",
              "var(--tw-mask-left), var(--tw-mask-right), var(--tw-mask-bottom), var(--tw-mask-top)"
            ),
          ];
          for (let C of ["top", "right", "bottom", "left"])
            h[C] &&
              (w.push(
                l(
                  `--tw-mask-${C}`,
                  `linear-gradient(to ${C}, var(--tw-mask-${C}-from-color) var(--tw-mask-${C}-from-position), var(--tw-mask-${C}-to-color) var(--tw-mask-${C}-to-position))`
                )
              ),
              w.push(
                I([
                  $(`--tw-mask-${C}-from-position`, "0%"),
                  $(`--tw-mask-${C}-to-position`, "100%"),
                  $(`--tw-mask-${C}-from-color`, "black"),
                  $(`--tw-mask-${C}-to-color`, "transparent"),
                ])
              ),
              w.push(l(`--tw-mask-${C}-${d}-position`, A)));
          return w;
        },
      });
    }
    V("mask-x-from", "from", { top: !1, right: !0, bottom: !1, left: !0 }),
      V("mask-x-to", "to", { top: !1, right: !0, bottom: !1, left: !0 }),
      V("mask-y-from", "from", { top: !0, right: !1, bottom: !0, left: !1 }),
      V("mask-y-to", "to", { top: !0, right: !1, bottom: !0, left: !1 }),
      V("mask-t-from", "from", { top: !0, right: !1, bottom: !1, left: !1 }),
      V("mask-t-to", "to", { top: !0, right: !1, bottom: !1, left: !1 }),
      V("mask-r-from", "from", { top: !1, right: !0, bottom: !1, left: !1 }),
      V("mask-r-to", "to", { top: !1, right: !0, bottom: !1, left: !1 }),
      V("mask-b-from", "from", { top: !1, right: !1, bottom: !0, left: !1 }),
      V("mask-b-to", "to", { top: !1, right: !1, bottom: !0, left: !1 }),
      V("mask-l-from", "from", { top: !1, right: !1, bottom: !1, left: !0 }),
      V("mask-l-to", "to", { top: !1, right: !1, bottom: !1, left: !0 });
    let R = () =>
      I([
        $("--tw-mask-linear-position", "0deg"),
        $("--tw-mask-linear-from-position", "0%"),
        $("--tw-mask-linear-to-position", "100%"),
        $("--tw-mask-linear-from-color", "black"),
        $("--tw-mask-linear-to-color", "transparent"),
      ]);
    o("mask-linear", {
      defaultValue: null,
      supportsNegative: !0,
      supportsFractions: !1,
      handleBareValue(n) {
        return E(n.value) ? `calc(1deg * ${n.value})` : null;
      },
      handleNegativeBareValue(n) {
        return E(n.value) ? `calc(1deg * -${n.value})` : null;
      },
      handle: (n) => [
        y(),
        R(),
        l(
          "mask-image",
          "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
        ),
        l("mask-composite", "intersect"),
        l(
          "--tw-mask-linear",
          "linear-gradient(var(--tw-mask-linear-stops, var(--tw-mask-linear-position)))"
        ),
        l("--tw-mask-linear-position", n),
      ],
    }),
      i("mask-linear", () => [
        {
          supportsNegative: !0,
          values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"],
        },
      ]),
      N("mask-linear-from", {
        color: (n) => [
          y(),
          R(),
          l(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          l("mask-composite", "intersect"),
          l(
            "--tw-mask-linear-stops",
            "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"
          ),
          l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops))"),
          l("--tw-mask-linear-from-color", n),
        ],
        position: (n) => [
          y(),
          R(),
          l(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          l("mask-composite", "intersect"),
          l(
            "--tw-mask-linear-stops",
            "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"
          ),
          l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops))"),
          l("--tw-mask-linear-from-position", n),
        ],
      }),
      N("mask-linear-to", {
        color: (n) => [
          y(),
          R(),
          l(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          l("mask-composite", "intersect"),
          l(
            "--tw-mask-linear-stops",
            "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"
          ),
          l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops))"),
          l("--tw-mask-linear-to-color", n),
        ],
        position: (n) => [
          y(),
          R(),
          l(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          l("mask-composite", "intersect"),
          l(
            "--tw-mask-linear-stops",
            "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"
          ),
          l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops))"),
          l("--tw-mask-linear-to-position", n),
        ],
      });
    let U = () =>
      I([
        $("--tw-mask-radial-from-position", "0%"),
        $("--tw-mask-radial-to-position", "100%"),
        $("--tw-mask-radial-from-color", "black"),
        $("--tw-mask-radial-to-color", "transparent"),
        $("--tw-mask-radial-shape", "ellipse"),
        $("--tw-mask-radial-size", "farthest-corner"),
        $("--tw-mask-radial-position", "center"),
      ]);
    e("mask-circle", [["--tw-mask-radial-shape", "circle"]]),
      e("mask-ellipse", [["--tw-mask-radial-shape", "ellipse"]]),
      e("mask-radial-closest-side", [
        ["--tw-mask-radial-size", "closest-side"],
      ]),
      e("mask-radial-farthest-side", [
        ["--tw-mask-radial-size", "farthest-side"],
      ]),
      e("mask-radial-closest-corner", [
        ["--tw-mask-radial-size", "closest-corner"],
      ]),
      e("mask-radial-farthest-corner", [
        ["--tw-mask-radial-size", "farthest-corner"],
      ]),
      e("mask-radial-at-top", [["--tw-mask-radial-position", "top"]]),
      e("mask-radial-at-top-left", [["--tw-mask-radial-position", "top left"]]),
      e("mask-radial-at-top-right", [
        ["--tw-mask-radial-position", "top right"],
      ]),
      e("mask-radial-at-bottom", [["--tw-mask-radial-position", "bottom"]]),
      e("mask-radial-at-bottom-left", [
        ["--tw-mask-radial-position", "bottom left"],
      ]),
      e("mask-radial-at-bottom-right", [
        ["--tw-mask-radial-position", "bottom right"],
      ]),
      e("mask-radial-at-left", [["--tw-mask-radial-position", "left"]]),
      e("mask-radial-at-right", [["--tw-mask-radial-position", "right"]]),
      e("mask-radial-at-center", [["--tw-mask-radial-position", "center"]]),
      o("mask-radial-at", {
        defaultValue: null,
        supportsNegative: !1,
        supportsFractions: !1,
        handle: (n) => [l("--tw-mask-radial-position", n)],
      }),
      o("mask-radial", {
        defaultValue: null,
        supportsNegative: !1,
        supportsFractions: !1,
        handle: (n) => [
          y(),
          U(),
          l(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          l("mask-composite", "intersect"),
          l(
            "--tw-mask-radial",
            "radial-gradient(var(--tw-mask-radial-stops, var(--tw-mask-radial-size)))"
          ),
          l("--tw-mask-radial-size", n),
        ],
      }),
      N("mask-radial-from", {
        color: (n) => [
          y(),
          U(),
          l(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          l("mask-composite", "intersect"),
          l(
            "--tw-mask-radial-stops",
            "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"
          ),
          l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops))"),
          l("--tw-mask-radial-from-color", n),
        ],
        position: (n) => [
          y(),
          U(),
          l(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          l("mask-composite", "intersect"),
          l(
            "--tw-mask-radial-stops",
            "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"
          ),
          l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops))"),
          l("--tw-mask-radial-from-position", n),
        ],
      }),
      N("mask-radial-to", {
        color: (n) => [
          y(),
          U(),
          l(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          l("mask-composite", "intersect"),
          l(
            "--tw-mask-radial-stops",
            "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"
          ),
          l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops))"),
          l("--tw-mask-radial-to-color", n),
        ],
        position: (n) => [
          y(),
          U(),
          l(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          l("mask-composite", "intersect"),
          l(
            "--tw-mask-radial-stops",
            "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"
          ),
          l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops))"),
          l("--tw-mask-radial-to-position", n),
        ],
      });
    let P = () =>
      I([
        $("--tw-mask-conic-position", "0deg"),
        $("--tw-mask-conic-from-position", "0%"),
        $("--tw-mask-conic-to-position", "100%"),
        $("--tw-mask-conic-from-color", "black"),
        $("--tw-mask-conic-to-color", "transparent"),
      ]);
    o("mask-conic", {
      defaultValue: null,
      supportsNegative: !0,
      supportsFractions: !1,
      handleBareValue(n) {
        return E(n.value) ? `calc(1deg * ${n.value})` : null;
      },
      handleNegativeBareValue(n) {
        return E(n.value) ? `calc(1deg * -${n.value})` : null;
      },
      handle: (n) => [
        y(),
        P(),
        l(
          "mask-image",
          "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
        ),
        l("mask-composite", "intersect"),
        l(
          "--tw-mask-conic",
          "conic-gradient(var(--tw-mask-conic-stops, var(--tw-mask-conic-position)))"
        ),
        l("--tw-mask-conic-position", n),
      ],
    }),
      i("mask-conic", () => [
        {
          supportsNegative: !0,
          values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"],
        },
      ]),
      N("mask-conic-from", {
        color: (n) => [
          y(),
          P(),
          l(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          l("mask-composite", "intersect"),
          l(
            "--tw-mask-conic-stops",
            "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"
          ),
          l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops))"),
          l("--tw-mask-conic-from-color", n),
        ],
        position: (n) => [
          y(),
          P(),
          l(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          l("mask-composite", "intersect"),
          l(
            "--tw-mask-conic-stops",
            "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"
          ),
          l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops))"),
          l("--tw-mask-conic-from-position", n),
        ],
      }),
      N("mask-conic-to", {
        color: (n) => [
          y(),
          P(),
          l(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          l("mask-composite", "intersect"),
          l(
            "--tw-mask-conic-stops",
            "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"
          ),
          l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops))"),
          l("--tw-mask-conic-to-color", n),
        ],
        position: (n) => [
          y(),
          P(),
          l(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          l("mask-composite", "intersect"),
          l(
            "--tw-mask-conic-stops",
            "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"
          ),
          l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops))"),
          l("--tw-mask-conic-to-position", n),
        ],
      }),
      e("box-decoration-slice", [
        ["-webkit-box-decoration-break", "slice"],
        ["box-decoration-break", "slice"],
      ]),
      e("box-decoration-clone", [
        ["-webkit-box-decoration-break", "clone"],
        ["box-decoration-break", "clone"],
      ]),
      e("bg-clip-text", [["background-clip", "text"]]),
      e("bg-clip-border", [["background-clip", "border-box"]]),
      e("bg-clip-padding", [["background-clip", "padding-box"]]),
      e("bg-clip-content", [["background-clip", "content-box"]]),
      e("bg-origin-border", [["background-origin", "border-box"]]),
      e("bg-origin-padding", [["background-origin", "padding-box"]]),
      e("bg-origin-content", [["background-origin", "content-box"]]);
    for (let n of [
      "normal",
      "multiply",
      "screen",
      "overlay",
      "darken",
      "lighten",
      "color-dodge",
      "color-burn",
      "hard-light",
      "soft-light",
      "difference",
      "exclusion",
      "hue",
      "saturation",
      "color",
      "luminosity",
    ])
      e(`bg-blend-${n}`, [["background-blend-mode", n]]),
        e(`mix-blend-${n}`, [["mix-blend-mode", n]]);
    e("mix-blend-plus-darker", [["mix-blend-mode", "plus-darker"]]),
      e("mix-blend-plus-lighter", [["mix-blend-mode", "plus-lighter"]]),
      e("fill-none", [["fill", "none"]]),
      r.functional("fill", (n) => {
        if (!n.value) return;
        if (n.value.kind === "arbitrary") {
          let h = X(n.value.value, n.modifier, t);
          return h === null ? void 0 : [l("fill", h)];
        }
        let d = te(n, t, ["--fill", "--color"]);
        if (d) return [l("fill", d)];
      }),
      i("fill", () => [
        {
          values: ["current", "inherit", "transparent"],
          valueThemeKeys: ["--fill", "--color"],
          modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`),
        },
      ]),
      e("stroke-none", [["stroke", "none"]]),
      r.functional("stroke", (n) => {
        if (n.value) {
          if (n.value.kind === "arbitrary") {
            let d = n.value.value;
            switch (
              n.value.dataType ??
              Y(d, ["color", "number", "length", "percentage"])
            ) {
              case "number":
              case "length":
              case "percentage":
                return n.modifier ? void 0 : [l("stroke-width", d)];
              default:
                return (
                  (d = X(n.value.value, n.modifier, t)),
                  d === null ? void 0 : [l("stroke", d)]
                );
            }
          }
          {
            let d = te(n, t, ["--stroke", "--color"]);
            if (d) return [l("stroke", d)];
          }
          {
            let d = t.resolve(n.value.value, ["--stroke-width"]);
            if (d) return [l("stroke-width", d)];
            if (E(n.value.value)) return [l("stroke-width", n.value.value)];
          }
        }
      }),
      i("stroke", () => [
        {
          values: ["current", "inherit", "transparent"],
          valueThemeKeys: ["--stroke", "--color"],
          modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`),
        },
        { values: ["0", "1", "2", "3"], valueThemeKeys: ["--stroke-width"] },
      ]),
      e("object-contain", [["object-fit", "contain"]]),
      e("object-cover", [["object-fit", "cover"]]),
      e("object-fill", [["object-fit", "fill"]]),
      e("object-none", [["object-fit", "none"]]),
      e("object-scale-down", [["object-fit", "scale-down"]]),
      e("object-top", [["object-position", "top"]]),
      e("object-top-left", [["object-position", "left top"]]),
      e("object-top-right", [["object-position", "right top"]]),
      e("object-bottom", [["object-position", "bottom"]]),
      e("object-bottom-left", [["object-position", "left bottom"]]),
      e("object-bottom-right", [["object-position", "right bottom"]]),
      e("object-left", [["object-position", "left"]]),
      e("object-right", [["object-position", "right"]]),
      e("object-center", [["object-position", "center"]]),
      o("object", {
        themeKeys: ["--object-position"],
        handle: (n) => [l("object-position", n)],
      });
    for (let [n, d] of [
      ["p", "padding"],
      ["px", "padding-inline"],
      ["py", "padding-block"],
      ["ps", "padding-inline-start"],
      ["pe", "padding-inline-end"],
      ["pt", "padding-top"],
      ["pr", "padding-right"],
      ["pb", "padding-bottom"],
      ["pl", "padding-left"],
    ])
      a(n, ["--padding", "--spacing"], (h) => [l(d, h)]);
    e("text-left", [["text-align", "left"]]),
      e("text-center", [["text-align", "center"]]),
      e("text-right", [["text-align", "right"]]),
      e("text-justify", [["text-align", "justify"]]),
      e("text-start", [["text-align", "start"]]),
      e("text-end", [["text-align", "end"]]),
      a(
        "indent",
        ["--text-indent", "--spacing"],
        (n) => [l("text-indent", n)],
        { supportsNegative: !0 }
      ),
      e("align-baseline", [["vertical-align", "baseline"]]),
      e("align-top", [["vertical-align", "top"]]),
      e("align-middle", [["vertical-align", "middle"]]),
      e("align-bottom", [["vertical-align", "bottom"]]),
      e("align-text-top", [["vertical-align", "text-top"]]),
      e("align-text-bottom", [["vertical-align", "text-bottom"]]),
      e("align-sub", [["vertical-align", "sub"]]),
      e("align-super", [["vertical-align", "super"]]),
      o("align", { themeKeys: [], handle: (n) => [l("vertical-align", n)] }),
      r.functional("font", (n) => {
        if (!(!n.value || n.modifier)) {
          if (n.value.kind === "arbitrary") {
            let d = n.value.value;
            switch (
              n.value.dataType ??
              Y(d, ["number", "generic-name", "family-name"])
            ) {
              case "generic-name":
              case "family-name":
                return [l("font-family", d)];
              default:
                return [
                  I([$("--tw-font-weight")]),
                  l("--tw-font-weight", d),
                  l("font-weight", d),
                ];
            }
          }
          {
            let d = t.resolveWith(
              n.value.value,
              ["--font"],
              ["--font-feature-settings", "--font-variation-settings"]
            );
            if (d) {
              let [h, A = {}] = d;
              return [
                l("font-family", h),
                l("font-feature-settings", A["--font-feature-settings"]),
                l("font-variation-settings", A["--font-variation-settings"]),
              ];
            }
          }
          {
            let d = t.resolve(n.value.value, ["--font-weight"]);
            if (d)
              return [
                I([$("--tw-font-weight")]),
                l("--tw-font-weight", d),
                l("font-weight", d),
              ];
          }
        }
      }),
      i("font", () => [
        { values: [], valueThemeKeys: ["--font"] },
        { values: [], valueThemeKeys: ["--font-weight"] },
      ]),
      e("uppercase", [["text-transform", "uppercase"]]),
      e("lowercase", [["text-transform", "lowercase"]]),
      e("capitalize", [["text-transform", "capitalize"]]),
      e("normal-case", [["text-transform", "none"]]),
      e("italic", [["font-style", "italic"]]),
      e("not-italic", [["font-style", "normal"]]),
      e("underline", [["text-decoration-line", "underline"]]),
      e("overline", [["text-decoration-line", "overline"]]),
      e("line-through", [["text-decoration-line", "line-through"]]),
      e("no-underline", [["text-decoration-line", "none"]]),
      e("font-stretch-normal", [["font-stretch", "normal"]]),
      e("font-stretch-ultra-condensed", [["font-stretch", "ultra-condensed"]]),
      e("font-stretch-extra-condensed", [["font-stretch", "extra-condensed"]]),
      e("font-stretch-condensed", [["font-stretch", "condensed"]]),
      e("font-stretch-semi-condensed", [["font-stretch", "semi-condensed"]]),
      e("font-stretch-semi-expanded", [["font-stretch", "semi-expanded"]]),
      e("font-stretch-expanded", [["font-stretch", "expanded"]]),
      e("font-stretch-extra-expanded", [["font-stretch", "extra-expanded"]]),
      e("font-stretch-ultra-expanded", [["font-stretch", "ultra-expanded"]]),
      o("font-stretch", {
        handleBareValue: ({ value: n }) => {
          if (!n.endsWith("%")) return null;
          let d = Number(n.slice(0, -1));
          return !E(d) || Number.isNaN(d) || d < 50 || d > 200 ? null : n;
        },
        handle: (n) => [l("font-stretch", n)],
      }),
      i("font-stretch", () => [
        {
          values: [
            "50%",
            "75%",
            "90%",
            "95%",
            "100%",
            "105%",
            "110%",
            "125%",
            "150%",
            "200%",
          ],
        },
      ]),
      s("placeholder", {
        themeKeys: ["--background-color", "--color"],
        handle: (n) => [
          M("&::placeholder", [
            l("--tw-sort", "placeholder-color"),
            l("color", n),
          ]),
        ],
      }),
      e("decoration-solid", [["text-decoration-style", "solid"]]),
      e("decoration-double", [["text-decoration-style", "double"]]),
      e("decoration-dotted", [["text-decoration-style", "dotted"]]),
      e("decoration-dashed", [["text-decoration-style", "dashed"]]),
      e("decoration-wavy", [["text-decoration-style", "wavy"]]),
      e("decoration-auto", [["text-decoration-thickness", "auto"]]),
      e("decoration-from-font", [["text-decoration-thickness", "from-font"]]),
      r.functional("decoration", (n) => {
        if (n.value) {
          if (n.value.kind === "arbitrary") {
            let d = n.value.value;
            switch (
              n.value.dataType ??
              Y(d, ["color", "length", "percentage"])
            ) {
              case "length":
              case "percentage":
                return n.modifier
                  ? void 0
                  : [l("text-decoration-thickness", d)];
              default:
                return (
                  (d = X(d, n.modifier, t)),
                  d === null ? void 0 : [l("text-decoration-color", d)]
                );
            }
          }
          {
            let d = t.resolve(n.value.value, ["--text-decoration-thickness"]);
            if (d)
              return n.modifier ? void 0 : [l("text-decoration-thickness", d)];
            if (E(n.value.value))
              return n.modifier
                ? void 0
                : [l("text-decoration-thickness", `${n.value.value}px`)];
          }
          {
            let d = te(n, t, ["--text-decoration-color", "--color"]);
            if (d) return [l("text-decoration-color", d)];
          }
        }
      }),
      i("decoration", () => [
        {
          values: ["current", "inherit", "transparent"],
          valueThemeKeys: ["--text-decoration-color", "--color"],
          modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`),
        },
        {
          values: ["0", "1", "2"],
          valueThemeKeys: ["--text-decoration-thickness"],
        },
      ]),
      e("animate-none", [["animation", "none"]]),
      o("animate", {
        themeKeys: ["--animate"],
        handle: (n) => [l("animation", n)],
      });
    {
      let n = [
          "var(--tw-blur,)",
          "var(--tw-brightness,)",
          "var(--tw-contrast,)",
          "var(--tw-grayscale,)",
          "var(--tw-hue-rotate,)",
          "var(--tw-invert,)",
          "var(--tw-saturate,)",
          "var(--tw-sepia,)",
          "var(--tw-drop-shadow,)",
        ].join(" "),
        d = [
          "var(--tw-backdrop-blur,)",
          "var(--tw-backdrop-brightness,)",
          "var(--tw-backdrop-contrast,)",
          "var(--tw-backdrop-grayscale,)",
          "var(--tw-backdrop-hue-rotate,)",
          "var(--tw-backdrop-invert,)",
          "var(--tw-backdrop-opacity,)",
          "var(--tw-backdrop-saturate,)",
          "var(--tw-backdrop-sepia,)",
        ].join(" "),
        h = () =>
          I([
            $("--tw-blur"),
            $("--tw-brightness"),
            $("--tw-contrast"),
            $("--tw-grayscale"),
            $("--tw-hue-rotate"),
            $("--tw-invert"),
            $("--tw-opacity"),
            $("--tw-saturate"),
            $("--tw-sepia"),
            $("--tw-drop-shadow"),
            $("--tw-drop-shadow-color"),
            $("--tw-drop-shadow-alpha", "100%", "<percentage>"),
            $("--tw-drop-shadow-size"),
          ]),
        A = () =>
          I([
            $("--tw-backdrop-blur"),
            $("--tw-backdrop-brightness"),
            $("--tw-backdrop-contrast"),
            $("--tw-backdrop-grayscale"),
            $("--tw-backdrop-hue-rotate"),
            $("--tw-backdrop-invert"),
            $("--tw-backdrop-opacity"),
            $("--tw-backdrop-saturate"),
            $("--tw-backdrop-sepia"),
          ]);
      r.functional("filter", (w) => {
        if (!w.modifier) {
          if (w.value === null) return [h(), l("filter", n)];
          if (w.value.kind === "arbitrary") return [l("filter", w.value.value)];
          switch (w.value.value) {
            case "none":
              return [l("filter", "none")];
          }
        }
      }),
        r.functional("backdrop-filter", (w) => {
          if (!w.modifier) {
            if (w.value === null)
              return [
                A(),
                l("-webkit-backdrop-filter", d),
                l("backdrop-filter", d),
              ];
            if (w.value.kind === "arbitrary")
              return [
                l("-webkit-backdrop-filter", w.value.value),
                l("backdrop-filter", w.value.value),
              ];
            switch (w.value.value) {
              case "none":
                return [
                  l("-webkit-backdrop-filter", "none"),
                  l("backdrop-filter", "none"),
                ];
            }
          }
        }),
        o("blur", {
          themeKeys: ["--blur"],
          handle: (w) => [h(), l("--tw-blur", `blur(${w})`), l("filter", n)],
        }),
        e("blur-none", [h, ["--tw-blur", " "], ["filter", n]]),
        o("backdrop-blur", {
          themeKeys: ["--backdrop-blur", "--blur"],
          handle: (w) => [
            A(),
            l("--tw-backdrop-blur", `blur(${w})`),
            l("-webkit-backdrop-filter", d),
            l("backdrop-filter", d),
          ],
        }),
        e("backdrop-blur-none", [
          A,
          ["--tw-backdrop-blur", " "],
          ["-webkit-backdrop-filter", d],
          ["backdrop-filter", d],
        ]),
        o("brightness", {
          themeKeys: ["--brightness"],
          handleBareValue: ({ value: w }) => (E(w) ? `${w}%` : null),
          handle: (w) => [
            h(),
            l("--tw-brightness", `brightness(${w})`),
            l("filter", n),
          ],
        }),
        o("backdrop-brightness", {
          themeKeys: ["--backdrop-brightness", "--brightness"],
          handleBareValue: ({ value: w }) => (E(w) ? `${w}%` : null),
          handle: (w) => [
            A(),
            l("--tw-backdrop-brightness", `brightness(${w})`),
            l("-webkit-backdrop-filter", d),
            l("backdrop-filter", d),
          ],
        }),
        i("brightness", () => [
          {
            values: [
              "0",
              "50",
              "75",
              "90",
              "95",
              "100",
              "105",
              "110",
              "125",
              "150",
              "200",
            ],
            valueThemeKeys: ["--brightness"],
          },
        ]),
        i("backdrop-brightness", () => [
          {
            values: [
              "0",
              "50",
              "75",
              "90",
              "95",
              "100",
              "105",
              "110",
              "125",
              "150",
              "200",
            ],
            valueThemeKeys: ["--backdrop-brightness", "--brightness"],
          },
        ]),
        o("contrast", {
          themeKeys: ["--contrast"],
          handleBareValue: ({ value: w }) => (E(w) ? `${w}%` : null),
          handle: (w) => [
            h(),
            l("--tw-contrast", `contrast(${w})`),
            l("filter", n),
          ],
        }),
        o("backdrop-contrast", {
          themeKeys: ["--backdrop-contrast", "--contrast"],
          handleBareValue: ({ value: w }) => (E(w) ? `${w}%` : null),
          handle: (w) => [
            A(),
            l("--tw-backdrop-contrast", `contrast(${w})`),
            l("-webkit-backdrop-filter", d),
            l("backdrop-filter", d),
          ],
        }),
        i("contrast", () => [
          {
            values: ["0", "50", "75", "100", "125", "150", "200"],
            valueThemeKeys: ["--contrast"],
          },
        ]),
        i("backdrop-contrast", () => [
          {
            values: ["0", "50", "75", "100", "125", "150", "200"],
            valueThemeKeys: ["--backdrop-contrast", "--contrast"],
          },
        ]),
        o("grayscale", {
          themeKeys: ["--grayscale"],
          handleBareValue: ({ value: w }) => (E(w) ? `${w}%` : null),
          defaultValue: "100%",
          handle: (w) => [
            h(),
            l("--tw-grayscale", `grayscale(${w})`),
            l("filter", n),
          ],
        }),
        o("backdrop-grayscale", {
          themeKeys: ["--backdrop-grayscale", "--grayscale"],
          handleBareValue: ({ value: w }) => (E(w) ? `${w}%` : null),
          defaultValue: "100%",
          handle: (w) => [
            A(),
            l("--tw-backdrop-grayscale", `grayscale(${w})`),
            l("-webkit-backdrop-filter", d),
            l("backdrop-filter", d),
          ],
        }),
        i("grayscale", () => [
          {
            values: ["0", "25", "50", "75", "100"],
            valueThemeKeys: ["--grayscale"],
            hasDefaultValue: !0,
          },
        ]),
        i("backdrop-grayscale", () => [
          {
            values: ["0", "25", "50", "75", "100"],
            valueThemeKeys: ["--backdrop-grayscale", "--grayscale"],
            hasDefaultValue: !0,
          },
        ]),
        o("hue-rotate", {
          supportsNegative: !0,
          themeKeys: ["--hue-rotate"],
          handleBareValue: ({ value: w }) => (E(w) ? `${w}deg` : null),
          handle: (w) => [
            h(),
            l("--tw-hue-rotate", `hue-rotate(${w})`),
            l("filter", n),
          ],
        }),
        o("backdrop-hue-rotate", {
          supportsNegative: !0,
          themeKeys: ["--backdrop-hue-rotate", "--hue-rotate"],
          handleBareValue: ({ value: w }) => (E(w) ? `${w}deg` : null),
          handle: (w) => [
            A(),
            l("--tw-backdrop-hue-rotate", `hue-rotate(${w})`),
            l("-webkit-backdrop-filter", d),
            l("backdrop-filter", d),
          ],
        }),
        i("hue-rotate", () => [
          {
            values: ["0", "15", "30", "60", "90", "180"],
            valueThemeKeys: ["--hue-rotate"],
          },
        ]),
        i("backdrop-hue-rotate", () => [
          {
            values: ["0", "15", "30", "60", "90", "180"],
            valueThemeKeys: ["--backdrop-hue-rotate", "--hue-rotate"],
          },
        ]),
        o("invert", {
          themeKeys: ["--invert"],
          handleBareValue: ({ value: w }) => (E(w) ? `${w}%` : null),
          defaultValue: "100%",
          handle: (w) => [
            h(),
            l("--tw-invert", `invert(${w})`),
            l("filter", n),
          ],
        }),
        o("backdrop-invert", {
          themeKeys: ["--backdrop-invert", "--invert"],
          handleBareValue: ({ value: w }) => (E(w) ? `${w}%` : null),
          defaultValue: "100%",
          handle: (w) => [
            A(),
            l("--tw-backdrop-invert", `invert(${w})`),
            l("-webkit-backdrop-filter", d),
            l("backdrop-filter", d),
          ],
        }),
        i("invert", () => [
          {
            values: ["0", "25", "50", "75", "100"],
            valueThemeKeys: ["--invert"],
            hasDefaultValue: !0,
          },
        ]),
        i("backdrop-invert", () => [
          {
            values: ["0", "25", "50", "75", "100"],
            valueThemeKeys: ["--backdrop-invert", "--invert"],
            hasDefaultValue: !0,
          },
        ]),
        o("saturate", {
          themeKeys: ["--saturate"],
          handleBareValue: ({ value: w }) => (E(w) ? `${w}%` : null),
          handle: (w) => [
            h(),
            l("--tw-saturate", `saturate(${w})`),
            l("filter", n),
          ],
        }),
        o("backdrop-saturate", {
          themeKeys: ["--backdrop-saturate", "--saturate"],
          handleBareValue: ({ value: w }) => (E(w) ? `${w}%` : null),
          handle: (w) => [
            A(),
            l("--tw-backdrop-saturate", `saturate(${w})`),
            l("-webkit-backdrop-filter", d),
            l("backdrop-filter", d),
          ],
        }),
        i("saturate", () => [
          {
            values: ["0", "50", "100", "150", "200"],
            valueThemeKeys: ["--saturate"],
          },
        ]),
        i("backdrop-saturate", () => [
          {
            values: ["0", "50", "100", "150", "200"],
            valueThemeKeys: ["--backdrop-saturate", "--saturate"],
          },
        ]),
        o("sepia", {
          themeKeys: ["--sepia"],
          handleBareValue: ({ value: w }) => (E(w) ? `${w}%` : null),
          defaultValue: "100%",
          handle: (w) => [h(), l("--tw-sepia", `sepia(${w})`), l("filter", n)],
        }),
        o("backdrop-sepia", {
          themeKeys: ["--backdrop-sepia", "--sepia"],
          handleBareValue: ({ value: w }) => (E(w) ? `${w}%` : null),
          defaultValue: "100%",
          handle: (w) => [
            A(),
            l("--tw-backdrop-sepia", `sepia(${w})`),
            l("-webkit-backdrop-filter", d),
            l("backdrop-filter", d),
          ],
        }),
        i("sepia", () => [
          {
            values: ["0", "50", "100"],
            valueThemeKeys: ["--sepia"],
            hasDefaultValue: !0,
          },
        ]),
        i("backdrop-sepia", () => [
          {
            values: ["0", "50", "100"],
            valueThemeKeys: ["--backdrop-sepia", "--sepia"],
            hasDefaultValue: !0,
          },
        ]),
        e("drop-shadow-none", [h, ["--tw-drop-shadow", " "], ["filter", n]]),
        r.functional("drop-shadow", (w) => {
          let C;
          if (
            (w.modifier &&
              (w.modifier.kind === "arbitrary"
                ? (C = w.modifier.value)
                : E(w.modifier.value) && (C = `${w.modifier.value}%`)),
            !w.value)
          ) {
            let O = t.get(["--drop-shadow"]),
              S = t.resolve(null, ["--drop-shadow"]);
            return O === null || S === null
              ? void 0
              : [
                  h(),
                  l("--tw-drop-shadow-alpha", C),
                  ...lt(
                    "--tw-drop-shadow-size",
                    O,
                    C,
                    (T) => `var(--tw-drop-shadow-color, ${T})`
                  ),
                  l(
                    "--tw-drop-shadow",
                    z(S, ",")
                      .map((T) => `drop-shadow(${T})`)
                      .join(" ")
                  ),
                  l("filter", n),
                ];
          }
          if (w.value.kind === "arbitrary") {
            let O = w.value.value;
            switch (w.value.dataType ?? Y(O, ["color"])) {
              case "color":
                return (
                  (O = X(O, w.modifier, t)),
                  O === null
                    ? void 0
                    : [
                        h(),
                        l(
                          "--tw-drop-shadow-color",
                          Z(O, "var(--tw-drop-shadow-alpha)")
                        ),
                        l("--tw-drop-shadow", "var(--tw-drop-shadow-size)"),
                      ]
                );
              default:
                return w.modifier && !C
                  ? void 0
                  : [
                      h(),
                      l("--tw-drop-shadow-alpha", C),
                      ...lt(
                        "--tw-drop-shadow-size",
                        O,
                        C,
                        (T) => `var(--tw-drop-shadow-color, ${T})`
                      ),
                      l("--tw-drop-shadow", "var(--tw-drop-shadow-size)"),
                      l("filter", n),
                    ];
            }
          }
          {
            let O = t.get([`--drop-shadow-${w.value.value}`]),
              S = t.resolve(w.value.value, ["--drop-shadow"]);
            if (O && S)
              return w.modifier && !C
                ? void 0
                : C
                ? [
                    h(),
                    l("--tw-drop-shadow-alpha", C),
                    ...lt(
                      "--tw-drop-shadow-size",
                      O,
                      C,
                      (T) => `var(--tw-drop-shadow-color, ${T})`
                    ),
                    l("--tw-drop-shadow", "var(--tw-drop-shadow-size)"),
                    l("filter", n),
                  ]
                : [
                    h(),
                    l("--tw-drop-shadow-alpha", C),
                    ...lt(
                      "--tw-drop-shadow-size",
                      O,
                      C,
                      (T) => `var(--tw-drop-shadow-color, ${T})`
                    ),
                    l(
                      "--tw-drop-shadow",
                      z(S, ",")
                        .map((T) => `drop-shadow(${T})`)
                        .join(" ")
                    ),
                    l("filter", n),
                  ];
          }
          {
            let O = te(w, t, ["--drop-shadow-color", "--color"]);
            if (O)
              return O === "inherit"
                ? [
                    h(),
                    l("--tw-drop-shadow-color", "inherit"),
                    l("--tw-drop-shadow", "var(--tw-drop-shadow-size)"),
                  ]
                : [
                    h(),
                    l(
                      "--tw-drop-shadow-color",
                      Z(O, "var(--tw-drop-shadow-alpha)")
                    ),
                    l("--tw-drop-shadow", "var(--tw-drop-shadow-size)"),
                  ];
          }
        }),
        i("drop-shadow", () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--drop-shadow-color", "--color"],
            modifiers: Array.from({ length: 21 }, (w, C) => `${C * 5}`),
          },
          { valueThemeKeys: ["--drop-shadow"] },
        ]),
        o("backdrop-opacity", {
          themeKeys: ["--backdrop-opacity", "--opacity"],
          handleBareValue: ({ value: w }) => (nt(w) ? `${w}%` : null),
          handle: (w) => [
            A(),
            l("--tw-backdrop-opacity", `opacity(${w})`),
            l("-webkit-backdrop-filter", d),
            l("backdrop-filter", d),
          ],
        }),
        i("backdrop-opacity", () => [
          {
            values: Array.from({ length: 21 }, (w, C) => `${C * 5}`),
            valueThemeKeys: ["--backdrop-opacity", "--opacity"],
          },
        ]);
    }
    {
      let n = `var(--tw-ease, ${
          t.resolve(null, ["--default-transition-timing-function"]) ?? "ease"
        })`,
        d = `var(--tw-duration, ${
          t.resolve(null, ["--default-transition-duration"]) ?? "0s"
        })`;
      e("transition-none", [["transition-property", "none"]]),
        e("transition-all", [
          ["transition-property", "all"],
          ["transition-timing-function", n],
          ["transition-duration", d],
        ]),
        e("transition-colors", [
          [
            "transition-property",
            "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
          ],
          ["transition-timing-function", n],
          ["transition-duration", d],
        ]),
        e("transition-opacity", [
          ["transition-property", "opacity"],
          ["transition-timing-function", n],
          ["transition-duration", d],
        ]),
        e("transition-shadow", [
          ["transition-property", "box-shadow"],
          ["transition-timing-function", n],
          ["transition-duration", d],
        ]),
        e("transition-transform", [
          ["transition-property", "transform, translate, scale, rotate"],
          ["transition-timing-function", n],
          ["transition-duration", d],
        ]),
        o("transition", {
          defaultValue:
            "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, visibility, content-visibility, overlay, pointer-events",
          themeKeys: ["--transition-property"],
          handle: (h) => [
            l("transition-property", h),
            l("transition-timing-function", n),
            l("transition-duration", d),
          ],
        }),
        e("transition-discrete", [["transition-behavior", "allow-discrete"]]),
        e("transition-normal", [["transition-behavior", "normal"]]),
        o("delay", {
          handleBareValue: ({ value: h }) => (E(h) ? `${h}ms` : null),
          themeKeys: ["--transition-delay"],
          handle: (h) => [l("transition-delay", h)],
        });
      {
        let h = () => I([$("--tw-duration")]);
        e("duration-initial", [h, ["--tw-duration", "initial"]]),
          r.functional("duration", (A) => {
            if (A.modifier || !A.value) return;
            let w = null;
            if (
              (A.value.kind === "arbitrary"
                ? (w = A.value.value)
                : ((w = t.resolve(A.value.fraction ?? A.value.value, [
                    "--transition-duration",
                  ])),
                  w === null && E(A.value.value) && (w = `${A.value.value}ms`)),
              w !== null)
            )
              return [h(), l("--tw-duration", w), l("transition-duration", w)];
          });
      }
      i("delay", () => [
        {
          values: ["75", "100", "150", "200", "300", "500", "700", "1000"],
          valueThemeKeys: ["--transition-delay"],
        },
      ]),
        i("duration", () => [
          {
            values: ["75", "100", "150", "200", "300", "500", "700", "1000"],
            valueThemeKeys: ["--transition-duration"],
          },
        ]);
    }
    {
      let n = () => I([$("--tw-ease")]);
      e("ease-initial", [n, ["--tw-ease", "initial"]]),
        e("ease-linear", [
          n,
          ["--tw-ease", "linear"],
          ["transition-timing-function", "linear"],
        ]),
        o("ease", {
          themeKeys: ["--ease"],
          handle: (d) => [
            n(),
            l("--tw-ease", d),
            l("transition-timing-function", d),
          ],
        });
    }
    e("will-change-auto", [["will-change", "auto"]]),
      e("will-change-scroll", [["will-change", "scroll-position"]]),
      e("will-change-contents", [["will-change", "contents"]]),
      e("will-change-transform", [["will-change", "transform"]]),
      o("will-change", { themeKeys: [], handle: (n) => [l("will-change", n)] }),
      e("content-none", [
        ["--tw-content", "none"],
        ["content", "none"],
      ]),
      o("content", {
        themeKeys: [],
        handle: (n) => [
          I([$("--tw-content", '""')]),
          l("--tw-content", n),
          l("content", "var(--tw-content)"),
        ],
      });
    {
      let n =
          "var(--tw-contain-size,) var(--tw-contain-layout,) var(--tw-contain-paint,) var(--tw-contain-style,)",
        d = () =>
          I([
            $("--tw-contain-size"),
            $("--tw-contain-layout"),
            $("--tw-contain-paint"),
            $("--tw-contain-style"),
          ]);
      e("contain-none", [["contain", "none"]]),
        e("contain-content", [["contain", "content"]]),
        e("contain-strict", [["contain", "strict"]]),
        e("contain-size", [d, ["--tw-contain-size", "size"], ["contain", n]]),
        e("contain-inline-size", [
          d,
          ["--tw-contain-size", "inline-size"],
          ["contain", n],
        ]),
        e("contain-layout", [
          d,
          ["--tw-contain-layout", "layout"],
          ["contain", n],
        ]),
        e("contain-paint", [
          d,
          ["--tw-contain-paint", "paint"],
          ["contain", n],
        ]),
        e("contain-style", [
          d,
          ["--tw-contain-style", "style"],
          ["contain", n],
        ]),
        o("contain", { themeKeys: [], handle: (h) => [l("contain", h)] });
    }
    e("forced-color-adjust-none", [["forced-color-adjust", "none"]]),
      e("forced-color-adjust-auto", [["forced-color-adjust", "auto"]]),
      e("leading-none", [
        () => I([$("--tw-leading")]),
        ["--tw-leading", "1"],
        ["line-height", "1"],
      ]),
      a("leading", ["--leading", "--spacing"], (n) => [
        I([$("--tw-leading")]),
        l("--tw-leading", n),
        l("line-height", n),
      ]),
      o("tracking", {
        supportsNegative: !0,
        themeKeys: ["--tracking"],
        handle: (n) => [
          I([$("--tw-tracking")]),
          l("--tw-tracking", n),
          l("letter-spacing", n),
        ],
      }),
      e("antialiased", [
        ["-webkit-font-smoothing", "antialiased"],
        ["-moz-osx-font-smoothing", "grayscale"],
      ]),
      e("subpixel-antialiased", [
        ["-webkit-font-smoothing", "auto"],
        ["-moz-osx-font-smoothing", "auto"],
      ]);
    {
      let n =
          "var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)",
        d = () =>
          I([
            $("--tw-ordinal"),
            $("--tw-slashed-zero"),
            $("--tw-numeric-figure"),
            $("--tw-numeric-spacing"),
            $("--tw-numeric-fraction"),
          ]);
      e("normal-nums", [["font-variant-numeric", "normal"]]),
        e("ordinal", [
          d,
          ["--tw-ordinal", "ordinal"],
          ["font-variant-numeric", n],
        ]),
        e("slashed-zero", [
          d,
          ["--tw-slashed-zero", "slashed-zero"],
          ["font-variant-numeric", n],
        ]),
        e("lining-nums", [
          d,
          ["--tw-numeric-figure", "lining-nums"],
          ["font-variant-numeric", n],
        ]),
        e("oldstyle-nums", [
          d,
          ["--tw-numeric-figure", "oldstyle-nums"],
          ["font-variant-numeric", n],
        ]),
        e("proportional-nums", [
          d,
          ["--tw-numeric-spacing", "proportional-nums"],
          ["font-variant-numeric", n],
        ]),
        e("tabular-nums", [
          d,
          ["--tw-numeric-spacing", "tabular-nums"],
          ["font-variant-numeric", n],
        ]),
        e("diagonal-fractions", [
          d,
          ["--tw-numeric-fraction", "diagonal-fractions"],
          ["font-variant-numeric", n],
        ]),
        e("stacked-fractions", [
          d,
          ["--tw-numeric-fraction", "stacked-fractions"],
          ["font-variant-numeric", n],
        ]);
    }
    {
      let n = () => I([$("--tw-outline-style", "solid")]);
      r.static("outline-hidden", () => [
        l("--tw-outline-style", "none"),
        l("outline-style", "none"),
        F("@media", "(forced-colors: active)", [
          l("outline", "2px solid transparent"),
          l("outline-offset", "2px"),
        ]),
      ]),
        e("outline-none", [
          ["--tw-outline-style", "none"],
          ["outline-style", "none"],
        ]),
        e("outline-solid", [
          ["--tw-outline-style", "solid"],
          ["outline-style", "solid"],
        ]),
        e("outline-dashed", [
          ["--tw-outline-style", "dashed"],
          ["outline-style", "dashed"],
        ]),
        e("outline-dotted", [
          ["--tw-outline-style", "dotted"],
          ["outline-style", "dotted"],
        ]),
        e("outline-double", [
          ["--tw-outline-style", "double"],
          ["outline-style", "double"],
        ]),
        r.functional("outline", (d) => {
          if (d.value === null) {
            if (d.modifier) return;
            let h = t.get(["--default-outline-width"]) ?? "1px";
            return [
              n(),
              l("outline-style", "var(--tw-outline-style)"),
              l("outline-width", h),
            ];
          }
          if (d.value.kind === "arbitrary") {
            let h = d.value.value;
            switch (
              d.value.dataType ??
              Y(h, ["color", "length", "number", "percentage"])
            ) {
              case "length":
              case "number":
              case "percentage":
                return d.modifier
                  ? void 0
                  : [
                      n(),
                      l("outline-style", "var(--tw-outline-style)"),
                      l("outline-width", h),
                    ];
              default:
                return (
                  (h = X(h, d.modifier, t)),
                  h === null ? void 0 : [l("outline-color", h)]
                );
            }
          }
          {
            let h = te(d, t, ["--outline-color", "--color"]);
            if (h) return [l("outline-color", h)];
          }
          {
            if (d.modifier) return;
            let h = t.resolve(d.value.value, ["--outline-width"]);
            if (h)
              return [
                n(),
                l("outline-style", "var(--tw-outline-style)"),
                l("outline-width", h),
              ];
            if (E(d.value.value))
              return [
                n(),
                l("outline-style", "var(--tw-outline-style)"),
                l("outline-width", `${d.value.value}px`),
              ];
          }
        }),
        i("outline", () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--outline-color", "--color"],
            modifiers: Array.from({ length: 21 }, (d, h) => `${h * 5}`),
            hasDefaultValue: !0,
          },
          {
            values: ["0", "1", "2", "4", "8"],
            valueThemeKeys: ["--outline-width"],
          },
        ]),
        o("outline-offset", {
          supportsNegative: !0,
          themeKeys: ["--outline-offset"],
          handleBareValue: ({ value: d }) => (E(d) ? `${d}px` : null),
          handle: (d) => [l("outline-offset", d)],
        }),
        i("outline-offset", () => [
          {
            supportsNegative: !0,
            values: ["0", "1", "2", "4", "8"],
            valueThemeKeys: ["--outline-offset"],
          },
        ]);
    }
    o("opacity", {
      themeKeys: ["--opacity"],
      handleBareValue: ({ value: n }) => (nt(n) ? `${n}%` : null),
      handle: (n) => [l("opacity", n)],
    }),
      i("opacity", () => [
        {
          values: Array.from({ length: 21 }, (n, d) => `${d * 5}`),
          valueThemeKeys: ["--opacity"],
        },
      ]),
      e("underline-offset-auto", [["text-underline-offset", "auto"]]),
      o("underline-offset", {
        supportsNegative: !0,
        themeKeys: ["--text-underline-offset"],
        handleBareValue: ({ value: n }) => (E(n) ? `${n}px` : null),
        handle: (n) => [l("text-underline-offset", n)],
      }),
      i("underline-offset", () => [
        {
          supportsNegative: !0,
          values: ["0", "1", "2", "4", "8"],
          valueThemeKeys: ["--text-underline-offset"],
        },
      ]),
      r.functional("text", (n) => {
        if (n.value) {
          if (n.value.kind === "arbitrary") {
            let d = n.value.value;
            switch (
              n.value.dataType ??
              Y(d, [
                "color",
                "length",
                "percentage",
                "absolute-size",
                "relative-size",
              ])
            ) {
              case "size":
              case "length":
              case "percentage":
              case "absolute-size":
              case "relative-size": {
                if (n.modifier) {
                  let A =
                    n.modifier.kind === "arbitrary"
                      ? n.modifier.value
                      : t.resolve(n.modifier.value, ["--leading"]);
                  if (!A && xe(n.modifier.value)) {
                    let w = t.resolve(null, ["--spacing"]);
                    if (!w) return null;
                    A = `calc(${w} * ${n.modifier.value})`;
                  }
                  return (
                    !A && n.modifier.value === "none" && (A = "1"),
                    A ? [l("font-size", d), l("line-height", A)] : null
                  );
                }
                return [l("font-size", d)];
              }
              default:
                return (
                  (d = X(d, n.modifier, t)),
                  d === null ? void 0 : [l("color", d)]
                );
            }
          }
          {
            let d = te(n, t, ["--text-color", "--color"]);
            if (d) return [l("color", d)];
          }
          {
            let d = t.resolveWith(
              n.value.value,
              ["--text"],
              ["--line-height", "--letter-spacing", "--font-weight"]
            );
            if (d) {
              let [h, A = {}] = Array.isArray(d) ? d : [d];
              if (n.modifier) {
                let w =
                  n.modifier.kind === "arbitrary"
                    ? n.modifier.value
                    : t.resolve(n.modifier.value, ["--leading"]);
                if (!w && xe(n.modifier.value)) {
                  let O = t.resolve(null, ["--spacing"]);
                  if (!O) return null;
                  w = `calc(${O} * ${n.modifier.value})`;
                }
                if ((!w && n.modifier.value === "none" && (w = "1"), !w))
                  return null;
                let C = [l("font-size", h)];
                return w && C.push(l("line-height", w)), C;
              }
              return typeof A == "string"
                ? [l("font-size", h), l("line-height", A)]
                : [
                    l("font-size", h),
                    l(
                      "line-height",
                      A["--line-height"]
                        ? `var(--tw-leading, ${A["--line-height"]})`
                        : void 0
                    ),
                    l(
                      "letter-spacing",
                      A["--letter-spacing"]
                        ? `var(--tw-tracking, ${A["--letter-spacing"]})`
                        : void 0
                    ),
                    l(
                      "font-weight",
                      A["--font-weight"]
                        ? `var(--tw-font-weight, ${A["--font-weight"]})`
                        : void 0
                    ),
                  ];
            }
          }
        }
      }),
      i("text", () => [
        {
          values: ["current", "inherit", "transparent"],
          valueThemeKeys: ["--text-color", "--color"],
          modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`),
        },
        {
          values: [],
          valueThemeKeys: ["--text"],
          modifiers: [],
          modifierThemeKeys: ["--leading"],
        },
      ]);
    let K = () =>
      I([
        $("--tw-text-shadow-color"),
        $("--tw-text-shadow-alpha", "100%", "<percentage>"),
      ]);
    e("text-shadow-initial", [K, ["--tw-text-shadow-color", "initial"]]),
      r.functional("text-shadow", (n) => {
        let d;
        if (
          (n.modifier &&
            (n.modifier.kind === "arbitrary"
              ? (d = n.modifier.value)
              : E(n.modifier.value) && (d = `${n.modifier.value}%`)),
          !n.value)
        ) {
          let h = t.get(["--text-shadow"]);
          return h === null
            ? void 0
            : [
                K(),
                l("--tw-text-shadow-alpha", d),
                ...pe(
                  "text-shadow",
                  h,
                  d,
                  (A) => `var(--tw-text-shadow-color, ${A})`
                ),
              ];
        }
        if (n.value.kind === "arbitrary") {
          let h = n.value.value;
          switch (n.value.dataType ?? Y(h, ["color"])) {
            case "color":
              return (
                (h = X(h, n.modifier, t)),
                h === null
                  ? void 0
                  : [
                      K(),
                      l(
                        "--tw-text-shadow-color",
                        Z(h, "var(--tw-text-shadow-alpha)")
                      ),
                    ]
              );
            default:
              return [
                K(),
                l("--tw-text-shadow-alpha", d),
                ...pe(
                  "text-shadow",
                  h,
                  d,
                  (w) => `var(--tw-text-shadow-color, ${w})`
                ),
              ];
          }
        }
        switch (n.value.value) {
          case "none":
            return n.modifier ? void 0 : [K(), l("text-shadow", "none")];
          case "inherit":
            return n.modifier
              ? void 0
              : [K(), l("--tw-text-shadow-color", "inherit")];
        }
        {
          let h = t.get([`--text-shadow-${n.value.value}`]);
          if (h)
            return [
              K(),
              l("--tw-text-shadow-alpha", d),
              ...pe(
                "text-shadow",
                h,
                d,
                (A) => `var(--tw-text-shadow-color, ${A})`
              ),
            ];
        }
        {
          let h = te(n, t, ["--text-shadow-color", "--color"]);
          if (h)
            return [
              K(),
              l("--tw-text-shadow-color", Z(h, "var(--tw-text-shadow-alpha)")),
            ];
        }
      }),
      i("text-shadow", () => [
        {
          values: ["current", "inherit", "transparent"],
          valueThemeKeys: ["--text-shadow-color", "--color"],
          modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`),
        },
        { values: ["none"] },
        {
          valueThemeKeys: ["--text-shadow"],
          modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`),
          hasDefaultValue: t.get(["--text-shadow"]) !== null,
        },
      ]);
    {
      let w = function (S) {
          return `var(--tw-ring-inset,) 0 0 0 calc(${S} + var(--tw-ring-offset-width)) var(--tw-ring-color, ${A})`;
        },
        C = function (S) {
          return `inset 0 0 0 ${S} var(--tw-inset-ring-color, currentcolor)`;
        };
      var Q = w,
        oe = C;
      let n = [
          "var(--tw-inset-shadow)",
          "var(--tw-inset-ring-shadow)",
          "var(--tw-ring-offset-shadow)",
          "var(--tw-ring-shadow)",
          "var(--tw-shadow)",
        ].join(", "),
        d = "0 0 #0000",
        h = () =>
          I([
            $("--tw-shadow", d),
            $("--tw-shadow-color"),
            $("--tw-shadow-alpha", "100%", "<percentage>"),
            $("--tw-inset-shadow", d),
            $("--tw-inset-shadow-color"),
            $("--tw-inset-shadow-alpha", "100%", "<percentage>"),
            $("--tw-ring-color"),
            $("--tw-ring-shadow", d),
            $("--tw-inset-ring-color"),
            $("--tw-inset-ring-shadow", d),
            $("--tw-ring-inset"),
            $("--tw-ring-offset-width", "0px", "<length>"),
            $("--tw-ring-offset-color", "#fff"),
            $("--tw-ring-offset-shadow", d),
          ]);
      e("shadow-initial", [h, ["--tw-shadow-color", "initial"]]),
        r.functional("shadow", (S) => {
          let T;
          if (
            (S.modifier &&
              (S.modifier.kind === "arbitrary"
                ? (T = S.modifier.value)
                : E(S.modifier.value) && (T = `${S.modifier.value}%`)),
            !S.value)
          ) {
            let D = t.get(["--shadow"]);
            return D === null
              ? void 0
              : [
                  h(),
                  l("--tw-shadow-alpha", T),
                  ...pe(
                    "--tw-shadow",
                    D,
                    T,
                    (se) => `var(--tw-shadow-color, ${se})`
                  ),
                  l("box-shadow", n),
                ];
          }
          if (S.value.kind === "arbitrary") {
            let D = S.value.value;
            switch (S.value.dataType ?? Y(D, ["color"])) {
              case "color":
                return (
                  (D = X(D, S.modifier, t)),
                  D === null
                    ? void 0
                    : [
                        h(),
                        l("--tw-shadow-color", Z(D, "var(--tw-shadow-alpha)")),
                      ]
                );
              default:
                return [
                  h(),
                  l("--tw-shadow-alpha", T),
                  ...pe(
                    "--tw-shadow",
                    D,
                    T,
                    (bt) => `var(--tw-shadow-color, ${bt})`
                  ),
                  l("box-shadow", n),
                ];
            }
          }
          switch (S.value.value) {
            case "none":
              return S.modifier
                ? void 0
                : [h(), l("--tw-shadow", d), l("box-shadow", n)];
            case "inherit":
              return S.modifier
                ? void 0
                : [h(), l("--tw-shadow-color", "inherit")];
          }
          {
            let D = t.get([`--shadow-${S.value.value}`]);
            if (D)
              return [
                h(),
                l("--tw-shadow-alpha", T),
                ...pe(
                  "--tw-shadow",
                  D,
                  T,
                  (se) => `var(--tw-shadow-color, ${se})`
                ),
                l("box-shadow", n),
              ];
          }
          {
            let D = te(S, t, ["--box-shadow-color", "--color"]);
            if (D)
              return [
                h(),
                l("--tw-shadow-color", Z(D, "var(--tw-shadow-alpha)")),
              ];
          }
        }),
        i("shadow", () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--box-shadow-color", "--color"],
            modifiers: Array.from({ length: 21 }, (S, T) => `${T * 5}`),
          },
          { values: ["none"] },
          {
            valueThemeKeys: ["--shadow"],
            modifiers: Array.from({ length: 21 }, (S, T) => `${T * 5}`),
            hasDefaultValue: t.get(["--shadow"]) !== null,
          },
        ]),
        e("inset-shadow-initial", [h, ["--tw-inset-shadow-color", "initial"]]),
        r.functional("inset-shadow", (S) => {
          let T;
          if (
            (S.modifier &&
              (S.modifier.kind === "arbitrary"
                ? (T = S.modifier.value)
                : E(S.modifier.value) && (T = `${S.modifier.value}%`)),
            !S.value)
          ) {
            let D = t.get(["--inset-shadow"]);
            return D === null
              ? void 0
              : [
                  h(),
                  l("--tw-inset-shadow-alpha", T),
                  ...pe(
                    "--tw-inset-shadow",
                    D,
                    T,
                    (se) => `var(--tw-inset-shadow-color, ${se})`
                  ),
                  l("box-shadow", n),
                ];
          }
          if (S.value.kind === "arbitrary") {
            let D = S.value.value;
            switch (S.value.dataType ?? Y(D, ["color"])) {
              case "color":
                return (
                  (D = X(D, S.modifier, t)),
                  D === null
                    ? void 0
                    : [
                        h(),
                        l(
                          "--tw-inset-shadow-color",
                          Z(D, "var(--tw-inset-shadow-alpha)")
                        ),
                      ]
                );
              default:
                return [
                  h(),
                  l("--tw-inset-shadow-alpha", T),
                  ...pe(
                    "--tw-inset-shadow",
                    D,
                    T,
                    (bt) => `var(--tw-inset-shadow-color, ${bt})`,
                    "inset "
                  ),
                  l("box-shadow", n),
                ];
            }
          }
          switch (S.value.value) {
            case "none":
              return S.modifier
                ? void 0
                : [h(), l("--tw-inset-shadow", d), l("box-shadow", n)];
            case "inherit":
              return S.modifier
                ? void 0
                : [h(), l("--tw-inset-shadow-color", "inherit")];
          }
          {
            let D = t.get([`--inset-shadow-${S.value.value}`]);
            if (D)
              return [
                h(),
                l("--tw-inset-shadow-alpha", T),
                ...pe(
                  "--tw-inset-shadow",
                  D,
                  T,
                  (se) => `var(--tw-inset-shadow-color, ${se})`
                ),
                l("box-shadow", n),
              ];
          }
          {
            let D = te(S, t, ["--box-shadow-color", "--color"]);
            if (D)
              return [
                h(),
                l(
                  "--tw-inset-shadow-color",
                  Z(D, "var(--tw-inset-shadow-alpha)")
                ),
              ];
          }
        }),
        i("inset-shadow", () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--box-shadow-color", "--color"],
            modifiers: Array.from({ length: 21 }, (S, T) => `${T * 5}`),
          },
          { values: ["none"] },
          {
            valueThemeKeys: ["--inset-shadow"],
            modifiers: Array.from({ length: 21 }, (S, T) => `${T * 5}`),
            hasDefaultValue: t.get(["--inset-shadow"]) !== null,
          },
        ]),
        e("ring-inset", [h, ["--tw-ring-inset", "inset"]]);
      let A = t.get(["--default-ring-color"]) ?? "currentcolor";
      r.functional("ring", (S) => {
        if (!S.value) {
          if (S.modifier) return;
          let T = t.get(["--default-ring-width"]) ?? "1px";
          return [h(), l("--tw-ring-shadow", w(T)), l("box-shadow", n)];
        }
        if (S.value.kind === "arbitrary") {
          let T = S.value.value;
          switch (S.value.dataType ?? Y(T, ["color", "length"])) {
            case "length":
              return S.modifier
                ? void 0
                : [h(), l("--tw-ring-shadow", w(T)), l("box-shadow", n)];
            default:
              return (
                (T = X(T, S.modifier, t)),
                T === null ? void 0 : [l("--tw-ring-color", T)]
              );
          }
        }
        {
          let T = te(S, t, ["--ring-color", "--color"]);
          if (T) return [l("--tw-ring-color", T)];
        }
        {
          if (S.modifier) return;
          let T = t.resolve(S.value.value, ["--ring-width"]);
          if ((T === null && E(S.value.value) && (T = `${S.value.value}px`), T))
            return [h(), l("--tw-ring-shadow", w(T)), l("box-shadow", n)];
        }
      }),
        i("ring", () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--ring-color", "--color"],
            modifiers: Array.from({ length: 21 }, (S, T) => `${T * 5}`),
          },
          {
            values: ["0", "1", "2", "4", "8"],
            valueThemeKeys: ["--ring-width"],
            hasDefaultValue: !0,
          },
        ]),
        r.functional("inset-ring", (S) => {
          if (!S.value)
            return S.modifier
              ? void 0
              : [
                  h(),
                  l("--tw-inset-ring-shadow", C("1px")),
                  l("box-shadow", n),
                ];
          if (S.value.kind === "arbitrary") {
            let T = S.value.value;
            switch (S.value.dataType ?? Y(T, ["color", "length"])) {
              case "length":
                return S.modifier
                  ? void 0
                  : [
                      h(),
                      l("--tw-inset-ring-shadow", C(T)),
                      l("box-shadow", n),
                    ];
              default:
                return (
                  (T = X(T, S.modifier, t)),
                  T === null ? void 0 : [l("--tw-inset-ring-color", T)]
                );
            }
          }
          {
            let T = te(S, t, ["--ring-color", "--color"]);
            if (T) return [l("--tw-inset-ring-color", T)];
          }
          {
            if (S.modifier) return;
            let T = t.resolve(S.value.value, ["--ring-width"]);
            if (
              (T === null && E(S.value.value) && (T = `${S.value.value}px`), T)
            )
              return [
                h(),
                l("--tw-inset-ring-shadow", C(T)),
                l("box-shadow", n),
              ];
          }
        }),
        i("inset-ring", () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--ring-color", "--color"],
            modifiers: Array.from({ length: 21 }, (S, T) => `${T * 5}`),
          },
          {
            values: ["0", "1", "2", "4", "8"],
            valueThemeKeys: ["--ring-width"],
            hasDefaultValue: !0,
          },
        ]);
      let O =
        "var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)";
      r.functional("ring-offset", (S) => {
        if (S.value) {
          if (S.value.kind === "arbitrary") {
            let T = S.value.value;
            switch (S.value.dataType ?? Y(T, ["color", "length"])) {
              case "length":
                return S.modifier
                  ? void 0
                  : [
                      l("--tw-ring-offset-width", T),
                      l("--tw-ring-offset-shadow", O),
                    ];
              default:
                return (
                  (T = X(T, S.modifier, t)),
                  T === null ? void 0 : [l("--tw-ring-offset-color", T)]
                );
            }
          }
          {
            let T = t.resolve(S.value.value, ["--ring-offset-width"]);
            if (T)
              return S.modifier
                ? void 0
                : [
                    l("--tw-ring-offset-width", T),
                    l("--tw-ring-offset-shadow", O),
                  ];
            if (E(S.value.value))
              return S.modifier
                ? void 0
                : [
                    l("--tw-ring-offset-width", `${S.value.value}px`),
                    l("--tw-ring-offset-shadow", O),
                  ];
          }
          {
            let T = te(S, t, ["--ring-offset-color", "--color"]);
            if (T) return [l("--tw-ring-offset-color", T)];
          }
        }
      });
    }
    return (
      i("ring-offset", () => [
        {
          values: ["current", "inherit", "transparent"],
          valueThemeKeys: ["--ring-offset-color", "--color"],
          modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`),
        },
        {
          values: ["0", "1", "2", "4", "8"],
          valueThemeKeys: ["--ring-offset-width"],
        },
      ]),
      r.functional("@container", (n) => {
        let d = null;
        if (
          (n.value === null
            ? (d = "inline-size")
            : n.value.kind === "arbitrary"
            ? (d = n.value.value)
            : n.value.kind === "named" &&
              n.value.value === "normal" &&
              (d = "normal"),
          d !== null)
        )
          return n.modifier
            ? [l("container-type", d), l("container-name", n.modifier.value)]
            : [l("container-type", d)];
      }),
      i("@container", () => [
        { values: ["normal"], valueThemeKeys: [], hasDefaultValue: !0 },
      ]),
      r
    );
  }
  var Kt = ["number", "integer", "ratio", "percentage"];
  function Pr(t) {
    let r = t.params;
    return Eo.test(r)
      ? (i) => {
          let e = {
            "--value": {
              usedSpacingInteger: !1,
              usedSpacingNumber: !1,
              themeKeys: new Set(),
              literals: new Set(),
            },
            "--modifier": {
              usedSpacingInteger: !1,
              usedSpacingNumber: !1,
              themeKeys: new Set(),
              literals: new Set(),
            },
          };
          L(t.nodes, (o) => {
            if (
              o.kind !== "declaration" ||
              !o.value ||
              (!o.value.includes("--value(") &&
                !o.value.includes("--modifier("))
            )
              return;
            let s = q(o.value);
            ee(s, (a) => {
              if (a.kind !== "function") return;
              if (
                a.value === "--spacing" &&
                !(
                  e["--modifier"].usedSpacingNumber &&
                  e["--value"].usedSpacingNumber
                )
              )
                return (
                  ee(a.nodes, (u) => {
                    if (
                      u.kind !== "function" ||
                      (u.value !== "--value" && u.value !== "--modifier")
                    )
                      return;
                    let c = u.value;
                    for (let g of u.nodes)
                      if (g.kind === "word") {
                        if (g.value === "integer")
                          e[c].usedSpacingInteger ||= !0;
                        else if (
                          g.value === "number" &&
                          ((e[c].usedSpacingNumber ||= !0),
                          e["--modifier"].usedSpacingNumber &&
                            e["--value"].usedSpacingNumber)
                        )
                          return 2;
                      }
                  }),
                  0
                );
              if (a.value !== "--value" && a.value !== "--modifier") return;
              let f = z(J(a.nodes), ",");
              for (let [u, c] of f.entries())
                (c = c.replace(/\\\*/g, "*")),
                  (c = c.replace(/--(.*?)\s--(.*?)/g, "--$1-*--$2")),
                  (c = c.replace(/\s+/g, "")),
                  (c = c.replace(/(-\*){2,}/g, "-*")),
                  c[0] === "-" &&
                    c[1] === "-" &&
                    !c.includes("-*") &&
                    (c += "-*"),
                  (f[u] = c);
              a.nodes = q(f.join(","));
              for (let u of a.nodes)
                if (
                  u.kind === "word" &&
                  (u.value[0] === '"' || u.value[0] === "'") &&
                  u.value[0] === u.value[u.value.length - 1]
                ) {
                  let c = u.value.slice(1, -1);
                  e[a.value].literals.add(c);
                } else if (
                  u.kind === "word" &&
                  u.value[0] === "-" &&
                  u.value[1] === "-"
                ) {
                  let c = u.value.replace(/-\*.*$/g, "");
                  e[a.value].themeKeys.add(c);
                } else if (
                  u.kind === "word" &&
                  !(
                    u.value[0] === "[" && u.value[u.value.length - 1] === "]"
                  ) &&
                  !Kt.includes(u.value)
                ) {
                  console.warn(`Unsupported bare value data type: "${u.value}".
Only valid data types are: ${Kt.map((x) => `"${x}"`).join(", ")}.
`);
                  let c = u.value,
                    g = structuredClone(a),
                    p = "\xB6";
                  ee(g.nodes, (x, { replaceWith: y }) => {
                    x.kind === "word" &&
                      x.value === c &&
                      y({ kind: "word", value: p });
                  });
                  let m = "^".repeat(J([u]).length),
                    v = J([g]).indexOf(p),
                    k = ["```css", J([a]), " ".repeat(v) + m, "```"].join(`
`);
                  console.warn(k);
                }
            }),
              (o.value = J(s));
          }),
            i.utilities.functional(r.slice(0, -2), (o) => {
              let s = structuredClone(t),
                a = o.value,
                f = o.modifier;
              if (a === null) return;
              let u = !1,
                c = !1,
                g = !1,
                p = !1,
                m = new Map(),
                v = !1;
              if (
                (L([s], (k, { parent: x, replaceWith: y }) => {
                  if (
                    (x?.kind !== "rule" && x?.kind !== "at-rule") ||
                    k.kind !== "declaration" ||
                    !k.value
                  )
                    return;
                  let N = q(k.value);
                  (ee(N, (V, { replaceWith: R }) => {
                    if (V.kind === "function") {
                      if (V.value === "--value") {
                        u = !0;
                        let U = Vr(a, V, i);
                        return U
                          ? ((c = !0),
                            U.ratio ? (v = !0) : m.set(k, x),
                            R(U.nodes),
                            1)
                          : ((u ||= !1), y([]), 2);
                      } else if (V.value === "--modifier") {
                        if (f === null) return y([]), 2;
                        g = !0;
                        let U = Vr(f, V, i);
                        return U
                          ? ((p = !0), R(U.nodes), 1)
                          : ((g ||= !1), y([]), 2);
                      }
                    }
                  }) ?? 0) === 0 && (k.value = J(N));
                }),
                (u && !c) || (g && !p) || (v && p) || (f && !v && !p))
              )
                return null;
              if (v)
                for (let [k, x] of m) {
                  let y = x.nodes.indexOf(k);
                  y !== -1 && x.nodes.splice(y, 1);
                }
              return s.nodes;
            }),
            i.utilities.suggest(r.slice(0, -2), () => {
              let o = [],
                s = [];
              for (let [
                a,
                {
                  literals: f,
                  usedSpacingNumber: u,
                  usedSpacingInteger: c,
                  themeKeys: g,
                },
              ] of [
                [o, e["--value"]],
                [s, e["--modifier"]],
              ]) {
                for (let p of f) a.push(p);
                if (u) a.push(...at);
                else if (c) for (let p of at) E(p) && a.push(p);
                for (let p of i.theme.keysInNamespaces(g))
                  a.push(p.replace(Er, (m, v, k) => `${v}.${k}`));
              }
              return [{ values: o, modifiers: s }];
            });
        }
      : To.test(r)
      ? (i) => {
          i.utilities.static(r, () => structuredClone(t.nodes));
        }
      : null;
  }
  function Vr(t, r, i) {
    for (let e of r.nodes) {
      if (
        t.kind === "named" &&
        e.kind === "word" &&
        (e.value[0] === "'" || e.value[0] === '"') &&
        e.value[e.value.length - 1] === e.value[0] &&
        e.value.slice(1, -1) === t.value
      )
        return { nodes: q(t.value) };
      if (
        t.kind === "named" &&
        e.kind === "word" &&
        e.value[0] === "-" &&
        e.value[1] === "-"
      ) {
        let o = e.value;
        if (o.endsWith("-*")) {
          o = o.slice(0, -2);
          let s = i.theme.resolve(t.value, [o]);
          if (s) return { nodes: q(s) };
        } else {
          let s = o.split("-*");
          if (s.length <= 1) continue;
          let a = [s.shift()],
            f = i.theme.resolveWith(t.value, a, s);
          if (f) {
            let [, u = {}] = f;
            {
              let c = u[s.pop()];
              if (c) return { nodes: q(c) };
            }
          }
        }
      } else if (t.kind === "named" && e.kind === "word") {
        if (!Kt.includes(e.value)) continue;
        let o = e.value === "ratio" && "fraction" in t ? t.fraction : t.value;
        if (!o) continue;
        let s = Y(o, [e.value]);
        if (s === null) continue;
        if (s === "ratio") {
          let [a, f] = z(o, "/");
          if (!E(a) || !E(f)) continue;
        } else {
          if (s === "number" && !xe(o)) continue;
          if (s === "percentage" && !E(o.slice(0, -1))) continue;
        }
        return { nodes: q(o), ratio: s === "ratio" };
      } else if (
        t.kind === "arbitrary" &&
        e.kind === "word" &&
        e.value[0] === "[" &&
        e.value[e.value.length - 1] === "]"
      ) {
        let o = e.value.slice(1, -1);
        if (o === "*") return { nodes: q(t.value) };
        if ("dataType" in t && t.dataType && t.dataType !== o) continue;
        if ("dataType" in t && t.dataType) return { nodes: q(t.value) };
        if (Y(t.value, [o]) !== null) return { nodes: q(t.value) };
      }
    }
  }
  function pe(t, r, i, e, o = "") {
    let s = !1,
      a = De(r, (u) =>
        i == null
          ? e(u)
          : u.startsWith("current")
          ? e(Z(u, i))
          : ((u.startsWith("var(") || i.startsWith("var(")) && (s = !0),
            e(Tr(u, i)))
      );
    function f(u) {
      return o
        ? z(u, ",")
            .map((c) => o + c)
            .join(",")
        : u;
    }
    return s
      ? [
          l(t, f(De(r, e))),
          G("@supports (color: lab(from red l a b))", [l(t, f(a))]),
        ]
      : [l(t, f(a))];
  }
  function lt(t, r, i, e, o = "") {
    let s = !1,
      a = z(r, ",")
        .map((f) =>
          De(f, (u) =>
            i == null
              ? e(u)
              : u.startsWith("current")
              ? e(Z(u, i))
              : ((u.startsWith("var(") || i.startsWith("var(")) && (s = !0),
                e(Tr(u, i)))
          )
        )
        .map((f) => `drop-shadow(${f})`)
        .join(" ");
    return s
      ? [
          l(
            t,
            o +
              z(r, ",")
                .map((f) => `drop-shadow(${De(f, e)})`)
                .join(" ")
          ),
          G("@supports (color: lab(from red l a b))", [l(t, o + a)]),
        ]
      : [l(t, o + a)];
  }
  var Dt = { "--alpha": Ro, "--spacing": Po, "--theme": Oo, theme: _o };
  function Ro(t, r, i, ...e) {
    let [o, s] = z(i, "/").map((a) => a.trim());
    if (!o || !s)
      throw new Error(
        `The --alpha(\u2026) function requires a color and an alpha value, e.g.: \`--alpha(${
          o || "var(--my-color)"
        } / ${s || "50%"})\``
      );
    if (e.length > 0)
      throw new Error(
        `The --alpha(\u2026) function only accepts one argument, e.g.: \`--alpha(${
          o || "var(--my-color)"
        } / ${s || "50%"})\``
      );
    return Z(o, s);
  }
  function Po(t, r, i, ...e) {
    if (!i)
      throw new Error(
        "The --spacing(\u2026) function requires an argument, but received none."
      );
    if (e.length > 0)
      throw new Error(
        `The --spacing(\u2026) function only accepts a single argument, but received ${
          e.length + 1
        }.`
      );
    let o = t.theme.resolve(null, ["--spacing"]);
    if (!o)
      throw new Error(
        "The --spacing(\u2026) function requires that the `--spacing` theme variable exists, but it was not found."
      );
    return `calc(${o} * ${i})`;
  }
  function Oo(t, r, i, ...e) {
    if (!i.startsWith("--"))
      throw new Error(
        "The --theme(\u2026) function can only be used with CSS variables from your theme."
      );
    let o = !1;
    i.endsWith(" inline") && ((o = !0), (i = i.slice(0, -7))),
      r.kind === "at-rule" && (o = !0);
    let s = t.resolveThemeValue(i, o);
    if (!s) {
      if (e.length > 0) return e.join(", ");
      throw new Error(
        `Could not resolve value for theme function: \`theme(${i})\`. Consider checking if the variable name is correct or provide a fallback value to silence this error.`
      );
    }
    if (e.length === 0) return s;
    let a = e.join(", ");
    if (a === "initial") return s;
    if (s === "initial") return a;
    if (
      s.startsWith("var(") ||
      s.startsWith("theme(") ||
      s.startsWith("--theme(")
    ) {
      let f = q(s);
      return Ko(f, a), J(f);
    }
    return s;
  }
  function _o(t, r, i, ...e) {
    i = zo(i);
    let o = t.resolveThemeValue(i);
    if (!o && e.length > 0) return e.join(", ");
    if (!o)
      throw new Error(
        `Could not resolve value for theme function: \`theme(${i})\`. Consider checking if the path is correct or provide a fallback value to silence this error.`
      );
    return o;
  }
  var Or = new RegExp(
    Object.keys(Dt)
      .map((t) => `${t}\\(`)
      .join("|")
  );
  function Ve(t, r) {
    let i = 0;
    return (
      L(t, (e) => {
        if (e.kind === "declaration" && e.value && Or.test(e.value)) {
          (i |= 8), (e.value = _r(e.value, e, r));
          return;
        }
        e.kind === "at-rule" &&
          (e.name === "@media" ||
            e.name === "@custom-media" ||
            e.name === "@container" ||
            e.name === "@supports") &&
          Or.test(e.params) &&
          ((i |= 8), (e.params = _r(e.params, e, r)));
      }),
      i
    );
  }
  function _r(t, r, i) {
    let e = q(t);
    return (
      ee(e, (o, { replaceWith: s }) => {
        if (o.kind === "function" && o.value in Dt) {
          let a = z(J(o.nodes).trim(), ",").map((u) => u.trim()),
            f = Dt[o.value](i, r, ...a);
          return s(q(f));
        }
      }),
      J(e)
    );
  }
  function zo(t) {
    if (t[0] !== "'" && t[0] !== '"') return t;
    let r = "",
      i = t[0];
    for (let e = 1; e < t.length - 1; e++) {
      let o = t[e],
        s = t[e + 1];
      o === "\\" && (s === i || s === "\\") ? ((r += s), e++) : (r += o);
    }
    return r;
  }
  function Ko(t, r) {
    ee(t, (i) => {
      if (
        i.kind === "function" &&
        !(i.value !== "var" && i.value !== "theme" && i.value !== "--theme")
      )
        if (i.nodes.length === 1)
          i.nodes.push({ kind: "word", value: `, ${r}` });
        else {
          let e = i.nodes[i.nodes.length - 1];
          e.kind === "word" && e.value === "initial" && (e.value = r);
        }
    });
  }
  function st(t, r) {
    let i = t.length,
      e = r.length,
      o = i < e ? i : e;
    for (let s = 0; s < o; s++) {
      let a = t.charCodeAt(s),
        f = r.charCodeAt(s);
      if (a >= 48 && a <= 57 && f >= 48 && f <= 57) {
        let u = s,
          c = s + 1,
          g = s,
          p = s + 1;
        for (a = t.charCodeAt(c); a >= 48 && a <= 57; ) a = t.charCodeAt(++c);
        for (f = r.charCodeAt(p); f >= 48 && f <= 57; ) f = r.charCodeAt(++p);
        let m = t.slice(u, c),
          v = r.slice(g, p),
          k = Number(m) - Number(v);
        if (k) return k;
        if (m < v) return -1;
        if (m > v) return 1;
        continue;
      }
      if (a !== f) return a - f;
    }
    return t.length - r.length;
  }
  var Do = /^\d+\/\d+$/;
  function zr(t) {
    let r = new W((o) => ({
      name: o,
      utility: o,
      fraction: !1,
      modifiers: [],
    }));
    for (let o of t.utilities.keys("static")) {
      let s = r.get(o);
      (s.fraction = !1), (s.modifiers = []);
    }
    for (let o of t.utilities.keys("functional")) {
      let s = t.utilities.getCompletions(o);
      for (let a of s)
        for (let f of a.values) {
          let u = f !== null && Do.test(f),
            c = f === null ? o : `${o}-${f}`,
            g = r.get(c);
          if (
            ((g.utility = o),
            (g.fraction ||= u),
            g.modifiers.push(...a.modifiers),
            a.supportsNegative)
          ) {
            let p = r.get(`-${c}`);
            (p.utility = `-${o}`),
              (p.fraction ||= u),
              p.modifiers.push(...a.modifiers);
          }
        }
    }
    if (r.size === 0) return [];
    let i = Array.from(r.values());
    return i.sort((o, s) => st(o.name, s.name)), Uo(i);
  }
  function Uo(t) {
    let r = [],
      i = null,
      e = new Map(),
      o = new W(() => []);
    for (let a of t) {
      let { utility: f, fraction: u } = a;
      i || ((i = { utility: f, items: [] }), e.set(f, i)),
        f !== i.utility &&
          (r.push(i), (i = { utility: f, items: [] }), e.set(f, i)),
        u ? o.get(f).push(a) : i.items.push(a);
    }
    i && r[r.length - 1] !== i && r.push(i);
    for (let [a, f] of o) {
      let u = e.get(a);
      u && u.items.push(...f);
    }
    let s = [];
    for (let a of r)
      for (let f of a.items) s.push([f.name, { modifiers: f.modifiers }]);
    return s;
  }
  function Kr(t) {
    let r = [];
    for (let [e, o] of t.variants.entries()) {
      let f = function ({ value: u, modifier: c } = {}) {
        let g = e;
        u && (g += s ? `-${u}` : u), c && (g += `/${c}`);
        let p = t.parseVariant(g);
        if (!p) return [];
        let m = M(".__placeholder__", []);
        if (Te(m, p, t.variants) === null) return [];
        let v = [];
        return (
          Xe(m.nodes, (k, { path: x }) => {
            if (
              (k.kind !== "rule" && k.kind !== "at-rule") ||
              k.nodes.length > 0
            )
              return;
            x.sort((b, V) => {
              let R = b.kind === "at-rule",
                U = V.kind === "at-rule";
              return R && !U ? -1 : !R && U ? 1 : 0;
            });
            let y = x.flatMap((b) =>
                b.kind === "rule"
                  ? b.selector === "&"
                    ? []
                    : [b.selector]
                  : b.kind === "at-rule"
                  ? [`${b.name} ${b.params}`]
                  : []
              ),
              N = "";
            for (let b = y.length - 1; b >= 0; b--)
              N = N === "" ? y[b] : `${y[b]} { ${N} }`;
            v.push(N);
          }),
          v
        );
      };
      var i = f;
      if (o.kind === "arbitrary") continue;
      let s = e !== "@",
        a = t.variants.getCompletions(e);
      switch (o.kind) {
        case "static": {
          r.push({
            name: e,
            values: a,
            isArbitrary: !1,
            hasDash: s,
            selectors: f,
          });
          break;
        }
        case "functional": {
          r.push({
            name: e,
            values: a,
            isArbitrary: !0,
            hasDash: s,
            selectors: f,
          });
          break;
        }
        case "compound": {
          r.push({
            name: e,
            values: a,
            isArbitrary: !0,
            hasDash: s,
            selectors: f,
          });
          break;
        }
      }
    }
    return r;
  }
  function Dr(t, r) {
    let { astNodes: i, nodeSorting: e } = he(Array.from(r), t),
      o = new Map(r.map((a) => [a, null])),
      s = 0n;
    for (let a of i) {
      let f = e.get(a)?.candidate;
      f && o.set(f, o.get(f) ?? s++);
    }
    return r.map((a) => [a, o.get(a) ?? null]);
  }
  var ut = /^@?[a-zA-Z0-9_-]*$/;
  var jt = class {
    compareFns = new Map();
    variants = new Map();
    completions = new Map();
    groupOrder = null;
    lastOrder = 0;
    static(r, i, { compounds: e, order: o } = {}) {
      this.set(r, {
        kind: "static",
        applyFn: i,
        compoundsWith: 0,
        compounds: e ?? 2,
        order: o,
      });
    }
    fromAst(r, i) {
      let e = [];
      L(i, (o) => {
        o.kind === "rule"
          ? e.push(o.selector)
          : o.kind === "at-rule" &&
            o.name !== "@slot" &&
            e.push(`${o.name} ${o.params}`);
      }),
        this.static(
          r,
          (o) => {
            let s = structuredClone(i);
            Lt(s, o.nodes), (o.nodes = s);
          },
          { compounds: Ae(e) }
        );
    }
    functional(r, i, { compounds: e, order: o } = {}) {
      this.set(r, {
        kind: "functional",
        applyFn: i,
        compoundsWith: 0,
        compounds: e ?? 2,
        order: o,
      });
    }
    compound(r, i, e, { compounds: o, order: s } = {}) {
      this.set(r, {
        kind: "compound",
        applyFn: e,
        compoundsWith: i,
        compounds: o ?? 2,
        order: s,
      });
    }
    group(r, i) {
      (this.groupOrder = this.nextOrder()),
        i && this.compareFns.set(this.groupOrder, i),
        r(),
        (this.groupOrder = null);
    }
    has(r) {
      return this.variants.has(r);
    }
    get(r) {
      return this.variants.get(r);
    }
    kind(r) {
      return this.variants.get(r)?.kind;
    }
    compoundsWith(r, i) {
      let e = this.variants.get(r),
        o =
          typeof i == "string"
            ? this.variants.get(i)
            : i.kind === "arbitrary"
            ? { compounds: Ae([i.selector]) }
            : this.variants.get(i.root);
      return !(
        !e ||
        !o ||
        e.kind !== "compound" ||
        o.compounds === 0 ||
        e.compoundsWith === 0 ||
        (e.compoundsWith & o.compounds) === 0
      );
    }
    suggest(r, i) {
      this.completions.set(r, i);
    }
    getCompletions(r) {
      return this.completions.get(r)?.() ?? [];
    }
    compare(r, i) {
      if (r === i) return 0;
      if (r === null) return -1;
      if (i === null) return 1;
      if (r.kind === "arbitrary" && i.kind === "arbitrary")
        return r.selector < i.selector ? -1 : 1;
      if (r.kind === "arbitrary") return 1;
      if (i.kind === "arbitrary") return -1;
      let e = this.variants.get(r.root).order,
        o = this.variants.get(i.root).order,
        s = e - o;
      if (s !== 0) return s;
      if (r.kind === "compound" && i.kind === "compound") {
        let c = this.compare(r.variant, i.variant);
        return c !== 0
          ? c
          : r.modifier && i.modifier
          ? r.modifier.value < i.modifier.value
            ? -1
            : 1
          : r.modifier
          ? 1
          : i.modifier
          ? -1
          : 0;
      }
      let a = this.compareFns.get(e);
      if (a !== void 0) return a(r, i);
      if (r.root !== i.root) return r.root < i.root ? -1 : 1;
      let f = r.value,
        u = i.value;
      return f === null
        ? -1
        : u === null || (f.kind === "arbitrary" && u.kind !== "arbitrary")
        ? 1
        : (f.kind !== "arbitrary" && u.kind === "arbitrary") ||
          f.value < u.value
        ? -1
        : 1;
    }
    keys() {
      return this.variants.keys();
    }
    entries() {
      return this.variants.entries();
    }
    set(r, { kind: i, applyFn: e, compounds: o, compoundsWith: s, order: a }) {
      let f = this.variants.get(r);
      f
        ? Object.assign(f, { kind: i, applyFn: e, compounds: o })
        : (a === void 0 &&
            ((this.lastOrder = this.nextOrder()), (a = this.lastOrder)),
          this.variants.set(r, {
            kind: i,
            applyFn: e,
            order: a,
            compoundsWith: s,
            compounds: o,
          }));
    }
    nextOrder() {
      return this.groupOrder ?? this.lastOrder + 1;
    }
  };
  function Ae(t) {
    let r = 0;
    for (let i of t) {
      if (i[0] === "@") {
        if (
          !i.startsWith("@media") &&
          !i.startsWith("@supports") &&
          !i.startsWith("@container")
        )
          return 0;
        r |= 1;
        continue;
      }
      if (i.includes("::")) return 0;
      r |= 2;
    }
    return r;
  }
  function jr(t) {
    let r = new jt();
    function i(c, g, { compounds: p } = {}) {
      (p = p ?? Ae(g)),
        r.static(
          c,
          (m) => {
            m.nodes = g.map((v) => G(v, m.nodes));
          },
          { compounds: p }
        );
    }
    i("*", [":is(& > *)"], { compounds: 0 }),
      i("**", [":is(& *)"], { compounds: 0 });
    function e(c, g) {
      return g.map((p) => {
        p = p.trim();
        let m = z(p, " ");
        return m[0] === "not"
          ? m.slice(1).join(" ")
          : c === "@container"
          ? m[0][0] === "("
            ? `not ${p}`
            : m[1] === "not"
            ? `${m[0]} ${m.slice(2).join(" ")}`
            : `${m[0]} not ${m.slice(1).join(" ")}`
          : `not ${p}`;
      });
    }
    let o = ["@media", "@supports", "@container"];
    function s(c) {
      for (let g of o) {
        if (g !== c.name) continue;
        let p = z(c.params, ",");
        return p.length > 1
          ? null
          : ((p = e(c.name, p)), F(c.name, p.join(", ")));
      }
      return null;
    }
    function a(c) {
      return c.includes("::")
        ? null
        : `&:not(${z(c, ",")
            .map((p) => ((p = p.replaceAll("&", "*")), p))
            .join(", ")})`;
    }
    r.compound("not", 3, (c, g) => {
      if ((g.variant.kind === "arbitrary" && g.variant.relative) || g.modifier)
        return null;
      let p = !1;
      if (
        (L([c], (m, { path: v }) => {
          if (m.kind !== "rule" && m.kind !== "at-rule") return 0;
          if (m.nodes.length > 0) return 0;
          let k = [],
            x = [];
          for (let N of v)
            N.kind === "at-rule" ? k.push(N) : N.kind === "rule" && x.push(N);
          if (k.length > 1) return 2;
          if (x.length > 1) return 2;
          let y = [];
          for (let N of x) {
            let b = a(N.selector);
            if (!b) return (p = !1), 2;
            y.push(M(b, []));
          }
          for (let N of k) {
            let b = s(N);
            if (!b) return (p = !1), 2;
            y.push(b);
          }
          return Object.assign(c, M("&", y)), (p = !0), 1;
        }),
        c.kind === "rule" &&
          c.selector === "&" &&
          c.nodes.length === 1 &&
          Object.assign(c, c.nodes[0]),
        !p)
      )
        return null;
    }),
      r.suggest("not", () =>
        Array.from(r.keys()).filter((c) => r.compoundsWith("not", c))
      ),
      r.compound("group", 2, (c, g) => {
        if (g.variant.kind === "arbitrary" && g.variant.relative) return null;
        let p = g.modifier
            ? `:where(.${t.prefix ? `${t.prefix}\\:` : ""}group\\/${
                g.modifier.value
              })`
            : `:where(.${t.prefix ? `${t.prefix}\\:` : ""}group)`,
          m = !1;
        if (
          (L([c], (v, { path: k }) => {
            if (v.kind !== "rule") return 0;
            for (let y of k.slice(0, -1))
              if (y.kind === "rule") return (m = !1), 2;
            let x = v.selector.replaceAll("&", p);
            z(x, ",").length > 1 && (x = `:is(${x})`),
              (v.selector = `&:is(${x} *)`),
              (m = !0);
          }),
          !m)
        )
          return null;
      }),
      r.suggest("group", () =>
        Array.from(r.keys()).filter((c) => r.compoundsWith("group", c))
      ),
      r.compound("peer", 2, (c, g) => {
        if (g.variant.kind === "arbitrary" && g.variant.relative) return null;
        let p = g.modifier
            ? `:where(.${t.prefix ? `${t.prefix}\\:` : ""}peer\\/${
                g.modifier.value
              })`
            : `:where(.${t.prefix ? `${t.prefix}\\:` : ""}peer)`,
          m = !1;
        if (
          (L([c], (v, { path: k }) => {
            if (v.kind !== "rule") return 0;
            for (let y of k.slice(0, -1))
              if (y.kind === "rule") return (m = !1), 2;
            let x = v.selector.replaceAll("&", p);
            z(x, ",").length > 1 && (x = `:is(${x})`),
              (v.selector = `&:is(${x} ~ *)`),
              (m = !0);
          }),
          !m)
        )
          return null;
      }),
      r.suggest("peer", () =>
        Array.from(r.keys()).filter((c) => r.compoundsWith("peer", c))
      ),
      i("first-letter", ["&::first-letter"]),
      i("first-line", ["&::first-line"]),
      i("marker", [
        "& *::marker",
        "&::marker",
        "& *::-webkit-details-marker",
        "&::-webkit-details-marker",
      ]),
      i("selection", ["& *::selection", "&::selection"]),
      i("file", ["&::file-selector-button"]),
      i("placeholder", ["&::placeholder"]),
      i("backdrop", ["&::backdrop"]),
      i("details-content", ["&::details-content"]);
    {
      let c = function () {
        return I([
          F("@property", "--tw-content", [
            l("syntax", '"*"'),
            l("initial-value", '""'),
            l("inherits", "false"),
          ]),
        ]);
      };
      var f = c;
      r.static(
        "before",
        (g) => {
          g.nodes = [
            M("&::before", [
              c(),
              l("content", "var(--tw-content)"),
              ...g.nodes,
            ]),
          ];
        },
        { compounds: 0 }
      ),
        r.static(
          "after",
          (g) => {
            g.nodes = [
              M("&::after", [
                c(),
                l("content", "var(--tw-content)"),
                ...g.nodes,
              ]),
            ];
          },
          { compounds: 0 }
        );
    }
    i("first", ["&:first-child"]),
      i("last", ["&:last-child"]),
      i("only", ["&:only-child"]),
      i("odd", ["&:nth-child(odd)"]),
      i("even", ["&:nth-child(even)"]),
      i("first-of-type", ["&:first-of-type"]),
      i("last-of-type", ["&:last-of-type"]),
      i("only-of-type", ["&:only-of-type"]),
      i("visited", ["&:visited"]),
      i("target", ["&:target"]),
      i("open", ["&:is([open], :popover-open, :open)"]),
      i("default", ["&:default"]),
      i("checked", ["&:checked"]),
      i("indeterminate", ["&:indeterminate"]),
      i("placeholder-shown", ["&:placeholder-shown"]),
      i("autofill", ["&:autofill"]),
      i("optional", ["&:optional"]),
      i("required", ["&:required"]),
      i("valid", ["&:valid"]),
      i("invalid", ["&:invalid"]),
      i("user-valid", ["&:user-valid"]),
      i("user-invalid", ["&:user-invalid"]),
      i("in-range", ["&:in-range"]),
      i("out-of-range", ["&:out-of-range"]),
      i("read-only", ["&:read-only"]),
      i("empty", ["&:empty"]),
      i("focus-within", ["&:focus-within"]),
      r.static("hover", (c) => {
        c.nodes = [M("&:hover", [F("@media", "(hover: hover)", c.nodes)])];
      }),
      i("focus", ["&:focus"]),
      i("focus-visible", ["&:focus-visible"]),
      i("active", ["&:active"]),
      i("enabled", ["&:enabled"]),
      i("disabled", ["&:disabled"]),
      i("inert", ["&:is([inert], [inert] *)"]),
      r.compound("in", 2, (c, g) => {
        if (g.modifier) return null;
        let p = !1;
        if (
          (L([c], (m, { path: v }) => {
            if (m.kind !== "rule") return 0;
            for (let k of v.slice(0, -1))
              if (k.kind === "rule") return (p = !1), 2;
            (m.selector = `:where(${m.selector.replaceAll("&", "*")}) &`),
              (p = !0);
          }),
          !p)
        )
          return null;
      }),
      r.suggest("in", () =>
        Array.from(r.keys()).filter((c) => r.compoundsWith("in", c))
      ),
      r.compound("has", 2, (c, g) => {
        if (g.modifier) return null;
        let p = !1;
        if (
          (L([c], (m, { path: v }) => {
            if (m.kind !== "rule") return 0;
            for (let k of v.slice(0, -1))
              if (k.kind === "rule") return (p = !1), 2;
            (m.selector = `&:has(${m.selector.replaceAll("&", "*")})`),
              (p = !0);
          }),
          !p)
        )
          return null;
      }),
      r.suggest("has", () =>
        Array.from(r.keys()).filter((c) => r.compoundsWith("has", c))
      ),
      r.functional("aria", (c, g) => {
        if (!g.value || g.modifier) return null;
        g.value.kind === "arbitrary"
          ? (c.nodes = [M(`&[aria-${Ur(g.value.value)}]`, c.nodes)])
          : (c.nodes = [M(`&[aria-${g.value.value}="true"]`, c.nodes)]);
      }),
      r.suggest("aria", () => [
        "busy",
        "checked",
        "disabled",
        "expanded",
        "hidden",
        "pressed",
        "readonly",
        "required",
        "selected",
      ]),
      r.functional("data", (c, g) => {
        if (!g.value || g.modifier) return null;
        c.nodes = [M(`&[data-${Ur(g.value.value)}]`, c.nodes)];
      }),
      r.functional("nth", (c, g) => {
        if (
          !g.value ||
          g.modifier ||
          (g.value.kind === "named" && !E(g.value.value))
        )
          return null;
        c.nodes = [M(`&:nth-child(${g.value.value})`, c.nodes)];
      }),
      r.functional("nth-last", (c, g) => {
        if (
          !g.value ||
          g.modifier ||
          (g.value.kind === "named" && !E(g.value.value))
        )
          return null;
        c.nodes = [M(`&:nth-last-child(${g.value.value})`, c.nodes)];
      }),
      r.functional("nth-of-type", (c, g) => {
        if (
          !g.value ||
          g.modifier ||
          (g.value.kind === "named" && !E(g.value.value))
        )
          return null;
        c.nodes = [M(`&:nth-of-type(${g.value.value})`, c.nodes)];
      }),
      r.functional("nth-last-of-type", (c, g) => {
        if (
          !g.value ||
          g.modifier ||
          (g.value.kind === "named" && !E(g.value.value))
        )
          return null;
        c.nodes = [M(`&:nth-last-of-type(${g.value.value})`, c.nodes)];
      }),
      r.functional(
        "supports",
        (c, g) => {
          if (!g.value || g.modifier) return null;
          let p = g.value.value;
          if (p === null) return null;
          if (/^[\w-]*\s*\(/.test(p)) {
            let m = p.replace(/\b(and|or|not)\b/g, " $1 ");
            c.nodes = [F("@supports", m, c.nodes)];
            return;
          }
          p.includes(":") || (p = `${p}: var(--tw)`),
            (p[0] !== "(" || p[p.length - 1] !== ")") && (p = `(${p})`),
            (c.nodes = [F("@supports", p, c.nodes)]);
        },
        { compounds: 1 }
      ),
      i("motion-safe", ["@media (prefers-reduced-motion: no-preference)"]),
      i("motion-reduce", ["@media (prefers-reduced-motion: reduce)"]),
      i("contrast-more", ["@media (prefers-contrast: more)"]),
      i("contrast-less", ["@media (prefers-contrast: less)"]);
    {
      let c = function (g, p, m, v) {
        if (g === p) return 0;
        let k = v.get(g);
        if (k === null) return m === "asc" ? -1 : 1;
        let x = v.get(p);
        return x === null ? (m === "asc" ? 1 : -1) : ye(k, x, m);
      };
      var u = c;
      {
        let g = t.namespace("--breakpoint"),
          p = new W((m) => {
            switch (m.kind) {
              case "static":
                return t.resolveValue(m.root, ["--breakpoint"]) ?? null;
              case "functional": {
                if (!m.value || m.modifier) return null;
                let v = null;
                return (
                  m.value.kind === "arbitrary"
                    ? (v = m.value.value)
                    : m.value.kind === "named" &&
                      (v = t.resolveValue(m.value.value, ["--breakpoint"])),
                  !v || v.includes("var(") ? null : v
                );
              }
              case "arbitrary":
              case "compound":
                return null;
            }
          });
        r.group(
          () => {
            r.functional(
              "max",
              (m, v) => {
                if (v.modifier) return null;
                let k = p.get(v);
                if (k === null) return null;
                m.nodes = [F("@media", `(width < ${k})`, m.nodes)];
              },
              { compounds: 1 }
            );
          },
          (m, v) => c(m, v, "desc", p)
        ),
          r.suggest("max", () =>
            Array.from(g.keys()).filter((m) => m !== null)
          ),
          r.group(
            () => {
              for (let [m, v] of t.namespace("--breakpoint"))
                m !== null &&
                  r.static(
                    m,
                    (k) => {
                      k.nodes = [F("@media", `(width >= ${v})`, k.nodes)];
                    },
                    { compounds: 1 }
                  );
              r.functional(
                "min",
                (m, v) => {
                  if (v.modifier) return null;
                  let k = p.get(v);
                  if (k === null) return null;
                  m.nodes = [F("@media", `(width >= ${k})`, m.nodes)];
                },
                { compounds: 1 }
              );
            },
            (m, v) => c(m, v, "asc", p)
          ),
          r.suggest("min", () =>
            Array.from(g.keys()).filter((m) => m !== null)
          );
      }
      {
        let g = t.namespace("--container"),
          p = new W((m) => {
            switch (m.kind) {
              case "functional": {
                if (m.value === null) return null;
                let v = null;
                return (
                  m.value.kind === "arbitrary"
                    ? (v = m.value.value)
                    : m.value.kind === "named" &&
                      (v = t.resolveValue(m.value.value, ["--container"])),
                  !v || v.includes("var(") ? null : v
                );
              }
              case "static":
              case "arbitrary":
              case "compound":
                return null;
            }
          });
        r.group(
          () => {
            r.functional(
              "@max",
              (m, v) => {
                let k = p.get(v);
                if (k === null) return null;
                m.nodes = [
                  F(
                    "@container",
                    v.modifier
                      ? `${v.modifier.value} (width < ${k})`
                      : `(width < ${k})`,
                    m.nodes
                  ),
                ];
              },
              { compounds: 1 }
            );
          },
          (m, v) => c(m, v, "desc", p)
        ),
          r.suggest("@max", () =>
            Array.from(g.keys()).filter((m) => m !== null)
          ),
          r.group(
            () => {
              r.functional(
                "@",
                (m, v) => {
                  let k = p.get(v);
                  if (k === null) return null;
                  m.nodes = [
                    F(
                      "@container",
                      v.modifier
                        ? `${v.modifier.value} (width >= ${k})`
                        : `(width >= ${k})`,
                      m.nodes
                    ),
                  ];
                },
                { compounds: 1 }
              ),
                r.functional(
                  "@min",
                  (m, v) => {
                    let k = p.get(v);
                    if (k === null) return null;
                    m.nodes = [
                      F(
                        "@container",
                        v.modifier
                          ? `${v.modifier.value} (width >= ${k})`
                          : `(width >= ${k})`,
                        m.nodes
                      ),
                    ];
                  },
                  { compounds: 1 }
                );
            },
            (m, v) => c(m, v, "asc", p)
          ),
          r.suggest("@min", () =>
            Array.from(g.keys()).filter((m) => m !== null)
          ),
          r.suggest("@", () => Array.from(g.keys()).filter((m) => m !== null));
      }
    }
    return (
      i("portrait", ["@media (orientation: portrait)"]),
      i("landscape", ["@media (orientation: landscape)"]),
      i("ltr", ['&:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)']),
      i("rtl", ['&:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)']),
      i("dark", ["@media (prefers-color-scheme: dark)"]),
      i("starting", ["@starting-style"]),
      i("print", ["@media print"]),
      i("forced-colors", ["@media (forced-colors: active)"]),
      i("inverted-colors", ["@media (inverted-colors: inverted)"]),
      i("pointer-none", ["@media (pointer: none)"]),
      i("pointer-coarse", ["@media (pointer: coarse)"]),
      i("pointer-fine", ["@media (pointer: fine)"]),
      i("any-pointer-none", ["@media (any-pointer: none)"]),
      i("any-pointer-coarse", ["@media (any-pointer: coarse)"]),
      i("any-pointer-fine", ["@media (any-pointer: fine)"]),
      i("noscript", ["@media (scripting: none)"]),
      r
    );
  }
  function Ur(t) {
    if (t.includes("=")) {
      let [r, ...i] = z(t, "="),
        e = i.join("=").trim();
      if (e[0] === "'" || e[0] === '"') return t;
      if (e.length > 1) {
        let o = e[e.length - 1];
        if (
          e[e.length - 2] === " " &&
          (o === "i" || o === "I" || o === "s" || o === "S")
        )
          return `${r}="${e.slice(0, -2)}" ${o}`;
      }
      return `${r}="${e}"`;
    }
    return t;
  }
  function Lt(t, r) {
    L(t, (i, { replaceWith: e }) => {
      if (i.kind === "at-rule" && i.name === "@slot") e(r);
      else if (
        i.kind === "at-rule" &&
        (i.name === "@keyframes" || i.name === "@property")
      )
        return Object.assign(i, I([F(i.name, i.params, i.nodes)])), 1;
    });
  }
  function Lr(t) {
    let r = Rr(t),
      i = jr(t),
      e = new W((u) => wr(u, f)),
      o = new W((u) => Array.from(vr(u, f))),
      s = new W((u) => {
        let c = Ir(u, f);
        try {
          Ve(
            c.map(({ node: g }) => g),
            f
          );
        } catch {
          return [];
        }
        return c;
      }),
      a = new W((u) => {
        for (let c of Ze(u)) t.markUsedVariable(c);
      }),
      f = {
        theme: t,
        utilities: r,
        variants: i,
        invalidCandidates: new Set(),
        important: !1,
        candidatesToCss(u) {
          let c = [];
          for (let g of u) {
            let p = !1,
              { astNodes: m } = he([g], this, {
                onInvalidCandidate() {
                  p = !0;
                },
              });
            (m = be(m, f, 0)),
              m.length === 0 || p ? c.push(null) : c.push(le(m));
          }
          return c;
        },
        getClassOrder(u) {
          return Dr(this, u);
        },
        getClassList() {
          return zr(this);
        },
        getVariants() {
          return Kr(this);
        },
        parseCandidate(u) {
          return o.get(u);
        },
        parseVariant(u) {
          return e.get(u);
        },
        compileAstNodes(u) {
          return s.get(u);
        },
        printCandidate(u) {
          return yr(f, u);
        },
        printVariant(u) {
          return it(u);
        },
        getVariantOrder() {
          let u = Array.from(e.values());
          u.sort((m, v) => this.variants.compare(m, v));
          let c = new Map(),
            g,
            p = 0;
          for (let m of u)
            m !== null &&
              (g !== void 0 && this.variants.compare(g, m) !== 0 && p++,
              c.set(m, p),
              (g = m));
          return c;
        },
        resolveThemeValue(u, c = !0) {
          let g = u.lastIndexOf("/"),
            p = null;
          g !== -1 && ((p = u.slice(g + 1).trim()), (u = u.slice(0, g).trim()));
          let m = t.resolve(null, [u], c ? 1 : 0) ?? void 0;
          return p && m ? Z(m, p) : m;
        },
        trackUsedVariables(u) {
          a.get(u);
        },
      };
    return f;
  }
  var It = [
    "container-type",
    "pointer-events",
    "visibility",
    "position",
    "inset",
    "inset-inline",
    "inset-block",
    "inset-inline-start",
    "inset-inline-end",
    "top",
    "right",
    "bottom",
    "left",
    "isolation",
    "z-index",
    "order",
    "grid-column",
    "grid-column-start",
    "grid-column-end",
    "grid-row",
    "grid-row-start",
    "grid-row-end",
    "float",
    "clear",
    "--tw-container-component",
    "margin",
    "margin-inline",
    "margin-block",
    "margin-inline-start",
    "margin-inline-end",
    "margin-top",
    "margin-right",
    "margin-bottom",
    "margin-left",
    "box-sizing",
    "display",
    "field-sizing",
    "aspect-ratio",
    "height",
    "max-height",
    "min-height",
    "width",
    "max-width",
    "min-width",
    "flex",
    "flex-shrink",
    "flex-grow",
    "flex-basis",
    "table-layout",
    "caption-side",
    "border-collapse",
    "border-spacing",
    "transform-origin",
    "translate",
    "--tw-translate-x",
    "--tw-translate-y",
    "--tw-translate-z",
    "scale",
    "--tw-scale-x",
    "--tw-scale-y",
    "--tw-scale-z",
    "rotate",
    "--tw-rotate-x",
    "--tw-rotate-y",
    "--tw-rotate-z",
    "--tw-skew-x",
    "--tw-skew-y",
    "transform",
    "animation",
    "cursor",
    "touch-action",
    "--tw-pan-x",
    "--tw-pan-y",
    "--tw-pinch-zoom",
    "resize",
    "scroll-snap-type",
    "--tw-scroll-snap-strictness",
    "scroll-snap-align",
    "scroll-snap-stop",
    "scroll-margin",
    "scroll-margin-inline",
    "scroll-margin-block",
    "scroll-margin-inline-start",
    "scroll-margin-inline-end",
    "scroll-margin-top",
    "scroll-margin-right",
    "scroll-margin-bottom",
    "scroll-margin-left",
    "scroll-padding",
    "scroll-padding-inline",
    "scroll-padding-block",
    "scroll-padding-inline-start",
    "scroll-padding-inline-end",
    "scroll-padding-top",
    "scroll-padding-right",
    "scroll-padding-bottom",
    "scroll-padding-left",
    "list-style-position",
    "list-style-type",
    "list-style-image",
    "appearance",
    "columns",
    "break-before",
    "break-inside",
    "break-after",
    "grid-auto-columns",
    "grid-auto-flow",
    "grid-auto-rows",
    "grid-template-columns",
    "grid-template-rows",
    "flex-direction",
    "flex-wrap",
    "place-content",
    "place-items",
    "align-content",
    "align-items",
    "justify-content",
    "justify-items",
    "gap",
    "column-gap",
    "row-gap",
    "--tw-space-x-reverse",
    "--tw-space-y-reverse",
    "divide-x-width",
    "divide-y-width",
    "--tw-divide-y-reverse",
    "divide-style",
    "divide-color",
    "place-self",
    "align-self",
    "justify-self",
    "overflow",
    "overflow-x",
    "overflow-y",
    "overscroll-behavior",
    "overscroll-behavior-x",
    "overscroll-behavior-y",
    "scroll-behavior",
    "border-radius",
    "border-start-radius",
    "border-end-radius",
    "border-top-radius",
    "border-right-radius",
    "border-bottom-radius",
    "border-left-radius",
    "border-start-start-radius",
    "border-start-end-radius",
    "border-end-end-radius",
    "border-end-start-radius",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-bottom-right-radius",
    "border-bottom-left-radius",
    "border-width",
    "border-inline-width",
    "border-block-width",
    "border-inline-start-width",
    "border-inline-end-width",
    "border-top-width",
    "border-right-width",
    "border-bottom-width",
    "border-left-width",
    "border-style",
    "border-inline-style",
    "border-block-style",
    "border-inline-start-style",
    "border-inline-end-style",
    "border-top-style",
    "border-right-style",
    "border-bottom-style",
    "border-left-style",
    "border-color",
    "border-inline-color",
    "border-block-color",
    "border-inline-start-color",
    "border-inline-end-color",
    "border-top-color",
    "border-right-color",
    "border-bottom-color",
    "border-left-color",
    "background-color",
    "background-image",
    "--tw-gradient-position",
    "--tw-gradient-stops",
    "--tw-gradient-via-stops",
    "--tw-gradient-from",
    "--tw-gradient-from-position",
    "--tw-gradient-via",
    "--tw-gradient-via-position",
    "--tw-gradient-to",
    "--tw-gradient-to-position",
    "mask-image",
    "--tw-mask-top",
    "--tw-mask-top-from-color",
    "--tw-mask-top-from-position",
    "--tw-mask-top-to-color",
    "--tw-mask-top-to-position",
    "--tw-mask-right",
    "--tw-mask-right-from-color",
    "--tw-mask-right-from-position",
    "--tw-mask-right-to-color",
    "--tw-mask-right-to-position",
    "--tw-mask-bottom",
    "--tw-mask-bottom-from-color",
    "--tw-mask-bottom-from-position",
    "--tw-mask-bottom-to-color",
    "--tw-mask-bottom-to-position",
    "--tw-mask-left",
    "--tw-mask-left-from-color",
    "--tw-mask-left-from-position",
    "--tw-mask-left-to-color",
    "--tw-mask-left-to-position",
    "--tw-mask-linear",
    "--tw-mask-linear-position",
    "--tw-mask-linear-from-color",
    "--tw-mask-linear-from-position",
    "--tw-mask-linear-to-color",
    "--tw-mask-linear-to-position",
    "--tw-mask-radial",
    "--tw-mask-radial-shape",
    "--tw-mask-radial-size",
    "--tw-mask-radial-position",
    "--tw-mask-radial-from-color",
    "--tw-mask-radial-from-position",
    "--tw-mask-radial-to-color",
    "--tw-mask-radial-to-position",
    "--tw-mask-conic",
    "--tw-mask-conic-position",
    "--tw-mask-conic-from-color",
    "--tw-mask-conic-from-position",
    "--tw-mask-conic-to-color",
    "--tw-mask-conic-to-position",
    "box-decoration-break",
    "background-size",
    "background-attachment",
    "background-clip",
    "background-position",
    "background-repeat",
    "background-origin",
    "mask-composite",
    "mask-mode",
    "mask-type",
    "mask-size",
    "mask-clip",
    "mask-position",
    "mask-repeat",
    "mask-origin",
    "fill",
    "stroke",
    "stroke-width",
    "object-fit",
    "object-position",
    "padding",
    "padding-inline",
    "padding-block",
    "padding-inline-start",
    "padding-inline-end",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "text-align",
    "text-indent",
    "vertical-align",
    "font-family",
    "font-size",
    "line-height",
    "font-weight",
    "letter-spacing",
    "text-wrap",
    "overflow-wrap",
    "word-break",
    "text-overflow",
    "hyphens",
    "white-space",
    "color",
    "text-transform",
    "font-style",
    "font-stretch",
    "font-variant-numeric",
    "text-decoration-line",
    "text-decoration-color",
    "text-decoration-style",
    "text-decoration-thickness",
    "text-underline-offset",
    "-webkit-font-smoothing",
    "placeholder-color",
    "caret-color",
    "accent-color",
    "color-scheme",
    "opacity",
    "background-blend-mode",
    "mix-blend-mode",
    "box-shadow",
    "--tw-shadow",
    "--tw-shadow-color",
    "--tw-ring-shadow",
    "--tw-ring-color",
    "--tw-inset-shadow",
    "--tw-inset-shadow-color",
    "--tw-inset-ring-shadow",
    "--tw-inset-ring-color",
    "--tw-ring-offset-width",
    "--tw-ring-offset-color",
    "outline",
    "outline-width",
    "outline-offset",
    "outline-color",
    "--tw-blur",
    "--tw-brightness",
    "--tw-contrast",
    "--tw-drop-shadow",
    "--tw-grayscale",
    "--tw-hue-rotate",
    "--tw-invert",
    "--tw-saturate",
    "--tw-sepia",
    "filter",
    "--tw-backdrop-blur",
    "--tw-backdrop-brightness",
    "--tw-backdrop-contrast",
    "--tw-backdrop-grayscale",
    "--tw-backdrop-hue-rotate",
    "--tw-backdrop-invert",
    "--tw-backdrop-opacity",
    "--tw-backdrop-saturate",
    "--tw-backdrop-sepia",
    "backdrop-filter",
    "transition-property",
    "transition-behavior",
    "transition-delay",
    "transition-duration",
    "transition-timing-function",
    "will-change",
    "contain",
    "content",
    "forced-color-adjust",
  ];
  function he(t, r, { onInvalidCandidate: i } = {}) {
    let e = new Map(),
      o = [],
      s = new Map();
    for (let f of t) {
      if (r.invalidCandidates.has(f)) {
        i?.(f);
        continue;
      }
      let u = r.parseCandidate(f);
      if (u.length === 0) {
        i?.(f);
        continue;
      }
      s.set(f, u);
    }
    let a = r.getVariantOrder();
    for (let [f, u] of s) {
      let c = !1;
      for (let g of u) {
        let p = r.compileAstNodes(g);
        if (p.length !== 0) {
          c = !0;
          for (let { node: m, propertySort: v } of p) {
            let k = 0n;
            for (let x of g.variants) k |= 1n << BigInt(a.get(x));
            e.set(m, { properties: v, variants: k, candidate: f }), o.push(m);
          }
        }
      }
      c || i?.(f);
    }
    return (
      o.sort((f, u) => {
        let c = e.get(f),
          g = e.get(u);
        if (c.variants - g.variants !== 0n)
          return Number(c.variants - g.variants);
        let p = 0;
        for (
          ;
          p < c.properties.order.length &&
          p < g.properties.order.length &&
          c.properties.order[p] === g.properties.order[p];

        )
          p += 1;
        return (
          (c.properties.order[p] ?? 1 / 0) - (g.properties.order[p] ?? 1 / 0) ||
          g.properties.count - c.properties.count ||
          st(c.candidate, g.candidate)
        );
      }),
      { astNodes: o, nodeSorting: e }
    );
  }
  function Ir(t, r) {
    let i = jo(t, r);
    if (i.length === 0) return [];
    let e = [],
      o = `.${me(t.raw)}`;
    for (let s of i) {
      let a = Lo(s);
      (t.important || r.important) && Mr(s);
      let f = { kind: "rule", selector: o, nodes: s };
      for (let u of t.variants) if (Te(f, u, r.variants) === null) return [];
      e.push({ node: f, propertySort: a });
    }
    return e;
  }
  function Te(t, r, i, e = 0) {
    if (r.kind === "arbitrary") {
      if (r.relative && e === 0) return null;
      t.nodes = [G(r.selector, t.nodes)];
      return;
    }
    let { applyFn: o } = i.get(r.root);
    if (r.kind === "compound") {
      let a = F("@slot");
      if (
        Te(a, r.variant, i, e + 1) === null ||
        (r.root === "not" && a.nodes.length > 1)
      )
        return null;
      for (let u of a.nodes)
        if ((u.kind !== "rule" && u.kind !== "at-rule") || o(u, r) === null)
          return null;
      L(a.nodes, (u) => {
        if ((u.kind === "rule" || u.kind === "at-rule") && u.nodes.length <= 0)
          return (u.nodes = t.nodes), 1;
      }),
        (t.nodes = a.nodes);
      return;
    }
    if (o(t, r) === null) return null;
  }
  function Fr(t) {
    let r = t.options?.types ?? [];
    return r.length > 1 && r.includes("any");
  }
  function jo(t, r) {
    if (t.kind === "arbitrary") {
      let a = t.value;
      return (
        t.modifier && (a = X(a, t.modifier, r.theme)),
        a === null ? [] : [[l(t.property, a)]]
      );
    }
    let i = r.utilities.get(t.root) ?? [],
      e = [],
      o = i.filter((a) => !Fr(a));
    for (let a of o) {
      if (a.kind !== t.kind) continue;
      let f = a.compileFn(t);
      if (f !== void 0) {
        if (f === null) return e;
        e.push(f);
      }
    }
    if (e.length > 0) return e;
    let s = i.filter((a) => Fr(a));
    for (let a of s) {
      if (a.kind !== t.kind) continue;
      let f = a.compileFn(t);
      if (f !== void 0) {
        if (f === null) return e;
        e.push(f);
      }
    }
    return e;
  }
  function Mr(t) {
    for (let r of t)
      r.kind !== "at-root" &&
        (r.kind === "declaration"
          ? (r.important = !0)
          : (r.kind === "rule" || r.kind === "at-rule") && Mr(r.nodes));
  }
  function Lo(t) {
    let r = new Set(),
      i = 0,
      e = t.slice(),
      o = !1;
    for (; e.length > 0; ) {
      let s = e.shift();
      if (s.kind === "declaration") {
        if (s.value === void 0 || (i++, o)) continue;
        if (s.property === "--tw-sort") {
          let f = It.indexOf(s.value ?? "");
          if (f !== -1) {
            r.add(f), (o = !0);
            continue;
          }
        }
        let a = It.indexOf(s.property);
        a !== -1 && r.add(a);
      } else if (s.kind === "rule" || s.kind === "at-rule")
        for (let a of s.nodes) e.push(a);
    }
    return { order: Array.from(r).sort((s, a) => s - a), count: i };
  }
  function je(t, r) {
    let i = 0,
      e = G("&", t),
      o = new Set(),
      s = new W(() => new Set()),
      a = new W(() => new Set());
    L([e], (p, { parent: m, path: v }) => {
      if (p.kind === "at-rule") {
        if (p.name === "@keyframes")
          return (
            L(p.nodes, (k) => {
              if (k.kind === "at-rule" && k.name === "@apply")
                throw new Error("You cannot use `@apply` inside `@keyframes`.");
            }),
            1
          );
        if (p.name === "@utility") {
          let k = p.params.replace(/-\*$/, "");
          a.get(k).add(p),
            L(p.nodes, (x) => {
              if (!(x.kind !== "at-rule" || x.name !== "@apply")) {
                o.add(p);
                for (let y of Br(x, r)) s.get(p).add(y);
              }
            });
          return;
        }
        if (p.name === "@apply") {
          if (m === null) return;
          (i |= 1), o.add(m);
          for (let k of Br(p, r))
            for (let x of v) x !== p && o.has(x) && s.get(x).add(k);
        }
      }
    });
    let f = new Set(),
      u = [],
      c = new Set();
    function g(p, m = []) {
      if (!f.has(p)) {
        if (c.has(p)) {
          let v = m[(m.indexOf(p) + 1) % m.length];
          throw (
            (p.kind === "at-rule" &&
              p.name === "@utility" &&
              v.kind === "at-rule" &&
              v.name === "@utility" &&
              L(p.nodes, (k) => {
                if (k.kind !== "at-rule" || k.name !== "@apply") return;
                let x = k.params.split(/\s+/g);
                for (let y of x)
                  for (let N of r.parseCandidate(y))
                    switch (N.kind) {
                      case "arbitrary":
                        break;
                      case "static":
                      case "functional":
                        if (v.params.replace(/-\*$/, "") === N.root)
                          throw new Error(
                            `You cannot \`@apply\` the \`${y}\` utility here because it creates a circular dependency.`
                          );
                        break;
                      default:
                    }
              }),
            new Error(`Circular dependency detected:

${le([p])}
Relies on:

${le([v])}`))
          );
        }
        c.add(p);
        for (let v of s.get(p))
          for (let k of a.get(v)) m.push(p), g(k, m), m.pop();
        f.add(p), c.delete(p), u.push(p);
      }
    }
    for (let p of o) g(p);
    for (let p of u)
      "nodes" in p &&
        L(p.nodes, (m, { replaceWith: v }) => {
          if (m.kind !== "at-rule" || m.name !== "@apply") return;
          let k = m.params.split(/(\s+)/g),
            x = {},
            y = 0;
          for (let [N, b] of k.entries())
            N % 2 === 0 && (x[b] = y), (y += b.length);
          {
            let N = Object.keys(x),
              b = he(N, r, {
                onInvalidCandidate: (P) => {
                  if (r.theme.prefix && !P.startsWith(r.theme.prefix))
                    throw new Error(
                      `Cannot apply unprefixed utility class \`${P}\`. Did you mean \`${r.theme.prefix}:${P}\`?`
                    );
                  if (r.invalidCandidates.has(P))
                    throw new Error(
                      `Cannot apply utility class \`${P}\` because it has been explicitly disabled: https://tailwindcss.com/docs/detecting-classes-in-source-files#explicitly-excluding-classes`
                    );
                  let K = z(P, ":");
                  if (K.length > 1) {
                    let _ = K.pop();
                    if (r.candidatesToCss([_])[0]) {
                      let H = r.candidatesToCss(
                          K.map((B) => `${B}:[--tw-variant-check:1]`)
                        ),
                        j = K.filter((B, Q) => H[Q] === null);
                      if (j.length > 0) {
                        if (j.length === 1)
                          throw new Error(
                            `Cannot apply utility class \`${P}\` because the ${j.map(
                              (B) => `\`${B}\``
                            )} variant does not exist.`
                          );
                        {
                          let B = new Intl.ListFormat("en", {
                            style: "long",
                            type: "conjunction",
                          });
                          throw new Error(
                            `Cannot apply utility class \`${P}\` because the ${B.format(
                              j.map((Q) => `\`${Q}\``)
                            )} variants do not exist.`
                          );
                        }
                      }
                    }
                  }
                  throw r.theme.size === 0
                    ? new Error(
                        `Cannot apply unknown utility class \`${P}\`. Are you using CSS modules or similar and missing \`@reference\`? https://tailwindcss.com/docs/functions-and-directives#reference-directive`
                      )
                    : new Error(`Cannot apply unknown utility class \`${P}\``);
                },
              }),
              V = m.src,
              R = b.astNodes.map((P) => {
                let K = b.nodeSorting.get(P)?.candidate,
                  _ = K ? x[K] : void 0;
                if (((P = structuredClone(P)), !V || !K || _ === void 0))
                  return (
                    L([P], (j) => {
                      j.src = V;
                    }),
                    P
                  );
                let H = [V[0], V[1], V[2]];
                return (
                  (H[1] += 7 + _),
                  (H[2] = H[1] + K.length),
                  L([P], (j) => {
                    j.src = H;
                  }),
                  P
                );
              }),
              U = [];
            for (let P of R)
              if (P.kind === "rule") for (let K of P.nodes) U.push(K);
              else U.push(P);
            v(U);
          }
        });
    return i;
  }
  function* Br(t, r) {
    for (let i of t.params.split(/\s+/g))
      for (let e of r.parseCandidate(i))
        switch (e.kind) {
          case "arbitrary":
            break;
          case "static":
          case "functional":
            yield e.root;
            break;
          default:
        }
  }
  async function Ft(t, r, i, e = 0, o = !1) {
    let s = 0,
      a = [];
    return (
      L(t, (f, { replaceWith: u }) => {
        if (
          f.kind === "at-rule" &&
          (f.name === "@import" || f.name === "@reference")
        ) {
          let c = Io(q(f.params));
          if (c === null) return;
          f.name === "@reference" && (c.media = "reference"), (s |= 2);
          let { uri: g, layer: p, media: m, supports: v } = c;
          if (
            g.startsWith("data:") ||
            g.startsWith("http://") ||
            g.startsWith("https://")
          )
            return;
          let k = ue({}, []);
          return (
            a.push(
              (async () => {
                if (e > 100)
                  throw new Error(
                    `Exceeded maximum recursion depth while resolving \`${g}\` in \`${r}\`)`
                  );
                let x = await i(g, r),
                  y = $e(x.content, { from: o ? x.path : void 0 });
                await Ft(y, x.base, i, e + 1, o),
                  (k.nodes = Fo(f, [ue({ base: x.base }, y)], p, m, v));
              })()
            ),
            u(k),
            1
          );
        }
      }),
      a.length > 0 && (await Promise.all(a)),
      s
    );
  }
  function Io(t) {
    let r,
      i = null,
      e = null,
      o = null;
    for (let s = 0; s < t.length; s++) {
      let a = t[s];
      if (a.kind !== "separator") {
        if (a.kind === "word" && !r) {
          if (!a.value || (a.value[0] !== '"' && a.value[0] !== "'"))
            return null;
          r = a.value.slice(1, -1);
          continue;
        }
        if ((a.kind === "function" && a.value.toLowerCase() === "url") || !r)
          return null;
        if (
          (a.kind === "word" || a.kind === "function") &&
          a.value.toLowerCase() === "layer"
        ) {
          if (i) return null;
          if (o)
            throw new Error(
              "`layer(\u2026)` in an `@import` should come before any other functions or conditions"
            );
          "nodes" in a ? (i = J(a.nodes)) : (i = "");
          continue;
        }
        if (a.kind === "function" && a.value.toLowerCase() === "supports") {
          if (o) return null;
          o = J(a.nodes);
          continue;
        }
        e = J(t.slice(s));
        break;
      }
    }
    return r ? { uri: r, layer: i, media: e, supports: o } : null;
  }
  function Fo(t, r, i, e, o) {
    let s = r;
    if (i !== null) {
      let a = F("@layer", i, s);
      (a.src = t.src), (s = [a]);
    }
    if (e !== null) {
      let a = F("@media", e, s);
      (a.src = t.src), (s = [a]);
    }
    if (o !== null) {
      let a = F("@supports", o[0] === "(" ? o : `(${o})`, s);
      (a.src = t.src), (s = [a]);
    }
    return s;
  }
  function Ee(t, r = null) {
    return Array.isArray(t) &&
      t.length === 2 &&
      typeof t[1] == "object" &&
      typeof t[1] !== null
      ? r
        ? t[1][r] ?? null
        : t[0]
      : Array.isArray(t) && r === null
      ? t.join(", ")
      : typeof t == "string" && r === null
      ? t
      : null;
  }
  function Wr(t, { theme: r }, i) {
    for (let e of i) {
      let o = ct([e]);
      o && t.theme.clearNamespace(`--${o}`, 4);
    }
    for (let [e, o] of Mo(r)) {
      if (typeof o != "string" && typeof o != "number") continue;
      if (
        (typeof o == "string" && (o = o.replace(/<alpha-value>/g, "1")),
        e[0] === "opacity" && (typeof o == "number" || typeof o == "string"))
      ) {
        let a = typeof o == "string" ? parseFloat(o) : o;
        a >= 0 && a <= 1 && (o = a * 100 + "%");
      }
      let s = ct(e);
      s && t.theme.add(`--${s}`, "" + o, 7);
    }
    if (Object.hasOwn(r, "fontFamily")) {
      let e = 5;
      {
        let o = Ee(r.fontFamily.sans);
        o &&
          t.theme.hasDefault("--font-sans") &&
          (t.theme.add("--default-font-family", o, e),
          t.theme.add(
            "--default-font-feature-settings",
            Ee(r.fontFamily.sans, "fontFeatureSettings") ?? "normal",
            e
          ),
          t.theme.add(
            "--default-font-variation-settings",
            Ee(r.fontFamily.sans, "fontVariationSettings") ?? "normal",
            e
          ));
      }
      {
        let o = Ee(r.fontFamily.mono);
        o &&
          t.theme.hasDefault("--font-mono") &&
          (t.theme.add("--default-mono-font-family", o, e),
          t.theme.add(
            "--default-mono-font-feature-settings",
            Ee(r.fontFamily.mono, "fontFeatureSettings") ?? "normal",
            e
          ),
          t.theme.add(
            "--default-mono-font-variation-settings",
            Ee(r.fontFamily.mono, "fontVariationSettings") ?? "normal",
            e
          ));
      }
    }
    return r;
  }
  function Mo(t) {
    let r = [];
    return (
      qr(t, [], (i, e) => {
        if (Wo(i)) return r.push([e, i]), 1;
        if (qo(i)) {
          r.push([e, i[0]]);
          for (let o of Reflect.ownKeys(i[1]))
            r.push([[...e, `-${o}`], i[1][o]]);
          return 1;
        }
        if (Array.isArray(i) && i.every((o) => typeof o == "string"))
          return (
            e[0] === "fontSize"
              ? (r.push([e, i[0]]),
                i.length >= 2 && r.push([[...e, "-line-height"], i[1]]))
              : r.push([e, i.join(", ")]),
            1
          );
      }),
      r
    );
  }
  var Bo = /^[a-zA-Z0-9-_%/\.]+$/;
  function ct(t) {
    if (t[0] === "container") return null;
    (t = structuredClone(t)),
      t[0] === "animation" && (t[0] = "animate"),
      t[0] === "aspectRatio" && (t[0] = "aspect"),
      t[0] === "borderRadius" && (t[0] = "radius"),
      t[0] === "boxShadow" && (t[0] = "shadow"),
      t[0] === "colors" && (t[0] = "color"),
      t[0] === "containers" && (t[0] = "container"),
      t[0] === "fontFamily" && (t[0] = "font"),
      t[0] === "fontSize" && (t[0] = "text"),
      t[0] === "letterSpacing" && (t[0] = "tracking"),
      t[0] === "lineHeight" && (t[0] = "leading"),
      t[0] === "maxWidth" && (t[0] = "container"),
      t[0] === "screens" && (t[0] = "breakpoint"),
      t[0] === "transitionTimingFunction" && (t[0] = "ease");
    for (let r of t) if (!Bo.test(r)) return null;
    return t
      .map((r, i, e) => (r === "1" && i !== e.length - 1 ? "" : r))
      .map((r) =>
        r
          .replaceAll(".", "_")
          .replace(/([a-z])([A-Z])/g, (i, e, o) => `${e}-${o.toLowerCase()}`)
      )
      .filter((r, i) => r !== "DEFAULT" || i !== t.length - 1)
      .join("-");
  }
  function Wo(t) {
    return typeof t == "number" || typeof t == "string";
  }
  function qo(t) {
    if (
      !Array.isArray(t) ||
      t.length !== 2 ||
      (typeof t[0] != "string" && typeof t[0] != "number") ||
      t[1] === void 0 ||
      t[1] === null ||
      typeof t[1] != "object"
    )
      return !1;
    for (let r of Reflect.ownKeys(t[1]))
      if (
        typeof r != "string" ||
        (typeof t[1][r] != "string" && typeof t[1][r] != "number")
      )
        return !1;
    return !0;
  }
  function qr(t, r = [], i) {
    for (let e of Reflect.ownKeys(t)) {
      let o = t[e];
      if (o == null) continue;
      let s = [...r, e],
        a = i(o, s) ?? 0;
      if (a !== 1) {
        if (a === 2) return 2;
        if (!(!Array.isArray(o) && typeof o != "object") && qr(o, s, i) === 2)
          return 2;
      }
    }
  }
  function ft(t) {
    let r = [];
    for (let i of z(t, ".")) {
      if (!i.includes("[")) {
        r.push(i);
        continue;
      }
      let e = 0;
      for (;;) {
        let o = i.indexOf("[", e),
          s = i.indexOf("]", o);
        if (o === -1 || s === -1) break;
        o > e && r.push(i.slice(e, o)), r.push(i.slice(o + 1, s)), (e = s + 1);
      }
      e <= i.length - 1 && r.push(i.slice(e));
    }
    return r;
  }
  function Re(t) {
    if (Object.prototype.toString.call(t) !== "[object Object]") return !1;
    let r = Object.getPrototypeOf(t);
    return r === null || Object.getPrototypeOf(r) === null;
  }
  function Le(t, r, i, e = []) {
    for (let o of r)
      if (o != null)
        for (let s of Reflect.ownKeys(o)) {
          e.push(s);
          let a = i(t[s], o[s], e);
          a !== void 0
            ? (t[s] = a)
            : !Re(t[s]) || !Re(o[s])
            ? (t[s] = o[s])
            : (t[s] = Le({}, [t[s], o[s]], i, e)),
            e.pop();
        }
    return t;
  }
  function dt(t, r, i) {
    return function (o, s) {
      let a = o.lastIndexOf("/"),
        f = null;
      a !== -1 && ((f = o.slice(a + 1).trim()), (o = o.slice(0, a).trim()));
      let u = (() => {
        let c = ft(o),
          [g, p] = Ho(t.theme, c),
          m = i(Hr(r() ?? {}, c) ?? null);
        if (
          (typeof m == "string" && (m = m.replace("<alpha-value>", "1")),
          typeof g != "object")
        )
          return typeof p != "object" && p & 4 ? m ?? g : g;
        if (m !== null && typeof m == "object" && !Array.isArray(m)) {
          let v = Le({}, [m], (k, x) => x);
          if (g === null && Object.hasOwn(m, "__CSS_VALUES__")) {
            let k = {};
            for (let x in m.__CSS_VALUES__) (k[x] = m[x]), delete v[x];
            g = k;
          }
          for (let k in g)
            k !== "__CSS_VALUES__" &&
              ((m?.__CSS_VALUES__?.[k] & 4 && Hr(v, k.split("-")) !== void 0) ||
                (v[ve(k)] = g[k]));
          return v;
        }
        if (Array.isArray(g) && Array.isArray(p) && Array.isArray(m)) {
          let v = g[0],
            k = g[1];
          p[0] & 4 && (v = m[0] ?? v);
          for (let x of Object.keys(k)) p[1][x] & 4 && (k[x] = m[1][x] ?? k[x]);
          return [v, k];
        }
        return g ?? m;
      })();
      return f && typeof u == "string" && (u = Z(u, f)), u ?? s;
    };
  }
  function Ho(t, r) {
    if (r.length === 1 && r[0].startsWith("--"))
      return [t.get([r[0]]), t.getOptions(r[0])];
    let i = ct(r),
      e = new Map(),
      o = new W(() => new Map()),
      s = t.namespace(`--${i}`);
    if (s.size === 0) return [null, 0];
    let a = new Map();
    for (let [g, p] of s) {
      if (!g || !g.includes("--")) {
        e.set(g, p), a.set(g, t.getOptions(g ? `--${i}-${g}` : `--${i}`));
        continue;
      }
      let m = g.indexOf("--"),
        v = g.slice(0, m),
        k = g.slice(m + 2);
      (k = k.replace(/-([a-z])/g, (x, y) => y.toUpperCase())),
        o.get(v === "" ? null : v).set(k, [p, t.getOptions(`--${i}${g}`)]);
    }
    let f = t.getOptions(`--${i}`);
    for (let [g, p] of o) {
      let m = e.get(g);
      if (typeof m != "string") continue;
      let v = {},
        k = {};
      for (let [x, [y, N]] of p) (v[x] = y), (k[x] = N);
      e.set(g, [m, v]), a.set(g, [f, k]);
    }
    let u = {},
      c = {};
    for (let [g, p] of e) Gr(u, [g ?? "DEFAULT"], p);
    for (let [g, p] of a) Gr(c, [g ?? "DEFAULT"], p);
    return r[r.length - 1] === "DEFAULT"
      ? [u?.DEFAULT ?? null, c.DEFAULT ?? 0]
      : "DEFAULT" in u && Object.keys(u).length === 1
      ? [u.DEFAULT, c.DEFAULT ?? 0]
      : ((u.__CSS_VALUES__ = c), [u, c]);
  }
  function Hr(t, r) {
    for (let i = 0; i < r.length; ++i) {
      let e = r[i];
      if (t?.[e] === void 0) {
        if (r[i + 1] === void 0) return;
        r[i + 1] = `${e}-${r[i + 1]}`;
        continue;
      }
      t = t[e];
    }
    return t;
  }
  function Gr(t, r, i) {
    for (let e of r.slice(0, -1)) t[e] === void 0 && (t[e] = {}), (t = t[e]);
    t[r[r.length - 1]] = i;
  }
  function Go(t) {
    return { kind: "combinator", value: t };
  }
  function Yo(t, r) {
    return { kind: "function", value: t, nodes: r };
  }
  function Ie(t) {
    return { kind: "selector", value: t };
  }
  function Jo(t) {
    return { kind: "separator", value: t };
  }
  function Qo(t) {
    return { kind: "value", value: t };
  }
  function Fe(t, r, i = null) {
    for (let e = 0; e < t.length; e++) {
      let o = t[e],
        s = !1,
        a = 0,
        f =
          r(o, {
            parent: i,
            replaceWith(u) {
              s ||
                ((s = !0),
                Array.isArray(u)
                  ? u.length === 0
                    ? (t.splice(e, 1), (a = 0))
                    : u.length === 1
                    ? ((t[e] = u[0]), (a = 1))
                    : (t.splice(e, 1, ...u), (a = u.length))
                  : ((t[e] = u), (a = 1)));
            },
          }) ?? 0;
      if (s) {
        f === 0 ? e-- : (e += a - 1);
        continue;
      }
      if (f === 2) return 2;
      if (f !== 1 && o.kind === "function" && Fe(o.nodes, r, o) === 2) return 2;
    }
  }
  function Me(t) {
    let r = "";
    for (let i of t)
      switch (i.kind) {
        case "combinator":
        case "selector":
        case "separator":
        case "value": {
          r += i.value;
          break;
        }
        case "function":
          r += i.value + "(" + Me(i.nodes) + ")";
      }
    return r;
  }
  var Yr = 92,
    Zo = 93,
    Jr = 41,
    Xo = 58,
    Qr = 44,
    en = 34,
    tn = 46,
    Zr = 62,
    Xr = 10,
    rn = 35,
    ei = 91,
    ti = 40,
    ri = 43,
    on = 39,
    ii = 32,
    oi = 9,
    ni = 126;
  function pt(t) {
    t = t.replaceAll(
      `\r
`,
      `
`
    );
    let r = [],
      i = [],
      e = null,
      o = "",
      s;
    for (let a = 0; a < t.length; a++) {
      let f = t.charCodeAt(a);
      switch (f) {
        case Qr:
        case Zr:
        case Xr:
        case ii:
        case ri:
        case oi:
        case ni: {
          if (o.length > 0) {
            let m = Ie(o);
            e ? e.nodes.push(m) : r.push(m), (o = "");
          }
          let u = a,
            c = a + 1;
          for (
            ;
            c < t.length &&
            ((s = t.charCodeAt(c)),
            !(
              s !== Qr &&
              s !== Zr &&
              s !== Xr &&
              s !== ii &&
              s !== ri &&
              s !== oi &&
              s !== ni
            ));
            c++
          );
          a = c - 1;
          let g = t.slice(u, c),
            p = g.trim() === "," ? Jo(g) : Go(g);
          e ? e.nodes.push(p) : r.push(p);
          break;
        }
        case ti: {
          let u = Yo(o, []);
          if (
            ((o = ""),
            u.value !== ":not" &&
              u.value !== ":where" &&
              u.value !== ":has" &&
              u.value !== ":is")
          ) {
            let c = a + 1,
              g = 0;
            for (let m = a + 1; m < t.length; m++) {
              if (((s = t.charCodeAt(m)), s === ti)) {
                g++;
                continue;
              }
              if (s === Jr) {
                if (g === 0) {
                  a = m;
                  break;
                }
                g--;
              }
            }
            let p = a;
            u.nodes.push(Qo(t.slice(c, p))),
              (o = ""),
              (a = p),
              e ? e.nodes.push(u) : r.push(u);
            break;
          }
          e ? e.nodes.push(u) : r.push(u), i.push(u), (e = u);
          break;
        }
        case Jr: {
          let u = i.pop();
          if (o.length > 0) {
            let c = Ie(o);
            u.nodes.push(c), (o = "");
          }
          i.length > 0 ? (e = i[i.length - 1]) : (e = null);
          break;
        }
        case tn:
        case Xo:
        case rn: {
          if (o.length > 0) {
            let u = Ie(o);
            e ? e.nodes.push(u) : r.push(u);
          }
          o = String.fromCharCode(f);
          break;
        }
        case ei: {
          if (o.length > 0) {
            let g = Ie(o);
            e ? e.nodes.push(g) : r.push(g);
          }
          o = "";
          let u = a,
            c = 0;
          for (let g = a + 1; g < t.length; g++) {
            if (((s = t.charCodeAt(g)), s === ei)) {
              c++;
              continue;
            }
            if (s === Zo) {
              if (c === 0) {
                a = g;
                break;
              }
              c--;
            }
          }
          o += t.slice(u, a + 1);
          break;
        }
        case on:
        case en: {
          let u = a;
          for (let c = a + 1; c < t.length; c++)
            if (((s = t.charCodeAt(c)), s === Yr)) c += 1;
            else if (s === f) {
              a = c;
              break;
            }
          o += t.slice(u, a + 1);
          break;
        }
        case Yr: {
          let u = t.charCodeAt(a + 1);
          (o += String.fromCharCode(f) + String.fromCharCode(u)), (a += 1);
          break;
        }
        default:
          o += String.fromCharCode(f);
      }
    }
    return o.length > 0 && r.push(Ie(o)), r;
  }
  var li = /^[a-z@][a-zA-Z0-9/%._-]*$/;
  function Mt({
    designSystem: t,
    ast: r,
    resolvedConfig: i,
    featuresRef: e,
    referenceMode: o,
  }) {
    let s = {
      addBase(a) {
        if (o) return;
        let f = ce(a);
        (e.current |= Ve(f, t)), r.push(F("@layer", "base", f));
      },
      addVariant(a, f) {
        if (!ut.test(a))
          throw new Error(
            `\`addVariant('${a}')\` defines an invalid variant name. Variants should only contain alphanumeric, dashes or underscore characters.`
          );
        if (typeof f == "string") {
          if (f.includes(":merge(")) return;
        } else if (Array.isArray(f)) {
          if (f.some((c) => c.includes(":merge("))) return;
        } else if (typeof f == "object") {
          let c = function (g, p) {
            return Object.entries(g).some(
              ([m, v]) => m.includes(p) || (typeof v == "object" && c(v, p))
            );
          };
          var u = c;
          if (c(f, ":merge(")) return;
        }
        typeof f == "string" || Array.isArray(f)
          ? t.variants.static(
              a,
              (c) => {
                c.nodes = ai(f, c.nodes);
              },
              { compounds: Ae(typeof f == "string" ? [f] : f) }
            )
          : typeof f == "object" && t.variants.fromAst(a, ce(f));
      },
      matchVariant(a, f, u) {
        function c(p, m, v) {
          let k = f(p, { modifier: m?.value ?? null });
          return ai(k, v);
        }
        try {
          let p = f("a", { modifier: null });
          if (typeof p == "string" && p.includes(":merge(")) return;
          if (Array.isArray(p) && p.some((m) => m.includes(":merge("))) return;
        } catch {}
        let g = Object.keys(u?.values ?? {});
        t.variants.group(
          () => {
            t.variants.functional(a, (p, m) => {
              if (!m.value) {
                if (u?.values && "DEFAULT" in u.values) {
                  p.nodes = c(u.values.DEFAULT, m.modifier, p.nodes);
                  return;
                }
                return null;
              }
              if (m.value.kind === "arbitrary")
                p.nodes = c(m.value.value, m.modifier, p.nodes);
              else if (m.value.kind === "named" && u?.values) {
                let v = u.values[m.value.value];
                if (typeof v != "string") return;
                p.nodes = c(v, m.modifier, p.nodes);
              }
            });
          },
          (p, m) => {
            if (p.kind !== "functional" || m.kind !== "functional") return 0;
            let v = p.value ? p.value.value : "DEFAULT",
              k = m.value ? m.value.value : "DEFAULT",
              x = u?.values?.[v] ?? v,
              y = u?.values?.[k] ?? k;
            if (u && typeof u.sort == "function")
              return u.sort(
                { value: x, modifier: p.modifier?.value ?? null },
                { value: y, modifier: m.modifier?.value ?? null }
              );
            let N = g.indexOf(v),
              b = g.indexOf(k);
            return (
              (N = N === -1 ? g.length : N),
              (b = b === -1 ? g.length : b),
              N !== b ? N - b : x < y ? -1 : 1
            );
          }
        );
      },
      addUtilities(a) {
        a = Array.isArray(a) ? a : [a];
        let f = a.flatMap((c) => Object.entries(c));
        f = f.flatMap(([c, g]) => z(c, ",").map((p) => [p.trim(), g]));
        let u = new W(() => []);
        for (let [c, g] of f) {
          if (c.startsWith("@keyframes ")) {
            o || r.push(G(c, ce(g)));
            continue;
          }
          let p = pt(c),
            m = !1;
          if (
            (Fe(p, (v) => {
              if (
                v.kind === "selector" &&
                v.value[0] === "." &&
                li.test(v.value.slice(1))
              ) {
                let k = v.value;
                v.value = "&";
                let x = Me(p),
                  y = k.slice(1),
                  N = x === "&" ? ce(g) : [G(x, ce(g))];
                u.get(y).push(...N), (m = !0), (v.value = k);
                return;
              }
              if (v.kind === "function" && v.value === ":not") return 1;
            }),
            !m)
          )
            throw new Error(
              `\`addUtilities({ '${c}' : \u2026 })\` defines an invalid utility selector. Utilities must be a single class name and start with a lowercase letter, eg. \`.scrollbar-none\`.`
            );
        }
        for (let [c, g] of u)
          t.theme.prefix &&
            L(g, (p) => {
              if (p.kind === "rule") {
                let m = pt(p.selector);
                Fe(m, (v) => {
                  v.kind === "selector" &&
                    v.value[0] === "." &&
                    (v.value = `.${t.theme.prefix}\\:${v.value.slice(1)}`);
                }),
                  (p.selector = Me(m));
              }
            }),
            t.utilities.static(c, (p) => {
              let m = structuredClone(g);
              return si(m, c, p.raw), (e.current |= je(m, t)), m;
            });
      },
      matchUtilities(a, f) {
        let u = f?.type
          ? Array.isArray(f?.type)
            ? f.type
            : [f.type]
          : ["any"];
        for (let [g, p] of Object.entries(a)) {
          let m = function ({ negative: v }) {
            return (k) => {
              if (
                k.value?.kind === "arbitrary" &&
                u.length > 0 &&
                !u.includes("any") &&
                ((k.value.dataType && !u.includes(k.value.dataType)) ||
                  (!k.value.dataType && !Y(k.value.value, u)))
              )
                return;
              let x = u.includes("color"),
                y = null,
                N = !1;
              {
                let R = f?.values ?? {};
                x &&
                  (R = Object.assign(
                    {
                      inherit: "inherit",
                      transparent: "transparent",
                      current: "currentcolor",
                    },
                    R
                  )),
                  k.value
                    ? k.value.kind === "arbitrary"
                      ? (y = k.value.value)
                      : k.value.fraction && R[k.value.fraction]
                      ? ((y = R[k.value.fraction]), (N = !0))
                      : R[k.value.value]
                      ? (y = R[k.value.value])
                      : R.__BARE_VALUE__ &&
                        ((y = R.__BARE_VALUE__(k.value) ?? null),
                        (N =
                          (k.value.fraction !== null && y?.includes("/")) ??
                          !1))
                    : (y = R.DEFAULT ?? null);
              }
              if (y === null) return;
              let b;
              {
                let R = f?.modifiers ?? null;
                k.modifier
                  ? R === "any" || k.modifier.kind === "arbitrary"
                    ? (b = k.modifier.value)
                    : R?.[k.modifier.value]
                    ? (b = R[k.modifier.value])
                    : x && !Number.isNaN(Number(k.modifier.value))
                    ? (b = `${k.modifier.value}%`)
                    : (b = null)
                  : (b = null);
              }
              if (k.modifier && b === null && !N)
                return k.value?.kind === "arbitrary" ? null : void 0;
              x && b !== null && (y = Z(y, b)), v && (y = `calc(${y} * -1)`);
              let V = ce(p(y, { modifier: b }));
              return si(V, g, k.raw), (e.current |= je(V, t)), V;
            };
          };
          var c = m;
          if (!li.test(g))
            throw new Error(
              `\`matchUtilities({ '${g}' : \u2026 })\` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter, eg. \`scrollbar\`.`
            );
          f?.supportsNegativeValues &&
            t.utilities.functional(`-${g}`, m({ negative: !0 }), { types: u }),
            t.utilities.functional(g, m({ negative: !1 }), { types: u }),
            t.utilities.suggest(g, () => {
              let v = f?.values ?? {},
                k = new Set(Object.keys(v));
              k.delete("__BARE_VALUE__"),
                k.has("DEFAULT") && (k.delete("DEFAULT"), k.add(null));
              let x = f?.modifiers ?? {},
                y = x === "any" ? [] : Object.keys(x);
              return [
                {
                  supportsNegative: f?.supportsNegativeValues ?? !1,
                  values: Array.from(k),
                  modifiers: y,
                },
              ];
            });
        }
      },
      addComponents(a, f) {
        this.addUtilities(a, f);
      },
      matchComponents(a, f) {
        this.matchUtilities(a, f);
      },
      theme: dt(
        t,
        () => i.theme ?? {},
        (a) => a
      ),
      prefix(a) {
        return a;
      },
      config(a, f) {
        let u = i;
        if (!a) return u;
        let c = ft(a);
        for (let g = 0; g < c.length; ++g) {
          let p = c[g];
          if (u[p] === void 0) return f;
          u = u[p];
        }
        return u ?? f;
      },
    };
    return (
      (s.addComponents = s.addComponents.bind(s)),
      (s.matchComponents = s.matchComponents.bind(s)),
      s
    );
  }
  function ce(t) {
    let r = [];
    t = Array.isArray(t) ? t : [t];
    let i = t.flatMap((e) => Object.entries(e));
    for (let [e, o] of i)
      if (typeof o != "object") {
        if (!e.startsWith("--")) {
          if (o === "@slot") {
            r.push(G(e, [F("@slot")]));
            continue;
          }
          e = e.replace(/([A-Z])/g, "-$1").toLowerCase();
        }
        r.push(l(e, String(o)));
      } else if (Array.isArray(o))
        for (let s of o)
          typeof s == "string" ? r.push(l(e, s)) : r.push(G(e, ce(s)));
      else o !== null && r.push(G(e, ce(o)));
    return r;
  }
  function ai(t, r) {
    return (typeof t == "string" ? [t] : t).flatMap((e) => {
      if (e.trim().endsWith("}")) {
        let o = e.replace("}", "{@slot}}"),
          s = $e(o);
        return Lt(s, r), s;
      } else return G(e, r);
    });
  }
  function si(t, r, i) {
    L(t, (e) => {
      if (e.kind === "rule") {
        let o = pt(e.selector);
        Fe(o, (s) => {
          s.kind === "selector" &&
            s.value === `.${r}` &&
            (s.value = `.${me(i)}`);
        }),
          (e.selector = Me(o));
      }
    });
  }
  function ui(t, r, i) {
    for (let e of ln(r)) t.theme.addKeyframes(e);
  }
  function ln(t) {
    let r = [];
    if ("keyframes" in t.theme)
      for (let [i, e] of Object.entries(t.theme.keyframes))
        r.push(F("@keyframes", i, ce(e)));
    return r;
  }
  var mt = {
    inherit: "inherit",
    current: "currentcolor",
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    slate: {
      50: "oklch(98.4% 0.003 247.858)",
      100: "oklch(96.8% 0.007 247.896)",
      200: "oklch(92.9% 0.013 255.508)",
      300: "oklch(86.9% 0.022 252.894)",
      400: "oklch(70.4% 0.04 256.788)",
      500: "oklch(55.4% 0.046 257.417)",
      600: "oklch(44.6% 0.043 257.281)",
      700: "oklch(37.2% 0.044 257.287)",
      800: "oklch(27.9% 0.041 260.031)",
      900: "oklch(20.8% 0.042 265.755)",
      950: "oklch(12.9% 0.042 264.695)",
    },
    gray: {
      50: "oklch(98.5% 0.002 247.839)",
      100: "oklch(96.7% 0.003 264.542)",
      200: "oklch(92.8% 0.006 264.531)",
      300: "oklch(87.2% 0.01 258.338)",
      400: "oklch(70.7% 0.022 261.325)",
      500: "oklch(55.1% 0.027 264.364)",
      600: "oklch(44.6% 0.03 256.802)",
      700: "oklch(37.3% 0.034 259.733)",
      800: "oklch(27.8% 0.033 256.848)",
      900: "oklch(21% 0.034 264.665)",
      950: "oklch(13% 0.028 261.692)",
    },
    zinc: {
      50: "oklch(98.5% 0 0)",
      100: "oklch(96.7% 0.001 286.375)",
      200: "oklch(92% 0.004 286.32)",
      300: "oklch(87.1% 0.006 286.286)",
      400: "oklch(70.5% 0.015 286.067)",
      500: "oklch(55.2% 0.016 285.938)",
      600: "oklch(44.2% 0.017 285.786)",
      700: "oklch(37% 0.013 285.805)",
      800: "oklch(27.4% 0.006 286.033)",
      900: "oklch(21% 0.006 285.885)",
      950: "oklch(14.1% 0.005 285.823)",
    },
    neutral: {
      50: "oklch(98.5% 0 0)",
      100: "oklch(97% 0 0)",
      200: "oklch(92.2% 0 0)",
      300: "oklch(87% 0 0)",
      400: "oklch(70.8% 0 0)",
      500: "oklch(55.6% 0 0)",
      600: "oklch(43.9% 0 0)",
      700: "oklch(37.1% 0 0)",
      800: "oklch(26.9% 0 0)",
      900: "oklch(20.5% 0 0)",
      950: "oklch(14.5% 0 0)",
    },
    stone: {
      50: "oklch(98.5% 0.001 106.423)",
      100: "oklch(97% 0.001 106.424)",
      200: "oklch(92.3% 0.003 48.717)",
      300: "oklch(86.9% 0.005 56.366)",
      400: "oklch(70.9% 0.01 56.259)",
      500: "oklch(55.3% 0.013 58.071)",
      600: "oklch(44.4% 0.011 73.639)",
      700: "oklch(37.4% 0.01 67.558)",
      800: "oklch(26.8% 0.007 34.298)",
      900: "oklch(21.6% 0.006 56.043)",
      950: "oklch(14.7% 0.004 49.25)",
    },
    red: {
      50: "oklch(97.1% 0.013 17.38)",
      100: "oklch(93.6% 0.032 17.717)",
      200: "oklch(88.5% 0.062 18.334)",
      300: "oklch(80.8% 0.114 19.571)",
      400: "oklch(70.4% 0.191 22.216)",
      500: "oklch(63.7% 0.237 25.331)",
      600: "oklch(57.7% 0.245 27.325)",
      700: "oklch(50.5% 0.213 27.518)",
      800: "oklch(44.4% 0.177 26.899)",
      900: "oklch(39.6% 0.141 25.723)",
      950: "oklch(25.8% 0.092 26.042)",
    },
    orange: {
      50: "oklch(98% 0.016 73.684)",
      100: "oklch(95.4% 0.038 75.164)",
      200: "oklch(90.1% 0.076 70.697)",
      300: "oklch(83.7% 0.128 66.29)",
      400: "oklch(75% 0.183 55.934)",
      500: "oklch(70.5% 0.213 47.604)",
      600: "oklch(64.6% 0.222 41.116)",
      700: "oklch(55.3% 0.195 38.402)",
      800: "oklch(47% 0.157 37.304)",
      900: "oklch(40.8% 0.123 38.172)",
      950: "oklch(26.6% 0.079 36.259)",
    },
    amber: {
      50: "oklch(98.7% 0.022 95.277)",
      100: "oklch(96.2% 0.059 95.617)",
      200: "oklch(92.4% 0.12 95.746)",
      300: "oklch(87.9% 0.169 91.605)",
      400: "oklch(82.8% 0.189 84.429)",
      500: "oklch(76.9% 0.188 70.08)",
      600: "oklch(66.6% 0.179 58.318)",
      700: "oklch(55.5% 0.163 48.998)",
      800: "oklch(47.3% 0.137 46.201)",
      900: "oklch(41.4% 0.112 45.904)",
      950: "oklch(27.9% 0.077 45.635)",
    },
    yellow: {
      50: "oklch(98.7% 0.026 102.212)",
      100: "oklch(97.3% 0.071 103.193)",
      200: "oklch(94.5% 0.129 101.54)",
      300: "oklch(90.5% 0.182 98.111)",
      400: "oklch(85.2% 0.199 91.936)",
      500: "oklch(79.5% 0.184 86.047)",
      600: "oklch(68.1% 0.162 75.834)",
      700: "oklch(55.4% 0.135 66.442)",
      800: "oklch(47.6% 0.114 61.907)",
      900: "oklch(42.1% 0.095 57.708)",
      950: "oklch(28.6% 0.066 53.813)",
    },
    lime: {
      50: "oklch(98.6% 0.031 120.757)",
      100: "oklch(96.7% 0.067 122.328)",
      200: "oklch(93.8% 0.127 124.321)",
      300: "oklch(89.7% 0.196 126.665)",
      400: "oklch(84.1% 0.238 128.85)",
      500: "oklch(76.8% 0.233 130.85)",
      600: "oklch(64.8% 0.2 131.684)",
      700: "oklch(53.2% 0.157 131.589)",
      800: "oklch(45.3% 0.124 130.933)",
      900: "oklch(40.5% 0.101 131.063)",
      950: "oklch(27.4% 0.072 132.109)",
    },
    green: {
      50: "oklch(98.2% 0.018 155.826)",
      100: "oklch(96.2% 0.044 156.743)",
      200: "oklch(92.5% 0.084 155.995)",
      300: "oklch(87.1% 0.15 154.449)",
      400: "oklch(79.2% 0.209 151.711)",
      500: "oklch(72.3% 0.219 149.579)",
      600: "oklch(62.7% 0.194 149.214)",
      700: "oklch(52.7% 0.154 150.069)",
      800: "oklch(44.8% 0.119 151.328)",
      900: "oklch(39.3% 0.095 152.535)",
      950: "oklch(26.6% 0.065 152.934)",
    },
    emerald: {
      50: "oklch(97.9% 0.021 166.113)",
      100: "oklch(95% 0.052 163.051)",
      200: "oklch(90.5% 0.093 164.15)",
      300: "oklch(84.5% 0.143 164.978)",
      400: "oklch(76.5% 0.177 163.223)",
      500: "oklch(69.6% 0.17 162.48)",
      600: "oklch(59.6% 0.145 163.225)",
      700: "oklch(50.8% 0.118 165.612)",
      800: "oklch(43.2% 0.095 166.913)",
      900: "oklch(37.8% 0.077 168.94)",
      950: "oklch(26.2% 0.051 172.552)",
    },
    teal: {
      50: "oklch(98.4% 0.014 180.72)",
      100: "oklch(95.3% 0.051 180.801)",
      200: "oklch(91% 0.096 180.426)",
      300: "oklch(85.5% 0.138 181.071)",
      400: "oklch(77.7% 0.152 181.912)",
      500: "oklch(70.4% 0.14 182.503)",
      600: "oklch(60% 0.118 184.704)",
      700: "oklch(51.1% 0.096 186.391)",
      800: "oklch(43.7% 0.078 188.216)",
      900: "oklch(38.6% 0.063 188.416)",
      950: "oklch(27.7% 0.046 192.524)",
    },
    cyan: {
      50: "oklch(98.4% 0.019 200.873)",
      100: "oklch(95.6% 0.045 203.388)",
      200: "oklch(91.7% 0.08 205.041)",
      300: "oklch(86.5% 0.127 207.078)",
      400: "oklch(78.9% 0.154 211.53)",
      500: "oklch(71.5% 0.143 215.221)",
      600: "oklch(60.9% 0.126 221.723)",
      700: "oklch(52% 0.105 223.128)",
      800: "oklch(45% 0.085 224.283)",
      900: "oklch(39.8% 0.07 227.392)",
      950: "oklch(30.2% 0.056 229.695)",
    },
    sky: {
      50: "oklch(97.7% 0.013 236.62)",
      100: "oklch(95.1% 0.026 236.824)",
      200: "oklch(90.1% 0.058 230.902)",
      300: "oklch(82.8% 0.111 230.318)",
      400: "oklch(74.6% 0.16 232.661)",
      500: "oklch(68.5% 0.169 237.323)",
      600: "oklch(58.8% 0.158 241.966)",
      700: "oklch(50% 0.134 242.749)",
      800: "oklch(44.3% 0.11 240.79)",
      900: "oklch(39.1% 0.09 240.876)",
      950: "oklch(29.3% 0.066 243.157)",
    },
    blue: {
      50: "oklch(97% 0.014 254.604)",
      100: "oklch(93.2% 0.032 255.585)",
      200: "oklch(88.2% 0.059 254.128)",
      300: "oklch(80.9% 0.105 251.813)",
      400: "oklch(70.7% 0.165 254.624)",
      500: "oklch(62.3% 0.214 259.815)",
      600: "oklch(54.6% 0.245 262.881)",
      700: "oklch(48.8% 0.243 264.376)",
      800: "oklch(42.4% 0.199 265.638)",
      900: "oklch(37.9% 0.146 265.522)",
      950: "oklch(28.2% 0.091 267.935)",
    },
    indigo: {
      50: "oklch(96.2% 0.018 272.314)",
      100: "oklch(93% 0.034 272.788)",
      200: "oklch(87% 0.065 274.039)",
      300: "oklch(78.5% 0.115 274.713)",
      400: "oklch(67.3% 0.182 276.935)",
      500: "oklch(58.5% 0.233 277.117)",
      600: "oklch(51.1% 0.262 276.966)",
      700: "oklch(45.7% 0.24 277.023)",
      800: "oklch(39.8% 0.195 277.366)",
      900: "oklch(35.9% 0.144 278.697)",
      950: "oklch(25.7% 0.09 281.288)",
    },
    violet: {
      50: "oklch(96.9% 0.016 293.756)",
      100: "oklch(94.3% 0.029 294.588)",
      200: "oklch(89.4% 0.057 293.283)",
      300: "oklch(81.1% 0.111 293.571)",
      400: "oklch(70.2% 0.183 293.541)",
      500: "oklch(60.6% 0.25 292.717)",
      600: "oklch(54.1% 0.281 293.009)",
      700: "oklch(49.1% 0.27 292.581)",
      800: "oklch(43.2% 0.232 292.759)",
      900: "oklch(38% 0.189 293.745)",
      950: "oklch(28.3% 0.141 291.089)",
    },
    purple: {
      50: "oklch(97.7% 0.014 308.299)",
      100: "oklch(94.6% 0.033 307.174)",
      200: "oklch(90.2% 0.063 306.703)",
      300: "oklch(82.7% 0.119 306.383)",
      400: "oklch(71.4% 0.203 305.504)",
      500: "oklch(62.7% 0.265 303.9)",
      600: "oklch(55.8% 0.288 302.321)",
      700: "oklch(49.6% 0.265 301.924)",
      800: "oklch(43.8% 0.218 303.724)",
      900: "oklch(38.1% 0.176 304.987)",
      950: "oklch(29.1% 0.149 302.717)",
    },
    fuchsia: {
      50: "oklch(97.7% 0.017 320.058)",
      100: "oklch(95.2% 0.037 318.852)",
      200: "oklch(90.3% 0.076 319.62)",
      300: "oklch(83.3% 0.145 321.434)",
      400: "oklch(74% 0.238 322.16)",
      500: "oklch(66.7% 0.295 322.15)",
      600: "oklch(59.1% 0.293 322.896)",
      700: "oklch(51.8% 0.253 323.949)",
      800: "oklch(45.2% 0.211 324.591)",
      900: "oklch(40.1% 0.17 325.612)",
      950: "oklch(29.3% 0.136 325.661)",
    },
    pink: {
      50: "oklch(97.1% 0.014 343.198)",
      100: "oklch(94.8% 0.028 342.258)",
      200: "oklch(89.9% 0.061 343.231)",
      300: "oklch(82.3% 0.12 346.018)",
      400: "oklch(71.8% 0.202 349.761)",
      500: "oklch(65.6% 0.241 354.308)",
      600: "oklch(59.2% 0.249 0.584)",
      700: "oklch(52.5% 0.223 3.958)",
      800: "oklch(45.9% 0.187 3.815)",
      900: "oklch(40.8% 0.153 2.432)",
      950: "oklch(28.4% 0.109 3.907)",
    },
    rose: {
      50: "oklch(96.9% 0.015 12.422)",
      100: "oklch(94.1% 0.03 12.58)",
      200: "oklch(89.2% 0.058 10.001)",
      300: "oklch(81% 0.117 11.638)",
      400: "oklch(71.2% 0.194 13.428)",
      500: "oklch(64.5% 0.246 16.439)",
      600: "oklch(58.6% 0.253 17.585)",
      700: "oklch(51.4% 0.222 16.935)",
      800: "oklch(45.5% 0.188 13.697)",
      900: "oklch(41% 0.159 10.272)",
      950: "oklch(27.1% 0.105 12.094)",
    },
  };
  function Ce(t) {
    return { __BARE_VALUE__: t };
  }
  var ae = Ce((t) => {
      if (E(t.value)) return t.value;
    }),
    ie = Ce((t) => {
      if (E(t.value)) return `${t.value}%`;
    }),
    ke = Ce((t) => {
      if (E(t.value)) return `${t.value}px`;
    }),
    ci = Ce((t) => {
      if (E(t.value)) return `${t.value}ms`;
    }),
    gt = Ce((t) => {
      if (E(t.value)) return `${t.value}deg`;
    }),
    an = Ce((t) => {
      if (t.fraction === null) return;
      let [r, i] = z(t.fraction, "/");
      if (!(!E(r) || !E(i))) return t.fraction;
    }),
    fi = Ce((t) => {
      if (E(Number(t.value))) return `repeat(${t.value}, minmax(0, 1fr))`;
    }),
    di = {
      accentColor: ({ theme: t }) => t("colors"),
      animation: {
        none: "none",
        spin: "spin 1s linear infinite",
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
      },
      aria: {
        busy: 'busy="true"',
        checked: 'checked="true"',
        disabled: 'disabled="true"',
        expanded: 'expanded="true"',
        hidden: 'hidden="true"',
        pressed: 'pressed="true"',
        readonly: 'readonly="true"',
        required: 'required="true"',
        selected: 'selected="true"',
      },
      aspectRatio: { auto: "auto", square: "1 / 1", video: "16 / 9", ...an },
      backdropBlur: ({ theme: t }) => t("blur"),
      backdropBrightness: ({ theme: t }) => ({ ...t("brightness"), ...ie }),
      backdropContrast: ({ theme: t }) => ({ ...t("contrast"), ...ie }),
      backdropGrayscale: ({ theme: t }) => ({ ...t("grayscale"), ...ie }),
      backdropHueRotate: ({ theme: t }) => ({ ...t("hueRotate"), ...gt }),
      backdropInvert: ({ theme: t }) => ({ ...t("invert"), ...ie }),
      backdropOpacity: ({ theme: t }) => ({ ...t("opacity"), ...ie }),
      backdropSaturate: ({ theme: t }) => ({ ...t("saturate"), ...ie }),
      backdropSepia: ({ theme: t }) => ({ ...t("sepia"), ...ie }),
      backgroundColor: ({ theme: t }) => t("colors"),
      backgroundImage: {
        none: "none",
        "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
        "gradient-to-tr":
          "linear-gradient(to top right, var(--tw-gradient-stops))",
        "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
        "gradient-to-br":
          "linear-gradient(to bottom right, var(--tw-gradient-stops))",
        "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
        "gradient-to-bl":
          "linear-gradient(to bottom left, var(--tw-gradient-stops))",
        "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))",
        "gradient-to-tl":
          "linear-gradient(to top left, var(--tw-gradient-stops))",
      },
      backgroundOpacity: ({ theme: t }) => t("opacity"),
      backgroundPosition: {
        bottom: "bottom",
        center: "center",
        left: "left",
        "left-bottom": "left bottom",
        "left-top": "left top",
        right: "right",
        "right-bottom": "right bottom",
        "right-top": "right top",
        top: "top",
      },
      backgroundSize: { auto: "auto", cover: "cover", contain: "contain" },
      blur: {
        0: "0",
        none: "",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      },
      borderColor: ({ theme: t }) => ({
        DEFAULT: "currentcolor",
        ...t("colors"),
      }),
      borderOpacity: ({ theme: t }) => t("opacity"),
      borderRadius: {
        none: "0px",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      borderSpacing: ({ theme: t }) => t("spacing"),
      borderWidth: {
        DEFAULT: "1px",
        0: "0px",
        2: "2px",
        4: "4px",
        8: "8px",
        ...ke,
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "none",
      },
      boxShadowColor: ({ theme: t }) => t("colors"),
      brightness: {
        0: "0",
        50: ".5",
        75: ".75",
        90: ".9",
        95: ".95",
        100: "1",
        105: "1.05",
        110: "1.1",
        125: "1.25",
        150: "1.5",
        200: "2",
        ...ie,
      },
      caretColor: ({ theme: t }) => t("colors"),
      colors: () => ({ ...mt }),
      columns: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        "3xs": "16rem",
        "2xs": "18rem",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        ...ae,
      },
      container: {},
      content: { none: "none" },
      contrast: {
        0: "0",
        50: ".5",
        75: ".75",
        100: "1",
        125: "1.25",
        150: "1.5",
        200: "2",
        ...ie,
      },
      cursor: {
        auto: "auto",
        default: "default",
        pointer: "pointer",
        wait: "wait",
        text: "text",
        move: "move",
        help: "help",
        "not-allowed": "not-allowed",
        none: "none",
        "context-menu": "context-menu",
        progress: "progress",
        cell: "cell",
        crosshair: "crosshair",
        "vertical-text": "vertical-text",
        alias: "alias",
        copy: "copy",
        "no-drop": "no-drop",
        grab: "grab",
        grabbing: "grabbing",
        "all-scroll": "all-scroll",
        "col-resize": "col-resize",
        "row-resize": "row-resize",
        "n-resize": "n-resize",
        "e-resize": "e-resize",
        "s-resize": "s-resize",
        "w-resize": "w-resize",
        "ne-resize": "ne-resize",
        "nw-resize": "nw-resize",
        "se-resize": "se-resize",
        "sw-resize": "sw-resize",
        "ew-resize": "ew-resize",
        "ns-resize": "ns-resize",
        "nesw-resize": "nesw-resize",
        "nwse-resize": "nwse-resize",
        "zoom-in": "zoom-in",
        "zoom-out": "zoom-out",
      },
      divideColor: ({ theme: t }) => t("borderColor"),
      divideOpacity: ({ theme: t }) => t("borderOpacity"),
      divideWidth: ({ theme: t }) => ({ ...t("borderWidth"), ...ke }),
      dropShadow: {
        sm: "0 1px 1px rgb(0 0 0 / 0.05)",
        DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"],
        md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"],
        lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"],
        xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"],
        "2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
        none: "0 0 #0000",
      },
      fill: ({ theme: t }) => t("colors"),
      flex: {
        1: "1 1 0%",
        auto: "1 1 auto",
        initial: "0 1 auto",
        none: "none",
      },
      flexBasis: ({ theme: t }) => ({
        auto: "auto",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        full: "100%",
        ...t("spacing"),
      }),
      flexGrow: { 0: "0", DEFAULT: "1", ...ae },
      flexShrink: { 0: "0", DEFAULT: "1", ...ae },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: [
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      gap: ({ theme: t }) => t("spacing"),
      gradientColorStops: ({ theme: t }) => t("colors"),
      gradientColorStopPositions: {
        "0%": "0%",
        "5%": "5%",
        "10%": "10%",
        "15%": "15%",
        "20%": "20%",
        "25%": "25%",
        "30%": "30%",
        "35%": "35%",
        "40%": "40%",
        "45%": "45%",
        "50%": "50%",
        "55%": "55%",
        "60%": "60%",
        "65%": "65%",
        "70%": "70%",
        "75%": "75%",
        "80%": "80%",
        "85%": "85%",
        "90%": "90%",
        "95%": "95%",
        "100%": "100%",
        ...ie,
      },
      grayscale: { 0: "0", DEFAULT: "100%", ...ie },
      gridAutoColumns: {
        auto: "auto",
        min: "min-content",
        max: "max-content",
        fr: "minmax(0, 1fr)",
      },
      gridAutoRows: {
        auto: "auto",
        min: "min-content",
        max: "max-content",
        fr: "minmax(0, 1fr)",
      },
      gridColumn: {
        auto: "auto",
        "span-1": "span 1 / span 1",
        "span-2": "span 2 / span 2",
        "span-3": "span 3 / span 3",
        "span-4": "span 4 / span 4",
        "span-5": "span 5 / span 5",
        "span-6": "span 6 / span 6",
        "span-7": "span 7 / span 7",
        "span-8": "span 8 / span 8",
        "span-9": "span 9 / span 9",
        "span-10": "span 10 / span 10",
        "span-11": "span 11 / span 11",
        "span-12": "span 12 / span 12",
        "span-full": "1 / -1",
      },
      gridColumnEnd: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        ...ae,
      },
      gridColumnStart: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        ...ae,
      },
      gridRow: {
        auto: "auto",
        "span-1": "span 1 / span 1",
        "span-2": "span 2 / span 2",
        "span-3": "span 3 / span 3",
        "span-4": "span 4 / span 4",
        "span-5": "span 5 / span 5",
        "span-6": "span 6 / span 6",
        "span-7": "span 7 / span 7",
        "span-8": "span 8 / span 8",
        "span-9": "span 9 / span 9",
        "span-10": "span 10 / span 10",
        "span-11": "span 11 / span 11",
        "span-12": "span 12 / span 12",
        "span-full": "1 / -1",
      },
      gridRowEnd: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        ...ae,
      },
      gridRowStart: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        ...ae,
      },
      gridTemplateColumns: {
        none: "none",
        subgrid: "subgrid",
        1: "repeat(1, minmax(0, 1fr))",
        2: "repeat(2, minmax(0, 1fr))",
        3: "repeat(3, minmax(0, 1fr))",
        4: "repeat(4, minmax(0, 1fr))",
        5: "repeat(5, minmax(0, 1fr))",
        6: "repeat(6, minmax(0, 1fr))",
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
        ...fi,
      },
      gridTemplateRows: {
        none: "none",
        subgrid: "subgrid",
        1: "repeat(1, minmax(0, 1fr))",
        2: "repeat(2, minmax(0, 1fr))",
        3: "repeat(3, minmax(0, 1fr))",
        4: "repeat(4, minmax(0, 1fr))",
        5: "repeat(5, minmax(0, 1fr))",
        6: "repeat(6, minmax(0, 1fr))",
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
        ...fi,
      },
      height: ({ theme: t }) => ({
        auto: "auto",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        full: "100%",
        screen: "100vh",
        svh: "100svh",
        lvh: "100lvh",
        dvh: "100dvh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...t("spacing"),
      }),
      hueRotate: {
        0: "0deg",
        15: "15deg",
        30: "30deg",
        60: "60deg",
        90: "90deg",
        180: "180deg",
        ...gt,
      },
      inset: ({ theme: t }) => ({
        auto: "auto",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        full: "100%",
        ...t("spacing"),
      }),
      invert: { 0: "0", DEFAULT: "100%", ...ie },
      keyframes: {
        spin: { to: { transform: "rotate(360deg)" } },
        ping: { "75%, 100%": { transform: "scale(2)", opacity: "0" } },
        pulse: { "50%": { opacity: ".5" } },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
        },
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
        3: ".75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
      },
      listStyleType: { none: "none", disc: "disc", decimal: "decimal" },
      listStyleImage: { none: "none" },
      margin: ({ theme: t }) => ({ auto: "auto", ...t("spacing") }),
      lineClamp: { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", ...ae },
      maxHeight: ({ theme: t }) => ({
        none: "none",
        full: "100%",
        screen: "100vh",
        svh: "100svh",
        lvh: "100lvh",
        dvh: "100dvh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...t("spacing"),
      }),
      maxWidth: ({ theme: t }) => ({
        none: "none",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        prose: "65ch",
        ...t("spacing"),
      }),
      minHeight: ({ theme: t }) => ({
        full: "100%",
        screen: "100vh",
        svh: "100svh",
        lvh: "100lvh",
        dvh: "100dvh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...t("spacing"),
      }),
      minWidth: ({ theme: t }) => ({
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...t("spacing"),
      }),
      objectPosition: {
        bottom: "bottom",
        center: "center",
        left: "left",
        "left-bottom": "left bottom",
        "left-top": "left top",
        right: "right",
        "right-bottom": "right bottom",
        "right-top": "right top",
        top: "top",
      },
      opacity: {
        0: "0",
        5: "0.05",
        10: "0.1",
        15: "0.15",
        20: "0.2",
        25: "0.25",
        30: "0.3",
        35: "0.35",
        40: "0.4",
        45: "0.45",
        50: "0.5",
        55: "0.55",
        60: "0.6",
        65: "0.65",
        70: "0.7",
        75: "0.75",
        80: "0.8",
        85: "0.85",
        90: "0.9",
        95: "0.95",
        100: "1",
        ...ie,
      },
      order: {
        first: "-9999",
        last: "9999",
        none: "0",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        ...ae,
      },
      outlineColor: ({ theme: t }) => t("colors"),
      outlineOffset: {
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
        ...ke,
      },
      outlineWidth: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px", ...ke },
      padding: ({ theme: t }) => t("spacing"),
      placeholderColor: ({ theme: t }) => t("colors"),
      placeholderOpacity: ({ theme: t }) => t("opacity"),
      ringColor: ({ theme: t }) => ({
        DEFAULT: "currentcolor",
        ...t("colors"),
      }),
      ringOffsetColor: ({ theme: t }) => t("colors"),
      ringOffsetWidth: {
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
        ...ke,
      },
      ringOpacity: ({ theme: t }) => ({ DEFAULT: "0.5", ...t("opacity") }),
      ringWidth: {
        DEFAULT: "3px",
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
        ...ke,
      },
      rotate: {
        0: "0deg",
        1: "1deg",
        2: "2deg",
        3: "3deg",
        6: "6deg",
        12: "12deg",
        45: "45deg",
        90: "90deg",
        180: "180deg",
        ...gt,
      },
      saturate: { 0: "0", 50: ".5", 100: "1", 150: "1.5", 200: "2", ...ie },
      scale: {
        0: "0",
        50: ".5",
        75: ".75",
        90: ".9",
        95: ".95",
        100: "1",
        105: "1.05",
        110: "1.1",
        125: "1.25",
        150: "1.5",
        ...ie,
      },
      screens: {
        sm: "40rem",
        md: "48rem",
        lg: "64rem",
        xl: "80rem",
        "2xl": "96rem",
      },
      scrollMargin: ({ theme: t }) => t("spacing"),
      scrollPadding: ({ theme: t }) => t("spacing"),
      sepia: { 0: "0", DEFAULT: "100%", ...ie },
      skew: {
        0: "0deg",
        1: "1deg",
        2: "2deg",
        3: "3deg",
        6: "6deg",
        12: "12deg",
        ...gt,
      },
      space: ({ theme: t }) => t("spacing"),
      spacing: {
        px: "1px",
        0: "0px",
        0.5: "0.125rem",
        1: "0.25rem",
        1.5: "0.375rem",
        2: "0.5rem",
        2.5: "0.625rem",
        3: "0.75rem",
        3.5: "0.875rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        14: "3.5rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        72: "18rem",
        80: "20rem",
        96: "24rem",
      },
      stroke: ({ theme: t }) => ({ none: "none", ...t("colors") }),
      strokeWidth: { 0: "0", 1: "1", 2: "2", ...ae },
      supports: {},
      data: {},
      textColor: ({ theme: t }) => t("colors"),
      textDecorationColor: ({ theme: t }) => t("colors"),
      textDecorationThickness: {
        auto: "auto",
        "from-font": "from-font",
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
        ...ke,
      },
      textIndent: ({ theme: t }) => t("spacing"),
      textOpacity: ({ theme: t }) => t("opacity"),
      textUnderlineOffset: {
        auto: "auto",
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
        ...ke,
      },
      transformOrigin: {
        center: "center",
        top: "top",
        "top-right": "top right",
        right: "right",
        "bottom-right": "bottom right",
        bottom: "bottom",
        "bottom-left": "bottom left",
        left: "left",
        "top-left": "top left",
      },
      transitionDelay: {
        0: "0s",
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1e3: "1000ms",
        ...ci,
      },
      transitionDuration: {
        DEFAULT: "150ms",
        0: "0s",
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1e3: "1000ms",
        ...ci,
      },
      transitionProperty: {
        none: "none",
        all: "all",
        DEFAULT:
          "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
        colors:
          "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
        opacity: "opacity",
        shadow: "box-shadow",
        transform: "transform",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
        linear: "linear",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      translate: ({ theme: t }) => ({
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        full: "100%",
        ...t("spacing"),
      }),
      size: ({ theme: t }) => ({
        auto: "auto",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...t("spacing"),
      }),
      width: ({ theme: t }) => ({
        auto: "auto",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        full: "100%",
        screen: "100vw",
        svw: "100svw",
        lvw: "100lvw",
        dvw: "100dvw",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...t("spacing"),
      }),
      willChange: {
        auto: "auto",
        scroll: "scroll-position",
        contents: "contents",
        transform: "transform",
      },
      zIndex: {
        auto: "auto",
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        ...ae,
      },
    };
  function pi(t) {
    return {
      theme: {
        ...di,
        colors: ({ theme: r }) => r("color", {}),
        extend: {
          fontSize: ({ theme: r }) => ({ ...r("text", {}) }),
          boxShadow: ({ theme: r }) => ({ ...r("shadow", {}) }),
          animation: ({ theme: r }) => ({ ...r("animate", {}) }),
          aspectRatio: ({ theme: r }) => ({ ...r("aspect", {}) }),
          borderRadius: ({ theme: r }) => ({ ...r("radius", {}) }),
          screens: ({ theme: r }) => ({ ...r("breakpoint", {}) }),
          letterSpacing: ({ theme: r }) => ({ ...r("tracking", {}) }),
          lineHeight: ({ theme: r }) => ({ ...r("leading", {}) }),
          transitionDuration: {
            DEFAULT: t.get(["--default-transition-duration"]) ?? null,
          },
          transitionTimingFunction: {
            DEFAULT: t.get(["--default-transition-timing-function"]) ?? null,
          },
          maxWidth: ({ theme: r }) => ({ ...r("container", {}) }),
        },
      },
    };
  }
  var sn = {
    blocklist: [],
    future: {},
    prefix: "",
    important: !1,
    darkMode: null,
    theme: {},
    plugins: [],
    content: { files: [] },
  };
  function Wt(t, r) {
    let i = {
      design: t,
      configs: [],
      plugins: [],
      content: { files: [] },
      theme: {},
      extend: {},
      result: structuredClone(sn),
    };
    for (let o of r) Bt(i, o);
    for (let o of i.configs)
      "darkMode" in o &&
        o.darkMode !== void 0 &&
        (i.result.darkMode = o.darkMode ?? null),
        "prefix" in o &&
          o.prefix !== void 0 &&
          (i.result.prefix = o.prefix ?? ""),
        "blocklist" in o &&
          o.blocklist !== void 0 &&
          (i.result.blocklist = o.blocklist ?? []),
        "important" in o &&
          o.important !== void 0 &&
          (i.result.important = o.important ?? !1);
    let e = cn(i);
    return {
      resolvedConfig: {
        ...i.result,
        content: i.content,
        theme: i.theme,
        plugins: i.plugins,
      },
      replacedThemeKeys: e,
    };
  }
  function un(t, r) {
    if (Array.isArray(t) && Re(t[0])) return t.concat(r);
    if (Array.isArray(r) && Re(r[0]) && Re(t)) return [t, ...r];
    if (Array.isArray(r)) return r;
  }
  function Bt(t, { config: r, base: i, path: e, reference: o }) {
    let s = [];
    for (let u of r.plugins ?? [])
      "__isOptionsFunction" in u
        ? s.push({ ...u(), reference: o })
        : "handler" in u
        ? s.push({ ...u, reference: o })
        : s.push({ handler: u, reference: o });
    if (Array.isArray(r.presets) && r.presets.length === 0)
      throw new Error(
        "Error in the config file/plugin/preset. An empty preset (`preset: []`) is not currently supported."
      );
    for (let u of r.presets ?? [])
      Bt(t, { path: e, base: i, config: u, reference: o });
    for (let u of s)
      t.plugins.push(u),
        u.config &&
          Bt(t, {
            path: e,
            base: i,
            config: u.config,
            reference: !!u.reference,
          });
    let a = r.content ?? [],
      f = Array.isArray(a) ? a : a.files;
    for (let u of f)
      t.content.files.push(typeof u == "object" ? u : { base: i, pattern: u });
    t.configs.push(r);
  }
  function cn(t) {
    let r = new Set(),
      i = dt(t.design, () => t.theme, o),
      e = Object.assign(i, { theme: i, colors: mt });
    function o(s) {
      return typeof s == "function" ? s(e) ?? null : s ?? null;
    }
    for (let s of t.configs) {
      let a = s.theme ?? {},
        f = a.extend ?? {};
      for (let u in a) u !== "extend" && r.add(u);
      Object.assign(t.theme, a);
      for (let u in f) (t.extend[u] ??= []), t.extend[u].push(f[u]);
    }
    delete t.theme.extend;
    for (let s in t.extend) {
      let a = [t.theme[s], ...t.extend[s]];
      t.theme[s] = () => {
        let f = a.map(o);
        return Le({}, f, un);
      };
    }
    for (let s in t.theme) t.theme[s] = o(t.theme[s]);
    if (t.theme.screens && typeof t.theme.screens == "object")
      for (let s of Object.keys(t.theme.screens)) {
        let a = t.theme.screens[s];
        a &&
          typeof a == "object" &&
          ("raw" in a ||
            "max" in a ||
            ("min" in a && (t.theme.screens[s] = a.min)));
      }
    return r;
  }
  function mi(t, r) {
    let i = t.theme.container || {};
    if (typeof i != "object" || i === null) return;
    let e = fn(i, r);
    e.length !== 0 && r.utilities.static("container", () => structuredClone(e));
  }
  function fn({ center: t, padding: r, screens: i }, e) {
    let o = [],
      s = null;
    if (
      (t && o.push(l("margin-inline", "auto")),
      (typeof r == "string" ||
        (typeof r == "object" && r !== null && "DEFAULT" in r)) &&
        o.push(l("padding-inline", typeof r == "string" ? r : r.DEFAULT)),
      typeof i == "object" && i !== null)
    ) {
      s = new Map();
      let a = Array.from(e.theme.namespace("--breakpoint").entries());
      if ((a.sort((f, u) => ye(f[1], u[1], "asc")), a.length > 0)) {
        let [f] = a[0];
        o.push(
          F("@media", `(width >= --theme(--breakpoint-${f}))`, [
            l("max-width", "none"),
          ])
        );
      }
      for (let [f, u] of Object.entries(i)) {
        if (typeof u == "object")
          if ("min" in u) u = u.min;
          else continue;
        s.set(f, F("@media", `(width >= ${u})`, [l("max-width", u)]));
      }
    }
    if (typeof r == "object" && r !== null) {
      let a = Object.entries(r)
        .filter(([f]) => f !== "DEFAULT")
        .map(([f, u]) => [f, e.theme.resolveValue(f, ["--breakpoint"]), u])
        .filter(Boolean);
      a.sort((f, u) => ye(f[1], u[1], "asc"));
      for (let [f, , u] of a)
        if (s && s.has(f)) s.get(f).nodes.push(l("padding-inline", u));
        else {
          if (s) continue;
          o.push(
            F("@media", `(width >= theme(--breakpoint-${f}))`, [
              l("padding-inline", u),
            ])
          );
        }
    }
    if (s) for (let [, a] of s) o.push(a);
    return o;
  }
  function gi({ addVariant: t, config: r }) {
    let i = r("darkMode", null),
      [e, o = ".dark"] = Array.isArray(i) ? i : [i];
    if (e === "variant") {
      let s;
      if (
        (Array.isArray(o) || typeof o == "function"
          ? (s = o)
          : typeof o == "string" && (s = [o]),
        Array.isArray(s))
      )
        for (let a of s)
          a === ".dark"
            ? ((e = !1),
              console.warn(
                'When using `variant` for `darkMode`, you must provide a selector.\nExample: `darkMode: ["variant", ".your-selector &"]`'
              ))
            : a.includes("&") ||
              ((e = !1),
              console.warn(
                'When using `variant` for `darkMode`, your selector must contain `&`.\nExample `darkMode: ["variant", ".your-selector &"]`'
              ));
      o = s;
    }
    e === null ||
      (e === "selector"
        ? t("dark", `&:where(${o}, ${o} *)`)
        : e === "media"
        ? t("dark", "@media (prefers-color-scheme: dark)")
        : e === "variant"
        ? t("dark", o)
        : e === "class" && t("dark", `&:is(${o} *)`));
  }
  function hi(t) {
    for (let [r, i] of [
      ["t", "top"],
      ["tr", "top right"],
      ["r", "right"],
      ["br", "bottom right"],
      ["b", "bottom"],
      ["bl", "bottom left"],
      ["l", "left"],
      ["tl", "top left"],
    ])
      t.utilities.static(`bg-gradient-to-${r}`, () => [
        l("--tw-gradient-position", `to ${i} in oklab`),
        l("background-image", "linear-gradient(var(--tw-gradient-stops))"),
      ]);
    t.utilities.static("bg-left-top", () => [
      l("background-position", "left top"),
    ]),
      t.utilities.static("bg-right-top", () => [
        l("background-position", "right top"),
      ]),
      t.utilities.static("bg-left-bottom", () => [
        l("background-position", "left bottom"),
      ]),
      t.utilities.static("bg-right-bottom", () => [
        l("background-position", "right bottom"),
      ]),
      t.utilities.static("object-left-top", () => [
        l("object-position", "left top"),
      ]),
      t.utilities.static("object-right-top", () => [
        l("object-position", "right top"),
      ]),
      t.utilities.static("object-left-bottom", () => [
        l("object-position", "left bottom"),
      ]),
      t.utilities.static("object-right-bottom", () => [
        l("object-position", "right bottom"),
      ]),
      t.utilities.functional("max-w-screen", (r) => {
        if (!r.value || r.value.kind === "arbitrary") return;
        let i = t.theme.resolve(r.value.value, ["--breakpoint"]);
        if (i) return [l("max-width", i)];
      }),
      t.utilities.static("overflow-ellipsis", () => [
        l("text-overflow", "ellipsis"),
      ]),
      t.utilities.static("decoration-slice", () => [
        l("-webkit-box-decoration-break", "slice"),
        l("box-decoration-break", "slice"),
      ]),
      t.utilities.static("decoration-clone", () => [
        l("-webkit-box-decoration-break", "clone"),
        l("box-decoration-break", "clone"),
      ]),
      t.utilities.functional("flex-shrink", (r) => {
        if (!r.modifier) {
          if (!r.value) return [l("flex-shrink", "1")];
          if (r.value.kind === "arbitrary")
            return [l("flex-shrink", r.value.value)];
          if (E(r.value.value)) return [l("flex-shrink", r.value.value)];
        }
      }),
      t.utilities.functional("flex-grow", (r) => {
        if (!r.modifier) {
          if (!r.value) return [l("flex-grow", "1")];
          if (r.value.kind === "arbitrary")
            return [l("flex-grow", r.value.value)];
          if (E(r.value.value)) return [l("flex-grow", r.value.value)];
        }
      }),
      t.utilities.static("order-none", () => [l("order", "0")]);
  }
  function ki(t, r) {
    let i = t.theme.screens || {},
      e = r.variants.get("min")?.order ?? 0,
      o = [];
    for (let [a, f] of Object.entries(i)) {
      let m = function (v) {
        r.variants.static(
          a,
          (k) => {
            k.nodes = [F("@media", p, k.nodes)];
          },
          { order: v }
        );
      };
      var s = m;
      let u = r.variants.get(a),
        c = r.theme.resolveValue(a, ["--breakpoint"]);
      if (u && c && !r.theme.hasDefault(`--breakpoint-${a}`)) continue;
      let g = !0;
      typeof f == "string" && (g = !1);
      let p = dn(f);
      g ? o.push(m) : m(e);
    }
    if (o.length !== 0) {
      for (let [, a] of r.variants.variants)
        a.order > e && (a.order += o.length);
      r.variants.compareFns = new Map(
        Array.from(r.variants.compareFns).map(
          ([a, f]) => (a > e && (a += o.length), [a, f])
        )
      );
      for (let [a, f] of o.entries()) f(e + a + 1);
    }
  }
  function dn(t) {
    return (Array.isArray(t) ? t : [t])
      .map((i) =>
        typeof i == "string" ? { min: i } : i && typeof i == "object" ? i : null
      )
      .map((i) => {
        if (i === null) return null;
        if ("raw" in i) return i.raw;
        let e = "";
        return (
          i.max !== void 0 && (e += `${i.max} >= `),
          (e += "width"),
          i.min !== void 0 && (e += ` >= ${i.min}`),
          `(${e})`
        );
      })
      .filter(Boolean)
      .join(", ");
  }
  function vi(t, r) {
    let i = t.theme.aria || {},
      e = t.theme.supports || {},
      o = t.theme.data || {};
    if (Object.keys(i).length > 0) {
      let s = r.variants.get("aria"),
        a = s?.applyFn,
        f = s?.compounds;
      r.variants.functional(
        "aria",
        (u, c) => {
          let g = c.value;
          return g && g.kind === "named" && g.value in i
            ? a?.(u, { ...c, value: { kind: "arbitrary", value: i[g.value] } })
            : a?.(u, c);
        },
        { compounds: f }
      );
    }
    if (Object.keys(e).length > 0) {
      let s = r.variants.get("supports"),
        a = s?.applyFn,
        f = s?.compounds;
      r.variants.functional(
        "supports",
        (u, c) => {
          let g = c.value;
          return g && g.kind === "named" && g.value in e
            ? a?.(u, { ...c, value: { kind: "arbitrary", value: e[g.value] } })
            : a?.(u, c);
        },
        { compounds: f }
      );
    }
    if (Object.keys(o).length > 0) {
      let s = r.variants.get("data"),
        a = s?.applyFn,
        f = s?.compounds;
      r.variants.functional(
        "data",
        (u, c) => {
          let g = c.value;
          return g && g.kind === "named" && g.value in o
            ? a?.(u, { ...c, value: { kind: "arbitrary", value: o[g.value] } })
            : a?.(u, c);
        },
        { compounds: f }
      );
    }
  }
  var pn = /^[a-z]+$/;
  async function bi({
    designSystem: t,
    base: r,
    ast: i,
    loadModule: e,
    sources: o,
  }) {
    let s = 0,
      a = [],
      f = [];
    L(i, (p, { parent: m, replaceWith: v, context: k }) => {
      if (p.kind === "at-rule") {
        if (p.name === "@plugin") {
          if (m !== null) throw new Error("`@plugin` cannot be nested.");
          let x = p.params.slice(1, -1);
          if (x.length === 0) throw new Error("`@plugin` must have a path.");
          let y = {};
          for (let N of p.nodes ?? []) {
            if (N.kind !== "declaration")
              throw new Error(`Unexpected \`@plugin\` option:

${le([N])}

\`@plugin\` options must be a flat list of declarations.`);
            if (N.value === void 0) continue;
            let b = N.value,
              V = z(b, ",").map((R) => {
                if (((R = R.trim()), R === "null")) return null;
                if (R === "true") return !0;
                if (R === "false") return !1;
                if (Number.isNaN(Number(R))) {
                  if (
                    (R[0] === '"' && R[R.length - 1] === '"') ||
                    (R[0] === "'" && R[R.length - 1] === "'")
                  )
                    return R.slice(1, -1);
                  if (R[0] === "{" && R[R.length - 1] === "}")
                    throw new Error(`Unexpected \`@plugin\` option: Value of declaration \`${le(
                      [N]
                    ).trim()}\` is not supported.

Using an object as a plugin option is currently only supported in JavaScript configuration files.`);
                } else return Number(R);
                return R;
              });
            y[N.property] = V.length === 1 ? V[0] : V;
          }
          a.push([
            { id: x, base: k.base, reference: !!k.reference },
            Object.keys(y).length > 0 ? y : null,
          ]),
            v([]),
            (s |= 4);
          return;
        }
        if (p.name === "@config") {
          if (p.nodes.length > 0)
            throw new Error("`@config` cannot have a body.");
          if (m !== null) throw new Error("`@config` cannot be nested.");
          f.push({
            id: p.params.slice(1, -1),
            base: k.base,
            reference: !!k.reference,
          }),
            v([]),
            (s |= 4);
          return;
        }
      }
    }),
      hi(t);
    let u = t.resolveThemeValue;
    if (
      ((t.resolveThemeValue = function (m, v) {
        return m.startsWith("--")
          ? u(m, v)
          : ((s |= wi({
              designSystem: t,
              base: r,
              ast: i,
              sources: o,
              configs: [],
              pluginDetails: [],
            })),
            t.resolveThemeValue(m, v));
      }),
      !a.length && !f.length)
    )
      return 0;
    let [c, g] = await Promise.all([
      Promise.all(
        f.map(async ({ id: p, base: m, reference: v }) => {
          let k = await e(p, m, "config");
          return { path: p, base: k.base, config: k.module, reference: v };
        })
      ),
      Promise.all(
        a.map(async ([{ id: p, base: m, reference: v }, k]) => {
          let x = await e(p, m, "plugin");
          return {
            path: p,
            base: x.base,
            plugin: x.module,
            options: k,
            reference: v,
          };
        })
      ),
    ]);
    return (
      (s |= wi({
        designSystem: t,
        base: r,
        ast: i,
        sources: o,
        configs: c,
        pluginDetails: g,
      })),
      s
    );
  }
  function wi({
    designSystem: t,
    base: r,
    ast: i,
    sources: e,
    configs: o,
    pluginDetails: s,
  }) {
    let a = 0,
      u = [
        ...s.map((y) => {
          if (!y.options)
            return {
              config: { plugins: [y.plugin] },
              base: y.base,
              reference: y.reference,
            };
          if ("__isOptionsFunction" in y.plugin)
            return {
              config: { plugins: [y.plugin(y.options)] },
              base: y.base,
              reference: y.reference,
            };
          throw new Error(`The plugin "${y.path}" does not accept options`);
        }),
        ...o,
      ],
      { resolvedConfig: c } = Wt(t, [
        { config: pi(t.theme), base: r, reference: !0 },
        ...u,
        { config: { plugins: [gi] }, base: r, reference: !0 },
      ]),
      { resolvedConfig: g, replacedThemeKeys: p } = Wt(t, u),
      m = t.resolveThemeValue;
    t.resolveThemeValue = function (N, b) {
      if (N[0] === "-" && N[1] === "-") return m(N, b);
      let V = k.theme(N, void 0);
      if (Array.isArray(V) && V.length === 2) return V[0];
      if (Array.isArray(V)) return V.join(", ");
      if (typeof V == "string") return V;
    };
    let v = {
        designSystem: t,
        ast: i,
        resolvedConfig: c,
        featuresRef: {
          set current(y) {
            a |= y;
          },
        },
      },
      k = Mt({ ...v, referenceMode: !1 }),
      x;
    for (let { handler: y, reference: N } of c.plugins)
      N ? ((x ||= Mt({ ...v, referenceMode: !0 })), y(x)) : y(k);
    if (
      (Wr(t, g, p),
      ui(t, g, p),
      vi(g, t),
      ki(g, t),
      mi(g, t),
      !t.theme.prefix && c.prefix)
    ) {
      if (
        (c.prefix.endsWith("-") &&
          ((c.prefix = c.prefix.slice(0, -1)),
          console.warn(
            `The prefix "${c.prefix}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only and is written as a variant before all utilities. We have fixed up the prefix for you. Remove the trailing \`-\` to silence this warning.`
          )),
        !pn.test(c.prefix))
      )
        throw new Error(
          `The prefix "${c.prefix}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only.`
        );
      t.theme.prefix = c.prefix;
    }
    if (
      (!t.important && c.important === !0 && (t.important = !0),
      typeof c.important == "string")
    ) {
      let y = c.important;
      L(i, (N, { replaceWith: b, parent: V }) => {
        if (
          N.kind === "at-rule" &&
          !(N.name !== "@tailwind" || N.params !== "utilities")
        )
          return V?.kind === "rule" && V.selector === y ? 2 : (b(M(y, [N])), 2);
      });
    }
    for (let y of c.blocklist) t.invalidCandidates.add(y);
    for (let y of c.content.files) {
      if ("raw" in y)
        throw new Error(`Error in the config file/plugin/preset. The \`content\` key contains a \`raw\` entry:

${JSON.stringify(y, null, 2)}

This feature is not currently supported.`);
      let N = !1;
      y.pattern[0] == "!" && ((N = !0), (y.pattern = y.pattern.slice(1))),
        e.push({ ...y, negated: N });
    }
    return a;
  }
  function yi(t) {
    let r = [0];
    for (let o = 0; o < t.length; o++) t.charCodeAt(o) === 10 && r.push(o + 1);
    function i(o) {
      let s = 0,
        a = r.length;
      for (; a > 0; ) {
        let u = (a | 0) >> 1,
          c = s + u;
        r[c] <= o ? ((s = c + 1), (a = a - u - 1)) : (a = u);
      }
      s -= 1;
      let f = o - r[s];
      return { line: s + 1, column: f };
    }
    function e({ line: o, column: s }) {
      (o -= 1), (o = Math.min(Math.max(o, 0), r.length - 1));
      let a = r[o],
        f = r[o + 1] ?? a;
      return Math.min(Math.max(a + s, 0), f);
    }
    return { find: i, findOffset: e };
  }
  function xi({ ast: t }) {
    let r = new W((o) => yi(o.code)),
      i = new W((o) => ({ url: o.file, content: o.code, ignore: !1 })),
      e = { file: null, sources: [], mappings: [] };
    L(t, (o) => {
      if (!o.src || !o.dst) return;
      let s = i.get(o.src[0]);
      if (!s.content) return;
      let a = r.get(o.src[0]),
        f = r.get(o.dst[0]),
        u = s.content.slice(o.src[1], o.src[2]),
        c = 0;
      for (let m of u.split(`
`)) {
        if (m.trim() !== "") {
          let v = a.find(o.src[1] + c),
            k = f.find(o.dst[1]);
          e.mappings.push({
            name: null,
            originalPosition: { source: s, ...v },
            generatedPosition: k,
          });
        }
        (c += m.length), (c += 1);
      }
      let g = a.find(o.src[2]),
        p = f.find(o.dst[2]);
      e.mappings.push({
        name: null,
        originalPosition: { source: s, ...g },
        generatedPosition: p,
      });
    });
    for (let o of r.keys()) e.sources.push(i.get(o));
    return (
      e.mappings.sort(
        (o, s) =>
          o.generatedPosition.line - s.generatedPosition.line ||
          o.generatedPosition.column - s.generatedPosition.column ||
          (o.originalPosition?.line ?? 0) - (s.originalPosition?.line ?? 0) ||
          (o.originalPosition?.column ?? 0) - (s.originalPosition?.column ?? 0)
      ),
      e
    );
  }
  var Ai = /^(-?\d+)\.\.(-?\d+)(?:\.\.(-?\d+))?$/;
  function ht(t) {
    let r = t.indexOf("{");
    if (r === -1) return [t];
    let i = [],
      e = t.slice(0, r),
      o = t.slice(r),
      s = 0,
      a = o.lastIndexOf("}");
    for (let p = 0; p < o.length; p++) {
      let m = o[p];
      if (m === "{") s++;
      else if (m === "}" && (s--, s === 0)) {
        a = p;
        break;
      }
    }
    if (a === -1) throw new Error(`The pattern \`${t}\` is not balanced.`);
    let f = o.slice(1, a),
      u = o.slice(a + 1),
      c;
    mn(f) ? (c = gn(f)) : (c = z(f, ",")), (c = c.flatMap((p) => ht(p)));
    let g = ht(u);
    for (let p of g) for (let m of c) i.push(e + m + p);
    return i;
  }
  function mn(t) {
    return Ai.test(t);
  }
  function gn(t) {
    let r = t.match(Ai);
    if (!r) return [t];
    let [, i, e, o] = r,
      s = o ? parseInt(o, 10) : void 0,
      a = [];
    if (/^-?\d+$/.test(i) && /^-?\d+$/.test(e)) {
      let f = parseInt(i, 10),
        u = parseInt(e, 10);
      if ((s === void 0 && (s = f <= u ? 1 : -1), s === 0))
        throw new Error("Step cannot be zero in sequence expansion.");
      let c = f < u;
      c && s < 0 && (s = -s), !c && s > 0 && (s = -s);
      for (let g = f; c ? g <= u : g >= u; g += s) a.push(g.toString());
    }
    return a;
  }
  var hn = /^[a-z]+$/;
  function kn() {
    throw new Error("No `loadModule` function provided to `compile`");
  }
  function vn() {
    throw new Error("No `loadStylesheet` function provided to `compile`");
  }
  function wn(t) {
    let r = 0,
      i = null;
    for (let e of z(t, " "))
      e === "reference"
        ? (r |= 2)
        : e === "inline"
        ? (r |= 1)
        : e === "default"
        ? (r |= 4)
        : e === "static"
        ? (r |= 8)
        : e.startsWith("prefix(") && e.endsWith(")") && (i = e.slice(7, -1));
    return [r, i];
  }
  async function bn(
    t,
    { base: r = "", from: i, loadModule: e = kn, loadStylesheet: o = vn } = {}
  ) {
    let s = 0;
    (t = [ue({ base: r }, t)]), (s |= await Ft(t, r, o, 0, i !== void 0));
    let a = null,
      f = new Qe(),
      u = [],
      c = [],
      g = null,
      p = null,
      m = [],
      v = [],
      k = [],
      x = [],
      y = null;
    L(t, (b, { parent: V, replaceWith: R, context: U }) => {
      if (b.kind === "at-rule") {
        if (
          b.name === "@tailwind" &&
          (b.params === "utilities" || b.params.startsWith("utilities"))
        ) {
          if (p !== null) {
            R([]);
            return;
          }
          if (U.reference) {
            R([]);
            return;
          }
          let P = z(b.params, " ");
          for (let K of P)
            if (K.startsWith("source(")) {
              let _ = K.slice(7, -1);
              if (_ === "none") {
                y = _;
                continue;
              }
              if (
                (_[0] === '"' && _[_.length - 1] !== '"') ||
                (_[0] === "'" && _[_.length - 1] !== "'") ||
                (_[0] !== "'" && _[0] !== '"')
              )
                throw new Error("`source(\u2026)` paths must be quoted.");
              y = { base: U.sourceBase ?? U.base, pattern: _.slice(1, -1) };
            }
          (p = b), (s |= 16);
        }
        if (b.name === "@utility") {
          if (V !== null) throw new Error("`@utility` cannot be nested.");
          if (b.nodes.length === 0)
            throw new Error(
              `\`@utility ${b.params}\` is empty. Utilities should include at least one property.`
            );
          let P = Pr(b);
          if (P === null)
            throw new Error(
              `\`@utility ${b.params}\` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter.`
            );
          c.push(P);
        }
        if (b.name === "@source") {
          if (b.nodes.length > 0)
            throw new Error("`@source` cannot have a body.");
          if (V !== null) throw new Error("`@source` cannot be nested.");
          let P = !1,
            K = !1,
            _ = b.params;
          if (
            (_[0] === "n" &&
              _.startsWith("not ") &&
              ((P = !0), (_ = _.slice(4))),
            _[0] === "i" &&
              _.startsWith("inline(") &&
              ((K = !0), (_ = _.slice(7, -1))),
            (_[0] === '"' && _[_.length - 1] !== '"') ||
              (_[0] === "'" && _[_.length - 1] !== "'") ||
              (_[0] !== "'" && _[0] !== '"'))
          )
            throw new Error("`@source` paths must be quoted.");
          let H = _.slice(1, -1);
          if (K) {
            let j = P ? x : k,
              B = z(H, " ");
            for (let Q of B) for (let oe of ht(Q)) j.push(oe);
          } else v.push({ base: U.base, pattern: H, negated: P });
          R([]);
          return;
        }
        if (
          (b.name === "@variant" &&
            (V === null
              ? b.nodes.length === 0
                ? (b.name = "@custom-variant")
                : (L(b.nodes, (P) => {
                    if (P.kind === "at-rule" && P.name === "@slot")
                      return (b.name = "@custom-variant"), 2;
                  }),
                  b.name === "@variant" && m.push(b))
              : m.push(b)),
          b.name === "@custom-variant")
        ) {
          if (V !== null)
            throw new Error("`@custom-variant` cannot be nested.");
          R([]);
          let [P, K] = z(b.params, " ");
          if (!ut.test(P))
            throw new Error(
              `\`@custom-variant ${P}\` defines an invalid variant name. Variants should only contain alphanumeric, dashes or underscore characters.`
            );
          if (b.nodes.length > 0 && K)
            throw new Error(
              `\`@custom-variant ${P}\` cannot have both a selector and a body.`
            );
          if (b.nodes.length === 0) {
            if (!K)
              throw new Error(
                `\`@custom-variant ${P}\` has no selector or body.`
              );
            let _ = z(K.slice(1, -1), ",");
            if (_.length === 0 || _.some((B) => B.trim() === ""))
              throw new Error(
                `\`@custom-variant ${P} (${_.join(",")})\` selector is invalid.`
              );
            let H = [],
              j = [];
            for (let B of _)
              (B = B.trim()), B[0] === "@" ? H.push(B) : j.push(B);
            u.push((B) => {
              B.variants.static(
                P,
                (Q) => {
                  let oe = [];
                  j.length > 0 && oe.push(M(j.join(", "), Q.nodes));
                  for (let n of H) oe.push(G(n, Q.nodes));
                  Q.nodes = oe;
                },
                { compounds: Ae([...j, ...H]) }
              );
            });
            return;
          } else {
            u.push((_) => {
              _.variants.fromAst(P, b.nodes);
            });
            return;
          }
        }
        if (b.name === "@media") {
          let P = z(b.params, " "),
            K = [];
          for (let _ of P)
            if (_.startsWith("source(")) {
              let H = _.slice(7, -1);
              L(b.nodes, (j, { replaceWith: B }) => {
                if (
                  j.kind === "at-rule" &&
                  j.name === "@tailwind" &&
                  j.params === "utilities"
                )
                  return (
                    (j.params += ` source(${H})`),
                    B([ue({ sourceBase: U.base }, [j])]),
                    2
                  );
              });
            } else if (_.startsWith("theme(")) {
              let H = _.slice(6, -1),
                j = H.includes("reference");
              L(b.nodes, (B) => {
                if (B.kind !== "at-rule") {
                  if (j)
                    throw new Error(
                      'Files imported with `@import "\u2026" theme(reference)` must only contain `@theme` blocks.\nUse `@reference "\u2026";` instead.'
                    );
                  return 0;
                }
                if (B.name === "@theme") return (B.params += " " + H), 1;
              });
            } else if (_.startsWith("prefix(")) {
              let H = _.slice(7, -1);
              L(b.nodes, (j) => {
                if (j.kind === "at-rule" && j.name === "@theme")
                  return (j.params += ` prefix(${H})`), 1;
              });
            } else
              _ === "important"
                ? (a = !0)
                : _ === "reference"
                ? (b.nodes = [ue({ reference: !0 }, b.nodes)])
                : K.push(_);
          K.length > 0 ? (b.params = K.join(" ")) : P.length > 0 && R(b.nodes);
        }
        if (b.name === "@theme") {
          let [P, K] = wn(b.params);
          if ((U.reference && (P |= 2), K)) {
            if (!hn.test(K))
              throw new Error(
                `The prefix "${K}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only.`
              );
            f.prefix = K;
          }
          return (
            L(b.nodes, (_) => {
              if (_.kind === "at-rule" && _.name === "@keyframes")
                return f.addKeyframes(_), 1;
              if (_.kind === "comment") return;
              if (_.kind === "declaration" && _.property.startsWith("--")) {
                f.add(ve(_.property), _.value ?? "", P, _.src);
                return;
              }
              let H = le([F(b.name, b.params, [_])])
                .split(
                  `
`
                )
                .map(
                  (j, B, Q) =>
                    `${B === 0 || B >= Q.length - 2 ? " " : ">"} ${j}`
                ).join(`
`);
              throw new Error(`\`@theme\` blocks must only contain custom properties or \`@keyframes\`.

${H}`);
            }),
            g ? R([]) : ((g = M(":root, :host", [])), (g.src = b.src), R([g])),
            1
          );
        }
      }
    });
    let N = Lr(f);
    if ((a && (N.important = a), x.length > 0))
      for (let b of x) N.invalidCandidates.add(b);
    s |= await bi({
      designSystem: N,
      base: r,
      ast: t,
      loadModule: e,
      sources: v,
    });
    for (let b of u) b(N);
    for (let b of c) b(N);
    if (g) {
      let b = [];
      for (let [R, U] of N.theme.entries()) {
        if (U.options & 2) continue;
        let P = l(me(R), U.value);
        (P.src = U.src), b.push(P);
      }
      let V = N.theme.getKeyframes();
      for (let R of V) t.push(ue({ theme: !0 }, [I([R])]));
      g.nodes = [ue({ theme: !0 }, b)];
    }
    if (m.length > 0) {
      for (let b of m) {
        let V = M("&", b.nodes),
          R = b.params,
          U = N.parseVariant(R);
        if (U === null)
          throw new Error(`Cannot use \`@variant\` with unknown variant: ${R}`);
        if (Te(V, U, N.variants) === null)
          throw new Error(`Cannot use \`@variant\` with variant: ${R}`);
        Object.assign(b, V);
      }
      s |= 32;
    }
    if (((s |= Ve(t, N)), (s |= je(t, N)), p)) {
      let b = p;
      (b.kind = "context"), (b.context = {});
    }
    return (
      L(t, (b, { replaceWith: V }) => {
        if (b.kind === "at-rule") return b.name === "@utility" && V([]), 1;
      }),
      {
        designSystem: N,
        ast: t,
        sources: v,
        root: y,
        utilitiesNode: p,
        features: s,
        inlineCandidates: k,
      }
    );
  }
  async function yn(t, r = {}) {
    let {
      designSystem: i,
      ast: e,
      sources: o,
      root: s,
      utilitiesNode: a,
      features: f,
      inlineCandidates: u,
    } = await bn(t, r);
    e.unshift(
      Je(`! tailwindcss v${Yt} | MIT License | https://tailwindcss.com `)
    );
    function c(k) {
      i.invalidCandidates.add(k);
    }
    let g = new Set(),
      p = null,
      m = 0,
      v = !1;
    for (let k of u) i.invalidCandidates.has(k) || (g.add(k), (v = !0));
    return {
      sources: o,
      root: s,
      features: f,
      build(k) {
        if (f === 0) return t;
        if (!a) return (p ??= be(e, i, r.polyfills)), p;
        let x = v,
          y = !1;
        v = !1;
        let N = g.size;
        for (let V of k)
          if (!i.invalidCandidates.has(V))
            if (V[0] === "-" && V[1] === "-") {
              let R = i.theme.markUsedVariable(V);
              (x ||= R), (y ||= R);
            } else g.add(V), (x ||= g.size !== N);
        if (!x) return (p ??= be(e, i, r.polyfills)), p;
        let b = he(g, i, { onInvalidCandidate: c }).astNodes;
        return (
          r.from &&
            L(b, (V) => {
              V.src ??= a.src;
            }),
          !y && m === b.length
            ? ((p ??= be(e, i, r.polyfills)), p)
            : ((m = b.length), (a.nodes = b), (p = be(e, i, r.polyfills)), p)
        );
      },
    };
  }
  async function Ci(t, r = {}) {
    let i = $e(t, { from: r.from }),
      e = await yn(i, r),
      o = i,
      s = t;
    return {
      ...e,
      build(a) {
        let f = e.build(a);
        return f === o || ((s = le(f, !!r.from)), (o = f)), s;
      },
      buildSourceMap() {
        return xi({ ast: o });
      },
    };
  }
  var $i = `@layer theme, base, components, utilities;

@import './theme.css' layer(theme);
@import './preflight.css' layer(base);
@import './utilities.css' layer(utilities);
`;
  var Si = `/*
  1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
  2. Remove default margins and padding
  3. Reset all borders.
*/

*,
::after,
::before,
::backdrop,
::file-selector-button {
  box-sizing: border-box; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 2 */
  border: 0 solid; /* 3 */
}

/*
  1. Use a consistent sensible line-height in all browsers.
  2. Prevent adjustments of font size after orientation changes in iOS.
  3. Use a more readable tab size.
  4. Use the user's configured \`sans\` font-family by default.
  5. Use the user's configured \`sans\` font-feature-settings by default.
  6. Use the user's configured \`sans\` font-variation-settings by default.
  7. Disable tap highlights on iOS.
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  tab-size: 4; /* 3 */
  font-family: --theme(
    --default-font-family,
    ui-sans-serif,
    system-ui,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji'
  ); /* 4 */
  font-feature-settings: --theme(--default-font-feature-settings, normal); /* 5 */
  font-variation-settings: --theme(--default-font-variation-settings, normal); /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
  1. Add the correct height in Firefox.
  2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
  3. Reset the default border style to a 1px solid border.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
  Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
}

/*
  Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
  Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  -webkit-text-decoration: inherit;
  text-decoration: inherit;
}

/*
  Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
  1. Use the user's configured \`mono\` font-family by default.
  2. Use the user's configured \`mono\` font-feature-settings by default.
  3. Use the user's configured \`mono\` font-variation-settings by default.
  4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: --theme(
    --default-mono-font-family,
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    'Liberation Mono',
    'Courier New',
    monospace
  ); /* 1 */
  font-feature-settings: --theme(--default-mono-font-feature-settings, normal); /* 2 */
  font-variation-settings: --theme(--default-mono-font-variation-settings, normal); /* 3 */
  font-size: 1em; /* 4 */
}

/*
  Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
  Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
  1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
  2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
  3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
  Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
  Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
  Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
  Make lists unstyled by default.
*/

ol,
ul,
menu {
  list-style: none;
}

/*
  1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
  2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
      This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
  Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/*
  1. Inherit font styles in all browsers.
  2. Remove border radius in all browsers.
  3. Remove background color in all browsers.
  4. Ensure consistent opacity for disabled states in all browsers.
*/

button,
input,
select,
optgroup,
textarea,
::file-selector-button {
  font: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  border-radius: 0; /* 2 */
  background-color: transparent; /* 3 */
  opacity: 1; /* 4 */
}

/*
  Restore default font weight.
*/

:where(select:is([multiple], [size])) optgroup {
  font-weight: bolder;
}

/*
  Restore indentation.
*/

:where(select:is([multiple], [size])) optgroup option {
  padding-inline-start: 20px;
}

/*
  Restore space after button.
*/

::file-selector-button {
  margin-inline-end: 4px;
}

/*
  Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
*/

::placeholder {
  opacity: 1;
}

/*
  Set the default placeholder color to a semi-transparent version of the current text color in browsers that do not
  crash when using \`color-mix(\u2026)\` with \`currentcolor\`. (https://github.com/tailwindlabs/tailwindcss/issues/17194)
*/

@supports (not (-webkit-appearance: -apple-pay-button)) /* Not Safari */ or
  (contain-intrinsic-size: 1px) /* Safari 17+ */ {
  ::placeholder {
    color: color-mix(in oklab, currentcolor 50%, transparent);
  }
}

/*
  Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
  Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
  1. Ensure date/time inputs have the same height when empty in iOS Safari.
  2. Ensure text alignment can be changed on date/time inputs in iOS Safari.
*/

::-webkit-date-and-time-value {
  min-height: 1lh; /* 1 */
  text-align: inherit; /* 2 */
}

/*
  Prevent height from changing on date/time inputs in macOS Safari when the input is set to \`display: block\`.
*/

::-webkit-datetime-edit {
  display: inline-flex;
}

/*
  Remove excess padding from pseudo-elements in date/time inputs to ensure consistent height across browsers.
*/

::-webkit-datetime-edit-fields-wrapper {
  padding: 0;
}

::-webkit-datetime-edit,
::-webkit-datetime-edit-year-field,
::-webkit-datetime-edit-month-field,
::-webkit-datetime-edit-day-field,
::-webkit-datetime-edit-hour-field,
::-webkit-datetime-edit-minute-field,
::-webkit-datetime-edit-second-field,
::-webkit-datetime-edit-millisecond-field,
::-webkit-datetime-edit-meridiem-field {
  padding-block: 0;
}

/*
  Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
  Correct the inability to style the border radius in iOS Safari.
*/

button,
input:where([type='button'], [type='reset'], [type='submit']),
::file-selector-button {
  appearance: button;
}

/*
  Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
  Make elements with the HTML hidden attribute stay hidden by default.
*/

[hidden]:where(:not([hidden='until-found'])) {
  display: none !important;
}
`;
  var Ni = `@theme default {
  --font-sans:
    ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
  --font-mono:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;

  --color-red-50: oklch(97.1% 0.013 17.38);
  --color-red-100: oklch(93.6% 0.032 17.717);
  --color-red-200: oklch(88.5% 0.062 18.334);
  --color-red-300: oklch(80.8% 0.114 19.571);
  --color-red-400: oklch(70.4% 0.191 22.216);
  --color-red-500: oklch(63.7% 0.237 25.331);
  --color-red-600: oklch(57.7% 0.245 27.325);
  --color-red-700: oklch(50.5% 0.213 27.518);
  --color-red-800: oklch(44.4% 0.177 26.899);
  --color-red-900: oklch(39.6% 0.141 25.723);
  --color-red-950: oklch(25.8% 0.092 26.042);

  --color-orange-50: oklch(98% 0.016 73.684);
  --color-orange-100: oklch(95.4% 0.038 75.164);
  --color-orange-200: oklch(90.1% 0.076 70.697);
  --color-orange-300: oklch(83.7% 0.128 66.29);
  --color-orange-400: oklch(75% 0.183 55.934);
  --color-orange-500: oklch(70.5% 0.213 47.604);
  --color-orange-600: oklch(64.6% 0.222 41.116);
  --color-orange-700: oklch(55.3% 0.195 38.402);
  --color-orange-800: oklch(47% 0.157 37.304);
  --color-orange-900: oklch(40.8% 0.123 38.172);
  --color-orange-950: oklch(26.6% 0.079 36.259);

  --color-amber-50: oklch(98.7% 0.022 95.277);
  --color-amber-100: oklch(96.2% 0.059 95.617);
  --color-amber-200: oklch(92.4% 0.12 95.746);
  --color-amber-300: oklch(87.9% 0.169 91.605);
  --color-amber-400: oklch(82.8% 0.189 84.429);
  --color-amber-500: oklch(76.9% 0.188 70.08);
  --color-amber-600: oklch(66.6% 0.179 58.318);
  --color-amber-700: oklch(55.5% 0.163 48.998);
  --color-amber-800: oklch(47.3% 0.137 46.201);
  --color-amber-900: oklch(41.4% 0.112 45.904);
  --color-amber-950: oklch(27.9% 0.077 45.635);

  --color-yellow-50: oklch(98.7% 0.026 102.212);
  --color-yellow-100: oklch(97.3% 0.071 103.193);
  --color-yellow-200: oklch(94.5% 0.129 101.54);
  --color-yellow-300: oklch(90.5% 0.182 98.111);
  --color-yellow-400: oklch(85.2% 0.199 91.936);
  --color-yellow-500: oklch(79.5% 0.184 86.047);
  --color-yellow-600: oklch(68.1% 0.162 75.834);
  --color-yellow-700: oklch(55.4% 0.135 66.442);
  --color-yellow-800: oklch(47.6% 0.114 61.907);
  --color-yellow-900: oklch(42.1% 0.095 57.708);
  --color-yellow-950: oklch(28.6% 0.066 53.813);

  --color-lime-50: oklch(98.6% 0.031 120.757);
  --color-lime-100: oklch(96.7% 0.067 122.328);
  --color-lime-200: oklch(93.8% 0.127 124.321);
  --color-lime-300: oklch(89.7% 0.196 126.665);
  --color-lime-400: oklch(84.1% 0.238 128.85);
  --color-lime-500: oklch(76.8% 0.233 130.85);
  --color-lime-600: oklch(64.8% 0.2 131.684);
  --color-lime-700: oklch(53.2% 0.157 131.589);
  --color-lime-800: oklch(45.3% 0.124 130.933);
  --color-lime-900: oklch(40.5% 0.101 131.063);
  --color-lime-950: oklch(27.4% 0.072 132.109);

  --color-green-50: oklch(98.2% 0.018 155.826);
  --color-green-100: oklch(96.2% 0.044 156.743);
  --color-green-200: oklch(92.5% 0.084 155.995);
  --color-green-300: oklch(87.1% 0.15 154.449);
  --color-green-400: oklch(79.2% 0.209 151.711);
  --color-green-500: oklch(72.3% 0.219 149.579);
  --color-green-600: oklch(62.7% 0.194 149.214);
  --color-green-700: oklch(52.7% 0.154 150.069);
  --color-green-800: oklch(44.8% 0.119 151.328);
  --color-green-900: oklch(39.3% 0.095 152.535);
  --color-green-950: oklch(26.6% 0.065 152.934);

  --color-emerald-50: oklch(97.9% 0.021 166.113);
  --color-emerald-100: oklch(95% 0.052 163.051);
  --color-emerald-200: oklch(90.5% 0.093 164.15);
  --color-emerald-300: oklch(84.5% 0.143 164.978);
  --color-emerald-400: oklch(76.5% 0.177 163.223);
  --color-emerald-500: oklch(69.6% 0.17 162.48);
  --color-emerald-600: oklch(59.6% 0.145 163.225);
  --color-emerald-700: oklch(50.8% 0.118 165.612);
  --color-emerald-800: oklch(43.2% 0.095 166.913);
  --color-emerald-900: oklch(37.8% 0.077 168.94);
  --color-emerald-950: oklch(26.2% 0.051 172.552);

  --color-teal-50: oklch(98.4% 0.014 180.72);
  --color-teal-100: oklch(95.3% 0.051 180.801);
  --color-teal-200: oklch(91% 0.096 180.426);
  --color-teal-300: oklch(85.5% 0.138 181.071);
  --color-teal-400: oklch(77.7% 0.152 181.912);
  --color-teal-500: oklch(70.4% 0.14 182.503);
  --color-teal-600: oklch(60% 0.118 184.704);
  --color-teal-700: oklch(51.1% 0.096 186.391);
  --color-teal-800: oklch(43.7% 0.078 188.216);
  --color-teal-900: oklch(38.6% 0.063 188.416);
  --color-teal-950: oklch(27.7% 0.046 192.524);

  --color-cyan-50: oklch(98.4% 0.019 200.873);
  --color-cyan-100: oklch(95.6% 0.045 203.388);
  --color-cyan-200: oklch(91.7% 0.08 205.041);
  --color-cyan-300: oklch(86.5% 0.127 207.078);
  --color-cyan-400: oklch(78.9% 0.154 211.53);
  --color-cyan-500: oklch(71.5% 0.143 215.221);
  --color-cyan-600: oklch(60.9% 0.126 221.723);
  --color-cyan-700: oklch(52% 0.105 223.128);
  --color-cyan-800: oklch(45% 0.085 224.283);
  --color-cyan-900: oklch(39.8% 0.07 227.392);
  --color-cyan-950: oklch(30.2% 0.056 229.695);

  --color-sky-50: oklch(97.7% 0.013 236.62);
  --color-sky-100: oklch(95.1% 0.026 236.824);
  --color-sky-200: oklch(90.1% 0.058 230.902);
  --color-sky-300: oklch(82.8% 0.111 230.318);
  --color-sky-400: oklch(74.6% 0.16 232.661);
  --color-sky-500: oklch(68.5% 0.169 237.323);
  --color-sky-600: oklch(58.8% 0.158 241.966);
  --color-sky-700: oklch(50% 0.134 242.749);
  --color-sky-800: oklch(44.3% 0.11 240.79);
  --color-sky-900: oklch(39.1% 0.09 240.876);
  --color-sky-950: oklch(29.3% 0.066 243.157);

  --color-blue-50: oklch(97% 0.014 254.604);
  --color-blue-100: oklch(93.2% 0.032 255.585);
  --color-blue-200: oklch(88.2% 0.059 254.128);
  --color-blue-300: oklch(80.9% 0.105 251.813);
  --color-blue-400: oklch(70.7% 0.165 254.624);
  --color-blue-500: oklch(62.3% 0.214 259.815);
  --color-blue-600: oklch(54.6% 0.245 262.881);
  --color-blue-700: oklch(48.8% 0.243 264.376);
  --color-blue-800: oklch(42.4% 0.199 265.638);
  --color-blue-900: oklch(37.9% 0.146 265.522);
  --color-blue-950: oklch(28.2% 0.091 267.935);

  --color-indigo-50: oklch(96.2% 0.018 272.314);
  --color-indigo-100: oklch(93% 0.034 272.788);
  --color-indigo-200: oklch(87% 0.065 274.039);
  --color-indigo-300: oklch(78.5% 0.115 274.713);
  --color-indigo-400: oklch(67.3% 0.182 276.935);
  --color-indigo-500: oklch(58.5% 0.233 277.117);
  --color-indigo-600: oklch(51.1% 0.262 276.966);
  --color-indigo-700: oklch(45.7% 0.24 277.023);
  --color-indigo-800: oklch(39.8% 0.195 277.366);
  --color-indigo-900: oklch(35.9% 0.144 278.697);
  --color-indigo-950: oklch(25.7% 0.09 281.288);

  --color-violet-50: oklch(96.9% 0.016 293.756);
  --color-violet-100: oklch(94.3% 0.029 294.588);
  --color-violet-200: oklch(89.4% 0.057 293.283);
  --color-violet-300: oklch(81.1% 0.111 293.571);
  --color-violet-400: oklch(70.2% 0.183 293.541);
  --color-violet-500: oklch(60.6% 0.25 292.717);
  --color-violet-600: oklch(54.1% 0.281 293.009);
  --color-violet-700: oklch(49.1% 0.27 292.581);
  --color-violet-800: oklch(43.2% 0.232 292.759);
  --color-violet-900: oklch(38% 0.189 293.745);
  --color-violet-950: oklch(28.3% 0.141 291.089);

  --color-purple-50: oklch(97.7% 0.014 308.299);
  --color-purple-100: oklch(94.6% 0.033 307.174);
  --color-purple-200: oklch(90.2% 0.063 306.703);
  --color-purple-300: oklch(82.7% 0.119 306.383);
  --color-purple-400: oklch(71.4% 0.203 305.504);
  --color-purple-500: oklch(62.7% 0.265 303.9);
  --color-purple-600: oklch(55.8% 0.288 302.321);
  --color-purple-700: oklch(49.6% 0.265 301.924);
  --color-purple-800: oklch(43.8% 0.218 303.724);
  --color-purple-900: oklch(38.1% 0.176 304.987);
  --color-purple-950: oklch(29.1% 0.149 302.717);

  --color-fuchsia-50: oklch(97.7% 0.017 320.058);
  --color-fuchsia-100: oklch(95.2% 0.037 318.852);
  --color-fuchsia-200: oklch(90.3% 0.076 319.62);
  --color-fuchsia-300: oklch(83.3% 0.145 321.434);
  --color-fuchsia-400: oklch(74% 0.238 322.16);
  --color-fuchsia-500: oklch(66.7% 0.295 322.15);
  --color-fuchsia-600: oklch(59.1% 0.293 322.896);
  --color-fuchsia-700: oklch(51.8% 0.253 323.949);
  --color-fuchsia-800: oklch(45.2% 0.211 324.591);
  --color-fuchsia-900: oklch(40.1% 0.17 325.612);
  --color-fuchsia-950: oklch(29.3% 0.136 325.661);

  --color-pink-50: oklch(97.1% 0.014 343.198);
  --color-pink-100: oklch(94.8% 0.028 342.258);
  --color-pink-200: oklch(89.9% 0.061 343.231);
  --color-pink-300: oklch(82.3% 0.12 346.018);
  --color-pink-400: oklch(71.8% 0.202 349.761);
  --color-pink-500: oklch(65.6% 0.241 354.308);
  --color-pink-600: oklch(59.2% 0.249 0.584);
  --color-pink-700: oklch(52.5% 0.223 3.958);
  --color-pink-800: oklch(45.9% 0.187 3.815);
  --color-pink-900: oklch(40.8% 0.153 2.432);
  --color-pink-950: oklch(28.4% 0.109 3.907);

  --color-rose-50: oklch(96.9% 0.015 12.422);
  --color-rose-100: oklch(94.1% 0.03 12.58);
  --color-rose-200: oklch(89.2% 0.058 10.001);
  --color-rose-300: oklch(81% 0.117 11.638);
  --color-rose-400: oklch(71.2% 0.194 13.428);
  --color-rose-500: oklch(64.5% 0.246 16.439);
  --color-rose-600: oklch(58.6% 0.253 17.585);
  --color-rose-700: oklch(51.4% 0.222 16.935);
  --color-rose-800: oklch(45.5% 0.188 13.697);
  --color-rose-900: oklch(41% 0.159 10.272);
  --color-rose-950: oklch(27.1% 0.105 12.094);

  --color-slate-50: oklch(98.4% 0.003 247.858);
  --color-slate-100: oklch(96.8% 0.007 247.896);
  --color-slate-200: oklch(92.9% 0.013 255.508);
  --color-slate-300: oklch(86.9% 0.022 252.894);
  --color-slate-400: oklch(70.4% 0.04 256.788);
  --color-slate-500: oklch(55.4% 0.046 257.417);
  --color-slate-600: oklch(44.6% 0.043 257.281);
  --color-slate-700: oklch(37.2% 0.044 257.287);
  --color-slate-800: oklch(27.9% 0.041 260.031);
  --color-slate-900: oklch(20.8% 0.042 265.755);
  --color-slate-950: oklch(12.9% 0.042 264.695);

  --color-gray-50: oklch(98.5% 0.002 247.839);
  --color-gray-100: oklch(96.7% 0.003 264.542);
  --color-gray-200: oklch(92.8% 0.006 264.531);
  --color-gray-300: oklch(87.2% 0.01 258.338);
  --color-gray-400: oklch(70.7% 0.022 261.325);
  --color-gray-500: oklch(55.1% 0.027 264.364);
  --color-gray-600: oklch(44.6% 0.03 256.802);
  --color-gray-700: oklch(37.3% 0.034 259.733);
  --color-gray-800: oklch(27.8% 0.033 256.848);
  --color-gray-900: oklch(21% 0.034 264.665);
  --color-gray-950: oklch(13% 0.028 261.692);

  --color-zinc-50: oklch(98.5% 0 0);
  --color-zinc-100: oklch(96.7% 0.001 286.375);
  --color-zinc-200: oklch(92% 0.004 286.32);
  --color-zinc-300: oklch(87.1% 0.006 286.286);
  --color-zinc-400: oklch(70.5% 0.015 286.067);
  --color-zinc-500: oklch(55.2% 0.016 285.938);
  --color-zinc-600: oklch(44.2% 0.017 285.786);
  --color-zinc-700: oklch(37% 0.013 285.805);
  --color-zinc-800: oklch(27.4% 0.006 286.033);
  --color-zinc-900: oklch(21% 0.006 285.885);
  --color-zinc-950: oklch(14.1% 0.005 285.823);

  --color-neutral-50: oklch(98.5% 0 0);
  --color-neutral-100: oklch(97% 0 0);
  --color-neutral-200: oklch(92.2% 0 0);
  --color-neutral-300: oklch(87% 0 0);
  --color-neutral-400: oklch(70.8% 0 0);
  --color-neutral-500: oklch(55.6% 0 0);
  --color-neutral-600: oklch(43.9% 0 0);
  --color-neutral-700: oklch(37.1% 0 0);
  --color-neutral-800: oklch(26.9% 0 0);
  --color-neutral-900: oklch(20.5% 0 0);
  --color-neutral-950: oklch(14.5% 0 0);

  --color-stone-50: oklch(98.5% 0.001 106.423);
  --color-stone-100: oklch(97% 0.001 106.424);
  --color-stone-200: oklch(92.3% 0.003 48.717);
  --color-stone-300: oklch(86.9% 0.005 56.366);
  --color-stone-400: oklch(70.9% 0.01 56.259);
  --color-stone-500: oklch(55.3% 0.013 58.071);
  --color-stone-600: oklch(44.4% 0.011 73.639);
  --color-stone-700: oklch(37.4% 0.01 67.558);
  --color-stone-800: oklch(26.8% 0.007 34.298);
  --color-stone-900: oklch(21.6% 0.006 56.043);
  --color-stone-950: oklch(14.7% 0.004 49.25);

  --color-black: #000;
  --color-white: #fff;

  --spacing: 0.25rem;

  --breakpoint-sm: 40rem;
  --breakpoint-md: 48rem;
  --breakpoint-lg: 64rem;
  --breakpoint-xl: 80rem;
  --breakpoint-2xl: 96rem;

  --container-3xs: 16rem;
  --container-2xs: 18rem;
  --container-xs: 20rem;
  --container-sm: 24rem;
  --container-md: 28rem;
  --container-lg: 32rem;
  --container-xl: 36rem;
  --container-2xl: 42rem;
  --container-3xl: 48rem;
  --container-4xl: 56rem;
  --container-5xl: 64rem;
  --container-6xl: 72rem;
  --container-7xl: 80rem;

  --text-xs: 0.75rem;
  --text-xs--line-height: calc(1 / 0.75);
  --text-sm: 0.875rem;
  --text-sm--line-height: calc(1.25 / 0.875);
  --text-base: 1rem;
  --text-base--line-height: calc(1.5 / 1);
  --text-lg: 1.125rem;
  --text-lg--line-height: calc(1.75 / 1.125);
  --text-xl: 1.25rem;
  --text-xl--line-height: calc(1.75 / 1.25);
  --text-2xl: 1.5rem;
  --text-2xl--line-height: calc(2 / 1.5);
  --text-3xl: 1.875rem;
  --text-3xl--line-height: calc(2.25 / 1.875);
  --text-4xl: 2.25rem;
  --text-4xl--line-height: calc(2.5 / 2.25);
  --text-5xl: 3rem;
  --text-5xl--line-height: 1;
  --text-6xl: 3.75rem;
  --text-6xl--line-height: 1;
  --text-7xl: 4.5rem;
  --text-7xl--line-height: 1;
  --text-8xl: 6rem;
  --text-8xl--line-height: 1;
  --text-9xl: 8rem;
  --text-9xl--line-height: 1;

  --font-weight-thin: 100;
  --font-weight-extralight: 200;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;

  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;

  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  --radius-xs: 0.125rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-4xl: 2rem;

  --shadow-2xs: 0 1px rgb(0 0 0 / 0.05);
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  --inset-shadow-2xs: inset 0 1px rgb(0 0 0 / 0.05);
  --inset-shadow-xs: inset 0 1px 1px rgb(0 0 0 / 0.05);
  --inset-shadow-sm: inset 0 2px 4px rgb(0 0 0 / 0.05);

  --drop-shadow-xs: 0 1px 1px rgb(0 0 0 / 0.05);
  --drop-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.15);
  --drop-shadow-md: 0 3px 3px rgb(0 0 0 / 0.12);
  --drop-shadow-lg: 0 4px 4px rgb(0 0 0 / 0.15);
  --drop-shadow-xl: 0 9px 7px rgb(0 0 0 / 0.1);
  --drop-shadow-2xl: 0 25px 25px rgb(0 0 0 / 0.15);

  --text-shadow-2xs: 0px 1px 0px rgb(0 0 0 / 0.15);
  --text-shadow-xs: 0px 1px 1px rgb(0 0 0 / 0.2);
  --text-shadow-sm:
    0px 1px 0px rgb(0 0 0 / 0.075), 0px 1px 1px rgb(0 0 0 / 0.075), 0px 2px 2px rgb(0 0 0 / 0.075);
  --text-shadow-md:
    0px 1px 1px rgb(0 0 0 / 0.1), 0px 1px 2px rgb(0 0 0 / 0.1), 0px 2px 4px rgb(0 0 0 / 0.1);
  --text-shadow-lg:
    0px 1px 2px rgb(0 0 0 / 0.1), 0px 3px 2px rgb(0 0 0 / 0.1), 0px 4px 8px rgb(0 0 0 / 0.1);

  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  --animate-spin: spin 1s linear infinite;
  --animate-ping: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  --animate-bounce: bounce 1s infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes ping {
    75%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }

    50% {
      transform: none;
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }

  --blur-xs: 4px;
  --blur-sm: 8px;
  --blur-md: 12px;
  --blur-lg: 16px;
  --blur-xl: 24px;
  --blur-2xl: 40px;
  --blur-3xl: 64px;

  --perspective-dramatic: 100px;
  --perspective-near: 300px;
  --perspective-normal: 500px;
  --perspective-midrange: 800px;
  --perspective-distant: 1200px;

  --aspect-video: 16 / 9;

  --default-transition-duration: 150ms;
  --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  --default-font-family: --theme(--font-sans, initial);
  --default-font-feature-settings: --theme(--font-sans--font-feature-settings, initial);
  --default-font-variation-settings: --theme(--font-sans--font-variation-settings, initial);
  --default-mono-font-family: --theme(--font-mono, initial);
  --default-mono-font-feature-settings: --theme(--font-mono--font-feature-settings, initial);
  --default-mono-font-variation-settings: --theme(--font-mono--font-variation-settings, initial);
}

/* Deprecated */
@theme default inline reference {
  --blur: 8px;
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --drop-shadow: 0 1px 2px rgb(0 0 0 / 0.1), 0 1px 1px rgb(0 0 0 / 0.06);
  --radius: 0.25rem;
  --max-width-prose: 65ch;
}
`;
  var Vi = `@tailwind utilities;
`;
  var Be = { index: $i, preflight: Si, theme: Ni, utilities: Vi };
  var kt = class {
    start(r) {
      performance.mark(`${r} (start)`);
    }
    end(r, i) {
      performance.mark(`${r} (end)`),
        performance.measure(r, {
          start: `${r} (start)`,
          end: `${r} (end)`,
          detail: i,
        });
    }
    hit(r, i) {
      performance.mark(r, { detail: i });
    }
    error(r) {
      throw (performance.mark("(error)", { detail: { error: `${r}` } }), r);
    }
  };
  console.warn(
    "The browser build of Tailwind CSS should not be used in production. To use Tailwind CSS in production, use the Tailwind CLI, Vite plugin, or PostCSS plugin: https://tailwindcss.com/docs/installation"
  );
  var Ei = "text/tailwindcss",
    vt,
    Ht = new Set(),
    qt = "",
    Gt = document.createElement("style"),
    Ti = Promise.resolve(),
    Vn = 1,
    re = new kt();
  async function Tn() {
    re.start("Create compiler"), re.start("Reading Stylesheets");
    let t = document.querySelectorAll(`style[type="${Ei}"]`),
      r = "";
    for (let i of t)
      Ri(i),
        (r +=
          i.textContent +
          `
`);
    if (
      (r.includes("@import") || (r = `@import "tailwindcss";${r}`),
      re.end("Reading Stylesheets", { size: r.length, changed: qt !== r }),
      qt !== r)
    ) {
      (qt = r), re.start("Compile CSS");
      try {
        vt = await Ci(r, { base: "/", loadStylesheet: En, loadModule: Rn });
      } finally {
        re.end("Compile CSS"), re.end("Create compiler");
      }
      Ht.clear();
    }
  }
  async function En(t, r) {
    function i() {
      if (t === "tailwindcss")
        return {
          path: "virtual:tailwindcss/index.css",
          base: r,
          content: Be.index,
        };
      if (
        t === "tailwindcss/preflight" ||
        t === "tailwindcss/preflight.css" ||
        t === "./preflight.css"
      )
        return {
          path: "virtual:tailwindcss/preflight.css",
          base: r,
          content: Be.preflight,
        };
      if (
        t === "tailwindcss/theme" ||
        t === "tailwindcss/theme.css" ||
        t === "./theme.css"
      )
        return {
          path: "virtual:tailwindcss/theme.css",
          base: r,
          content: Be.theme,
        };
      if (
        t === "tailwindcss/utilities" ||
        t === "tailwindcss/utilities.css" ||
        t === "./utilities.css"
      )
        return {
          path: "virtual:tailwindcss/utilities.css",
          base: r,
          content: Be.utilities,
        };
      throw new Error(`The browser build does not support @import for "${t}"`);
    }
    try {
      let e = i();
      return (
        re.hit("Loaded stylesheet", { id: t, base: r, size: e.content.length }),
        e
      );
    } catch (e) {
      throw (
        (re.hit("Failed to load stylesheet", {
          id: t,
          base: r,
          error: e.message ?? e,
        }),
        e)
      );
    }
  }
  async function Rn() {
    throw new Error(
      "The browser build does not support plugins or config files."
    );
  }
  async function Pn(t) {
    if (!vt) return;
    let r = new Set();
    re.start("Collect classes");
    for (let i of document.querySelectorAll("[class]"))
      for (let e of i.classList) Ht.has(e) || (Ht.add(e), r.add(e));
    re.end("Collect classes", { count: r.size }),
      !(r.size === 0 && t === "incremental") &&
        (re.start("Build utilities"),
        (Gt.textContent = vt.build(Array.from(r))),
        re.end("Build utilities"));
  }
  function wt(t) {
    async function r() {
      if (!vt && t !== "full") return;
      let i = Vn++;
      re.start(`Build #${i} (${t})`),
        t === "full" && (await Tn()),
        re.start("Build"),
        await Pn(t),
        re.end("Build"),
        re.end(`Build #${i} (${t})`);
    }
    Ti = Ti.then(r).catch((i) => re.error(i));
  }
  var On = new MutationObserver(() => wt("full"));
  function Ri(t) {
    On.observe(t, {
      attributes: !0,
      attributeFilter: ["type"],
      characterData: !0,
      subtree: !0,
      childList: !0,
    });
  }
  new MutationObserver((t) => {
    let r = 0,
      i = 0;
    for (let e of t) {
      for (let o of e.addedNodes)
        o.nodeType === Node.ELEMENT_NODE &&
          o.tagName === "STYLE" &&
          o.getAttribute("type") === Ei &&
          (Ri(o), r++);
      for (let o of e.addedNodes) o.nodeType === 1 && o !== Gt && i++;
      e.type === "attributes" && i++;
    }
    if (r > 0) return wt("full");
    if (i > 0) return wt("incremental");
  }).observe(document.documentElement, {
    attributes: !0,
    attributeFilter: ["class"],
    childList: !0,
    subtree: !0,
  });
  wt("full");
  document.head.append(Gt);
})();
