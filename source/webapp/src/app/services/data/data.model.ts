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

export interface Employees{
  number: number,

  _id: string,
  id: string,

  lname: string,
  fname: string,
  mname: string,
  extname: string,

  imgUrl: string,

  start_Date: Date,

  birth_Date: Date,

  address: string,
  position: string,
  department: string, 

  role: number,

  password: string,

  isArchive: number,
  created_at: Date,
  updated_at: Date
}

export interface Attendance{
  number: number;
  _id: string;
  id: string;
  name: string;
  attendance_date: string;
  attendance_hours: number;
}

export interface TaskBoard {


  taskBoard_number: number,
  taskBoard_project: string,
  taskBoard_name: string,
  taskBoard_content: string,
  taskBoard_end_date: Date, //give this default 0
  taskBoard_master: string,
  taskBoard_slave: string,
  taskBoard_employees: JSON,
  imageUrl: string,
  uploaded_by: string,

  isArchive: number,
  created_at: Date,
  updated_at: Date

}

export interface Inventories {
  
  _id: string;

  number: number;
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  imageUrl: string

  isArchive: number;
  created_at: Date;
  updated_at: Date;

}






