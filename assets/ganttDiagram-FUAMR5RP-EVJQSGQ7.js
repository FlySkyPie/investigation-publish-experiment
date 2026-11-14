import{a as Xe,b as qe,c as He}from"./chunk-7LHMPPIG.js";import{p as _e}from"./chunk-2UOWYFS5.js";import{a as Ue}from"./chunk-QMZO2F76.js";import{$ as ot,O as ee,P as re,U as ie,V as se,W as ae,X as ne,Y as oe,Z as ce,_ as le}from"./chunk-3LHQUH3F.js";import{A as Yt,B as Ot,C as we,a as st,c as ue,d as de,e as fe,f as he,g as vt,h as ke,n as me,o as It,p as Mt,q as Lt,r as At,s as Ft,t as ye,u as ge,v as pe,w as ve,x as Te,y as be,z as xe}from"./chunk-RA6CR2QN.js";import{a as te}from"./chunk-PUVGGRZB.js";import{a as l}from"./chunk-QGDRX5J4.js";import{b as je,c as nt}from"./chunk-3RNHDNP5.js";var De=je((Vt,Rt)=>{(function(t,r){typeof Vt=="object"&&typeof Rt<"u"?Rt.exports=r():typeof define=="function"&&define.amd?define(r):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_customParseFormat=r()})(Vt,(function(){"use strict";var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},r=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,a=/\d/,i=/\d\d/,s=/\d\d?/,k=/\d*[^-_:/,()\s\d]+/,g={},I=function(p){return(p=+p)+(p>68?1900:2e3)},E=function(p){return function(D){this[p]=+D}},$=[/[+-]\d\d:?(\d\d)?|Z/,function(p){(this.zone||(this.zone={})).offset=(function(D){if(!D||D==="Z")return 0;var m=D.match(/([+-]|\d\d)/g),L=60*m[1]+(+m[2]||0);return L===0?0:m[0]==="+"?-L:L})(p)}],F=function(p){var D=g[p];return D&&(D.indexOf?D:D.s.concat(D.f))},U=function(p,D){var m,L=g.meridiem;if(L){for(var W=1;W<=24;W+=1)if(p.indexOf(L(W,0,D))>-1){m=W>12;break}}else m=p===(D?"pm":"PM");return m},R={A:[k,function(p){this.afternoon=U(p,!1)}],a:[k,function(p){this.afternoon=U(p,!0)}],Q:[a,function(p){this.month=3*(p-1)+1}],S:[a,function(p){this.milliseconds=100*+p}],SS:[i,function(p){this.milliseconds=10*+p}],SSS:[/\d{3}/,function(p){this.milliseconds=+p}],s:[s,E("seconds")],ss:[s,E("seconds")],m:[s,E("minutes")],mm:[s,E("minutes")],H:[s,E("hours")],h:[s,E("hours")],HH:[s,E("hours")],hh:[s,E("hours")],D:[s,E("day")],DD:[i,E("day")],Do:[k,function(p){var D=g.ordinal,m=p.match(/\d+/);if(this.day=m[0],D)for(var L=1;L<=31;L+=1)D(L).replace(/\[|\]/g,"")===p&&(this.day=L)}],w:[s,E("week")],ww:[i,E("week")],M:[s,E("month")],MM:[i,E("month")],MMM:[k,function(p){var D=F("months"),m=(F("monthsShort")||D.map((function(L){return L.slice(0,3)}))).indexOf(p)+1;if(m<1)throw new Error;this.month=m%12||m}],MMMM:[k,function(p){var D=F("months").indexOf(p)+1;if(D<1)throw new Error;this.month=D%12||D}],Y:[/[+-]?\d+/,E("year")],YY:[i,function(p){this.year=I(p)}],YYYY:[/\d{4}/,E("year")],Z:$,ZZ:$};function X(p){var D,m;D=p,m=g&&g.formats;for(var L=(p=D.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(q,j,h){var T=h&&h.toUpperCase();return j||m[h]||t[h]||m[T].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(v,y,n){return y||n.slice(1)}))}))).match(r),W=L.length,P=0;P<W;P+=1){var K=L[P],B=R[K],N=B&&B[0],z=B&&B[1];L[P]=z?{regex:N,parser:z}:K.replace(/^\[|\]$/g,"")}return function(q){for(var j={},h=0,T=0;h<W;h+=1){var v=L[h];if(typeof v=="string")T+=v.length;else{var y=v.regex,n=v.parser,d=q.slice(T),f=y.exec(d)[0];n.call(j,f),q=q.replace(f,"")}}return(function(u){var x=u.afternoon;if(x!==void 0){var e=u.hours;x?e<12&&(u.hours+=12):e===12&&(u.hours=0),delete u.afternoon}})(j),j}}return function(p,D,m){m.p.customParseFormat=!0,p&&p.parseTwoDigitYear&&(I=p.parseTwoDigitYear);var L=D.prototype,W=L.parse;L.parse=function(P){var K=P.date,B=P.utc,N=P.args;this.$u=B;var z=N[1];if(typeof z=="string"){var q=N[2]===!0,j=N[3]===!0,h=q||j,T=N[2];j&&(T=N[2]),g=this.$locale(),!q&&T&&(g=m.Ls[T]),this.$d=(function(d,f,u,x){try{if(["x","X"].indexOf(f)>-1)return new Date((f==="X"?1e3:1)*d);var e=X(f)(d),w=e.year,c=e.month,Y=e.day,o=e.hours,b=e.minutes,_=e.seconds,M=e.milliseconds,A=e.zone,C=e.week,S=new Date,tt=Y||(w||c?1:S.getDate()),et=w||S.getFullYear(),lt=0;w&&!c||(lt=c>0?c-1:S.getMonth());var ut,dt=o||0,O=b||0,at=_||0,Q=M||0;return A?new Date(Date.UTC(et,lt,tt,dt,O,at,Q+60*A.offset*1e3)):u?new Date(Date.UTC(et,lt,tt,dt,O,at,Q)):(ut=new Date(et,lt,tt,dt,O,at,Q),C&&(ut=x(ut).week(C).toDate()),ut)}catch{return new Date("")}})(K,z,B,m),this.init(),T&&T!==!0&&(this.$L=this.locale(T).$L),h&&K!=this.format(z)&&(this.$d=new Date("")),g={}}else if(z instanceof Array)for(var v=z.length,y=1;y<=v;y+=1){N[1]=z[y-1];var n=m.apply(this,N);if(n.isValid()){this.$d=n.$d,this.$L=n.$L,this.init();break}y===v&&(this.$d=new Date(""))}else W.call(this,P)}}}))});var Ie=nt(Ue(),1),G=nt(te(),1),Me=nt(Xe(),1),Le=nt(De(),1),Ae=nt(qe(),1),kt=nt(te(),1),Be=nt(He(),1);var Pt=(function(){var t=l(function(y,n,d,f){for(d=d||{},f=y.length;f--;d[y[f]]=n);return d},"o"),r=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],a=[1,26],i=[1,27],s=[1,28],k=[1,29],g=[1,30],I=[1,31],E=[1,32],$=[1,33],F=[1,34],U=[1,9],R=[1,10],X=[1,11],p=[1,12],D=[1,13],m=[1,14],L=[1,15],W=[1,16],P=[1,19],K=[1,20],B=[1,21],N=[1,22],z=[1,23],q=[1,25],j=[1,35],h={trace:l(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:l(function(n,d,f,u,x,e,w){var c=e.length-1;switch(x){case 1:return e[c-1];case 2:this.$=[];break;case 3:e[c-1].push(e[c]),this.$=e[c-1];break;case 4:case 5:this.$=e[c];break;case 6:case 7:this.$=[];break;case 8:u.setWeekday("monday");break;case 9:u.setWeekday("tuesday");break;case 10:u.setWeekday("wednesday");break;case 11:u.setWeekday("thursday");break;case 12:u.setWeekday("friday");break;case 13:u.setWeekday("saturday");break;case 14:u.setWeekday("sunday");break;case 15:u.setWeekend("friday");break;case 16:u.setWeekend("saturday");break;case 17:u.setDateFormat(e[c].substr(11)),this.$=e[c].substr(11);break;case 18:u.enableInclusiveEndDates(),this.$=e[c].substr(18);break;case 19:u.TopAxis(),this.$=e[c].substr(8);break;case 20:u.setAxisFormat(e[c].substr(11)),this.$=e[c].substr(11);break;case 21:u.setTickInterval(e[c].substr(13)),this.$=e[c].substr(13);break;case 22:u.setExcludes(e[c].substr(9)),this.$=e[c].substr(9);break;case 23:u.setIncludes(e[c].substr(9)),this.$=e[c].substr(9);break;case 24:u.setTodayMarker(e[c].substr(12)),this.$=e[c].substr(12);break;case 27:u.setDiagramTitle(e[c].substr(6)),this.$=e[c].substr(6);break;case 28:this.$=e[c].trim(),u.setAccTitle(this.$);break;case 29:case 30:this.$=e[c].trim(),u.setAccDescription(this.$);break;case 31:u.addSection(e[c].substr(8)),this.$=e[c].substr(8);break;case 33:u.addTask(e[c-1],e[c]),this.$="task";break;case 34:this.$=e[c-1],u.setClickEvent(e[c-1],e[c],null);break;case 35:this.$=e[c-2],u.setClickEvent(e[c-2],e[c-1],e[c]);break;case 36:this.$=e[c-2],u.setClickEvent(e[c-2],e[c-1],null),u.setLink(e[c-2],e[c]);break;case 37:this.$=e[c-3],u.setClickEvent(e[c-3],e[c-2],e[c-1]),u.setLink(e[c-3],e[c]);break;case 38:this.$=e[c-2],u.setClickEvent(e[c-2],e[c],null),u.setLink(e[c-2],e[c-1]);break;case 39:this.$=e[c-3],u.setClickEvent(e[c-3],e[c-1],e[c]),u.setLink(e[c-3],e[c-2]);break;case 40:this.$=e[c-1],u.setLink(e[c-1],e[c]);break;case 41:case 47:this.$=e[c-1]+" "+e[c];break;case 42:case 43:case 45:this.$=e[c-2]+" "+e[c-1]+" "+e[c];break;case 44:case 46:this.$=e[c-3]+" "+e[c-2]+" "+e[c-1]+" "+e[c];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(r,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:a,13:i,14:s,15:k,16:g,17:I,18:E,19:18,20:$,21:F,22:U,23:R,24:X,25:p,26:D,27:m,28:L,29:W,30:P,31:K,33:B,35:N,36:z,37:24,38:q,40:j},t(r,[2,7],{1:[2,1]}),t(r,[2,3]),{9:36,11:17,12:a,13:i,14:s,15:k,16:g,17:I,18:E,19:18,20:$,21:F,22:U,23:R,24:X,25:p,26:D,27:m,28:L,29:W,30:P,31:K,33:B,35:N,36:z,37:24,38:q,40:j},t(r,[2,5]),t(r,[2,6]),t(r,[2,17]),t(r,[2,18]),t(r,[2,19]),t(r,[2,20]),t(r,[2,21]),t(r,[2,22]),t(r,[2,23]),t(r,[2,24]),t(r,[2,25]),t(r,[2,26]),t(r,[2,27]),{32:[1,37]},{34:[1,38]},t(r,[2,30]),t(r,[2,31]),t(r,[2,32]),{39:[1,39]},t(r,[2,8]),t(r,[2,9]),t(r,[2,10]),t(r,[2,11]),t(r,[2,12]),t(r,[2,13]),t(r,[2,14]),t(r,[2,15]),t(r,[2,16]),{41:[1,40],43:[1,41]},t(r,[2,4]),t(r,[2,28]),t(r,[2,29]),t(r,[2,33]),t(r,[2,34],{42:[1,42],43:[1,43]}),t(r,[2,40],{41:[1,44]}),t(r,[2,35],{43:[1,45]}),t(r,[2,36]),t(r,[2,38],{42:[1,46]}),t(r,[2,37]),t(r,[2,39])],defaultActions:{},parseError:l(function(n,d){if(d.recoverable)this.trace(n);else{var f=new Error(n);throw f.hash=d,f}},"parseError"),parse:l(function(n){var d=this,f=[0],u=[],x=[null],e=[],w=this.table,c="",Y=0,o=0,b=0,_=2,M=1,A=e.slice.call(arguments,1),C=Object.create(this.lexer),S={yy:{}};for(var tt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,tt)&&(S.yy[tt]=this.yy[tt]);C.setInput(n,S.yy),S.yy.lexer=C,S.yy.parser=this,typeof C.yylloc>"u"&&(C.yylloc={});var et=C.yylloc;e.push(et);var lt=C.options&&C.options.ranges;typeof S.yy.parseError=="function"?this.parseError=S.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function ut(Z){f.length=f.length-2*Z,x.length=x.length-Z,e.length=e.length-Z}l(ut,"popStack");function dt(){var Z;return Z=u.pop()||C.lex()||M,typeof Z!="number"&&(Z instanceof Array&&(u=Z,Z=u.pop()),Z=d.symbols_[Z]||Z),Z}l(dt,"lex");for(var O,at,Q,H,Wr,St,ft={},bt,rt,Jt,xt;;){if(Q=f[f.length-1],this.defaultActions[Q]?H=this.defaultActions[Q]:((O===null||typeof O>"u")&&(O=dt()),H=w[Q]&&w[Q][O]),typeof H>"u"||!H.length||!H[0]){var Et="";xt=[];for(bt in w[Q])this.terminals_[bt]&&bt>_&&xt.push("'"+this.terminals_[bt]+"'");C.showPosition?Et="Parse error on line "+(Y+1)+`:
`+C.showPosition()+`
Expecting `+xt.join(", ")+", got '"+(this.terminals_[O]||O)+"'":Et="Parse error on line "+(Y+1)+": Unexpected "+(O==M?"end of input":"'"+(this.terminals_[O]||O)+"'"),this.parseError(Et,{text:C.match,token:this.terminals_[O]||O,line:C.yylineno,loc:et,expected:xt})}if(H[0]instanceof Array&&H.length>1)throw new Error("Parse Error: multiple actions possible at state: "+Q+", token: "+O);switch(H[0]){case 1:f.push(O),x.push(C.yytext),e.push(C.yylloc),f.push(H[1]),O=null,at?(O=at,at=null):(o=C.yyleng,c=C.yytext,Y=C.yylineno,et=C.yylloc,b>0&&b--);break;case 2:if(rt=this.productions_[H[1]][1],ft.$=x[x.length-rt],ft._$={first_line:e[e.length-(rt||1)].first_line,last_line:e[e.length-1].last_line,first_column:e[e.length-(rt||1)].first_column,last_column:e[e.length-1].last_column},lt&&(ft._$.range=[e[e.length-(rt||1)].range[0],e[e.length-1].range[1]]),St=this.performAction.apply(ft,[c,o,Y,S.yy,H[1],x,e].concat(A)),typeof St<"u")return St;rt&&(f=f.slice(0,-1*rt*2),x=x.slice(0,-1*rt),e=e.slice(0,-1*rt)),f.push(this.productions_[H[1]][0]),x.push(ft.$),e.push(ft._$),Jt=w[f[f.length-2]][f[f.length-1]],f.push(Jt);break;case 3:return!0}}return!0},"parse")},T=(function(){var y={EOF:1,parseError:l(function(d,f){if(this.yy.parser)this.yy.parser.parseError(d,f);else throw new Error(d)},"parseError"),setInput:l(function(n,d){return this.yy=d||this.yy||{},this._input=n,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:l(function(){var n=this._input[0];this.yytext+=n,this.yyleng++,this.offset++,this.match+=n,this.matched+=n;var d=n.match(/(?:\r\n?|\n).*/g);return d?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),n},"input"),unput:l(function(n){var d=n.length,f=n.split(/(?:\r\n?|\n)/g);this._input=n+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-d),this.offset-=d;var u=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),f.length-1&&(this.yylineno-=f.length-1);var x=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:f?(f.length===u.length?this.yylloc.first_column:0)+u[u.length-f.length].length-f[0].length:this.yylloc.first_column-d},this.options.ranges&&(this.yylloc.range=[x[0],x[0]+this.yyleng-d]),this.yyleng=this.yytext.length,this},"unput"),more:l(function(){return this._more=!0,this},"more"),reject:l(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:l(function(n){this.unput(this.match.slice(n))},"less"),pastInput:l(function(){var n=this.matched.substr(0,this.matched.length-this.match.length);return(n.length>20?"...":"")+n.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:l(function(){var n=this.match;return n.length<20&&(n+=this._input.substr(0,20-n.length)),(n.substr(0,20)+(n.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:l(function(){var n=this.pastInput(),d=new Array(n.length+1).join("-");return n+this.upcomingInput()+`
`+d+"^"},"showPosition"),test_match:l(function(n,d){var f,u,x;if(this.options.backtrack_lexer&&(x={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(x.yylloc.range=this.yylloc.range.slice(0))),u=n[0].match(/(?:\r\n?|\n).*/g),u&&(this.yylineno+=u.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:u?u[u.length-1].length-u[u.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+n[0].length},this.yytext+=n[0],this.match+=n[0],this.matches=n,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(n[0].length),this.matched+=n[0],f=this.performAction.call(this,this.yy,this,d,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),f)return f;if(this._backtrack){for(var e in x)this[e]=x[e];return!1}return!1},"test_match"),next:l(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var n,d,f,u;this._more||(this.yytext="",this.match="");for(var x=this._currentRules(),e=0;e<x.length;e++)if(f=this._input.match(this.rules[x[e]]),f&&(!d||f[0].length>d[0].length)){if(d=f,u=e,this.options.backtrack_lexer){if(n=this.test_match(f,x[e]),n!==!1)return n;if(this._backtrack){d=!1;continue}else return!1}else if(!this.options.flex)break}return d?(n=this.test_match(d,x[u]),n!==!1?n:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:l(function(){var d=this.next();return d||this.lex()},"lex"),begin:l(function(d){this.conditionStack.push(d)},"begin"),popState:l(function(){var d=this.conditionStack.length-1;return d>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:l(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:l(function(d){return d=this.conditionStack.length-1-Math.abs(d||0),d>=0?this.conditionStack[d]:"INITIAL"},"topState"),pushState:l(function(d){this.begin(d)},"pushState"),stateStackSize:l(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:l(function(d,f,u,x){var e=x;switch(u){case 0:return this.begin("open_directive"),"open_directive";break;case 1:return this.begin("acc_title"),31;break;case 2:return this.popState(),"acc_title_value";break;case 3:return this.begin("acc_descr"),33;break;case 4:return this.popState(),"acc_descr_value";break;case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 43;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return y})();h.lexer=T;function v(){this.yy={}}return l(v,"Parser"),v.prototype=h,h.Parser=v,new v})();Pt.parser=Pt;var Ze=Pt;G.default.extend(Me.default);G.default.extend(Le.default);G.default.extend(Ae.default);var Ce={friday:5,saturday:6},J="",jt="",Ut=void 0,Xt="",yt=[],gt=[],qt=new Map,Ht=[],Dt=[],pt="",Zt="",Fe=["active","done","crit","milestone","vert"],Gt=[],ht="",Tt=!1,$t=!1,Kt="sunday",Ct="saturday",Nt=0,Ge=l(function(){Ht=[],Dt=[],pt="",Gt=[],wt=0,Bt=void 0,_t=void 0,V=[],J="",jt="",Zt="",Ut=void 0,Xt="",yt=[],gt=[],Tt=!1,$t=!1,Nt=0,qt=new Map,ht="",ie(),Kt="sunday",Ct="saturday"},"clear"),$e=l(function(t){ht=t},"setDiagramId"),Ke=l(function(t){jt=t},"setAxisFormat"),Qe=l(function(){return jt},"getAxisFormat"),Je=l(function(t){Ut=t},"setTickInterval"),tr=l(function(){return Ut},"getTickInterval"),er=l(function(t){Xt=t},"setTodayMarker"),rr=l(function(){return Xt},"getTodayMarker"),ir=l(function(t){J=t},"setDateFormat"),sr=l(function(){Tt=!0},"enableInclusiveEndDates"),ar=l(function(){return Tt},"endDatesAreInclusive"),nr=l(function(){$t=!0},"enableTopAxis"),or=l(function(){return $t},"topAxisEnabled"),cr=l(function(t){Zt=t},"setDisplayMode"),lr=l(function(){return Zt},"getDisplayMode"),ur=l(function(){return J},"getDateFormat"),Ye=l((t,r)=>{let a=r.toLowerCase().split(/[\s,]+/).filter(i=>i!=="");return[...new Set([...t,...a])]},"mergeTokens"),dr=l(function(t){yt=Ye(yt,t)},"setIncludes"),fr=l(function(){return yt},"getIncludes"),hr=l(function(t){gt=Ye(gt,t)},"setExcludes"),kr=l(function(){return gt},"getExcludes"),mr=l(function(){return qt},"getLinks"),yr=l(function(t){pt=t,Ht.push(t)},"addSection"),gr=l(function(){return Ht},"getSections"),pr=l(function(){let t=Se(),r=10,a=0;for(;!t&&a<r;)t=Se(),a++;return Dt=V,Dt},"getTasks"),Oe=l(function(t,r,a,i){let s=t.format(r.trim()),k=t.format("YYYY-MM-DD");return i.includes(s)||i.includes(k)?!1:a.includes("weekends")&&(t.isoWeekday()===Ce[Ct]||t.isoWeekday()===Ce[Ct]+1)||a.includes(t.format("dddd").toLowerCase())?!0:a.includes(s)||a.includes(k)},"isInvalidDate"),vr=l(function(t){Kt=t},"setWeekday"),Tr=l(function(){return Kt},"getWeekday"),br=l(function(t){Ct=t},"setWeekend"),Ve=l(function(t,r,a,i){if(!a.length||t.manualEndTime)return;let s;t.startTime instanceof Date?s=(0,G.default)(t.startTime):s=(0,G.default)(t.startTime,r,!0),s=s.add(1,"d");let k;t.endTime instanceof Date?k=(0,G.default)(t.endTime):k=(0,G.default)(t.endTime,r,!0);let[g,I]=xr(s,k,r,a,i);t.endTime=g.toDate(),t.renderEndTime=I},"checkTaskDates"),xr=l(function(t,r,a,i,s){let k=!1,g=null,I=r.add(1e4,"d");for(;t<=r;){if(k||(g=r.toDate()),k=Oe(t,a,i,s),k&&(r=r.add(1,"d"),r>I))throw new Error("Failed to find a valid date that was not excluded by `excludes` after 10,000 iterations.");t=t.add(1,"d")}return[r,g]},"fixTaskDates"),zt=l(function(t,r,a){if(a=a.trim(),l(I=>{let E=I.trim();return E==="x"||E==="X"},"isTimestampFormat")(r)&&/^\d+$/.test(a))return new Date(Number(a));let k=/^after\s+(?<ids>[\d\w- ]+)/.exec(a);if(k!==null){let I=null;for(let $ of k.groups.ids.split(" ")){let F=ct($);F!==void 0&&(!I||F.endTime>I.endTime)&&(I=F)}if(I)return I.endTime;let E=new Date;return E.setHours(0,0,0,0),E}let g=(0,G.default)(a,r.trim(),!0);if(g.isValid())return g.toDate();{st.debug("Invalid date:"+a),st.debug("With date format:"+r.trim());let I=new Date(a);if(I===void 0||isNaN(I.getTime())||I.getFullYear()<-1e4||I.getFullYear()>1e4)throw new Error("Invalid date:"+a);return I}},"getStartDate"),Re=l(function(t){let r=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return r!==null?[Number.parseFloat(r[1]),r[2]]:[NaN,"ms"]},"parseDuration"),We=l(function(t,r,a,i=!1){a=a.trim();let k=/^until\s+(?<ids>[\d\w- ]+)/.exec(a);if(k!==null){let F=null;for(let R of k.groups.ids.split(" ")){let X=ct(R);X!==void 0&&(!F||X.startTime<F.startTime)&&(F=X)}if(F)return F.startTime;let U=new Date;return U.setHours(0,0,0,0),U}let g=(0,G.default)(a,r.trim(),!0);if(g.isValid())return i&&(g=g.add(1,"d")),g.toDate();let I=(0,G.default)(t),[E,$]=Re(a);if(!Number.isNaN(E)){let F=I.add(E,$);F.isValid()&&(I=F)}return I.toDate()},"getEndDate"),wt=0,mt=l(function(t){return t===void 0?(wt=wt+1,"task"+wt):t},"parseId"),wr=l(function(t,r){let a;r.substr(0,1)===":"?a=r.substr(1,r.length):a=r;let i=a.split(","),s={};Qt(i,s,Fe);for(let g=0;g<i.length;g++)i[g]=i[g].trim();let k="";switch(i.length){case 1:s.id=mt(),s.startTime=t.endTime,k=i[0];break;case 2:s.id=mt(),s.startTime=zt(void 0,J,i[0]),k=i[1];break;case 3:s.id=mt(i[0]),s.startTime=zt(void 0,J,i[1]),k=i[2];break;default:}return k&&(s.endTime=We(s.startTime,J,k,Tt),s.manualEndTime=(0,G.default)(k,"YYYY-MM-DD",!0).isValid(),Ve(s,J,gt,yt)),s},"compileData"),_r=l(function(t,r){let a;r.substr(0,1)===":"?a=r.substr(1,r.length):a=r;let i=a.split(","),s={};Qt(i,s,Fe);for(let k=0;k<i.length;k++)i[k]=i[k].trim();switch(i.length){case 1:s.id=mt(),s.startTime={type:"prevTaskEnd",id:t},s.endTime={data:i[0]};break;case 2:s.id=mt(),s.startTime={type:"getStartDate",startData:i[0]},s.endTime={data:i[1]};break;case 3:s.id=mt(i[0]),s.startTime={type:"getStartDate",startData:i[1]},s.endTime={data:i[2]};break;default:}return s},"parseData"),Bt,_t,V=[],Pe={},Dr=l(function(t,r){let a={section:pt,type:pt,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:r},task:t,classes:[]},i=_r(_t,r);a.raw.startTime=i.startTime,a.raw.endTime=i.endTime,a.id=i.id,a.prevTaskId=_t,a.active=i.active,a.done=i.done,a.crit=i.crit,a.milestone=i.milestone,a.vert=i.vert,a.vert?a.order=-1:(a.order=Nt,Nt++);let s=V.push(a);_t=a.id,Pe[a.id]=s-1},"addTask"),ct=l(function(t){let r=Pe[t];return V[r]},"findTaskById"),Cr=l(function(t,r){let a={section:pt,type:pt,description:t,task:t,classes:[]},i=wr(Bt,r);a.startTime=i.startTime,a.endTime=i.endTime,a.id=i.id,a.active=i.active,a.done=i.done,a.crit=i.crit,a.milestone=i.milestone,a.vert=i.vert,Bt=a,Dt.push(a)},"addTaskOrg"),Se=l(function(){let t=l(function(a){let i=V[a],s="";switch(V[a].raw.startTime.type){case"prevTaskEnd":{let k=ct(i.prevTaskId);i.startTime=k.endTime;break}case"getStartDate":s=zt(void 0,J,V[a].raw.startTime.startData),s&&(V[a].startTime=s);break}return V[a].startTime&&(V[a].endTime=We(V[a].startTime,J,V[a].raw.endTime.data,Tt),V[a].endTime&&(V[a].processed=!0,V[a].manualEndTime=(0,G.default)(V[a].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),Ve(V[a],J,gt,yt))),V[a].processed},"compileTask"),r=!0;for(let[a,i]of V.entries())t(a),r=r&&i.processed;return r},"compileTasks"),Sr=l(function(t,r){let a=r;ot().securityLevel!=="loose"&&(a=(0,Ie.sanitizeUrl)(r)),t.split(",").forEach(function(i){ct(i)!==void 0&&(ze(i,()=>{window.open(a,"_self")}),qt.set(i,a))}),Ne(t,"clickable")},"setLink"),Ne=l(function(t,r){t.split(",").forEach(function(a){let i=ct(a);i!==void 0&&i.classes.push(r)})},"setClass"),Er=l(function(t,r,a){if(ot().securityLevel!=="loose"||r===void 0)return;let i=[];if(typeof a=="string"){i=a.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let k=0;k<i.length;k++){let g=i[k].trim();g.startsWith('"')&&g.endsWith('"')&&(g=g.substr(1,g.length-2)),i[k]=g}}i.length===0&&i.push(t),ct(t)!==void 0&&ze(t,()=>{_e.runFunc(r,...i)})},"setClickFun"),ze=l(function(t,r){Gt.push(function(){let a=ht?`${ht}-${t}`:t,i=document.querySelector(`[id="${a}"]`);i!==null&&i.addEventListener("click",function(){r()})},function(){let a=ht?`${ht}-${t}`:t,i=document.querySelector(`[id="${a}-text"]`);i!==null&&i.addEventListener("click",function(){r()})})},"pushFun"),Ir=l(function(t,r,a){t.split(",").forEach(function(i){Er(i,r,a)}),Ne(t,"clickable")},"setClickEvent"),Mr=l(function(t){Gt.forEach(function(r){r(t)})},"bindFunctions"),Lr={getConfig:l(()=>ot().gantt,"getConfig"),clear:Ge,setDateFormat:ir,getDateFormat:ur,enableInclusiveEndDates:sr,endDatesAreInclusive:ar,enableTopAxis:nr,topAxisEnabled:or,setAxisFormat:Ke,getAxisFormat:Qe,setTickInterval:Je,getTickInterval:tr,setTodayMarker:er,getTodayMarker:rr,setAccTitle:se,getAccTitle:ae,setDiagramTitle:ce,getDiagramTitle:le,setDiagramId:$e,setDisplayMode:cr,getDisplayMode:lr,setAccDescription:ne,getAccDescription:oe,addSection:yr,getSections:gr,getTasks:pr,addTask:Dr,findTaskById:ct,addTaskOrg:Cr,setIncludes:dr,getIncludes:fr,setExcludes:hr,getExcludes:kr,setClickEvent:Ir,setLink:Sr,getLinks:mr,bindFunctions:Mr,parseDuration:Re,isInvalidDate:Oe,setWeekday:vr,getWeekday:Tr,setWeekend:br};function Qt(t,r,a){let i=!0;for(;i;)i=!1,a.forEach(function(s){let k="^\\s*"+s+"\\s*$",g=new RegExp(k);t[0].match(g)&&(r[s]=!0,t.shift(1),i=!0)})}l(Qt,"getTaskTags");kt.default.extend(Be.default);var Ar=l(function(){st.debug("Something is calling, setConf, remove the call")},"setConf"),Ee={monday:ge,tuesday:pe,wednesday:ve,thursday:Te,friday:be,saturday:xe,sunday:ye},Fr=l((t,r)=>{let a=[...t].map(()=>-1/0),i=[...t].sort((k,g)=>k.startTime-g.startTime||k.order-g.order),s=0;for(let k of i)for(let g=0;g<a.length;g++)if(k.startTime>=a[g]){a[g]=k.endTime,k.order=g+r,g>s&&(s=g);break}return s},"getMaxIntersections"),it,Wt=1e4,Yr=l(function(t,r,a,i){let s=ot().gantt;i.db.setDiagramId(r);let k=ot().securityLevel,g;k==="sandbox"&&(g=vt("#i"+r));let I=k==="sandbox"?vt(g.nodes()[0].contentDocument.body):vt("body"),E=k==="sandbox"?g.nodes()[0].contentDocument:document,$=E.getElementById(r);it=$.parentElement.offsetWidth,it===void 0&&(it=1200),s.useWidth!==void 0&&(it=s.useWidth);let F=i.db.getTasks(),U=F.filter(h=>!h.vert),R=[];for(let h of U)R.push(h.type);R=j(R);let X={},p=2*s.topPadding;if(i.db.getDisplayMode()==="compact"||s.displayMode==="compact"){let h={};for(let v of U)h[v.section]===void 0?h[v.section]=[v]:h[v.section].push(v);let T=0;for(let v of Object.keys(h)){let y=Fr(h[v],T)+1;T+=y,p+=y*(s.barHeight+s.barGap),X[v]=y}}else{p+=U.length*(s.barHeight+s.barGap);for(let h of R)X[h]=U.filter(T=>T.type===h).length}$.setAttribute("viewBox","0 0 "+it+" "+p);let D=I.select(`[id="${r}"]`),m=we().domain([de(F,function(h){return h.startTime}),ue(F,function(h){return h.endTime})]).rangeRound([0,it-s.leftPadding-s.rightPadding]);function L(h,T){let v=h.startTime,y=T.startTime,n=0;return v>y?n=1:v<y&&(n=-1),n}l(L,"taskCompare"),F.sort(L),W(F,it,p),re(D,p,it,s.useMaxWidth),D.append("text").text(i.db.getDiagramTitle()).attr("x",it/2).attr("y",s.titleTopMargin).attr("class","titleText");function W(h,T,v){let y=s.barHeight,n=y+s.barGap,d=s.topPadding,f=s.leftPadding,u=me().domain([0,R.length]).range(["#00B9FA","#F95002"]).interpolate(ke);K(n,d,f,T,v,h,i.db.getExcludes(),i.db.getIncludes()),N(f,d,T,v),P(h,n,d,f,y,u,T,v),z(n,d,f,y,u),q(f,d,T,v)}l(W,"makeGantt");function P(h,T,v,y,n,d,f){h.sort((o,b)=>o.vert===b.vert?0:o.vert?1:-1);let u=h.filter(o=>!o.vert),e=[...new Set(u.map(o=>o.order))].map(o=>u.find(b=>b.order===o));D.append("g").selectAll("rect").data(e).enter().append("rect").attr("x",0).attr("y",function(o,b){return b=o.order,b*T+v-2}).attr("width",function(){return f-s.rightPadding/2}).attr("height",T).attr("class",function(o){for(let[b,_]of R.entries())if(o.type===_)return"section section"+b%s.numberSectionStyles;return"section section0"}).enter();let w=D.append("g").selectAll("rect").data(h).enter(),c=i.db.getLinks();if(w.append("rect").attr("id",function(o){return r+"-"+o.id}).attr("rx",3).attr("ry",3).attr("x",function(o){return o.milestone?m(o.startTime)+y+.5*(m(o.endTime)-m(o.startTime))-.5*n:m(o.startTime)+y}).attr("y",function(o,b){return b=o.order,o.vert?s.gridLineStartPadding:b*T+v}).attr("width",function(o){return o.milestone?n:o.vert?.08*n:m(o.renderEndTime||o.endTime)-m(o.startTime)}).attr("height",function(o){return o.vert?u.length*(s.barHeight+s.barGap)+s.barHeight*2:n}).attr("transform-origin",function(o,b){return b=o.order,(m(o.startTime)+y+.5*(m(o.endTime)-m(o.startTime))).toString()+"px "+(b*T+v+.5*n).toString()+"px"}).attr("class",function(o){let b="task",_="";o.classes.length>0&&(_=o.classes.join(" "));let M=0;for(let[C,S]of R.entries())o.type===S&&(M=C%s.numberSectionStyles);let A="";return o.active?o.crit?A+=" activeCrit":A=" active":o.done?o.crit?A=" doneCrit":A=" done":o.crit&&(A+=" crit"),A.length===0&&(A=" task"),o.milestone&&(A=" milestone "+A),o.vert&&(A=" vert "+A),A+=M,A+=" "+_,b+A}),w.append("text").attr("id",function(o){return r+"-"+o.id+"-text"}).text(function(o){return o.task}).attr("font-size",s.fontSize).attr("x",function(o){let b=m(o.startTime),_=m(o.renderEndTime||o.endTime);if(o.milestone&&(b+=.5*(m(o.endTime)-m(o.startTime))-.5*n,_=b+n),o.vert)return m(o.startTime)+y;let M=this.getBBox().width;return M>_-b?_+M+1.5*s.leftPadding>f?b+y-5:_+y+5:(_-b)/2+b+y}).attr("y",function(o,b){return o.vert?s.gridLineStartPadding+u.length*(s.barHeight+s.barGap)+60:(b=o.order,b*T+s.barHeight/2+(s.fontSize/2-2)+v)}).attr("text-height",n).attr("class",function(o){let b=m(o.startTime),_=m(o.endTime);o.milestone&&(_=b+n);let M=this.getBBox().width,A="";o.classes.length>0&&(A=o.classes.join(" "));let C=0;for(let[tt,et]of R.entries())o.type===et&&(C=tt%s.numberSectionStyles);let S="";return o.active&&(o.crit?S="activeCritText"+C:S="activeText"+C),o.done?o.crit?S=S+" doneCritText"+C:S=S+" doneText"+C:o.crit&&(S=S+" critText"+C),o.milestone&&(S+=" milestoneText"),o.vert&&(S+=" vertText"),M>_-b?_+M+1.5*s.leftPadding>f?A+" taskTextOutsideLeft taskTextOutside"+C+" "+S:A+" taskTextOutsideRight taskTextOutside"+C+" "+S+" width-"+M:A+" taskText taskText"+C+" "+S+" width-"+M}),ot().securityLevel==="sandbox"){let o;o=vt("#i"+r);let b=o.nodes()[0].contentDocument;w.filter(function(_){return c.has(_.id)}).each(function(_){var M=b.querySelector("#"+CSS.escape(r+"-"+_.id)),A=b.querySelector("#"+CSS.escape(r+"-"+_.id+"-text"));let C=M.parentNode;var S=b.createElement("a");S.setAttribute("xlink:href",c.get(_.id)),S.setAttribute("target","_top"),C.appendChild(S),S.appendChild(M),S.appendChild(A)})}}l(P,"drawRects");function K(h,T,v,y,n,d,f,u){if(f.length===0&&u.length===0)return;let x,e;for(let{startTime:_,endTime:M}of d)(x===void 0||_<x)&&(x=_),(e===void 0||M>e)&&(e=M);if(!x||!e)return;if((0,kt.default)(e).diff((0,kt.default)(x),"year")>5){st.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}let w=i.db.getDateFormat(),c=[],Y=null,o=(0,kt.default)(x);for(;o.valueOf()<=e;)i.db.isInvalidDate(o,w,f,u)?Y?Y.end=o:Y={start:o,end:o}:Y&&(c.push(Y),Y=null),o=o.add(1,"d");D.append("g").selectAll("rect").data(c).enter().append("rect").attr("id",_=>r+"-exclude-"+_.start.format("YYYY-MM-DD")).attr("x",_=>m(_.start.startOf("day"))+v).attr("y",s.gridLineStartPadding).attr("width",_=>m(_.end.endOf("day"))-m(_.start.startOf("day"))).attr("height",n-T-s.gridLineStartPadding).attr("transform-origin",function(_,M){return(m(_.start)+v+.5*(m(_.end)-m(_.start))).toString()+"px "+(M*h+.5*n).toString()+"px"}).attr("class","exclude-range")}l(K,"drawExcludeDays");function B(h,T,v,y){if(v<=0||h>T)return 1/0;let n=T-h,d=kt.default.duration({[y??"day"]:v}).asMilliseconds();return d<=0?1/0:Math.ceil(n/d)}l(B,"getEstimatedTickCount");function N(h,T,v,y){let n=i.db.getDateFormat(),d=i.db.getAxisFormat(),f;d?f=d:n==="D"?f="%d":f=s.axisFormat??"%Y-%m-%d";let u=he(m).tickSize(-y+T+s.gridLineStartPadding).tickFormat(Ot(f)),e=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(i.db.getTickInterval()||s.tickInterval);if(e!==null){let w=parseInt(e[1],10);if(isNaN(w)||w<=0)st.warn(`Invalid tick interval value: "${e[1]}". Skipping custom tick interval.`);else{let c=e[2],Y=i.db.getWeekday()||s.weekday,o=m.domain(),b=o[0],_=o[1],M=B(b,_,w,c);if(M>Wt)st.warn(`The tick interval "${w}${c}" would generate ${M} ticks, which exceeds the maximum allowed (${Wt}). This may indicate an invalid date or time range. Skipping custom tick interval.`);else switch(c){case"millisecond":u.ticks(It.every(w));break;case"second":u.ticks(Mt.every(w));break;case"minute":u.ticks(Lt.every(w));break;case"hour":u.ticks(At.every(w));break;case"day":u.ticks(Ft.every(w));break;case"week":u.ticks(Ee[Y].every(w));break;case"month":u.ticks(Yt.every(w));break}}}if(D.append("g").attr("class","grid").attr("transform","translate("+h+", "+(y-50)+")").call(u).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),i.db.topAxisEnabled()||s.topAxis){let w=fe(m).tickSize(-y+T+s.gridLineStartPadding).tickFormat(Ot(f));if(e!==null){let c=parseInt(e[1],10);if(isNaN(c)||c<=0)st.warn(`Invalid tick interval value: "${e[1]}". Skipping custom tick interval.`);else{let Y=e[2],o=i.db.getWeekday()||s.weekday,b=m.domain(),_=b[0],M=b[1];if(B(_,M,c,Y)<=Wt)switch(Y){case"millisecond":w.ticks(It.every(c));break;case"second":w.ticks(Mt.every(c));break;case"minute":w.ticks(Lt.every(c));break;case"hour":w.ticks(At.every(c));break;case"day":w.ticks(Ft.every(c));break;case"week":w.ticks(Ee[o].every(c));break;case"month":w.ticks(Yt.every(c));break}}}D.append("g").attr("class","grid").attr("transform","translate("+h+", "+T+")").call(w).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}l(N,"makeGrid");function z(h,T){let v=0,y=Object.keys(X).map(n=>[n,X[n]]);D.append("g").selectAll("text").data(y).enter().append(function(n){let d=n[0].split(ee.lineBreakRegex),f=-(d.length-1)/2,u=E.createElementNS("http://www.w3.org/2000/svg","text");u.setAttribute("dy",f+"em");for(let[x,e]of d.entries()){let w=E.createElementNS("http://www.w3.org/2000/svg","tspan");w.setAttribute("alignment-baseline","central"),w.setAttribute("x","10"),x>0&&w.setAttribute("dy","1em"),w.textContent=e,u.appendChild(w)}return u}).attr("x",10).attr("y",function(n,d){if(d>0)for(let f=0;f<d;f++)return v+=y[d-1][1],n[1]*h/2+v*h+T;else return n[1]*h/2+T}).attr("font-size",s.sectionFontSize).attr("class",function(n){for(let[d,f]of R.entries())if(n[0]===f)return"sectionTitle sectionTitle"+d%s.numberSectionStyles;return"sectionTitle"})}l(z,"vertLabels");function q(h,T,v,y){let n=i.db.getTodayMarker();if(n==="off")return;let d=D.append("g").attr("class","today"),f=new Date,u=d.append("line");u.attr("x1",m(f)+h).attr("x2",m(f)+h).attr("y1",s.titleTopMargin).attr("y2",y-s.titleTopMargin).attr("class","today"),n!==""&&u.attr("style",n.replace(/,/g,";"))}l(q,"drawToday");function j(h){let T={},v=[];for(let y=0,n=h.length;y<n;++y)Object.prototype.hasOwnProperty.call(T,h[y])||(T[h[y]]=!0,v.push(h[y]));return v}l(j,"checkUnique")},"draw"),Or={setConf:Ar,draw:Yr},Vr=l(t=>`
  .mermaid-main-font {
        font-family: ${t.fontFamily};
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${t.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  /* Done task text displayed outside the bar sits against the diagram background,
     not against the done-task bar, so it must use the outside/contrast color. */
  .doneText0.taskTextOutsideLeft,
  .doneText0.taskTextOutsideRight,
  .doneText1.taskTextOutsideLeft,
  .doneText1.taskTextOutsideRight,
  .doneText2.taskTextOutsideLeft,
  .doneText2.taskTextOutsideRight,
  .doneText3.taskTextOutsideLeft,
  .doneText3.taskTextOutsideRight {
    fill: ${t.taskTextOutsideColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  /* Done-crit task text outside the bar \u2014 same reasoning as doneText above. */
  .doneCritText0.taskTextOutsideLeft,
  .doneCritText0.taskTextOutsideRight,
  .doneCritText1.taskTextOutsideLeft,
  .doneCritText1.taskTextOutsideRight,
  .doneCritText2.taskTextOutsideLeft,
  .doneCritText2.taskTextOutsideRight,
  .doneCritText3.taskTextOutsideLeft,
  .doneCritText3.taskTextOutsideRight {
    fill: ${t.taskTextOutsideColor} !important;
  }

  .vert {
    stroke: ${t.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${t.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: ${t.fontFamily};
  }
`,"getStyles"),Rr=Vr,Ur={parser:Ze,db:Lr,renderer:Or,styles:Rr};export{Ur as diagram};
