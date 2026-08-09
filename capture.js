/* Oyogo — email capture for The Oyogo Edit.
 *
 * Replaces the four near-identical inline scripts that used to live on the
 * edit pages. Each page just needs <form class="subform" data-source="…">.
 *
 * The order of operations is the whole design:
 *
 *   1. Save the email first-party, immediately. This is the only thing that
 *      genuinely matters, so nothing is allowed to delay or block it.
 *   2. Ask one question while the visitor is still on the page.
 *   3. Hand off to Substack, which is what actually delivers the newsletter.
 *
 * Everything after step 1 is best-effort. Any error, at any point, falls
 * through to the Substack redirect — a captured email and a subscription beat
 * a complete profile every time.
 */
(function () {
  var SUPABASE_URL = 'https://wbgcwzesgvdentltnoec.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_q-NawIouOeMJEnYdRobo6w_8fN4VnJm';
  var SUBSTACK     = 'https://theoyogoedit.substack.com/subscribe';

  /* Nobody reaches Substack if they answer nothing and sit there, and the
     Substack subscription is the actual product. Continue for them. */
  var AUTO_CONTINUE_MS = 15000;

  /* The question set. Deliberately asked AFTER the email is banked, so it can
     never cost a capture.

     Only the first question is asked today: at ~24 leads, volume is the binding
     constraint, and every extra question trades conversion for detail you can't
     yet use. Adding questions two and three later is an edit to this array —
     the rendering below already walks it. */
  var QUESTIONS = [
    {
      id: 'why_here',
      prompt: 'One quick thing — what brings you to Oyogo?',
      note: 'It shapes what we send you. Skip if you’d rather not.',
      options: [
        { v: 'stay',     label: 'Somewhere to stay',      hint: 'Hotels, retreats, residencies' },
        { v: 'live',     label: 'Somewhere to live',      hint: 'Wellness real estate' },
        { v: 'industry', label: 'I work in the industry', hint: 'Hotel, developer, brand' },
        { v: 'reading',  label: 'Just here to read',      hint: 'The Edit, nothing more' }
      ]
    }
  ];
  var ASK = QUESTIONS.slice(0, 1);

  // -------------------------------------------------------------------------
  // Identity + attribution
  // -------------------------------------------------------------------------

  /* A first-party id for this browser, minted on first visit. It is what lets
     anonymous browsing be attached to an email address later, and lets the
     platform seed a profile from the lead at sign-in. Not a tracking cookie:
     first-party, no third party ever sees it. */
  function anonId() {
    try {
      var k = 'oyogo-anon', v = localStorage.getItem(k);
      if (!v) {
        v = (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
          : 'a' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
        localStorage.setItem(k, v);
      }
      return v;
    } catch (e) { return null; }   // private browsing / storage blocked
  }

  /* First-touch attribution. Stored on arrival so a visitor who lands on an
     article from Instagram, reads, then subscribes three pages later still
     credits Instagram rather than an internal referral. First touch wins —
     it does not get overwritten by later visits. */
  function attribution() {
    var k = 'oyogo-attr';
    try {
      var saved = localStorage.getItem(k);
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    var q = {};
    try {
      new URLSearchParams(location.search).forEach(function (val, key) { q[key] = val; });
    } catch (e) {}

    var attr = {
      utm_source:   q.utm_source   || null,
      utm_medium:   q.utm_medium   || null,
      utm_campaign: q.utm_campaign || null
    };

    /* No UTMs but an off-site referrer — infer what we can, so untagged links
       are not simply lost. Tagged links are always better; this is a floor. */
    if (!attr.utm_source && document.referrer) {
      try {
        var host = new URL(document.referrer).hostname.replace(/^www\./, '');
        if (host && host !== location.hostname) {
          attr.utm_source = host;
          attr.utm_medium = 'referral';
        }
      } catch (e) {}
    }

    try { if (attr.utm_source) localStorage.setItem(k, JSON.stringify(attr)); } catch (e) {}
    return attr;
  }

  function track(name, params) {
    try { if (window.oyogoTrack) window.oyogoTrack(name, params); } catch (e) {}
  }

  function post(path, body) {
    return fetch(SUPABASE_URL + '/rest/v1/' + path, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(body),
      keepalive: true
    });
  }

  // -------------------------------------------------------------------------
  // Wire up every subscribe form on the page
  // -------------------------------------------------------------------------
  var forms = document.querySelectorAll('.subform');
  if (!forms.length) return;

  Array.prototype.forEach.call(forms, function (form) {
    /* Which page captured this. Falls back to the URL so a new article page
       that forgets the attribute still records something useful. */
    var source = form.getAttribute('data-source') ||
      ('edit' + location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '')
                                 .replace(/^\/edit/, '').replace(/\//g, '-'));

    form.addEventListener('submit', function (e) {
      var input = form.querySelector('input[name="email"]');
      var email = ((input && input.value) || '').trim();
      if (!email || email.indexOf('@') < 0) return;  // let native validation handle it

      e.preventDefault();

      var id   = anonId();
      var attr = attribution();
      var done = false;

      function go() {
        if (done) return;
        done = true;
        track('substack_redirect', { source: source });
        window.location.href = SUBSTACK + '?email=' + encodeURIComponent(email);
      }

      // 1. Bank the email. Nothing waits on this.
      try {
        post('leads', {
          email: email,
          consent: true,            // wording is stated under the form
          source: source,
          kind: null,               // genuinely unknown here — the question fills it
          anon_id: id,
          utm_source: attr.utm_source,
          utm_medium: attr.utm_medium,
          utm_campaign: attr.utm_campaign
        }).catch(function () {});
      } catch (err) {}

      track('lead_submit', {
        source: source,
        utm_medium: attr.utm_medium || '(none)',
        utm_campaign: attr.utm_campaign || '(none)'
      });

      // 2. Ask. If anything is missing, skip straight to Substack.
      if (!ASK.length || !id) { go(); return; }
      askQuestions(form, ASK, id, source, go);
    });
  });

  // -------------------------------------------------------------------------
  // The question card
  // -------------------------------------------------------------------------
  function askQuestions(form, questions, id, source, done) {
    var host = document.createElement('div');
    host.className = 'qcard';
    host.setAttribute('role', 'group');
    form.parentNode.insertBefore(host, form.nextSibling);
    form.hidden = true;

    var timer = null;
    var i = 0;

    function finish() {
      if (timer) clearTimeout(timer);
      done();
    }

    function render() {
      var q = questions[i];
      if (!q) { finish(); return; }

      host.innerHTML =
        '<p class="qcard-eyebrow">✓ You’re on the list</p>' +
        '<p class="qcard-q">' + q.prompt + '</p>' +
        '<div class="qcard-opts">' +
          q.options.map(function (o) {
            return '<button type="button" class="qcard-opt" data-v="' + o.v + '">' +
                     '<span class="qcard-lab">' + o.label + '</span>' +
                     (o.hint ? '<span class="qcard-hint">' + o.hint + '</span>' : '') +
                   '</button>';
          }).join('') +
        '</div>' +
        (q.note ? '<p class="qcard-note">' + q.note + '</p>' : '') +
        '<button type="button" class="qcard-skip">Skip →</button>';

      host.querySelectorAll('.qcard-opt').forEach(function (b) {
        b.addEventListener('click', function () {
          var v = b.getAttribute('data-v');
          try {
            post('lead_answers', {
              anon_id: id, question: q.id, answer: v, source: source
            }).catch(function () {});
          } catch (e) {}
          track('lead_question_answered', { question: q.id, answer: v, source: source });
          i++;
          if (i < questions.length) render(); else finish();
        });
      });

      host.querySelector('.qcard-skip').addEventListener('click', function () {
        track('lead_question_skipped', { question: q.id, source: source });
        finish();
      });

      /* Safety net: an unanswered question must never cost the Substack
         subscription, which is the thing the visitor actually asked for. */
      if (timer) clearTimeout(timer);
      timer = setTimeout(finish, AUTO_CONTINUE_MS);
    }

    render();
    try { host.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) {}
  }
})();
