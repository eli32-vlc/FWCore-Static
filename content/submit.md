---
title: "Submit a Post"
date: 2025-12-27
draft: false
---

Your GitHub account is used for identity in giscus comments. Please include your GitHub profile link so readers can recognize you. All fields except tags are required. Submissions now require a short proof-of-work (PoW) before sending; it may take ~2 minutes depending on hardware.

<form class="submit-form" method="post" action="https://example.com/submit" accept-charset="UTF-8" data-pow-difficulty="21">
  <input type="hidden" name="form_type" value="post">

  <label for="github-url">GitHub profile URL *</label>
  <input id="github-url" name="github_url" type="url" required placeholder="https://github.com/yourname">

  <label for="title">Title *</label>
  <input id="title" name="title" type="text" required placeholder="Post title">

  <label for="tags">Tags (comma-separated)</label>
  <input id="tags" name="tags" type="text" placeholder="tag-one, tag-two">

  <label for="body">Content *</label>
  <textarea id="body" name="body" rows="10" required placeholder="Write in Markdown"></textarea>

  <input type="hidden" id="pow-timestamp" name="pow_timestamp">
  <input type="hidden" id="pow-difficulty" name="pow_difficulty">
  <input type="hidden" id="pow-nonce" name="pow_nonce">
  <input type="hidden" id="pow-hash" name="pow_hash">

  <div id="pow-status" class="pow-status">Proof of work not started.</div>

  <button type="submit">Generate proof & submit</button>
</form>

<div class="callout callout-tip">
  <strong>Note:</strong> Replace the form action URL with your Worker endpoint. The backend verifies PoW: SHA-256 over (title + body + timestamp + nonce) must meet the required difficulty and freshness window.
</div>

<script>
(() => {
  const form = document.querySelector('.submit-form');
  if (!form || !window.crypto || !window.crypto.subtle) return;

  const statusEl = document.getElementById('pow-status');
  const submitBtn = form.querySelector('button[type="submit"]');
  const titleInput = document.getElementById('title');
  const bodyInput = document.getElementById('body');
  const tsInput = document.getElementById('pow-timestamp');
  const diffInput = document.getElementById('pow-difficulty');
  const nonceInput = document.getElementById('pow-nonce');
  const hashInput = document.getElementById('pow-hash');

  const encoder = new TextEncoder();
  const difficulty = Number(form.dataset.powDifficulty || 21);
  diffInput.value = difficulty;

  const toHex = (buffer) => Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');

  const leadingZeroBits = (bytes) => {
    let bits = 0;
    for (const b of bytes) {
      if (b === 0) { bits += 8; continue; }
      for (let i = 7; i >= 0; i--) {
        if ((b >> i) & 1) return bits + (7 - i);
      }
    }
    return bits;
  };

  const updateStatus = (msg) => { if (statusEl) statusEl.textContent = msg; };

  const computePow = async () => {
    if (!titleInput.value.trim() || !bodyInput.value.trim()) {
      updateStatus('Please fill title and content before starting proof of work.');
      return false;
    }

    submitBtn.disabled = true;
    const timestamp = new Date().toISOString();
    tsInput.value = timestamp;
    updateStatus('Solving proof of work… this can take up to a couple of minutes.');

    let nonceCounter = BigInt(crypto.getRandomValues(new Uint32Array(1))[0]);
    let attempts = 0;

    while (true) {
      const nonce = (nonceCounter++).toString(16);
      const preimage = titleInput.value + bodyInput.value + timestamp + nonce;
      const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(preimage));
      const bytes = new Uint8Array(hashBuffer);
      const lz = leadingZeroBits(bytes);
      attempts++;

      if (lz >= difficulty) {
        nonceInput.value = nonce;
        hashInput.value = toHex(hashBuffer);
        updateStatus(`Proof found after ${attempts.toLocaleString()} attempts. Submitting…`);
        return true;
      }

      if (attempts % 500 === 0) {
        updateStatus(`Still working… ${attempts.toLocaleString()} attempts so far.`);
        await new Promise((r) => setTimeout(r, 0));
      }
    }
  };

  form.addEventListener('submit', async (e) => {
    if (hashInput.value && nonceInput.value && tsInput.value) return; // already solved
    e.preventDefault();
    const ok = await computePow();
    if (ok) form.submit();
    else submitBtn.disabled = false;
  });
})();
</script>
