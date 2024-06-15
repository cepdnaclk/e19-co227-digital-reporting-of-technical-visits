import json
import random
from faker import Faker

# Initialize Faker
fake = Faker()

# Base profiles for capabilities and locations
capabilities = [
    "Expert in diagnosing and repairing HVAC systems with advanced knowledge in climate control solutions.",
    "Skilled in installing and maintaining complex plumbing systems, including emergency repairs and new installations.",
    "Certified electrician with extensive experience in residential and commercial electrical systems, including troubleshooting and upgrades.",
    "Proficient in repairing and setting up computer hardware, specializing in network configurations and system optimization.",
    "Experienced carpenter focusing on home renovations, custom cabinetry, and detailed finish work.",
    "Specialist in automotive repair, capable of handling engine diagnostics, electrical issues, and routine maintenance.",
    "Knowledgeable in machine maintenance, particularly in industrial environments, with a focus on predictive maintenance techniques.",
    "Adept at software installation and configuration, including troubleshooting software conflicts and ensuring compatibility.",
    "Skilled in structural engineering, particularly in designing and overseeing residential construction projects.",
    "Expert in data cabling and network infrastructure, experienced in large-scale commercial installations.",
    "Experienced in telecommunications, including the installation and maintenance of telephony systems and internet connections.",
    "Proficient in repairing home appliances, with a focus on refrigerators, washing machines, and ovens.",
    "Specialist in painting and decorating, known for high-quality finishes and attention to detail in residential spaces.",
    "Expert in garden landscaping, with a flair for designing and maintaining aesthetically pleasing and functional outdoor spaces.",
    "Skilled in roofing repairs and installations, including the application of various roofing materials and techniques.",
    "Experienced in flooring installation and repair, specializing in hardwood, laminate, and tile floors.",
    "Adept at installing and maintaining security systems, including CCTV, alarms, and access control systems.",
    "Certified in solar panel installation, with experience in both residential and commercial solar energy solutions.",
    "Expert in boiler repairs and maintenance, with a strong background in both residential and industrial heating systems.",
    "Specialist in window installation, capable of handling standard and custom window sizes and styles.",
    "Experienced in door installation, including security doors, sliding doors, and interior doors.",
    "Proficient welder with expertise in various welding techniques and materials.",
    "Expert in fire alarm systems installation and maintenance, ensuring compliance with safety standards.",
    "Skilled in home automation systems, including smart lighting, thermostats, and security integrations.",
    "Certified in HVAC system design and installation, specializing in energy-efficient solutions for residential and commercial buildings.",
    "Experienced in 3D printing setup and maintenance, with a focus on optimizing print quality and machine performance.",
    "Proficient in drone repairs, capable of troubleshooting and fixing mechanical and software issues in various models.",
    "Specialist in electronic circuit design, including prototyping, testing, and troubleshooting electronic systems.",
    "Adept at managing large-scale IT infrastructure projects, including network upgrades and data center expansions.",
    "Knowledgeable in fiber optic cable installations, with a focus on high-speed internet and communication systems.",
    "Experienced in lighting design and installation, creating effective and aesthetic lighting solutions for various environments.",
    "Expert in elevator maintenance and repair, ensuring safe and efficient operation of passenger and freight elevators.",
    "Skilled in locksmith services, including lock installations, repairs, and emergency access solutions.",
    "Certified in renewable energy systems, with expertise in wind and solar energy installations and maintenance.",
    "Specialist in water filtration systems, capable of installing and maintaining residential and commercial water purification solutions.",
    "Adept at programming industrial automation systems, including PLCs and robotics.",
    "Experienced in HVAC system diagnostics, able to quickly identify and resolve system inefficiencies and faults.",
    "Proficient in the installation of audio-visual equipment, including home theaters, conference rooms, and public address systems.",
    "Skilled in greenhouse construction and maintenance, focusing on sustainable and efficient plant growth environments.",
    "Expert in pest control solutions, with experience in residential and commercial pest management strategies.",
    "Certified in the installation and maintenance of geothermal heating and cooling systems.",
    "Specialist in marine electrical systems, with a focus on boat wiring and marine electronics installations.",
    "Experienced in home energy audits, providing recommendations for improving energy efficiency and reducing utility costs.",
    "Adept at customizing automotive interiors, including upholstery, sound systems, and electronic accessories.",
    "Knowledgeable in the installation of water conservation systems, such as rainwater harvesting and greywater recycling.",
    "Proficient in the setup and maintenance of home fitness equipment, ensuring safe and effective use.",
    "Skilled in the installation and repair of irrigation systems, optimizing water use for landscapes and gardens.",
    "Expert in wind turbine maintenance, capable of performing routine inspections and repairs to maximize efficiency.",
    "Specialist in pool and spa maintenance, including chemical balancing, cleaning, and equipment repairs.",
    "Experienced in concrete work, including foundations, driveways, and decorative concrete applications.",
    "Adept at furniture assembly and repairs, specializing in both modern and antique pieces.",
    "Certified in the installation of backup generators, providing reliable power solutions for residential and commercial properties.",
    "Skilled in the repair and maintenance of refrigeration systems, including walk-in coolers and freezers.",
    "Proficient in the installation of home security fences and gates, enhancing property security and aesthetics.",
    "Expert in installing and maintaining commercial kitchen equipment, including ovens, grills, and refrigeration units.",
    "Specialist in the installation and maintenance of audio surveillance systems for security applications.",
    "Experienced in the setup of remote work environments, including network configurations and ergonomic office solutions.",
    "Adept at troubleshooting and repairing industrial machinery, ensuring minimal downtime and efficient operation.",
    "Knowledgeable in the installation of solar water heating systems, providing sustainable hot water solutions.",
    "Proficient in the setup and maintenance of aquariums, including freshwater and marine systems.",
    "Skilled in the installation of window treatments, such as blinds, curtains, and shutters.",
    "Expert in bicycle repair and maintenance, including gear adjustments, brake repairs, and tire replacements.",
    "Specialist in the setup and maintenance of home brewing equipment, ensuring optimal brewing conditions.",
    "Experienced in the installation of skylights, enhancing natural light and ventilation in buildings.",
    "Adept at installing and repairing garage doors, including automatic openers and security features.",
    "Certified in welding and metal fabrication, capable of creating custom metal structures and components.",
    "Skilled in the installation of EV (Electric Vehicle) charging stations for residential and commercial use.",
    "Proficient in the setup and maintenance of home office technology, including computers, printers, and network devices.",
    "Expert in the repair and maintenance of sewing machines, ensuring smooth operation for various types of sewing projects.",
    "Specialist in the installation of satellite TV systems, providing reliable and high-quality television service.",
    "Experienced in the maintenance of aquaculture systems, including fish tanks and breeding setups.",
    "Adept at configuring and maintaining home networks, ensuring reliable internet connectivity and device integration.",
    "Knowledgeable in the setup and repair of greenhouse automation systems, including climate control and irrigation.",
    "Proficient in the installation and repair of intercom systems for residential and commercial properties.",
    "Skilled in the repair and maintenance of woodworking machinery, including saws, planers, and lathes.",
    "Expert in the setup and maintenance of outdoor kitchens, including grills, countertops, and refrigeration.",
    "Specialist in configuring and maintaining home theaters, optimizing audio-visual performance and user experience.",
    "Experienced in the installation of radiant heating systems, providing efficient and even heating for floors and walls.",
    "Adept at repairing and maintaining lawn care equipment, including mowers, trimmers, and blowers.",
    "Certified in the installation and maintenance of commercial refrigeration systems, ensuring reliable operation for food storage.",
    "Skilled in the repair and setup of office furniture, including ergonomic chairs, desks, and storage solutions.",
    "Proficient in configuring and maintaining home lighting automation systems, including smart switches and dimmers.",
    "Expert in the installation of indoor and outdoor tile, creating durable and aesthetic flooring and wall solutions.",
    "Specialist in configuring and repairing smart home devices, including voice assistants and smart locks.",
    "Experienced in the installation and maintenance of water softeners, providing solutions for hard water problems.",
    "Adept at installing and maintaining building automation systems, including HVAC, lighting, and security controls.",
    "Knowledgeable in the setup and maintenance of solar-powered irrigation systems, optimizing water use in agriculture.",
    "Proficient in the repair and maintenance of small engines, including lawnmowers, chainsaws, and generators.",
    "Skilled in the installation of outdoor lighting systems, enhancing safety and aesthetics for residential and commercial properties.",
    "Expert in the repair and installation of commercial ventilation systems, ensuring optimal air quality and comfort.",
    "Specialist in configuring and maintaining computer servers, including hardware upgrades and software installations.",
    "Experienced in the installation of underground utilities, including water, gas, and electrical lines.",
    "Adept at repairing and maintaining industrial refrigeration systems, ensuring efficient cooling for large-scale operations.",
    "Certified in the installation of energy-efficient windows and doors, improving insulation and reducing energy costs.",
    "Skilled in the setup and maintenance of video conferencing systems, providing reliable solutions for remote communication.",
    "Proficient in the repair and installation of residential water heaters, including tankless and solar options.",
    "Expert in configuring and maintaining home entertainment systems, including streaming devices and surround sound setups.",
    "Specialist in the installation and maintenance of rooftop solar panels, maximizing energy production for homes and businesses.",
    "Experienced in the repair and maintenance of HVAC ductwork, ensuring proper airflow and system efficiency.",
    "Adept at installing and repairing irrigation pumps and controls, optimizing water distribution for agricultural and landscaping applications.",
    "Knowledgeable in the repair and maintenance of pool filtration systems, ensuring clean and safe swimming environments.",
    "Proficient in the setup and repair of digital signage systems, providing dynamic and effective communication solutions.",
    "Skilled in the installation and maintenance of commercial kitchen ventilation systems, ensuring safe and effective smoke and heat removal."
]





locations = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"]

# Function to generate a technician profile
def generate_technician(id):
    return {
        "id": f"T{id:03d}",
        "name": fake.name(),
        "capabilities": capabilities[id-1],
        "experience": random.randint(1, 20),
        "availability": random.choice(["Available", "Busy", "On Leave"]),
        "location": random.choice(locations),
        "performance": {
            "success_rate": round(random.uniform(0.7, 1.0), 2),
            "feedback_score": round(random.uniform(3.5, 5.0), 2)
        }
    }

# Generate 100 technician profiles
technicians = [generate_technician(i) for i in range(1, 101)]

# Save to JSON
with open('technicians_large.json', 'w') as file:
    json.dump(technicians, file, indent=2)

# Print the generated data for verification
json.dumps(technicians, indent=2)
