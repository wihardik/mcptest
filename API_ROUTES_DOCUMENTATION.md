# Gmail Integration API Routes Documentation

## Authentication Routes

### GET /api/integration/auth
**Purpose**: Generate OAuth authorization URL for Gmail integration
**File**: `app/api/integration/auth/route.ts`

**Query Parameters**:
- `userId` (required): User identifier for the OAuth flow

**Response**:
```json
{
  "authUrl": "https://accounts.google.com/oauth/authorize?..."
}
```

**Usage Example**:
```javascript
const response = await fetch(`/api/integration/auth?userId=${userId}`);
const { authUrl } = await response.json();
```

### POST /api/integration/callback
**Purpose**: Handle OAuth callback and return account_id
**File**: `app/api/integration/callback/route.ts`

**Request Body**:
```json
{
  "code": "authorization_code_from_google",
  "state": "state_parameter"
}
```

**Response**:
```json
{
  "account_id": "unique_account_identifier",
  "status": "success"
}
```

## Gmail Operation Routes

### POST /api/integration/gmail/getAllMessages
**Purpose**: Retrieve Gmail messages with optional filters
**File**: `app/api/integration/gmail/getAllMessages/route.ts`
**Helper Function**: `getAllMessages` from `@/app/apihelper/gmail`

**Request Body**:
```json
{
  "accountId": "required_account_id",
  "from": "optional_sender_email",
  "after": "optional_date_filter"
}
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "message_id",
      "subject": "Email subject",
      "from": "sender@example.com",
      "snippet": "Email preview...",
      "date": "2024-01-01"
    }
  ]
}
```

### POST /api/integration/gmail/sendEmail
**Purpose**: Send new email through Gmail
**File**: `app/api/integration/gmail/sendEmail/route.ts`
**Helper Function**: `sendEmail` from `@/app/apihelper/gmail`

**Request Body**:
```json
{
  "to": "recipient@example.com",
  "subject": "Email subject",
  "message": "Email content",
  "accountId": "required_account_id",
  "senderName": "optional_sender_name"
}
```

**Response**:
```json
{
  "success": true,
  "messageId": "sent_message_id",
  "status": "sent"
}
```

### POST /api/integration/gmail/replyToThread
**Purpose**: Reply to existing email thread
**File**: `app/api/integration/gmail/replyToThread/route.ts`
**Helper Function**: `replyToThread` from `@/app/apihelper/gmail`

**Request Body**:
```json
{
  "messageId": "original_message_id",
  "message": "reply_content",
  "accountId": "required_account_id",
  "senderName": "optional_sender_name",
  "replyToSenderOnly": false,
  "ccList": "optional_cc_emails",
  "bccList": "optional_bcc_emails"
}
```

**Response**:
```json
{
  "success": true,
  "replyId": "reply_message_id",
  "threadId": "email_thread_id"
}
```

## Route Implementation Standards

### Common Patterns
All routes follow these implementation standards:

1. **Import Helper Functions**:
   ```typescript
   import { helperFunction } from '@/app/apihelper/gmail';
   ```

2. **Request Parsing**:
   ```typescript
   const body = await req.json();
   ```

3. **Field Validation**:
   ```typescript
   if (!body.accountId) {
     return NextResponse.json({ error: 'accountId is required' }, { status: 400 });
   }
   ```

4. **Helper Function Call**:
   ```typescript
   const result = await helperFunction(body);
   ```

5. **Response Handling**:
   ```typescript
   return NextResponse.json(result);
   ```

6. **Error Handling**:
   ```typescript
   try {
     // operation
   } catch (error) {
     return NextResponse.json({ error: error.message }, { status: 500 });
   }
   ```

### Security Considerations
- All routes validate required parameters
- Account ID is required for all Gmail operations
- No sensitive data is logged or exposed
- Proper error messages without internal details

### Testing Endpoints
Use these curl commands to test the API routes:

```bash
# Get auth URL
curl "http://localhost:3000/api/integration/auth?userId=testuser"

# Get messages
curl -X POST http://localhost:3000/api/integration/gmail/getAllMessages \
  -H "Content-Type: application/json" \
  -d '{"accountId":"your_account_id"}'

# Send email
curl -X POST http://localhost:3000/api/integration/gmail/sendEmail \
  -H "Content-Type: application/json" \
  -d '{"to":"test@example.com","subject":"Test","message":"Hello","accountId":"your_account_id"}'

# Reply to thread
curl -X POST http://localhost:3000/api/integration/gmail/replyToThread \
  -H "Content-Type: application/json" \
  -d '{"messageId":"msg_id","message":"Reply","accountId":"your_account_id"}'
```

## Frontend Integration
The dashboard components consume these routes as follows:

- **AuthenticationFlow**: Uses `/api/integration/auth` for OAuth URL generation
- **EmailOperations**: Uses all Gmail operation routes for email functionality
- **State Management**: Handles responses and errors from all routes

## Error Codes
- `400`: Bad Request (missing required parameters)
- `401`: Unauthorized (invalid account_id)
- `500`: Internal Server Error (helper function failures)
- `200`: Success (operation completed successfully)
