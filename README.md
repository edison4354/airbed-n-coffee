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
- Session-based Authentication: Utilizes secure session cookies to maintain user state across web requests.
- Error Handling:
  - After initiating the signup process, the function catches any errors from the dispatch call. It first tries to parse the server's response as JSON, if this fails it falls back to retrieving plain text. If the JSON contains errors, these are set into the state. Otherwise, it uses either the plain text or the server's status text as the error message
 
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
  - Errors are displayed to the user using a list that visually represents each error with an icon, enhancing the clarity of the feedback
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
![](https://github.com/edison4354/airbed-n-coffee/blob/main/public/listing_responsive.gif)
- The layout and style of the listing card adjust responsively at various screen widths, ensuring optimal display across different devices.
```javascript
const ListingCard = ({ listing }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/listings/${listing.id}`);
    }

    const city = (listing.address) ? listing.address.split(',')[1] : '';
    const state = (listing.address) ? statesObject[listing.address.split(',')[2].trim().slice(0, 2)] : '';

    return (
        <div 
            onClick={handleClick}
            className="
                w-full 
                min-[580px]:w-[48%] 
                min-[827px]:w-[48.5%] 
                min-[947px]:w-[31.64%] 
                min-[1029px]:w-[31.8%] 
                min-[1159px]:w-[23.5%] 
                min-[1409px]:w-[23.8%] 
                min-[1639px]:w-[18.91%] 
                min-[1759px]:w-[19%] 
                min-[1882px]:w-[15.7%] 
                cursor-pointer 
                group
            "
        >
            <div className="flex flex-col">
                <div 
                    className="
                        relative
                        overflow-hidden
                        rounded-xl
                        aspect-[20/19]
                    "
                >
                    {listing.photoUrls && listing.photoUrls[0] ? (
                        <img
                            className="
                                object-cover 
                                h-full
                                w-full
                                group-hover:scale-110
                                transition
                            "
                            src={`${listing.photoUrls[0]}`}
                            alt="Listing"
                        />
                    ) : (
                        <div className="object-cover h-full w-full bg-gray-200">
                        </div>
                    )}
                </div>
                <div className="flex justify-between font-medium pt-2">
                    {city}, {state}
                    <div className='flex items-center'>
                        <IoIosStar /> 
                        <p className='pl-1 font-light'>4.98</p>
                    </div>
                </div>
                <div className="font-light text-neutral-500">
                    55 Miles Away
                </div>
                <div className="font-light text-neutral-500">
                    June 18 - 22
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-medium">
                        ${listing.pricePerNight}
                    </div>
                    <div className="font-light">night</div>
                </div>
            </div>
        </div>
    )
}
```
  
### Reservations
- Users can book reservations for their desired stay:
  - Full CRUD capabilities for managing reservations: allows users to view, create, update, and delete reservations, ensuring actions like creating or modifying a reservation require the user to be logged in. The controller includes error handling to provide feedback if an action fails, such as during creation or update due to missing or invalid data
 
  ```ruby
    class Api::ReservationsController < ApplicationController
          before_action :require_logged_in, only: [:create, :update, :destroy]
      
          def index
              @reservations = Reservation.all
              render :index
          end
      
          def update
              @reservation = Reservation.find(params[:id])
      
              if @reservation.update(reservation_params)
                  render :index
              else
                  render json: @reservation.errors.full_messages, status: 422
              end
          end
      
          def show
              @reservation = Reservation.find(params[:id])
              render :show
          end
      
          def create
              @reservation = Reservation.new(reservation_params)
              @reservation.guest_id = current_user.id
      
              if @reservation.save
                  render :show
              else
                  render json: @reservation.errors.full_messages, status: 422
              end
          end
      
          def destroy
              @reservation = Reservation.find(params[:id])
              @reservation.destroy
              render :index
          end
      
          private
      
          def reservation_params
              params.require(:reservation).permit(:listing_id, :check_in, :check_out, :num_guests)
          end
      end
    ```
