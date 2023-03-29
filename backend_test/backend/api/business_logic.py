from django.db.models import Count, QuerySet
from rest_framework.exceptions import ValidationError
from .models import (School, Student)
from .repository import (SchoolRepository, StudentRepository)
import uuid


class SchoolBusinessLogic:
    def __init__(self):
        self.repository = SchoolRepository()
        self.school = School.objects.create(school_name="Test School", maximum_students=1)
        self.student = Student.objects.create(
            first_name="Test first_name", 
            last_name="Test last_name", 
            school=self.school
            )


    def validate_school_name_request(self, school_name_request):
        if "school_name" not in school_name_request.data:
            raise ValidationError("No school_name in request.")
        if School.objects.filter(school_name=school_name_request.data["school_name"]).exists():
            raise ValidationError("school name already exists.")
        return school_name_request.data["school_name"]

        
    def validate_maximun_students_request(self, maximun_students_request):
        if "maximum_students" not in maximun_students_request.data:
            raise ValidationError("No maximum students in request.")
        return maximun_students_request.data["maximum_students"]
        
    def request_data(self, school_name_request, maximun_students_request):
        data = {
            "school_name": school_name_request,
            "maximum_students": maximun_students_request
        }
        return data
    
    # def validate_school_id_path_exits(self, school_id):
    #     if self.repository.get_school_exits(school_id):
    #         return school_id
    #     else: 
    #         raise ValidationError("school id does not exits.")
    
    def validate_school_id_exits(self, school_id):
        if self.repository.get_school_exits(school_id):
            school_id_queryset = self.repository.get_school_by_id(school_id)
            return school_id_queryset
        if not self.repository.get_school_exits(school_id):
            raise ValidationError("school id does not exits.")
        
    def validate_school_name_request_by_id(self, school_name_request):
        if "school_name" not in school_name_request.data:
            raise ValidationError("No school_name in request.")
        return school_name_request.data["school_name"]
    
    def validate_maximum_students_request_by_id(self, maximum_students_request):
        if "maximum_students" not in maximum_students_request.data:
            raise ValidationError("No maximum_school in request.")
        return maximum_students_request.data["maximum_students"]
    
class StudentBusinessLogic:
    def __init__(self):
        self.student_repository = StudentRepository()
        self.school_repository = SchoolRepository()
        
    def validate_first_name_request(self, first_name_request):
        if "first_name" not in first_name_request.data:
            raise ValidationError("No first_name in request.")
        return first_name_request.data["first_name"]
    
    def validate_last_name_request(self, last_name_request):
        if "last_name" not in last_name_request.data:
            raise ValidationError("No last_name in request.")
        return last_name_request.data["last_name"]
    
    def validate_duplicate_student_name(self, first_name_request, last_name_request):
        first_name_exits = self.student_repository.get_first_name_exits(first_name_request)
        last_name_exits = self.student_repository.get_last_name_exits(last_name_request)
        if first_name_exits and last_name_exits:
            raise ValidationError("Student first name and last name are already exits in database.")
        return first_name_request, last_name_request
    
    def validate_school_request(self, school_request):
        if "school" not in school_request.data:
            raise ValidationError("No school in request.")
        if not self.student_repository.get_school_exits(school_request.data["school"]):
            raise ValidationError("school not exits in database please create this school first.")
        return school_request.data["school"]
    
    def post_student_data(self, first_name_request, last_name_request, school_request):
        student_id = str(uuid.uuid1())
        uuid_limit = student_id[:4]
        school_queryset = self.school_repository.get_school_by_id(school_request)
        if school_queryset.students.count() >= school_queryset.maximum_students:
            raise ValidationError("Cannot create students because this school reached to maximum number of students.")
        data = {
            "student_id": uuid_limit,
            "first_name": first_name_request,
            "last_name": last_name_request,
            "school": school_request
        }
        return data
        
    def validate_student_id_exits(self, id):
        if self.student_repository.get_students_by_id_exits(id):
            id_queryset = self.student_repository.get_student_by_id(id)
            return id_queryset
        if not self.student_repository.get_students_by_id_exits(id):
            raise ValidationError("student does not exits.")
        
    def validate_student_id_request_and_exits(self, student_id_request):
        if "student_id" not in student_id_request.data:
            raise ValidationError("No student id in request.")
        if self.student_repository.get_student_id_exits(student_id_request.data["student_id"]):
            raise ValidationError("Cannot update student id because it this student id already exits.")
        return student_id_request.data["student_id"]
    
    def validate_school_request_exits(self, school_request):
        if "school" not in school_request.data:
            raise ValidationError("No school in request.")
        return school_request.data["school"]
    
    def validate_school_maximum_students(self, school_request):
        school_queryset = self.school_repository.get_school_by_id(school_request)
        if school_queryset.students.count() >= school_queryset.maximum_students:
            raise ValidationError("Cannot update student's school because it will reached maximum students of this school.")
        return school_request
    
    def update_request_data(self, student_id_request, first_name_request, last_name_request, school_request):
        data = {
            "student_id": student_id_request,
            "first_name": first_name_request,
            "last_name": last_name_request,
            "school": school_request
        }
        return data
    
    



        
        
    
    


    
    

        

        