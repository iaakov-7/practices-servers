<div dir="rtl">

# HTTP Vanilla Server – תרגילים

---

## תרגיל 1 – שרת Hello World

### מטרה

ליצור שרת בסיסי שמחזיר תשובה אחת קבועה.

### דרישות

- ליצור שרת על פורט 3000
- בכל בקשה להחזיר:

</div>

```
Hello from my server
```

<div dir="rtl">

- להדפיס לקונסול כשהשרת עולה

### דגשים

- שימוש ב-`http`
- שימוש ב-`createServer`
- חובה להשתמש ב-`res.end()`

### בונוס

שנה את ההודעה לפי שעה:

- בוקר => `"Good Morning"`
- ערב => `"Good Evening"`

---

## תרגיל 2 – Routing בסיסי

### מטרה

ללמוד לשלוט ב-URL (routing ידני).

### דרישות

צור שרת שמטפל בנתיבים הבאים:

| URL | Response |
|-----|----------|
| `/` | `Home Page` |
| `/about` | `About Page` |
| `/contact` | `Contact Page` |

### דרישות נוספות

- אם הנתיב לא קיים => להחזיר `404`
- להחזיר גם הודעה:

</div>

```
Page Not Found
```

<div dir="rtl">

### דגשים

- שימוש ב-`req.url`
- שימוש ב-`if / else`
- שימוש ב-`res.statusCode`

### בונוס

הוסף header:

</div>

```javascript
res.setHeader('Content-Type', 'text/plain');
```

<div dir="rtl">

---

## תרגיל 3 – Routing + Methods

### מטרה

להבדיל בין סוגי בקשות (GET / POST).

### דרישות

צור שרת עם ההתנהגות הבאה:

| Method | URL | Response |
|--------|-----|----------|
| `GET` | `/users` | `Users list` |
| `POST` | `/users` | `User created` |

### דרישות נוספות

- אם מגיע method לא נתמך => להחזיר:

</div>

```
Method Not Allowed
```

<div dir="rtl">

- אם הנתיב לא קיים => `404`

### דגשים

- שימוש ב-`req.method`
- שילוב עם `req.url`
- סדר התנאים חשוב!

</div>
