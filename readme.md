# Eastern Beauty - Restful API

Eastern beauty is a website providing information and recipes for good welfare. This is the Restful API connecting the front-end with the database.

## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install the dependencies.

```bash
npm install
```

## Usage

To start the API

```bash
npm start
```

Run on [http://localhost:3900/api](http://localhost:3900/api)

### Endpoints

| Method |                     Endpoint                      |                                                                        Description                                                                         |
| ------ | :-----------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: |
| POST   |                       /auth                       |                                                                     For authorization                                                                      |
| GET    |     [/users](http://localhost:3900/api/users)     |                                              Returns a list of all users sorted by name exclude the password                                               |
| POST   |                      /users                       |                                    For adding a new user. Requires an object = {name, gender, email, password, isAdmin}                                    |
| GET    | [/customers](http://localhost:3900/api/customers) |                                             Returns list of all customers sorted by name exclude the password                                              |
| GET    |                  /customers/:id                   |                                                          Returns the user by given ID via params                                                           |
| POST   |                    /customers                     |                             For adding a new customer. Requires an object = {name, email, password, phone, isGold: (boolean)}                              |
| PUT    |                  /customers/:id                   | For update the customer information. Requires object = { name, email, phone, isGold: (boolean) } with the updated, and the user ID through params ( /:id ) |
| DELETE |                  /customers/:id                   |                                                        Delete the customer with given ID via params                                                        |
| GET    |    [ /herbs ](http://localhost:3900/api/herbs)    |                                                      Returns a full list of the herbs in the database                                                      |
| POST   |                      /herbs                       |             For adding a new herb to the database. Requires object = { name, synonims, tags, location, usedParts, chemicalIngredients, usage }             |
| DELETE |                    /herbs/:id                     |                                                          Delete the herb with given ID via params                                                          |

### Examples

In this API we have several endpoints listed in the table above. We can use these endpoints to perform actions. To understand the process in-depth, I perform a sample HTTP request examples.

#### GET users from the database using Axios

```javascript
axios
  .get("/users")
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
