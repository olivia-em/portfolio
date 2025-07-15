---
title: Encode
date: 2023-12-07
animation: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/circles2.mp4?v=1744235483658
sites:
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/Screenshot%202025-02-06%20at%202.12.52%E2%80%AFPM.png?v=1738869512015
    link: https://olivia-em.github.io/codeyourway/encode/encode1/index.html
    title: Encode 1
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/Screenshot%202025-02-06%20at%202.13.47%E2%80%AFPM.png?v=1738869508719
    link: https://olivia-em.github.io/codeyourway/encode/encode2/index.html
    title: Encode 2
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/Screenshot%202025-02-06%20at%202.14.22%E2%80%AFPM.png?v=1738869505146
    link: https://olivia-em.github.io/codeyourway/encode/encode3/index.html
    title: Encode 3
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/Screenshot%202025-02-06%20at%202.14.51%E2%80%AFPM.png?v=1738869501230
    link: https://olivia-em.github.io/codeyourway/encode/encode4/index.html
    title: Encode 4
  - image: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/encode7.jpg?v=1741309731627
    link: https://olivia-em.github.io/codeyourway/encode/encode7/index.html
    title: Encode 7
tags: 
  - code 
  - all
repo: 
  - https://github.com/olivia-em/codeyourway
blog:
 - https://docblog-olee.glitch.me/cyw/week1/
skills:
  - p5.js
  - WEBGL
layout: layouts/post.njk
---


<div class="cont">
  <div class="skills">   
        {%- for post in collections.posts -%}
  {%- if post.url == page.url -%}
    {%- if post.data.blog and post.data.blog.length > 0 -%}
      {%- for blo in post.data.blog -%}


 <h4 style="color: #fe2f20;"> <a target="_blank" style="color: #fe2f20;" href="{{blog}}">
    Workflow
    </a></h4>
      {%- endfor -%}
    {%- endif -%}
  {%- endif -%}
{%- endfor -%} 
      
      {%- for post in collections.posts -%}
  {%- if post.url == page.url -%}
    {%- if post.data.repo and post.data.repo.length > 0 -%}
      {%- for rep in post.data.repo -%}
  <h4 style="color: #fe2f20;"><a target="_blank" style="color: #fe2f20;" href="{{repo}}">
    Repository
   </a></h4>
      {%- endfor -%}
    {%- endif -%}
  {%- endif -%}
{%- endfor -%} 
      </div>      
  
  <p class="desc">
    <i>Encoding</i> is a learning / experimentation process where you look at a sketch and attempt to recreate it in pseudocode. Then, you take some time to rewrite the code into
    something of your own creation. This helps me breakdown an output into smaller components that can be described by and then train myself to use those to recreate it. This can also help you 
    recreate non-coded art into Javascript.
  </p>
  <p class="desc">
    This is a selection of Javascript sketches I made using this process, and all are either interactive or animated. In the repository link above, each .js file has the original code commented out at the bottom. 
    </p>
      </div>
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
  <h4 style="font-size: 1rem; color: #fe2f20;">Softwares & Languages Used:</h4> 
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
