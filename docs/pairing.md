## Add pairings to tournament

| URL                                  | Method | Auth |
|--------------------------------------|--------|------|
| /tournament/<tournament_id>/pairing  | POST   | Yes  |

<details>

### Request

```json
[
    {
        "player_1": "be552e5d-3c1f-4ed5-b800-a2015a85e45c",
        "player_2": "c7542d4c-8a38-4a2b-9c7f-5f77093dcbb8"
    }, ...
]
```

| Header | Example      | Description             |
|--------|--------------|-------------------------|
| Cookie | session=1234 | Player or Admin Session |

### Success Response

**Code** : `200`

```json
[
    {
        "id": "6d9d5b12-c5a5-4671-987f-a0ed3647a157",
        "player_1": "be552e5d-3c1f-4ed5-b800-a2015a85e45c",
        "player_2": "c7542d4c-8a38-4a2b-9c7f-5f77093dcbb8"
    }, ...
]
```

### Error Response
```

**Code** : `404`

```json
{
    "error_code": "PLAYER_NOT_FOUND",
    "message": "Player with ID <id> is not in the tournament"
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
    "error_code": "UNABLE_TO_PAIR",
    "message": "The players are not of the same level"
}
```

</details>

## Get pairings

| URL                                  | Method | Auth |
|--------------------------------------|--------|------|
| /tournament/<tournament_id>/pairing  | GET    | Yes  |

<details>

### Request

| Header | Example      | Description             |
|--------|--------------|-------------------------|
| Cookie | session=1234 | Player or Admin Session |

### Success Response

**Code** : `200`

```json
[
    {
        "id": "6d9d5b12-c5a5-4671-987f-a0ed3647a157",
        "player_1": "be552e5d-3c1f-4ed5-b800-a2015a85e45c",
        "player_2": "c7542d4c-8a38-4a2b-9c7f-5f77093dcbb8"
    }, ...
]
```

### Error Response

**Code** : `401`

```json
{
    "error_code": "UNAUTHORIZED",
    "message": "You don't have permissions to perform this action"
}
```

</details>

## Delete pairing

| URL                                              | Method | Auth |
|--------------------------------------------------|--------|------|
| /tournament/<tournament_id>/pairing/<pairing_id> | DELETE | Yes  |

<details>

### Request

| Header | Example      | Description             |
|--------|--------------|-------------------------|
| Cookie | session=1234 | Player or Admin Session |

### Success Response

**Code** : `202`

### Error Response

**Code** : `404`

```json
{
    "error_code": "PAIRING_NOT_FOUND",
    "message": "The pairing with ID <id> is not in the tournament"
}
```

**Code** : `401`

```json
{
    "error_code": "UNAUTHORIZED",
    "message": "You don't have permissions to perform this action"
}
```

</details>