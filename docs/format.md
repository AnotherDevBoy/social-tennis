## Update tournament format

| URL                                  | Method | Auth |
|--------------------------------------|--------|------|
| /tournament/<tournament_id>/format   | PUT    | Yes  |

<details>

### Request

```json
{
    "winning_condition": "NUMBER_OF_SETS | NUMBER_OF_GAMES",
    "total_sets": "3",
    "total_games": "6",
    "advantage": true,
    "championship_tie_break": false
}
```

| Header | Example      | Description             |
|--------|--------------|-------------------------|
| Cookie | session=1234 | Player or Admin Session |

### Success Response

**Code** : `200`

```json
{
    "winning_condition": "NUMBER_OF_SETS | NUMBER_OF_GAMES",
    "total_sets": "3",
    "total_games": "6",
    "advantage": true,
    "championship_tie_break": false
}
```

### Error Response

**Code** : `404`

```json
{
    "error_code": "INVALID_X",
    "message": "X was null or empty"
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

## Get Tournament format

| URL                                | Method | Auth |
|------------------------------------|--------|------|
| /tournament/<tournament_id>/format | GET    | Yes  |

<details>

### Request

| Header | Example      | Description             |
|--------|--------------|-------------------------|
| Cookie | session=1234 | Player or Admin Session |

### Success Response

**Code** : `200`

```json
{
    "winning_condition": "NUMBER_OF_SETS | NUMBER_OF_GAMES",
    "total_sets": "3",
    "total_games": "6",
    "advantage": true,
    "championship_tie_break": false
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

</details>