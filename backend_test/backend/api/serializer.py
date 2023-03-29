from rest_framework import serializers
from .models import (School, Student)
   
class SchoolSerializer(serializers.ModelSerializer):
    # number_of_students = serializers.IntegerField()

    class Meta:
        model=School
        fields=["id", "school_name", "maximum_students", "create_date", "update_date"]

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Student
        fields=["id", "student_id", "first_name", "last_name", "school", "create_date", "update_date"]