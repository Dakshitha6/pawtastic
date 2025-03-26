# Firebase Storage CORS Configuration

To fix the CORS issue with Firebase Storage uploads, follow these steps:

## Prerequisites

1. Install the Firebase CLI if you haven't already:
   ```
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```
   firebase login
   ```

3. Initialize your project (if not already initialized):
   ```
   firebase init
   ```

## Configure CORS for Firebase Storage

1. Make sure the `cors.json` file is in your project root with the following content:
   ```json
   [
     {
       "origin": ["*"],
       "method": ["GET", "HEAD", "PUT", "POST", "DELETE"],
       "maxAgeSeconds": 3600,
       "responseHeader": ["Content-Type", "Content-Disposition", "Content-Length"]
     }
   ]
   ```

2. Deploy the CORS configuration using the Firebase CLI:
   ```
   gsutil cors set cors.json gs://YOUR_STORAGE_BUCKET_NAME
   ```

   Replace `YOUR_STORAGE_BUCKET_NAME` with your actual Firebase Storage bucket name (e.g., `dog-store-452d6.appspot.com`).

3. If you don't have `gsutil` installed, you can install it as part of the Google Cloud SDK:
   https://cloud.google.com/storage/docs/gsutil_install

4. Alternatively, you can configure CORS in the Firebase Console:
   - Go to the Firebase Console
   - Select your project
   - Navigate to Storage
   - Go to Rules
   - Update your Storage Rules to allow CORS

## Verify CORS Configuration

After configuring CORS, your application should be able to upload files to Firebase Storage without CORS errors.

## Storage Rules

Make sure your storage rules (in `storage.rules`) allow authenticated users to write to your storage:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Allow read access to all users
      allow read;
      // Allow write access to authenticated users only
      allow write: if request.auth != null;
    }
  }
}
```

Deploy these rules with:
```
firebase deploy --only storage
``` 