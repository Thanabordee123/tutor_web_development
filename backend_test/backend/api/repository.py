from .models import (School, Student)
from django.db.models import Count, QuerySet

class SchoolRepository:
    def get_school(self):
        return School.objects.all()
    
    def get_school_exits(self, school_id):
        return School.objects.filter(id=school_id).exists()
    
    # def get_students_in_school(self, school_id):
    #     return Student.objects.filter(school=school_id)

    
    def get_number_of_student(self, school_queryset: QuerySet):
        return school_queryset.objects.annotate(number_of_students=Count('student'))
    
    def save_data(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return serializer
        
    def delete_data(self, query_set):
        return query_set.delete()
        
    def get_school_by_id(self, school_id):
        return School.objects.get(id=school_id)
    
class StudentRepository:
    def get_students(self):
        return Student.objects.all()
    
    def get_student_by_id(self, id_request):
        return Student.objects.get(id=id_request)
    
    def get_students_by_id_exits(self, id_request):
        return Student.objects.filter(id=id_request).exists()
    
    def get_student_id_exits(self, student_id_request):
        return Student.objects.filter(student_id=student_id_request).exists()
    
    def get_first_name_exits(self, first_name_request):
        return Student.objects.filter(first_name=first_name_request).exists()
    
    def get_last_name_exits(self, last_name_request):
        return Student.objects.filter(last_name=last_name_request).exists()
    
    def get_school_exits(self, school_request):
        return School.objects.filter(id=school_request).exists()
    
    def save_data(self, serializer):
        if serializer.is_valid():
            serializer.save()
            return serializer
        
    def delete_data(self, query_set):
        return query_set.delete()