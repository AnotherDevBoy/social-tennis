## Player Login

| URL                               | Method | Auth |
|-----------------------------------|--------|------|
| /tournament/<tournament_id>/login | POST   | No   |

<details>

### Request

```json
{
    "password": "123"
}
```

### Success Response

**Code** : `200`

| Header     | Example      | Description    |
|------------|--------------|----------------|
| Set-Cookie | session=1234 | Player Session |

### Error Response

**Code** : `401`

```json
{
    "error_code": "INVALID_PASSWORD",
    "message": "The 'password' is invalid or did not match the expected password"
}
```

</details>

## Admin Login

| URL                                     | Method | Auth |
|-----------------------------------------|--------|------|
| /tournament/<tournament_id>/admin/login | POST   | No   |

<details>

### Request

```json
{
    "password": "123"
}
```

### Success Response

**Code** : `200`

| Header     | Example      | Description    |
|------------|--------------|----------------|
| Set-Cookie | session=1234 | Admin Session |

### Error Response

**Code** : `401`

```json
{
    "error_code": "INVALID_PASSWORD",
    "message": "The 'password' is invalid or did not match the expected password"
}
```

</details>
