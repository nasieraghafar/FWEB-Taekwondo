import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; 
import { Button, Modal, Form, Alert } from "react-bootstrap";
import '../Calendar.css';

const AdminEventCalendar = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetails, setEventDetails] = useState({ title: "", date: "", location: "", time: "" });
  const [error, setError] = useState("");

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

  const validateFields = (eventData) => {
    if (!eventData.title || !eventData.date || !eventData.location || !eventData.time) {
      setError("All fields (Title, Date, Location, and Time) are required.");
      return false;
    }
    setError(""); // Clear error if all fields are valid
    return true;
  };

  const handleEventSubmit = async () => {
    if (!validateFields(eventDetails)) return;

    try {
      const response = await fetch("http://localhost:5050/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventDetails),
      });

      if (!response.ok) throw new Error("Failed to create event");

      setShowCreateModal(false);
      setEventDetails({ title: "", date: "", location: "", time: "" });
      fetchEvents();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`http://localhost:5050/events/${selectedEvent.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete event");

      setShowEditModal(false);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleUpdateEvent = async () => {
    if (!validateFields(selectedEvent)) return;

    try {
      const response = await fetch(`http://localhost:5050/events/${selectedEvent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedEvent),
      });

      if (!response.ok) throw new Error("Failed to update event");

      setShowEditModal(false);
      fetchEvents();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="event-calendar-container">
      <div className="event-header">
        <h2 className="event-title">Schedule Events</h2>
        <Button className="create-event-button" onClick={() => setShowCreateModal(true)}>
          + Create Event
        </Button>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height={"auto"}
        aspectRatio={2}
        eventClick={(info) => {
          setSelectedEvent({
            id: info.event.id,
            title: info.event.title,
            date: info.event.startStr,
            location: info.event.extendedProps.location,
            time: info.event.extendedProps.time
          });
          setShowEditModal(true);
        }}
      />
      
      {/* Create Event Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter event title"
                value={eventDetails.title} 
                onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control 
                type="date" 
                value={eventDetails.date} 
                onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter event location"
                value={eventDetails.location} 
                onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Time</Form.Label>
              <Form.Control 
                type="time" 
                value={eventDetails.time} 
                onChange={(e) => setEventDetails({ ...eventDetails, time: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleEventSubmit}>Save Event</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Event Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {selectedEvent && (
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedEvent.title}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedEvent.date}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedEvent.location}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  value={selectedEvent.time}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, time: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteEvent}>Delete Event</Button>
          <Button variant="primary" onClick={handleUpdateEvent}>Update Event</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminEventCalendar;
