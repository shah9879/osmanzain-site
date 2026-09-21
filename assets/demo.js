window.GARAGEBOT_DEMO = {
  "kind": "recorded",
  "title": "Grinding noise, booked for Saturday",
  "shop": "Woodward Auto Repair (demo shop)",
  "src": "assets/demo-call.m4a",
  "lineLabel": "WEB TEST CALL",
  "duration": 58.22,
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
      "text": "Thanks for calling Woodward Auto Repair. How can I help?",
      "start": 0.0,
      "end": 3.04,
      "fields": {}
    },
    {
      "speaker": "caller",
      "text": "Yes. My car is making a grinding noise.",
      "start": 4.0,
      "end": 6.4,
      "fields": {
        "intent": "Brake inspection for grinding noise",
        "issue": "Car making grinding noise"
      }
    },
    {
      "speaker": "bot",
      "text": "That sounds like it could be brakes\u2014best to have us take a look. What day and time works for you to bring it in?",
      "start": 11.3,
      "end": 17.3,
      "fields": {}
    },
    {
      "speaker": "caller",
      "text": "Saturday, ten AM.",
      "start": 18.8,
      "end": 19.06,
      "fields": {
        "when": "Saturday at ten AM"
      }
    },
    {
      "speaker": "bot",
      "text": "Great, Saturday at ten works. Can I get your name and your vehicle's year, make, and model?",
      "start": 23.16,
      "end": 29.24,
      "fields": {}
    },
    {
      "speaker": "caller",
      "text": "My name is Usman.",
      "start": 30.42,
      "end": 31.82,
      "fields": {
        "caller": "Usman"
      }
    },
    {
      "speaker": "caller",
      "text": "The car is twenty twenty Honda Civic.",
      "start": 33.04,
      "end": 36.74,
      "fields": {
        "vehicle": "2020 Honda Civic"
      }
    },
    {
      "speaker": "bot",
      "text": "Thanks, Usman. Can I get a good phone number to reach you at?",
      "start": 42.02,
      "end": 44.86,
      "fields": {}
    },
    {
      "speaker": "caller",
      "text": "The one I'm calling from.",
      "start": 45.38,
      "end": 46.8,
      "fields": {}
    },
    {
      "speaker": "bot",
      "text": "Got it\u2014Usman, twenty twenty Honda Civic, Saturday at ten AM. We'll call to confirm shortly!",
      "start": 50.96,
      "end": 56.54,
      "fields": {
        "status": "Sent to the shop to confirm"
      }
    }
  ]
};
