---
title: "Abuse InfinityFree to Host Web Proxies for General Browsing"
date: 2025-12-28T02:20:39.968Z
tags: ["proxy", "web", "gfw", "fw"]
draft: false
author_github: "https://github.com/eli32-vlc"
---

> It won’t be as secure, fast, or private as VLESS, VMess, etc., but if you really can’t get a client, this *might* work.

**YOU HAVE BEEN WARNED**

---

## Things You Need

* Email
* Computer (a phone can be used, but it’s harder)
* A good internet connection
* A cup of coffee (optional ☕)

---

## 1. Download PHP-Proxy

Open this link:
[https://www.php-proxy.com](https://www.php-proxy.com)

Then click the link under this text:

```
For those who do not have access to shell, for example, people on a shared hosting environment, would need to download a pre-installed version of php-proxy, and then upload it to their web-server.
```

Download the pre-installed ZIP file.

---

## 2. Register for an InfinityFree Account

Create an InfinityFree account using your email.

---

## 3. Create a Hosting Account

* Click **Create Account** on InfinityFree
* Click **Create Now**
* You may get a CAPTCHA — complete it and wait

---

## 4. Choose a Domain Name

* Pick a short domain name
* Examples:

  * `cdn-4383`
  * `signup-383732`
  * `apn-hg7deh`

---

## 5. Check Availability

* Click **Check Availability**
* If it’s available, continue
* If not, change the name and try again

---

## 6. Finish Account Setup

1. Under the **Email Consent** dropdown, select **I approve**
2. Do **not** change the password (the default is fine)
3. Wait for account activation

Once activated, you should be redirected to the dashboard.

---

## 7. Upload PHP-Proxy Files

1. From the dashboard, click **File Manager**
2. Open the `htdocs` folder (if it exists; otherwise continue)
3. Click **Upload** at the top
4. Upload the PHP-Proxy ZIP file
5. Extract it

After extraction:

* If `index2.html` exists, delete it
* Click `config.php`
* Click **Edit** at the top

---

## 8. Set Security Keys

Go to:
[https://www.random.org/passwords/](https://www.random.org/passwords/)

Generate a password and copy one of them.

In `config.php`, find:

```php
$config['app_key'] = '';
```

Change it to:

```php
$config['app_key'] = 'YOUR_PASSWORD';
```

Do the same for:

```php
$config['encryption_key'] = '';
```

Then **Save and Close**.

---

## 9. Done

Open your domain in the browser.
Your proxy should now be working.

⚠️ **Important Notes**

* This will **not** have SSL
* Be careful when using it
* Do **not** expect strong security or privacy