# API Documentation

Base URL: `http://localhost:8000`
Interactive docs: `http://localhost:8000/docs`

---

## Auth

### POST /auth/register
Register a new client (business owner).

**Request body**
```json
{
  "full_name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword"
}
```

**Response 201**
```json
{
  "id": 1,
  "full_name": "Jane Doe",
  "email": "jane@example.com",
  "is_active": true,
  "created_at": "2024-01-01T10:00:00Z"
}
```

---

### POST /auth/login
Login and receive a JWT token.

**Request body**
```json
{
  "email": "jane@example.com",
  "password": "securepassword"
}
```

**Response 200**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

Use the token in subsequent requests:
```
Authorization: Bearer <access_token>
```

---

## Listings (Public)

### GET /listings
Get all business listings with pagination.

**Query params**
- `skip` (int, default 0) — offset
- `limit` (int, default 20) — max results

**Response 200** — array of business objects

---

### GET /listings/{business_id}
Get a single business listing by ID.

**Response 200** — business object  
**Response 404** — business not found

---

## Listings (Client — requires JWT)

### GET /listings/me
Get all listings owned by the authenticated client.

**Headers:** `Authorization: Bearer <token>`

**Response 200** — array of business objects

---

### POST /listings
Create a new business listing.

**Headers:** `Authorization: Bearer <token>`

**Request body**
```json
{
  "name": "Sunset Café",
  "category": "Food & Beverage",
  "description": "A cozy café serving artisan coffee and pastries.",
  "address": "12 Main Street",
  "city": "Chennai",
  "state": "Tamil Nadu",
  "country": "India",
  "postal_code": "600001",
  "phone": "+91 98765 43210",
  "email": "hello@sunsetcafe.com",
  "website": "https://sunsetcafe.com",
  "opening_hours": {
    "Monday": "8:00 AM - 9:00 PM",
    "Sunday": "Closed"
  },
  "services": ["Dine-in", "Takeaway", "Online Orders"]
}
```

**Response 201** — created business object

---

### PUT /listings/{business_id}
Update an existing listing. Only the owner can update.

**Headers:** `Authorization: Bearer <token>`

**Request body** — any subset of listing fields (partial update supported)

**Response 200** — updated business object  
**Response 403** — not the owner  
**Response 404** — not found

---

### DELETE /listings/{business_id}
Delete a listing. Only the owner can delete.

**Headers:** `Authorization: Bearer <token>`

**Response 204** — deleted  
**Response 403** — not the owner

---

### POST /listings/{business_id}/images
Upload an image for a listing.

**Headers:** `Authorization: Bearer <token>`  
**Content-Type:** `multipart/form-data`

**Form field:** `file` — JPEG, PNG, or WEBP image

**Response 200**
```json
{
  "id": 5,
  "image_url": "/uploads/1/uuid.jpg",
  "uploaded_at": "2024-01-01T12:00:00Z"
}
```

---

### POST /listings/{business_id}/logo
Upload a logo for a listing (replaces existing logo).

**Headers:** `Authorization: Bearer <token>`  
**Content-Type:** `multipart/form-data`

**Form field:** `file` — JPEG, PNG, or WEBP image

**Response 200** — updated business object with `logo_url` set

---

## Search (Public)

### GET /search?q={query}
Search businesses by name (case-insensitive partial match).

**Query params**
- `q` (string, required) — search term

**Response 200** — array of matching business objects

**Example:** `GET /search?q=café`

---

### GET /search/filter?category={category}
Filter businesses by category.

**Query params**
- `category` (string, required) — category name

**Response 200** — array of matching business objects

**Example:** `GET /search/filter?category=restaurant`

---

## Business Object (full)
```json
{
  "id": 1,
  "owner_id": 2,
  "name": "Sunset Café",
  "category": "Food & Beverage",
  "description": "A cozy café...",
  "address": "12 Main Street",
  "city": "Chennai",
  "state": "Tamil Nadu",
  "country": "India",
  "postal_code": "600001",
  "phone": "+91 98765 43210",
  "email": "hello@sunsetcafe.com",
  "website": "https://sunsetcafe.com",
  "opening_hours": { "Monday": "8:00 AM - 9:00 PM" },
  "services": ["Dine-in", "Takeaway"],
  "logo_url": "/uploads/1/logo.png",
  "images": [
    { "id": 1, "image_url": "/uploads/1/abc.jpg", "uploaded_at": "..." }
  ],
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": null
}
```

---

## Error responses
| Status | Meaning                        |
|--------|--------------------------------|
| 400    | Validation error / bad input   |
| 401    | Missing or invalid JWT token   |
| 403    | Forbidden (not the owner)      |
| 404    | Resource not found             |
| 422    | Unprocessable entity (Pydantic)|
