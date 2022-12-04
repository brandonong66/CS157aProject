create database projectdatabase;
use projectdatabase;

create table Class(
    Class_Id int primary key,
    Location varchar(30),
    Meeting_Day varchar(30),
    Start_Time time,
    End_Time time,
    Professor_Id int,
    Course_Id int,
    Class_Section int
);
 
create table Course(
    Course_Id int primary key,
    Course_Name varchar(30),
    Course_Units int
);
create table Professor(
    Professor_Id int primary key,
    Professor_Name varchar(30),
    Professor_Email varchar(30),
    Office_Hours varchar(200)
);
create table Assignment(
    Assignment_Id int primary key,
    Assignment_Due_Date date,
    Assignment_Type varchar(30),
    Assignment_Name varchar(30),
    Class_Id int
);
create table Student(
    Student_Id int primary key,
    Student_Name varchar(30)
);
create table Exam(
    Exam_Id int primary key,
    Exam_Date Date,
    Exam_Name varchar(30),
    Class_Id int
);
create table Notes(
    Notes_Id int primary key,
     Notes_Content text,
    Student_Id int,
    Class_Id int,
    Topic_Id int
);
create table Topic(
    Topic_Id int primary key,
    Topic_Name varchar(30)
);
create table Exam_Topic(
    Exam_Topic_Id int primary key,
    Exam_Id  int,
    Topic_Id int
);
create table Assignment_Topic(
    Assignment_Topic_Id int primary key,
    Assignment_Id  int,
    Topic_Id int
);
alter table Class
add foreign key (Professor_Id) REFERENCES professor(Professor_Id);
alter table Class
add foreign key (Course_Id) REFERENCES Course(Course_Id);
 
alter table Notes
add foreign key (Class_Id) REFERENCES Class(Class_Id);
alter table Notes
add foreign key (Student_Id) REFERENCES Student(Student_Id);
 
alter table Exam
add foreign key (Class_Id) REFERENCES Class(Class_Id);
 
alter table Assignment
add foreign key (Class_Id) REFERENCES Class(Class_Id);
 
alter table Exam_Topic
add foreign key (Exam_Id) REFERENCES Exam(Exam_Id);
alter table Exam_Topic
add foreign key (Topic_Id) REFERENCES Topic(Topic_Id);
 
alter table Assignment_Topic
add foreign key (Assignment_Id) REFERENCES Assignment(Assignment_Id);
alter table Assignment_Topic
add foreign key (Topic_Id) REFERENCES Topic(Topic_Id);