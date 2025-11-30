# Troubleshooting Guide

## Current Issue: Registration Error

### Error Message
```
Registration error: TypeError: Cannot read properties of undefined (reading 'forEach')
```

### Root Cause
The error occurs in the validation function when trying to process Zod validation errors. This suggests that either:
1. The form data is not being parsed correctly by formidable
2. The validation is receiving unexpected data format

### Debugging Steps

#### 1. Check Server Console Output
When you try to register, look for these console logs:
```
Raw fields from formidable: { ... }
Raw files from formidable: { ... }
Normalized fields: { ... }
Normalized files: { ... }
Parsed fields: { ... }
Parsed files: { ... }
```

#### 2. Test Form Parsing Endpoint
Use the test endpoint to verify formidable is working:

```bash
# Test with cURL
curl -X POST http://localhost:3000/api/test-upload \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "password=TestPass123" \
  -F "phone=+1234567890"
```

Expected response:
```json
{
  "success": true,
  "fields": {
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123",
    "phone": "+1234567890"
  },
  "files": {}
}
```

#### 3. Check Formidable Version
Verify formidable is installed correctly:
```bash
npm list formidable
```

Should show: `formidable@3.5.4` or similar

#### 4. Test Registration from Browser
1. Open browser DevTools (F12)
2. Go to Network tab
3. Navigate to http://localhost:3000/register
4. Fill in the form
5. Click Register
6. Check the request payload in Network tab
7. Check the response

### Solutions

#### Solution 1: Reinstall Formidable
```bash
npm uninstall formidable
npm install formidable@3.5.4
```

#### Solution 2: Use Alternative Form Parser
If formidable continues to have issues, we can switch to `multer`:

```bash
npm install multer
```

Then update `lib/upload.js` to use multer instead.

#### Solution 3: Simplify Registration (Temporary)
For testing, you can temporarily disable file upload:

1. Comment out avatar handling in `pages/api/auth/register.js`
2. Test registration without image upload
3. Once basic registration works, re-enable file upload

### Common Issues

#### Issue: "Cannot find module 'formidable'"
**Solution:**
```bash
npm install formidable
```

#### Issue: "ENOENT: no such file or directory, open 'public/uploads/avatars/...'"
**Solution:**
```bash
mkdir -p public/uploads/avatars
```

#### Issue: Email not sending
**Solution:**
1. Check `.env` file has correct email credentials
2. For Gmail:
   - Enable 2-factor authentication
   - Generate App Password
   - Use App Password in `.env`

```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-16-char-app-password"
```

#### Issue: Database connection error
**Solution:**
```bash
# Check PostgreSQL is running
# Windows:
services.msc
# Look for PostgreSQL service

# Test connection
psql -U postgres -d joker_db

# If database doesn't exist
createdb -U postgres joker_db

# Run migrations
npx prisma migrate dev
```

#### Issue: JWT token not working
**Solution:**
1. Check `JWT_SECRET` in `.env`
2. Clear browser cookies
3. Try logging in again

#### Issue: CORS errors
**Solution:**
Add to `next.config.js`:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};
```

### Quick Fixes

#### Fix 1: Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

#### Fix 2: Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Fix 3: Reset Database
```bash
npx prisma migrate reset
npx prisma migrate dev
```

### Testing Checklist

After applying fixes, test these:

- [ ] Server starts without errors
- [ ] Can access home page (/)
- [ ] Can access register page (/register)
- [ ] Can submit registration form
- [ ] Form data is parsed correctly (check console)
- [ ] Validation works (try invalid data)
- [ ] User is created in database
- [ ] OTP email is sent
- [ ] Can verify OTP
- [ ] Can login after verification

### Getting Help

If issues persist:

1. **Check server console** for detailed error messages
2. **Check browser console** for client-side errors
3. **Check Network tab** in DevTools for API responses
4. **Check database** to see if data is being saved:
   ```sql
   SELECT * FROM "User";
   SELECT * FROM "Otp";
   ```

### Next Steps

Once registration is working:

1. Test all other endpoints
2. Test file upload functionality
3. Test OTP verification
4. Test login flow
5. Test profile management
6. Test role-based access

### Contact

If you need further assistance, provide:
- Error message from server console
- Error message from browser console
- Network request/response from DevTools
- Node.js version: `node --version`
- npm version: `npm --version`
- Operating system

