import sqlite3 from "sqlite3";

export const migrate = (db: sqlite3.Database): void => {
  db.serialize(() => {
    // Roles table
    db.run(`
      CREATE TABLE IF NOT EXISTS Roles (
        role_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) NOT NULL
      )
    `);

    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS Users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nickname VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        bio TEXT,
        role_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (role_id) REFERENCES Roles(role_id)
      )
    `);

    // Categories table
    db.run(`
      CREATE TABLE IF NOT EXISTS Categories (
        category_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
      )
    `);

    // Forums table
    db.run(`
      CREATE TABLE IF NOT EXISTS Forums (
        forum_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        category_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES Categories(category_id)
      )
    `);

    // Thread table
    db.run(`
      CREATE TABLE IF NOT EXISTS Thread (
        thread_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        forum_id INTEGER,
        user_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (forum_id) REFERENCES Forums(forum_id),
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
      )
    `);

    // Comment table
    db.run(`
      CREATE TABLE IF NOT EXISTS Comment (
        comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        thread_id INTEGER,
        user_id INTEGER,
        parent_comment_id INTEGER,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (thread_id) REFERENCES Thread(thread_id),
        FOREIGN KEY (user_id) REFERENCES Users(user_id),
        FOREIGN KEY (parent_comment_id) REFERENCES Comment(comment_id)
      )
    `);

    console.log("Database migration complete!");
  });
};
