// Cookie consent — Plausible runs cookieless (always on, in <head>); GA4 loads only on Accept.
  (function(){
    var GA_ID='G-XXXXXXXXXX'; // ← replace with your GA4 Measurement ID
    function loadGA(){
      if(window.__ga)return;window.__ga=1;
      var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;document.head.appendChild(s);
      window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config',GA_ID);
    }
    var bar=document.getElementById('cc'),choice=null;
    try{choice=localStorage.getItem('oyogo-cc');}catch(e){}
    if(choice==='accept'){loadGA();}
    else if(choice!=='reject'&&bar){bar.hidden=false;}
    function set(v){try{localStorage.setItem('oyogo-cc',v);}catch(e){}if(bar)bar.hidden=true;if(v==='accept')loadGA();}
    var a=document.getElementById('cc-accept'),r=document.getElementById('cc-reject');
    if(a)a.addEventListener('click',function(){set('accept');});
    if(r)r.addEventListener('click',function(){set('reject');});
  })();

(function(){
    var h=document.getElementById('site');
    function onScroll(){h.classList.toggle('scrolled',window.scrollY>80);}
    onScroll();window.addEventListener('scroll',onScroll,{passive:true});

    // Instagram feed — real content. For each post fill in real likes/saves/comments
    // and url (link to the actual IG post). Use vid:'clipN.mp4' for videos, img:'galN.jpg' for photos.
    var POSTS=[
      {vid:'clip1.mp4', cap:'A class I’ll never forget. 💙🇬🇷',           likes:'150', saves:'10', comments:'', url:'https://www.instagram.com/p/Da-fkFrov8h/'},
      {img:'pg3.jpg',   cap:'Wellness real estate is forecast to hit $1.8 trillion by 2030. 🌊', views:'263K', likes:'7,065', saves:'5,100', shares:'8,266', url:''},
      {img:'gal3.jpg',  cap:'Golden-hour mats, ready for practice.',      likes:'',    saves:'',   comments:'', url:''},
      {img:'gal6.jpg',  cap:'Boat pose on the jetty.',                    likes:'35',  saves:'10', comments:'', url:'https://www.instagram.com/p/DPn3rm4jKKs/?img_index=1'},
      {vid:'clip7.mp4', cap:'Reformer fun at Zelia. ☀️🌊',                likes:'',    saves:'',   comments:'', url:'https://www.instagram.com/p/DbQRgTdtvya/'},
      {img:'gal4.jpg',  cap:'Group flow by the sea.',                     likes:'',    saves:'',   comments:'', url:'https://www.instagram.com/p/DG7kRaCoGXg/'},
      {img:'gal7.jpg',  cap:'Good people, good energy.',                  likes:'',    saves:'',   comments:'', url:''},
      {img:'gal18.jpg', cap:'HIIT in the stone gym.',                     likes:'',    saves:'',   comments:'', url:''},
      {img:'pg13.jpg',  cap:'The hotel turning farm-to-table into a full wellness ecosystem.', likes:'', saves:'', comments:'', url:''},
      {vid:'clip4.mp4', cap:'Hey babe — you don’t need to carry it all at once. 🫶🏼', likes:'', saves:'', comments:'', url:''},
      {img:'gal10.jpg', cap:'Strength session, Oyogo crew.',             likes:'',    saves:'',   comments:'', url:''},
      {img:'gal11.jpg', cap:'Sound bath by the water.',                   likes:'',    saves:'',   comments:'', url:''},
      {img:'gal2.jpg',  cap:'Open-water swim squad.',                     likes:'',    saves:'',   comments:'', url:''},
      {img:'pg12.jpg',  cap:'The hotel brand shaping a new kind of social wellbeing.', likes:'', saves:'', comments:'', url:''},
      {img:'gal15.jpg', cap:'Gong bath smiles.',                          likes:'',    saves:'',   comments:'', url:''},
      {img:'gal16.jpg', cap:'Down dog over the dunes.',                   likes:'',    saves:'',   comments:'', url:''},
      {img:'gal17.jpg', cap:'Cold plunge, three tubs deep.',             likes:'',    saves:'',   comments:'', url:''},
      {img:'gal5.jpg',  cap:'Breathwork under the linen sails.',          likes:'',    saves:'',   comments:'', url:''},
      {img:'gal8.jpg',  cap:'Reformer play at ZEL Club.',                 likes:'',    saves:'',   comments:'', url:''}
    ];
    var IC={
      like:'<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
      save:'<svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
      comment:'<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.6 8.6 0 0 1-3.9-.9L3 21l1.9-5.6A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z"/></svg>',
      share:'<svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
      heartF:'<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 21.6l-1.5-1.4C5.4 15.6 2 12.5 2 8.7 2 5.6 4.4 3.2 7.5 3.2c1.7 0 3.4.8 4.5 2.1 1.1-1.3 2.8-2.1 4.5-2.1 3.1 0 5.5 2.4 5.5 5.5 0 3.8-3.4 6.9-8.5 11.5L12 21.6z"/></svg>',
      cmtF:'<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 3C6.9 3 3 6.4 3 10.6c0 2.3 1.2 4.4 3.1 5.8L5 21l4.9-2.3c.7.1 1.4.2 2.1.2 5.1 0 9-3.4 9-7.6S17.1 3 12 3z"/></svg>',
      viewF:'<svg viewBox="0 0 24 24" fill="#fff"><path fill-rule="evenodd" d="M12 5C6 5 2 12 2 12s4 7 10 7 10-7 10-7-4-7-10-7zm0 10.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/></svg>',
      saveF:'<svg viewBox="0 0 24 24" fill="#fff"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.6L5 21V4a1 1 0 0 1 1-1z"/></svg>',
      shareF:'<svg viewBox="0 0 24 24" fill="#fff"><path d="M22 2 2 9.6l6.9 2.6L11.5 22l3-6.7L22 2z"/></svg>'
    };
    var track=document.getElementById('feed-track');
    if(track){
      track.innerHTML=POSTS.map(function(p){
        var el=p.vid?('<video src="'+p.vid+'" muted loop playsinline preload="none"></video>')
                    :('<img src="'+p.img+'" alt="">');
        var METR=[['views',IC.viewF],['likes',IC.heartF],['comments',IC.cmtF],['saves',IC.saveF],['shares',IC.shareF]];
        var parts='';
        METR.forEach(function(m){ if(p[m[0]]) parts+='<span class="st">'+m[1]+p[m[0]]+'</span>'; });
        var ov=parts?('<div class="igstats" aria-hidden="true">'+parts+'</div>'):'';
        var media='<div class="media">'+el+'<div class="grad"></div><div class="top"><span class="av">O</span><span class="hn">@oyogo.london</span></div>'+ov+'</div>';
        var inner=media;
        if(p.url){inner='<a href="'+p.url+'" target="_blank" rel="noopener" style="color:inherit;text-decoration:none">'+inner+'</a>';}
        return '<div class="post">'+inner+'</div>';
      }).join('');
    }
    document.querySelectorAll('.feed-arrows button').forEach(function(b){
      b.addEventListener('click',function(){
        if(track)track.scrollBy({left:(parseInt(b.dataset.dir,10)||1)*332,behavior:'smooth'});
      });
    });
  })();

  // Schedule — Oyogo trainer residencies & daily studio classes, by resort.
  // Each resort has fixed daily studio slots + trainer residencies (date ranges).
  // Dates are ISO 'YYYY-MM-DD'; the departure day is exclusive (handover day = next trainer).
  // Add more resorts to SCHEDULE as their rotas come in.
  (function(){
    var SCHEDULE=[
      {
        hotel:'Zelia', loc:'Halkidiki, GR', web:'https://www.zeliaresort.gr/',
        slots:[
          {time:'08:15', label:'Olive Grove Studio'},
          {time:'09:15', label:'Olive Grove Studio'},
          {time:'18:15', label:'Olive Grove Studio', main:true}
        ],
        residencies:[
          {s:'2026-05-07', e:'2026-05-15', t:'Lucy Sesto',        d:'Yoga & meditation',                type:'Yoga'},
          {s:'2026-05-15', e:'2026-05-24', t:'Erica B',           d:'Yoga & meditation',                type:'Yoga'},
          {s:'2026-05-24', e:'2026-06-08', t:'Matea Hrustic',     d:'Pilates & yoga',                   type:'Pilates'},
          {s:'2026-06-08', e:'2026-06-21', t:'Maya Fields',       d:'Yoga',                             type:'Yoga'},
          {s:'2026-06-21', e:'2026-07-05', t:'Mariana Moura',     d:'Yoga, meditation & breathwork',    type:'Yoga'},
          {s:'2026-07-05', e:'2026-07-19', t:'Kasia Mizerska',    d:'Pilates (mat & reformer) & barre', type:'Pilates'},
          {s:'2026-07-19', e:'2026-08-02', t:'Ksenija Selivanova',d:'Pilates',                          type:'Pilates'},
          {s:'2026-08-02', e:'2026-08-16', t:'Erin Dusek',        d:'Yoga, meditation & breathwork',    type:'Yoga'},
          {s:'2026-08-16', e:'2026-08-30', t:'Tiffany',           d:'Yoga, breathwork & Pilates',       type:'Yoga'},
          {s:'2026-08-30', e:'2026-09-13', t:'Milou M Balo',      d:'Pilates & breathwork',             type:'Yoga'},
          {s:'2026-09-13', e:'2026-09-27', t:'Céline Leach',      d:'Pilates',                          type:'Pilates'},
          {s:'2026-09-27', e:'2026-10-11', t:'Thea King',         d:'Barre & Pilates',                  type:'Barre'},
          {s:'2026-10-11', e:'2026-10-19', t:'Alice Padron',      d:'Barre, Pilates & yoga',            type:'Barre'}
        ]
      },
      {
        hotel:'Nido', loc:'Corfu, GR', web:'https://www.marbella.gr/hotels/marbella-nido/',
        slots:[
          {time:'08:45', label:'Yoga Deck'},
          {time:'17:00', label:'Yoga Deck'},
          {time:'18:15', label:'Yoga Deck', main:true}
        ],
        residencies:[
          {s:'2026-05-18', e:'2026-05-31', t:'Georgia Chapman Costa', d:'Gym & Pilates',                             type:'Pilates'},
          {s:'2026-06-07', e:'2026-06-21', t:'Marta De Carli',        d:'Yoga & Pilates',                            type:'Yoga'},
          {s:'2026-07-06', e:'2026-07-19', t:'Gigi Delsante',         d:'Yoga & mindfulness',                        type:'Yoga'},
          {s:'2026-08-03', e:'2026-08-16', t:'Maria Pacha',           d:'Yoga & mindfulness',                        type:'Yoga'},
          {s:'2026-09-07', e:'2026-09-20', t:'Bella Wilson',          d:'Gym & Pilates',                             type:'Pilates'},
          {s:'2026-09-21', e:'2026-10-06', t:'Sophie Allin',          d:'Vinyasa yoga, mobility & functional strength', type:'Fitness'}
        ]
      },
      {
        hotel:'Elix', loc:'Corfu, GR', web:'https://www.marbella.gr/hotels/marbella-elix/',
        slots:[
          {time:'08:45', label:'Amphitheatre Deck'},
          {time:'17:00', label:'Amphitheatre Deck'},
          {time:'18:15', label:'Amphitheatre Deck', main:true}
        ],
        residencies:[
          {s:'2026-05-18', e:'2026-05-31', t:'Amelia Coutisson',    d:'Yoga & sound',       type:'Yoga'},
          {s:'2026-06-08', e:'2026-06-21', t:'Myrthe van Gameren',  d:'Yoga, meditation & breathwork', type:'Yoga'},
          {s:'2026-07-06', e:'2026-07-19', t:'Matteo Massaini',     d:'Fitness & breathwork', type:'Fitness'},
          {s:'2026-09-21', e:'2026-10-04', t:'Vanessa Michielon',   d:'Pilates & somatic movement', type:'Pilates'}
        ]
      },
      {
        hotel:'Avali', loc:'Corfu, GR', web:'https://www.marbella.gr/hotels/avali-hotel/',
        slots:[
          {time:'08:00', label:'Grass Area'},
          {time:'17:45', label:'Grass Area', main:true}
        ],
        residencies:[
          {s:'2026-05-18', e:'2026-05-31', t:'Lucia Zanone',       d:'Yoga',                    type:'Yoga'},
          {s:'2026-06-08', e:'2026-06-21', t:'Annabelle Williams', d:'Fitness & movement',      type:'Fitness'},
          {s:'2026-07-06', e:'2026-07-19', t:'Cian Hughes',        d:'Pilates & fusion',        type:'Pilates'},
          {s:'2026-08-03', e:'2026-08-16', t:'Kitti Gombos',       d:'Pilates & fusion',        type:'Pilates'},
          {s:'2026-09-21', e:'2026-10-04', t:'Joelle Brabben',     d:'Fitness & movement',      type:'Fitness'}
        ]
      }
    ];
    function iso(d){var m=d.getMonth()+1,day=d.getDate();return d.getFullYear()+'-'+(m<10?'0':'')+m+'-'+(day<10?'0':'')+day;}
    var MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
    var MONS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var WDL=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    var WDF=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    var gridEl=document.getElementById('cal-grid'); if(!gridEl) return;
    var monthview=document.getElementById('cal-monthview'), daysEl=document.getElementById('cal-days');
    var titleEl=document.getElementById('cal-title'), mtitleEl=document.getElementById('cal-mtitle'), dayheadEl=document.getElementById('cal-dayhead'), listEl=document.getElementById('cal-list');
    var locEl=document.getElementById('cal-loc'), typeEl=document.getElementById('cal-type'), instEl=document.getElementById('cal-inst');

    function addDays(d,n){var x=new Date(d);x.setDate(x.getDate()+n);return x;}
    function key(d){return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();}
    function mondayOf(d){var j=(d.getDay()+6)%7;return addDays(d,-j);}
    function addDayISO(s){s=(s||'').trim();if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return '';var p=s.split('-');var d=new Date(+p[0],+p[1]-1,+p[2]);d.setDate(d.getDate()+1);return iso(d);}
    function igURL(ig){ig=(ig||'').trim();if(!ig)return '';if(/^https?:/i.test(ig))return ig;return 'https://www.instagram.com/'+ig.replace(/^@/,'');}

    // ---- Data model: flat rows. Times filled = timetable; Times blank = roster (e.g. Peligoni). ----
    // Fallback: the hard-coded SCHEDULE above. Live: a published Google Sheet CSV (set CSV_URL).
    var CSV_URL=''; // ← paste the published Google Sheet CSV link here (ends with output=csv)
    function flatten(sched){
      var rows=[];
      sched.forEach(function(r){
        var venue=(r.slots[0]&&r.slots[0].label)||'';
        var times=r.slots.map(function(s){return s.time;});
        r.residencies.forEach(function(x){
          rows.push({resort:r.hotel,venue:venue,trainer:x.t,ig:'',disc:x.d,type:x.type||'',times:times.slice(),special:'',web:r.web||'',loc:r.loc||'',start:x.s,endEx:x.e});
        });
      });
      return rows;
    }
    function splitCSVLine(line){var out=[],cur='',q=false;for(var i=0;i<line.length;i++){var c=line[i];if(c==='"'){if(q&&line[i+1]==='"'){cur+='"';i++;}else q=!q;}else if(c===','&&!q){out.push(cur);cur='';}else cur+=c;}out.push(cur);return out;}
    function fromCSV(text){
      var lines=text.replace(/\r/g,'').split('\n').filter(function(l){return l.trim();});
      if(lines.length<2)return [];
      var H=splitCSVLine(lines[0]).map(function(h){return h.trim().toLowerCase();});
      function ix(n){return H.indexOf(n);}
      var iR=ix('resort'),iV=ix('venue'),iT=ix('trainer'),iI=ix('ig'),iS=ix('start'),iE=ix('end'),iD=ix('discipline'),iTy=ix('type'),iTi=ix('times'),iSp=ix('special'),iW=ix('web'),iL=ix('location');
      var rows=[];
      for(var i=1;i<lines.length;i++){
        var c=splitCSVLine(lines[i]);
        function g(k){return k>=0?(c[k]||'').trim():'';}
        var resort=g(iR),start=g(iS),endEx=addDayISO(g(iE));
        if(!resort||!/^\d{4}-\d{2}-\d{2}$/.test(start)||!endEx)continue;
        rows.push({resort:resort,venue:g(iV),trainer:g(iT),ig:g(iI),disc:g(iD),type:g(iTy),times:g(iTi).split(/[;,\s]+/).map(function(s){return s.trim();}).filter(Boolean),special:g(iSp),web:g(iW),loc:g(iL),start:start,endEx:endEx});
      }
      return rows;
    }

    // Peligoni — rotating roster of guest trainers per week + special weeks (hand-entered from the club rota).
    var PEL_WEB='https://www.peligoni.com', PEL_LOC='Zakynthos, GR';
    // Each trainer entry: [name, ig, stream]  (stream 'Gym' | 'Studio' | '' for team/Pace weeks)
    var PEL_WEEKS=[
      {s:'2026-05-16',e:'2026-05-23',sp:'Pace 1',t:[['Uche Obi','',''],['Nickoll Flood','@nickolfloodx',''],['Omar Monsour','@MrOmg',''],['Victoria Leigh','',''],['Christie Knight','@christieknightyoga',''],['Gen Greensted','@the_barrecoach','']]},
      {s:'2026-05-23',e:'2026-06-07',sp:'',t:[['Christina Demetriou','@christina_deme','Gym'],['Annie Archer','','Studio']]},
      {s:'2026-06-06',e:'2026-06-21',sp:'',t:[['Carrie Baxter','@carriedaway','Gym'],['Alice Padron','','Studio']]},
      {s:'2026-06-20',e:'2026-07-04',sp:'',t:[['Greta Evelyn','@gretaevelyn','Gym'],['Immy McAndrews','@immy.mcandrew','Studio']]},
      {s:'2026-07-04',e:'2026-07-18',sp:'',t:[['Riley Forbes','','Gym'],['Hannah Buckley','@biog_by_hannah','Studio']]},
      {s:'2026-07-18',e:'2026-08-01',sp:'',t:[['Anna Bye','@annabye','Gym'],['Dominika Zechmeiszter','@aftermoonyoga','Studio']]},
      {s:'2026-08-01',e:'2026-08-14',sp:'',t:[['Kara Wagland','@karawagland','Gym']]},
      {s:'2026-08-01',e:'2026-08-15',sp:'',t:[['Ilenia Fedele','@ileyoga','Studio']]},
      {s:'2026-08-14',e:'2026-08-29',sp:'',t:[['Ruby Padwick','','Gym']]},
      {s:'2026-08-15',e:'2026-08-29',sp:'',t:[['Tina Ivanova','@yogaclub.tina','Studio']]},
      {s:'2026-08-29',e:'2026-09-12',sp:'',t:[['Eva Simanavicius','@evasimanavicius','Gym'],['Annie Archer','','Studio']]},
      {s:'2026-09-12',e:'2026-09-20',sp:'',t:[['Abigail Skipper','','Gym'],['Rose Wild','@roseinthewildwellness','Studio']]},
      {s:'2026-09-21',e:'2026-09-26',sp:'Gather',t:[['Abigail Skipper','','Gym'],['Rose Wild','@roseinthewildwellness','Studio']]},
      {s:'2026-09-26',e:'2026-10-03',sp:'',t:[['Uche Obi','','Gym'],['Myrthe van Gameren','','Studio']]},
      {s:'2026-10-03',e:'2026-10-10',sp:'Pace 2',t:[['Zoe Lou','',''],['Alex Castro','',''],['Naomi Heffernan','',''],['Victoria Leigh','',''],['Oliver James','',''],['Stephannie Warwick','','']]},
      {s:'2026-10-10',e:'2026-10-17',sp:'Pace 3',t:[['Michelle Varchiona','@shalateacher',''],['Stephannie Warwick','@stephaniewarwick_',''],['Jordan M','@jordanmaeantoinette',''],['Carl Van Heerdan','',''],['Chris Millard','@chrismillardfit',''],['Leroy Williamson','@leroyelevates',''],["Laura 'Biceps'",'@laurabiceps','']]},
      {s:'2026-10-17',e:'2026-11-01',sp:'',t:[['Jamilla Wittrup','@jamilla.wittrup','Gym'],['Laurie Bescond','@nymeriayoga','Studio']]}
    ];
    // Weekly class template per stream/venue. Weekday 1=Mon … 6=Sat (Sun off). [time, class]
    var PEL_TT={
      Gym:{
        1:[['08:15','Cardio Conditioning'],['09:45','Hybrid Circuit Training']],
        2:[['08:15','Tempo Sculpt'],['09:45','Cardio Conditioning']],
        3:[['08:15','Hybrid Circuit Training'],['09:45','Slow Strength']],
        4:[['08:15','Slow Strength'],['09:45','Cardio Conditioning']],
        5:[['08:15','Abs & Glutes'],['09:45','Hybrid Circuit Training']],
        6:[['08:15','Slow Strength · Upper Body'],['09:45','Cardio Conditioning']]
      },
      Studio:{
        1:[['08:45','Vinyasa Flow Yoga'],['09:45','Slow Flow Yoga'],['16:00','Restore & Unwind']],
        2:[['08:45','Slow Flow Yoga'],['09:45','Dynamic Yoga'],['16:00','Sculpt Pilates']],
        3:[['08:45','Specialist class'],['09:45','Slow Flow · Standing Balances'],['16:00','Restore & Unwind · Hip Openers']],
        4:[['08:45','Vinyasa Flow Yoga'],['09:45','Dynamic Vinyasa'],['16:00','Slow Flow']],
        5:[['08:45','Specialist class'],['09:45','Slow Flow Yoga · Back Bends'],['16:00','Restore & Unwind']],
        6:[['08:45','Vinyasa Flow Yoga'],['09:45','Specialist class'],['16:00','Slow Flow Yoga']]
      }
    };
    function eachDate(sISO,eISO,cb){var p=sISO.split('-'),d=new Date(+p[0],+p[1]-1,+p[2]),q=eISO.split('-'),de=new Date(+q[0],+q[1]-1,+q[2]);while(d<=de){cb(new Date(d));d.setDate(d.getDate()+1);}}
    var PELIGONI=[], pelSeen={};
    PEL_WEEKS.forEach(function(w){
      if(w.sp){ // special weeks (Pace/Gather): guest-trainer roster + badge, no per-class timetable
        w.t.forEach(function(p){PELIGONI.push({resort:'Peligoni',venue:p[2]||'',trainer:p[0],ig:p[1],disc:'',type:'',times:[],special:w.sp,web:PEL_WEB,loc:PEL_LOC,start:w.s,endEx:addDayISO(w.e)});});
        return;
      }
      w.t.forEach(function(p){ // regular weeks: generate per-day classes from the template, per stream
        var stream=p[2]; if(stream!=='Gym'&&stream!=='Studio')return;
        var tmpl=PEL_TT[stream];
        eachDate(w.s,w.e,function(d){
          var wd=d.getDay(); if(wd===0)return;
          (tmpl[wd]||[]).forEach(function(c){
            var day=iso(d), k=day+stream+c[0]; if(pelSeen[k])return; pelSeen[k]=1;
            PELIGONI.push({resort:'Peligoni',venue:stream,trainer:p[0],ig:p[1],disc:c[1],type:'',times:[c[0]],special:'',web:PEL_WEB,loc:PEL_LOC,start:day,endEx:addDayISO(day)});
          });
        });
      });
    });

    var ROWS=flatten(SCHEDULE).concat(PELIGONI);

    // ---- Class-type categories: keyword-mapped from each class name / discipline ----
    var CAT_ORDER=['Pilates','Barre','Yoga','Sound','Meditation','Breathwork','Fitness'];
    var CAT_KEYS=[
      ['Pilates',    /pilates|reformer/i],
      ['Barre',      /barre/i],
      ['Yoga',       /yoga|vinyasa|flow|restore|unwind|standing balances|back ?bends|hip openers/i],
      ['Sound',      /sound/i],
      ['Meditation', /medit|mindful/i],
      ['Breathwork', /breath/i],
      ['Fitness',    /fitness|gym|circuit|strength|cardio|conditioning|hiit|abs|glute|tempo|functional|mobility|movement|hybrid/i]
    ];
    function catsFor(text){text=text||'';var out=[];CAT_KEYS.forEach(function(k){if(k[1].test(text))out.push(k[0]);});return out;}
    ROWS.forEach(function(r){r.cats=catsFor((r.disc||'')+' '+(r.type||''));});

    // Resorts confirmed but not yet live (shown in the dropdown with a coming-soon state).
    var COMING={'Nesslerhof':{loc:'Großarl, Austria',web:'https://www.nesslerhof.at',note:'Oyogo residencies at Nesslerhof are coming in 2027.'}};

    var today=new Date();today.setHours(0,0,0,0);
    var view=new Date(today), selected=new Date(today), monthOpen=false;

    function fill(el,all,arr){el.innerHTML='<option value="">'+all+'</option>'+arr.map(function(v){return '<option value="'+v+'">'+v+'</option>';}).join('');}
    function uniq(arr){var seen={},out=[];arr.forEach(function(v){if(v&&!seen[v]){seen[v]=1;out.push(v);}});return out;}
    var RES_COLORS={'Zelia':'#5c6b4f','Nido':'#4a76a8','Elix':'#b4542e','Avali':'#c9a24b','Peligoni':'#3f7c74'};
    function dotsFor(items){
      var rs=[];items.forEach(function(r){if(rs.indexOf(r.resort)<0)rs.push(r.resort);});
      return rs.length?'<span class="cal-dots">'+rs.map(function(n){return '<span class="cd" style="background:'+(RES_COLORS[n]||'#5c6b4f')+'"></span>';}).join('')+'</span>':'';
    }
    function fillInst(){
      var ci=instEl.value;
      var src=locEl.value?ROWS.filter(function(r){return r.resort===locEl.value;}):ROWS;
      var list=uniq(src.map(function(r){return r.trainer;})).filter(Boolean).sort();
      fill(instEl,'All instructors',list);
      instEl.value=(ci&&list.indexOf(ci)>=0)?ci:'';
    }
    function populate(){
      var cl=locEl.value,ct=typeEl.value,ci=instEl.value;
      var resorts=uniq(ROWS.map(function(r){return r.resort;}));
      var pi=resorts.indexOf('Peligoni'); if(pi>0){resorts.splice(pi,1);resorts.unshift('Peligoni');}
      Object.keys(COMING).forEach(function(n){if(resorts.indexOf(n)<0)resorts.push(n);});
      locEl.innerHTML='<option value="">All resorts</option>'+resorts.map(function(v){return '<option value="'+v+'">'+(COMING[v]?v+' · 2027':v)+'</option>';}).join('');
      fill(typeEl,'All classes',CAT_ORDER.filter(function(c){return ROWS.some(function(r){return r.cats.indexOf(c)>=0;});}));
      locEl.value=(cl&&resorts.indexOf(cl)>=0)?cl:'';
      typeEl.value=ct;
      fillInst(); instEl.value=(ci&&[].some.call(instEl.options,function(o){return o.value===ci;}))?ci:'';
    }
    function pillsFor(items){
      var seen=[],labels=[];
      items.forEach(function(s){var l=s.disc||s.trainer||'';if(l&&seen.indexOf(l)<0){seen.push(l);labels.push(l);}});
      if(!labels.length)return '';
      var out=labels.slice(0,2).map(function(l){return '<span class="cpill">'+l+'</span>';}).join('');
      if(labels.length>2)out+='<span class="cmore">+'+(labels.length-2)+'</span>';
      return '<span class="cpills">'+out+'</span>';
    }
    populate();

    function activeRows(d){
      var day=iso(d);
      return ROWS.filter(function(r){return day>=r.start && day<r.endEx;})
        .filter(function(r){return !locEl.value || r.resort===locEl.value;})
        .filter(function(r){return !typeEl.value || (r.cats&&r.cats.indexOf(typeEl.value)>=0);})
        .filter(function(r){return !instEl.value || r.trainer===instEl.value;});
    }
    function specialOn(rows){var s='';rows.forEach(function(r){if(r.special)s=r.special;});return s;}
    var SPECIAL_DESC={'Pace 1':'Performance & fitness week','Pace 2':'Performance & fitness week','Pace 3':'Performance & fitness week','Gather':'Wellness & community week'};
    // Peligoni event pages (confirm exact URLs).
    var SPECIAL_URL={'Pace 1':'https://www.peligoni.com/pace','Pace 2':'https://www.peligoni.com/pace','Pace 3':'https://www.peligoni.com/pace','Gather':'https://www.peligoni.com/gather'};
    function specialLabel(s){return /^Pace/.test(s)?s.replace('Pace','Pace Week'):(s==='Gather'?'Gather Week':s);}

    // Day-strip: the current week of `selected`, always visible.
    // Label for the currently-active filter (type > instructor > resort).
    function filterLabel(){
      if(typeEl.value)return typeEl.value+' ';
      if(instEl.value)return instEl.value+' ';
      if(locEl.value)return locEl.value+' ';
      return '';
    }
    // Next day (scanning forward) that has sessions matching the active filters.
    function nextSessionDate(from){
      var d=new Date(from);
      for(var i=0;i<400;i++){d.setDate(d.getDate()+1);if(activeRows(d).length)return new Date(d);}
      return null;
    }
    // Next matching window: the contiguous run of matching days starting at the next match.
    function nextSessionRange(from){
      var s=nextSessionDate(from); if(!s)return null;
      var e=new Date(s);
      for(var i=0;i<400;i++){var n=new Date(e);n.setDate(n.getDate()+1);if(!activeRows(n).length)break;e=n;}
      return {s:s,e:e};
    }
    function fmtWindow(a,b){
      if(key(a)===key(b))return WDL[(a.getDay()+6)%7]+' '+MONS[a.getMonth()]+' '+a.getDate();
      var end=(a.getMonth()===b.getMonth())?b.getDate():MONS[b.getMonth()]+' '+b.getDate();
      return MONS[a.getMonth()]+' '+a.getDate()+' – '+end;
    }
    // Ordered resort list (Peligoni first).
    function resortOrder(){
      var rs=uniq(ROWS.map(function(r){return r.resort;}));
      var pi=rs.indexOf('Peligoni'); if(pi>0){rs.splice(pi,1);rs.unshift('Peligoni');}
      return rs;
    }
    // Matches for one resort on a day, respecting the type/instructor filters (ignores resort dropdown).
    function matchesFor(d,resort){
      var day=iso(d);
      return ROWS.filter(function(r){return day>=r.start&&day<r.endEx;})
        .filter(function(r){return r.resort===resort;})
        .filter(function(r){return !typeEl.value||(r.cats&&r.cats.indexOf(typeEl.value)>=0);})
        .filter(function(r){return !instEl.value||r.trainer===instEl.value;});
    }
    function nextResortRange(resort,from){
      var d=new Date(from),s=null;
      for(var i=0;i<400;i++){d.setDate(d.getDate()+1);if(matchesFor(d,resort).length){s=new Date(d);break;}}
      if(!s)return null;
      var e=new Date(s);
      for(var j=0;j<400;j++){var n=new Date(e);n.setDate(n.getDate()+1);if(!matchesFor(n,resort).length)break;e=n;}
      return {s:s,e:e};
    }
    function renderStrip(){
      titleEl.textContent=MON[selected.getMonth()]+' '+selected.getFullYear();
      var start=mondayOf(selected), html='';
      for(var i=0;i<7;i++){
        var d=addDays(start,i), isToday=key(d)===key(today), isSel=key(d)===key(selected), items=activeRows(d), sp=items.length?specialOn(items):'';
        var lab=isToday?'Today':WDL[i];
        html+='<button type="button" class="cal-day'+(isSel?' on':'')+(sp?' special':'')+'" data-t="'+d.getTime()+'"><span class="cal-wd">'+lab+'</span><span class="cal-circle">'+d.getDate()+'</span>'+dotsFor(items)+'</button>';
      }
      daysEl.innerHTML=html;
    }
    // Full-calendar popover: month grid used only to jump to a date.
    function renderMonth(){
      mtitleEl.textContent=MON[view.getMonth()]+' '+view.getFullYear();
      var first=new Date(view.getFullYear(),view.getMonth(),1), start=mondayOf(first), html='';
      for(var i=0;i<42;i++){
        var d=addDays(start,i), other=d.getMonth()!==view.getMonth();
        var items=other?[]:activeRows(d), sp=items.length?specialOn(items):'';
        var cls='cal-cell'+(other?' other':'')+(key(d)===key(today)?' today':'')+(key(d)===key(selected)?' sel':'')+(sp?' special':'');
        html+='<button type="button" class="'+cls+'"'+(other?' disabled':'')+' data-t="'+d.getTime()+'"><span class="cal-num">'+d.getDate()+'</span></button>';
      }
      gridEl.innerHTML=html;
    }
    function specialWeekName(s){return /^Pace/.test(s)?'Pace Week Festival':(s==='Gather'?'Gather':specialLabel(s));}
    // Render one resort's day: timed classes + any guest-trainer roster.
    function renderResortGroup(resort,rs){
      var special='',web='',loc='';
      rs.forEach(function(r){if(r.special&&!special)special=r.special;if(r.web&&r.web!=='#'&&!web)web=r.web;if(r.loc&&!loc)loc=r.loc;});
      var timed=[];rs.forEach(function(r){if(r.times.length)r.times.forEach(function(t){timed.push({time:t,venue:r.venue,trainer:r.trainer,disc:r.disc,ig:r.ig});});});
      timed.sort(function(a,b){return a.time.localeCompare(b.time);});
      var roster=rs.filter(function(r){return !r.times.length;});
      var cta='';
      if(special&&SPECIAL_URL[special])cta='<a class="cal-book" href="'+SPECIAL_URL[special]+'" target="_blank" rel="noopener">Explore '+specialWeekName(special)+' →</a>';
      else if(web)cta='<a class="cal-book" href="'+web+'" target="_blank" rel="noopener">Book your stay</a>';
      var h='<div class="ag-group"><div class="ag-ghead"><div class="ag-gtitle"><span class="ag-gname">'+resort+(loc?' · '+loc:'')+'</span>'+(special?'<span class="cal-badge">✦ '+specialLabel(special)+'</span>':'')+'</div>'+cta+'</div>'+(special&&SPECIAL_DESC[special]?'<div class="cal-grp-desc">'+SPECIAL_DESC[special]+'</div>':'');
      if(timed.length){
        h+='<div class="ag-rows">'+timed.map(function(s){
          var u=igURL(s.ig);
          var tname=u?('<a class="ag-trainer" href="'+u+'" target="_blank" rel="noopener">'+s.trainer+'</a>'):('<span class="ag-trainer">'+s.trainer+'</span>');
          var venue=(s.venue&&s.venue!=='Classes')?'<span class="ag-venue">'+s.venue+'</span>':'';
          return '<div class="ag-row"><div class="ag-time">'+s.time+'</div><div class="ag-main"><div class="ag-cls">'+(s.disc||'Class')+'</div><div class="ag-sub">'+tname+'</div></div><div class="ag-loc"><span class="ag-resort">'+resort+'</span>'+venue+'</div></div>';
        }).join('')+'</div>';
      }
      if(roster.length){
        var rname=special?('Guest trainers this week for '+specialWeekName(special)):'Guest trainers this week';
        h+='<div class="cal-roster"><div class="cal-roster-lab">'+rname+'</div><div class="cal-roster-list">'+roster.map(function(r){
          var inner=r.trainer+(r.disc?' <span>'+r.disc+'</span>':'');
          var u=igURL(r.ig);
          return u?('<a href="'+u+'" target="_blank" rel="noopener">'+inner+'</a>'):('<span class="rn">'+inner+'</span>');
        }).join('')+'</div></div>';
      }
      return h+'</div>';
    }
    // Agenda: full-width class rows for the selected day.
    function renderDay(){
      dayheadEl.textContent=WDF[selected.getDay()]+', '+MONS[selected.getMonth()]+' '+selected.getDate();
      if(COMING[locEl.value]){
        var c=COMING[locEl.value];
        listEl.innerHTML='<div class="ag-group"><div class="ag-ghead"><div class="ag-gtitle"><span class="ag-gname">'+locEl.value+(c.loc?' · '+c.loc:'')+'</span><span class="cal-badge">✦ From 2027</span></div>'+(c.web?'<a class="cal-book" href="'+c.web+'" target="_blank" rel="noopener">Book your stay</a>':'')+'</div><p class="cal-empty">'+c.note+' <a href="mailto:studio@oyogo.co.uk" style="color:var(--yellow);font-weight:600">Enquire about a residency</a>.</p></div>';
        return;
      }
      var lbl=filterLabel(), filterActive=!!(typeEl.value||instEl.value);
      var rows=activeRows(selected), order=[], groups={};
      rows.forEach(function(r){if(!groups[r.resort]){groups[r.resort]=[];order.push(r.resort);}groups[r.resort].push(r);});
      // With a class filter on + all-resorts, show every resort (absent ones get a "next residency" pill).
      var showList=(filterActive&&!locEl.value)?resortOrder():order;
      if(!showList.length){
        var rng=nextSessionRange(selected), pill='';
        if(rng){var multi=key(rng.s)!==key(rng.e);pill='<button type="button" class="cal-nextpill" data-t="'+rng.s.getTime()+'">Next '+lbl+(multi?'residency':'session')+' · '+fmtWindow(rng.s,rng.e)+' →</button>';}
        listEl.innerHTML='<p class="cal-empty">No Oyogo '+lbl+'sessions on this day — <a href="mailto:studio@oyogo.co.uk" style="color:var(--yellow);font-weight:600">enquire about a residency</a>.</p>'+pill;
        return;
      }
      var LOC={};ROWS.forEach(function(r){if(r.loc&&!LOC[r.resort])LOC[r.resort]=r.loc;});
      listEl.innerHTML=showList.map(function(resort){
        if(groups[resort])return renderResortGroup(resort,groups[resort]);
        var loc=LOC[resort]||'', rng=nextResortRange(resort,selected), body;
        if(rng){var multi=key(rng.s)!==key(rng.e);body='<button type="button" class="cal-nextpill" data-t="'+rng.s.getTime()+'">Next '+lbl+(multi?'residency':'session')+' · '+fmtWindow(rng.s,rng.e)+' →</button>';}
        else body='<p class="cal-empty">No upcoming '+lbl+'sessions — <a href="mailto:studio@oyogo.co.uk" style="color:var(--yellow);font-weight:600">enquire</a>.</p>';
        return '<div class="ag-group ag-group-empty"><div class="ag-ghead"><div class="ag-gtitle"><span class="ag-gname">'+resort+(loc?' · '+loc:'')+'</span></div></div>'+body+'</div>';
      }).join('');
    }
    function render(){ renderStrip(); if(monthOpen)renderMonth(); renderDay(); }

    function loadCSV(){
      if(!CSV_URL)return;
      fetch(CSV_URL).then(function(r){return r.ok?r.text():Promise.reject();}).then(function(txt){
        var parsed=fromCSV(txt);
        if(parsed.length){ROWS=parsed;populate();render();}
      }).catch(function(){});
    }

    var fullBtn=document.getElementById('cal-fulltoggle');
    function closeMonth(){monthOpen=false;monthview.hidden=true;fullBtn.classList.remove('on');}
    gridEl.addEventListener('click',function(e){
      var b=e.target.closest('.cal-cell');if(!b||b.classList.contains('other'))return;
      selected=new Date(parseInt(b.getAttribute('data-t'),10));closeMonth();render();
    });
    daysEl.addEventListener('click',function(e){
      var b=e.target.closest('.cal-day');if(!b)return;
      selected=new Date(parseInt(b.getAttribute('data-t'),10));render();
    });
    listEl.addEventListener('click',function(e){
      var b=e.target.closest('.cal-nextpill');if(!b)return;
      selected=new Date(parseInt(b.getAttribute('data-t'),10));render();
    });
    document.getElementById('cal-prev').addEventListener('click',function(){selected=addDays(mondayOf(selected),-7);render();});
    document.getElementById('cal-next').addEventListener('click',function(){selected=addDays(mondayOf(selected),7);render();});
    fullBtn.addEventListener('click',function(){
      monthOpen=!monthOpen;monthview.hidden=!monthOpen;fullBtn.classList.toggle('on',monthOpen);
      if(monthOpen){view=new Date(selected.getFullYear(),selected.getMonth(),1);renderMonth();}
    });
    document.getElementById('cal-mprev').addEventListener('click',function(){view=new Date(view.getFullYear(),view.getMonth()-1,1);renderMonth();});
    document.getElementById('cal-mnext').addEventListener('click',function(){view=new Date(view.getFullYear(),view.getMonth()+1,1);renderMonth();});
    document.addEventListener('click',function(e){
      if(!monthOpen)return;
      if(monthview.contains(e.target)||fullBtn.contains(e.target))return;
      closeMonth();
    });
    locEl.addEventListener('change',function(){fillInst();render();});
    [typeEl,instEl].forEach(function(el){el.addEventListener('change',render);});
    render();
    loadCSV();

    // Rolling residency gallery — crossfade through the images
    var gimgs=document.querySelectorAll('.cal-gallery img');
    if(gimgs.length>1){var gi=0;setInterval(function(){gimgs[gi].classList.remove('on');gi=(gi+1)%gimgs.length;gimgs[gi].classList.add('on');},4000);}
  })();

// Flick-through work gallery arrows
(function(){
  document.querySelectorAll('.gnav').forEach(function(b){
    b.addEventListener('click',function(){
      var t=document.getElementById('gtrack'); if(!t) return;
      t.scrollBy({left:(b.classList.contains('gnext')?1:-1)*t.clientWidth,behavior:'smooth'});
    });
  });
})();

// Mobile menu toggle
(function(){
  var h=document.getElementById('site'); if(!h) return;
  var t=h.querySelector('.nav-toggle'); if(!t) return;
  t.addEventListener('click',function(){h.classList.toggle('menu-open');});
  h.querySelectorAll('.nav-links a').forEach(function(a){a.addEventListener('click',function(){h.classList.remove('menu-open');});});
})();

/* Residencies gallery: play videos only while on-screen (saves mobile CPU/battery) */
(function(){
  var vids=document.querySelectorAll('.imgroll video, #feed-track video');
  if(!vids.length||!('IntersectionObserver' in window)) return;
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      var v=e.target;
      if(e.isIntersecting){ var p=v.play(); if(p&&p.catch) p.catch(function(){}); }
      else { v.pause(); }
    });
  },{threshold:0.25});
  vids.forEach(function(v){ io.observe(v); });
})();

/* Decorative IG engagement overlay on the residencies rolling gallery (look & feel only) */
(function(){
  var heart='<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 21.6l-1.5-1.4C5.4 15.6 2 12.5 2 8.7 2 5.6 4.4 3.2 7.5 3.2c1.7 0 3.4.8 4.5 2.1 1.1-1.3 2.8-2.1 4.5-2.1 3.1 0 5.5 2.4 5.5 5.5 0 3.8-3.4 6.9-8.5 11.5L12 21.6z"/></svg>';
  var cmt='<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 3C6.9 3 3 6.4 3 10.6c0 2.3 1.2 4.4 3.1 5.8L5 21l4.9-2.3c.7.1 1.4.2 2.1.2 5.1 0 9-3.4 9-7.6S17.1 3 12 3z"/></svg>';
  var fmt=function(n){return n.toLocaleString('en-US');};
  var data=[[1696,72],[842,31],[2140,58],[1210,44],[963,27],[3480,96],[1875,63],[740,22],[2560,81],[1130,39],[2018,55],[1442,48],[905,29],[3110,88],[1680,51],[1290,37],[2230,66],[980,25]];
  document.querySelectorAll('.imgroll .post .media').forEach(function(m,i){
    var d=data[i%data.length];
    var o=document.createElement('div'); o.className='igstats'; o.setAttribute('aria-hidden','true');
    o.innerHTML='<span class="st">'+heart+fmt(d[0])+'</span><span class="st">'+cmt+fmt(d[1])+'</span>';
    m.appendChild(o);
  });
})();
