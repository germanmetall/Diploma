(function(t){function e(e){for(var s,i,o=e[0],r=e[1],l=e[2],d=0,b=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(c,i)&&c[i]&&b.push(c[i][0]),c[i]=0;for(s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s]);u&&u(e);while(b.length)b.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],s=!0,o=1;o<a.length;o++){var r=a[o];0!==c[r]&&(s=!1)}s&&(n.splice(e--,1),t=i(i.s=a[0]))}return t}var s={},c={app:0},n=[];function i(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=s,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(a,s,function(e){return t[e]}.bind(null,s));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],r=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=r;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},1:function(t,e){},"13cc":function(t,e,a){t.exports=a.p+"img/ava.07f5d74c.jpg"},"261d":function(t,e,a){},"2d82":function(t,e,a){"use strict";a("4509")},"329d":function(t,e,a){"use strict";a("b356")},4509:function(t,e,a){},"4e8a":function(t,e,a){"use strict";a("7f68")},5131:function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);var s=a("7a23");function c(t,e){const a=Object(s["A"])("router-view");return Object(s["t"])(),Object(s["d"])(a)}a("2d82");var n=a("6b0d"),i=a.n(n);const o={},r=i()(o,[["render",c]]);var l=r,u=a("6c02");const d={class:"page"},b={class:"main"},h={class:"auth",onsubmit:"return false;"},m={key:0,class:"auth__errorContainer"},j={class:"auth__error"},p=Object(s["h"])('<section class="auth__infoContainer"><label class="auth__info"><input class="auth__input" type="email" placeholder="Email" id="email"></label><label class="auth__info"><input class="auth__input" type="password" placeholder="Password" id="password"></label></section>',1),O={class:"auth__actionContainer"};function f(t,e,a,c,n,i){return Object(s["t"])(),Object(s["f"])("div",d,[Object(s["g"])("main",b,[Object(s["g"])("form",h,[t.error.error?(Object(s["t"])(),Object(s["f"])("section",m,[Object(s["g"])("span",j,Object(s["C"])(t.error.text),1)])):Object(s["e"])("",!0),p,Object(s["g"])("section",O,[Object(s["g"])("span",{class:"auth__action",onClick:e[0]||(e[0]=t=>i.login())},"Увійти")])])])])}var g={name:"Auth",data:function(){return{error:{error:!1,text:""}}},methods:{async login(){let t=this.checkValidation();if(this.error=t,this.error.error)return void alert(this.error.text);let{mail:e,password:a}=t,s=await this.$options.API.data().Auth.login(e,a),c=await s.json();c.jwt?(alert("Ви успішно увійшли до системи"),localStorage.setItem("jwt",c.jwt),this.$router.push("/")):alert("Помилка. Перевірте правильність логіна чи паролю")},checkValidation(){let t=/[^@]+@[^@]+\.(com|net|org)/g,e=/[a-zA-Z0-9]{6,}/g,a=document.querySelector("#email").value,s=document.querySelector("#password").value;return a.match(t)?s.match(e)?{error:!1,text:"",mail:a,password:s}:{error:!0,text:"Ваш пароль не підходить!"}:{error:!0,text:"Ваша пошта не підходить!"}}}};a("9d4b");const _=i()(g,[["render",f]]);var v=_;const y={class:"page"},w={class:"main"},k={class:"courses"},A={class:"course__name heading heading--medium"},C={class:"course__info"},S=["src"];function I(t,e,a,c,n,i){const o=Object(s["A"])("Header");return Object(s["t"])(),Object(s["f"])("div",y,[Object(s["j"])(o),Object(s["g"])("main",w,[Object(s["g"])("section",k,[(Object(s["t"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(t.courses,t=>(Object(s["t"])(),Object(s["f"])("article",{class:"course",key:t},[Object(s["g"])("span",A,Object(s["C"])(t.attributes.Name),1),Object(s["g"])("span",C,Object(s["C"])(t.attributes.Schedule),1),t.attributes.Avatar.data?(Object(s["t"])(),Object(s["f"])("img",{key:0,src:"http://localhost:1337"+t.attributes.Avatar.data.attributes.url,class:"course__img"},null,8,S)):Object(s["e"])("",!0)]))),128))])])])}const P=t=>(Object(s["w"])("data-v-794677b8"),t=t(),Object(s["u"])(),t),x={class:"header"},q={class:"nav"},$=Object(s["i"])("Головна"),T=Object(s["i"])("Мої курси"),z=P(()=>Object(s["g"])("span",null,"Профіль",-1)),H=P(()=>Object(s["g"])("img",{src:"",class:"nav__avatar"},null,-1));function N(t,e,a,c,n,i){const o=Object(s["A"])("router-link");return Object(s["t"])(),Object(s["f"])("header",x,[Object(s["g"])("nav",q,[Object(s["j"])(o,{class:"nav__item heading heading--big",to:"/"},{default:Object(s["F"])(()=>[$]),_:1}),Object(s["j"])(o,{class:"nav__item heading heading--big",to:"/courses"},{default:Object(s["F"])(()=>[T]),_:1}),Object(s["j"])(o,{class:"nav__item heading heading--big",to:"/profile"},{default:Object(s["F"])(()=>[z,H]),_:1})])])}var B={name:"Header",mounted:function(){let t=this.$route.meta.title,e=document.querySelectorAll(".nav__item"),a=Array.from(e).filter(e=>e.innerText==t);a[0]&&a[0].classList.add("active")}};a("a222");const L=i()(B,[["render",N],["__scopeId","data-v-794677b8"]]);var M=L,E={name:"Home",components:{Header:M},data:function(){return{courses:void 0}},mounted:async function(){let t=await this.$options.API.data().Courses.get(),e=await t.json();this.courses=e.data,console.log(e)}};a("329d");const J=i()(E,[["render",I],["__scopeId","data-v-45a0ea3e"]]);var F=J;const U={class:"page"},D={class:"main"},R={key:0,class:"course"},V={class:"courseNav"},G={class:"course__description"},Q=Object(s["g"])("br",null,null,-1),Z={class:"course__tab active"},K={class:"event__description heading heading--small"},W={class:"event__date"},X={class:"course__tab"},Y={class:"material__name heading heading--small"},tt={class:"material__text"},et=["onClick"],at=Object(s["g"])("img",{class:"file__img",src:""},null,-1),st={class:"file__name"},ct={class:"course__tab"},nt={class:"course__tab"},it=["src"],ot={class:"student__name heading heading--small"},rt=["src"];function lt(t,e,a,c,n,i){const o=Object(s["A"])("Header"),r=Object(s["A"])("router-link");return Object(s["t"])(),Object(s["f"])("div",U,[Object(s["j"])(o),Object(s["g"])("main",D,[t.course?(Object(s["t"])(),Object(s["f"])("section",R,[Object(s["g"])("nav",V,[Object(s["g"])("span",{class:"courseNav__item heading heading--medium active",onClick:e[0]||(e[0]=t=>i.switchTab(0))},"Головна"),Object(s["g"])("span",{class:"courseNav__item heading heading--medium",onClick:e[1]||(e[1]=t=>i.switchTab(1))},"Матеріали"),Object(s["g"])("span",{class:"courseNav__item heading heading--medium",onClick:e[2]||(e[2]=t=>i.switchTab(2))},"Завдання"),Object(s["g"])("span",{class:"courseNav__item heading heading--medium",onClick:e[3]||(e[3]=t=>i.switchTab(3))},"Студенти")]),Object(s["g"])("span",G,[Object(s["i"])(Object(s["C"])(t.course.attributes.Description)+" ",1),Q,Object(s["i"])(" "+Object(s["C"])(t.course.attributes.Schedule),1)]),Object(s["g"])("div",Z,[(Object(s["t"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(t.course.attributes.platform_events.data,t=>(Object(s["t"])(),Object(s["f"])("article",{class:"event",key:t},[Object(s["g"])("span",K,Object(s["C"])(t.attributes.Text),1),Object(s["g"])("time",W,Object(s["C"])(t.attributes.Date),1)]))),128))]),Object(s["g"])("div",X,[(Object(s["t"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(t.course.attributes.platform_materials.data,t=>(Object(s["t"])(),Object(s["f"])("article",{class:"material",key:t},[Object(s["g"])("span",Y,Object(s["C"])(t.attributes.Name),1),Object(s["g"])("span",tt,Object(s["C"])(t.attributes.Text),1),(Object(s["t"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(t.attributes.Included_files.data,t=>(Object(s["t"])(),Object(s["f"])("div",{class:"file",key:t,onClick:e=>i.donwloadFromUrl("http://localhost:1337"+t.attributes.url,t.attributes.name)},[at,Object(s["g"])("span",st,Object(s["C"])(t.attributes.name),1)],8,et))),128))]))),128))]),Object(s["g"])("div",ct,[(Object(s["t"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(t.course.attributes.platform_tasks.data,e=>(Object(s["t"])(),Object(s["d"])(r,{class:"task heading heading--medium",key:e,to:{name:"Tasks",params:{courseId:t.course.id,id:e.id}}},{default:Object(s["F"])(()=>[Object(s["i"])(Object(s["C"])(e.attributes.Name),1)]),_:2},1032,["to"]))),128))]),Object(s["g"])("div",nt,[(Object(s["t"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(t.course.attributes.students.data,t=>(Object(s["t"])(),Object(s["f"])("article",{class:"student",key:t},[t.attributes.avatar.data?(Object(s["t"])(),Object(s["f"])("img",{key:0,class:"student__avatar",src:"http://localhost:1337"+t.attributes.avatar.data[0].attributes.url},null,8,it)):Object(s["e"])("",!0),Object(s["g"])("span",ot,Object(s["C"])(t.attributes.username),1)]))),128))]),Object(s["g"])("img",{src:t.teacherAvatar,class:"course__teacherAvatar"},null,8,rt)])):Object(s["e"])("",!0)])])}const ut={class:"page"},dt={class:"main"},bt={class:"heading heading--medium"},ht={class:"notations"},mt={class:"notation__type"},jt=["onClick"],pt=Object(s["i"])("Довідка"),Ot={key:0,class:"question"},ft={class:"question__text heading heading--small"},gt={class:"help__formula"};function _t(t,e,a,c,n,i){const o=Object(s["A"])("Header"),r=Object(s["A"])("router-link");return Object(s["t"])(),Object(s["f"])("div",ut,[Object(s["j"])(o),Object(s["g"])("div",dt,[Object(s["g"])("h1",bt,Object(s["C"])(t.name),1),Object(s["g"])("div",ht,[(Object(s["t"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(t.notations,t=>(Object(s["t"])(),Object(s["f"])("div",{class:"notation__container",key:t},["Довідка"!==t.name?(Object(s["t"])(),Object(s["f"])(s["a"],{key:0},[Object(s["g"])("span",mt,Object(s["C"])(t.name),1),(Object(s["t"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(t.elements,t=>(Object(s["t"])(),Object(s["f"])("div",{class:"notation__dropdown",key:t},[Object(s["g"])("div",{onClick:e=>i.insertNotation(t),class:"notation"},Object(s["C"])(t),9,jt)]))),128))],64)):(Object(s["t"])(),Object(s["d"])(r,{key:1,id:"hint",target:"_blank",to:"/hint"},{default:Object(s["F"])(()=>[pt]),_:1}))]))),128))]),t.questions?(Object(s["t"])(),Object(s["f"])("section",Ot,[Object(s["g"])("div",ft,Object(s["C"])(t.questions[t.index].attributes.Question),1),Object(s["g"])("div",{class:"question__answer",contenteditable:"",onInput:e[0]||(e[0]=t=>i.check())},null,32)])):Object(s["e"])("",!0),t.questions?(Object(s["t"])(),Object(s["f"])("div",{key:1,class:Object(s["p"])(["help",{valid:!t.match.error,notValid:t.match.error}])},[Object(s["g"])("div",gt,Object(s["C"])(t.match.text),1),t.index<t.questions.length-1?(Object(s["t"])(),Object(s["f"])("div",{key:0,class:"help__next heading heading--small",onClick:e[1]||(e[1]=t=>i.next())},"Далі")):Object(s["e"])("",!0),t.index==t.questions.length-1?(Object(s["t"])(),Object(s["f"])("div",{key:1,class:"help__next heading heading--small",onClick:e[2]||(e[2]=t=>i.sendResults())},"Надіслати")):Object(s["e"])("",!0)],2)):Object(s["e"])("",!0)])])}var vt=a("1cd1"),yt=a("2bac");const wt={},kt=Object(vt["a"])(yt["a"],wt);var At={name:"Tasks",data:function(){return{courseId:this.$route.params.courseId,id:this.$route.params.id,notations:[{name:"Змінні",elements:["x","y","z"]},{name:"Константи",elements:["PI","E","PHI"]},{name:"Тригонометрія",elements:["sin(45)","cos(45)","tan(45)","cot(45)"]},{name:"Інше",elements:["S(x,4,8)","P(y,4,8)","log(1,2)"]},{name:"Довідка"}],match:{error:!0,text:"Пуста строка!"},index:0,questions:void 0,name:void 0}},components:{Header:M},methods:{next(){this.match.error?alert("Неправильний запис"):(localStorage.setItem("q"+this.questions[this.index].id,document.querySelector(".question__answer").innerHTML),document.querySelector(".question__answer").innerHTML="",this.index++,this.check())},check(){let t=document.querySelector(".question__answer").innerHTML;if(""===t)return this.match={error:!0,text:"Пуста строка!"},!1;try{return kt.parse(t),this.match={error:!1,text:"Все в порядку"},!0}catch(e){return this.match={error:!0,text:"Неправильний запис"},!1}},insertNotation(t){document.querySelector(".question__answer").innerHTML+=t,this.check()},async sendResults(){localStorage.setItem("q"+this.questions[this.index].id,document.querySelector(".question__answer").innerHTML);let t=[];for(let a=0;a<this.questions.length;a++)t.push({id:this.questions[a].id,answer:localStorage.getItem("q"+this.questions[a].id)}),localStorage.removeItem("q"+this.questions[a].id);let e=await this.$options.API.data().Tasks.send(this.id,t);e.data.id?(alert("Успішно надіслано!"),this.$router.push("/course/"+this.$route.params.courseId)):alert("Виникла помилка")}},mounted:async function(){let t=await this.$options.API.data().Tasks.getById(this.id),e=await t.json();console.log(e),this.name=e.data.attributes.Name,this.questions=e.data.attributes.platform_tasks.data}};a("4e8a");const Ct=i()(At,[["render",_t]]);var St=Ct;a("d4cd")({html:!0});var It={name:"Course",components:{Header:M},data:function(){return{id:this.$route.params.id,course:void 0,teacherAvatar:void 0}},methods:{async donwloadFromUrl(t,e){let a=await fetch(t),s=await a.blob(),c=window.URL.createObjectURL(s),n=document.createElement("a");n.download=e,n.href=c,document.body.appendChild(n),n.click(),document.body.removeChild(n)},switchTab(t){document.querySelectorAll(".course .courseNav__item").forEach((e,a)=>{a==t?e.classList.add("active"):e.classList.remove("active")}),document.querySelectorAll(".course__tab").forEach((e,a)=>{a==t?e.classList.add("active"):e.classList.remove("active")})}},mounted:async function(){let t=await this.$options.API.data().Courses.getById(this.id),e=await t.json();this.course=e.data,console.log(this.course),t=await this.$options.API.data().Courses.getAvatar(this.id),e=await t.json(),e.data.attributes.Avatar.data&&(this.teacherAvatar="http://localhost:1337"+e.data.attributes.Avatar.data.attributes.url)}};a("a876");const Pt=i()(It,[["render",lt]]);var xt=Pt;const qt={class:"page"},$t={class:"main"},Tt={class:"courses"},zt=["onClick"],Ht={class:"course__name heading heading--medium"},Nt={class:"course__info"},Bt=["src"];function Lt(t,e,a,c,n,i){const o=Object(s["A"])("Header");return Object(s["t"])(),Object(s["f"])("div",qt,[Object(s["j"])(o),Object(s["g"])("main",$t,[Object(s["g"])("section",Tt,[(Object(s["t"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(t.courses,e=>(Object(s["t"])(),Object(s["f"])("article",{class:"course",key:e,onClick:a=>t.$router.push({name:"Course",params:{id:e.id}})},[Object(s["g"])("span",Ht,Object(s["C"])(e.attributes.Name),1),Object(s["g"])("span",Nt,Object(s["C"])(e.attributes.Schedule),1),e.attributes.Avatar.data?(Object(s["t"])(),Object(s["f"])("img",{key:0,src:"http://localhost:1337"+e.attributes.Avatar.data.attributes.url,class:"course__img"},null,8,Bt)):Object(s["e"])("",!0)],8,zt))),128))])])])}var Mt={name:"Courses",components:{Header:M},data:function(){return{courses:void 0}},mounted:async function(){this.courses=await this.$options.API.data().Courses.getMine(),console.log(this.courses)}};a("bb20");const Et=i()(Mt,[["render",Lt],["__scopeId","data-v-753d6bf2"]]);var Jt=Et,Ft=a("13cc"),Ut=a.n(Ft);const Dt=t=>(Object(s["w"])("data-v-18e28a89"),t=t(),Object(s["u"])(),t),Rt={class:"page"},Vt={class:"main"},Gt={class:"command"},Qt={key:0,class:"command"},Zt={key:1,class:"profile"},Kt={class:"profile__name"},Wt=Dt(()=>Object(s["g"])("div",{class:"profile__img"},[Object(s["g"])("img",{class:"img__avatar",src:Ut.a})],-1)),Xt={class:"profile__contacts"},Yt={key:2,class:"profile edit"},te=["value"],ee={class:"profile__img"},ae=Dt(()=>Object(s["g"])("input",{type:"file",accept:"image/*",id:"avatarInput"},null,-1)),se=["value"];function ce(t,e,a,c,n,i){const o=Object(s["A"])("Header");return Object(s["t"])(),Object(s["f"])("div",Rt,[Object(s["j"])(o),Object(s["g"])("main",Vt,[Object(s["g"])("div",Gt,[t.edit?Object(s["e"])("",!0):(Object(s["t"])(),Object(s["f"])("div",{key:0,class:"command__edit",onClick:e[0]||(e[0]=t=>i.toggleEdit())},"Змінити"))]),t.edit?(Object(s["t"])(),Object(s["f"])("div",Qt,[Object(s["g"])("div",{class:"command__cancel",onClick:e[1]||(e[1]=t=>i.toggleEdit())},"Скасувати"),Object(s["g"])("div",{class:"command__save",onClick:e[2]||(e[2]=t=>i.save())},"Зберегти")])):Object(s["e"])("",!0),t.edit?Object(s["e"])("",!0):(Object(s["t"])(),Object(s["f"])("section",Zt,[Object(s["g"])("span",Kt,Object(s["C"])(t.profile.name),1),Wt,Object(s["g"])("span",Xt,Object(s["C"])(t.profile.contacts),1)])),t.edit?(Object(s["t"])(),Object(s["f"])("section",Yt,[Object(s["g"])("input",{type:"text",class:"profile__name",value:t.profile.name},null,8,te),Object(s["g"])("div",ee,[Object(s["g"])("img",{class:"img__avatar",src:Ut.a,onClick:e[3]||(e[3]=t=>i.changeAvatar())}),ae]),Object(s["g"])("textarea",{class:"profile__contacts",value:t.profile.contacts},null,8,se)])):Object(s["e"])("",!0)])])}var ne={name:"Profile",components:{Header:M},data:function(){return{edit:!1,profile:{}}},mounted:async function(){let t=await this.$options.API.data().Profile.me(),e=await t.json();console.log(e),this.profile={name:e.username,contacts:e.Contacts}},methods:{toggleEdit(){this.edit=!this.edit},async save(){let t=document.querySelector(".profile__name").value,e=document.querySelector(".profile__contacts").value,a=await this.$options.API.data().Profile.update(t,e),s=await a.json();console.log(s),this.profile={name:t,contacts:e},this.edit=!this.edit},changeAvatar(){document.querySelector("#avatarInput").click()}}};a("b76b");const ie=i()(ne,[["render",ce],["__scopeId","data-v-18e28a89"]]);var oe=ie;const re={class:"page"},le=Object(s["h"])('<div class="main"><div class="hint"><h1>Довідка</h1><span class="hint__text"> Для питань необхідно дати відповідь, яка є математичним об&#39;єктом. Для вашого комфорту комп&#39;ютер самостійно при написанні відповіді з&#39;ясовує, чи коректен ваш запис. </span><span class="hint__text"> Ви можете вводити наступні категорії чисел: <ul><li>Цілі: 1, 2, 10521</li><li>Дійсні: 1.2, 3.1412512</li><li>Від&#39;ємні: -5, -12301231</li><li>Раціональні: 8/3</li><li>Або ж &quot;всі в одному&quot;: -5.18/3</li></ul></span><span class="hint__text"> Ви можете вводити змінні: <ul><li>x</li><li>y</li><li>z</li><li>або ж будь-яку інші, як &quot;quantity&quot;</li></ul> Ви можете вводити константи: <ul><li>pi - число пі</li><li>e - число Ейлера</li><li>phi - золотий перетин</li><li>чи деякі інші</li></ul></span><span class="hint__text"> Вы можете також використовувати об&#39;єкти алгебри: <br><br><b>Формула логарифму:</b><i>log(число; база)</i>, наприклад: log(8; 2) - логарифм 8 по базі 2 <br><br><b>Формули дій з рядом:</b><ul><li>S(вираз; нижня границя; верхня границя) для суми</li><li>P(вираз; нижня границя; верхня границя) для множення</li></ul><br><b>Інше:</b> В якості нескінченності використовуйте записи Infinity та -Infinity для &quot;мінус нескінченності&quot; </span><span class="hint__text"> Вы можете також використовувати функції тригонометрії: <ul><li>Синус - sin()</li><li>Косинус - cos()</li><li>Тангенс - tan()</li><li>Котангенс - cot()</li></ul> Формулы тригонометрії: <br> sin(вугол) <i>для радіанів</i>, наприклад sin(45) <br> sin(вугол deg) <i>для градусів</i>, наприклад sin(45 deg) </span><span class="hint__text"> Це - найчастіш вживані варіанти наборів, однак існують і інші об&#39;єкти. Для поглибленого вивчення: <a href="https://mathjs.org/docs/index.html" target="blank_">math.js</a></span></div></div>',1),ue=[le];function de(t,e,a,c,n,i){return Object(s["t"])(),Object(s["f"])("div",re,ue)}var be={name:"Hint"};a("c22c");const he=i()(be,[["render",de]]);var me=he;const je=[{path:"/auth",name:"Auth",component:v,meta:{title:"Вхід"}},{path:"/",name:"Home",component:F,meta:{title:"Головна"}},{path:"/courses",name:"Courses",component:Jt,meta:{title:"Мої курси"}},{path:"/course/:id",name:"Course",component:xt,meta:{title:"Курс"}},{path:"/profile",name:"Profile",component:oe,meta:{title:"Профіль"}},{path:"/course/:courseId/tasks/:id",name:"Tasks",component:St,meta:{title:"Завдання"}},{path:"/hint",name:"Hint",component:me,meta:{title:"Довідка"}}],pe=Object(u["a"])({history:Object(u["b"])(),routes:je}),Oe="Курси";pe.beforeEach((t,e,a)=>{void 0!=localStorage.getItem("jwt")&&""!=localStorage.getItem("jwt")||"Auth"===t.name||a({name:"Auth"}),document.title=t.meta.title||Oe,a()});var fe=pe;class ge{constructor(t){this.localPath=""+t}async login(t,e){return await fetch(this.localPath+"/auth/local",{method:"POST",body:JSON.stringify({identifier:t,password:e}),headers:{"content-type":"application/json"}})}}class _e{constructor(t){this.localPath=t+"/users"}async me(){let t=localStorage.getItem("jwt");return await fetch(this.localPath+"/me?populate[0]=avatar&populate[1]=Platform_levels",{method:"GET",headers:{Authorization:"Bearer "+t}})}async getLevel(t){let e=localStorage.getItem("jwt");return await fetch(`${this.localPath}/${t}?populate[0]=Platform_levels`,{method:"GET",headers:{Authorization:"Bearer "+e}})}async update(t,e){let a=await this.me(),s=await a.json(),c=s.id,n=localStorage.getItem("jwt");return await fetch(`${this.localPath}/${c}`,{method:"PUT",body:JSON.stringify({username:t,Contacts:e}),headers:{Authorization:"Bearer "+n,"content-type":"application/json"}})}}class ve{constructor(t){this.path=t,this.localPath=t+"/platform-courses"}async get(){let t=localStorage.getItem("jwt");return await fetch(this.localPath+"?populate=%2A",{headers:{Authorization:"Bearer "+t}})}async getMine(){let t=await this.get(),e=await t.json();console.log(e);let a=e.data,s=await new _e(this.path).me();return e=await s.json(),console.log(e,a),a=a.filter(t=>{for(let a=0;a<t.attributes.students.data.length;a++)if(t.attributes.students.data[a].attributes.email===e.email)return!0}),a}async getById(t){let e=localStorage.getItem("jwt"),a="populate[platform_events][filters][level][$gte]=0&populate[platform_materials][populate]=Included_files&populate[students][populate]=avatar&populate[platform_materials][filters][level][$gte]=0&populate[platform_tasks][populate]=platform_tasks&populate[platform_tasks][filters][level][$gte]=0";return await fetch(`${this.localPath}/${t}?${a}`,{headers:{Authorization:"Bearer "+e}})}async getAvatar(t){let e=localStorage.getItem("jwt"),a="populate[0]=Avatar";return await fetch(`${this.localPath}/${t}?${a}`,{headers:{Authorization:"Bearer "+e}})}async register(t,e){let a=localStorage.getItem("jwt"),s=await this.getMine(t),c=await s.json(),n=JSON.parse(c.levels);return n.push({id:e,level:0}),await fetch(`${path}/platform-users/${t}`,{method:"PUT",body:JSON.stringify({data:{levels:n}}),headers:{Authorization:"Bearer "+a,"content-type":"application/json"}})}}class ye{constructor(t){this.localPath=""+t}async getById(t){let e=localStorage.getItem("jwt");return await fetch(`${this.localPath}/platform-tasks/${t}?populate=*`,{headers:{Authorization:"Bearer "+e}})}async send(t,e){let a,s,c=localStorage.getItem("jwt"),n=[];for(let r=0;r<e.length;r++)a=await fetch(this.localPath+"/platform-answer-to-one-tasks",{method:"POST",body:JSON.stringify({data:{studentAnswer:e[r].answer,platform_one_task:e[r].id}}),headers:{Authorization:"Bearer "+c,"content-type":"application/json"}}),s=await a.json(),console.log(s.data),n.push(s.data.id);console.log(JSON.stringify({data:{platform_task:t,platform_answer_to_one_tasks:n,users:s.id}}));let i=await new _e(this.localPath).me();s=await i.json(),console.log(s),a=await fetch(this.localPath+"/answers",{method:"POST",body:JSON.stringify({data:{platform_task:t,platform_answer_to_one_tasks:n,users:s.id}}),headers:{Authorization:"Bearer "+c,"content-type":"application/json"}}),s=await a.json();let o=[];for(let r=0;r<e.length;r++)o[r]={taskID:e[r].id,answer:e[r].answer,answerID:n[r]};return a=await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({listAnswers:o})}),s=await a.json(),console.log(s),s}}const we={data(){let t="http://localhost:1337/api";return{Auth:new ge(t),Courses:new ve(t),Tasks:new ye(t),Profile:new _e(t)}}};var ke={API:we};let Ae=Object(s["c"])(l).use(fe).mixin(ke);Ae.mount("#app")},"751f":function(t,e,a){},"7f68":function(t,e,a){},"89a4":function(t,e,a){},"9d4b":function(t,e,a){"use strict";a("5131")},a222:function(t,e,a){"use strict";a("89a4")},a876:function(t,e,a){"use strict";a("261d")},b356:function(t,e,a){},b76b:function(t,e,a){"use strict";a("e6f7")},bb20:function(t,e,a){"use strict";a("751f")},c192:function(t,e,a){},c22c:function(t,e,a){"use strict";a("c192")},e6f7:function(t,e,a){}});
//# sourceMappingURL=app.952d3037.js.map