# Daksh Learning: turn on Google login (15 minutes, free)

## 1. Supabase (the login service)
1. supabase.com > sign in with GitHub > New project (name: daksh-classroom, any region near India, set a DB password).
2. Project Settings > API. Copy two values: Project URL and anon public key.
3. Authentication > Providers > Google > keep this page open (it shows a Callback URL like https://xxxx.supabase.co/auth/v1/callback). Copy that URL.

## 2. Google Cloud (the "Continue with Google" button)
1. console.cloud.google.com > create project "Daksh Learning".
2. APIs and Services > OAuth consent screen > External > app name "Daksh Learning", your email > Publish app (so any learner can sign in, not only test users).
3. Credentials > Create credentials > OAuth client ID > Web application.
   - Authorized JavaScript origins: https://classroom.dakshlearning.com and https://lmsdaksh.vercel.app
   - Authorized redirect URIs: the Supabase Callback URL from step 1.3
4. Copy Client ID and Client secret. Paste both into Supabase > Authentication > Providers > Google > Enable > Save.

## 3. Tell Supabase your site addresses
Supabase > Authentication > URL Configuration:
- Site URL: https://classroom.dakshlearning.com
- Redirect URLs: https://classroom.dakshlearning.com/login.html and https://lmsdaksh.vercel.app/login.html

## 4. Edit one file, then upload to GitHub
Open auth-config.js, paste the Project URL and anon key. Upload all files from the zip to your GitHub repo (same overwrite method as before).

## 5. Vercel environment variables (this is what makes the lock real)
Vercel > project lmsdaksh > Settings > Environment Variables. Add:
- SUPABASE_URL = same Project URL
- SUPABASE_ANON_KEY = same anon public key
Then Deployments > latest > Redeploy.

## Test
Open the site in a private window: you should land on the login page. View the lesson file directly (classroom.dakshlearning.com/m1-p1.js): it should say "Please log in". Sign in with Google: you land in the classroom with your photo and a Log out button.
