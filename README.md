# Personal Health Tracker 📱

This is a **React Native (Expo)** project built as part of a technical
assessment.

The application allows users to:

- Log daily health metrics\
- Track symptoms\
- View historical health records\
- Receive alerts for abnormal readings

The project follows clean architecture principles with a feature-based
scalable structure.

---

## 🚀 Get started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the app

```bash
npx expo start
```

In the output, you'll find options to open the app in a:

- Development build\
- Android emulator\
- iOS simulator\
- Expo Go

You can start developing by editing the files inside the **app**
directory.\
This project uses **Expo Router (file-based routing)**.

---

## 🏗 Architecture

The project follows a **feature-based architecture** with separation of
concerns.

### Folder Structure

    app/
     ├── auth/
     ├── app/
     └── _layout.tsx

### Architectural Principles

- Feature-based modular structure\
- Business logic separated from UI\
- Centralized state management (Zustand)\
- Derived state computed via memoization\
- Route protection using Expo Router layouts

---

## 🔐 Authentication Flow

- Mock authentication (no backend)
- Global auth state managed with Zustand
- Session persistence using AsyncStorage
- Route-level protection via Expo Router groups:
  - `auth` → Login
  - `app` → Protected screens

---

## 🌡 Health Features

### Add Health Entry

- Built with **Formik + Yup**
- Strong validation rules
- Numeric constraints enforced
- Timestamp-based unique IDs

### Alert Logic

Alerts trigger when:

- Heart Rate \> 120 bpm\
- SpO2 \< 90%\
- Temperature \> 39 °C

Alert detection logic is separated into a pure utility function:

    health/utils/alertUtils.ts

This ensures business logic is not coupled with UI and remains testable.

---

## 📊 Health History

- Entries sorted by latest first\
- Abnormal readings visually highlighted\
- Entry details accessible via dynamic routing\
- Derived state handled using `useMemo`

---

## 🧠 State Management

### Zustand

Zustand was selected because:

- Minimal boilerplate\
- Cleaner than Redux for medium-scale apps\
- Avoids unnecessary re-renders\
- Easy AsyncStorage integration\
- Keeps business logic centralized

---

## 💾 Local Storage

Data persistence is implemented using:

    @react-native-async-storage/async-storage

Zustand persistence middleware is used to store:

- Authentication session
- Health entries

---

## 🧪 Testing

Testing is implemented using **Jest**.

### Covered Areas

- Health alert logic\
- Validation schema behavior\
- Store entry addition logic\
- At least one component test

Run tests with:

```bash
npm test
```

---

## 🧩 Assumptions Made

- Authentication is mock-based\
- Single-user application\
- Entries are stored locally\
- Timestamp-based IDs are sufficient\
- No real-time medical validation required\
- Device-level storage is acceptable

---

## ⚠ Known Limitations

- No backend integration\
- No encrypted storage layer\
- No offline synchronization\
- No pagination for very large datasets\
- No advanced charts or analytics\
- No biometric authentication

---

## 📈 Possible Improvements

- REST API integration\
- Secure storage for sensitive health data\
- Health trend charts\
- Export/share health reports\
- Push notifications for critical alerts\
- Expanded unit test coverage\
- Performance optimization for large datasets

---

## ✅ Assessment Checklist

Requirement Status

---

Authentication ✅ Implemented
Dashboard ✅ Implemented
Add Health Entry ✅ Implemented
Validation ✅ Implemented
Alert Logic Separation ✅ Implemented
Health History ✅ Implemented
Sorting ✅ Implemented
Highlight Abnormal ✅ Implemented
State Management ✅ Zustand
Local Storage ✅ AsyncStorage
Clean Architecture ✅ Feature-based
Testing ✅ Jest
README ✅ Provided
