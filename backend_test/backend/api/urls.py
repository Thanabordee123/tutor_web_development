from django.urls import path, include
# from rest_framework_nested import routers
from .views import (
    SchoolApiView,
    SchoolByIdApiView,
    StudentApiView,
    StudentByIdApiView,
)

# router = routers.SimpleRouter()
# router.register(r'schools', SchoolApiView, basename='schools')

# students_router = routers.NestedSimpleRouter(router, r'schools', lookup='schools')
# students_router.register(r'students', SchoolsStudentApiView, basename='school-students')

# urlpatterns = [
#     path('', include(router.urls)),
#     path('', include(students_router.urls)),
#     path('schools/<int:school_id>/', SchoolByIdApiView.as_view()),
#     path('students/', StudentApiView.as_view()),
#     path('students/<int:student_id>/', StudentByIdApiView.as_view())
# ]


urlpatterns = [
    path('schools/', SchoolApiView.as_view()),
    path('schools/<int:school_id>/', SchoolByIdApiView.as_view()),
    path('students/', StudentApiView.as_view()),
    path('students/<int:student_id>/', StudentByIdApiView.as_view())
]
