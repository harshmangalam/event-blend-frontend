import { EventDateSchema } from "./models";

interface BaseSchema {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiMetaData {
  totalCount: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

interface ApiResponse<T = {}> {
  data?: T;
  message: string;
  success: boolean;
  error?: any;
}

interface _Count {
  groups: number;
  members: number;
  events: number;
  topics: number;
  followedByUsers: number;
  attendees: number;
  followingTopics: number;
  groupsAdmin: number;
}
interface Location extends BaseSchema {
  lat: number;
  lon: number;
  city: string;
  state: string;
  country: string;
  timezone: string;
  _count: Pick<_Count, "groups">;
}

interface GroupMember extends BaseSchema {
  groupId: string;
  userId: string;
  group: Group;
  user: User;
  role:
    | "Member"
    | "Organizer"
    | "CoOrganizer"
    | "EventOrganizer"
    | "AssistantOrganizer";
}
interface User extends BaseSchema {
  name: string;
  profilePhoto: string;
  email: string;
  bio?: string | null;
  gender?: "Male" | "Female" | "Other" | null;
  role: "User" | "Admin";
  status: "Online" | "Offline" | "Banned";
  _count?: Pick<
    _Count,
    "members" | "groupsAdmin" | "events" | "topics" | "followingTopics"
  >;
  followingTopics?: Topic[] | null;
  members?: GroupMember[];
}

interface Topic extends BaseSchema {
  name: string;
  user: Pick<User, "id" | "name">;
  categoryId: string;
  slug: string;
  groups: Group[];
  _count: Pick<_Count, "groups" | "events" | "followedByUsers">;
}

interface Group extends BaseSchema {
  location: Location;
  topics: Pick<Topic, "id" | "name" | "slug">[];
  name: string;
  slug: string;
  description: string;
  admin: Pick<User, "id" | "name" | "profilePhoto">;
  poster?: string | null;
  category: Pick<Category, "id" | "name" | "slug">;
  _count: {
    members: number;
    events: number;
  };
  network?: Pick<Network, "id" | "name">;
}

interface Network extends BaseSchema {
  name: string;
  organization?: string | null;
  organizationUrl?: string | null;
  groupsCount: number;
  user: Pick<User, "id" | "name">;
}

interface Category extends BaseSchema {
  name: string;
  slug: string;
  description?: string;
  topics: Topic[];
  _count?: Pick<_Count, "events" | "groups">;
}

interface Event extends BaseSchema {
  name: string;
  group: Group;
  poster: string | null;
  location: Location;
  details: string | null;
  address: string;
  eventType: "InPerson" | "Online";
  category: Category;
  topics: Topic[];
  user: User;
  _count: Pick<_Count, "attendees">;
  dates: EventDateSchema[];
}

export type {
  ApiMetaData,
  ApiResponse,
  Category,
  Group,
  Location,
  Network,
  Topic,
  User,
  Event,
  _Count,
  GroupMember,
};

export type DiscoverCategory = Pick<
  Category,
  "name" | "slug" | "topics" | "id"
>;

export type PopularCategory = Pick<Category, "id" | "slug" | "name" | "_count">;

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  status: "Online" | "Offline" | "Banned";
  role: "Admin" | "User";
  profilePhoto: string | null;
};

export type TopicOption = Pick<Topic, "id" | "name">;
export type GroupOptions = Pick<Group, "id" | "name">;
