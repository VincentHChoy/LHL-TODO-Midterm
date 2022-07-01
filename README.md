=======
# Straw Poll - Decision Maker

- This decision maker web app allows users to create a ranking-based poll with multiple choices using their email address.
- When the poll is created, the app user is given two links: an administrative link (to view the results) and a share link (to share the poll with friends).
- The user can rank their choices by drag-and-drop.
- Each time a submission is received, the creator is notified with an email (using mailgun) which includes the administrative link and the results link.
- The results of the poll are displayed on the Results page from the poll.

## Final Product

!["Create a new poll"](https://github.com/VincentHChoy/LHL-TODO-Midterm/blob/master/screenshots/Screenshot%202022-06-30%20at%208.30.36%20PM.png?raw=true)
!["Create options for your poll users to vote on"](https://github.com/VincentHChoy/LHL-TODO-Midterm/blob/master/screenshots/Screenshot%202022-06-30%20at%208.31.30%20PM.png?raw=true)
!["Drag and drop to vote on the poll"](./screenshots/Screenshot%202022-06-30%20at%208.33.05%20PM.png)
!["Poll results"](./screenshots/Screen%20Shot%202022-07-01%20at%203.19.06%20PM.png)

## Getting Started

- This application is currently served on Heroku at <https://midterm-strawpoll.herokuapp.com/poll>

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- SASS
- Mailgun
- Chart JS

## Known issues

- Multiple options per poll or question are currently being accepted and saved to the database. In the future, this could be updated to limit to only 4 options per poll.

- Mailgun currently triggers the email to be sent to the poll creator, but doesn't actually send them. Instead, emails are being queued and this is an issue that needs to still be addressed.
