#### Questions

1. Read the Firebase Database Introduction

2. Review the user stories for this app. For each user story, answer the question: Is it a Create, Read, Update, or Delete operation? Include your answers in your checkpoint submission.
  * As a user, I want to see a list of available chat rooms	3: Read
  * As a user, I want to create chat rooms	3: Create
  * As a user, I want to see a list of messages in each chat room	3: Read
  * As a user, I want to set my username to display in chat rooms	2: Update (assuming there's a default entry here like "default user").  If there is no default entry, then this would be a Create operation.  
  * As a user, I want to send messages associated with my username in a chat room: Create (you are generating new messages).  It really depends on your perspective what should be a create operation and what should be an update.  For example: if I store the entire chat room in an array of strings, each cell of which represents one message, and I enter a new message, I'm either creating a brand new entry in the array (eg. via push()) or updating the array (eg. via push()).  Basically it depends on what scope you talk about, the cell entry or the entire array.  If you are replacing an individual cell entry with something completely different, then there is no uncertainty.  This is a create operation.
3. Create a new React app using create-react-app.
