<img src="src/assets/branding/logotype.svg"/>

## hoot-api

I developed HOOT as a code-along for students learning the MERN stack at General Assembly. The application integrates essential features for modern web apps and boasts a unique theme complete with original graphics. Its features include User Authentication, Image Upload, Animated UI Interactions, and CRUD Operations for both Blogs and Comments.

> Please note, this is the backend server for Hoot. To run the client app, please visit the [hoot-client](https://github.com/whlong1/hoot-client.git) repository for instructions.

## Getting Started

To run the hoot-api on your local machine, follow these steps:

1. Clone this repository:

    ```
    git clone https://github.com/whlong1/hoot-api.git
    ```

2. Navigate to the project directory:

    ```
    cd hoot-api
    ```

3. Install the required dependencies:

    ```
    npm install
    ```

4. Create a `.env` file in the root directory with the following variables:

    ```
    DATABASE_URL=[MongoDB Connection String]
    SECRET=[Secret]
    CLOUDINARY_URL=[Cloudinary URL]
    ```

5. Start the development server:

    ```
    nodemon
    ```