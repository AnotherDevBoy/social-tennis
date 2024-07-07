## Add match to tournament

| URL                               | Method | Auth |
|-----------------------------------|--------|------|
| /tournament/<tournament_id>/match | POST   | Yes  |

<details>

### Request

```json
{
    "winner_id": "c53ce3d0-4028-40ff-9b42-66bec280b301",
    "loser_id": "f072dfbe-0efe-44a8-866d-a5cd6b5cc1a3",
    "score": [
      "6-1",
      "2-6",
      "7-6"
    ]
}
```

| Header | Example      | Description             |
|--------|--------------|-------------------------|
| Cookie | session=1234 | Player or Admin Session |

### Success Response

**Code** : `200`

```json
{
    "id": "cf1c2b8f-bede-41d0-8ac4-1a81e6b2147f",
    "winner_id": "c53ce3d0-4028-40ff-9b42-66bec280b301",
    "loser_id": "f072dfbe-0efe-44a8-866d-a5cd6b5cc1a3",
    "score": [
      "6-1",
      "2-6",
      "7-6"
    ]
}
```

### Error Response

**Code** : `401`

```json
{
    "error_code": "UNAUTHORIZED",
    "message": "Unable to restore the session"
}
```

**Code** : `400`

```json
{
    "error_code": "INVALID_X", // Missing mandatory field
    "message": "X was null or empty"
}
```

</details>

## Get match

| URL                                          | Method | Auth |
|----------------------------------------------|--------|------|
| /tournament/<tournament_id>/match/<match_id> | POST   | Yes  |

<details>

### Request

| Header | Example      | Description             |
|--------|--------------|-------------------------|
| Cookie | session=1234 | Player or Admin Session |

### Success Response

**Code** : `200`

```json
{
    "id": "cf1c2b8f-bede-41d0-8ac4-1a81e6b2147f",
    "winner_id": "c53ce3d0-4028-40ff-9b42-66bec280b301",
    "loser_id": "f072dfbe-0efe-44a8-866d-a5cd6b5cc1a3",
    "score": [
      "6-1",
      "2-6",
      "7-6"
    ]
}
```

### Error Response

**Code** : `401`

```json
{
    "error_code": "UNAUTHORIZED",
    "message": "Unable to restore the session"
}
```

**Code** : `400`

```json
{
    "error_code": "NOT_FOUND",
    "message": "Match with ID <id> was not found in the tournament"
}
```

</details>

## Update match

| URL                               | Method | Auth |
|-----------------------------------|--------|------|
| /tournament/<tournament_id>/match | PUT    | Yes  |

<details>

### Request

```json
{
    "id": "cf1c2b8f-bede-41d0-8ac4-1a81e6b2147f",
    "winner_id": "c53ce3d0-4028-40ff-9b42-66bec280b301",
    "loser_id": "f072dfbe-0efe-44a8-866d-a5cd6b5cc1a3",
    "score": [
      "6-1",
      "2-6",
      "7-6"
    ]
}
```

| Header | Example      | Description             |
|--------|--------------|-------------------------|
| Cookie | session=1234 | Player or Admin Session |

### Success Response

**Code** : `200`

```json
{
    "id": "cf1c2b8f-bede-41d0-8ac4-1a81e6b2147f",
    "winner_id": "c53ce3d0-4028-40ff-9b42-66bec280b301",
    "loser_id": "f072dfbe-0efe-44a8-866d-a5cd6b5cc1a3",
    "score": [
      "6-1",
      "2-6",
      "7-6"
    ]
}
```

### Error Response

**Code** : `401`

```json
{
    "error_code": "UNAUTHORIZED",
    "message": "Unable to restore the session"
}
```

**Code** : `401`

```json
{
    "error_code": "UNAUTHORIZED",
    "message": "You don't have permissions to perform this action"
}
```

**Code** : `400`

```json
{
    "error_code": "INVALID_X", // Missing mandatory field
    "message": "X was null or empty"
}
```

**Code** : `400`

```json
{
    "error_code": "INVALID_X",
    "message": "The winner_id | loser_id cannot be modified"
}
```

</details>

## Delete match

| URL                                          | Method | Auth |
|----------------------------------------------|--------|------|
| /tournament/<tournament_id>/match/<match_id> | DELETE | Yes  |

<details>

### Request

| Header | Example      | Description             |
|--------|--------------|-------------------------|
| Cookie | session=1234 | Player or Admin Session |

### Success Response

**Code** : `202`

### Error Response

**Code** : `401`

```json
{
    "error_code": "UNAUTHORIZED",
    "message": "Unable to restore the session"
}
```

**Code** : `401`

```json
{
    "error_code": "UNAUTHORIZED",
    "message": "You don't have permissions to perform this action"
}
```

**Code** : `404`

```json
{
    "error_code": "NOT_FOUND",
    "message": "The match with ID <id> was not found in the tournament"
}
```

</details>