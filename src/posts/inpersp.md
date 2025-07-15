---
title: Lessons in Perspective
date: 2025-04-21
thumbnail: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/Screenshot%202025-04-05%20at%201.16.49%E2%80%AFPM.png?v=1744346702742
sites:
  - image: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/Screenshot%202025-04-05%20at%201.16.49%E2%80%AFPM.png?v=1744346702742
    link: https://lessons-inperspective.netlify.app/
    title: Lessons in Perspective
repo: https://github.com/olivia-em/inperspective
tags:
  - webdev
  - code
  - all
layout: layouts/post.njk
skills:
  - React
  - Three.js
  - Creative Writing
---

<div class="post-layout">  
  <div class="cont">
    <br>
    <p class="desc">
      Lessons in Perspective is an interactive, web-based poetry collection that explores how every relationship is shaped by the ones that came before it. Built with React and Three.js, this collection makes the browser a space for 3D concrete poetry. Clicking, rotating, and exploring the 3D environment reveals how meaning changes with perspective; your interaction with the present can unravel the past, illustrating connections that are invisible but felt. Lessons in Perspective offers a poetic meditation on love, memory, and the invisible architectures of life.
    </p>
     <div style="margin-top:20px; " class="skills">   
     {%- for post in collections.posts -%}
{%- if post.url == page.url -%}
{%- if post.data.repo and post.data.repo.length > 0 -%}
{%- for rep in post.data.repo -%}
<a target="_blank" href="{{repo}}"><h6 style="color: #fe2f20; text-align:center;">
Repository
</h6></a>
{%- endfor -%}
{%- endif -%}
{%- endif -%}
{%- endfor -%}
    </div>
      </div>
  </div>  
  <div class="sites-container">
  {%- for post in collections.posts -%}                           
    {%- if post.url == page.url -%} 
      {%- for site in post.data.sites -%}
        <a target="_blank" href="{{ site.link }}">
          {% if site.animation %}
            <div class="sites video-background">
              <video autoplay loop muted playsinline class="video-content">
                <source src="{{ site.animation }}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              <h4 class="overlay-content">
                < {{ site.title }} >
              </h4>
            </div>
          {% else %}
            <div class="sites" style="background-image: url('{{ site.image }}');">
              <h4 class="overlay-content">
                < {{ site.title }} >
              </h4>
            </div>
          {% endif %}
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
       <h4 style="font-size: 1rem;" > {{skill}} </h4> 
      {%- endfor -%}
    {%- endif -%}
  {%- endif -%}
{%- endfor -%}  
    </div> 
  
  </div>
