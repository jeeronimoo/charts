(this["webpackJsonpcharts-2"]=this["webpackJsonpcharts-2"]||[]).push([[0],{102:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),l=a(14),i=a.n(l),o=(a(92),a(6)),c=a(7),u=a(9),s=a(8),d=(a(93),a(108)),p=a(109),h=a(3),v=(a(94),function(t){Object(u.a)(a,t);var e=Object(s.a)(a);function a(){var t;Object(o.a)(this,a);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(t=e.call.apply(e,[this].concat(l))).svgRef=Object(n.createRef)(),t.componentDidUpdate=function(){t.renderChart()},t.getMainCalculations=function(){var e=t.props,a=e.data,n=e.width,r=e.height,l=n-m.left-m.right,i=r-m.top-m.bottom,o=h.f(a.map((function(t){return t.value})))||0,c=h.g(a.map((function(t){return t.value})))||0;return{plotWidth:l,plotHeight:i,yMaxDomain:o,yMinDomain:c>0?0:c}},t.getScales=function(){var e=t.props.data,a=t.getMainCalculations(),n=a.plotWidth,r=a.plotHeight,l=a.yMaxDomain,i=a.yMinDomain,o=h.k().domain([i,l]).rangeRound([r,0]);return{xScale:h.j().domain(h.i(e.length)).rangeRound([0,n]).padding(.4),yScale:o}},t.renderAxes=function(){var e=t.props.data,a=t.getMainCalculations().plotHeight,n=t.getScales(),r=n.xScale,l=n.yScale;t.plot.append("g").attr("class","xAxis").attr("transform","translate(0,".concat(a,")")).call(h.b(r).tickFormat((function(t){return e[t].name}))).selectAll("text").style("text-anchor","end").attr("dx","-10px").attr("dy","-1px").attr("transform","rotate(-45)"),t.plot.append("g").attr("class","yAxis").call(h.c(l))},t.updateAxes=function(){var e=t.props.data,a=t.getScales(),n=a.xScale,r=a.yScale;t.plot.select(".xAxis").transition().duration(500).call(h.b(n).tickFormat((function(t){return e[t].name}))),t.plot.select(".yAxis").transition().duration(500).call(h.c(r))},t.renderChart=function(){var e=t.props.data,a=t.getMainCalculations().plotHeight,n=t.getScales(),r=n.xScale,l=n.yScale;t.plot?(t.plot.selectAll("#tooltip").remove(),t.updateAxes()):(t.plot=h.n(t.svgRef.current).append("g").attr("transform","translate(".concat(m.left,", ").concat(m.top,")")),t.renderAxes()),t.plot.selectAll("rect").data(e).join("rect").on("mouseover",t.handleMouseOver).on("mouseout",t.handleMouseOut).attr("fill","steelblue").attr("opacity","0.6").attr("width",r.bandwidth()).attr("height",(function(t){return a-l(t.value)})).attr("x",(function(t,e){return r(e)})).attr("y",(function(t){return l(t.value)}))},t.handleMouseOver=function(e,a,n){var r=t.props.data,l=t.getScales(),i=l.xScale,o=l.yScale;t.plot.selectAll("rect").data(r).attr("opacity",(function(t,e){return e===a?"1":"0.6"}));var c=e.value>99?3:0;t.plot.append("text").attr("id","tooltip").attr("x",i(a)-c).attr("y",o(e.value)-5).text(e.value),t.plot.select("#".concat(e.name,"-").concat(e.value))},t.handleMouseOut=function(e,a,n){var r=t.props.data;t.plot.selectAll("rect").data(r).attr("opacity","0.6"),t.plot.selectAll("#tooltip").remove()},t}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.renderChart()}},{key:"render",value:function(){var t=this.props,e=t.width,a=t.height;return(r.a.createElement("div",{style:{width:e,height:a,border:"1px solid black"}},r.a.createElement("svg",{ref:this.svgRef,width:e,height:a})))}}]),a}(n.PureComponent)),m={top:30,right:30,bottom:50,left:30},f=function(){return Math.round(10*Math.random())*Math.round(100*Math.random())},g=[{name:"Andy",value:10},{name:"James",value:30},{name:"Cris",value:20},{name:"Susan",value:10},{name:"Ted",value:50},{name:"Mark",value:30},{name:"Julia",value:55},{name:"Zack",value:42}],y=function(){return g.map((function(t){var e=t.name;t.value;return{name:e,value:f()}}))},b=a(105),x=a(106),M=a(107),k=function(t){Object(u.a)(a,t);var e=Object(s.a)(a);function a(){var t;Object(o.a)(this,a);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(t=e.call.apply(e,[this].concat(l))).svgRef=Object(n.createRef)(),t.getMainCalculations=function(){var e=t.props,a=e.width,n=e.height,r=e.data,l=a-w.left-w.right,i=n-w.top-w.bottom,o=h.g(r.map((function(t){return t.value})))||0,c=h.f(r.map((function(t){return t.value})))||0,u=o>0?0:o,s=Date.now();return{plotWidth:l,plotHeight:i,yMaxDomain:c,yMinDomain:u,xMaxDomain:h.f(r.map((function(t){return t.date})))||s,xMinDomain:h.g(r.map((function(t){return t.date})))||s}},t.getScales=function(){var e=t.getMainCalculations(),a=e.plotWidth,n=e.plotHeight,r=e.yMaxDomain,l=e.yMinDomain,i=e.xMaxDomain,o=e.xMinDomain,c=h.k().domain([l,r]).rangeRound([n,0]);return{xScale:h.m().domain([o,i]).rangeRound([0,a]),yScale:c}},t.renderChart=function(){var e=t.props.data,a=t.getScales(),n=a.xScale,r=a.yScale;t.plot||(t.plot=h.n(t.svgRef.current).append("g").attr("transform","translate(".concat(w.left,", ").concat(w.top,")")),t.renderAxes());var l=h.e().x((function(t){return n(t.date)})).y((function(t){return r(t.value)})).curve(h.d);t.plot.append("path").datum(e).attr("class","line").attr("d",l).attr("fill","none").attr("opacity","0.6").attr("stroke","steelblue").attr("stroke-width",2),t.plot.selectAll(".dot").data(e).enter().append("circle").attr("class","dot").attr("opacity","0.6").attr("fill","steelblue").attr("cx",(function(t,e){return n(t.date)})).attr("cy",(function(t){return r(t.value)})).attr("r",5).append("title").text((function(t){return t.value}))},t.renderAxes=function(){var e=t.props.data,a=t.getMainCalculations().plotHeight,n=t.getScales(),r=n.xScale,l=n.yScale,i=h.b(r).tickFormat((function(t){return Object(M.a)(t,"dd.MM.yy")})).ticks(e.length);t.plot.append("g").attr("class","xAxis").attr("transform","translate(0,".concat(a,")")).call(i),t.plot.append("g").attr("class","yAxis").call(h.c(l))},t}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.renderChart()}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){var t=this.props,e=t.width,a=t.height;return(r.a.createElement("div",{style:{width:e,height:a,border:"1px solid black"}},r.a.createElement("svg",{ref:this.svgRef,width:e,height:a})))}}]),a}(n.PureComponent),w={top:30,right:30,bottom:30,left:30},A=[{date:new Date(2019,1,10).getTime(),value:20},{date:new Date(2019,1,11).getTime(),value:30},{date:new Date(2019,1,12).getTime(),value:25},{date:new Date(2019,1,13).getTime(),value:40}],C=[{name:"Malcolm",value:130},{name:"Eva",value:80},{name:"Julia",value:225}],E=function(t){Object(u.a)(a,t);var e=Object(s.a)(a);function a(){var t;Object(o.a)(this,a);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(t=e.call.apply(e,[this].concat(l))).svgRef=Object(n.createRef)(),t.getMainCalculations=function(){var e=t.props,a=e.width,n=e.height;return{plotWidth:a-j.left-j.right,plotHeight:n-j.top-j.bottom}},t.renderChart=function(){var e=t.props.data,a=t.getMainCalculations(),n=a.plotWidth,r=a.plotHeight;t.plot||(t.plot=h.n(t.svgRef.current).append("g").attr("transform","translate(".concat(j.left,", ").concat(j.top,")")));var l=h.l(["#4daf4a","#377eb8","#ff7f00","#984ea3","#e41a1c"]),i=h.g([n,r])/2,o=h.a().innerRadius(0).outerRadius(i),c=h.h().value((function(t){return t.value}))(e);t.plot.append("g").attr("transform","translate(".concat(i,", ").concat(i,")")).attr("stroke","white").selectAll("path").data(c).join("path").attr("fill",(function(t,e){return l(e)})).attr("d",o).append("title").text((function(t){return"".concat(t.data.name,": ").concat(t.data.value)}))},t}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.renderChart()}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){var t=this.props,e=t.width,a=t.height;return(r.a.createElement("div",{style:{width:e,height:a,border:"1px solid black"}},r.a.createElement("svg",{ref:this.svgRef,width:e,height:a})))}}]),a}(n.PureComponent),j={top:30,right:30,bottom:30,left:30},D=function(t){Object(u.a)(a,t);var e=Object(s.a)(a);function a(){var t;Object(o.a)(this,a);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(t=e.call.apply(e,[this].concat(l))).state={updateTime:0,barNameValue:y(),lineDateValue:A},t.clearInterval=function(){window.clearInterval(t.intervalRef)},t.setInterval=function(e){t.intervalRef=setInterval(t.changeData,e)},t.changeData=function(){t.setState({barNameValue:y()})},t.changeUpdateTime=function(e){return function(){t.clearInterval(),t.setState({updateTime:e}),0!==e&&t.setInterval(e)}},t.isActive=function(e){return t.state.updateTime===e},t.renderSwitcher=function(){return r.a.createElement(b.a,{"aria-label":"Basic example"},r.a.createElement(x.a,{variant:"info",onClick:t.changeUpdateTime(0),active:t.isActive(0)},"None"),r.a.createElement(x.a,{variant:"info",onClick:t.changeUpdateTime(2e3),active:t.isActive(2e3)},"2s"),r.a.createElement(x.a,{variant:"info",onClick:t.changeUpdateTime(5e3),active:t.isActive(5e3)},"5s"),r.a.createElement(x.a,{variant:"info",onClick:t.changeUpdateTime(1e4),active:t.isActive(1e4)},"10s"))},t}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.changeUpdateTime(this.state.updateTime)()}},{key:"componentWillUnmount",value:function(){this.clearInterval()}},{key:"render",value:function(){return r.a.createElement("div",{style:{padding:10}},r.a.createElement("div",{style:{display:"flex",justifyContent:"space-around"}},r.a.createElement(v,{width:300,height:300,data:this.state.barNameValue}),r.a.createElement(k,{width:300,height:300,data:this.state.lineDateValue}),r.a.createElement(E,{data:C,width:300,height:300})))}}]),a}(n.PureComponent),S=function(t){Object(u.a)(a,t);var e=Object(s.a)(a);function a(){var t;Object(o.a)(this,a);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(t=e.call.apply(e,[this].concat(l))).state={module:"d3"},t.renderModule=function(){switch(t.state.module){case"d3":return r.a.createElement(D,null);case"dc":case"svg":return null}},t.selectModule=function(e){return function(){t.setState({module:e})}},t}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(d.a,{bg:"light",expand:"sm"},r.a.createElement(d.a.Brand,{href:"#d3"},"Charts"),r.a.createElement(d.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(d.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(p.a,{className:"mr-auto",variant:"pills",defaultActiveKey:"#d3"},r.a.createElement(p.a.Link,{href:"#d3",onClick:this.selectModule("d3")},"D3.js"),r.a.createElement(p.a.Link,{href:"#dc",onClick:this.selectModule("dc")},"Dc.js"),r.a.createElement(p.a.Link,{href:"#svg",onClick:this.selectModule("svg")},"svg")))),r.a.createElement("div",null,this.renderModule()))}}]),a}(n.PureComponent);a(101);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(S,null)),document.getElementById("root"))},87:function(t,e,a){t.exports=a(102)},92:function(t,e,a){},93:function(t,e,a){},94:function(t,e,a){}},[[87,1,2]]]);
//# sourceMappingURL=main.dbc5c580.chunk.js.map