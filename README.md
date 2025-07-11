# 🔗 URL Shortener App

A simple full-stack web application that shortens long URLs, tracks clicks, supports expiration, and displays QR codes for easy sharing.

---

## 🚀 Features

- 🔐 Shorten any long URL

  ***Screenshot:***
  <img width="1713" height="875" alt="Screenshot 2025-07-11 110221" src="https://github.com/user-attachments/assets/ea3ecbe0-3d12-4e96-a304-41f437fdcf44" />

- 🔁 Redirect using short codes

  ***Screenshot:***
  <img width="1722" height="922" alt="Screenshot 2025-07-11 110332" src="https://github.com/user-attachments/assets/f3216373-cef2-4eb1-844d-bbab3f6a2e8f" />

- ⏰ Set optional expiration dates

  ***Screenshot:***
  <img width="1714" height="765" alt="Screenshot 2025-07-11 111345" src="https://github.com/user-attachments/assets/9a74ef17-0347-4e9f-82f5-57b8389b6408" />

- 📊 Click tracking

  ***Screenshot:***
  <img width="1460" height="259" alt="Screenshot 2025-07-11 111138" src="https://github.com/user-attachments/assets/aa99f52c-0bfd-4f63-adf8-21c08ad0e548" />

- ⚠️ Rate limiting (10 req/min per IP)

  ***Screenshot:***
  <img width="1727" height="679" alt="Screenshot 2025-07-11 110744" src="https://github.com/user-attachments/assets/91ef08cf-f424-4bd2-b10e-1832f95f8187" />
  
- 🧹 Auto-delete expired links via MongoDB TTL  
- 🌐 Frontend with:
  - List of non-expired shortened URLs
    
  ***Screenshot:***
  <img width="919" height="883" alt="Screenshot 2025-07-10 181520" src="https://github.com/user-attachments/assets/3a90976c-80c2-4188-836f-1f640902acba" />

  - QR code generation

  ***Screenshot:***
  <img width="145" height="141" alt="Screenshot 2025-07-11 122421" src="https://github.com/user-attachments/assets/a55fb8e7-0d0e-4d77-bf34-9b300e600c1d" />

  - Copy to clipboard

    ***Screenshot:***
    <img width="820" height="857" alt="Screenshot 2025-07-10 181541" src="https://github.com/user-attachments/assets/165eb4c5-f365-4cd1-a2be-f08e2023bc9d" />

  - Delete shortened URL

    ***Screenshot:***
    <img width="845" height="958" alt="Screenshot 2025-07-10 181557" src="https://github.com/user-attachments/assets/1619396c-fe0a-4b9d-96d0-c0e4f067856b" />

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

***Screenshot:***
<img width="1460" height="259" alt="Screenshot 2025-07-11 111138" src="https://github.com/user-attachments/assets/0803e3b5-dc85-4109-84e3-af282d0103aa" />

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

- The frontend form
  <img width="945" height="525" alt="Screenshot 2025-07-10 181454" src="https://github.com/user-attachments/assets/14eaec0a-bb02-4f84-8503-bd7b19d4dc86" />

  <img width="923" height="544" alt="Screenshot 2025-07-10 181507" src="https://github.com/user-attachments/assets/838b53f3-5c16-4cdd-9eca-9009c0892f9c" />

---
## 🐋Deployement
-visit
 `https://urlshortenerapp-xdea.onrender.com`

## ✨ Future Enhancements

- 🔐 User authentication
- 📥 QR code download option
- 🔍 Filter/sort/search interface
- 📊 Analytics dashboard

---

## 📄 License

MIT
