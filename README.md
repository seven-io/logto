<p align="center">
  <img src="https://www.seven.io/wp-content/uploads/Logo.svg" width="250" alt="seven logo" />
</p>

<h1 align="center">seven SMS Connector for Logto</h1>

<p align="center">
  Official <a href="https://logto.io/">Logto</a> connector for sending passcode SMS via the seven gateway.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-teal.svg" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/Logto-connector-blue" alt="Logto connector" />
  <img src="https://img.shields.io/badge/TypeScript-runtime-3178c6" alt="TypeScript runtime" />
</p>

---

## Features

- **Passwordless Sign-In** - Wire seven SMS into Logto's passcode sign-in experience
- **Per-Use-Case Templates** - Distinct message templates for `Register`, `SignIn` and `Test`
- **Custom Sender ID** - Override the displayed sender via the `from` field

## Prerequisites

- A [Logto](https://logto.io/) project (cloud or self-hosted)
- A [seven account](https://www.seven.io/) with API key ([How to get your API key](https://help.seven.io/en/developer/where-do-i-find-my-api-key))

## Configuration

In the Logto admin, add a new SMS connector and pick **seven**. Paste the JSON config below and edit the placeholders:

```json
{
  "apiKey": "<your-api-key>",
  "from":   "<your-sender-id>",
  "templates": [
    {
      "content":   "<register template - keep {{code}} placeholder>",
      "usageType": "Register"
    },
    {
      "content":   "<sign-in template - keep {{code}} placeholder>",
      "usageType": "SignIn"
    },
    {
      "content":   "<test template - keep {{code}} placeholder>",
      "usageType": "Test"
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `apiKey` | string | Your seven API key |
| `from` | string | Optional sender ID. Up to 11 alphanumeric or 16 numeric characters |
| `templates` | Template[] | One template per use case |

| Template field | Type | Allowed values |
|----------------|------|----------------|
| `content` | string | Free-form text. Must contain `{{code}}` placeholder |
| `usageType` | enum string | `Register` / `SignIn` / `Test` |

## Usage

1. Click **Test** in the connector settings to verify your setup with a real phone number.
2. After saving, [enable the connector in the sign-in experience](https://docs.logto.io/docs/tutorials/get-started/enable-passcode-sign-in/#enable-connector-in-sign-in-experience).

## Error codes

See seven's [SMS return codes](https://docs.seven.io/en/rest-api/endpoints/sms#return-codes) for what each numeric response means.

## Support

Need help? Feel free to [contact us](https://www.seven.io/en/company/contact/) or [open an issue](https://github.com/seven-io/logto/issues).

## License

[MIT](LICENSE)
