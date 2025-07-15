---
title: Smaller Projects
thumbnail: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/justbones.png?v=1738193440550
date: 2023-12-07
sites:
  - image: https://cdn.glitch.me/95731519-6287-4bbd-a281-712ac2b13fef/port-ex.jpg?v=1742922559998
    link: https://oliviaemlee.glitch.me/
    title: Former Portfolio
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/justbones.png?v=1738193440550
    link: https://olivia-em.github.io/justBones/
    title: justBones
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/docblog.png?v=1738198935286
    link: https://docblog-olee.glitch.me/
    title: ITP Documentation Blog
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/desktopp.png?v=1738193458002
    link: https://olivia-em.github.io/dsgn1020/
    title: DSGN Desktop
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/meam-screengrab.png?v=1701375716100
    link: https://meamlabs.seas.upenn.edu/
    title: MEAM Labs
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/sounddevils.png?v=1738193431585
    link: https://olivia-em.github.io/dsgn1020/s3a2/
    title: IFTTT Applet
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/IMG_9231.jpg?v=1738193447264
    link: https://olivia-em.github.io/dsgn1020/s1a3/
    title: Looking for a sign?
  - image: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/closet.png?v=1738193461648
    link: https://olivia-em.github.io/dsgn1020/s2a2/
    title: Playing Dress-Up!
tags:
  - webdev
  - all
layout: layouts/post.njk
skills:
  - HTML
  - Javascript
  - CSS & CSS Animations
  - Wordpress
  - Glitch
  - Github Pages
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
