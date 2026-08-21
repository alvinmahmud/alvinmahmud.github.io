---
layout: page
permalink: /repositories/
title: Repos
description: Public repositories from @alvinmahmud, most recently updated first.
nav: true
nav_order: 4
---

{% if site.data.repositories.github_repos %}

<div class="repositories" data-github-owner="{{ site.data.socials.github_username }}">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
{% endif %}
