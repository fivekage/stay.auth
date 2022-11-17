# Stay Authentication

> ## Verify a token validity from a token and get the user information
>
> Send a 200 code with user claims if token is valid
> Send a 401 code if token is invalid

## How to use

Call the endpoint with a token in the header

`https://exampledomain.com/verify`

And manage your code with the answer, example:

```js
axios
  .get("https://exampledomain.com/verify")
  .then((resp) => {
    // Handle success response
    console.log(resp.data);
  })
  .catch((err) => {
    // Handle error response
    console.log(err);
  });
```

---

Author: **Samy MOKHTARI**

---

Powered by NodeJS
