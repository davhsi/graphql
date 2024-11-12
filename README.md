
# Setup Instructions

---

## Setup Instructions for PostgreSQL and Environment Variables

Follow these steps to set up PostgreSQL and configure environment variables for the database.

### Step 1: Install PostgreSQL

### Step 2: Set Up the Environment File

   ```plaintext
   DATABASE_URL=postgres://your_postgres_url
   ```

3. Save the `.env` file.

---

## Running the Server

To start your server, navigate to the project directory in your terminal and run:

```bash
npm i
```

```bash
node server.js
```

## GraphQL CRUD Commands for Tasks

Use these GraphQL commands to perform CRUD operations on the Task model.

### 1. Query to Fetch All Tasks

```graphql
query {
  tasks {
    id
    name
    description
    deadline
    completed
  }
}
```

### 2. Mutation to Create a New Task

```graphql
mutation {
  createTask(
    name: "New Task"
    description: "Description of the task"
    deadline: "2024-12-01"
  ) {
    id
    name
    description
    deadline
    completed
  }
}
```

### 3. Mutation to Update a Task

```graphql
mutation {
  updateTask(
    id: 1
    name: "Updated Task Name"
    description: "Updated description"
    deadline: "2024-12-31"
    completed: false
  ) {
    id
    name
    description
    deadline
    completed
  }
}
```

### 4. Mutation to Delete a Task

```graphql
mutation {
  deleteTask(id: 1)
}
```

### 5. Mutation to Mark a Task as Completed

```graphql
mutation {
  markAsCompleted(id: 1) {
    id
    name
    description
    deadline
    completed
  }
}
```




