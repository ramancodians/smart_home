
import time
import json
import base64
import io
from picamera import PiCamera
import RPi.GPIO as GPIO

# GPIO motor pins.
Motor1A = 16
Motor1B = 18
Motor1E = 22
Motor2A = 23
Motor2B = 21
Motor2E = 19

GPIO.setmode(GPIO.BOARD)
GPIO.setup(Motor1A, GPIO.OUT)
GPIO.setup(Motor1B, GPIO.OUT)
GPIO.setup(Motor1E, GPIO.OUT)
GPIO.setup(Motor2A, GPIO.OUT)
GPIO.setup(Motor2B, GPIO.OUT)
GPIO.setup(Motor2E, GPIO.OUT)

title = 'sentry'
outgoing = ['image']
incoming = ['forward', 'left', 'right']

def on_message(client, userdata, packet):
  duration = int(packet.payload) * 0.1;
  if 'forward' == packet.topic:
    GPIO.output(Motor1A,GPIO.HIGH)
    GPIO.output(Motor1B,GPIO.LOW)
    GPIO.output(Motor1E,GPIO.HIGH)
    GPIO.output(Motor2A,GPIO.HIGH)
    GPIO.output(Motor2B,GPIO.LOW)
    GPIO.output(Motor2E,GPIO.HIGH)
    time.sleep(duration)
    GPIO.output(Motor2E,GPIO.LOW)
    GPIO.output(Motor1E,GPIO.LOW)
  elif 'left' == packet.topic:
    GPIO.output(Motor1A,GPIO.HIGH)
    GPIO.output(Motor1B,GPIO.LOW)
    GPIO.output(Motor1E,GPIO.HIGH)
    time.sleep(duration)
    GPIO.output(Motor1E,GPIO.LOW)
  elif 'right' == packet.topic:
    GPIO.output(Motor2A,GPIO.HIGH)
    GPIO.output(Motor2B,GPIO.LOW)
    GPIO.output(Motor2E,GPIO.HIGH)
    time.sleep(duration)
    GPIO.output(Motor2E,GPIO.LOW)

def start(publish):
  camera = PiCamera()
  camera.resolution = (640,480)
  time.sleep(1) # Allows the camera to warmup.

  stream = io.BytesIO()
  for frame in camera.capture_continuous(stream, format='jpeg', use_video_port=True):
    # Rewind the stream.
    stream.seek(0)

    # Publish entire encoded image.
    encoded = base64.b64encode(stream.getvalue())
    publish('image', encoded, False)

    # Reset the stream.
    stream.seek(0)
    stream.truncate()
