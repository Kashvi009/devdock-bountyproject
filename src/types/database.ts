export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string | null;
  bio: string | null;
  skills: string[];
  location: string | null;
  past_hackathons: string[];
  interests: string[];
  availability: string[];
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read_at: string | null;
}