# _*WAVES*_ *(Frontend)*

## _*Instructions how to start*_
* Ask for API keys.

* Create `.env` file like the example `.env.sample` .

* Install all the package with ’npm install’.

* Start with `npm run start`.

**http://localhost:3000**

## _*Credentials*_

* User: james@gmail.com
* Password: 12345a

## _*Description*_
This project is based on the idea of various webpages like [PureSurfers social networking by surfers for surfing. | By surfers for surfers.](http://www.puresurfers.com/)[Surf Reports, Surf Forecasts and Surfing Photos - Magicseaweed.com](https://magicseaweed.com/), , [World Surf League - The global home of surfing](https://www.worldsurfleague.com/),[Facebook - Entrar o registrarse](https://www.facebook.com/)…and many other. The idea is to connect the surfers of all of the country to go surfing together, know more about each other and help the surfing community to grow healthy. For that, the surfers can make events and published them at the app, so people can join in and go. These types of events could be competitions, training, beach bbq or just go surfing. In the other hand, like a user of the app you can rate some specs of every beach like the quality of water or sand, the height of the waves... so and app made for a surfer to surfers. Aloha!! 🤙

## _*Motivation*_
I'm always searching for the conditions of waves and seeing a lot of app I'm the only surfer in my family and I'm always going surfing alone. Some times it's cool to be alone in the water but if you don't share your time, your waves and your passion... is like that is missing something... For that reason, I decided to make a social network for surfers.

## _*User Stories*_

* **500 page**  - As a user, I need to see a 500 error page when it's something go wrong but it isn't my fault. Like the 404 error page, I will try to do a complete error page.

* **Sign up page** - As a user, I want to sign up on the web page so that I can see the commentaries of the articles and the reviews of the beaches, and make a review, commentary and/or punctuation also.

* **Login page** - As a user, I want to log in on the web page so that I can see the commentaries of the posts and the reviews of the beaches, and make a review, commentary and/or punctuation also.

* **Surfers list page** - As a user, I want to see all the surfers’ profile available.

* **Surfer detail page** - As a user, I want to see the surfer’s profile information (name, level, frequent beaches, the board that it have….).

* **Events page form** - As a user, I want to be able to make a new event.

* **Events list page** - As a  user, I want to see a list of all events and search it by name, type or beach.

* **Event detail page** - As a user, I want to have the option to modify the information inside the event for fix typos error, to add more information or to change the beach or date of the event that I'm the owner. For other events, I have the opportunity to Join in or Disjoin. Also you can make a review and delete your reviews.

* **Beach list page** - As a user, I want to see a list with all the available beaches.

* **Beach detail page** - As a user, I want to see the details of the beach like height of waves, the quality of water and sand, the type of background… Also I want to see the reviews of other users about that beach. And finally rate the differents specifications about the beach.

* **About us page** - As a user, I can go to that page to know about the web developer of that app.

* **Contact page** - As a user, I can go to that page to see the contact information.

## _*MVP*_
* Make a navbar  for the footer (sticky).

* Make a header with the profile image like a profile button (sticky).

* Make a login page with a form  (the initial page of the app).

* Make a sign up page with a form (we can go here with a button at login page).

* Make a profile page (after logged in we will go here).

* Make a profile update page with a form to add and change new information about our profile (we can go here with a button at profile page).

* Make a surfer list page.

* Put a search bar at surfeiting list to find by name.

* Put different buttons to filter by type at surfer list.

* Make a surfer detail page.

* Put a button at surfer detail page to follow/unfollow the surfer.

* Make a beaches list page

* Put a search bar at beaches list to find by name.

* Put different buttons to filter by type at beaches list.

* Make a beach detail page, here we can see the information of the beach and rate all the specs of the beach.

* Make a form at beach detail to write a review.

* Make an events list page.

* Make an event detail page.

* Put a button at event detail page to join in.

* Put a button at event detail page to delete it.

* Make an event detail form page to add news events.

* Make an event detail form page to update an event.

* Put a button at event detail page to delete it.

## _*Backlog*_
* Use google maps to position the beaches.

* Use MSW API to render the live weather.

* Add the new feature of  “news”.

* Sign up with Facebook, instagram…

* Adapt the design to a web page.

* Profile notifications about new events at our frequent beaches.

* Rate surfers.

## _*ROUTES*_:

## _*Views*_
| View (Component) | Path         | Description    | Rol |
| :--------------- | ------------ | -------------- | ---------------- |
| Login            | `/login`     | Login page     | User |
| Sign up            | `/signup`     | Sign up page     | User |
| Profile             | `/profile`     | Profile page     | User |
| Update profile             | `/profile/update`     | Update profile info     | User |
| Contact        | `/contact` | Contact information | For all|
| Abouts us        | `/about-us` | Web developer information | For all|
| Surfer list            | `/surfer-list`     | All the articles posted | User |
| Surfer details            | `/surfer-list/:id`     | Details of an article | User |
| Event list            | `/events-list`     | All the surfer profiles  | User|
| Event detail            | `/events-list/:id`     | All the surfer profiles  | User|
| Add event            | `/events-list/add`     | Add new post | User |
| Beaches list            | `/beaches-list`     | All the beaches available | User |
| Beach detail            | `/beaches-list`     | Details of a beach | User |
| Loading            | `/loading`     | Loading page     | User |
| 500 error            | `/error-500`     | 500 error page     | User/Master |

## _*Links*_

### *Trello*
[Trello](https://trello.com/b/4dG88ijR/breaking-waves)

### *Git*
The url to the repository and to the deployed project

Frontend: https://github.com/cgali/WAVE-frontend
Backend: https://github.com/cgali/WAVE-backend

[Deploy Link](https://waves-app.netlify.app/login)

### *Slides*
[Slides Link](https://slides.com/carlesgali/deck-bb83ca)