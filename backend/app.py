from flask import Flask, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask import request
import bcrypt
import json
from datetime import datetime, timedelta


app = Flask(__name__)
CORS(app)

# Configure MySQL connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'admin'
app.config['MYSQL_DB'] = 'versilog'

mysql = MySQL(app)


class AuthToken:
    def __init__(self, id: int, expiry_date: datetime):
        self.id: int = id
        self.expiry_date: datetime = expiry_date

    def json(self):
        return {'id': self.id, 'expiry_date': self.expiry_date}


@app.route('/')
def index():
    return jsonify(message="Welcome to the Flask MySQL API!")


'''
    in: {
        first_name: string
        last_name: string
        email: string
        password: string
    }

    out: {
        status: int
        message: string
    }
'''


@app.route('/register_user', methods=['POST'])
def register_user():
    try:
        userData = request.get_json()
        first_name = userData['first_name']
        last_name = userData['last_name']
        email = userData['email']
        password = userData['password']
        pass_bytes = password.encode('utf-8')
        salt = bcrypt.gensalt()
        pass_hash = bcrypt.hashpw(pass_bytes, salt)

        cursor = mysql.connection.cursor()
        call_statement = ('CALL register_user(%s, %s, %s, %s);')
        data = (first_name, last_name, email, pass_hash)
        cursor.execute(call_statement, data)
        mysql.connection.commit()
        cursor.close()
        return jsonify(status=200, message="Sucessfully registered user")
    except Exception as ex:
        print(ex)
        msg = "Database Error " + str(ex.args[1])
        return jsonify(status=ex.args[0], message=msg)


'''
    Using a post request for further safety, considering part of the user data is password here
    in: {
        email: string
    }
'''


@app.route('/get_user_data', methods=['POST'])
def get_user_data():
    try:
        req_email = request.get_json()['email']
        user_data = get_user_data_from_db(req_email)
        if user_data:
            json_data = user_data
            return jsonify(status=200, data=json_data)
        else:
            return jsonify(status=404, message="User not found")
    except Exception as ex:
        return jsonify(status=500, message=str(ex))


# Auxilary function
'''
    req_email: str
    out: None or String
'''


def get_user_data_from_db(req_email: str):
    cursor = mysql.connection.cursor()
    call_statement = 'SELECT get_user_data(%s);'
    cursor.execute(call_statement, tuple([req_email]))
    user_data = cursor.fetchone()  # Is always a tuple
    cursor.close()

    return user_data[0]  # Could be none or string


'''
    in: {
        email: string,
        password: string,
    }

    out: {
        status: int,
        password_matches: boolean,
        message: string
        authToken: authToken
    }
'''


@app.route('/attempt_login', methods=['POST'])
def attempt_login():
    try:
        req_json = request.get_json()
        req_email: str = req_json['email']
        req_password = req_json['password']
        authToken: AuthToken = AuthToken(None, None)
        user_data = get_user_data_from_db(req_email)  # str, None
        if not user_data:
            return jsonify(status=404, password_matches=False, message="User not found", authToken=authToken)

        user_data = json.loads(user_data)  # I guess this is allowed?
        password_matches = False
        if user_data and 'pass_hash' in user_data:
            pass_bytes = req_password.encode('utf-8')
            stored_pass_hash = user_data['pass_hash'].encode('utf-8')
            password_matches = bcrypt.checkpw(pass_bytes, stored_pass_hash)
            status = 200 if password_matches else 400
            expiry_date = (datetime.now() + timedelta(days=7)).isoformat()
            authToken = AuthToken(user_data['id'], expiry_date=expiry_date)
        return jsonify(status=status, password_matches=password_matches, message=f"User found, password match = {password_matches}", authToken=authToken.json())
    except Exception as ex:
        return jsonify(status=500, message="database error " + str(ex), password_matches=False)


'''
    expected input:
    {
        user_email
    }

    output: {
        status: int,
        message: string
    }
'''

'''
 input: {
 
 }
'''


@app.route('/create_organization', methods=['POST'])
def create_organization():
    try:
        req = request.get_json()
        user_id = req['user_id']
        unique_org_name = req['unique_org_name']
        display_org_name = req['display_org_name']
        desc = req['desc']

        cursor = mysql.connection.cursor()
        call_statement = 'CALL create_organization(%s, %s, %s, %s);'
        cursor.execute(call_statement, tuple(
            [user_id, unique_org_name, display_org_name, desc]))
        cursor.connection.commit()
        cursor.close()

        return jsonify(message="Success", status=200), 201
    except Exception as ex:
        print(f'create org err {ex.args[1]}')
        return jsonify(status=500, message="python API error " + str(ex))

# TODO:

# Completed on MySQL DB ------
# Create Organization
# User can log hours

# Not Completed anywhere -----
# Add user to organization
# Change role of user in organization
# Remove user from organization
# User: View all his previous logged hours
# User: Request to join an organization
# Admin: View each user's logged hours in organization
# Admin: View cumulative logged hours in organization
# Admin: Invite a user to an organization


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)