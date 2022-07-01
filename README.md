# Straw Poll - Decision Maker

- This decision maker web app allows users to create a ranking-based poll with multiple choices using their email address.
- When the poll is created, the app user is given two links: an administrative link (to view the results) and a share link (to share the poll with friends).
- The user can rank their choices by drag-and-drop.
- Each time a submission is received, the creator is notified with an email (using mailgun) which includes the administrative link and the results link.
- The results of the poll are displayed on the Results page from the poll.

## Final Product

!["Create a new poll"](https://github.com/VincentHChoy/LHL-TODO-Midterm/blob/master/screenshots/Screenshot%202022-06-30%20at%208.30.36%20PM.png?raw=true)
!["Create options for your poll users to vote on"](https://github.com/VincentHChoy/LHL-TODO-Midterm/blob/master/screenshots/Screenshot%202022-06-30%20at%208.31.30%20PM.png?raw=true)
!["Drag and drop to vote on the poll"](https://github.com/VincentHChoy/LHL-TODO-Midterm/blob/master/screenshots/Screenshot%202022-06-30%20at%208.33.05%20PM.pngraw=true)
!["Poll results"](https://github.com/VincentHChoy/LHL-TODO-Midterm/blob/master/screenshots/Screenshot%202022-06-30%20at%208.33.36%20PM.png?raw=true)


## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.
- Visit http://localhost:8080/

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
