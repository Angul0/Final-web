from flask import Flask,jsonify,request
import mysql.connector
from flask_cors import CORS

Api = Flask(__name__)
CORS(Api, resources={r"/*": {"origins": ["http://localhost:5500", "http://127.0.0.1:5500", "http://127.0.0.1:5501"]}}, supports_credentials=True)


########################################################
###recuerda cambiar la contraseña de tu base de datos###
########################################################

conexion = mysql.connector.connect(user='root',
                                   password='root',
                                   host='localhost',
                                   database='db-inscripciones')


#######################
### CRUD de alumnos ###
#######################

@Api.route('/alumnos/registrar', methods=['POST'])
def registrar_alumno():
    data = request.get_json()
    cursor = conexion.cursor()
    cursor.execute("INSERT INTO alumnos (Matricula, Nombre, Telefono, Correo) VALUES (%s, %s, %s, %s)",
                   (data['Matricula'], data['Nombre'], data['Telefono'], data['Correo']))
    conexion.commit()
    cursor.close()
    return jsonify({"message": "Alumno registrado exitosamente"}), 201

@Api.route('/alumnos/consultar', methods=['GET'])
def consultar_alumnos():
    cursor = conexion.cursor()
    cursor.execute("SELECT * FROM alumnos WHERE matricula = %s",( (request.args.get('matricula'),)))
    alumnos = cursor.fetchall()
    cursor.close()
    
    return jsonify(alumnos)

@Api.route('/alumnos/actualizar', methods=['PUT'])
def actualizar_alumno():
    data = request.get_json()
    cursor = conexion.cursor()
    cursor.execute("UPDATE alumnos SET Nombre = %s, Telefono = %s, Correo = %s WHERE Matricula = %s",
                   (data['Nombre'], data['Telefono'], data['Correo'], data['Matricula']))
    conexion.commit()
    cursor.close()
    return jsonify({"message": "Alumno actualizado exitosamente"}), 200

@Api.route('/alumnos/eliminar', methods=['DELETE'])
def eliminar_alumno():
    matricula = request.args.get('matricula')
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM alumnos WHERE Matricula = %s", (matricula))
    conexion.commit()
    cursor.close()
    return jsonify({"message": "Alumno eliminado exitosamente"}), 200

########################
### CRUD de carreras ###
########################

@Api.route('/carreras/consultar', methods=['GET'])
def consultar_carreras():
    cursor = conexion.cursor()
    cursor.execute("SELECT * FROM carreras WHERE Clave = %s", (request.args.get('clave'),))
    carreras = cursor.fetchall()
    cursor.close()
    
    return jsonify(carreras)

@Api.route('/carreras/registrar', methods=['POST'])
def registrar_carrera():
    data = request.get_json()
    cursor = conexion.cursor()
    cursor.execute("INSERT INTO carreras (Clave, Nombre ) VALUES (%s, %s)",
                   (data['Clave'], data['Nombre']))
    conexion.commit()
    cursor.close()
    return jsonify({"message": "Carrera registrada exitosamente"}), 201

@Api.route('/carreras/actualizar', methods=['PUT'])
def actualizar_carrera():
    data = request.get_json()
    cursor = conexion.cursor()
    cursor.execute("UPDATE carreras SET Nombre = %s WHERE Clave = %s",
                   (data['Nombre'], data['Clave']))
    conexion.commit()
    cursor.close()
    return jsonify({"message": "Carrera actualizada exitosamente"}), 200

@Api.route('/carreras/eliminar', methods=['DELETE'])
def eliminar_carrera():
    clave = request.args.get('clave')
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM carreras WHERE Clave = %s", (clave))
    conexion.commit()
    cursor.close()
    return jsonify({"message": "Carrera eliminada exitosamente"}), 200

########################
### CRUD de materias ###
########################

@Api.route('/materias/consultar', methods=['GET'])
def consultar_materias():
    cursor = conexion.cursor()
    cursor.execute("SELECT * FROM materias WHERE Nombre  = %s", (request.args.get('Nombre'),))
    materias = cursor.fetchall()
    cursor.close()
    
    return jsonify(materias)

@Api.route('/materias/registrar', methods=['POST'])
def registrar_materia():
    data = request.get_json()
    cursor = conexion.cursor()
    cursor.execute("INSERT INTO materias (Id_carrera, Nombre, Id_profesor, Hora, Aula, Semestre) VALUES (%s, %s, %s, %s, %s, %s)",
                   (data['Id_carrera'], data['Nombre'], data['Id_profesor'], data['Hora'], data['Aula'], data['Semestre']))
    conexion.commit()
    cursor.close()
    return jsonify({"message": "Materia registrada exitosamente"}), 201

@Api.route('/materias/actualizar', methods=['PUT'])
def actualizar_materia():
    data = request.get_json()
    cursor = conexion.cursor()
    cursor.execute("UPDATE materias SET Id_carrera = %s, Nombre = %s, Id_profesor = %s, Hora = %s, Aula = %s, Semestre = %s WHERE Nombre = %s",
                   (data['Id_carrera'], data['Nombre'], data['Id_profesor'], data['Hora'], data['Aula'], data['Semestre'], data['Nombre']))
    conexion.commit()
    cursor.close()
    return jsonify({"message": "Materia actualizada exitosamente"}), 200

@Api.route('/materias/eliminar', methods=['DELETE'])
def eliminar_materia():
    data = request.args.get('Nombre')
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM materias WHERE Nombre = %s", (data))
    conexion.commit()
    cursor.close()
    return jsonify({"message": "Materia eliminada exitosamente"}), 200

##########################
### CRUD de profesores ###
##########################

@Api.route('/profesores/consultar', methods=['GET'])
def consultar_profesores():
    cursor = conexion.cursor()
    cursor.execute("SELECT * FROM profesores WHERE Clave = %s", (request.args.get('Clave'),))
    profesores = cursor.fetchall()
    cursor.close()
    
    return jsonify(profesores)

@Api.route('/profesores/registrar', methods=['POST'])
def registrar_profesor():
    data = request.get_json()
    cursor = conexion.cursor()
    cursor.execute("INSERT INTO profesores (Clave, Nombre, Telefono, Correo) VALUES (%s, %s, %s, %s)",
                     (data['Clave'], data['Nombre'], data['Telefono'], data['Correo']))
    conexion.commit()
    cursor.close()
    return jsonify({"message": "Profesor registrado exitosamente"}), 201

@Api.route('/profesores/actualizar', methods=['PUT'])
def actualizar_profesor():
    data = request.get_json()
    cursor = conexion.cursor()
    cursor.execute("UPDATE profesores SET Nombre = %s, Telefono = %s, Correo = %s WHERE Clave = %s",
                   (data['Nombre'], data['Telefono'], data['Correo'], data['Clave']))
    conexion.commit()
    cursor.close()
    return jsonify({"message": "Profesor actualizado exitosamente"}), 200

@Api.route('/profesores/eliminar', methods=['DELETE'])
def eliminar_profesor():
    clave = request.args.get('Clave')
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM profesores WHERE Clave = %s", (clave,))
    conexion.commit()
    cursor.close()
    return jsonify({"message": "Profesor eliminado exitosamente"}), 200

#############################
### CRUD de inscripciones ###
#############################

@Api.route('/inscripciones/registrar', methods=['POST'])
def registrar_inscripcion():
    data = request.get_json()
    cursor = conexion.cursor()
    cursor.execute("INSERT INTO inscripciones (Matricula_alumno, Carrera, Semestre, Turno, TipoDeProceso, Id_Materia) VALUES (%s, %s, %s, %s, %s, %s)",
                   (data['Matricula_alumno'], data['Carrera'], data['Semestre'], data['Turno'], data['TipoDeProceso'], data['Id_Materia']))
    conexion.commit()
    cursor.close()
    return jsonify({"message": "Inscripción registrada exitosamente"}), 201

@Api.route('/inscripciones/consultar', methods=['GET'])
def consultar_inscripciones():
    cursor = conexion.cursor()
    cursor.execute("SELECT * FROM inscripciones WHERE Matricula_alumno = %s", (request.args.get('Matricula_alumno'),))
    inscripciones = cursor.fetchall()
    cursor.close()
    
    return jsonify(inscripciones)

@Api.route('/inscripciones/actualizar', methods=['PUT'])
def actualizar_inscripcion():
    data = request.get_json()
    cursor = conexion.cursor()
    cursor.execute("UPDATE inscripciones SET Carrera = %s, Semestre = %s, Turno = %s, TipoDeProceso = %s, Id_Materia = %s WHERE Matricula_alumno = %s",
                   (data['Carrera'], data['Semestre'], data['Turno'], data['TipoDeProceso'], data['Id_Materia'], data['Matricula_alumno']))
    conexion.commit()
    cursor.close()
    return jsonify({"message": "Inscripción actualizada exitosamente"}), 200

@Api.route('/inscripciones/eliminar', methods=['DELETE'])
def eliminar_inscripcion():
    matricula = request.args.get('Matricula_alumno')
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM inscripciones WHERE Matricula_alumno = %s", (matricula,))
    conexion.commit()
    cursor.close()
    return jsonify({"message": "Inscripción eliminada exitosamente"}), 200


if __name__ == '__main__':
    Api.run(debug=True)



