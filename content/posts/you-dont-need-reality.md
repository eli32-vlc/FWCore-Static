---
title: "You Don't Need Reality"
date: 2025-12-27
pinned: false
draft: false
tags: ["VLESS", "Reality", "firewall"]
author_github: https://github.com/eli32-vlc
---

Why?

Technically any proxy protocol that uses TLS can SNI-spoof by presenting a self-signed cert for any domain. It will lack the padding of XTLS Reality flow, but if you need the characteristics of another proxy protocol, SNI spoofing without Reality is still possible.

The one I recommend is Naive Proxy; it uses the Chromium stack, so the handshake is very close to a real browser.

But it depends on your threat model: if you are worried about deep packet inspection, Reality is still better because it adds padding and obfuscation to the traffic.


