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

    // Instagram feed — edit POSTS to swap in real content (image, caption, counts, url)
    var POSTS=[
      {img:'ig/1.jpg',  cap:'Morning miles before the heat hits.',   likes:'3,241',  saves:'412',   comments:'88',  url:''},
      {img:'ig/2.jpg',  cap:'Sunrise flow, nothing but mountains.',  likes:'5,708',  saves:'903',   comments:'142', url:''},
      {img:'ig/3.jpg',  cap:'Sound bath reset — save this one.',     likes:'8,102',  saves:'2,140', comments:'261', url:''},
      {img:'ig/4.jpg',  cap:'That finish-line feeling.',            likes:'4,417',  saves:'356',   comments:'97',  url:''},
      {img:'ig/5.jpg',  cap:'Five minutes of stillness, anywhere.', likes:'6,930',  saves:'1,405', comments:'180', url:''},
      {img:'ig/6.jpg',  cap:'Cold plunge, sauna, repeat.',          likes:'12,304', saves:'3,612', comments:'410', url:''},
      {img:'ig/7.jpg',  cap:'Strength work, no excuses.',           likes:'9,120',  saves:'1,860', comments:'205', url:''},
      {img:'ig/8.jpg',  cap:'Golden hour, good people.',            likes:'7,540',  saves:'1,120', comments:'168', url:''},
      {img:'ig/9.jpg',  cap:'Trail therapy.',                       likes:'5,980',  saves:'740',   comments:'121', url:''},
      {img:'ig/10.jpg', cap:'Switch off. Reset. Repeat.',           likes:'8,760',  saves:'2,430', comments:'233', url:''}
    ];
    var IC={
      like:'<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
      save:'<svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
      comment:'<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.6 8.6 0 0 1-3.9-.9L3 21l1.9-5.6A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z"/></svg>'
    };
    var track=document.getElementById('feed-track');
    if(track){
      track.innerHTML=POSTS.map(function(p){
        var media='<div class="media"><img src="'+p.img+'" alt=""><div class="grad"></div><div class="top"><span class="av">O</span><span class="hn">@oyogo.london</span></div><div class="play"></div></div>';
        var stats='<div class="stats">'+
          '<span class="stat-i">'+IC.like+p.likes+'</span>'+
          (p.saves?'<span class="stat-i">'+IC.save+p.saves+'</span>':'')+
          '<span class="stat-i">'+IC.comment+p.comments+'</span>'+
        '</div>';
        var inner=media+'<p class="cap">'+p.cap+'</p>'+stats;
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
    var monthview=document.getElementById('cal-monthview'), weekview=document.getElementById('cal-weekview'), daysEl=document.getElementById('cal-days');
    var titleEl=document.getElementById('cal-title'), dayheadEl=document.getElementById('cal-dayhead'), listEl=document.getElementById('cal-list');
    var locEl=document.getElementById('cal-loc'), typeEl=document.getElementById('cal-type');

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

    var today=new Date();today.setHours(0,0,0,0);
    var mode='month', view=new Date(today), selected=new Date(today);

    function fill(el,all,arr){el.innerHTML='<option value="">'+all+'</option>'+arr.map(function(v){return '<option value="'+v+'">'+v+'</option>';}).join('');}
    function uniq(arr){var seen={},out=[];arr.forEach(function(v){if(v&&!seen[v]){seen[v]=1;out.push(v);}});return out;}
    var RES_COLORS={'Zelia':'#5c6b4f','Nido':'#4a76a8','Elix':'#b4542e','Avali':'#c9a24b','Peligoni':'#3f7c74'};
    function dotsFor(items){
      var rs=[];items.forEach(function(r){if(rs.indexOf(r.resort)<0)rs.push(r.resort);});
      return rs.length?'<span class="cal-dots">'+rs.map(function(n){return '<span class="cd" style="background:'+(RES_COLORS[n]||'#5c6b4f')+'"></span>';}).join('')+'</span>':'';
    }
    function populate(){
      var cl=locEl.value,ct=typeEl.value;
      var resorts=uniq(ROWS.map(function(r){return r.resort;}));
      locEl.innerHTML=resorts.map(function(v){return '<option value="'+v+'">'+v+'</option>';}).join('');
      fill(typeEl,'All classes',uniq(ROWS.map(function(r){return r.type;})));
      locEl.value=(cl&&resorts.indexOf(cl)>=0)?cl:resorts[0]; // always one resort
      typeEl.value=ct;
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
        .filter(function(r){return !typeEl.value || r.type===typeEl.value;});
    }
    function specialOn(rows){var s='';rows.forEach(function(r){if(r.special)s=r.special;});return s;}
    var SPECIAL_DESC={'Pace 1':'Performance & fitness week','Pace 2':'Performance & fitness week','Pace 3':'Performance & fitness week','Gather':'Wellness & community week'};
    function specialLabel(s){return /^Pace/.test(s)?s.replace('Pace','Pace Week'):(s==='Gather'?'Gather Week':s);}

    function renderMonth(){
      monthview.hidden=false; weekview.hidden=true;
      titleEl.textContent=MON[view.getMonth()]+' '+view.getFullYear();
      var first=new Date(view.getFullYear(),view.getMonth(),1), start=mondayOf(first), html='';
      for(var i=0;i<42;i++){
        var d=addDays(start,i), other=d.getMonth()!==view.getMonth();
        var items=other?[]:activeRows(d), has=items.length>0, sp=has?specialOn(items):'';
        var cls='cal-cell'+(other?' other':'')+(key(d)===key(today)?' today':'')+(key(d)===key(selected)?' sel':'')+(sp?' special':'');
        html+='<button type="button" class="'+cls+'"'+(other?' disabled':'')+' data-t="'+d.getTime()+'"><span class="cal-num">'+d.getDate()+'</span>'+pillsFor(items)+'</button>';
      }
      gridEl.innerHTML=html;
    }
    function fmtRange(a,b){var e=(a.getMonth()===b.getMonth()?b.getDate():MONS[b.getMonth()]+' '+b.getDate());return MONS[a.getMonth()]+' '+a.getDate()+' – '+e;}
    function renderWeek(){
      monthview.hidden=true; weekview.hidden=false;
      var start=mondayOf(selected);
      titleEl.textContent=fmtRange(start,addDays(start,6));
      var html='';
      for(var i=0;i<7;i++){
        var d=addDays(start,i), isToday=key(d)===key(today), isSel=key(d)===key(selected), items=activeRows(d), has=items.length>0, sp=has?specialOn(items):'';
        var lab=isToday?'Today':WDL[i];
        html+='<button type="button" class="cal-day'+(isSel?' on':'')+(sp?' special':'')+'" data-t="'+d.getTime()+'"><span class="cal-wd">'+lab+'</span><span class="cal-circle">'+d.getDate()+dotsFor(items)+'</span></button>';
      }
      daysEl.innerHTML=html;
    }
    function renderDay(){
      dayheadEl.textContent=WDF[selected.getDay()]+', '+MONS[selected.getMonth()]+' '+selected.getDate();
      var rows=activeRows(selected);
      if(!rows.length){listEl.innerHTML='<p class="cal-empty">No Oyogo sessions on this day — <a href="mailto:studio@oyogo.co.uk" style="color:var(--olive);font-weight:600">enquire about a residency</a>.</p>';return;}
      var order=[],groups={};
      rows.forEach(function(r){if(!groups[r.resort]){groups[r.resort]=[];order.push(r.resort);}groups[r.resort].push(r);});
      listEl.innerHTML=order.map(function(resort){
        var rs=groups[resort], special='',web='',loc='';
        rs.forEach(function(r){if(r.special&&!special)special=r.special;if(r.web&&r.web!=='#'&&!web)web=r.web;if(r.loc&&!loc)loc=r.loc;});
        var timed=[];rs.forEach(function(r){if(r.times.length)r.times.forEach(function(t){timed.push({time:t,venue:r.venue,trainer:r.trainer,disc:r.disc});});});
        timed.sort(function(a,b){return a.time.localeCompare(b.time);});
        var roster=rs.filter(function(r){return !r.times.length;});
        var h='<div class="cal-group"><div class="cal-grp-head"><span class="cal-grp-name">'+resort+(loc?' · '+loc:'')+'</span>'+(special?'<span class="cal-badge">✦ '+specialLabel(special)+'</span>':'')+'</div>'+(special&&SPECIAL_DESC[special]?'<div class="cal-grp-desc">'+SPECIAL_DESC[special]+'</div>':'');
        if(timed.length){
          var torder=[],tmap={};
          timed.forEach(function(s){var v=s.venue||'Classes';if(!tmap[v]){tmap[v]=[];torder.push(v);}tmap[v].push(s);});
          var cols=torder.map(function(v){
            var lab=(torder.length>1||v!=='Classes')?'<div class="cal-roster-lab">'+v+'</div>':'';
            var rws=tmap[v].map(function(s){return '<div class="cal-row"><div class="cal-time">'+s.time+'</div><div class="cal-info"><div class="cal-cls">'+(s.disc||'Class')+'</div><div class="cal-meta">with '+s.trainer+'</div></div></div>';}).join('');
            return '<div class="cal-col">'+lab+rws+'</div>';
          }).join('');
          h+='<div class="cal-cols'+(torder.length>1?' two':'')+'">'+cols+'</div>';
        }
        if(roster.length){
          var rorder=[],rmap={};
          roster.forEach(function(r){var v=r.venue||'Guest trainers this week';if(!rmap[v]){rmap[v]=[];rorder.push(v);}rmap[v].push(r);});
          rorder.forEach(function(v){
            h+='<div class="cal-roster"><div class="cal-roster-lab">'+v+'</div><div class="cal-roster-list">'+rmap[v].map(function(r){
              var inner=r.trainer+(r.disc?' <span>'+r.disc+'</span>':'');
              var u=igURL(r.ig);
              return u?('<a href="'+u+'" target="_blank" rel="noopener">'+inner+'</a>'):('<span class="rn">'+inner+'</span>');
            }).join('')+'</div></div>';
          });
        }
        if(web){h+='<div class="cal-cta"><a class="cal-book" href="'+web+'" target="_blank" rel="noopener">Book your stay at '+resort+'</a></div>';}
        return h+'</div>';
      }).join('');
    }
    function render(){ if(mode==='month')renderMonth(); else renderWeek(); renderDay(); }

    function loadCSV(){
      if(!CSV_URL)return;
      fetch(CSV_URL).then(function(r){return r.ok?r.text():Promise.reject();}).then(function(txt){
        var parsed=fromCSV(txt);
        if(parsed.length){ROWS=parsed;populate();render();}
      }).catch(function(){});
    }

    gridEl.addEventListener('click',function(e){
      var b=e.target.closest('.cal-cell');if(!b||b.classList.contains('other'))return;
      selected=new Date(parseInt(b.getAttribute('data-t'),10));render();
    });
    daysEl.addEventListener('click',function(e){
      var b=e.target.closest('.cal-day');if(!b)return;
      selected=new Date(parseInt(b.getAttribute('data-t'),10));render();
    });
    document.getElementById('cal-prev').addEventListener('click',function(){
      if(mode==='month'){view=new Date(view.getFullYear(),view.getMonth()-1,1);} else {selected=addDays(mondayOf(selected),-7);view=new Date(selected);} render();
    });
    document.getElementById('cal-next').addEventListener('click',function(){
      if(mode==='month'){view=new Date(view.getFullYear(),view.getMonth()+1,1);} else {selected=addDays(mondayOf(selected),7);view=new Date(selected);} render();
    });
    document.getElementById('cal-today').addEventListener('click',function(){view=new Date(today);selected=new Date(today);render();});
    document.querySelectorAll('.cal-view button').forEach(function(btn){
      btn.addEventListener('click',function(){
        mode=btn.getAttribute('data-view');
        document.querySelectorAll('.cal-view button').forEach(function(x){x.classList.toggle('on',x===btn);});
        if(mode==='month')view=new Date(selected.getFullYear(),selected.getMonth(),1);
        render();
      });
    });
    [locEl,typeEl].forEach(function(el){el.addEventListener('change',render);});
    render();
    loadCSV();

    // Rolling residency gallery — crossfade through the images
    var gimgs=document.querySelectorAll('.cal-gallery img');
    if(gimgs.length>1){var gi=0;setInterval(function(){gimgs[gi].classList.remove('on');gi=(gi+1)%gimgs.length;gimgs[gi].classList.add('on');},4000);}
  })();
