import axios from "axios";

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }

// AUTH => ROUTES

  whoami() {
    return this.apiClient.get("/whoami");
  }

  login(body) {
    return this.apiClient.post("/login", body);
  }

  signup(body) {
    return this.apiClient.post("/signup", body);
  }

  logout() {
    return this.apiClient.get("/logout");
  }

// PROFILE => ROUTES

  profile() {
    return this.apiClient.get("/profile");
  }

  updateProfile(body) {
    return this.apiClient.put("/profile", body);
  }

  deleteProfile() {
    return this.apiClient.delete("/profile/delete")
  }

// SURFERS => ROUTES

  surfersList() {
    return this.apiClient.get("/surfers-list");
  }

  surferProfile(id) {
    return this.apiClient.get(`/surfers-list/${id}`);
  }

// BEACHES => ROUTES

  beachesList() {
    return this.apiClient.get("/beaches-list")
  }

  beachProfile(id) {
    return this.apiClient.get(`/beaches-list/${id}`);
  }

// BEACHES => REVIEW ROUTES

  createBeachReview(id, body) {
    return this.apiClient.post(`/beaches-list/${id}/add-review`, body);
  }

  deleteBeachReview(id, _id, body) {
    return this.apiClient.post(`/beaches-list/${id}/delete-review/${_id}`, body);
  }

// BEACHES => RATE ROUTES

  createBeachRate(id, body) {
    return this.apiClient.post(`/beaches-list/${id}/add-rate`, body);
  }

  deleteBeachRate(id, _id) {
    return this.apiClient.post(`/beaches-list/${id}/delete-rate/${_id}`);
  }

// EVENTS => ROUTES

  eventsList() {
    return this.apiClient.get("/events-list")
  }

  eventProfile(id) {
    return this.apiClient.get(`/events-list/${id}`);
  }

  eventParticipants() {
    return this.apiClient.get('events-list/participants');
  }

  eventOwner() {
    return this.apiClient.get('events-list/owner');
  }

  eventSurferParticipants(id) {
    return this.apiClient.post('events-list/surfer-participants', {id});
  }

  eventSurferOwner(id) {
    return this.apiClient.post('events-list/surfer-owner', {id});
  }

  createEvent(body) {
    return this.apiClient.post(`/events-list`, body);
  }

  updateEvent(id, body) {
    return this.apiClient.put(`/events-list/${id}`, body);
  }

  deleteEvent(id) {
    return this.apiClient.delete(`/events-list/${id}`);
  }

// EVENTS => PARTICIPANT ROUTES

  AddParticipant(id) {
    return this.apiClient.post(`/events-list/${id}/add-participant`);
  }

  RemoveParticipant(id) {
    return this.apiClient.post(`/events-list/${id}/remove-participant`);
  }

// EVENTS => REVIEW ROUTES

  createEventReview(id, body) {
    return this.apiClient.post(`/events-list/${id}/add-review`, body);
  }

  deleteEventReview(id, _id) {
    return this.apiClient.post(`/events-list/${id}/delete-review/${_id}`);
  }
}

const apiClient = new ApiClient();
export default apiClient;
