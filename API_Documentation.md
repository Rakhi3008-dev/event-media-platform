# EventHub API Documentation

## Base URL

```
https://event-media-platform.onrender.com/api
```

---

# Authentication

### User Signup

**POST** `/auth/signup`

Request Body:

```json
{
  "name": "rakhi",
  "email": "rakhii@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Rakhi Jha",
    "email": "rakhi@gmail.com"
  }
}
```

---

### User Login

**POST** `/auth/login`

Request Body:

```json
{
  "email": "rakhii@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "success": true,
  "token": "JWT_TOKEN"
}
```

---

# Events

### Get All Events

**GET** `/events`

Response:

```json
[
  {
    "id": 1,
    "title": "Hackathon",
    "category": "Technical"
  }
]
```

---

### Create Event

**POST** `/events`

Headers:

```
Authorization: Bearer <JWT_TOKEN>
```

Form Data:

| Field       | Type   |
| ----------- | ------ |
| title       | String |
| description | String |
| category    | String |
| event_date  | Date   |
| visibility  | String |
| coverImage  | File   |

---

# Media

### Upload Media

**POST** `/media/upload`

Headers:

```
Authorization: Bearer <JWT_TOKEN>
```

Form Data:

| Field    | Type    |
| -------- | ------- |
| event_id | Integer |
| file     | Image   |

---

### Get Event Media

**GET**

```
/media/event/:eventId
```

Query Parameters:

| Parameter | Description           |
| --------- | --------------------- |
| search    | Search by tag         |
| user      | Search by uploader    |
| date      | Search by upload date |

Example:

```
/media/event/1?search=photo&user=Rakhi&date=2026-06-09
```

---

### Delete Media

**DELETE**

```
/media/:id
```

Headers:

```
Authorization: Bearer <JWT_TOKEN>
```

---

### Download Watermarked Media

**GET**

```
/media/download/:id
```

---

# Interactions

### Like Media

**POST**

```
/interactions/like/:mediaId
```

Headers:

```
Authorization: Bearer <JWT_TOKEN>
```

---

### Add Comment

**POST**

```
/interactions/comment/:mediaId
```

Request Body:

```json
{
  "comment": "Great Picture!"
}
```

---

### Get Likes Count

**GET**

```
/interactions/likes/:mediaId
```

---

### Get Comments

**GET**

```
/interactions/comment/:mediaId
```

---

# Face Recognition

### Upload Selfie

**POST**

```
/face/upload-selfie
```

Headers:

```
Authorization: Bearer <JWT_TOKEN>
```

Form Data:

| Field  | Type  |
| ------ | ----- |
| selfie | Image |

---

### Find Matching Photos

**GET**

```
/face/my-photos
```

Headers:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Dashboard

### Analytics

**GET**

```
/dashboard/stats
```

Response includes:

* Total Events
* Total Media
* Total Likes
* Total Comments
* Most Popular Event
* Likes Per Event
* Media Per Event

---

## Authentication Method

The application uses JWT (JSON Web Token) authentication.

Protected routes require the following header:

```
Authorization: Bearer <JWT_TOKEN>
```
