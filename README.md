# Photogram-Friends

This project is deployed on [Photgram-friends](https://photogram-friends.netlify.app/).

## Table of Contents

- [Folder Structure](#folder-structure)
- [Frontend](#frontend)
- [Backend](#backend)
- [ENV file](#env-file)
- [About Project](#about-project)
- [Screenshots](#website-screenshots)

## Folder Structure

After cloning, your project should look like this:

```
Social-Media/
  backend/
  frontend/
  README.md
```

For the project to build, **these commands must be executed with exact directory**:

- `Frontend` open the terminal change the directory to frontend and then execute the command which will install all the necessary libraries.
  ```
  npm install
  ```
- `Backend` similarly open the terminal and change the directory to backend and then execute the same command which will install backend dependencies.
  ```
  npm install
  ```

## Frontend

The frontend folder struture looks like this:

```
frontend/
  public/
  src/
    components/
    services/
    app.jsx
    index.js
    style.css
  package-lock.json
  package.json
```

The frontend of this is made with React. To run the frontend we need to execute some commands in the same **frontend directory**.
To run the app in the development mode. Execute the command

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The frontend will look like this:

<img src="https://res.cloudinary.com/dun2ywl8x/image/upload/v1684405680/Photogram-pages/home_swsjbm.png">

<br>

## Backend

The backend folder struture should look like this:

```
backend/
  middleware/
  models/
  .env
  index.js
  package-lock.json
  package.json
```

The backend of this website is made from NodeJS. So, in order to run the backend we need to execute some commands in the same **backend directory**.
To run the backend in the development mode. Execute the command

```
npm start
```

The backend will run on port **8000**. You will also see any lint errors in the console.

<br>

## ENV File

The .env file is to be created in backend folder with name **.env**. This file should the following environment variables:

```js
DataBase = MONGODB_URL;
FrontEnd = FRONTEND_URL;
SecretKey = SECRET_KEY;
PORT = 8000;
CloudName = CLOUDINARY_CLOUD_NAME;
CloudKey = CLOUDINARY_CLOUD_KEY;
CloudSecret = CLOUDINARY_SECRET_KEY;
```

<br>

## About Project

* `Frontend: ` This project is made using MERN stack, so **React** is used as frontend. React has various advantages such as component-based architecture, faster rendering,stable code structure, SEO-enabled, handy developer tools, easy to Learn and easy to Use.

* `Backend: ` For the backend keeping in mind MERN stack, **NodeJS** is used in backend which is a perfect combination with react because node is asynchronous, and dependent on event occurrences, compatibility with different devices,fast data streaming with no buffering, speedy code development and based on JavaScript.

* `Database:` For the database purpose to store user data, **MongoDB** is used because full cloud-based developer data platform, flexible document schemas,change-friendly design, powerful querying and analytics, cost-effective i.e. free of cost and full technical support and documentation.

* `Cloud: ` To store the images posted by the user, **Cloudinary** is used. Cloudinary is used because is stores and delivers images and videos, image and video manipulation and transformation is possible, automatic image optimization, automatic video transcoding and delivery in various formats, integration with various programming languages and frameworks such as NodeJS.

<br>

## Website Screenshots

### **Login Page**

<img src="https://res.cloudinary.com/dun2ywl8x/image/upload/v1684405677/Photogram-pages/login_ev63mt.png">

<br>

### **Home Page**

<img src="https://res.cloudinary.com/dun2ywl8x/image/upload/v1684405680/Photogram-pages/home_swsjbm.png">

<br>

### **Explore Page**

<img src="https://res.cloudinary.com/dun2ywl8x/image/upload/v1684405895/Photogram-pages/explore_ieu7ur.png">

<br>

### **Post Page**

<img src="https://res.cloudinary.com/dun2ywl8x/image/upload/v1684405896/Photogram-pages/post_l3nesl.png">

<br>

### **Profile Page**

<img src="https://res.cloudinary.com/dun2ywl8x/image/upload/v1684405902/Photogram-pages/profile_bhthxw.png">

<br>

## **Something Missing?**

If you have ideas for more “How To” recipes that should be on this page, let us know or contribute some! Thank You !!!
