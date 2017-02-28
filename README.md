# Reskongoal Project
REST API for Reskongoal Project Management Web App

## Quick start

### Clone the project
```sh
git clone git@github.com:paulochavesbr/reskongoal-api.git
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

- All API endpoints are prefixed with `/api`
- The API only works with JSON
- Only these endpoints don't need authentication:
  - `/`
  - `/auth/login`
- For all the other endpoints you need to authenticate. You need to set a header `Authorization` with `Bearer your-token`

</summary>
<details>
<summary><b>/</b> GET - Check if the API is up and running</summary>

</details>

<details>
<summary><b>/auth/login</b> POST - Logs a user in</summary>

- Request body

  ```json
  {
    "email": "paul@email.com",
    "password": "12345"
  }
  ```

- Response

  ```json
  {
    "token": "your-token",
    "email": "paul@email.com"
  }
  ```

</details>

<details>
<summary><b>/users</b> POST - Register a new user</summary>

- Constraints
  - The user email is unique
- Fields
  - `name [required]`
  - `email [required]`
  - `password [required]`
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
<summary><b>/users</b> GET - List users</summary>

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
<summary><b>/users/{userId}</b> GET - Find a user by his id</summary>

- All users can be found by providing his id
- Response

  ```json
  {
    "_id": "58b59c61c537a718e6255bf5",
    "name": "Paul",
    "email": "paul@email.com"
  }
  ```
</details>

<details>
<summary><b>/projects</b> GET - List projects of the user and projects shared with him</summary>

- Response

  ```json
  [
    {
      "_id": "58b5a16d3d80922497cc550a",
      "name": "Sample Project",
      "description": "Enjoy Reskongoal Project Management",
      "ownerId": "58b5a16d3d80922497cc5509",
      "team" : [],
      "lists": [{}],
      "backgroundColor": "white"
    }
  ]
  ```

</details>

<details>
<summary><b>/projects</b> POST - Add a new project</summary>

- If `lists` is `null`, then no list is gonna be created for this project
- If `lists` is omitted, then 3 default lists `To Do`, `Doing` and `Done` are gonna be created
- The default `backgroundColor` is `white`
- You may also inform members for the project
- Fields
  - `name [required]`
  - `description`
  - `backgroundColor`
  - `lists`
  - `team`
- Request

  ```json
  {
    "name": "Reskongoal Project",
    "description": "Project Management Web App",
    "backgroundColor": "blue",
    "lists": [
      {"pos": 0, "name": "TODO"},
      {"pos": 1, "name": "DOING"},
    ],
    "team": [
      {"_id": "58b5a16d3d80922497cc550a"}
    ]
  }
  ```

- Response

  ```json
  {
    "__v": 0,
    "updatedAt": "2017-02-28T17:28:44.733Z",
    "createdAt": "2017-02-28T17:28:44.733Z",
    "name": "Reskongoal Project",
    "description": "Project Management Web App",
    "ownerId": "58b5a16d3d80922497cc5509",
    "_id": "58b5b34cf691042eea4e93e5",
    "team": [
      {
        "_id": "58b5a16d3d80922497cc5509",
        "owner": true,
        "role": "ADMIN",
        "joinedAt": "2017-02-28T17:18:43.487Z"
      }
    ],
    "lists": [
      {
        "pos": 0,
        "name": "To Do",
        "_id": "58b5b34cf691042eea4e93e8",
        "createdAt": "2017-02-28T17:18:43.487Z"
      },
      {
        "pos": 1,
        "name": "Doing",
        "_id": "58b5b34cf691042eea4e93e7",
        "createdAt": "2017-02-28T17:18:43.487Z"
      },
      {
        "pos": 2,
        "name": "Done",
        "_id": "58b5b34cf691042eea4e93e6",
        "createdAt": "2017-02-28T17:18:43.487Z"
      }
    ],
    "backgroundColor": "blue"
  }
  ```

</details>

<details>
<summary><b>/projects/{projectId}</b> GET - Find a project by id</summary>

A user may access projects he owns or projects that have been shared with him

- Response

An array of projects

</details>

<details>
<summary><b>/projects/{projectId}/team</b> POST - Add members to a project</summary>

- You may not add a member twice in the same project
- Only the owner may add a member with ADMIN role in the project
- Only an admin member may add other members to a project
- The request body must be an array
- Fields
  - `_id [required]`: member id
  - `role`: member role in the project
- Request

  ```json
  [
    {"_id", "58b5b34cf691042eea4e93e6"},
    {"_id", "58b5b34cf691042eea4e93e6", "role": "ADMIN"},
  ]
  ```

</details>

<details>
<summary><b>/projects/{projectId}/team</b> GET - List the members of a project</summary>


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
