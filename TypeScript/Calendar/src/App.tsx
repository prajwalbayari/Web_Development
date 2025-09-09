import { Calendar } from "./components/calendar";
import { EventsProvider } from "./context/events";
import "./styles.css";

export default function App() {
  return (
    <EventsProvider>
      <Calendar />
    </EventsProvider>
  );
}
