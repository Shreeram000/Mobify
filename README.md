AI powered mobile phone recommendation chatbot using Flask and HTML,CSS,JAVASCRIPT

Overview

Developed a AI powered mobile phone recommendation chatbot that helps users find the perfect phone
based on their preferences, such as price, specifications, and brand. It simplifies the decision-making
process by filtering through available options and suggesting the best matches. The goal is to provide
personalized and accurate recommendations to meet individual user needs.


Features

	-Product recommendations using AI
	-Text preprocessing using Gemini API
	-A simple user interface using HTML/CSS and Javascipt
	-Displays a interative user interface for te


Project Structure

	project_root/
	│
	├── static/
	│   ├── css/
	│   ├── images/
	│   └── style.css
	│
	├── templates/
	│   └── index.html
	│      
	├── app.py                   
	└── README.md            

## Installation

### Prerequisites
- [Python 3.x](https://www.python.org/downloads/) installed
- [Flask](https://flask.palletsprojects.com/) for the backend

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shreeram000/Mobify.git
   cd your-repo-name
2. **Install the required dependencies.**:
   ```bash
    pip install -r requirements.txt
3.**Run the Flask application.**:
	      
      python app.py
	    Open your browser and visit http://localhost:5001 to interact with the chatbot.
4.**Dataset**:
	      The chatbot is trained using a Pdf file (Phone dataset.pdf) containing information about all the mobile phones upto date.
