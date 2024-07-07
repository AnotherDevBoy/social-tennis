# Tournament API

## Create Tournament

| URL         | Method | Auth |
|-------------|--------|------|
| /tournament | POST   | No   |

<details>

### Request

```json
{
    "title": "FNST",
    "subtitle": "Dublin LTC",
    "admin_password": "123",
    "user_password": "321"
}
```

### Success Response

**Code** : `201`

```json
{
    "id": "829a93c4-accd-426d-a574-7e1b60bb40ba",
    "title": "FNST",
    "subtitle": "Dublin LTC",
    "status": "ENTRY_OPEN | STARTED | COMPLETED",
    "format": {},
    "players": [],
    "pairings": [],
    "matches": [],
}
```

### Error Response

**Code** : `400`

```json
{
    "error_code": "INVALID_TITLE",
    "message": "The 'title' is empty"
}
```

</details>

## Get Tournament

| URL                         | Method | Auth |
|-----------------------------|--------|------|
| /tournament/<tournament_id> | GET   | No   |

<details>

### Request

| Header | Example      | Description             |
|--------|--------------|-------------------------|
| Cookie | session=1234 | Player or Admin Session |

### Success Response

**Code** : `200`

```json
{
    "id": "829a93c4-accd-426d-a574-7e1b60bb40ba",
    "title": "FNST",
    "subtitle": "Dublin LTC",
    "status": "ENTRY_OPEN | STARTED | COMPLETED",
    "format": {},
    "players": [],
    "pairings": [],
    "matches": [],
}
```

### Error Response

**Code** : `400`

```json
{
    "error_code": "INVALID_TITLE",
    "message": "The 'title' is empty"
}
```

**Code** : `404`

```json
{
    "error_code": "NOT_FOUND",
    "message": "The 'tournament' with ID <id> was not found"
}
```

</details>
