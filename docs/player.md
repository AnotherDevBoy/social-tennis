## Add player to tournament

| URL                                | Method | Auth |
|------------------------------------|--------|------|
| /tournament/<tournament_id>/player | POST   | Yes  |

<details>

### Request

```json
{
    "name": "Alfred",
    "surname": "Smith",
    "email": "email.gmail.com",
    "level": "A"
}
```

### Success Response

**Code** : `200`

```json
{
    "id": "c53ce3d0-4028-40ff-9b42-66bec280b301",
    "name": "Alfred",
    "surname": "Smith",
    "email": "email.gmail.com",
    "level": "A"
}
```

### Error Response

**Code** : `400`

```json
{
    "error_code": "PLAYER_ALREADY_EXISTS",
    "message": "Cannot add player since they were already added"
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

## Get Player

| URL                                            | Method | Auth |
|------------------------------------------------|--------|------|
| /tournament/<tournament_id>/player/<player_id> | GET    | Yes  |

<details>

### Request

| Header | Example      | Description             |
|--------|--------------|-------------------------|
| Cookie | session=1234 | Player or Admin Session |

### Success Response

**Code** : `200`

```json
{
    "id": "c53ce3d0-4028-40ff-9b42-66bec280b301",
    "name": "Alfred",
    "surname": "Smith",
    "email": "email.gmail.com",
    "level": "A"
}
```

### Error Response

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
    "message": "The player with ID <id> was not found in the tournament"
}
```

</details>

## Edit Player

| URL                                | Method | Auth |
|------------------------------------|--------|------|
| /tournament/<tournament_id>/player | PUT    | Yes  |

<details>

### Request

```json
{
    "name": "Alfred",
    "surname": "Smith",
    "email": "email.gmail.com",
    "level": "A"
}
```

| Header | Example      | Description             |
|--------|--------------|-------------------------|
| Cookie | session=1234 | Player or Admin Session |

### Success Response

**Code** : `200`

```json
{
    "id": "c53ce3d0-4028-40ff-9b42-66bec280b301",
    "name": "Alfred",
    "surname": "Smith",
    "email": "email.gmail.com",
    "level": "A"
}
```

### Error Response

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

</details>

## Delete Player

| URL                                            | Method | Auth |
|------------------------------------------------|--------|------|
| /tournament/<tournament_id>/player/<player_id> | DELETE | Yes  |

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
    "message": "You don't have permissions to perform this action"
}
```

**Code** : `404`

```json
{
    "error_code": "NOT_FOUND",
    "message": "The player with ID <id> was not found in the tournament"
}
```

</details>
