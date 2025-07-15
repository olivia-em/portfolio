---
layout: layouts/post.njk
title: Are you free tomorrow?
description: 
date: 2022-10-14
thumbnail: https://cdn.glitch.me/2decb767-8051-4237-974a-927409aa4233/areyoufree.png?v=1736448845005
images: 
videos:
  - https://cdn.glitch.me/d7ac8ce9-d6b5-4915-b92c-e6f0bf0d0c29/areyoufree.mp4?v=1729041185440
tags: 
  - vidart 
  - all
blurb:
skills:
  - Adobe After Effects
documentation: 
  - https://docblog-olee.glitch.me/projects/specfut/
---
 <br>
 <div class="cont">
   <p class="desc">
     This project explores the feeling of being overwhelmed by too many possibilities. What started as an idea to compare people’s lives in the same time frame shifted into an emotional journey, taking a simple walk home and turning it into a reflection on choice. My collaborator Devan and I combined contrasting visuals like high-tech vs. nature and simple vs. grand moments to express the tension between these paths.
    </p>
<p class="desc">
  The final edit mixes jump cuts, flashes, and stills, set to a soundtrack that shapes the narrative. The voiceover, recorded by my partner, Devan, ties together two perspectives: a girl on a personal journey and someone trying to connect. The process was messy but fun, with a focus on creating something that feels raw and emotional.  </p>
 <p class="desc">
 We filmed separately, then brought everything into After Effects for editing. The pacing was driven by audio, which we first cut in Ableton, and then synced to the visuals. After some rounds of edits and a few challenges along the way (always triple-check your backups), we ended up with a piece that combines abstract storytelling and emotional depth.
</p>
  </div>
<div class="skill-list">       
  <h4 style="font-size: 1rem;color: #fe2f20;">Softwares Used:</h4> 
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
  