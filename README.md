# Blog Site Backend API(Prisma + MVC)

## Description

This project is a RESTful backend API for a blog platform.
It is a refactored and extended version of the Blog Site Backend, migrated to Prisma ORM and MVC architecture, with an additional tagging system.

The API provides full CRUD operations for categories, posts, comments, and tags, along with filtering capabilities and soft delete functionality.

The project follows clean code principles, REST standards, and a modular MVC structure for scalability and maintainability.

---

## 🛠 Technologies

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma ORM
- **Architecture:** MVC

## 📦 Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/sunazaloglu/blog-site-backend-wprisma.git
    cd blog-site-backend-wprisma

    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory:

    ```env
    DB_NAME=your_database_name
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    PORT=3000
    ```

    An `.env.example` file is included as a reference for environment configuration.

4.  **Run Database Migrations:**

    ```bash
    npm run migrate
    ```

5.  **Start Development Server:**
    ```bash
    npm run dev
    ```

---

🔗 API Endpoints

### 📂 Categories

| Method   | Endpoint                 | Description          |
| :------- | :----------------------- | :------------------- |
| `GET`    | `/api/v1/categories`     | List all categories  |
| `GET`    | `/api/v1/categories/:id` | Get category details |
| `POST`   | `/api/v1/categories`     | Create new category  |
| `PUT`    | `/api/v1/categories/:id` | Update category      |
| `DELETE` | `/api/v1/categories/:id` | Soft delete category |

### 📝 Posts

- **Query Filters:**
  - `category`: Filter by category ID
  - `status`: `published`, `draft`, `all`
  - `showDeleted`: `true`, `false`, `onlyDeleted`
  - `tagIds`: Filter by tag ID

| Method   | Endpoint            | Description             |
| :------- | :------------------ | :---------------------- |
| `GET`    | `/api/v1/posts`     | List posts with filters |
| `GET`    | `/api/v1/posts/:id` | Get post details        |
| `POST`   | `/api/v1/posts`     | Create new post         |
| `PUT`    | `/api/v1/posts/:id` | Update post             |
| `DELETE` | `/api/v1/posts/:id` | Soft delete post        |

### 💬 Comments

- **Query Filters:** `post`, `commenter`

| Method   | Endpoint               | Description                |
| :------- | :--------------------- | :------------------------- |
| `GET`    | `/api/v1/comments`     | List comments with filters |
| `GET`    | `/api/v1/comments/:id` | Get comment details        |
| `POST`   | `/api/v1/comments`     | Create new comment         |
| `PUT`    | `/api/v1/comments/:id` | Update comment             |
| `DELETE` | `/api/v1/comments/:id` | Soft delete comment        |

### 🏷 Tags

- **Query Filters:** `post`, `commenter`

| Method   | Endpoint           | Description     |
| :------- | :----------------- | :-------------- |
| `GET`    | `/api/v1/tags`     | List tags       |
| `GET`    | `/api/v1/tags/:id` | Get tag details |
| `POST`   | `/api/v1/tags`     | Create new tag  |
| `PUT`    | `/api/v1/tags/:id` | Update tag      |
| `DELETE` | `/api/v1/tags/:id` | Delete tag      |

### 🔗 Post – Tag Operations

- **Query Filters:** `post`, `commenter`

| Method   | Endpoint                  | Description           |
| :------- | :------------------------ | :-------------------- |
| `POST`   | `/api/v1//posts/:id/tags` | Add tags to post      |
| `DELETE` | `/api/v1/posts/:id/tags`  | Remove tags from post |

---

## 🛠 Technical Notes

- **Soft Delete:** Implemented using the `deleted_at` field. Deleted records remain in the DB but are hidden from standard queries.
- **Architecture:** Controllers, models, and routes are strictly separated.
- - **Tag Relations:** Uses many-to-many relation with a pivot table
    Pivot records are hard deleted.
- - **Filtering:** Existing filters preserved + tag-based filtering added.

- **Health Check:** Access `GET /projectcheck` to verify API status.
  ```json
  { "message": "OK" }
  ```

## 📮 Testing

A **Postman Collection** is included in the project folder to test all API endpoints with example request/response bodies.

## 📊 HTTP Status Codes

- `200 OK`
- `201 Created`
- `204 No Content`
- `400 Bad Request`
- `404 Not Found`
- `500 Internal Server Error`

## ✅ Project Status

- [x] Prisma ORM integration
- [x] MVC architecture applied
- [x] Tag system implemented
- [x] CRUD operations completed
- [x] Many-to-many relations
- [x] Soft delete implemented
- [x] Filtering via query parameters
- [x] Postman collection included
- [x] Ready for evaluation 🚀
