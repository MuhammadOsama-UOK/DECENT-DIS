# Security Spec: Decent Disposal Firestore

## 1. Data Invariants
- `contact_inquiries`: Must have `name`, `phone`, and `createdAt`. `status` defaults to `new`.
- `scrap_requests`: Must have `name`, `phone`, `scrapType`, and `createdAt`.
- `renovation_requests`: Must have `name`, `phone`, `projectType`, and `createdAt`.
- `createdAt` must be a server-side timestamp.
- No one can read inquiries except authorized admins.

## 2. The Dirty Dozen Payloads
1. Create inquiry with future timestamp.
2. Create inquiry with huge message (1MB+).
3. Create inquiry without name.
4. Try to read all inquiries as non-admin.
5. Try to update someone else's inquiry status.
6. Delete an inquiry as non-admin.
7. Inject script in name field.
8. Set inquiry status to 'completed' during creation.
9. Spoof `ownerId` (not used here but checked).
10. Rapid-fire creation (rate limiting via rules not possible, but schema check helps).
11. Large number of fields (key size check).
12. Invalid types (number for name).

## 3. Test Cases (Summary)
- `create` allows if schema matches and timestamp is server-side.
- `get`, `list`, `update`, `delete` only allow if `isAdmin()`.
