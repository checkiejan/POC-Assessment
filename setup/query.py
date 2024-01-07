import mysql.connector
from mysql.connector import Error

def create_assignment(description,studentText):
    """Insert a new assignment into the Assignment table."""
    connection = None
    cursor = None
    try:
        # Establish the connection to the database
        connection = mysql.connector.connect(
            host='localhost',       # e.g., 'localhost'
            database='POC',         # your database name
            user='poc-assessment-admin',  # your username
            password='12345678'     # your password
        )
        
        sql_create_assignmet_query = """
        INSERT INTO Assignment (description)
        VALUES (%s)
        """
        #Tuple of values to be inserted
        values_to_insert = (description,)
        
        # Create a cursor to execute the query
        cursor = connection.cursor()
        cursor.execute(sql_create_assignmet_query, values_to_insert)
        print(f"Assignment inserted successfully, ID: {cursor.lastrowid}")
        # SQL query to insert a new assignment
        sql_insert_query = """
        INSERT INTO StudentSubmission (AssignmentID, StudentText)
        VALUES (1,%s)
        """
        
        # Tuple of values to be inserted
        values_to_insert = (studentText,)
        
        # Create a cursor to execute the query
        cursor = connection.cursor()
        cursor.execute(sql_insert_query, values_to_insert)
        
        # Commit the transaction
        connection.commit()
        
        print(f"student text inserted successfully, ID: {cursor.lastrowid}")
        
    except Error as e:
        print(f"Error occurred: {e}")
    finally:
        # Close the cursor and connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# Usage example:
def read_essay(file_path):
    """Read and return the content of the text file."""
    try:
        # Open the file in read mode
        with open(file_path, 'r', encoding='utf-8') as file:
            # Read the content of the file
            content = file.read()
            return content
    except FileNotFoundError:
        return "The file was not found."
    except Exception as e:
        return f"An error occurred: {e}"

assignment = read_essay('assignment.txt')
studentText = read_essay('essay.txt')
create_assignment(assignment, studentText)
