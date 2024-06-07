# WELCOME TO AIRBED & COFFEE

Check out [live site!](https://airbed-n-coffee.onrender.com/)

## Project Overview
Airbed & Coffee is a full-stack clone of the Airbnb website, replicating its features and functionality - an online marketplace that connects people who want to rent out their homes with those looking for accommodations. After signing up, Airbed & Coffee users can browse through a listing page with preloaded listings and book a reservation for their desired stay directly through the platform.

![alt text](https://github.com/edison4354/airbed-n-coffee/blob/main/public/homepage.png?raw=true)

## Technologies Used
This project incorporates a variety of technologies to facilitate a full-stack web application, including:

- **Ruby**: Version 3.1.1
- **Rails**: Version 7.1.3.3
- **Node**: Version 18.20.2
- **npm**: Version 10.5.0
- **PostgreSQL**: Used for the database
- **React and Redux**: For dynamic frontend development
- **TailwindCSS**: For responsive and modern styling
- **AWS S3**: Utilized for image storage

# Features

### User Authentication
![](https://github.com/edison4354/airbed-n-coffee/blob/main/public/sample.gif)
- Secure sign-up, login, and logout functionality.
- Session-based Authentication: Utilizes secure session cookies to maintain user state across web requests, enhancing both security and user experience.
- Error Handling:
  - After initiating the signup process, the function catches any errors from the dispatch call. It first attempts to parse the server's response as JSON; if this fails, it falls back to retrieving plain text. If the JSON contains errors, these are set into the state; otherwise, it uses either the plain text or the server's status text as the error message
 
    ```javascript
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password) {
          setErrors([]);
          return dispatch(sessionActions.signup({ firstName, lastName, email, password }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
        }
    };
    ```
  - Display error messages in a ui friendly component
    ```javascript
    <ul className='text-red-600 mt-1'>
        {errors.map((error, index) => 
            <li key={index} className='text-xs font-semibold flex gap-2 items-center'>
                <FaCircleXmark /> 
                {error}
            </li>
        )}
    </ul>
    ```
### Listings
- Users can browse through various property listings with detailed descriptions and images.
  
### Reservations
- Users can book reservations for their desired stay directly through the platform.
