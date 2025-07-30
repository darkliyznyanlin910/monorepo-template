# Authentication Notes

## User fields

## JWT

Token:

```
HlgzhfNPOkrv0ba6EAskxTt79Uot8lLY
```

JWT:

```
eyJhbGciOiJFZERTQSIsImtpZCI6InZTb1VZcGp5N3dzY29CT0lUS01Fdm5rN09pZWdHVGFuIn0.eyJuYW1lIjoiSm9obm55IiwiZW1haWwiOiJrbnlhbmxpbkBqb2hubnlrbmwuY29tIiwiZW1haWxWZXJpZmllZCI6ZmFsc2UsImltYWdlIjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA3LTMwVDIxOjQwOjA2LjEzOVoiLCJ1cGRhdGVkQXQiOiIyMDI1LTA3LTMwVDIxOjQwOjA2LjEzOVoiLCJpZCI6IjZieXBYS0dEMlAwd1V1S3FvWVU3ZGl3ZVdXSUFpdzFCIiwiaWF0IjoxNzUzOTExNzc3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjE3NTM5MTI2NzcsInN1YiI6IjZieXBYS0dEMlAwd1V1S3FvWVU3ZGl3ZVdXSUFpdzFCIn0.O5cvVpOUDXRmRDWW-A-8nf9f7Dq2vp5-KLfVfH5qPxc6e5Uj-224viFHRggIOiFfyAeWx_lhhqi6Zn-ah4Z7Dw
```

JWT Decoded Payload:

```json
{
  "name": "Johnny",
  "email": "knyanlin@johnnyknl.com",
  "emailVerified": false,
  "image": null,
  "createdAt": "2025-07-30T21:40:06.139Z",
  "updatedAt": "2025-07-30T21:40:06.139Z",
  "id": "6bypXKGD2P0wUuKqoYU7diweWWIAiw1B",
  "iat": 1753911777,
  "iss": "http://localhost:3000",
  "aud": "http://localhost:3000",
  "exp": 1753912677,
  "sub": "6bypXKGD2P0wUuKqoYU7diweWWIAiw1B"
}
```

JWKs

```json
{
  "keys": [
    {
      "crv": "Ed25519",
      "x": "ZN_X1Zn3iANt5tvCMgkbmx7edcshz_SryYzWPJvIVuM",
      "kty": "OKP",
      "kid": "vSoUYpjy7wscoBOITKMEvnk7OiegGTan"
    }
  ]
}
```

## Organization

Reference: [BetterAuth: Organization Plugin](https://www.better-auth.com/docs/plugins/organization)

## Caching with Secondary Storage

Reference: [BetterAuth: Secondary Storage Docs](https://www.better-auth.com/docs/reference/options#secondarystorage)
