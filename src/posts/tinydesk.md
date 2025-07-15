---
layout: layouts/post.njk
title: TinyDesk VJ
description: 
date: 2022-12-22
thumbnail: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/DSC_8113.jpeg?v=1738176308228
images: 
  - https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/DSC_8121.jpeg?v=1738176311939
  - https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/DSC_8113.jpeg?v=1738176308228
  - https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/DSC_8108.jpeg?v=1738176304190
tags: 
  - code 
  - all
blurb: TinyDesk VJ brings live performance to life through a tactile interface. Powered by p5.js and ML5 body segmentation, it integrates live video with surreal digital effects that you can dynamically control. The interface features rotary encoders, faders, potentiometers, and buttons, allowing you to layer effects like rain, ripples, lasers, and lightning in real-time. Whether you’re performing alongside music or exploring interactive art, this tool offers endless possibilities for creativity. Experiment with the controls, combine elements in unique ways, and watch as your inputs transform into exciting, ever-changing visuals.
skills:
  - p5.js
  - Arduino IDE
  - ML5 Body Segmentation
documentation: 
  - https://docblog-olee.glitch.me/projects/tinydeskVJ/
---

<div class="skill-list">       
  <h4 style="font-size: 1rem; color: #fe2f20;">Softwares Used:</h4> 
      <div class="skills">   
    {%- for post in collections.posts -%}
  {%- if post.url == page.url -%}
    {%- if post.data.skills and post.data.skills.length > 0 -%}
      {%- for skill in post.data.skills -%}
         <h4 style="font-size: 1rem;"> {{skill}} </h4> 
      {%- endfor -%}
    {%- endif -%}
  {%- endif -%}
{%- endfor -%}  
    </div> 
  </div>