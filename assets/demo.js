window.GARAGEBOT_DEMO = {
  "kind": "recorded",
  "title": "Grinding noise, booked for Saturday",
  "shop": "Woodward Auto Repair (demo shop)",
  "src": "assets/demo-call.m4a",
  "lineLabel": "WEB TEST CALL",
  "duration": 63.15,
  "fieldLabels": [
    [
      "intent",
      "Intent"
    ],
    [
      "vehicle",
      "Vehicle"
    ],
    [
      "issue",
      "Problem"
    ],
    [
      "when",
      "Wants"
    ],
    [
      "caller",
      "Caller"
    ],
    [
      "status",
      "Status"
    ]
  ],
  "turns": [
    {
      "speaker": "bot",
      "text": "Thanks for calling Woodward Auto Repair, how can I help?",
      "start": 4.64,
      "end": 8.0,
      "fields": {}
    },
    {
      "speaker": "caller",
      "text": "Yes. My car is making a grinding noise.",
      "start": 8.92,
      "end": 11.38,
      "fields": {
        "intent": "Brake inspection for grinding noise",
        "issue": "Car is making a grinding noise"
      }
    },
    {
      "speaker": "bot",
      "text": "That sounds like it could be brakes\u2014best to have us take a look. What day and time works for you to bring it in?",
      "start": 16.24,
      "end": 22.22,
      "fields": {}
    },
    {
      "speaker": "caller",
      "text": "Saturday, ten AM.",
      "start": 23.64,
      "end": 23.96,
      "fields": {
        "when": "Saturday at ten AM"
      }
    },
    {
      "speaker": "bot",
      "text": "Great, Saturday at ten works. Can I get your name and your vehicle's year, make, and model?",
      "start": 28.02,
      "end": 34.22,
      "fields": {}
    },
    {
      "speaker": "caller",
      "text": "My name is Usman.",
      "start": 35.7,
      "end": 36.78,
      "fields": {
        "caller": "Usman"
      }
    },
    {
      "speaker": "bot",
      "text": "Thanks, Usman.",
      "start": 36.83,
      "end": 38.17,
      "fields": {}
    },
    {
      "speaker": "caller",
      "text": "My name is Usman. The car is twenty twenty Honda Civic.",
      "start": 38.22,
      "end": 41.7,
      "fields": {
        "vehicle": "2020 Honda Civic"
      }
    },
    {
      "speaker": "bot",
      "text": "Thanks, Usman. Can I get a good phone number to reach you at?",
      "start": 47.04,
      "end": 49.82,
      "fields": {}
    },
    {
      "speaker": "caller",
      "text": "The one I'm calling from.",
      "start": 49.82,
      "end": 51.82,
      "fields": {}
    },
    {
      "speaker": "bot",
      "text": "Got it\u2014Usman, twenty twenty Honda Civic, Saturday at ten AM. We'll call to confirm shortly!",
      "start": 56.51,
      "end": 61.53,
      "fields": {
        "status": "Sent to the shop to confirm"
      }
    }
  ]
};
