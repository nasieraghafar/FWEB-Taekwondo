import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; 
import { Modal, Button } from "react-bootstrap";
import '../Calendar.css';

const PublicCalendar = () => {
  const [events, setEvents] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5050/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="event-calendar-container">
      <div className="event-header">
        <h2 className="event-title">Upcoming Events</h2>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height={"auto"}
        aspectRatio={2}
        eventClick={(info) => {
          setSelectedEvent({
            title: info.event.title,
            date: info.event.startStr,
            location: info.event.extendedProps.location,
            time: info.event.extendedProps.time
          });
          setShowModal(true);
        }}
      />

      {/* Modal for Viewing Event Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              <p><strong>Title:</strong> {selectedEvent.title}</p>
              <p><strong>Date:</strong> {selectedEvent.date}</p>
              <p><strong>Location:</strong> {selectedEvent.location || "Not provided"}</p>
              <p><strong>Time:</strong> {selectedEvent.time || "Not provided"}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PublicCalendar;
