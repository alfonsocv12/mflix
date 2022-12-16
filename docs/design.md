# Mflix

To build Mflix I have some requirements to take into consideration
but in short terms a react web application to browse for movies is needed.

## Origin story

We have extracted a small “MFlix” (Movie flix) database which is available in an endpoint which is detailed below, you should create a simple UI with the information contained in this API response.

## Requirements

### The UI must
- Menu: 
    - have a header with a menu which shows a sidebar with the Genres list
    - Each genre in the list should help you filter the movies displayed in the website
    - menu should behave similar as if it was always a sidebar (similar to mobile)
- Content:
    - Movies should appear in an horizontal scrollable container with:
        - image/poster
        - movie title
        - language
        - and if available rating
    - when clicking the Movie it should display a simple modal / view with more details of the movie (this is up to you)
 

### Technical requirements:
Use React + typescript to build the application
Functional components
Use a state management for movie filtering, menu toggling

### Big Extra points:
- Use [redux-toolkit](https://redux-toolkit.js.org/tutorials/quick-start) for state management
- Use [redux-toolkit](https://redux-toolkit.js.org/introduction/getting-started#using-create-react-app) slices (you can use create-react-app template for this)
- deploy your application (github pages, netify, aws)
- Use [Chakra-ui](https://chakra-ui.com/docs/getting-started) components for building the UI