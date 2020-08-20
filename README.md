# Team Mint Oreo: Babl <!-- omit in toc -->

**_Table of Contents:_**

- [Preview](#preview)
- [About](#about)
- [Authors](#authors)
- [Setup Guide](#setup-guide) - [Prerequisites](#prerequisites) - [Getting Started](#getting-started)

# Preview

This project is currently live at https://babl-babl.herokuapp.com/

![Login Preview](./pics/login.png)

# About

Babl: The messaging app with built in translation. Have you ever had trouble communicating with someone in a foreign language? Fear not, Babl is here.

Babl automatically translates text messages sent from your friends to your native language. No matter what language they speak, you will have a translation to your primary language.

**Tech Stack**

MERN (Mongo, Express, React, Node)

|      Other Highlights       |
| :-------------------------: |
|         material-ui         |
|          socket.io          |
| googleapis/nodejs-translate |
|         aws-sdk-js          |
|          Send Grid          |

# Authors

Built by [Jimmy](https://github.com/Rocket-Fish), [Brian](https://github.com/brianqian), and [Sang min](https://github.com/slee288)

# Setup Guide

## Prerequisites

In order to run this project locally you **must** have [node.js](https://nodejs.org/en/) installed.

This project was built on the following node version.

```bash
$ node --version
v10.15.3
```

You must also create a `.env` file in `./server` with the following variables:

```bash
# randomly generated
JWT_SECRET=" "
COOKIE_SECRET=" "

# obtained from sendgrid
SENDGRID_API_KEY=" "

# obtained from mongoDB
MONGO_URI=" "

#obtained from AWS
AWS_ID=" "
AWS_SECRET=" "
AWS_BUCKET_NAME=" "

# obtained from google apis. The file itself belongs in the root server directory ./server
GOOGLE_APPLICATION_CREDENTIALS="google_api_credentials.json"

# name and port of your local server. With out setup, requests to port 3000 are proxied to the backend.
HOST_NAME= "http://localhost:3000"
```

One more `.env` file needs to be created in `./client`

```bash

# the REACT_APP_ prefix is required
REACT_APP_HOST_NAME="http://localhost:3000"

```

If any of the above environment variables are missing the project will loose functionality or even fail to run.

If you are just here for a demo this project is live at: https://babl-babl.herokuapp.com/

## Getting Started

```bash
git clone https://github.com/hatchways/team-mint-oreo.git
```

```bash
npm run installation
```

```bash
npm run dev
```
