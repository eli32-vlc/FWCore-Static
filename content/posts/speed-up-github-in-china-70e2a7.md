---
title: "Speed Up GitHub in China"
date: 2025-12-27T12:10:04.080Z
tags: ["github", "proxy", "hosts"]
draft: false
author_github: "https://github.com/eli32-vlc"
---

To speed up GitHub in China, you have a few options:

* For raw content, some repositories provide a jsDelivr API, but it’s not guaranteed and updates less frequently.
* You can also clone the content onto Gitee, but this is subject to censorship.
* Another option is modifying your hosts file, which we’ll focus on today. This allows you to access GitHub more easily. Downloads may still be slow, but at least you can access GitHub and use additional methods to speed up downloads.

### 1. Edit Your Hosts File

Open your hosts file:

* **Windows:** `C:\Windows\System32\drivers\etc\hosts`
* **macOS / Linux:** `/etc/hosts` (use `sudo` on macOS/Linux or run Notepad as Administrator on Windows)

Add common GitHub domains:

```
# GitHub
140.82.113.3 github.com
140.82.113.4 www.github.com
185.199.108.153 assets-cdn.github.com
185.199.109.153 assets-cdn.github.com
185.199.110.153 assets-cdn.github.com
185.199.111.153 assets-cdn.github.com
185.199.108.153 raw.githubusercontent.com
185.199.109.153 raw.githubusercontent.com
185.199.110.153 raw.githubusercontent.com
185.199.111.153 raw.githubusercontent.com
```

> Note: These IPs can change. If GitHub suddenly stops working, this is usually the reason.

### 2. Flush DNS Cache

* **Windows:**

  ```cmd
  ipconfig /flushdns
  ```
* **macOS:**

  ```bash
  sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
  ```
* **Linux:** Depends on your distribution; please search for your distro’s method.

### 3. Use a GitHub Proxy / Mirror / Accelerator

**Clone acceleration:**

```bash
git clone https://hub.fastgit.xyz/user/repo.git
```

**Other mirrors (availability may vary):**

* [https://gitclone.com/github.com/](https://gitclone.com/github.com/)
* [https://ghproxy.com/https://github.com/](https://ghproxy.com/https://github.com/)

**Raw file acceleration:**

* [https://raw.fastgit.org/](https://raw.fastgit.org/)
* [https://raw.githubusercontent.com.cnpmjs.org/](https://raw.githubusercontent.com.cnpmjs.org/)

**Example:**

```bash
curl https://raw.fastgit.org/user/repo/main/file.txt
```

We typically recommend a self-hosted proxy (see guide in FMHY), but these methods work as well.

