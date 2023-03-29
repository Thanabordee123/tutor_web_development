
.--------- to run api ------------

1. you need to activate venv first
use command: env\Scripts\activate (window) 

2. cd to backend
use command: cd backend

3. for start server
use command: python manage.py runserver 8000


--------- api endpoint ----------

endpoint: /api/schools/
1.can get all school detail
2.can post school detail but if school name request exits in database it not allow you to post school name.

endpoint: /api/schools/<school_id>/
1.can get school detail by id if school id does not exits in database it not allow you to get that school.
2.can patch school detail by id but if school name request exits in database it not allow you to patch that school name.
3.can delete school detail by id if schoold id does not exits in database it not allow you to delete that school.

endpoint /api/students/
1.can get all students detail
2.can post student detial but if first name and last name in request are already exits in database it will not allow you to post that student
2.1 if post student detail that school_id does not exits in database it not allow you to post that student 
2.2 if post student that reached to maximum of students of each school it will not allow you to post that student.

endpoint /api/students/<student>
1.can get student detail by id if student does not exits in database it not allow you to get that student detail.
2.can patch student detail by id first name and last name request already exits in database it not allow to patch that student.
2.1 if patch student' school that casue reached maximum students of each school it not allow you to patch that student detail.
3.can delete student detail by id if student not exits in database it not allow you to delete that student.
   

--------- to test api -----------

I create unit test for test my function in business logic

1.to run unit test
use command: coverage run --source='.' manage.py test

2.to generate detail of my test as html file
use command: coverage html

3.to review detail of my test as html file
go to: backend/htmlcov/coverage_html

