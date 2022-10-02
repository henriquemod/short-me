[![Cypress Tests](https://github.com/henriquemod/short-me/actions/workflows/e2e-tests.yml/badge.svg)](https://github.com/henriquemod/short-me/actions/workflows/e2e-tests.yml)
[![Unit Tests](https://github.com/henriquemod/short-me/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/henriquemod/short-me/actions/workflows/unit-tests.yml)
[![Build Backend Image](https://github.com/henriquemod/short-me/actions/workflows/backend-image.yml/badge.svg)](https://github.com/henriquemod/short-me/actions/workflows/backend-image.yml)
[![Build Frontend Image](https://github.com/henriquemod/short-me/actions/workflows/frontend-image.yml/badge.svg)](https://github.com/henriquemod/short-me/actions/workflows/frontend-image.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7c69e781-2f32-4865-83e0-edbcf8e32b82/deploy-status)](https://app.netlify.com/sites/shortm3/deploys)
[![Loading Tests](https://github.com/henriquemod/short-me/actions/workflows/loadingtest.yml/badge.svg)](https://github.com/henriquemod/short-me/actions/workflows/loadingtest.yml)

<p align="center">
  <a href="https://example.com/">
    <img src="https://user-images.githubusercontent.com/43145168/190028991-b3e30dfe-8d51-4737-94b0-2bff87e62c88.png" alt="Logo" width="250">
  </a>
  <p align="center">
    A minimalist url shortener
    <br>
    <a href="https://github.com/henriquemod/projeto-faculdade/issues/new">Report bug</a>
    ·
    <a href="https://github.com/henriquemod/projeto-faculdade/issues/new?labels=feature">Request feature</a>
  </p>
</p>

## About

This project is a monorepo made with [Lerna](https://lerna.js.org) and, at this moment, is proof of concept, its purpose is testing, while its a quite simple application, a lot of tests is need in order to ensure its quality, also, not testing your software is just unprofessional.

## Project Structure

```text
shortme/
└── packages/
    ├── frontend/
    │   ├── file1
    │   ├── file2
    |   └── ...
    └── backend/
        ├── file3
        ├── file4
        └── ...
```

## Frontend

To initialize service make sure youre at packages/frontend and

```bash
yarn
yarn dev
```

For unit tests:

```bash
yarn test
```

For e2e tests with Cypress:
_Requires either front and backend up_

```bash
yarn cypress open
```

## Backend

Fist make sure youre at packages/backend, then you can choose if you want to initialize with a container or not.

Normal:

```bash
yarn
yarn build
yarn dev
```

Container:

```bash
yarn
docker build -t shortme/backend .
docker-compose up -d
```

For unit tests:

```bash
yarn test
```
