# 🗓 EventZen

EventZen — A modern full-stack event management web app where users can explore, create, join, and manage events. Built with React, TypeScript, TailwindCSS, Node.js, Express, MongoDB, and Zod for validation. Includes user authentication, event join feature, real-time attendee tracking, and clean UI with ShadCN components.

## 🎯 Objective
Build a fully functional Event Management web application that supports:
- Custom authentication system (without third-party auth)
- Dynamic event operations: add, update, delete, join
- Search and filter events by date and title
- Responsive, user-friendly design

---

## 🚀 Features
- Create and update events with details like title, date, location, and description
- Join events (one user can join only once)
- Delete your own events
- Token-based authentication
- Responsive UI with React & ShadCN

## 🛠 Tech Stack
- **Frontend:** React, TypeScript, React Hook Form, Axios, Tailwind CSS, ShadCN UI
- **Backend:** Node.js, Express.js, MongoDB, Zod (validation)
- **Deployment:** Vercel (frontend & backend)

## 🌱 Future Improvements

- 🛡 **Social Login**: Add Google/Facebook authentication for easier signup
- 🏷 **Tags & Categories**: Enable filtering and organizing events by tags
- 🔔 **Real-time Notifications**: Notify users when events are updated or joined
- 📊 **Event Analytics**: Show views, join stats, and trends
- 📅 **Calendar View**: Visualize upcoming events in a calendar layout
- 📱 **PWA & Mobile App**: Build a progressive web app / mobile-friendly version
- 💬 **Comments & Reviews**: Allow users to share feedback on events
- ✨ **UI/UX Enhancements**: Add smooth animations and better transitions


## 🌐 Live Demo
- Frontend: [https://eventzen-ashen.vercel.app](https://eventzen-ashen.vercel.app)
- Backend API: [https://eventzen-server.vercel.app/](https://eventzen-server.vercel.app/)

## 📦 Installation
```bash
# Clone the repository
git clone https://github.com/nahidn228/EventZen-Client.git
cd EventZen-Client

# Install dependencies
npm install

# Start development server
npm run dev
