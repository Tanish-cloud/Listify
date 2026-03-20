# Database Schema

## Tables

### users
| Column           | Type        | Constraints              |
|------------------|-------------|--------------------------|
| id               | INTEGER     | PK, auto-increment       |
| full_name        | VARCHAR     | NOT NULL                 |
| email            | VARCHAR     | NOT NULL, UNIQUE, INDEX  |
| hashed_password  | VARCHAR     | NOT NULL                 |
| is_active        | BOOLEAN     | DEFAULT true             |
| created_at       | TIMESTAMP   | server default now()     |

### businesses
| Column        | Type        | Constraints              |
|---------------|-------------|--------------------------|
| id            | INTEGER     | PK, auto-increment       |
| owner_id      | INTEGER     | FK → users.id, NOT NULL  |
| name          | VARCHAR     | NOT NULL, INDEX          |
| category      | VARCHAR     | NOT NULL, INDEX          |
| description   | TEXT        | NOT NULL                 |
| address       | VARCHAR     | NOT NULL                 |
| city          | VARCHAR     | NOT NULL                 |
| state         | VARCHAR     | NOT NULL                 |
| country       | VARCHAR     | NOT NULL                 |
| postal_code   | VARCHAR     | NOT NULL                 |
| phone         | VARCHAR     | NOT NULL                 |
| email         | VARCHAR     | NOT NULL                 |
| website       | VARCHAR     | NULLABLE                 |
| opening_hours | JSON        | NULLABLE                 |
| services      | JSON        | NULLABLE                 |
| logo_url      | VARCHAR     | NULLABLE                 |
| created_at    | TIMESTAMP   | server default now()     |
| updated_at    | TIMESTAMP   | auto-updated on change   |

### business_images
| Column      | Type      | Constraints                    |
|-------------|-----------|--------------------------------|
| id          | INTEGER   | PK, auto-increment             |
| business_id | INTEGER   | FK → businesses.id, NOT NULL   |
| image_url   | VARCHAR   | NOT NULL                       |
| uploaded_at | TIMESTAMP | server default now()           |

## Relationships
- **users** 1 → N **businesses** (one client owns many listings)
- **businesses** 1 → N **business_images** (one listing has many images)

## JSON field examples

**opening_hours**
```json
{
  "Monday": "9:00 AM - 6:00 PM",
  "Tuesday": "9:00 AM - 6:00 PM",
  "Saturday": "10:00 AM - 4:00 PM",
  "Sunday": "Closed"
}
```

**services**
```json
["Haircut", "Coloring", "Styling", "Beard Trim"]
```
