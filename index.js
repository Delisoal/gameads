(async function(){
  function id(id){
    return document.getElementById(id);
  }
  await fetch("header.html").then(function(data){
    return data.text();
  }).then(function(innerHTML){
    document.body.insertAdjacentHTML("afterbegin",innerHTML);
  });
  let animationspeed=32;
  let typespeed=90;
  if(id("source")){
    let main=document.createElement("div");
    main.classList.add("main");
    main.innerHTML=`<div id="content"></div><div id="sidemenu"></div>`;
    let source=id("source");
    source.after(main);
    id("content").innerHTML=source.innerHTML;
    source.remove();
  }
  let loadElement=document.createElement("div");
  loadElement.classList.add("loadbox");
  loadElement.classList.add("noanimation");
  loadElement.innerHTML="Now Loading...";
  document.body.appendChild(loadElement);
  document.querySelectorAll("body *:not(.noanimation)").forEach(function(element){
    element.childNodes.forEach(function(text){
      if(text.nodeType===text.TEXT_NODE&&text.nodeValue.trim()!=""){
        let span=document.createElement("span");
        span.setAttribute("origin",text.nodeValue);
        span.classList.add("vir");
        text.after(span);
        text.remove();
        let intervalNum=setInterval(function(){
          let arraydt=[];
          for(let i="!".charCodeAt(0);i<="~".charCodeAt(0);i++){
            arraydt.push(String.fromCharCode(i));
          }
          if(span.classList.contains("stop")){
            clearInterval(intervalNum);
            span.innerHTML=span.getAttribute("origin").split("").map(function(str,i){let space=str.match(/\s|\n|\t/g);let fullWidth=str.match(/^[^ -~｡-ﾟ]/);return `<span class="letter">${str}</span><span class="before" style="display:inline-block;width:${fullWidth?"1em":"0.5em"};">${space?"":span.textContent.split("")[i]}</span>`}).join("");
            span.querySelectorAll(".before").forEach(function(before){
              setInterval(function(){
                before.innerHTML=arraydt[Math.round(Math.random()*(arraydt.length-1))];
              },animationspeed);
            });
            span.querySelectorAll(".letter").forEach(function(letter,i){
              setTimeout(function(){
                letter.style.display="inline";
                span.querySelectorAll(".before")[i].style.display="none";
                span.querySelectorAll(".letter").forEach(function(allEl){
                  if(allEl==letter){
                    allEl.style.setProperty("--display","inline");
                  }
                  else{
                    allEl.style.setProperty("--display","");
                  }
                });
              },typespeed*i);
              setTimeout(function(){
                span.innerHTML=span.getAttribute("origin");
              },typespeed*span.querySelectorAll(".letter").length);
            });
          }
          else{
            span.innerHTML="";
            for(let i=0;i<span.getAttribute("origin").length;i++){
              let space=span.getAttribute("origin").split("")[i].match(/\s|\n|\t/g);
              let fullWidth=span.getAttribute("origin").split("")[i].match(/^[^ -~｡-ﾟ]/);
              span.innerHTML+=`<span style="display:inline-block;width:${fullWidth?"1em":"0.5em"};">${(space?space[0]:null)||arraydt[Math.round(Math.random()*(arraydt.length-1))]}</span>`;
            }
          }
        },animationspeed);
      }
    });
  });
  function scrollEvent(){
    if(document.querySelector(".vir:not(.stop)")){
      let elements=document.querySelectorAll(".vir:not(.stop)");
      for(let i=0;i<elements.length;i++){
        let element=elements[i];
        let bd=element.getBoundingClientRect();
        if(window.innerHeight>bd.y){
          if(!element.classList.contains("stopping")){
            if(loadElement.classList.contains("close")){
              loadElement.classList.remove("close");
            }
            setTimeout(function(){
                element.classList.add("stop");
            },200*i);
            setTimeout(function(){
              loadElement.classList.add("close");
            },200*elements.length+typespeed*[...elements].map(function(data){return data.getAttribute("origin").length}).sort(function(a,b){return b-a})[0]);
          }
          element.classList.contains("stopping")?"":element.classList.add("stopping");
        }
      }
    }
  }
  document.body.classList.add("loaded");
  setTimeout(function(){
    scrollEvent();
  },600)
  window.onscroll=function(){
    scrollEvent();
  }
})();
