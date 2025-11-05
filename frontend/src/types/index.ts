export interface User {
  id: string;
  email: string;
  profile: Profile;
}

export interface Profile {
  id: string;
  name: string;
  headline?: string;
  location?: string;
  about?: string;
  photoUrl?: string;
  experiences?: Experience[];
  educations?: Education[];
  skills?: Skill[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
}