## Twitter Login w/ Express

### Instructions.

- Add `config.json` in the root directory with the skeleton given below

```json
{
  "twitter": {
    "consumerKey": "-----",
    "consumerSecret": "----",
    "callbackURL": "http://127.0.0.1:3001/login/twitter/return"
  },
  "database": {
    "url": "-----"
  },
  "server": {
    "PORT": 3000
  },
  "express": {
    "secret": "some-secret"
  }
}

```
- `yarn install` to install the dependencies.
- `yarn start` to start the server w/ nodemon.


### DB Design.

1. Conference - Details of a conference.
2. Video - Details of a video object. Contains Reference to Speakers, Conference, Tech, and Added By (User).
3. Speaker - Details about a Speaker.
4. Categories/Tech - Details about a Categories.
5. Tags - Tags on a Video.
