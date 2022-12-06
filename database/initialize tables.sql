create database projectdatabase;
use projectdatabase;

create table Class(
    Class_Id int primary key AUTO_INCREMENT,
    Location varchar(30),
    Meeting_Day varchar(30),
    Start_Time time,
    End_Time time,
    Professor_Id int,
    Course_Id int,
    Class_Section int
);
 
create table Course(
    Course_Id int primary key AUTO_INCREMENT,
    Course_Name varchar(30),
    Course_Units int,
    CONSTRAINT UC_Course_Name UNIQUE (Course_Name)
);
create table Professor(
    Professor_Id int primary key AUTO_INCREMENT,
    Professor_Name varchar(50),
    Professor_Email varchar(50),
    Office_Hours varchar(200),
    CONSTRAINT UC_Professor_Email UNIQUE (Professor_Email)
);
create table Assignment(
    Assignment_Id int primary key AUTO_INCREMENT,
    Assignment_Due_Date date,
    Assignment_Type varchar(30),
    Assignment_Name varchar(30),
    Class_Id int,
    CONSTRAINT UC_Assignment UNIQUE (Assignment_Name, Class_Id)
);
create table Student(
    Student_Id int primary key NOT NULL,
    Student_Name varchar(30) NOT NULL,
    Student_Password varchar(30) NOT NULL
);
create table Exam(
    Exam_Id int primary key AUTO_INCREMENT,
    Exam_Date Date,
    Exam_Name varchar(30),
    Class_Id int,
    CONSTRAINT UC_Exam UNIQUE (Exam_Name, Class_Id)
);
create table Notes(
    Notes_Id int primary key AUTO_INCREMENT,
    Notes_Content text,
    Student_Id int,
    Topic_Id int,
    CONSTRAINT UC_Notes UNIQUE (Student_Id, Topic_Id)
);
create table Topic(
    Topic_Id int primary key AUTO_INCREMENT,
    Topic_Name varchar(30),
    CONSTRAINT UC_Topic_Name UNIQUE (Topic_Name)
);
create table Exam_Topic(
    Exam_Id int,
    Topic_Id int
);
create table Assignment_Topic(
    Assignment_Id int,
    Topic_Id int
);

create table Class_Enrollment(
	Class_Id int,
    Student_Id int
);
alter table Class
add foreign key (Professor_Id) REFERENCES Professor(Professor_Id);
alter table Class
add foreign key (Course_Id) REFERENCES Course(Course_Id);
 

alter table Notes
add foreign key (Student_Id) REFERENCES Student(Student_Id);
 
alter table Exam
add foreign key (Class_Id) REFERENCES Class(Class_Id);
 
alter table Assignment
add foreign key (Class_Id) REFERENCES Class(Class_Id);
 
alter table Exam_Topic add primary key (Exam_Id, Topic_Id);
alter table Exam_Topic add foreign key (Exam_Id) REFERENCES Exam(Exam_Id);
alter table Exam_Topic add foreign key (Topic_Id) REFERENCES Topic(Topic_Id);
 
alter table Assignment_Topic add primary key (Assignment_Id,Topic_Id);
alter table Assignment_Topic add foreign key (Assignment_Id) REFERENCES Assignment(Assignment_Id);
alter table Assignment_Topic add foreign key (Topic_Id) REFERENCES Topic(Topic_Id);

alter table Class_Enrollment add primary key (Class_Id, Student_Id);
alter table Class_Enrollment add foreign key (Class_Id) references Class(Class_Id);
alter table Class_Enrollment add foreign key (Student_Id) references Student(Student_Id);