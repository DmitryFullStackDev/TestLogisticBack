# 🚛 TestLogisticBack

**TestLogisticBack** is the backend component of the TestLogistic application, providing API endpoints and server-side logic to support the frontend interface.

- 🔗 **Frontend**: [here](https://github.com/DmitryFullStackDev/TestLogistic)
- 🔗 **Live Backend**: [test-logistic-back.vercel.app](https://test-logistic-back.vercel.app)

---

## ✨ Features

- ⚙️ Node.js backend with Express.js
- 🧪 API endpoints for logistics operations
- 📦 Package management with npm
- 📄 Configured with ESLint and Prettier for code quality
- 🚀 Deployed on Vercel for seamless CI/CD

---

## 🛠️ Getting Started

### 📋 Prerequisites

- 🟢 Node.js (v14 or higher)
- 📦 npm package manager

## 🛣️ API Endpoints

### 🔍 `GET /getListOfCities`

Returns a list of cities matching a given search string.

#### ✅ Query Parameters

| Name    | Type   | Required | Description                      |
|---------|--------|----------|----------------------------------|
| string  | string | ✅ yes    | The substring to match cities on |

#### 🧪 Example Request

```http
GET /getListOfCities?string=Par
```

#### ✅ Successful Response
```yaml
{
  "result": [
    ["Paris", 48.8566, 2.3522]
  ]
}
```
#### ❌ Error Responses
- If string is not provided:
```yaml
{
  "message": "string is not provided"
}
```
- If string is "fail" (case-insensitive):
```yaml
{
  "message": "fail is not allowed"
}
```

### 📏 POST /calcDistance
Calculates Haversine distances between an ordered list of cities.

#### 📥 Request Body
```yaml
{
  "data": [
    ["Paris", 48.8566, 2.3522],
    ["Berlin", 52.52, 13.405]
  ]
}
```

#### ✅ Successful Response
```yaml
{
  "result": {
    "Paris-and-Berlin": 878503.741
  }
}
```
#### ❌ Error Responses
- If any city is not found in the model:
```yaml
{
  "message": "UnknownCity - not in the model",
  "data": [
    ["UnknownCity", 1.23, 4.56]
  ]
}
```
- If any city is "dijon" or "fail" (case-insensitive):

```yaml
{
  "message": "Dijon is not allowed"
}
```
