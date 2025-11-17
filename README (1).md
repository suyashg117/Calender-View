# Calendar View Component

A sophisticated, production-grade interactive calendar component built with React, TypeScript, and Tailwind CSS. Features month and week views, comprehensive event management, and beautiful modern design following enterprise UI/UX patterns.

## 🚀 Live Demo

Visit the live application to see the calendar in action with all interactive features.

## ✨ Features

- **📅 Multiple Views**
  - Month View: 42-cell grid showing 6 weeks with complete month context
  - Week View: Time-slotted 7-day view with hourly intervals

- **🎯 Event Management**
  - Create, edit, and delete events
  - Color-coded event categories (Blue, Green, Purple, Orange, Red)
  - Event modal with full form validation
  - Support for multi-day events

- **💫 Interactive Behaviors**
  - Click empty cells to create events
  - Click events to edit or delete
  - Hover events for quick preview
  - Smooth transitions and animations
  - Responsive touch interactions

- **♿ Accessibility**
  - Semantic HTML structure
  - Keyboard navigation support
  - ARIA labels and roles
  - Focus management

- **📱 Responsive Design**
  - Mobile-first approach
  - Optimized for all screen sizes
  - Touch-friendly interactions

## 🛠️ Technologies

- **React 18** - Component framework
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 3** - Utility-first styling
- **Vite** - Fast build tooling
- **date-fns** - Date manipulation utilities
- **Radix UI** - Accessible component primitives

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Architecture

### Project Structure

```
calendar-component/
│
├── .storybook/                   # Storybook configuration
│   ├── main.ts
│   └── preview.ts
│
└── src/
    ├── components/
    │   ├── Calendar/
    │   │   ├── CalendarView.tsx             # Main calendar wrapper
    │   │   ├── CalendarView.stories.tsx     # Storybook stories
    │   │   ├── CalendarView.types.ts        # Component props/types
    │   │   ├── MonthView.tsx                # Month view grid
    │   │   ├── WeekView.tsx                 # Week view layout
    │   │   ├── CalendarCell.tsx             # Single date cell
    │   │   ├── CalendarHeader.tsx           # Navigation and view controls
    │   │   └── EventModal.tsx               # Event add/edit modal
    │   │
    │   └── primitives/                      # Reusable UI components
    │       ├── Button.tsx
    │       ├── Modal.tsx
    │       └── Select.tsx
    │
    ├── hooks/
    │   ├── useCalendar.ts                   # Date navigation logic
    │   └── useEventManager.ts               # Add/edit/delete events
    │
    ├── utils/
    │   ├── date.utils.ts                    # Date helper functions
    │   └── event.utils.ts                   # Event helper utilities
    │
    ├── styles/
    │   └── globals.css                      # Global styles & design tokens
    │
    └── pages/
        └── Index.tsx                        # Demo page
```

### Design System

The calendar uses a comprehensive design system defined in `src/styles/globals.css` and `tailwind.config.ts`:

- **Primary Color**: Sky Blue (#0ea5e9) for interactive elements
- **Neutral Grays**: Clean, modern grayscale palette
- **Event Colors**: 5 distinct colors for event categorization
- **Spacing**: Consistent 4px base unit following Tailwind's scale
- **Typography**: Clear hierarchy with semantic font sizes

### Key Design Decisions

1. **Separation of Concerns**: Calendar logic, event management, and UI rendering are cleanly separated
2. **Custom Hooks**: `useCalendar` and `useEventManager` provide reusable stateful logic
3. **Utility Functions**: Date and event operations abstracted into pure functions
4. **Design Tokens**: All colors and spacing use CSS variables for consistency
5. **Composable Components**: Small, focused components that can be tested independently

## 🎨 Usage Example

```tsx
import { CalendarView } from '@/components/Calendar/CalendarView';
import { CalendarEvent } from '@/components/Calendar/CalendarView.types';

const MyApp = () => {
  const handleEventAdd = (event: Omit<CalendarEvent, 'id'>) => {
    console.log('Event added:', event);
    // Add to your backend/state management
  };

  const handleEventUpdate = (id: string, updates: Partial<CalendarEvent>) => {
    console.log('Event updated:', id, updates);
    // Update in your backend/state management
  };

  const handleEventDelete = (id: string) => {
    console.log('Event deleted:', id);
    // Delete from your backend/state management
  };

  return (
    <CalendarView
      events={[]}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
      initialView="month"
    />
  );
};
```

## 🔍 Component API

### CalendarView Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `events` | `CalendarEvent[]` | `[]` | Initial events to display |
| `onEventAdd` | `(event) => void` | - | Callback when event is created |
| `onEventUpdate` | `(id, updates) => void` | - | Callback when event is updated |
| `onEventDelete` | `(id) => void` | - | Callback when event is deleted |
| `initialView` | `'month' \| 'week'` | `'month'` | Initial view mode |
| `initialDate` | `Date` | `new Date()` | Initial date to display |

### CalendarEvent Interface

```typescript
interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  category?: string;
}
```

## 🎯 Assignment Compliance

This implementation follows the requirements from the Frontend Developer Hiring Assignment:

- ✅ Built from scratch without pre-built calendar libraries
- ✅ Uses only allowed utilities (date-fns, clsx)
- ✅ TypeScript with full type safety
- ✅ Tailwind CSS for all styling
- ✅ Production-quality code architecture
- ✅ Enterprise-grade UI/UX patterns
- ✅ Responsive design with mobile support
- ✅ Accessible with semantic HTML
- ✅ 42-cell month view (6 weeks × 7 days)
- ✅ Week view with time slots
- ✅ Interactive event management
- ✅ Clean component structure

## 📝 License

This project was created as part of a frontend developer hiring assignment.

## 👤 Author

[Suyash Gupta]
[suyashgupta1119@gmail.com]
