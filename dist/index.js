import{R as o}from"./RandomNumberInstance.js";import{A as d}from"./Tools/Alerter.js";window.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("btn1"),t=document.getElementById("btn2");e&&e.addEventListener("click",()=>{const n=new o(10,100);d.Alert(`Hello, World!

Random Number from allocated instance: ${n.value}`)}),t&&t.addEventListener("click",()=>{window.location.href="threejs.html"})});
