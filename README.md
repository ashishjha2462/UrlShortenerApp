# 🔗 URL Shortener App

A simple full-stack web application that shortens long URLs, tracks clicks, supports expiration, and displays QR codes for easy sharing.

---

## 🚀 Features

- 🔐 Shorten any long URL  
- 🔁 Redirect using short codes  
- ⏰ Set optional expiration dates  
- 📊 Click tracking  
- ⚠️ Rate limiting (10 req/min per IP)  
- 🧹 Auto-delete expired links via MongoDB TTL  
- 🌐 Frontend with:
  - List of non-expired shortened URLs
  - QR code generation
  - Copy to clipboard
  - Delete shortened URL
  - Clean, responsive UI

---

## 🛠️ Tech Stack

| Layer     | Technology         |
|-----------|--------------------|
| Backend   | Node.js, Express.js|
| Database  | MongoDB (Mongoose) |
| Frontend  | HTML, CSS, JS      |
| Extras    | MongoDB TTL Index, QRServer API |

---

## 📦 API Endpoints

### `POST /shorten`

**Body:**

    {
      "url": "https://example.com/very/long/path",
      "expiresAt": "2025-07-15T12:00:00Z" // optional
    }

**Response:**

    {
      "shortUrl": "https://short.ly/abc123"
    }

---

### `GET /:code`

- Redirects to the original URL
- If expired: returns HTTP `410 Gone`

---

### `GET /urls`

Returns all stored shortened URLs, sorted by creation time (newest first).

---

### `DELETE /urls/:code`

Deletes the shortened URL from the database.

---

## 🧱 MongoDB Schema

    {
      originalUrl: String,
      shortCode: String,
      createdAt: Date,
      expiresAt: Date,
      clickCount: Number
    }

- ✅ TTL Index: Automatically deletes expired documents using `expiresAt`.

---

## 💻 Local Setup Instructions

### 1. Clone the repo

    git clone https://github.com/your-username/url-shortener.git
    cd url-shortener

### 2. Install dependencies

    npm install

### 3. Configure `.env`

    PORT=5000
    MONGO_URI=mongodb://localhost:27017/urlshortener
    BASE_URL=https://short.ly

### 4. Run the server

    npm start

Then visit:  
📍 `http://localhost:5000`

---

## 📸 Screenshots (optional)

Add screenshots of:
- The frontend form
- QR code cards
- Copy/Delete buttons in action

---

## ✨ Future Enhancements

- 🔐 User authentication
- 📥 QR code download option
- 🔍 Filter/sort/search interface
- 📊 Analytics dashboard

---

## 📄 License

MIT
