# Donation Manager — Full Stack Project

## Project Overview

This is a simple full stack application to manage donations. It includes:

- **Backend:** Node.js with Express, storing data in a JSON file (`donations.json`).
- **Frontend:** React with Material UI for UI components.
- **Features:** Create, read, update, and delete donations via REST API and frontend UI.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed (version 14+ recommended)
- npm (comes with Node.js)
- Git (optional, for cloning repo)

---

## Backend Setup

1. Open terminal and navigate to the `backend folder`.

2. Install dependencies:

```bash
npm install

```

```bash
node server.js
```

```bash
http://localhost:3001
```

## API Documentation

#### Returns all registered donations

```http
  GET /donations
```


#### Creates a new donation

```http
  POST /donations
```

| Params   | Type        | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Body`      | `object` |  Donation data (example below) |

```json
{
  "donorName": "Jane Smith",
  "type": "clothing",
  "amount": "7",
  "date": "2025-07-15"
}
```

#### Update donations

Update data donations

```htpp
PUT /donations/${id}
```

| Params   | Type        | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` |  Required: ID of the donation to edit |
| `body`      | `object` |  Updated donation data (example below) |

```json
{
  "id": 1231231231
  "donorName": "Jane Smith",
  "type": "clothing",
  "amount": "7",
}
```

```htpp
DELETE /donations/${id}
```

| Params   | Type        | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` |  Required: ID of the donation to delete |
| `body`      | `object` |  Donation data (example below)|

```json
{
  "id": 1231231231
  "donorName": "Jane Smith",
  "type": "clothing",
  "amount": "7",
}
```

## Front-End Setup

1. Navigate to the frontend folder

2. Install dependencies

```bash
npm install

```

```bash
npm start
```

```bash 
http://localhost:3000
```

## Usage

- Fill out the form to add a new donation.
- Donations will be listed below with options to delete (and optionally edit).
- The form supports donation types like money, food, clothing, or a custom type.
- All donations are saved through the backend API (/donations).

## Notes
- Ensure the backend is running on port 3001 before using the frontend.
- If you change the backend port, update the fetch URLs in your frontend code accordingly.
