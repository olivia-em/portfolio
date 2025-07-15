---
title: Creative Code
date: 2023-12-07
thumbnail: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/decode4-min.png?v=1739292988727
sites:
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/decode1-min.png?v=1739292980345
    link: https://olivia-em.github.io/codeyourway/decode1/index.html
    title: Decode 1
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/decode2-min.png?v=1739292982696
    link: https://olivia-em.github.io/codeyourway/decode2/index.html
    title: Decode 2
  - image: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/decode3-min.jpg?v=1741283421645
    link: https://olivia-em.github.io/codeyourway/decode3/index.html
    title: Decode 3
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/decode4-min.png?v=1739292988727
    link: https://olivia-em.github.io/codeyourway/decode4/index.html
    title: Decode 4
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/decode5-min.png?v=1739292990921
    link: https://olivia-em.github.io/codeyourway/decode5/index.html
    title: Decode 5
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/recode-min.png?v=1739292995355
    link: https://olivia-em.github.io/codeyourway/recode/index.html
    title: re/code
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/Screenshot%202025-02-06%20at%202.27.14%E2%80%AFPM.png?v=1738870054245
    link: https://justinjohnso-itp.github.io/cmus-interactive-composition/
    title: loop launcher 2 (1-3 & 8-0)
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/Screenshot%202025-02-06%20at%202.39.06%E2%80%AFPM.png?v=1738870761177
    link: https://olivia-em.github.io/codeofmusic/loopVisualizer/index.html
    title: loop launcher 1 (1-4)
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/Screenshot%202025-02-06%20at%202.12.52%E2%80%AFPM.png?v=1738869512015
    link: https://olivia-em.github.io/codeyourway/encode1/index.html
    title: Encode 1
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/Screenshot%202025-02-06%20at%202.13.47%E2%80%AFPM.png?v=1738869508719
    link: https://olivia-em.github.io/codeyourway/encode2/index.html
    title: Encode 2
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/Screenshot%202025-02-06%20at%202.14.22%E2%80%AFPM.png?v=1738869505146
    link: https://olivia-em.github.io/codeyourway/encode3/index.html
    title: Encode 3
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/Screenshot%202025-02-06%20at%202.14.51%E2%80%AFPM.png?v=1738869501230
    link: https://olivia-em.github.io/codeyourway/encode4/index.html
    title: Encode 4
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/Screenshot%202025-02-06%20at%202.15.29%E2%80%AFPM.png?v=1738869498064
    link: https://olivia-em.github.io/codeyourway/preLoader/index.html
    title: preLoader
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/rors.png?v=1738193436096
    link: https://olivia-em.github.io/dsgn1020/s3a3/
    title: Rorshach Illustrator
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/assemblage.png?v=1736446335064
    link: https://codepen.io/olee0114/pen/QWoaZNa
    title: CSS Assemblage
tags:
layout: layouts/post.njk
skills:
  - HTML
  - Javascript
  - CSS & CSS Animations
  - Github Pages
  - Tone.js
---

<div class="sites-container">
{%- for post in collections.posts -%}                           
  {%- if post.url == page.url -%} 
    {%- for site in post.data.sites -%}
    <a target="_blank" href="{{ site.link }}">
      <div style="background-image: url('{{ site.image }}');" class="sites">
        <h4>
          < {{ site.title }} >
        </h4>
      </div>
    </a>
  {%- endfor -%}
  {%- endif -%}
{%- endfor -%}
      </div>
  
  
<div class="skill-list">       
  <h4 style="font-size: 1.5rem; color: #fe2f20;">Softwares & Languages Used:</h4> 
      <div class="skills">   
    {%- for post in collections.posts -%}
  {%- if post.url == page.url -%}
    {%- if post.data.skills and post.data.skills.length > 0 -%}
      {%- for skill in post.data.skills -%}
       <h4> {{skill}} </h4> 
      {%- endfor -%}
    {%- endif -%}
  {%- endif -%}
{%- endfor -%}  
    </div> 
  </div>
