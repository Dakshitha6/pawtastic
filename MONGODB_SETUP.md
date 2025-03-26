# MongoDB Setup for Dog Website

This guide will help you set up MongoDB Atlas for storing images in your dog listing application.

## 1. Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account or log in if you already have one

## 2. Create a Cluster

1. Once logged in, click on "Build a Database"
2. Choose the "FREE" option
3. Select your preferred cloud provider and region (closest to your users)
4. Click "Create Cluster" (this may take a few minutes to provision)

## 3. Set Up Database Access

1. In the sidebar, click on "Database Access" under SECURITY
2. Click "Add New Database User"
3. Create a username and password (save these credentials)
4. Set "Database User Privileges" to "Read and write to any database"
5. Click "Add User"

## 4. Configure Network Access

1. In the sidebar, click on "Network Access" under SECURITY
2. Click "Add IP Address"
3. For development, you can allow access from anywhere by clicking "Allow Access from Anywhere" 
   (Note: For production, you should restrict this to your application servers)
4. Click "Confirm"

## 5. Get Your Connection String

1. In the sidebar, click on "Database" under DEPLOYMENT
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password and `<dbname>` with "dog-website"

## 6. Update Environment Variables

1. Create a `.env.local` file in your project root if it doesn't exist already
2. Add the MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@yourcluster.mongodb.net/dog-website?retryWrites=true&w=majority
   ```

## 7. Restart Your Application

Run the following command to restart your application with the new MongoDB connection:

```
npm run dev
```

## Troubleshooting

- If you encounter connection issues, make sure your IP address is whitelisted in Network Access
- Verify that your username and password are correct in the connection string
- Check that you've replaced `<password>` and `<dbname>` in the connection string 