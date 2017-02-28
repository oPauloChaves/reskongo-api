# reskongo-api
REST API for Reskongo Project Management Web App

## Quick start

### Clone the project
```sh
git clone git@github.com:paulochavesbr/reskongo-api.git
```

### Install all dependencies
```sh
yarn install
```

### Run in dev mode
```sh
yarn run dev
```

### Run in production mode
```sh
yarn start
```

-------------------------------------

## API Endpoints
</summary>
<details>
<summary>:black_small_square: GET /api - Check if the API is up and running</summary>

</details>

<details>
<summary>:black_small_square: POST /api/users - Register a new user</summary>

- Request body

  ```json
  {
    "name": "Paul",
    "email": "paul@email.com",
    "password": "12345"
  }
  ```
- Response

  - **201** - Created
  
    ```json
    {
      "token": "your-token",
      "email": "paul@email.com"
    }
    ```
    
</details>

<details>
<summary>:black_small_square: GET /api/users - List users</summary>

- Request header
  - `Authorization: Bearer your-token`
- Response

  ```json
  [
    {
      "_id": "58b59c61c537a718e6255bf5",
      "updatedAt": "2017-02-28T15:50:57.310Z",
      "createdAt": "2017-02-28T15:50:57.310Z",
      "name": "Paul",
      "email": "paul@email.com"
    }
  ]
  ```
</details>

<details>
<summary>:black_small_square: GET /api/users/{userId} - Find a user by his id</summary>

- Request header
  - `Authorization: Bearer your-token`
- Response

  ```json
  {
    "_id": "58b59c61c537a718e6255bf5",
    "updatedAt": "2017-02-28T15:50:57.310Z",
    "createdAt": "2017-02-28T15:50:57.310Z",
    "name": "Paul",
    "email": "paul@email.com"
  }
  ```
</details>

-------------------------------------

## TODO
- [ ] Users
  - [X] Place the logic create the JWT in a single place to avoid DRY
  - [X] Select fields to display when a user is requested.
- [ ] Add a new list to a project and its endpoint
- [ ] Add members to a project
  - [X] To simplify coding, also add the project's owner in the member's array and mark him as
        { owner: true }
  - [ ] Don't add a user who is already a member of the project
  - [ ] When requesting, send the members as an array of members, thus allowing a user to add
        more than one at once
  - [ ] If the user adding a new member isn't the project's owner, but an ADMIN, he may also 
        add members
  - [ ] Only the project owner may add ADMIN members, in other words, users with ADMIN role
  - [ ] When adding a member, if it's the project's owner, he can choose the member's role for the
        project. Possible roles are DEV|ADMIN|CLIENT. It he doesn't provide a role, by default 
        the new member will be a DEV.
  - [ ] A project may have up to 5 members
- [X] Add validation with express-validator
- [ ] Seed the app with some data to ease tests in dev mode
- [X] List endpoints and docs about them

-------------------------------------

### Useful resources
- [Managing Environment Variables in Node.js](https://medium.com/@rafaelvidaurre/managing-environment-variables-in-node-js-2cb45a55195f)
- [sahat/hackathon-starter](https://github.com/sahat/hackathon-starter/)
