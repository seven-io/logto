# Seven short message service connector

The official Logto connector for Seven short message service.

**Table of contents**

- [Seven short message service connector](#seven-short-message-service-connector)
  - [Register Seven account](#register-seven-account)
  - [Get API key](#get-api-key)
  - [Compose the connector JSON](#compose-the-connector-json)
    - [Test Seven SMS connector](#test-seven-sms-connector)
    - [Config types](#config-types)
  - [Error codes](#error-codes)

## Register seven account

Create a new account on [seven](https://www.seven.io). (Jump to the next step if you already have one.)

## Get API key

See the [helpdesk article](https://help.sms77.io/en/api-key-access) on how to retrieve your API key.

## Compose the connector JSON

Fill out the field _apiKey_ and optionally _from_.

You can add multiple SMS connector templates for different cases. Here is an example of adding a single template:

- Fill out the `content` field with arbitrary string-typed contents. Do not forget to leave `{{code}}` placeholder for random passcode.
- Fill out the `usageType` field with either `Register`, `SignIn` or `Test` for different use cases.

Here is an example of seven SMS connector config JSON.

```json
{
    "apiKey": "<your-api-key>",
    "from": "<from>",
    "templates": [
        {
            "content": "<arbitrary-register-template-contents: your passcode is {{code}}>",
            "usageType": "Register"
        },
        {
            "content": "<arbitrary-sign-in-template-contents: your passcode is {{code}}>",
            "usageType": "SignIn"
        },
        {
            "content": "<arbitrary-test-template-contents: your passcode is {{code}}>",
            "usageType": "Test"
        }
    ]
}
```

### Test seven SMS connector

You can enter a phone number and click on "Send" to see whether the settings can work before "Save and Done".

That's it. Don't forget to [Enable connector in sign-in experience](https://docs.logto.io/docs/tutorials/get-started/enable-passcode-sign-in/#enable-connector-in-sign-in-experience).

### Config types

| Name      | Type        |
|-----------|-------------|
| apiKey    | string      |
| from      | string      |
| templates | Templates[] |

| Template Properties | Type        | Enum values                     |
|---------------------|-------------|---------------------------------|
| content             | string      | N/A                             |
| usageType           | enum string | 'Register' \ 'SignIn' \ 'Test' |

## Error codes

- [seven - error codes](https://www.sms77.io/en/docs/gateway/http-api/sms-dispatch/#return)
