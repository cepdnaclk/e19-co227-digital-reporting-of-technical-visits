import json
import random
from faker import Faker

# Initialize Faker
fake = Faker()

# Base templates for task descriptions
task_descriptions = [
    "Repair the air conditioning unit in the main office.",
    "Fix the leaking water pipe in the basement.",
    "Install a new electrical outlet in the conference room.",
    "Troubleshoot and repair the server in the data center.",
    "Paint the exterior walls of the main building.",
    "Replace the broken window in the reception area.",
    "Install new carpet in the executive offices.",
    "Service the HVAC system on the rooftop.",
    "Repair the malfunctioning elevator in the lobby.",
    "Install new LED lighting in the parking garage.",
    "Fix the clogged drain in the kitchen.",
    "Inspect and service the fire alarm system.",
    "Repair the broken door lock in the storage room.",
    "Replace the damaged tiles in the restroom.",
    "Service the backup generator in the utility room.",
    "Install a new video surveillance camera at the main entrance.",
    "Repair the faulty wiring in the security office.",
    "Fix the broken fence around the property.",
    "Install new shelving units in the warehouse.",
    "Service the water heater in the break room.",
    "Repair the leaking roof on the warehouse.",
    "Install new network cables in the IT department.",
    "Fix the broken sprinkler system in the garden.",
    "Repair the damaged pavement in the parking lot.",
    "Install new office cubicles in the open area.",
    "Service the main boiler in the mechanical room.",
    "Install a new security system in the admin building.",
    "Repair the broken projector in the conference hall.",
    "Install new blinds in the finance department.",
    "Service the air purifiers in the healthcare center.",
    "Repair the malfunctioning vending machine in the cafeteria.",
    "Install a new intercom system throughout the facility.",
    "Fix the broken HVAC unit in the CEO's office.",
    "Repair the leaky faucet in the employee lounge.",
    "Install a new thermostat in the maintenance office.",
    "Service the power supply units in the server room.",
    "Install new signage in the visitor's parking area.",
    "Repair the broken escalator in the shopping mall.",
    "Install new flooring in the employee break room.",
    "Service the air conditioning system in the laboratory.",
    "Fix the broken heating unit in the storage warehouse.",
    "Install new energy-efficient windows in the office block.",
    "Repair the damaged fence gate in the industrial park.",
    "Service the rooftop solar panels on the admin building.",
    "Install new emergency exit signs in the building.",
    "Repair the leaking ceiling in the storage unit.",
    "Fix the broken air compressor in the workshop.",
    "Install new handrails in the stairwell.",
    "Service the central vacuum system in the hotel.",
    "Repair the faulty fire suppression system in the kitchen.",
    "Install new smoke detectors in the residential complex.",
    "Fix the broken garage door in the maintenance facility.",
    "Install new backup batteries in the emergency lighting system.",
    "Service the water filtration system in the cafeteria.",
    "Repair the malfunctioning thermostat in the conference room.",
    "Install new access control systems at the main gate.",
    "Fix the broken power outlet in the production area.",
    "Service the escalator in the shopping center.",
    "Install new lockers in the employee changing rooms.",
    "Repair the damaged security camera in the loading dock.",
    "Install new bike racks in the company parking lot.",
    "Service the HVAC ducts in the admin office.",
    "Fix the broken water pump in the garden area.",
    "Install new ceiling fans in the residential units.",
    "Repair the malfunctioning coffee machine in the break room.",
    "Install new protective barriers in the industrial area.",
    "Service the automatic doors in the main entrance.",
    "Repair the faulty light switches in the auditorium.",
    "Install new water coolers in the staff areas.",
    "Fix the broken alarm system in the admin office.",
    "Service the HVAC chillers on the factory floor.",
    "Install new motion sensors in the security perimeter.",
    "Repair the damaged insulation in the warehouse.",
    "Install new telephone lines in the customer service center.",
    "Fix the broken sprinkler heads in the garden.",
    "Service the elevator control systems in the hotel.",
    "Install new lighting fixtures in the exhibition hall.",
    "Repair the faulty door sensors in the storage facility.",
    "Install new fire extinguishers in the production area.",
    "Fix the broken heating controls in the residential units.",
    "Service the air conditioning units in the retail store.",
    "Install new power strips in the computer lab.",
    "Repair the malfunctioning intercom system in the office.",
    "Install new hand dryers in the public restrooms.",
    "Service the emergency power generators in the facility.",
    "Repair the broken escalator in the office building.",
    "Install new curtains in the meeting rooms.",
    "Fix the damaged floor tiles in the reception area.",
    "Service the central heating system in the admin offices.",
    "Install new entry keypads in the secure areas.",
    "Repair the malfunctioning photocopier in the mail room.",
    "Install new ergonomic chairs in the training room.",
    "Service the heating system in the dormitories.",
    "Fix the broken security gate in the parking lot.",
    "Install new network switches in the data center.",
    "Repair the faulty card readers in the office building."
]

locations = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"
]

priorities = ["Low", "Medium", "High"]

# Function to generate a task
def generate_task(id):
    return {
        "id": f"TS{id:03d}",
        "description": random.choice(task_descriptions),
        "location": random.choice(locations),
        "priority": random.choice(priorities),
        "assigned_technician": f"T{random.randint(1, 100):03d}"
    }

# Generate 100 task descriptions
tasks = [generate_task(i) for i in range(1, 101)]

# Save to JSON
with open('tasks_large.json', 'w') as file:
    json.dump(tasks, file, indent=2)

# Print the generated data for verification
print(json.dumps(tasks, indent=2))
