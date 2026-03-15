# SIT725 2.2P – Calculator REST API

Student ID: **220086695**  
Unit: SIT725 Applied Software Engineering, T1 2026

## Overview

A simple REST API built with **Node.js** and **Express** that exposes basic calculator operations. Demonstrates the use of `GET` (query parameters) and `POST` (JSON body) request methods.

## Setup

```bash
npm install
npm start
```

Server starts at **http://localhost:3000**

---

## Endpoints

### GET endpoints (query parameters)

| URL | Description | Example |
|-----|-------------|---------|
| `GET /add?a=5&b=3` | Add two numbers | → `{ "result": 8 }` |
| `GET /subtract?a=10&b=4` | Subtract b from a | → `{ "result": 6 }` |
| `GET /multiply?a=6&b=7` | Multiply two numbers | → `{ "result": 42 }` |
| `GET /divide?a=20&b=4` | Divide a by b | → `{ "result": 5 }` |

### POST endpoint (JSON body)


Supported operations: `add`, `subtract`, `multiply`, `divide`

**Example response:**

```json
{
  "operation": "add",
  "a": 10,
  "b": 5,
  "result": 15
}
```

---

## Testing with curl

```bash
# GET – add
curl "http://localhost:3000/add?a=5&b=3"

# GET – divide
curl "http://localhost:3000/divide?a=20&b=4"

