from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .repository import (SchoolRepository, StudentRepository)
from .business_logic import (SchoolBusinessLogic, StudentBusinessLogic)
from .serializer import (SchoolSerializer, StudentSerializer)

class SchoolApiView(APIView):
    def __init__(self):
        self.repository = SchoolRepository()
        self.business_logic = SchoolBusinessLogic()

    def get(self, request):
        data = self.repository.get_school()
        serializer = SchoolSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        school_name_request = self.business_logic.validate_school_name_request(request)
        maximum_students_request = self.business_logic.validate_maximun_students_request(request)
        post_request_data = self.business_logic.request_data(school_name_request, maximum_students_request)
        serializer = SchoolSerializer(data=post_request_data)
        serializer = self.repository.save_data(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        

class SchoolByIdApiView(APIView):
    def __init__(self):
        self.repository = SchoolRepository()
        self.business_logic = SchoolBusinessLogic()

    def get(self, request, school_id):
        data = self.business_logic.validate_school_id_exits(school_id)
        serializer = SchoolSerializer(data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request, school_id):
        school_id_queryset = self.business_logic.validate_school_id_exits(school_id)
        school_name_request = self.business_logic.validate_school_name_request_by_id(request)
        maximum_students_request = self.business_logic.validate_maximum_students_request_by_id(request)
        update_request_data = self.business_logic.request_data(school_name_request, maximum_students_request)
        serializer = SchoolSerializer(school_id_queryset, data=update_request_data)
        serializer = self.repository.save_data(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, school_id):
        school_id_queryset = self.business_logic.validate_school_id_exits(school_id)
        self.repository.delete_data(school_id_queryset)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class StudentApiView(APIView):
    def __init__(self):
        self.repository = StudentRepository()
        self.business_logic = StudentBusinessLogic()

    def get(self, request):
        data = self.repository.get_students()
        serializer = StudentSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        first_name_request = self.business_logic.validate_first_name_request(request)
        last_name_request = self.business_logic.validate_last_name_request(request)
        first_name_request, last_name_request = self.business_logic.validate_duplicate_student_name(first_name_request, last_name_request)
        school_request = self.business_logic.validate_school_request(request)
        post_students_data = self.business_logic.post_student_data(first_name_request, last_name_request, school_request)
        serializer = StudentSerializer(data=post_students_data)
        serializer = self.repository.save_data(serializer)
        return Response(serializer.data , status=status.HTTP_201_CREATED)
    
class StudentByIdApiView(APIView):
    def __init__(self):
        self.repository = StudentRepository()
        self.business_logic = StudentBusinessLogic()

    def get(self, request, student_id):
        data = self.business_logic.validate_student_id_exits(student_id)
        serializer = StudentSerializer(data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request, student_id):
        student_queryset = self.business_logic.validate_student_id_exits(student_id)
        student_id_request = self.business_logic.validate_student_id_request_and_exits(request)
        first_name_request = self.business_logic.validate_first_name_request(request)
        last_name_request = self.business_logic.validate_last_name_request(request)
        first_name_request, last_name_request = self.business_logic.validate_duplicate_student_name(first_name_request, last_name_request)
        school_request = self.business_logic.validate_school_request_exits(request)
        school_request = self.business_logic.validate_school_maximum_students(school_request)
        update_request_data = self.business_logic.update_request_data(student_id_request, first_name_request, last_name_request, school_request)
        serializer = StudentSerializer(student_queryset, data=update_request_data)
        serializer = self.repository.save_data(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, student_id):
        id_queryset = self.business_logic.validate_student_id_exits(student_id)
        self.repository.delete_data(id_queryset)
        return Response(status=status.HTTP_204_NO_CONTENT)
    

# class SchoolsStudentApiView(APIView):
#     def __init__(self):
#         self.school_business_logic = SchoolBusinessLogic()
#         self.student_business_logic = StudentBusinessLogic()
#         self.school_repository = SchoolRepository()
#         self.student_repository = StudentRepository()

#     def get(self, request, school_id):
#         school_id = self.school_business_logic.validate_school_id_path_exits(school_id)
#         students_in_school = self.school_repository.get_students_in_school(school_id)
#         serializer = StudentSerializer(students_in_school)
#         return Response(serializer.data, status=status.HTTP_200_OK)






    


       






   



        





    




        
        