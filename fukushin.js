/**
 * 腹診（ふくしん）チェックポイント — 腹診タブ
 * 出典：花輪壽彦『漢方と診療』2010.11／『腹証図解 漢方常用処方解説』三考塾叢刊社。
 * 図はすべて自作の模式図（書籍写真は不使用）。丸数字＝ツムラ番号。最終判断は医師が行う。
 */
"use strict";

/* 腹部（仰臥位・頭側=上）の模式図ベース */
function fkTorso(overlay){
  return `<svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="腹部模式図">
    <text x="100" y="12" text-anchor="middle" font-size="9" fill="#8a97a4">頭側</text>
    <path d="M42,22 C34,60 33,110 37,155 C41,205 62,236 100,236 C138,236 159,205 163,155 C167,110 166,60 158,22 Z"
          fill="var(--fk-skin)" stroke="var(--fk-skinline)" stroke-width="2"/>
    <path d="M100,34 C78,40 60,54 48,86" fill="none" stroke="var(--fk-rib)" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M100,34 C122,40 140,54 152,86" fill="none" stroke="var(--fk-rib)" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M100,34 l0,10" stroke="var(--fk-rib)" stroke-width="2" stroke-linecap="round"/>
    <line x1="100" y1="46" x2="100" y2="222" stroke="var(--fk-mid)" stroke-width="1.4" stroke-dasharray="4 4"/>
    <circle cx="100" cy="140" r="6" fill="none" stroke="var(--fk-nav)" stroke-width="2"/>
    <circle cx="100" cy="140" r="1.6" fill="var(--fk-nav)"/>
    ${overlay||""}
    <text x="100" y="248" text-anchor="middle" font-size="9" fill="#8a97a4">足側</text>
  </svg>`;
}
const FK_DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <marker id="fkar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
    <path d="M0,0 L6,3 L0,6 Z" fill="#2b5f8a"/></marker>
  <marker id="fkarR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
    <path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker>
</defs></svg>`;

const FUKUSHIN_SIGNS = [
{
  no:"①", name:"腹力", kana:"ふくりょく",
  point:"病気をはね返す予備能力の程度を反映",
  diagcap:"虚 ⇔ 実 のグラデーションで評価",
  svg: fkTorso(`
    <line x1="60" y1="130" x2="140" y2="130" stroke="#2b5f8a" stroke-width="1.6" marker-start="url(#fkar)" marker-end="url(#fkar)"/>
    <text x="52" y="134" text-anchor="end" font-size="11" fill="#5a4a86" font-weight="700">虚</text>
    <text x="148" y="134" font-size="11" fill="#b1443a" font-weight="700">実</text>
  `),
  exam:["肋骨弓の角度、胸壁と腹壁の高さ、弾力性、緊張度をみる。","「虚」〜「実」の連続量として評価する。"],
  jt:null,
  note:"<b>見誤り注意：</b>①ガス・便秘の腹満 → <b>仮の実証</b>／②腹壁が膨隆しても軟らかい → <b>虚証</b>／③痩せて正中付近が緊張 → <b>虚証</b>。",
  rx:[]
},
{
  no:"②", name:"腹直筋緊張", kana:"ふくちょくきんきんちょう",
  point:"交感神経系の過緊張の蓄積の反映",
  diagcap:"両側の腹直筋の張り／外縁の外側を診る",
  svg: fkTorso(`
    <rect x="82" y="70" width="12" height="120" rx="6" fill="#2b5f8a" opacity="0.28"/>
    <rect x="106" y="70" width="12" height="120" rx="6" fill="#2b5f8a" opacity="0.28"/>
    <line x1="70" y1="120" x2="80" y2="120" stroke="#2b5f8a" stroke-width="1.6" marker-end="url(#fkar)"/>
    <line x1="130" y1="120" x2="120" y2="120" stroke="#2b5f8a" stroke-width="1.6" marker-end="url(#fkar)"/>
    <text x="100" y="205" text-anchor="middle" font-size="8.5" fill="#5a6b7c">外縁の外側を診る</text>
  `),
  exam:["「はい、力を抜いて〜」と言っても抜けない人。","交感神経の過緊張を考える ⇒ <b>芍薬</b>を使うサイン。","過度に緊張している場合の腹力は、腹直筋の<b>外縁より外側</b>で診る。","スポーツをする人のがっちりした腹直筋は、あらかじめ問診で確認を。"],
  jt:{head:["タイプ","所見","処方例"],rows:[
    ["実証","筋肉が太く大きく弾力がある","35 四逆散"],
    ["虚証","表面が張った感じ・弾力がない。触るとくすぐったい","99 小建中湯 ＊"]
  ]},
  note:"＊小建中湯の場合、フニャフニャのパターンもある。",
  rx:[["35","四逆散"],["99","小建中湯"]]
},
{
  no:"③", name:"心下痞鞕", kana:"しんかひこう",
  point:"消化器系の機能の不和反応",
  diagcap:"剣状突起下2横指。①背側→②頭側へ突き上げ",
  svg: fkTorso(`
    <circle cx="100" cy="70" r="11" fill="#c0392b" opacity="0.22" stroke="#c0392b"/>
    <text x="118" y="63" font-size="8" fill="#8f2419">剣状突起</text>
    <text x="118" y="73" font-size="8" fill="#8f2419">下2横指</text>
    <line x1="100" y1="88" x2="100" y2="76" stroke="#c0392b" stroke-width="1.8" marker-end="url(#fkarR)"/>
    <text x="86" y="92" text-anchor="end" font-size="8" fill="#8f2419">①背側</text>
    <line x1="100" y1="76" x2="100" y2="60" stroke="#2b5f8a" stroke-width="1.8" marker-end="url(#fkar)"/>
    <text x="112" y="55" font-size="8" fill="#1d4463">②頭側</text>
  `),
  exam:["剣状突起下へ指を潜り込ませる。","まず ①背側に押してから、②頭側へ突き上げる。","指骨の方向が押す方向に一致するように。"],
  jt:null,
  note:"<b>心下痞鞕（他覚的な抵抗）</b>と<b>心下痞（自覚的な不快）</b>は区別するが同時に現れることが多い。<br><b>③＊心下痞堅</b>（痞鞕の強いもの）→ 36 木防已湯。<b>③＊心下急</b>（心窩部の強い急迫・広範な胸脇苦満）→ 8 大柴胡湯。",
  rx:[["14","半夏瀉心湯"],["113","三黄瀉心湯"],["15","黄連解毒湯"]]
},
{
  no:"④", name:"胸脇苦満", kana:"きょうきょうくまん",
  point:"抗病反応の抵抗期。疲弊状態では消失",
  diagcap:"肋骨弓交点の2横指下方を乳頭に向け押す",
  svg: fkTorso(`
    <circle cx="62" cy="98" r="9" fill="#c0392b" opacity="0.28" stroke="#c0392b"/>
    <circle cx="138" cy="98" r="9" fill="#2b5f8a" opacity="0.18" stroke="#2b5f8a" stroke-dasharray="3 3"/>
    <line x1="62" y1="98" x2="70" y2="60" stroke="#2b5f8a" stroke-width="1.4" marker-end="url(#fkar)"/>
    <text x="46" y="118" text-anchor="middle" font-size="8" fill="#8f2419">右(9)</text>
    <text x="150" y="118" text-anchor="middle" font-size="8" fill="#1d4463">左(1)</text>
    <text x="100" y="150" text-anchor="middle" font-size="7.5" fill="#5a6b7c">乳頭に向けて</text>
  `),
  exam:["肋骨弓交点の2横指下方あたりを、乳頭に向けて押す。","押し方は心下痞鞕と同様、まず①背側へ→②乳頭側へ。","<b>陽性(＋)</b>：苦しそうな顔／「ウッ！」／指が入らないとき。","右になければ左も診る（右:左≒9:1）。"],
  jt:null,
  note:"右でも左でも<b>陽性は「柴胡を使え」</b>というサイン。",
  rx:[["8","大柴胡湯"],["9","小柴胡湯"],["10","柴胡桂枝湯"]]
},
{
  no:"⑤", name:"臍上悸", kana:"さいじょうき",
  point:"交感神経系の過緊張の蓄積、または慢性消耗状態",
  diagcap:"心下悸／臍上悸／臍の動悸／臍下悸",
  svg: fkTorso(`
    <circle cx="100" cy="90" r="7" fill="#c0392b" opacity="0.20" stroke="#c0392b"/>
    <text x="112" y="93" font-size="7.5" fill="#8f2419">①心下悸</text>
    <circle cx="100" cy="118" r="8" fill="#c0392b" opacity="0.35" stroke="#c0392b"/>
    <text x="112" y="121" font-size="7.5" fill="#8f2419">②臍上悸</text>
    <text x="112" y="142" font-size="7.5" fill="#5a6b7c">③臍の動悸</text>
    <circle cx="100" cy="166" r="7" fill="#c0392b" opacity="0.20" stroke="#c0392b"/>
    <text x="112" y="169" font-size="7.5" fill="#8f2419">④臍下悸</text>
  `),
  exam:["腹部大動脈の拍動が腹壁に伝播するもの。腹力・腹壁の緊張度と交感神経過緊張に関係。","臍の頭・左側で触知しやすい。手はじーっと止めておく。","最初から強く押すと痛がる。顔色を見ながら。腹壁が弱い人は触れやすい。","体型により押す強さの加減が必要。"],
  jt:{head:["部位","意味"],rows:[
    ["①②<br>心下悸・臍上悸","水分代謝異常(ムカムカ)、またはイライラ不眠の交感神経緊張"],
    ["③ 臍の動悸","一般的に胃腸が弱い"],
    ["④ 臍下悸","発作性の動悸・頭痛・肩こり・めまいなど自律神経症状"]
  ]},
  note:"★所見に悩む時は問診で「<b>睡眠中に目が覚めませんか？</b>」→「はい」なら「＋」。",
  rx:[["54","抑肝散"],["-","竜骨・牡蛎を含むもの"]]
},
{
  no:"⑥", name:"瘀血", kana:"おけつ",
  point:"骨盤腔内の微小循環障害",
  diagcap:"盛り上がりの頂点を、臍の下へ向け押す",
  svg: fkTorso(`
    <circle cx="88" cy="160" r="5.5" fill="#7d4152" opacity="0.5"/>
    <text x="78" y="150" text-anchor="end" font-size="7" fill="#7d4152">①臍近傍</text>
    <circle cx="78" cy="180" r="5.5" fill="#7d4152" opacity="0.5"/>
    <text x="66" y="176" text-anchor="end" font-size="7" fill="#7d4152">②中点</text>
    <circle cx="70" cy="200" r="5.5" fill="#7d4152" opacity="0.5"/>
    <text x="60" y="205" text-anchor="end" font-size="7" fill="#7d4152">③腸骨棘</text>
    <circle cx="118" cy="168" r="5.5" fill="#7d4152" opacity="0.4"/>
    <line x1="100" y1="150" x2="100" y2="168" stroke="#c0392b" stroke-width="1.6" marker-end="url(#fkarR)"/>
    <text x="122" y="150" font-size="7.5" fill="#8f2419">臍の下へ</text>
  `),
  exam:["圧痛点は、少し盛り上がっているところを探し、その頂点を押さえる。","探す場所：臍の近傍／臍と上前腸骨棘の中点／腸骨棘の近傍／上前腸骨棘。","最終方向は<b>臍の下</b>へ。"],
  jt:null,
  note:"駆瘀血剤を用いる代表所見。左下腹部に出やすい。",
  rx:[["23","当帰芍薬散"],["24","加味逍遙散"],["25","桂枝茯苓丸"]]
},
{
  no:"⑦", name:"小腹不仁", kana:"しょうふくふじん",
  point:"抗病反応の低下。老化や慢性消耗状態の反映",
  diagcap:"臍上=大腹／臍下=小腹。小腹が沈み込む",
  svg: fkTorso(`
    <line x1="44" y1="140" x2="156" y2="140" stroke="#1f6b58" stroke-width="1.2" stroke-dasharray="5 4"/>
    <text x="150" y="118" text-anchor="end" font-size="9" fill="#1f6b58">大腹</text>
    <path d="M60,150 Q100,146 140,150 L140,210 Q100,224 60,210 Z" fill="#2e8b74" opacity="0.16"/>
    <text x="100" y="188" text-anchor="middle" font-size="10" fill="#1f6b58" font-weight="700">小腹（無力）</text>
    <line x1="100" y1="150" x2="100" y2="168" stroke="#c0392b" stroke-width="1.8" marker-end="url(#fkarR)"/>
    <text x="120" y="205" text-anchor="middle" font-size="7" fill="#8f2419">尾側で出やすい</text>
  `),
  exam:["小腹＝臍下部の小さな腹（臍上は大腹）。臍下部の「無力」＝フニャフニャで力がない状態。","現代医学の<b>サルコペニア</b>に近い（下腹直筋）。","手刀のかたちで大腹と小腹を同時に押すと、小腹は沈み込むように入り込む。","所見は尾側（恥骨結合寄り）で出やすい。指を突っ込むように。"],
  jt:{head:["胃腸機能","処方"],rows:[["丈夫な人","7 八味地黄丸"],["弱い人","30 真武湯"]]},
  note:"まとめ：（とにかく）<b>腎虚</b> → 7 八味地黄丸 か 107 牛車腎気丸。",
  rx:[["7","八味地黄丸"],["107","牛車腎気丸"],["30","真武湯"]]
},
{
  no:"⑦＊", name:"正中芯", kana:"せいちゅうしん",
  point:"白線に鉛筆の芯のようなものを触れる（虚証）",
  diagcap:"白線に直角に、皮下を探る（タオル下の爪楊枝）",
  svg: fkTorso(`
    <line x1="100" y1="146" x2="100" y2="205" stroke="#5a4a86" stroke-width="3" stroke-linecap="round"/>
    <text x="112" y="162" font-size="7.5" fill="#5a4a86">へそ下</text>
    <text x="112" y="128" font-size="7.5" fill="#5a4a86">へそ上</text>
    <line x1="86" y1="175" x2="100" y2="175" stroke="#2b5f8a" stroke-width="1.4" marker-end="url(#fkar)"/>
    <text x="58" y="178" font-size="7" fill="#1d4463">直角に</text>
  `),
  exam:["へその下の白線部分に、鉛筆の芯のようなものを触れるサイン。","痩せた人・虚弱・疲労している人など<b>虚証</b>に良く見られる。","感触は、タオルの下に爪楊枝を置いて上から触れるような感じ。","正中の白線に対し、直角に指で皮下を探る。"],
  jt:{head:["正中芯","方剤"],rows:[
    ["へそ上","胃腸機能を高める：32 人参湯／45 四君子湯"],
    ["へそ下","腎機能を高める：7 八味地黄丸／30 真武湯"]
  ]},
  note:"⑦小腹不仁の関連所見（虚証のサイン）。",
  rx:[["32","人参湯"],["45","四君子湯"],["7","八味地黄丸"],["30","真武湯"]]
},
{
  no:"⑧", name:"振水音", kana:"しんすいおん（胃内停水音）",
  point:"消化機能の停滞・胃下垂の反映",
  diagcap:"膝を立て、心窩部をスタッカートに叩く",
  svg: fkTorso(`
    <ellipse cx="100" cy="95" rx="26" ry="18" fill="#3a5b86" opacity="0.14" stroke="#3a5b86" stroke-dasharray="3 3"/>
    <text x="100" y="60" text-anchor="middle" font-size="8" fill="#3a5b86">心窩部を叩く</text>
    <circle cx="92" cy="92" r="2" fill="#3a5b86"/><circle cx="104" cy="98" r="2.4" fill="#3a5b86"/>
    <circle cx="110" cy="88" r="1.6" fill="#3a5b86"/><circle cx="96" cy="102" r="1.8" fill="#3a5b86"/>
    <text x="100" y="150" text-anchor="middle" font-size="9" fill="#5a6b7c">ポチャポチャ音</text>
  `),
  exam:["患者は膝を立てる。","心窩部をスタッカートに叩く。拳骨で叩いても良い。","胃内の停水音（ポチャポチャ）を確認する。"],
  jt:null,
  note:"水毒（水滞）の代表所見。",
  rx:[["17","五苓散"],["39","苓桂朮甘湯"],["81","二陳湯"]]
},
{
  no:"⑨", name:"腹壁の温度", kana:"ふくへきのおんど",
  point:"冷えの有無",
  diagcap:"どの段階でも可。冷えが大切",
  svg: fkTorso(`
    <path d="M70,150 h60 M100,120 v60 M80,130 l40,40 M120,130 l-40,40" stroke="#3a5b86" stroke-width="1.6" stroke-linecap="round" opacity="0.65"/>
    <circle cx="100" cy="150" r="30" fill="#3a5b86" opacity="0.10"/>
    <text x="100" y="205" text-anchor="middle" font-size="9" fill="#3a5b86" font-weight="700">冷えが大切</text>
  `),
  exam:["どの段階で診察してもよい。","手掌を当て、腹壁の冷えの有無をみる。"],
  jt:null,
  note:"冷えがあれば温薬の配合を考える。",
  rx:[["43","六君子湯"],["100","大建中湯"],["32","人参湯"]]
}
];

function fkId(s){ return s.no.replace("＊","x").replace(/[①②③④⑤⑥⑦⑧⑨]/g,m=>"①②③④⑤⑥⑦⑧⑨".indexOf(m)+1); }

let fkBuilt=false;
function renderFukushin(){
  const view=document.getElementById("fukushinView");
  if(fkBuilt){ return; }        /* 1回だけ構築し、チェック状態を保持 */
  const ov=FUKUSHIN_SIGNS.filter(s=>!s.no.includes("＊")).map(s=>
    `<tr onclick="document.getElementById('fkc${fkId(s)}').scrollIntoView({behavior:'smooth'})">
       <td class="fk-n">${s.no}</td>
       <td class="fk-nm">${s.name}<small>${s.kana}</small></td>
       <td>${s.point}</td></tr>`).join("");
  const cards=FUKUSHIN_SIGNS.map(s=>{
    const jt = s.jt ? `<div class="fk-lbl">判定・分類</div><table class="fk-jt">`
        +(s.jt.head?`<tr>${s.jt.head.map(h=>`<th>${h}</th>`).join("")}</tr>`:"")
        +s.jt.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")
        +`</table>` : "";
    const rx = s.rx.length ? `<div class="fk-lbl">代表処方</div><div class="fk-rx">`
        +s.rx.map(([n,nm])=>`<span class="fk-rxchip">${n!=="-"?`<b>${n}</b> `:""}${nm}</span>`).join("")+`</div>` : "";
    const note = s.note ? `<div class="fk-note">${s.note}</div>` : "";
    return `<div class="fk-card" id="fkc${fkId(s)}">
      <div class="fk-head">
        <div class="fk-num">${s.no}</div>
        <div class="fk-ttl">${s.name}<span class="fk-kana">${s.kana}</span></div>
        <div class="fk-point">${s.point}</div>
      </div>
      <div class="fk-body">
        <div class="fk-diagrow">
          <div class="fk-diag">${s.svg}<div class="fk-diagcap">${s.diagcap}</div></div>
          <div class="fk-info">
            <div class="fk-lbl">診かた・チェックポイント</div>
            <ul class="fk-pts">${s.exam.map(e=>`<li>${e}</li>`).join("")}</ul>
            ${jt}${rx}${note}
          </div>
        </div>
        <div class="fk-chk">
          <input type="checkbox" id="fkchk${fkId(s)}" onchange="this.closest('.fk-card').classList.toggle('on',this.checked)">
          <label for="fkchk${fkId(s)}">この所見あり（＋）</label>
        </div>
      </div></div>`;
  }).join("");

  view.innerHTML = FK_DEFS
    + `<div class="fk-intro">腹診の9徴候について、<b>診かた（押す場所・方向）</b>・<b>判定</b>・<b>代表処方</b>を図解でまとめた早見メモです。各カードの「所見あり」をタップすると記録できます。`
    + `<span>出典：花輪壽彦『漢方と診療』2010.11／『腹証図解 漢方常用処方解説』三考塾叢刊社。図は自作の模式図。丸数字＝ツムラ番号。最終判断は医師が行う。</span></div>`
    + `<div class="fk-ovwrap"><table class="fk-ov"><thead><tr><th>#</th><th>徴候</th><th>腹証のポイント（何を反映するか）</th></tr></thead><tbody>${ov}</tbody></table></div>`
    + `<div class="fk-cards">${cards}</div>`;
  fkBuilt=true;
}
window.renderFukushin=renderFukushin;
