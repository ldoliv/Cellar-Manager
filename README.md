# Cellar Manager

A small web app to help keep track of bottles in a wine cellar.

# Get Started

## Install dependancies
```
npm i
``` 

## Start application
```
npm start
```

## Build application
```
npm run build
```

# Functionalities

## List View

Displays a list of bootles with the possibility to sort and filter:

- Text search, searches in all fields
- Filter by Year
- Order by Name, Vineyard or Year
- Order direction


## Detail View

Detail view for adding or editing bottles.

Each bottles has the fields:

- Name
- Vineyard
- Year
- Comment

# Considerations

Built using Create React App with aditional dependencies:
- bootstrap - Css only, for grid and utility classes
- sass - Help write less styling code with its hierarchy approach and functionalities
- react-router-dom - For routing and navigation between views
- react-hot-toast - For notifications on saving
- react-uuid - To create unique ids

### Source folder structure

- assets - Main styles and images
- components - React components used in views
- data - Has initial bottles data to populate the cellar manager
- helpers - Helper functions
- layouts - Common layout structure used in both views
- pages - Rect components for displaying each view (List and Detail)
- store - Get and save bottles as well as app preferences


### What could be improved?

- Add the possibility to remove bottles
- Use a remote api to add aditional information
- Use authentication
- Unit Testing
- Type Checking