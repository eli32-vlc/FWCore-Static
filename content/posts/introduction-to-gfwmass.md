---
title: "Introduction to GFWMass"
date: 2025-12-27
pinned: false
draft: false
tags: ["vless", "gfwmass"]
author_github: https://github.com/eli32-vlc
---
## What is GFWMass?

GFWMass is a script that automates deploying up to 1,000 links to a single proxy.

This can help increase the spread of proxies so a firewall is less likely to flag you for visiting one host repeatedly.

## Architecture

```
Client → Cloudflare (cdn-47fh.example.com) → Caddy → Xray/VLESS → Internet
         Cloudflare (signup-hf33.example.com) ↗
         Cloudflare (api-92kl.example.com) ↗
         ... (hundreds more)
```


1. It generates realistic subdomains that represent real services.
2. Adds them to Cloudflare via API and enables proxies so your origin IP stays hidden.
3. Caddy handles TLS from Cloudflare using a wildcard certificate from certbot (can be replaced with Cloudflare origin certs if needed).
4. Xray/VLESS over WebSocket (WS): single VLESS+WS endpoint serving all domains.
5. Provides a `subscription.txt` with base64-encoded VLESS links for all generated domains.


## Prerequisites

1. A VPS with port 443 open.
2. A domain name with Cloudflare DNS (a free one from digiplat works).
3. Git installed and root access.
4. Debian-based distro preferred (not tested on others).

## Steps to deploy GFWMass


Steps to deploy GFWMass

```
git clone https://github.com/eli32-vlc/gfwmass.git
cd gfwmass
```

This will download GFWMass.

Install dependencies:

```
pip3 install requests
```


```
cp config.example.json config.json
nano config.json
```
This copies the example config to config.json and opens it in nano for editing.


Edit the following fields:

```json
{
  "domain": "example.com",              // Your domain name
  "origin_ip": "1.2.3.4",               // Your server's IP address
  "email": "admin@example.com",         // Email for SSL certificates
  "xray_port": 10000,                     // Port for Xray to listen on
  "user_id": "your-uuid-here",          // UUID for VLESS (generate with uuidgen)
  "cloudflare": {
    "api_token": "your-token",          // Cloudflare API token
    "zone_id": "your-zone-id"           // Cloudflare zone ID
  }
}
```

After editing the config file, save and exit nano (Ctrl+X, then Y, then Enter).



## Getting Cloudflare credentials

**API Token:**
- Go to https://dash.cloudflare.com/profile/api-tokens
- Create a token with "Edit DNS" permissions for your zone.

**Zone ID:**
- Go to your domain's overview page in Cloudflare.
- Scroll down to the "API" section on the right sidebar.
- Copy the Zone ID.

**Generate UUID:**

```
uuidgen
# or
python3 -c "import uuid; print(uuid.uuid4())"
```

## Generate certificates

```bash
sudo certbot certonly --manual --preferred-challenges dns -d example.com -d "*.example.com" --agree-tos -m zenith@mail.zenir.tech --config-dir /etc/letsencrypt --work-dir /var/lib/letsencrypt --logs-dir /var/log/letsencrypt
```
This generates a wildcard SSL certificate for your domain. Follow the prompts to create a DNS TXT record for verification. Replace example.com with your actual domain.

## Move the certificates to the Caddy directory and fix permission

```bash
sudo install -d /etc/ssl/gfwmass
sudo cp /etc/letsencrypt/live/example.com/fullchain.pem /etc/ssl/gfwmass/fullchain.pem
sudo cp /etc/letsencrypt/live/example.com/privkey.pem /etc/ssl/gfwmass/privkey.pem
sudo chmod 644 /etc/ssl/gfwmass/fullchain.pem /etc/ssl/gfwmass/privkey.pem
```
Replace example.com with your actual domain.



## Full deployment

Deploy everything (DNS records, install dependencies, configure services):

```bash
sudo python3 gfwmass.py --deploy --count 200
```

This will:

- Generate 200 subdomains
- Add all DNS records to Cloudflare
- Install Caddy, certbot, and Xray
- Deploy configurations
- Restart services

For safety, restart Caddy and Xray yourself:

```bash
sudo systemctl restart caddy
sudo systemctl restart xray
```

After deployment, you can find your subscription link in the `subscription.txt` file or the `subscription_decoded.txt` file in your GFWMass directory.

In Cloudflare, enable WebSocket support and set security to Full (not Flexible).

Good luck, and enjoy your new automated proxy deployment!