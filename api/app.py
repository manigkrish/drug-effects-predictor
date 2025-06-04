from flask import Flask, request, jsonify, session
from flask_cors import CORS
from pymongo import MongoClient
import csv
import io
import random
import string
import pandas as pd
 

 
def checkDrug(drug, PastConditions):
    df_1 = pd.read_csv("D:\Personal_Documents\Assignments\Hackathon\sample\drug-effects-predictor\data\Drug_effects.csv")
    df_2 = pd.read_csv("D:\Personal_Documents\Assignments\Hackathon\sample\drug-effects-predictor\data\patient_records.csv")
    df_3 = pd.read_csv("D:\Personal_Documents\Assignments\Hackathon\sample\drug-effects-predictor\data\medicine_dataset.csv")
    
    df_main = pd.merge(df_2, df_1, left_on='Patient ID', right_on='PatientId')
    df = pd.merge(df_main, df_3, left_on='drugId', right_on='id')
    
    df.fillna(False, inplace=True)
    effect = df[df["name"]==drug]
    effect = effect[effect["Past Medical Conditions"] == PastConditions]
 
    common = df_3[df_3["name"] == drug]
 
    if len(effect) >= 1:
        eff = effect['side_effect'][0]
        if not eff:
            eff = "Headache"
        return (eff, (list(common["sideEffect0"]) + list(common["sideEffect1"])))
    else:
        return (None, (list(common["sideEffect0"]) + list(common["sideEffect1"])))
app = Flask(__name__)
CORS(app)
app.secret_key = ''.join(random.choices(string.ascii_letters, k=7))

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']  # Change 'mydatabase' to your database name
collection = db['Drug effects']

collection2 = db['Patients_record']
collection1 = db['drug_file']  



@app.route('/signup', methods=['POST'])
def signup():
    print("inside ----")
    print(request)
    data = request.json
    email = data.get('email')
    password = data.get('password')
    # Insert the data into MongoDB
    print(f"{email} {password}")
    collection2.insert_one({'email': email, 'password': password})
    return jsonify({'message': 'User signed up successfully'}), 200

@app.route('/login', methods=['POST'])
def signin():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    results = list(collection2.find({'email': email, 'password': password}))
    if len(results)<1:
        return jsonify({'message':"Invalid Credentials"}),403
    print(email)
    print("===")
    print(password)
    session['email'] = email

    return jsonify({'message':'Login successful'}), 200

# 
@app.route('/upload', methods=['POST'])
def upload_csv():

    # Remove tables before inserting
    
    # Check if files are provided in the request
    if 'medicine_dataset' not in request.files or 'patient_records' not in request.files or 'drug_effects' not in request.files:
        return jsonify({'error': 'CSV files not provided'})

    # Get drug file, patient file, and drug effects file from the request
    drug_file = request.files['medicine_dataset']
    patient_file = request.files['patient_records']
    drug_effects_file = request.files['drug_effects']

    # Read only the first 50 drug rows
    drug_data = list(csv.DictReader(io.StringIO(drug_file.read().decode('utf-8'))))[:50]

    # Reset file pointers for patient and drug effects files
    patient_file.seek(0)
    drug_effects_file.seek(0)

    # Read patient records CSV file
    patient_data = list(csv.DictReader(io.StringIO(patient_file.read().decode('utf-8'))))

    # Read drug effects CSV file
    drug_effects_data = list(csv.DictReader(io.StringIO(drug_effects_file.read().decode('utf-8'))))

    # Number of patients
    num_patients = len(patient_data)

    # Check if collections exist and drop them if they do
    if 'Patients_record' in db.list_collection_names():
        db['Patients_record'].drop()
    if 'Drug_effects' in db.list_collection_names():
        db['Drug_effects'].drop()
    if 'drug_file' in db.list_collection_names():
        db['drug_file'].drop()

    # Create Patients_record table and insert patient data
    patients_collection = db['Patients_record']
    for patient_row in patient_data:
        patients_collection.insert_one(patient_row)

    # Create "Drug effects" table and insert drug effects data
    drug_effects_collection = db['Drug_effects']
    for drug_effect_row in drug_effects_data:
        drug_effects_collection.insert_one(drug_effect_row)


    drug_file_collection = db['drug_file']
    for drug_file_row in drug_data:
        drug_file_collection.insert_one(drug_file_row)

    # Assign drugs to patients in a circular manner
    drug_index = 0
    for patient_row in patient_data:
        # Extract relevant data from patient records
        patient_id = patient_row['Patient ID']

        # Get the drug row for the current drug index
        drug_row = drug_data[drug_index]

        # Assign side effects of the drug to the patient
        side_effect = drug_row.get(f'sideEffect{random.randint(0, 4)}', None)

        # Create "Drug effects" table
        drug_effect = {
            'drugId': drug_row['id'],
            'PatientId': patient_id,
            'side_effect': side_effect
        }
        db["Drug_effects"].insert_one(drug_effect)

        # Move to the next drug index in a circular manner
        drug_index = (drug_index + 1) % len(drug_data)

    return jsonify({'success': 'Data uploaded successfully'})

@app.route('/update-profile', methods=['POST'])
def updateprofile():
    data = request.json
    email = data.get('email')  # Assuming you have an identifier to find the patient record
    # new_password = data.get('password')

    # Check if the patient exists
    patient = collection2.find_one({'email': email})
    if patient:
        # Check if the patient already has a password
        
            # Delete the previous password
        collection2.delete_many({'email':email})


        # Update the password for the patient with the specified email
        result = collection2.insert_one(data)

        # if result.modified_count > 0:
        return jsonify({'message': 'Profile updated successfully'}), 200
    #     else:
    #         return jsonify({'message': 'Profile not updated'}), 500  # Internal server error
    # else:
    #     return jsonify({'message': 'Patient not found'}), 404

@app.route('/search', methods=['GET'])
def search():
    print("inside-----------")
    term = request.args.get('term')
    print(term)

    # Perform a MongoDB query to find documents that match the search term
    results = list(collection1.find({'name': {'$regex': f'^{term}', '$options': 'i'}}))  # Using regex to perform a "startswith" search

    # print(results)
    # Extract only the 'name' field from the results
    names = [result['name'] for result in results]

    return jsonify({'results': names})

@app.route('/model', methods=['GET'])
def search1():
    print("inside model--------")
    searchedDrug = request.args.get('selectedResult')
    email = request.args.get('email')
    print(searchedDrug)
    result = collection2.find_one({"email":email})
    # print(result)
    result1 = checkDrug(searchedDrug,result['pastComplication'])
    #TODO
    print(result1)
    return jsonify({"result":result1[1][0]})


if __name__ == '__main__':
    app.run(debug=True)
