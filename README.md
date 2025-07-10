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

## 📸 Screenshots

Add screenshots of:
- The frontend form
  <img width="945" height="525" alt="Screenshot 2025-07-10 181454" src="https://github.com/user-attachments/assets/14eaec0a-bb02-4f84-8503-bd7b19d4dc86" />

  <img width="923" height="544" alt="Screenshot 2025-07-10 181507" src="https://github.com/user-attachments/assets/838b53f3-5c16-4cdd-9eca-9009c0892f9c" />

- QR code cards
  <img width="919" height="883" alt="Screenshot 2025-07-10 181520" src="https://github.com/user-attachments/assets/13e4d4dd-bbbe-4ceb-b703-3acbc87fed0b" />

- Copy/Delete buttons in action
  <img width="820" height="857" alt="Screenshot 2025-07-10 181541" src="https://github.com/user-attachments/assets/5384c411-60c4-43e9-9412-783c028cd6f7" />

  <img width="845" height="958" alt="Screenshot 2025-07-10 181557" src="https://github.com/user-attachments/assets/191eb4e9-90c5-4eea-9b46-d50ebf36da2c" />

---

## ✨ Future Enhancements

- 🔐 User authentication
- 📥 QR code download option
- 🔍 Filter/sort/search interface
- 📊 Analytics dashboard

---

## 📄 License

MIT
