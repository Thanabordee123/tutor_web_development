from django.db import models

class School(models.Model):
    school_name = models.CharField(max_length=20)
    maximum_students = models.PositiveIntegerField()
    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)

class Student(models.Model):
    student_id = models.CharField(max_length=20)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='students')
    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)

