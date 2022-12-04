use projectdatabase;

insert into Student (Student_Id, Student_Name) values (1, "John Doe");

insert into Professor (Professor_Id, Professor_Name, Professor_Email, Office_Hours) values
(1, "Jahan Ghofraniha", "jahan.ghofraniha@sjsu.edu", "M-W 10:15 – 11:00 am or through zoom by appointments Zoom link: https://sjsu.zoom.us/j/6478341917 "),
(2, "Chris Pollett", "chris@pollett.org", "MH 214, M-W 12:15-1:15pm"),
(3, "Rula Khayrallah", "rula.khayrallah@sjsu.edu", "Online via Zoom: Tuesday 1:30-2:30 PM, Wednesday 4-5 PM");

insert into Course (Course_Id, Course_Name, Course_Units) values
(1, "CS157", 3),
(2, "CS174", 3),
(3, "CS122", 3);

insert into Class (Class_Id, Location, Meeting_Day, Start_Time, End_Time, Professor_Id, Course_Id, Class_Section) values
(1, "Washington Square Hall 109", "Monday Wednesday", '09:00:00', '10:15:00', 1, 1, 1),
(2, "Macquarrie Hall 223", "Monday Wednesday", '15:00:00', '16:15:00', 2, 2, 2),
(3, "Macquarrie Hall 233", "Tuesday Thursday", '10:30:00', '11:45:00', 3, 3, 1);

insert into Notes (Notes_Id, Notes_Content, Student_Id, Class_Id, Topic_Id) values
(1, "Notes on physical design", 1, 1, 1),
(2, "Notes on php", 1, 2, 5),
(3, "Notes on Normalization", 1, 1, 3),
(4, "Notes on sequence data types", 1, 3, 6);

insert into Exam (Exam_Id, Exam_Date, Exam_Name, Class_Id) values
(1, '2022-12-12', "Final", 1),
(2, '2022-11-06', "Midterm", 3),
(3, '2022-10-17', "Normalization Quiz", 1);

insert into Topic (Topic_Id, Topic_Name) values
(1, "Physical Design"),
(2, "Logical Design"),
(3, "Normalization"),
(4, "NoSQL"),
(5, "PHP"),
(6, "Sequence Data Types"),
(7, "Python Libraries");

insert into Assignment (Assignment_Id, Assignment_Due_Date, Assignment_Type, Assignment_Name, Class_Id) values
(1, '2022-12-05', "Homework", "NoSQL Homework",1),
(2, '2022-12-06', 'Project', 'Database Design Project', 1),
(3, '2022-12-05', "Homework", "Homework 5", 2);
insert into Assignment_Topic (Assignment_Topic_Id, Assignment_Id, Topic_Id) values
(1, 1, 4),
(2, 2, 1),
(3, 2, 2),
(4, 2, 3),
(5, 3, 5);
insert into Exam_Topic (Exam_Topic_Id, Exam_Id, Topic_Id) values
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 2, 6),
(6, 2, 7),
(7, 3, 3);