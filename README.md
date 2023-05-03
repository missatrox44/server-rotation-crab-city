# Server Rotation App
React app managing server rotation schedule for restaurant

## Run app locally
Open terminal at root and enter:

`npm install`

`npm run dev`


Click on link to open in browser

` Local:   http://127.0.0.1:5174/`


## User Story
The current system of using a dry-erase board to keep track of which server gets the next table is not efficient, especially during rushes. It often results in servers getting skipped, double-seated, or overwhelmed. This can lead to customers becoming frustrated because the servers are not able to provide a good experience, particularly with large groups. As a restaurant owner, I want to streamline the process of tracking servers and their table assignments. This will ensure a smooth experience for both customers and servers with minimal confusion on who gets the next table.


## Requirements
- The header section includes an editable input to enter the name of a server.
- An optional radio button/check box is available for a trainee.
- The name of the upcoming server is displayed under the header, above the table.
- The names displayed in the table reflect the actual order of the queue. The top row of the table displays the upcoming server information, allowing users to easily see who is next in line. Once a server is assigned a table, they will move to the bottom of the table. If an employee is on a break, they will be placed at the end of the queue until they return.
- There is a table that displays the following information:
  - Name: Employee Name
  - Status: Current status of the employee
  - Small Tops: Displays the running count of small tops assigned
   -Assign Small: When pressed, the small top count is incremented by one, and the employee is moved to the back of the queue.
  - Big Tops: Displays the running count of big tops assigned. This will not appear for trainees.
  - Assign Big: When pressed, the big top count is incremented by one, and the employee is taken out of the queue (paused). A new button 'Ready for more tables' will appear, while the Small/Big Assign and Skip buttons are removed/disabled.
  - Skip: When pressed, the employee is moved to the back of the queue.
   -Break: When pressed, the employee is taken out of the queue (paused). A new button 'Break Over' will appear, while the Small/Big Assign and Skip buttons are removed/disabled.
  - Clock Out: When pressed, the employee will be removed from the table completely.
- When employees are ready for more tables or are back from break, they can press the 'Ready for More Tables' or 'Break Over' button, which will make them the next employee in the queue.
- The app will have a backend, so all instances of the app will be up-to-date on any iPad used at the restaurant (Firebase implementation).
- The app will remove all users from the table at midnight.


## Wireframes
<!-- ![wireframe](./src/assets/wireframe.png)
![wireframe2](./src/assets/wireframe2.png) -->
![wireframe3](./src/assets/wireframe3.png)



