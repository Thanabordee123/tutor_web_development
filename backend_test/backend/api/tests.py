import unittest
from unittest.mock import MagicMock, patch, Mock
from rest_framework.exceptions import ValidationError
from .business_logic import (SchoolBusinessLogic, StudentBusinessLogic)
from .models import (School, Student)
from django.test.client import RequestFactory

class TestSchoolBusinessLogic(unittest.TestCase):
    def setUp(self):
        self.request = RequestFactory()
        self.school_business_logic = SchoolBusinessLogic()

    def test_validate_school_name_request_missing_request(self):
        request = self.request
        request.data = {}
        mock_validation_error = ValidationError("No school_name in request.")
        mock_validation_error.side_effect = ValidationError("No school_name in request.")
        with self.assertRaises(ValidationError) as error:
            self.school_business_logic.validate_school_name_request(request)
        self.assertEqual(str(error.exception), str(mock_validation_error))

    @patch('api.business_logic.School.objects')
    def test_validate_school_name_request_not_exits_in_database(self, mock_school_objects):
        mock_school_filter = mock_school_objects.filter
        mock_school_filter.return_value.exists.return_value = False
        request = self.request
        request.data = {"school_name": "Test School"}
        result = self.school_business_logic.validate_school_name_request(request)
        self.assertEqual(result, "Test School")

    @patch('api.business_logic.School.objects')
    def test_validate_school_name_request_exits_in_database(self, mock_school_objects):
        mock_school_filter = mock_school_objects.filter
        mock_school_filter.return_value.exists.return_value = True
        request = self.request
        request.data = {"school_name": "Test School"}
        mock_validation_error = ValidationError("school name already exists.")
        mock_validation_error.side_effect = ValidationError("school name already exists.")
        with self.assertRaises(ValidationError) as error:
            self.school_business_logic.validate_school_name_request(request)
        self.assertEqual(str(error.exception), str(mock_validation_error))

    @patch('api.business_logic.SchoolRepository')
    def test_validate_school_id_exits(self, mock_repository):
        mock_get_school_exits = mock_repository.return_value.get_school_exits
        mock_get_school_by_id = mock_repository.return_value.get_school_by_id
        mock_get_school_exits.return_value = True
        mock_get_school_by_id.return_value = School(id=1, school_name='Test School', maximum_students=10)
        school_id = 1
        actual = self.school_business_logic.validate_school_id_exits(school_id)
        expect = mock_get_school_by_id.return_value
        self.assertEqual(actual, expect)

    @patch('api.business_logic.SchoolRepository.get_school_exits')
    def test_validate_school_id_not_exits(self, mock_school_exits):
        mock_school_exits.return_value = False
        mock_validation_error = ValidationError("school id does not exits.")
        mock_validation_error.side_effect = ValidationError("school id does not exits.")
        school_id = 1
        with self.assertRaises(ValidationError) as error:
            self.school_business_logic.validate_school_id_exits(school_id)
        self.assertEqual(str(error.exception), str(mock_validation_error))

    def test_validate_maximun_students_request_missing_request(self):
        request = self.request
        request.data = {}
        with self.assertRaises(ValidationError):
            self.school_business_logic.validate_maximun_students_request(request)

    def test_validate_maximun_students_request_not_missing_request(self):
        request = self.request
        request.data = {
            "school_name": "KMUTNB",
            "maximum_students": 30
        }
        actual = self.school_business_logic.validate_maximun_students_request(request)
        expect = 30
        self.assertEqual(actual, expect)


    def test_request_data(self):
        school_name_request = "My School"
        maximum_students_request = 100
        actual = self.school_business_logic.request_data(school_name_request, maximum_students_request)
        expect = {
            "school_name": school_name_request,
            "maximum_students": maximum_students_request
        }
        self.assertEqual(actual, expect)

    def test_validate_school_name_request_by_id_missing_request(self):
        request = self.request
        request.data = {
            "maximum_students": 30
        }
        mock_validation_error = ValidationError("No school_name in request.")
        mock_validation_error.side_effect = ValidationError("No school_name in request.")
        with self.assertRaises(ValidationError) as error:
            self.school_business_logic.validate_school_name_request_by_id(request)
        self.assertEqual(str(error.exception), str(mock_validation_error))

    def test_validate_school_name_request_by_id_not_missing_request(self):
        request = self.request
        request.data = {
            "school_name": "KMUTNB",
            "maximum_students": 30
        }
        actual = self.school_business_logic.validate_school_name_request_by_id(request)
        expect = "KMUTNB"
        self.assertEqual(actual, expect)

    def test_validate_maximum_students_request_by_id_missing_request(self):
        request = self.request
        request.data = {}
        mock_validation_error = ValidationError("No maximum_school in request.")
        mock_validation_error.side_effect = ValidationError("No maximum_school in request.")
        with self.assertRaises(ValidationError) as error:
            self.school_business_logic.validate_maximum_students_request_by_id(request)
        self.assertEqual(str(error.exception), str(mock_validation_error))

    def test_validate_maximum_students_request_by_id_not_missing_request(self):
        request = self.request
        request.data = {
            "school_name": "CU",
            "maximum_students": 50
        }
        actual = self.school_business_logic.validate_maximum_students_request_by_id(request)
        expect = 50
        self.assertEqual(actual, expect)


class TestStudentBusinessLogic(unittest.TestCase):
    def setUp(self):
        self.request = RequestFactory()
        self.student_business_logic = StudentBusinessLogic()

    def test_validate_first_name_request_missing_request(self):
        request = self.request
        request.data = {
            "last_name": "Messi",
            "school": 1
        }
        mock_validation_error = ValidationError("No first_name in request.")
        mock_validation_error.side_effect = ValidationError("No first_name in request.")
        with self.assertRaises(ValidationError) as error:
            self.student_business_logic.validate_first_name_request(request)
        self.assertEqual(str(error.exception), str(mock_validation_error))

    def test_validate_first_name_request_not_missing_request(self):
        request = self.request
        request.data = {
            "first_name": "Lionel",
            "last_name": "Messi",
            "school": 1
        }
        actual = self.student_business_logic.validate_first_name_request(request)
        expect = "Lionel"
        self.assertEqual(actual, expect)
       
    def test_validate_last_name_request_missing_request(self):
        request = self.request
        request.data = {
            "first_name": "Lionel",
            "school": 1
        }
        mock_validation_error = ValidationError("No last_name in request.")
        mock_validation_error.side_effect = ValidationError("No last_name in request.")
        with self.assertRaises(ValidationError) as error:
            self.student_business_logic.validate_last_name_request(request)
        self.assertEqual(str(error.exception), str(mock_validation_error))

    def test_validate_last_name_request_not_missing_request(self):
        request = self.request
        request.data = {
            "first_name": "Lionel",
            "last_name": "Messi",
            "school": 1
        }
        actual = self.student_business_logic.validate_last_name_request(request)
        expect = "Messi"
        self.assertEqual(actual, expect)

    @patch('api.business_logic.Student.objects')
    def test_validate_duplicate_student_name(self, mock_student_object):
        mock_first_name_exits = mock_student_object.filter
        mock_first_name_exits.return_value.exists.return_value = True
        mock_last_name_exits = mock_student_object.filter
        mock_last_name_exits.return_value.exists.return_value = True
        mock_validation_error = ValidationError("Student first name and last name are already exits in database.")
        mock_validation_error.side_effect = ValidationError("Student first name and last name are already exits in database.")
        first_name = "John"
        last_name = "Wicks"
        with self.assertRaises(ValidationError) as error:
            self.student_business_logic.validate_duplicate_student_name(first_name, last_name)
        self.assertEqual(str(error.exception), str(mock_validation_error))

    @patch('api.business_logic.Student.objects')
    def test_validate_not_duplicate_student_name(self, mock_student_object):
        mock_first_name_exits = mock_student_object.filter
        mock_first_name_exits.return_value.exists.return_value = False
        mock_last_name_exits = mock_student_object.filter
        mock_last_name_exits.return_value.exists.return_value = False
        first_name = "Lionel"
        last_name = "Messi"
        actual = self.student_business_logic.validate_duplicate_student_name(first_name, last_name)
        expect = first_name, last_name
        self.assertEqual(actual, expect)

    def test_validate_school_request_not_in_request(self):
        request = self.request
        request.data = {
            "first_name": "Lionel",
            "last_name": "Messi",
        }
        mock_validation_error = ValidationError("No school in request.")
        mock_validation_error.side_effect = ValidationError("No school in request.")
        with self.assertRaises(ValidationError) as error:
            self.student_business_logic.validate_school_request(request)
        self.assertEqual(str(error.exception), str(mock_validation_error))

    @patch('api.business_logic.StudentRepository.get_school_exits')
    def test_validate_school_not_exits_in_database(self, mock_school_exits):
        mock_school_exits.return_value = False
        request = self.request
        request.data = {
            "first_name": "Lionel",
            "last_name": "Messi",
            "school": 1
        }
        mock_validation_error = ValidationError("school not exits in database please create this school first.")
        mock_validation_error.side_effect = ValidationError("school not exits in database please create this school first.")
        with self.assertRaises(ValidationError) as error:
            self.student_business_logic.validate_school_request(request)
        self.assertEqual(str(error.exception), str(mock_validation_error))

    @patch('api.business_logic.StudentRepository.get_school_exits')
    def test_validate_school_not_exits_in_database(self, mock_school_exits):
        mock_school_exits.return_value = True
        request = self.request
        request.data = {
            "first_name": "Lio",
            "last_name": "Spartan",
            "school": 2
        }
        actual = self.student_business_logic.validate_school_request(request)
        expect = 2
        self.assertEqual(actual, expect)

    def test_post_student_data(self):
        first_name_request = "Levi"
        last_name_request = "Ackerman"
        school_request = 3
        actual = self.student_business_logic.post_student_data(first_name_request, last_name_request, school_request)
        expect = {
            "student_id": "1ccf",
            "first_name": "Levi",
            "last_name": "Ackerman",
            "school": 3
        }
        self.assertEqual(actual, expect)

    @patch('api.business_logic.SchoolRepository.get_school_by_id')
    def test_post_student_data_maximum_student_reached(self, mock_get_school_by_id):
        school_mock = Mock()
        school_mock.maximum_students = 2
        school_mock.students.count.return_value = 2
        mock_get_school_by_id.return_value = school_mock
        first_name_request = "John"
        last_name_request = "Doe"
        school_request = "1"
        mock_validation_error = ValidationError("Cannot create students because this school reached to maximum number of students.")
        mock_validation_error.side_effect = ValidationError("Cannot create students because this school reached to maximum number of students.")
        with self.assertRaises(ValidationError) as error:
            self.student_business_logic.post_student_data(first_name_request,last_name_request,school_request)
        self.assertEqual(str(error.exception), str(mock_validation_error))

    @patch('api.business_logic.StudentRepository')
    def test_validate_student_id_request_and_exits_missing_id(self, mock_repository):
        request = self.request
        request.data = {
            "first_name": "Tha",
            "last_name": "wic",
            "school": 3
        }
        mock_validation_error = ValidationError("No student id in request.")
        mock_validation_error.side_effect = ValidationError("No student id in request.")
        with self.assertRaises(ValidationError) as error:
            self.student_business_logic.validate_student_id_request_and_exits(request)
        self.assertEqual(str(error.exception), str(mock_validation_error))

    @patch('api.business_logic.StudentRepository')
    def test_validate_student_id_request_and_exits_id_exists(self, mock_repository):
        mock_get_student_id_exits = mock_repository.return_value.get_student_id_exits
        mock_get_student_id_exits.return_value = True
        request = self.request
        request.data = {
            "student_id": 1,
            "first_name": "Tha",
            "last_name": "wic",
            "school": 3
        }
        mock_validation_error = ValidationError('Cannot update student id because it this student id already exits.')
        mock_validation_error.side_effect = ValidationError('Cannot update student id because it this student id already exits.')
        with self.assertRaises(ValidationError) as error:
            self.student_business_logic.validate_student_id_request_and_exits(request)
        self.assertEqual(str(error.exception), str(mock_validation_error))

    @patch('api.business_logic.StudentRepository')
    def test_validate_student_id_request_and_exits_id_does_not_exist(self, mock_repository):
        mock_get_student_id_exits = mock_repository.return_value.get_student_id_exits
        mock_get_student_id_exits.return_value = False
        request = self.request
        request.data = {
            "student_id": 1,
            "first_name": "Tha",
            "last_name": "wic",
            "school": 3
        }
        self.assertEqual(self.student_business_logic.validate_student_id_request_and_exits(request), 1)

    def test_validate_school_request_exits_missing_request(self):
        request = self.request
        request.data = {
            "first_name": "Lionel",
            "last_name": "Messi",
        }
        with self.assertRaises(ValidationError):
            self.student_business_logic.validate_school_request_exits(request)

    def test_validate_school_request_exits_not_missing_request(self):
        request = self.request
        request.data = {
            "first_name": "Lionel",
            "last_name": "Messi",
            "school": 6
        }
        actual = self.student_business_logic.validate_school_request_exits(request)
        expect = 6
        self.assertEqual(actual, expect)

    def test_update_request_data(self):
        student_id_request = "0006"
        first_name_request = "John"
        last_name_request = "K."
        school_request = 3
        actual = self.student_business_logic.update_request_data(student_id_request, first_name_request, last_name_request, school_request)
        expect = {
            "student_id": "0006",
            "first_name": "John",
            "last_name": "K.",
            "school": 3
        }
        self.assertEqual(actual, expect)

    

        


    



   

    
