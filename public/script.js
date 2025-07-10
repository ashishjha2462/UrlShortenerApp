document.getElementById("shorten-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const url = document.getElementById("url").value;
  const expiresAt = document.getElementById("expiresAt").value;

  const body = { url };
  if (expiresAt) body.expiresAt = new Date(expiresAt).toISOString();

  try {
    const res = await fetch("/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    document.getElementById("result").textContent = data.shortUrl || data.error;
  } catch (err) {
    document.getElementById("result").textContent = "Something went wrong";
  }
});


async function fetchUrls() {
  const res = await fetch("/urls");
  const data = await res.json();

  const list = document.getElementById("url-list");
  list.innerHTML = "";

  data.forEach(item => {
  // ✅ Skip if expired
  if (item.expiresAt && new Date(item.expiresAt) < new Date()) {
    return;
  }

  const shortUrl = `${location.origin}/${item.shortCode}`;
  const expires = item.expiresAt
    ? new Date(item.expiresAt).toLocaleString()
    : "Never";

  const li = document.createElement("li");
  li.innerHTML = `
    <div class="url-card">
      <div class="url-info">
        <p><strong>Original URL:</strong><br/>
          <a href="${item.originalUrl}" target="_blank">${item.originalUrl}</a>
        </p>
        <p>
          <strong>Short URL:</strong><br/>
          <a href="${shortUrl}" target="_blank">${shortUrl}</a><br/>
          <button class="copy-btn" data-url="${shortUrl}">Copy</button>
          <button class="delete-btn" data-code="${item.shortCode}">Delete</button>
        </p>
        <p><strong>Expires at:</strong> ${expires}</p>
        <p><strong>Created at:</strong> ${new Date(item.createdAt).toLocaleString()}</p>
        <p><strong>Click Count:</strong> ${item.clickCount || 0}</p>
      </div>
      <div class="url-qr">
        <img src="https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(shortUrl)}&size=100x100" alt="QR Code" />
      </div>
    </div>
  `;
  list.appendChild(li);
});


  // ✅ Add event listeners AFTER rendering
  document.querySelectorAll(".copy-btn").forEach(button => {
    button.addEventListener("click", () => {
      const url = button.getAttribute("data-url");
      navigator.clipboard.writeText(url).then(() => {
        button.textContent = "Copied!";
        setTimeout(() => button.textContent = "Copy", 1500);
      });
    });
  });

  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", async () => {
      const code = button.getAttribute("data-code");
      if (confirm("Are you sure you want to delete this URL?")) {
        await fetch(`/urls/${code}`, { method: "DELETE" });
        fetchUrls(); // reload list after deletion
      }
    });
  });
}

// Fetch when page loads
window.addEventListener("DOMContentLoaded", fetchUrls);

