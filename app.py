from flask import Flask, jsonify, send_from_directory
from sense_hat import SenseHat

app = Flask(__name__)
sense = SenseHat()

@app.route('/data', methods=['GET'])
def get_sensehat_data():
    temperature = round(sense.get_temperature(), 2)
    pressure = round(sense.get_pressure(), 2)
    humidity = round(sense.get_humidity(), 2)
    yaw = round(sense.get_orientation()['yaw'], 2)
    pitch = round(sense.get_orientation()['pitch'], 2)
    roll = round(sense.get_orientation()['roll'], 2)

    return jsonify({
        'temperature': f"{temperature}°C",
        'pressure': f"{pressure} mbar",
        'humidity': f"{humidity}%",
        'yaw': f"{yaw}",
        'pitch': f"{pitch}",
        'roll': f"{roll}"
    })

@app.route('/display_support', methods=['POST'])
def display_support():
    # Display "Calling Support" on the Sense HAT
    sense.show_message("Calling Support ...", scroll_speed=0.2, text_colour=[255, 0, 0])  
    return jsonify({"status": "success", "message": "Text displayed on Sense HAT"})

@app.route('/')
def serve_html():
    return send_from_directory('.', 'homescreen.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
