create view Class_Info_VW
as
select 
Class_Id,
Course_Name,
Class_Section,
Course_Units,
Location,
Meeting_Day,
Start_Time,
End_Time,
Professor_Name,
Professor_Email,
Office_Hours from
Class inner join Professor on Class.Professor_Id = Professor.Professor_Id
inner join Course on Class.Course_Id = Course.Course_Id;

create view Exam_Info_VW
as
select Exam.Exam_Id, Exam_Date, Exam.Class_Id, Course_Name, Exam_Name, group_concat(Topic_Name)
from Exam inner join Exam_Topic on Exam.Exam_Id = Exam_Topic.Exam_Id
inner join Topic using (Topic_Id)
inner join Class on Exam.Class_Id = Class.Class_Id
inner join Course on Class.Course_Id = Course.Course_Id
group by Exam_Topic.Exam_Id;

create view Assignment_Info_VW
as
select Assignment.Assignment_Id, Assignment_Due_Date, Assignment.Class_Id, Course_Name, Assignment_Type, Assignment_Name, group_concat(Topic_Name)
from Assignment inner join Assignment_Topic on Assignment.Assignment_Id = Assignment_Topic.Assignment_Id
inner join Topic using (Topic_Id)
inner join Class on Assignment.Class_Id = Class.Class_Id
inner join Course on Class.Course_Id = Course.Course_Id
group by Assignment_Topic.Assignment_Id;

create view Notes_Info_VW
as
select Notes.Notes_Id, Notes.Topic_Id, Topic.Topic_Name, Notes.Notes_Content, Notes.Student_Id
from Notes inner join Topic on Notes.Topic_Id = Topic.Topic_Id;



