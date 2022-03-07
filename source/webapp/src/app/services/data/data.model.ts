export interface ConnStatus{  
  content: JSON;
  message: string;
  status: any;
}

export interface Announcement{
  announcement_title: string,
  announcement_content: string,

  announcement_end_date: Date,

  isArchive: number,
  created_at: Date,
  updated_at: Date

}


