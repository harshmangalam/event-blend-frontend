interface BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type EventDateSchema = {
  id: string;
  startDate: string;
  endDate: string;
  eventId: string;
};
