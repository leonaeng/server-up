import {
  m as p,
  a as C,
  C as $
}
from'./vendor.js';
const D = function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) s(o);
  new MutationObserver(o=>{
    for (const i of o) if (i.type === 'childList') for (const d of i.addedNodes) d.tagName === 'LINK' && d.rel === 'modulepreload' && s(d)
  }).observe(document, {
    childList: !0,
    subtree: !0
  });
  function n(o) {
    const i = {
    };
    return o.integrity && (i.integrity = o.integrity),
    o.referrerpolicy && (i.referrerPolicy = o.referrerpolicy),
    o.crossorigin === 'use-credentials' ? i.credentials = 'include' : o.crossorigin === 'anonymous' ? i.credentials = 'omit' : i.credentials = 'same-origin',
    i
  }
  function s(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i)
  }
};
D();
function w(e) {
  return (e < 10 ? '0' : '') + e
}
p.data('picker', () =>({
  scrl: 0,
  moveScroll(e) {
    let t = this.$refs.el.scrollWidth - this.$refs.el.clientWidth;
    if (e === 'left') {
      if (this.scrl <= t) return this.scrl = t,
      this.$refs.el.scroll({
        left: t,
        behavior: 'smooth'
      });
      this.scrl = this.scrl - 300
    }
    if (e === 'right') {
      if (this.scrl >= t) return this.scrl = 0,
      this.$refs.el.scroll({
        left: 0,
        behavior: 'smooth'
      });
      this.scrl = this.scrl + 300
    }
    this.$refs.el.scroll({
      left: this.scrl,
      behavior: 'smooth'
    })
  }
}));
p.data('pagination', () =>({
  lastPage: 1,
  currentPage: 1,
  beforeFiller: !1,
  afterFiller: !1,
  before: [
  ],
  after: [
  ],
  configSettings(e, t) {
    let n = t - e,
    s = 0,
    o = 0;
    n < 4 && (s = 3 - n),
    e < 4 && (o = 6 - e);
    for (let i = 1; i < 3 + s; i++) e - i >= 2 && this.before.push(e - i);
    for (let i = 1; i < 3 + o; i++) e + i < t && e !== t && this.after.push(e + i);
    e - 2 > 2 && (this.beforeFiller = !0),
    n - 2 > 2 && (this.afterFiller = !0),
    this.before.reverse(),
    this.lastPage = t,
    this.currentPage = e
  },
  makeUrl(e) {
    let t = document.location.href;
    return t.split('#') [0].split('') [t.length - 1] !== '/' && (t = t + '/'),
    t.replace('#', '').split('pg.') [0] + 'pg.' + e
  },
  get lastPageURL() {
    return this.currentPage === 1 ? 'javascript:void(0)' : this.makeUrl(this.currentPage - 1)
  },
  get nextPageURL() {
    return this.currentPage === this.lastPage ? 'javascript:void(0)' : this.makeUrl(this.currentPage + 1)
  }
}));
p.data('serverTabs', () =>({
  tab: 4,
  init() {
    switch (document.location.pathname.split('/').pop()) {
      default:
        this.tab = 0;
        break;
      case 'statistics':
        this.tab = 1;
        break;
      case 'banners':
        this.tab = 2;
        break;
      case 'vote':
        this.tab = 3;
        break;
      case 'reviews':
        this.tab = 4;
        break;
      case 'review':
        this.tab = 3; // minehut
        break;
      case 'charts':
        this.tab = 5;
        break
      case 'leaderboard':
        this.tab = 6;
        break
    }
  }
}));
p.data('lazyFallback', () =>({
  init() {
    this.$el.src = this.$el.dataset.src
  }
}));
p.data('serverChart', () =>({
  chart: null,
  init(e) {
    (() =>new Promise((n, s) =>{
      C.get(e).then(o=>{
        n(o.data)
      })
    })) ().then(n=>{
      let s = [
      ],
      o = n.cols.map(i=>{
        let d = '#f00';
        switch (i.label) {
          case 'Votes':
            d = '#03a9f4';
            break;
          case 'Rank':
            d = '#ff9800';
            break;
          case 'Players':
            d = '#e91e63';
            break;
          case 'Uptime':
            d = '#4caf50';
            break
        }
        return i.label === 'Date' ? null : {
          label: i.label,
          backgroundColor: d,
          borderColor: d,
          data: [
          ]
        }
      }).filter(i=>i);
      for (let i = 0; i < n.rows.length; i++) {
        let d = n.rows[i].c;
        s.push(d[0].v),
        o[0].data.push(d[1].v),
        o[1].data.push(d[2].v),
        o[2].data.push(d[3].v),
        o[3].data.push(d[4].v)
      }
      new $(this.$refs.chartEl, {
        type: 'line',
        data: {
          labels: s,
          datasets: o
        }
      })
    })
  }
}));
p.data('typeSelector', () =>({
  typed: '',
  focused: !1,
  pointer: !1,
  cache: [
  ],
  all: [
  ],
  selected: [
  ],
  get searchResults() {
    return this.all.filter(e=>e.name.toLowerCase().includes(this.typed.toLowerCase()))
  },
  get typesForForm() {
    return this.selected.join(',')
  },
  removeType(e) {
    this.selected = this.selected.filter(t=>t !== e),
    this.all.push({
      name: e
    })
  },
  focusIn() {
    this.focused = !0,
    this.pointer = !0
  },
  focusOut() {
    this.focused = !1,
    setTimeout(() =>{
      this.pointer = !1
    }, 400)
  },
  select(e) {
    this.selected.includes(e) || this.selected.length === 10 || (this.selected.push(e), this.all = this.all.filter(t=>t.name !== e))
  },
  setData(e, t) {
    if (this.cache = e, this.all = e, t) {
      let n = t.split(',');
      for (let s = 0; s < n.length; s++) {
        let o = n[s];
        this.select(o)
      }
    }
  }
}));
p.data('countdown', () =>({
  timeleft: 'Ending Soon!',
  start(e) {
    setInterval(() =>{
      let t = w(Math.floor(e / (60 * 60 * 24))),
      n = w(Math.floor(e % (60 * 60 * 24) / (60 * 60))),
      s = w(Math.floor(e % (60 * 60) / 60)),
      o = w(Math.floor(e % 60));
      if (e <= 0) return this.timeleft = 'Ended';
      t > 0 ? this.timeleft = `${ t }d ${ n }h ${ s }m ${ o }s` : this.timeleft = `${ n }h ${ s }m ${ o }s`,
      e--
    }, 1000)
  },
  startZeroDate() {
    let e = new Date,
    t = Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate() + 1, 0, 0, 0);
    this.start((new Date(t).getTime() - (e.getTime() + 5 * 60 * 60 * 1000)) / 1000)
  }
}));
p.data('searchForm', () =>({
  query: '',
  focused: !1,
  results: [
  ],
  resultsActive: !1,
  setSearch(e) {
    this.searchBy = e
  },
  handleForm(type) {
    let e = '';
    document.location.host !== 'servers-minecraft.net' && (e = '/list');
	console.log(type);
	if(type == 1) {
    C.get(e + '/servers-search/q=' + encodeURIComponent(this.query) + '&cat=1').then(t=>{
      this.results = t.data.results,
      this.resultsActive = !0
    })
	} else {
	C.get(e + '/servers-search/q=' + encodeURIComponent(this.query) + '&cat=7').then(t=>{
      this.results = t.data.results,
      this.resultsActive = !0
    })
	}
  }
}));
p.data('banners', () =>({
  base: '',
  id: '',
  color: '4D5988',
  get img() {
    return this.base + 'votebanner-' + this.id + '-' + this.color + '.png'
  },
  get html() {
    let e = document.location.href;
    return e.includes('/vote') || (e = e + 'vote/'),
    '<a href="' + e + '" target="_blank"><img src="' + this.img + '" width="468" height="60" alt=""/></a>'
  },
  get bb() {
    let e = document.location.href;
    return e.includes('/vote') || (e = e + 'vote/'),
    '[url=' + e + '][img]' + this.img + '[/img][/url]'
  },
  init(e, t) {
    this.base = e,
    this.id = t
  }
}));
p.data('youtube', () =>({
  init() {
    this.$el.src = this.$el.dataset.src
  }
}));
let P = [
  {
    title: 'What are Minecraft Servers?',
    body: 'Minecraft Servers are a great way to meet new people and forge new friendships. Minecraft Servers are a platform in which people can enjoy the game of Minecraft by playing with many other players from all over the world. This is a really great way to Minecraft is a very popular game with millions of players worldwide. In order to meet new people and have a lot of fun, you need to play Minecraft with other players from all over the world. Thats when Minecraft Servers come in handy. In order to play with other Minecraft players from all over the world, you must join a Minecraft Server and play on it. To join a Minecraft Server, you need the IP address of the server. Lucky for you, we have a big list of servers to choose from here on our website!'
  },
  {
    title: 'What are some popular Minecraft server gamemodes?',
    body: 'Survival – In this gamemode, the only objective is to survive. A player must kill mobs, craft resources and explore the world in order to survive. The only source of resources is through exploration and crafting, and sometimes trading. Creative – In Creative, there is no objective and players can use and destroy anything and do anything they please. Although there is no objective, some players choose to build or build with specific goals in mind. Mini Game – This is a custom generated world which allows players to play any of the various mini games available like BedWars, EggWars, SkyWars, and more. SkyBlock - Players spawn on a floating island in the void with minimal resources and they can infinitely expand. Prison - Players will have to mine their way through a ladder of ranks to get to the "Free" rank.'
  },
  {
    title: 'What is the difference between Java and Bedrock Minecraft servers?',
    body: 'Minecraft servers come in two types: those on Minecraft: Java Edition, and those on Minecraft: Bedrock Edition. For those unfamiliar with the concept of Minecraft servers, they are a multiplayer environment where people can build whatever they want and do whatever they want as long as it does not negatively affect other players on the server. Java servers use Java mods, which allow server owners to use custom codes and scripts to improve gameplay and balance. The main difference is that the Bedrock versions of servers do not allow for mods, and therefore cannot experience any of the new features the Java versions of the server include.'
  },
  {
    title: 'What is the History of Minecraft Servers?',
    body: 'Minecraft servers have been around as long as Minecraft, which has been available since 2009. Game company Mojang has been aware of people hosting servers and has had a developer document its history on their site. The first public Minecraft server was crafted by a gamer under the alias of "Aerith" who hosted a server called "Laddycraft" on a server they rent from a company based out of Texas. Those were the early days of Minecraft servers and the server grew in popularity with players hosting their own servers on rented servers or running them from home.'
  },
  {
    title: 'How do I join a Minecraft Server?',
    body: 'As for how to join a Minecraft server, you need to go onto the Minecraft server list website and find a server that you want to play on. Luckily, we have a lot of servers right here on our website! There is a great selection of gamemodes and servers that have been vetted manually by us. Once you have found a server, click "Copy IP" then open Minecraft: Java Edition. In Minecraft, click on "Multiplayer" then "Add Server". Paste the IP that you have copied into the IP Address field and for the port put "25565". From there, click on the server and it should load up.'
  },
  {
    title: 'Are Minecraft Servers Safe?',
    body: 'Thats a great question! The answer is that servers can be safe by having rules and moderators. Unfortunately, because the answer to that question is so variable, we recommend that people ask the server staff about the safety and rules before playing on the server themselves.'
  },
  {
    title: 'What is a Minecraft Server list?',
    body: 'A <a href="https://servers-minecraft.net">Minecraft Server List</a> is a website that lists a lot of Minecraft servers for players to choose from. On a Minecraft Server List, you can find thousands of servers which are categorized according to their gamemodes. To start, find a Minecraft server list, such as this website, then click a gamemode and browse through the servers. When you find one you like, click on it and the copy the ip to join the Minecraft server!'
  }
];
p.store('page', {
  toasts: [
  ],
  modal: {
    isOpen: !1,
    title: '',
    body: ''
  },
  addToast({
    type: e,
    message: t
  }) {
    let n = this.toasts.length;
    this.toasts.push({
      id: n,
      type: e,
      message: t
    }),
    setTimeout(() =>{
      this.toasts = this.toasts.filter(s=>s.id !== n)
    }, 5000)
  },
  copyIP(e, t) {
    window.navigator.clipboard.writeText(e).then(() =>{
      this.addToast({
        type: 'success',
        message: 'Server IP copied successfully!'
      })
    }).catch(s=>{
      this.addToast({
        type: 'error',
        message: 'Server IP was not copied successfully.'
      })
    });
    let n = '';
    document.location.host === 'minecraftserverlisting.net' && (n = '/list'),
    C.post(n + '/api/copy/' + t).then(s=>{
      console.log(s)
    })
  },
  bedrockClick(e, t) {
    window.navigator.clipboard.writeText(e).then(() =>{
      this.addToast({
        type: 'success',
        message: 'Server added to Minecraft successfully!'
      })
    }).catch(s=>{
      this.addToast({
        type: 'error',
        message: 'Server was not successfully added.'
      })
    });
    let n = '';
    document.location.host === 'minecraftserverlisting.net' && (n = '/list'),
    C.post(n + '/api/bedrockclick/' + t).then(s=>{
      console.log(s)
    })
  },
  skinLike(e,t) {
    let n = '';
    document.location.host === 'minecraftserverlisting.net' && (n = '/list'),
    C.post(n + '/api/like/' + t).then(s=>{
     if(s.data.message == "Skin liked") {
      this.addToast({
        type: 'success',
        message: 'Liked ' + e + ' skin!'
      });
} else {
this.addToast({
        type: 'error',
        message: 'You\'ve already liked ' + e + ' skin today!'
      });
}
    })
  },
  changeOrder(e) {
    e === null ? document.cookie = 'listOrder=;' : document.cookie = 'listOrder=' + e + ';',
    document.location.reload()
  },
  openFAQ(e) {
    this.modal.isOpen = !0,
    this.modal.title = P[e].title,
    this.modal.body = P[e].body
  },
  confirmAction(e, t) {
    this.modal.isOpen = !0,
    this.modal.title = 'Confirm Action',
    this.modal.body = `<p class="mb-3">Are you sure you want to ${ t }? This action is not reversible.</p><a href="${ e }" class="btn btn-red btn-lg">Confirm</a>`
  }
});
class m extends HTMLElement {
  connectedCallback() {
    this.videoId = this.getAttribute('videoid');
    let t = this.querySelector('.lty-playbtn');
    if (this.playLabel = t && t.textContent.trim() || this.getAttribute('playlabel') || 'Play', this.style.backgroundImage || (this.style.backgroundImage = `url("https://i.ytimg.com/vi/${ this.videoId }/hqdefault.jpg")`), t || (t = document.createElement('button'), t.type = 'button', t.classList.add('lty-playbtn'), this.append(t)), !t.textContent) {
      const n = document.createElement('span');
      n.className = 'lyt-visually-hidden',
      n.textContent = this.playLabel,
      t.append(n)
    }
    this.addEventListener('pointerover', m.warmConnections, {
      once: !0
    }),
    this.addEventListener('click', this.addIframe)
  }
  static addPrefetch(t, n, s) {
    const o = document.createElement('link');
    o.rel = t,
    o.href = n,
    s && (o.as = s),
    document.head.append(o)
  }
  static warmConnections() {
    m.preconnected || (m.addPrefetch('preconnect', 'https://www.youtube-nocookie.com'), m.addPrefetch('preconnect', 'https://www.google.com'), m.addPrefetch('preconnect', 'https://googleads.g.doubleclick.net'), m.addPrefetch('preconnect', 'https://static.doubleclick.net'), m.preconnected = !0)
  }
  addIframe(t) {
    if (this.classList.contains('lyt-activated')) return;
    t.preventDefault(),
    this.classList.add('lyt-activated');
    const n = new URLSearchParams(this.getAttribute('params') || [
    ]);
    n.append('autoplay', '1');
    const s = document.createElement('iframe');
    s.width = 560,
    s.height = 315,
    s.title = this.playLabel,
    s.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
    s.allowFullscreen = !0,
    s.src = `https://www.youtube-nocookie.com/embed/${ encodeURIComponent(this.videoId) }?${ n.toString() }`,
    this.append(s),
    s.focus()
  }
}
Number.prototype.pad = function (e) {
  return new Array(e).join('0').slice((e || 2) * - 1) + this
};
customElements.define('lite-youtube', m); /*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-webp-setclasses !*/
(function (e, t, n) {
  function s(r, a) {
    return typeof r === a
  }
  function o() {
    var r,
    a,
    h,
    c,
    f,
    g,
    u;
    for (var A in y) if (y.hasOwnProperty(A)) {
      if (r = [
      ], a = y[A], a.name && (r.push(a.name.toLowerCase()), a.options && a.options.aliases && a.options.aliases.length)) for (h = 0; h < a.options.aliases.length; h++) r.push(a.options.aliases[h].toLowerCase());
      for (c = s(a.fn, 'function') ? a.fn() : a.fn, f = 0; f < r.length; f++) g = r[f],
      u = g.split('.'),
      u.length === 1 ? l[u[0]] = c : (!l[u[0]] || l[u[0]] instanceof Boolean || (l[u[0]] = new Boolean(l[u[0]])), l[u[0]][u[1]] = c),
      S.push((c ? '' : 'no-') + u.join('-'))
    }
  }
  function i(r) {
    var a = b.className,
    h = l._config.classPrefix || '';
    if (B && (a = a.baseVal), l._config.enableJSClass) {
      var c = new RegExp('(^|\\s)' + h + 'no-js(\\s|$)');
      a = a.replace(c, '$1' + h + 'js$2')
    }
    l._config.enableClasses && (a += ' ' + h + r.join(' ' + h), B ? b.className.baseVal = a : b.className = a)
  }
  function d(r, a) {
    if (typeof r == 'object') for (var h in r) I(r, h) && d(h, r[h]);
     else {
      r = r.toLowerCase();
      var c = r.split('.'),
      f = l[c[0]];
      if (c.length == 2 && (f = f[c[1]]), typeof f != 'undefined') return l;
      a = typeof a == 'function' ? a() : a,
      c.length == 1 ? l[c[0]] = a : (!l[c[0]] || l[c[0]] instanceof Boolean || (l[c[0]] = new Boolean(l[c[0]])), l[c[0]][c[1]] = a),
      i([(a && a != 0 ? '' : 'no-') + c.join('-')]),
      l._trigger(r, a)
    }
    return l
  }
  var S = [
  ],
  y = [
  ],
  v = {
    _version: '3.6.0',
    _config: {
      classPrefix: '',
      enableClasses: !0,
      enableJSClass: !0,
      usePrefixes: !0
    },
    _q: [
    ],
    on: function (r, a) {
      var h = this;
      setTimeout(function () {
        a(h[r])
      }, 0)
    },
    addTest: function (r, a, h) {
      y.push({
        name: r,
        fn: a,
        options: h
      })
    },
    addAsyncTest: function (r) {
      y.push({
        name: null,
        fn: r
      })
    }
  },
  l = function () {
  };
  l.prototype = v,
  l = new l;
  var I,
  b = t.documentElement,
  B = b.nodeName.toLowerCase() === 'svg';
  (function () {
    var r = {
    }.hasOwnProperty;
    I = s(r, 'undefined') || s(r.call, 'undefined') ? function (a, h) {
      return h in a && s(a.constructor.prototype[h], 'undefined')
    }
     : function (a, h) {
      return r.call(a, h)
    }
  }) (),
  v._l = {
  },
  v.on = function (r, a) {
    this._l[r] || (this._l[r] = [
    ]),
    this._l[r].push(a),
    l.hasOwnProperty(r) && setTimeout(function () {
      l._trigger(r, l[r])
    }, 0)
  },
  v._trigger = function (r, a) {
    if (this._l[r]) {
      var h = this._l[r];
      setTimeout(function () {
        var c;
        for (c = 0; c < h.length; c++) h[c](a)
      }, 0),
      delete this._l[r]
    }
  },
  l._q.push(function () {
    v.addTest = d
  }),
  l.addAsyncTest(function () {
    function r(c, f, g) {
      function u(M) {
        var T = M && M.type === 'load' ? A.width == 1 : !1,
        U = c === 'webp';
        d(c, U && T ? new Boolean(T) : T),
        g && g(M)
      }
      var A = new Image;
      A.onerror = u,
      A.onload = u,
      A.src = f
    }
    var a = [
      {
        uri: 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=',
        name: 'webp'
      },
      {
        uri: 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==',
        name: 'webp.alpha'
      },
      {
        uri: 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
        name: 'webp.animation'
      },
      {
        uri: 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=',
        name: 'webp.lossless'
      }
    ],
    h = a.shift();
    r(h.name, h.uri, function (c) {
      if (c && c.type === 'load') for (var f = 0; f < a.length; f++) r(a[f].name, a[f].uri)
    })
  }),
  o(),
  i(S),
  delete v.addTest,
  delete v.addAsyncTest;
  for (var k = 0; k < l._q.length; k++) l._q[k]();
  e.Modernizr = l
}) (window, document);
p.store('searching', {
    search_type: '1',

	setServers() {
        this.search_type = '1';
    },

	setSkins() {
        this.search_type = '2';
    }
})
window.Alpine = p;
p.start();
