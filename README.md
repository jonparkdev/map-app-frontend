## Set Up

Assumptions: lts node is installed

After cloning the repo, in your terminal (assuming node is installed) run the following commands

```bash
$ cd map-app-frontend/
$ yarn install
$ yarn dev
```
And you should be good to go running on port 3000!

Note that a custom node server is running to reverse proxy requests
to localhost:8000 where the django server is listening.
